// express 모듈
const express = require('express');

// User 모델 -> '../models/user' 파일에 정의
// 데이터베이스의 'users' 테이블과 상호작용
const User = require('../models/user');

// Comment 모델 -> '../models/comment' 파일에 정의
// 데이터베이스의 'comments' 테이블과 상호작용
const Comment = require('../models/comment');

// 새로운 Router 객체를 생성
const router = express.Router();

// '/' 경로에 대한 GET 및 POST 요청을 처리
router.route('/')
  .get(async (req, res, next) => {
    try {
      // User 모델을 사용 -> 데이터베이스에서 모든 사용자 레코드를 가져옴.
      // findAll() 메서드 -> 사용자 객체 배열을 반환하는 프로미스를 반환
      const users = await User.findAll();
      // JSON 형식으로 사용자 데이터 응답.
      res.json(users);
    } catch (err) {
      // 오류가 발생하면 콘솔에 오류를 출력 -> 다음 미들웨어로 오류 전달
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      // 요청 본문에서 사용자 데이터를 받아 새로운 사용자 레코드 생성
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      // 생성된 사용자 정보를 콘솔에 출력
      console.log(user);
      // 상태 코드 201(Created)와 함께 생성된 사용자 정보를 JSON 형식으로 응답
      res.status(201).json(user);
    } catch (err) {
      // 오류가 발생하면 콘솔에 오류를 출력 -> 다음 미들웨어로 오류 전달
      console.error(err);
      next(err);
    }
  });

// '/:id/comments' 경로 대한 GET 요청을 처리
router.get('/:id/comments', async (req, res, next) => {
  try {
    // Comment 모델 -> 특정 사용자(id)의 모든 댓글을 가져옴.
    // include 옵션 사용 -> User 모델을 포함하고, 사용자 ID로 필터링함
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    // 가져온 댓글 정보를 콘솔에 출력
    console.log(comments);
    // JSON 형식으로 댓글 데이터 응답
    res.json(comments);
  } catch (err) {
    // 오류가 발생하면 콘솔에 오류를 출력 -> 다음 미들웨어로 오류 전달
    console.error(err);
    next(err);
  }
});

// 라우터 객체를 내보내서 애플리케이션의 다른 부분에서 사용할 수 있게 함.
module.exports = router;