export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let duedate = now.getTime() + 1000 * time;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};

	const isCookie = cookieKey => {
		if (document.cookie.indexOf(cookieKey) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { setCookie, isCookie, viewCookie };
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

/*
	useCookie() custom hook 만들게 된 이유
	: 복수개의 컴포넌트에서 쿠키를 생성하거나 사용해야될때 동일한 쿠키생성로직 재활용을 위해 제작

	setCookie(쿠키이름, 쿠키값, 만료시간(초단위)): 특정 쿠키를 원하는 시간만큼 생성 (쿠키삭제기능 가능)
	isCookie(쿠키이름): 현재 브라우저에 해당 이름의 쿠키가 있는지 반환 (true있음, false없음)
	viewCookie(): 현재 브라우저에 등록된 모든 쿠키값 확인
*/
