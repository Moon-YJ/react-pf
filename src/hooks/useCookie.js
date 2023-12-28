export function useCookie(name, value, time) {
	let now = new Date();
	let duedate = now.getTime() + 1000 * time; // 현재 시간으로부터 time초 뒤의 시간(만료시간 설정)
	now.setTime(duedate); // 시간 객체값을 위에서 생성한 만료시간으로 변경
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`; // path=/; 설정하면 모든 루트에서 Cookie값 공유(만약 path=/community; 넣으면 community페이지에서만 공유됨) / now.toUTCString - 한국시로 구한 만료시간 값을 전세계 표준시로 변환해서 Cookie의 만료 시간값으로 설정
	// path값 경로의 url에서만 쿠키가 생성됨
	// 따라서 csr 방식의 리액트에서는 해당 경로로 라우터 이동되더라도 서버쪽에서 해당 URL요청이 들어간 것이 아니기 때문에 쿠키 생성이 안됨
	// 해당 URL 경로에서 새로고침을 해야지만 쿠키가 생성됨
	// 이러한 이유로 가급적 리액트에서는 쿠키 생성 경로를 path=/;로 지정함
}

/*
  - Cookie
  : 서버에서 https 통신으로 client(Browser)에 데이터를 전달할때 header객체에 전달하는 경량의 문자 데이터(4KB-개별 쿠키당 최대값)
  : 사용자의 브라우저에 물리적인 파일 형태로 저장되기때문에 사용자가 브라우저를 닫더라도 유지시킬수 있는 값
  : 쿠키에는 만료일이 존재하고 사용자가 설정 가능, 만약 만료일을 지정하지 않으면 브라우저를 닫는 순간 쿠키값 삭제됨

  - Cookie vs Session
  : Cookie정보는 client쪽에 저장되는반면 Session은 서버쪽에 저장됨
  : 덜 중요한 값을 유지시킬때 주로 Cookie 사용 (장바구니 목록, 오늘 하루 팝업 안보이기, 등등)
  : 사용자 개인정보같이 중요한 정보값은 Session 사용 (사용자 로그인 정보, 등등)

  - Cookie vs Local Storage
  : Cookie 데이터가 Local Storage에 비해서 경량의 문자값만 등록 가능 (Cookie는 4KB, Local Storage는 5MB로 거의 100배차이)
  : Cookie는 만료일 지정이 가능하기 때문에 자동적으로 값이 제거됨
  : Local Storage는 사용자가 직접 삭제하기 전까지는 계속 유지됨
*/
