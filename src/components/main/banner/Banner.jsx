import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const box = useRef(null);
	// 순서 1 - useScroll hook으로 전달한 해당 컴포넌트에서의 custom scroll 함수 정의
	const customScroll = scroll => {
		if (scroll >= 0) {
			box.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
			box.current.style.opacity = 1 - scroll / 400;
		} else {
			box.current.style.transform = `rotate(0deg) scale(1)`;
			box.current.style.opacity = 1;
		}
	};
	// 순서 2 - custom scroll 함수를 useScroll호출시 인수로 전달
	const { refEl } = useScroll(customScroll);

	return (
		<section
			className='Banner myScroll'
			ref={refEl}>
			<div
				className='box'
				ref={box}></div>
		</section>
	);
}
