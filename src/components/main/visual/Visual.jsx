import { useSelector } from 'react-redux';
import './Visual.scss';
// npm i swiper@8
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';

function Btns() {
	// Swiper 컴포넌트 안쪽에 있는 또다른 자식 컴포넌트 안쪽에서만 useSwiper hook 사용 가능
	// hook으로부터 생성된 인스턴스 객체에 있는 다양한 prototype 메서드와 property값 활용 가능
	const swiper = useSwiper();
	return (
		<nav className='swiper-controller'>
			<button
				onClick={() => {
					// 다시 롤링시작 버튼 클릭시 delay 없이 바로 slide 넘기기 위해서
					// 일단 다음 슬라이드 넘기고 동시에 롤링 재시작
					swiper.slideNext(200);
					swiper.autoplay.start();
				}}>
				play
			</button>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
		</nav>
	);
}

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	return (
		<figure className='Visual'>
			<Swiper
				pagination={{ clickable: true }}
				autoplay={{
					delay: 2000,
					disableOnInteraction: true
				}}
				modules={[Pagination, Autoplay]}
				loop={true}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<h3>{vid.snippet.title}</h3>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns />
			</Swiper>
		</figure>
	);
}

/*
	- React에서 Swiper의 코어기능을 적용하기 위해서는 useSwiper라는 hook 호출
		: Swiper안쪽에서 또다른 컴포넌트를 연결해주고 그 안쪽에서 useSwiper로부터 객체 생성
		: 해당 자식 컴포넌트 안쪽에서 생성된 객체로부터 swiper core에 등록되어있는 모든 메서드, 프로퍼티를 리액트에서도 사용 가능
*/
