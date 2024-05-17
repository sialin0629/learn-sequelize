// express 모듈 -> Node.js용 웹 프레임워크
const express = require('express');
// User 모델 -> ../models/user' 파일에 정의되어 있음.
// 데이터베이스의 'users' 테이블과 상호작용
const User = require('../models/user');

const router = express.Router(); // 새로운 Router 객체 생성

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll(); // User.findAll() -> 모든 사용자를 찾은 후
    res.render('sequelize', { users }); // sequelize.html을 렌더링 할때 결과값이 user를 넣음.
  } catch (err) {
    console.error(err); // 사용자 데이터를 가져오는 중에 오류가 발생하면, 오류를 콘솔에 출력
    next(err); // 오류를 다음 오류 처리 미들웨어로 전달
  }
});

// 라우터 객체를 내보내서 애플리케이션의 다른 부분에서 사용할 수 있게 함.
module.exports = router;