import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

export function useScroll(frame = '.wrap') {
	// 선택자로 스크롤을 제어해야되는 루트 컴포넌트의 클래스명을 받아 DOM요소를 참조객체에 연결
	const scrollFrame = useRef(null);

	// 특정 위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	// 실시간 scroll값 반환 메서드
	const getCurrentScroll = selfEl => {
		const scroll = scrollFrame.current.scrollTop;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	// 컴포넌트 마운트시 scrollFrame에 선택자 담기
	useEffect(() => {
		scrollFrame.current = document.querySelector(frame);
	}, [frame]);

	// scrollTo함수를 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
	return { scrollTo, getCurrentScroll, scrollFrame: scrollFrame.current };
}
