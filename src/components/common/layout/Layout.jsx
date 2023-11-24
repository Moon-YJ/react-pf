import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	// useEffect 내부에서 자주 쓰일만한 특정 함수를 호출해야할때
	// use로 시작하는 커스텀hook은 특정함수 안쪽에서 호출 불가
	// 따라서, 해당 hook이 리턴으로 함수를 반환하도록 처리
	const splitTxt = useSplitText();

	useEffect(() => {
		// 아래처럼 custom hook이 반환한 함수를 hook이나 핸들러함수 내부에서 사용 가능
		splitTxt('hello');
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{/* Layout 컴포넌트로 감싼 영역의 내부 콘텐츠가 아래 children 위치에 출력됨 */}
			{children}
		</main>
	);
}
