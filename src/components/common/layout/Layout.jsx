import { useCallback, useEffect, useRef, useState } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const [Frame, setFrame] = useState(null);
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitTxt = useSplitText();
	// useScroll 처음 호출시 state에 담겨있는 scrollFrame 요소 전달
	const { scrollTo, getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(
		num => {
			// 첫번째 인수로 자기자신 프레임, 두번째 인수로 0(상단부터 scroll값 연동하기 위해 0 전달)
			getCurrentScroll(refFrame.current) >= num ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
		},
		[getCurrentScroll]
	);

	// useScroll에 전달할 Frame state에 scrollFrame 담기
	useEffect(() => {
		setFrame(refFrame.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		scrollTo(0);
		splitTxt(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitTxt, title, scrollTo]);

	useEffect(() => {
		// window에 연결된게 아니고 언마운트시 사라지는 참조객체에 연결되어있으므로 클린업함수 적용하지 않아도 됨
		Frame?.addEventListener('scroll', () => handleScroll(300));
	}, [getCurrentScroll, handleScroll, Frame]);

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
