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
		slidesPerView: 3,
		centeredSlides: true,
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
