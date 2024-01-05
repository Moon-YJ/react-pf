import { useCallback, useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitTxt = useSplitText();
	const { scrollTo, getCurrentScroll, scrollFrame } = useScroll();

	const handleScroll = useCallback(
		num => {
			getCurrentScroll() >= num ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
		},
		[getCurrentScroll]
	);

	useEffect(() => {
		scrollTo(0);
		splitTxt(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);

		// window에 연결된게 아니고 언마운트시 사라지는 참조객체에 연결되어있으므로 클린업함수 적용하지 않아도 됨
		scrollFrame.current.addEventListener('scroll', () => handleScroll(300));
	}, [splitTxt, title, scrollTo, scrollFrame, getCurrentScroll, handleScroll]);

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
				ref={refBtnTop}
				onClick={() => scrollTo(0)}>
				Top
			</button>
		</main>
	);
}
