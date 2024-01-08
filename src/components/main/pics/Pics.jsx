import './Pics.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useRef } from 'react';

export default function Pics() {
	const titEl = useRef(null);
	const titEl2 = useRef(null);
	const customScroll = scroll => {
		titEl.current.style.transform = `translateX(${scroll * 1.5}px)`;
		titEl.current.style.opacity = 1 - scroll / 800;
		titEl2.current.style.transform = `scale(${1 + scroll / 400}) translateX(${scroll}px)`;
		titEl2.current.style.opacity = 1 - scroll / 500;
	};
	const { refEl } = useScroll(customScroll);

	return (
		<section
			className='Pics myScroll'
			ref={refEl}>
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
