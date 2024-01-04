import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

// window.scrollY: 브라우저를 스크롤할때마다 스크롤되고있는 거리값 (동적인 값)
// DOM.scrollTop: DOM요소 안쪽에서 스크롤할때마다 스크롤되는 거리값 (동적인 값)
// DOM.offsetTop: 문서에서 해당 돔요소의 세로 위치값 (정적인 값)

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const sections = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);

	const activation = () => {
		const scroll = wrap.current.scrollTop;
		// children으로 받아진 요소는 유사배열이므로 Array.from 사용해서 순수배열로 변경 ==> forEach 사용가능
		sections.current.forEach((_, idx) => {
			if (scroll >= sections.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		sections.current = document.querySelectorAll('.myScroll');
		setNum(sections.current.length);

		wrap.current.addEventListener('scroll', activation);
	}, []);

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
							className={idx === Index ? 'on' : ''}></li>
					);
				})}
		</ul>
	);
}
