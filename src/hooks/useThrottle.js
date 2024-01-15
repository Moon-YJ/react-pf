/*
  debounce vs throttle
  - debounce: 이벤트 발생하는 시간 간격을 비교해서 일정 시간안에 이벤트가 발생중이면 함수 호출을 무기한 연기
  - throttle: 물리적으로 반복횟수 자체를 줄임
  - debounce 적용 대표 사례: 특정 인풋요소 입력이 끝날때까지 fetching함수 호출 자체를 계속 미룰때
  - throttle 적용 대표 사례: window event(scroll, resize) 발생될때마다 불필요하게 많이 호출되는 함수의 호출 횟수를 줄임
*/
import { useRef } from 'react';

// setTimeout 호출되면 delay 시간뒤에 리턴값 반환되는게 아니라 호출 즉시 return 반환
// setTimeout의 delay값이 끝나기전에 중복호출되면 기존 함수를 무시하고 다시 초기화해서 setTimeout이 또 호출됨
export const useThrottle = (func, gap = 500) => {
	// 초기에 null값을 eventBlocker에 담아서 초기 한번은 온전하게 setTimeout이 호출되게 처리
	const eventBlocker = useRef(null);

	return () => {
		// eventBlocker 담겨있으면 리턴으로 강제 중지함으로써 setTimeout 중복호출하지 않음
		if (eventBlocker.current) return;
		// setTimeout 실행됨과 동시에 리턴값을 eventBlocker에 담아서 중복호출을 막으면서 gap시간 이후에 호출되는 특정 로직을 보장
		eventBlocker.current = setTimeout(() => {
			// gap시간 이후에 인수로 전달된 함수를 호출
			func();
			// eventBlocker값을 다시 비움 (==> gap시간 이후에 다시 setTimeout을 호출할 수 있게됨)
			eventBlocker.current = null;
		}, gap); //1초에 두번만 실행되게 하고싶으면 0.5초 적용
	};
};

/*
	- useThrottle custom hook 만들게 된 이유
		: 단기간에 많이 발생하는 이벤트 설정시 불필요하게 많이 호출되는 핸들러함수의 호출 횟수를 줄여 성능을 높이기 위함
		: 단기간에 요청이 많은 이벤트 (resize, scroll, mousewheel, mousemove 등등)
		: useDebounce와는 다르게 이벤트가 연속해서 발생할때 핸들러의 호출을 무제한 지연시키는 것이 아닌 물리적인 반복횟수에 제한
		: 보통 시스템이벤트는 1초에 60번 반복 (화면 주사율에 따른 이벤트 횟수 60hz)
		: 해당 이벤트에 throttling을 걸어 1초에 3번 내지 원하는 횟수만큼 물리적인 반복횟수에 제한
		
	- 활용 예시
		: 브라우저 리사이즈 핸들러함수 연결
		: 브라우저 스크롤시 핸들러함수 연결
*/
