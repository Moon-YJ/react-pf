import { useSelector } from 'react-redux';
import './Visual.scss';
// npm i swiper@8
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';
import { useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function Visual() {
	const swiperRef = useRef(null);
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('shorten');
	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		//pagination: { clickable: true, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true
		// slidesPerView: 3,
		// spaceBetween: 30,
		// centeredSlides: true
	});

	return (
		<figure className='Visual'>
			{/* <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: true }} loop={true}> */}
			<Swiper {...swiperOption.current}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='pic-box'>
									<p>
										<img
											src={vid.snippet.thumbnails.standard.url}
											alt={vid.snippet.title}
										/>
									</p>
									<p>
										<img
											src={vid.snippet.thumbnails.standard.url}
											alt={vid.snippet.title}
										/>
									</p>
								</div>
								<div className='txt-box'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>
									<Link
										to={`/detail/${vid.id}`}
										onMouseEnter={swiperRef.current?.autoplay.stop}
										onMouseLeave={swiperRef.current?.autoplay.start}>
										<span></span>View Detail
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns swiperRef={swiperRef} />
			</Swiper>
		</figure>
	);
}

function Btns({ swiperRef }) {
	// Swiper 컴포넌트 안쪽에 있는 또다른 자식 컴포넌트 안쪽에서만 useSwiper hook 사용 가능
	// hook으로부터 생성된 인스턴스 객체에 있는 다양한 prototype 메서드와 property값 활용 가능
	swiperRef.current = useSwiper();

	// 처음 마운트시 마지막 슬라이드가 보이는 이슈(loop사용때문) - activeIndex 설정하여 해결
	useEffect(() => {
		swiperRef.current.activeIndex = 1;
	}, [swiperRef]);

	return (
		<nav className='swiper-controller'>
			<button
				onClick={() => {
					// 다시 롤링시작 버튼 클릭시 delay 없이 바로 slide 넘기기 위해서
					// 일단 다음 슬라이드 넘기고 동시에 롤링 재시작
					swiperRef.current.slideNext(200);
					swiperRef.current.autoplay.start();
				}}>
				play
			</button>
			<button onClick={() => swiperRef.current.autoplay.stop()}>stop</button>
		</nav>
	);
}

/*
	- React에서 Swiper의 코어기능을 적용하기 위해서는 useSwiper라는 hook 호출
		: Swiper안쪽에서 또다른 컴포넌트를 연결해주고 그 안쪽에서 useSwiper로부터 객체 생성
		: 해당 자식 컴포넌트 안쪽에서 생성된 객체로부터 swiper core에 등록되어있는 모든 메서드, 프로퍼티를 리액트에서도 사용 가능
*/

/*
	- Swiper 관련 알아야할 내용

	1. swiper 기본 사용법
	2. useSwiper라는 전용 hook을 이용해서 swiper 인스턴스를 생성하기 위해서는 Swiper 안쪽에 자식 컴포넌트 호출 후 해당 컴포넌트에서 인스턴스 복사
	3. 부모 컴포넌트가 자식 컴포넌트에서 생성된 인스턴스 객체를 활용하기 위해서는 빈 참조객체를 자식 컴포넌트에 전달해서 역으로 인스턴스를 자식 컴포넌트로부터 전달 받음
	4. Swiper 컴포넌트 안쪽에 지저분한 props들은 컴포넌트 외부에 객체로 만들어서 전개연산자로 연결 가능 
*/

/*
	- JSX를 커스텀해서 만드는 리액트 전용 메서드
		: React.createElement('태그명', {...props}, children)
		: React.createElement('p', {className: 'abc'}, 'text') ==> <p className='abc'>text</p>
*/
