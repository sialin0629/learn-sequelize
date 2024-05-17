const express = require('express'); // express 모듈

// Comment 모델 -> '../models' 파일에 정의
// 데이터베이스의 'comments' 테이블과 상호작용
const { Comment } = require('../models');

const router = express.Router(); // 새로운 Router 객체를 새엇ㅇ


// '/' 경로에 대한 POST 요청 처리
router.post('/', async (req, res, next) => {
  try {
    // 요청 본문에서 댓글 작성자 ID와 댓글 내용을 받아 새로운 댓글 레코드 생성
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    // 생성된 댓글 정보를 콘솔에 출력
    console.log(comment);
    // 상태 코드 201(Created)와 함께 생성된 댓글 정보를 JSON 형식으로 응답
    res.status(201).json(comment);
  } catch (err) {
    // 오류가 발생하면 콘솔에 오류를 출력하고, 다음 미들웨어로 오류를 전달
    console.error(err);
    next(err);
  }
});

// '/:id' 경로에 대한 PATCH 및 DELETE 요청 처리
router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      // 요청 본문에서 새로운 댓글 내용을 받아 특정 댓글 ID의 댓글 수정
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: { id: req.params.id },
      });
      // 수정된 결과 -> JSON 형식으로 응답
      res.json(result);
    } catch (err) {
      // 오류가 발생하면 콘솔에 오류 출력 -> 다음 미들웨어로 오류 전달
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      // 특정 댓글 ID의 댓글 삭제
      const result = await Comment.destroy({ where: { id: req.params.id } });
      // 삭제된 결과를 JSON 형식으로 응답
      res.json(result);
    } catch (err) {
      // 오류가 발생하면 콘솔에 오류 출력 -> 다음 미들웨어로 오류전달
      console.error(err);
      next(err);
    }
  });

// 라우터 객체를 내보내서 애플리케이션의 다른 부분에서 사용할 수 있게 함.
module.exports = router