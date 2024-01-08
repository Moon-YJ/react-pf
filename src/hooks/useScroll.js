import { useEffect, useState, useRef } from 'react';
import Anime from '../asset/anime';

export function useScroll() {
	const [Frame, setFrame] = useState(null);
	// 순서 1 - custom hook 안쪽에서 자체적으로 빈 참조객체 생성
	const refEl = useRef(null);

	// 특정 위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	// 실시간 scroll값 반환 메서드
	// getCurrentScroll(호출하는 부모 프레임 요소, 기준점 보정값)
	const getCurrentScroll = (baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		// 순서 5 - 부모 컴포넌트에서 참조객체 연결된 값을 hook 내부적으로 활용
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	// 순서 2 - 부모에서 해당 참조객체를 활용하도록 리턴
	// 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
