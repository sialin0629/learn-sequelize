const Sequelize = require('sequelize'); // Sequelize 모듈

// Comment 클래스를 Sequelize 모델을 상속 받아 정의
class Comment extends Sequelize.Model {
  // initiate 메서드 정의 -> 데이터베이스 연결 초기화
  static initiate(sequelize) {
    // Comment 모델 초기화
    Comment.init({
      // commnet 열 정의
      comment: {
        type: Sequelize.STRING(100), // 타입: 문자열(길이 100)
        allowNull: false, // NULL이 허용되지 않음.
      },
      // created_at 열 정의
      created_at: {
        type: Sequelize.DATE, // 타입: 날짜
        allowNull: true, // NULL 허용
        defaultValue: Sequelize.NOW, // 기본값 -> 현재 날짜와 시간
      },
    }, {
      // Sequelize 모델 설정 옵션 정의
      sequelize, // Sequelize 인스턴스 지정
      timestamps: false, // createdAt 및 updatedAt 필드를 자동으로 생성하지 않음.
      modelName: 'Comment', // 모델 이름 지정
      tableName: 'comment', // 테이블 이름 지정
      paranoid: false, // 소프트 삭제를 사용하지 않음.
                        // true로 설정 -> 로우를 삭제할때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록됨(로우 복원 가능)
      charset: 'utf8mb4', // 문자셋을 UTF-8MB4(4바이트 유니코드 / 기본문자 + 특수기호 + 이모티콘으로 구성)로 지정
      collate: 'utf8mb4_general_ci' // 콜레이션을 UTF-8MB4_GENERAL_CI로 지정
                                    // 콜레이션 -> 데이터 베이스에서 문자열을 비교하고 정렬하는데 사용되는 규칙의 세트
                                    // UTF-8MB4_GENERAL_CI -> CI(대소문자 무시) / "A"와 "a"를 동일하게 취급
    });
  }

  // associate 메서드 정의 -> 다른 모델과의 관계 정의
  static associate(db) {
    // Comment 모델이 user 모델에 속한다는 관계를 정의
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});
  }
};

// Comment 클래스를 내보냄.
module.exports = Comment;