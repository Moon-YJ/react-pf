import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Visual.scss';
import { useEffect, useRef, useState } from 'react';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	const [Index, setIndex] = useState(2);
	const [PrevIndex, setPrevIndex] = useState(1);
	const [NextIndex, setNextIndex] = useState(3);
	const swiperRef = useRef(null);
	const num = useRef(5);
	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		onSwiper: swiper => (swiperRef.current = swiper),
		// loop: true이면 realIndex 사용, false이면 activeIndex 사용
		onSlideChange: swiper => setIndex(swiper.realIndex),
		breakpoints: {
			640: { slidesPerView: 2 },
			1200: { slidesPerView: 3 }
		}
	});

	useEffect(() => {
		Index === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(Index - 1);
		Index === num.current - 1 ? setNextIndex(0) : setNextIndex(Index + 1);
	}, [Index]);

	return (
		<figure className='Visual'>
			<div className='txt-box'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= num.current) return null;
							return (
								<li
									key={el.id}
									className={idx === Index ? 'on' : ''}>
									<h3>{el.snippet.title}</h3>
								</li>
							);
						})}
				</ul>
			</div>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
									<p>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
			{isSuccess && (
				<nav className='preview'>
					<p
						className='prev-box'
						onClick={() => swiperRef.current.slidePrev(400)}>
						<img
							src={data[PrevIndex].snippet.thumbnails.standard.url}
							alt={data[PrevIndex].snippet.title}
						/>
					</p>
					<p
						className='next-box'
						onClick={() => swiperRef.current.slideNext(400)}>
						<img
							src={data[NextIndex].snippet.thumbnails.standard.url}
							alt={data[NextIndex].snippet.title}
						/>
					</p>
				</nav>
			)}
		</figure>
	);
}
