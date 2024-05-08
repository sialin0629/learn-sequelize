const Sequelize = require('sequelize'); // Sequelize 패키지

// User 클래스를 정의 -> Sequelize.Model 상속
class User extends Sequelize.Model {
  // initiate 메서드 정의 -> Sequelize 인스턴스를 받아 모델을 초기화, 테이블에 대한 설정
  static initiate(sequelize) {
    // 모델의 스키마 정의
    User.init({
      // 테이블 칼럼 설정
      // 시퀄라이즈는 자동으로 id를 기본키로 연결 -> 나머지 칼럼의 스펙만 입력
      // PostgreSQL 테이블과 칼럼 내용이 일치해야 정확해야 대응됨.
      name: {
        type: Sequelize.STRING(20), // 문자열 타입, 최대길이 20
        allowNull: false, // null 허용하지 않음.
        unique: true, // 중복 허용하지 않음.
      },
      age: { // 나이 속성 정의
        type: Sequelize.INTEGER.UNSIGNED, // 부호 없는 정수 타입
        allowNull: false, // null 허용하지 않음.
      },
      married: { // 결혼 여부 속성 정의
        type: Sequelize.BOOLEAN, // 불 타입(true/false)
        allowNull: false, // null 허용하지 않음.
      },
      comment: { // 코멘트 속성 정의
        type: Sequelize.TEXT, // 텍스트 타입
        allowNull: true, // null 허용
      },
      created_at: { // 생성 일자 속성 정의
        type: Sequelize.DATE, // 날짜/시간 타입
        allowNull: false, // null 허용하지 않음.
        defaultValue: Sequelize.NOW, // 기본값 -> 현재시간
      },
    }, {
      // 테이블 옵션
      sequelize, // static initiate 메서드의 매개변수와 연결되는 옵션 -> model/index.js에서 연결
      timestamps: false, // 자동으로 날짜 컬럼을 추가하는 기능 해제
      // timestamps 속성이 true -> 시퀄라이즈가 createdAt과 updateAt 칼럼 추가
      underscored: false, // 카멜 케이스(예시: createdAt) 컬럼.테이블명 사용
      // true로 설정 -> 스네이크 케이스(예시: create_at) 컬럼.테이블명 사용
      modelName: 'User', // 모델 이름
      tableName: 'users', // 실제 데이터베이스 테이블 이름 -> 모델이름이 User인 경우 테이블 이름은 users
      paranoid: false, // 소프트 삭제 비활성화
      // true로 설정 -> 로우를 삭제할 떄 완전히 지워지지 않고 deletedAt에 지운 시각이 기록됨(로우 복원 가능)
      charset: 'utf8', // 문자 인코딩
      collate: 'utf8_general_ci', // 문자 정렬
      // 한글 입력 -> charset: 'utf8', collate: 'utf8_general_ci'로 설정
      // 한글과 이모티콘 입력 -> charset: 'utf8mb4', collate: 'utf8mb4_general_ci'로 설정
    });
  }
  // 다른 모델과의 관계 정의
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
    // hasMany 메서드 -> User 모델과 Comment 모델 간의 일대다 관계 설정(User는 여러 개의 Comment를 가질 수 있음.)
    // foreignKey: 외부키 이름을 지정, 'commenter' -> Commnet 모델의 'Commenter' 열이 외부 키로 사용됨.
    // sourceKey: 기본 키 이름을 지정, 'id' -> User 모델의 'id' 열이 기본 키로 사용됨.
  }
};


module.exports = User; // User 클래스를 외부로 내보냄.