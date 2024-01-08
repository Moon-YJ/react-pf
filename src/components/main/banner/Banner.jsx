import { useCallback, useEffect, useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const box = useRef(null);
	// 순서 3 - custom hook 호출시 useScroll이 제공하고있는 빈 참조객체 가져옴
	const { getCurrentScroll, Frame, refEl } = useScroll();

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(-window.innerHeight / 2);
		if (scroll >= 0) {
			box.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
			box.current.style.opacity = 1 - scroll / 400;
		}
	}, [getCurrentScroll]);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		// 순서 4 - 원하는 요소에 빈 참조객체 연결
		<section
			className='Banner myScroll'
			ref={refEl}>
			<div
				className='box'
				ref={box}></div>
		</section>
	);
}
