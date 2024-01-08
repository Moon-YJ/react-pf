import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitTxt = useSplitText();
	const customScroll = scroll => {
		scroll >= 100 ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
	};
	const { scrollTo, refEl } = useScroll(customScroll, 0);

	useEffect(() => {
		scrollTo(0);
		splitTxt(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitTxt, title, scrollTo, refEl]);

	return (
		<main
			ref={refEl}
			className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{/* Layout 컴포넌트로 감싼 영역의 내부 콘텐츠가 아래 children 위치에 출력됨 */}
			{children}
			<button
				className='btnTop'
				ref={refBtnTop}
				onClick={() => scrollTo(0)}>
				Top
			</button>
		</main>
	);
}
