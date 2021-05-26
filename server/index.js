const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key.js');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {User} = require('./models/User.js');
const {auth} = require('./middleware/auth.js');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// test
app.get('/api/hello', (req, res) => {
  res.send('Hi~');
});

app.get('/', (req,res,next) => {
    res.send('Hello World!');
});

app.post('/api/user/register', (req,res) => {
  // 회원 가입에 필요한 정보를 클라이언트에서 가져옴
  // 데이터베이스에 회원 정보 저장
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      return res.json({success: false, err});
    }

    return res.status(200).json({success: true});
  });
});

app.post('/api/user/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾음
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '이메일에 해당하는 유저가 없습니다.'
      });
    }

    // 요청한 이메일이 있으면 비밀번호 체크
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 다릅니다.'
        });
      }

      // 비밀번호가 맞으면 토큰 생성
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        
        // 로그인 사용자 정보를 전송
        res.status(200)
          .json({loginSuccess: true, userId: user._id, token: user.token});
      });
    });
  });
});

app.get('/api/user/auth', auth, (req, res) => {
  // auth를 통과
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? true : false,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, user) => {
    if (err) {
      return res.json({success: false, err});
    }
    return res.status(200).send({success: true});
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));