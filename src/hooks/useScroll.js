import Anime from '../asset/anime';

// useScroll hook 초기화할때 무조건 인수로 state에 담겨있는 scrollFrame요소를 전달
export function useScroll(scrollFrame) {
	// 특정 위치로 스크롤 이동 메서드
	const scrollTo = targetPos => {
		scrollFrame && new Anime(scrollFrame, { scroll: targetPos });
	};

	// 실시간 scroll값 반환 메서드
	// getCurrentScroll(호출하는 부모 프레임 요소, 기준점 보정값)
	const getCurrentScroll = (selfEl, baseLine = 0) => {
		const scroll = scrollFrame?.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	// scrollTo함수를 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
	return { scrollTo, getCurrentScroll };
}
