import './Pics.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect, useRef } from 'react';

export default function Pics() {
	const thisEl = useRef(null);
	const boxEl = useRef(null);
	const { scrollFrame, getCurrentScroll } = useScroll();

	useEffect(() => {
		scrollFrame?.addEventListener('scroll', () => {
			const scroll = getCurrentScroll(thisEl.current);
			// 닫는 순간부터 움직이게
			if (scroll >= 0) boxEl.current.style.transform = `translateX(${scroll}px)`;
			//boxEl.current.style.transform = `translateX(${scroll}px)`;
		});
	}, [scrollFrame, getCurrentScroll]);

	return (
		<section
			className='Pics myScroll'
			ref={thisEl}>
			<div
				className='box'
				ref={boxEl}></div>
		</section>
	);
}
