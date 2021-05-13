const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const {User} = require('./models/User.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Chamy:aa9506@wiki.phe87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req,res,next) => {
    res.send('Hello World!');
});

app.post('/register', (req,res) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));