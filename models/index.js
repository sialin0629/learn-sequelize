const Sequelize = require('sequelize');
// Sequelize 패키지 -> Sequelize 객체를 색성하고 PostgreSQL과의 연결을 관리

const env = process.env.NODE_ENV || 'development';
// 환경 변수에서 현재 환경을 가져오거나 기본값으로 'development'를 사용
const config = require('../config/config.json')[env];
// 설정 파일에서 현재 환경에 해당하는 설정을 가져오기
const db = {}; // 데이터 베이스 객체 저장용 빈 객체 생성

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// Sequelize 객체 생성 -> PostgreSQL과의 연결을 관리
// 설정 파일에 가져온 데이터베이스 이름, 사용자 이름, 비밀번호 및 기타 연결 옵션을 사용하여 연결 설정

db.sequelize = sequelize;
// 데이터베이스 객체에 Sequelize 연결 객체 추가 -> 모델을 정의하고 사용할 때 이 연결 객체를 사용

module.exports = db;
// 데이터베이스 객체를 내보냄 -> 이 모듈을 다른 파일에서 가져와 데이터베이스 연결을 사용할 수 있음.