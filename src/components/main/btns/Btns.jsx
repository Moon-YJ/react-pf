import { useCallback, useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';

// window.scrollY: 브라우저를 스크롤할때마다 스크롤되고있는 거리값 (동적인 값)
// DOM.scrollTop: DOM요소 안쪽에서 스크롤할때마다 스크롤되는 거리값 (동적인 값)
// DOM.offsetTop: 문서에서 해당 돔요소의 세로 위치값 (정적인 값)

export default function Btns(opt) {
	const defOpt = useRef({ frame: '.wrap', items: '.myScroll', base: -window.innerHeight / 2, isAuto: false });
	const resultOpt = useRef({ ...defOpt.current, ...opt });

	const [Num, setNum] = useState(0);
	const [Mounted, setMounted] = useState(true);
	const sections = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);
	// 1/3이상이 보이는 순간부터 다음버튼으로 활성화
	const baseLine = useRef(resultOpt.current.base);
	// isMotion.current 값이 true이면 모션중이므로 재실행 방지, false이면 모션중이 아니므로 재실행 가능하게 처리
	const isMotion = useRef(false);
	// auto 스크롤 기능 사용 유무
	const isAutoScroll = useRef(resultOpt.current.isAuto);

	// activation에서 null요소의 값을 읽을 수 없다는 오류 생기는 이유(throttle과는 무관)
	// 아래 함수는 scroll이 동작될때마다 실행되는 함수
	const activation = () => {
		if (!Mounted) return;
		const scroll = wrap.current.scrollTop;

		// 내부적으로 scroll시 모든 section요소와 btns요소를 탐색해서 가져와야함
		// 이때 스크롤하자마자 바로 라우터 이동하면 모든 section요소를 참조객체에 담기기전에 컴포넌트가 언마운트됨
		// 따라서 컴포넌트 언마운트시 비어있는 참조객체를 호출하려고하기 때문에 에러 발생
		// 컴포넌트가 언마운트되면 return문으로 참조객체활용 구문 자체를 무시

		// children으로 받아진 요소는 유사배열이므로 Array.from 사용해서 순수배열로 변경 ==> forEach 사용가능
		sections.current.forEach((_, idx) => {
			if (scroll >= sections.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const handleScroll = idx => {
		// 초기값이 false이므로 처음 한번은 해당 조건문이 무시되면서 아래 코드 실행됨
		if (isMotion.current) return;
		// 위 조건문을 통과하자마자 바로 값을 true로 변경해서 다음부터는 재호출되지 않도록 막음
		isMotion.current = true;
		console.log('move');
		if (sections.current[idx].offsetTop === wrap.current.scrollTop) return null;
		// 모션함수가 실행되고 모션이 끝나는 순간 실행되는 callback으로 다시 isMotion.current값을 false로 변경해서 모션 재실행 가능하게 설정
		// 결론 - isMotion.current값을 이용해서 모션중에는 중복으로 함수 호출 불가능하도록 모션 중 재이벤트 방지 처리(useThrottle이나 useDebounce 사용 불가)
		else
			new Anime(
				wrap.current,
				{ scroll: sections.current[idx].offsetTop },
				{
					callback: () => (isMotion.current = false)
				}
			);
	};

	const handleWheel = useCallback(
		e => {
			const btnArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			// 현재 활성화된 버튼의 순번 구하기
			const activeIdx = btnArr.indexOf(activeEl);

			// e.deltaY 속성은 해당 이벤트의 스크롤 이동에 대한 정보를 제공 마우스휠 위로 올리면 -100, 아래로 내리면 100
			// console.dir(e.deltaY);
			// 마우스휠 내렸을때
			if (e.deltaY > 0) {
				// 현재 활성화된 순번이 마지막순번이 아니면 다음순번 섹션위치로 모션이동
				activeIdx !== Num - 1 && handleScroll(activeIdx + 1);
				// 마우스휠 올릴때
			} else {
				// 현재 순번이 첫번째 순번이 아니면 이전순번 섹션 위치로 모션이동
				activeIdx !== 0 && handleScroll(activeIdx - 1);
			}
		},
		[Num]
	);

	const modifyPos = () => {
		const btnArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIdx = btnArr.indexOf(activeEl);
		wrap.current.style.scrollTop = sections.current[activeIdx].offsetTop;
	};

	const throttledAct = useThrottle(activation);
	const throttledPos = useThrottle(modifyPos, 200);

	useEffect(() => {
		wrap.current = document.querySelector(resultOpt.current.frame);
		sections.current = document.querySelectorAll(resultOpt.current.items);
		setNum(sections.current.length);

		wrap.current.addEventListener('scroll', throttledAct);
		// auto 스크롤 기능 사용 안하는 경우
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', handleWheel);
		window.addEventListener('resize', throttledPos);
		return () => {
			wrap.current.removeEventListener('scroll', throttledAct);
			wrap.current.removeEventListener('mousewheel', handleWheel);
			window.removeEventListener('resize', throttledPos);
		};
	}, [throttledAct, handleWheel, throttledPos, resultOpt.current.frame, resultOpt.current.items]);

	// 컴포넌트 언마운트시 한번만 동작되어야 하기 때문에
	// 의존성 배열이 비어있는 useEffect 안쪽의 클린업 함수에서 Mounted 값 변경 (위에 useEffect에 넣으면 activation함수 동작 안하는 오류 생김)
	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<ul
			className='Btns'
			ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							// new Anime(선택자, {속성명1: 속성값1, 속성명2:속성값2}, {duration: 속도, easeType: 가속도, callback: 컴플리트함수})
							onClick={() => handleScroll(idx)}></li>
					);
				})}
		</ul>
	);
}
