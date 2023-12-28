import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie, isCookie } = useCookie();

	if (isCookie('theme')) {
		if (inputEl.current) {
			inputEl.current.value = document.cookie.split('theme=')[1].split(';')[0];
		}
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	}

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		console.log(color);
		setCookie('theme', color, 10);
		// 스크립트로 넣은 값이 아니고 css에 등록해놓은 값이므로 getComputedStyle로 가져옴
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	};

	return (
		<nav className='ThemeControl'>
			<input
				ref={inputEl}
				type='color'
				onChange={changeThemeColor}
			/>
			{/* <button>theme color</button> */}
		</nav>
	);
}

/*
  - 작업흐름
  1. 클릭 이벤트 발생시 컬러팔레트에서 선택한 색상코드값을 쿠키로 저장
  2. App 마운트시 --pointColor에 등록된 value값을 js로 쿠키에 있는 값으로 변경 처리
*/
