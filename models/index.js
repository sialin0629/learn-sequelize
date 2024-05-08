// Sequelize 패키지 -> Sequelize 객체를 색성하고 PostgreSQL과의 연결을 관리
const Sequelize = require('sequelize');
const User = require('./user'); // User 모델
const Comment = require('./comment'); // Comment 모델

// 환경 변수에서 현재 환경을 가져오거나 기본값으로 'development'를 사용
const env = process.env.NODE_ENV || 'development';

// 설정 파일에서 현재 환경에 해당하는 설정을 가져오기
const config = require('../config/config.json')[env];

const db = {}; // 데이터 베이스 객체 저장용 빈 객체 생성

// Sequelize 객체 생성 -> PostgreSQL과의 연결을 관리
// 설정 파일에 가져온 데이터베이스 이름, 사용자 이름, 비밀번호 및 기타 연결 옵션을 사용하여 연결 설정
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 데이터베이스 객체에 Sequelize 연결 객체 추가 -> 모델을 정의하고 사용할 때 이 연결 객체를 사용
db.sequelize = sequelize;

db.User = User; // User 모델을 db 객체에 추가
db.Comment = Comment; // Comment 모델을 db 객체에 추가

// 모델의 static initiate 메서드 호출 -> 모델,init이 실행되어야 테이블이 모델로 연결됨.
User.initiate(sequelize); // User 모델을 초기화하고 연결 설정을 전달하여 데이터베이스와 연결
Comment.initiate(sequelize); // Comment 모델을 초기화하고 연결 설정을 전달하여 데이터베이스와 연결

User.associate(db); // User 모델과 다른 모델 간의 관계 설정
Comment.associate(db); // Comment 모델과 다른 모델 간의 관계 설정

// 데이터베이스 객체를 내보냄 -> 이 모듈을 다른 파일에서 가져와 데이터베이스 연결을 사용할 수 있음.
module.exports = db;