// 사용자 이름을 클릭하면 해당사용자의 댓글을 로딩하는 함수
document.querySelectorAll('#user-list tr').forEach((el) => { // user-list 테이블의 각 행에 대해 반복
  el.addEventListener('click', function () { // 클릭 이벤트 리스너 추가
    const id = el.querySelector('td').textContent; // 해당 사용자의 id를 가져옴
    getComment(id); // 해당 id로 댓글을 가져옴
  });
});

// 사용자 정보를 가져와서 테이블에 표시하는 함수
async function getUser() {
  try {
    const res = await axios.get('/users'); // 서버로부터 사용자 정보를 받아옴
    const users = res.data; // 받아온 사용자 정보
    console.log(users); // 받아온 상요자 정보를 콘솔에 출력
    const tbody = document.querySelector('#user-list tbody'); // 사용자 정보를 보여줄 테이블의 tbody 요소
    tbody.innerHTML = ''; // 기존에 있던 사용자 정보를 초기화
    users.map(function (user) { // 받아온 사용자 정보를 반복하여 테이블에 추가
      const row = document.createElement('tr'); // 새로운 행 생성
      row.addEventListener('click', () => { // 행을 클릭하면 해당 사용자의 댓글을 로딩하는 함수 호출
        getComment(user.id); // 해당 사용자의 id를 이용하여 댓글을 가져옴
      });
      // 각 셀에 사용자 정보 추가
      let td = document.createElement('td');
      td.textContent = user.id; // 사용자 id
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.name; // 사용자 이름
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.age; // 사용자 나이
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.married ? '기혼' : '미혼'; // 사용자 결혼 여부
      row.appendChild(td);
      tbody.appendChild(row); // 행을 테이블에 추가
    });
  } catch (err) {
    console.error(err); // 에러가 발생하면 콘솔에 에러를 출력
  }
}

// 특정 사용자의 댓글을 가져와서 표시하는 함수
async function getComment(id) {
  try {
    const res = await axios.get(`/users/${id}/comments`); // 서버로부터 특정 사용자의 댓글을 받아옴
    const comments = res.data; // 받아온 댓글 정보
    const tbody = document.querySelector('#comment-list tbody'); // 댓글을 표시할 테이블의 tbody 요소
    tbody.innerHTML = ''; // 기존에 있던 댓글 정보를 초기화
    comments.map(function (comment) { // 받아온 댓글 정보를 반복하여 테이블에 추가
      // 각 셀에 댓글 정보 추가
      const row = document.createElement('tr'); // 새로운 행 생성
      let td = document.createElement('td');
      td.textContent = comment.id; // 댓글 ID
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.User.name; // 댓글을 작성한 사용자 이름
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.comment; // 댓글 내용
      row.appendChild(td);
      // 수정 버튼 추가
      const edit = document.createElement('button'); // 수정 버튼 생성
      edit.textContent = '수정'; // 버튼 텍스트 설정
      edit.addEventListener('click', async () => { // 수정 버튼 클릭 시 동작 설정
        const newComment = prompt('바꿀 내용을 입력하세요'); // 사용자로부터 새로운 댓글 내용 입력 받음
        if (!newComment) { // 사용자가 새로운 내용을 입력하지 않은 경우
          return alert('내용을 반드시 입력하셔야 함니다'); // 경고 메세지 출력 후 함수 종료
        }
        try { 
          await axios.patch(`/comments/${comment.id}`, { comment: newComment }); // 댓글 수정 요청
          getComment(id); // 수정된 댓글을 다시 가져와서 표시
        } catch (err) { // 수정 요청 중 에러 발생시 
          console.error(err); // 에러 로그 출력
        }
      });
      // 삭제 버튼 추가
      const remove = document.createElement('button'); // 삭제 버튼 생성
      remove.textContent = '삭제'; // 버튼 텍스트 설정
      remove.addEventListener('click', async () => { // 삭제 버튼 클릭시 동작 설정
        try {
          await axios.delete(`/comments/${comment.id}`); // 댓글 삭제 요청
          getComment(id); // 삭제된 댓글을 다시 가져와서 표시
        } catch (err) { // 삭제 요청 중 에러 발생시
          console.error(err); // 에러 로그 출력
        }
      });
      // 버튼을 셀에 추가
      td = document.createElement('td'); // 셀 생성
      td.appendChild(edit); // 수정 버튼을 셀에 추가
      row.appendChild(td); // 행에 셀 추가
      td = document.createElement('td'); // 셀 생성
      td.appendChild(remove); // 삭제 버튼을 셀에 추가
      row.appendChild(td); // 행에 셀 추가
      tbody.appendChild(row); // 테이블의 tbody에 행 추가
    });
  } catch (err) { // 댓글 가져오기 도중 에러 발생 시
    console.error(err); // 에러 로그 ㅊ출력
  }
}

// 사용자 등록 폼 제출 시 동작
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // 기본 제출 동작을 막음
  const name = e.target.username.value; // 폼에서 입력된 사용자 이름
  const age = e.target.age.value; // 폼에서 입력된 사용자 나이
  const married = e.target.married.checked; // 폼에서 체크된 결혼 여부
  if (!name) {
    return alert('이름을 입력하세요'); // 이름이 입력되지 않았을 경우 경고 표시 후 중단
  } 
  if (!age) {
    return alert('나이를 입력하세요'); // 나이가 입력되지 않았을 경우 경고 표시 후 중단
  }
  try {
    await axios.post('/users', { name, age, married }); // 서버에 사용자 등록 요청
    getUser(); // 등록된 사용자 정보를 다시 가져와서 표시
  } catch (err) {
    console.error(err); // 에러 발생 시 콘솔에 에러 로그 출력
  }
  // 입력 필드 초기화
  e.target.username.value = ''; // 사용자 이름 입력 필드 초기화
  e.target.age.value = ''; // 사용자 나이 입력 필드 초기화
  e.target.married.checked = false; // 결혼 여부 체크박스 초기화
});

// 댓글 등록 폼 체출 시 동작
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // 기본 제출 동작을 막음
  const id = e.target.userid.value; // 폼에서 입력된 사용자 id
  const comment = e.target.comment.value; // 폼에서 입력된 댓글 내용
  if (!id) {
    return alert('아이디를 입력하세요'); // 아이디가 입력되지 않았을 경우 경고 표시 후 중단
  }
  if (!comment) {
    return alert('댓글을 입력하세요'); // 댓글이 입력되지 않았을 경우 경고 표시 후 중단
  }
  try {
    await axios.post('/comments', { id, comment }); // 서버에 댓글 등록 요청
    getComment(id); // 등록된 댓글을 다시 가져와서 표시
  } catch (err) {
    console.error(err); // 에러 발생 시 콘솔에 에러 로그 출력
  }
  // 입력 필드 초기화
  e.target.userid.value = ''; // 사용자 id 입력 필드 초기화
  e.target.comment.value = ''; // 댓글 입력 필드 초기화
});