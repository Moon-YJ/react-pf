import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './Visual.scss';
import { useEffect, useRef, useState } from 'react';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	console.log(data, '::data');
	const [Index, setIndex] = useState(1);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(2);
	console.log(PrevIndex, '::prev');
	console.log(NextIndex, '::next');
	const num = useRef(5);
	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		//onSwiper: swiper => swiper.slideNext(300),
		//onSwiper: swiper => (swiper.activeIndex = 3),
		// loop: true이면 realIndex 사용, false이면 activeIndex 사용
		onSlideChange: swiper => setIndex(swiper.realIndex),
		breakpoints: {
			600: { slidesPerView: 2 },
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
								<h1>{idx}</h1>
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
					<p className='prev-box'>
						<img
							src={data[PrevIndex].snippet.thumbnails.standard.url}
							alt={data[PrevIndex].snippet.title}
						/>
					</p>
					<p className='next-box'>
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
