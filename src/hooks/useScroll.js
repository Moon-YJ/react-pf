import { useEffect, useState, useRef, useCallback } from 'react';
import Anime from '../asset/anime';

// 순서 3 - 부모 컴포넌트로 custom scroll 함수를 파라미터를 통해 내부로 전달
export function useScroll(customHandler, baseLine = -window.innerHeight / 2) {
	const [Frame, setFrame] = useState(null);
	const refEl = useRef(null);

	// 특정 위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	// 실시간 scroll값 반환 메서드
	// getCurrentScroll(호출하는 부모 프레임 요소, 기준점 보정값)
	const getCurrentScroll = useCallback(() => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	}, [Frame, baseLine]);

	// 순서 4 - 전달받은 custom scroll 함수를 내부에 있는 handleScroll함수 안쪽에 호출해서 내부적으로 getCurrentScroll값이 반환하고있는 스크롤값과 연동시켜줌
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		if (scroll >= 0) customHandler(scroll);
	}, [customHandler, getCurrentScroll]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	// 순서 5 - 해당 custom hook을 호출하고있는 부모 컴포넌트가 마운트시 handleScroll함수에 scroll이벤트 연결
	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	// 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
