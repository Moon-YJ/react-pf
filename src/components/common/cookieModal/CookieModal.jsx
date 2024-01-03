import { useRef, useState } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './CookieModal.scss';

export default function CookieModal({ wid, ht, children }) {
	const { setCookie, isCookie } = useCookie();
	//setCookie('today', 'done', 0);
	const chkVal = useRef(null);
	const [Close, setClose] = useState(isCookie('today=done'));

	const handleClose = () => {
		const isChk = chkVal.current.checked;
		if (isChk) setCookie('today', 'done', 60 * 60 * 12);
		setClose(true);
	};

	return (
		<>
			{!Close && (
				<aside
					className='CookieModal'
					style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
					CookieModal
					<div className='content'>{children}</div>
					<div className='controls'>
						<nav>
							<input
								ref={chkVal}
								type='checkbox'
							/>
							<span>오늘하루 팝업 보지않기</span>
						</nav>
						<span onClick={handleClose}>close</span>
					</div>
				</aside>
			)}
		</>
	);
}

/*
  - 쿠키팝업 작업 흐름
    1. 해당 컴포넌트에 특정 State값에 따라 보이고 안보이게 처리
    2. 닫기 이벤트 발생시 팝업 안보이도록 state값 변경 처리
    3. 체크박스 체크한뒤 닫기버튼 클릭시 특정 쿠키 생성
    4. 해당 컴포넌트 마운트시 특정 쿠키값 있으면 무조건 안보이게 처리
*/
