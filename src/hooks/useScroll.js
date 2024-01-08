import { useEffect, useState } from 'react';
import Anime from '../asset/anime';

export function useScroll() {
	const [Frame, setFrame] = useState(null);

	// 특정 위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	// 실시간 scroll값 반환 메서드
	// getCurrentScroll(호출하는 부모 프레임 요소, 기준점 보정값)
	const getCurrentScroll = (selfEl, baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	// 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
	return { scrollTo, getCurrentScroll, Frame };
}
