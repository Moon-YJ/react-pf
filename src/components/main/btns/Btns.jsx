import { useCallback, useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';

// window.scrollY: 브라우저를 스크롤할때마다 스크롤되고있는 거리값 (동적인 값)
// DOM.scrollTop: DOM요소 안쪽에서 스크롤할때마다 스크롤되는 거리값 (동적인 값)
// DOM.offsetTop: 문서에서 해당 돔요소의 세로 위치값 (정적인 값)

export default function Btns() {
	const [Num, setNum] = useState(0);
	const sections = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);
	// 1/3이상이 보이는 순간부터 다음버튼으로 활성화
	const base = useRef(-window.innerHeight / 3);

	const activation = () => {
		const scroll = wrap.current.scrollTop;
		// children으로 받아진 요소는 유사배열이므로 Array.from 사용해서 순수배열로 변경 ==> forEach 사용가능
		sections.current.forEach((_, idx) => {
			if (scroll >= sections.current[idx].offsetTop + base.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const handleScroll = idx => {
		if (sections.current[idx].offsetTop === wrap.current.scrollTop) return null;
		else new Anime(wrap.current, { scroll: sections.current[idx].offsetTop }, { duration: 500 });
	};

	const handleWheel = useCallback(
		e => {
			const btnArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			// 현재 활성화된 버튼의 순번 구하기
			const activeIdx = btnArr.indexOf(activeEl);
			console.log(activeIdx);
			// e.deltaY 속성은 해당 이벤트의 스크롤 이동에 대한 정보를 제공 마우스휠 위로 올리면 -100, 아래로 내리면 100
			// console.dir(e.deltaY);
			// 마우스휠 내렸을때
			if (e.deltaY > 0) {
				console.log('wheel down');
				// 현재 활성화된 순번이 마지막순번이 아니면 다음순번 섹션위치로 모션이동
				activeIdx !== Num - 1 && handleScroll(activeIdx + 1);
				// 마우스휠 올릴때
			} else {
				console.log('wheel up');
				// 현재 순번이 첫번째 순번이 아니면 이전순번 섹션 위치로 모션이동
				activeIdx !== 0 && handleScroll(activeIdx - 1);
			}
		},
		[Num]
	);

	const throttled = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		sections.current = document.querySelectorAll('.myScroll');
		setNum(sections.current.length);

		wrap.current.addEventListener('scroll', throttled);
		wrap.current.addEventListener('mousewheel', handleWheel);
		return () => {
			wrap.current.removeEventListener('scroll', throttled);
			wrap.current.removeEventListener('mousewheel', handleWheel);
		};
	}, [throttled, handleWheel]);

	return (
		<ul
			className='Btns'
			ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							// new Anime(선택자, {속성명1: 속성값1, 속성명2:속성값2}, {duration: 속도, easeType: 가속도, callback: 컴플리트함수})
							onClick={() => handleScroll(idx)}></li>
					);
				})}
		</ul>
	);
}
