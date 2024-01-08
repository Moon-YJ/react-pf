import './Pics.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Pics() {
	const thisEl = useRef(null);
	const titEl = useRef(null);
	const titEl2 = useRef(null);
	const { getCurrentScroll, Frame } = useScroll();

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(thisEl.current, -window.innerHeight / 2);
		if (scroll >= 0) {
			titEl.current.style.transform = `translateX(${scroll * 1.5}px)`;
			titEl.current.style.opacity = 1 - scroll / 800;
			titEl2.current.style.transform = `scale(${1 + scroll / 400}) translateX(${scroll}px)`;
			titEl2.current.style.opacity = 1 - scroll / 500;
		}
	}, [getCurrentScroll]);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
	}, [Frame, getCurrentScroll, handleScroll]);

	return (
		<section
			className='Pics myScroll'
			ref={thisEl}>
			<h3
				className='tit'
				ref={titEl}>
				FLICKR
			</h3>
			<h4
				className='tit2'
				ref={titEl2}>
				PREVIEW
			</h4>
		</section>
	);
}
