import './Pics.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Pics() {
	const [Frame, setFrame] = useState(null);
	const thisEl = useRef(null);
	const boxEl = useRef(null);
	const { getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(thisEl.current, -window.innerHeight / 2);
		if (scroll >= 0) boxEl.current.style.transform = `translateX(${scroll}px)`;
		//boxEl.current.style.transform = `translateX(${scroll}px)`;
	}, [getCurrentScroll]);

	useEffect(() => {
		setFrame(thisEl.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
	}, [Frame, getCurrentScroll, handleScroll]);

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
