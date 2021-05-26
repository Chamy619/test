const { User } = require("../models/User");

// 인증 처리
const auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져옴
    const token = req.headers.authorization || '';
    // 토큰을 복호화 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.json({isAuth: false, error: true});
        }

        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = {auth};