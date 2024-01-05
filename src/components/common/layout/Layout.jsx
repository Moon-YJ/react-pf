import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitTxt = useSplitText();
	const { scrollTo } = useScroll('.wrap');

	useEffect(() => {
		scrollTo(0);
		splitTxt(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitTxt, title, scrollTo]);

	return (
		<main
			ref={refFrame}
			className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{/* Layout 컴포넌트로 감싼 영역의 내부 콘텐츠가 아래 children 위치에 출력됨 */}
			{children}
			<button
				className='btnTop'
				onClick={() => scrollTo(0)}>
				Top
			</button>
		</main>
	);
}
