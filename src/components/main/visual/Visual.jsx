import { useSelector } from 'react-redux';
import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Pagination, Autoplay } from 'swiper';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	const swiperOpt = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		// 반응형 작업
		breakpoints: {
			1000: {
				slidesPerView: 3
			}
		},
		// 맨 처음에 왼쪽 첫번째 슬라이드 비워져있는 부분 없게 처리
		onSwiper: swiper => {
			swiper.slideNext(300);
		}
	});
	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={data.id}>
							<div className='inner'>
								<div className='pic-box'>
									<Link to={`/detail/${data.id}`}>
										<img
											src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'}
											alt={data.snippet.title}
										/>
									</Link>
								</div>
								<div className='txt-box'>
									<h2>{data.snippet.title}</h2>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

/*
	- Swiper의 props를 통해서 UI구조가 변경되면(slidesPerView 설정시) 해당 내용은 스크립트를 통해서 동적 제어되고 있기 때문에 일반 css로 반응형 처리 불가
	
	==> 따라서 breakpoints를 이용해서 브라우저 폭에 따라서 swiper의 option값 변경
	==> 초기값으로 모바일 버전 옵션설정하고 breakpoinst로 브라우저가 늘어나는 구간마다 옵션값 변경
*/
