import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import './Visual.scss';
import { useRef, useState } from 'react';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	const [Index, setIndex] = useState(0);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);
	const swiperRef = useRef(null);
	const num = useRef(5);
	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		loopedSlides: num.current, // loop모드일때 실제 동작될 슬라이드 개수 지정하면 초기 슬라이드 인식해서 1번부터 보여줌
		centeredSlides: true,
		autoplay: { delay: 2500, disableOnInteraction: true },
		onSwiper: swiper => (swiperRef.current = swiper),
		// loop: true이면 realIndex 사용, false이면 activeIndex 사용
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		},
		breakpoints: {
			//1000: { slidesPerView: 2 },
			//1400: { slidesPerView: 3 }
			1000: { slidesPerView: 3 }
		}
	});

	/*
		useEffect(() => {
			Index === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(Index - 1);
			Index === num.current - 1 ? setNextIndex(0) : setNextIndex(Index + 1);
		}, [Index]);
	*/

	return (
		<figure className='Visual'>
			<div className='barFrame'>
				<p
					className='bar'
					style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
			</div>
			<div className='counter'>
				<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
			</div>
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

			<nav className='preview'>
				{isSuccess && (
					<>
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
					</>
				)}
			</nav>

			<ul className='pagination'>
				{Array(num.current)
					.fill()
					.map((_, idx) => {
						return (
							<li
								key={idx}
								className={idx === Index ? 'on' : ''}
								onClick={() => swiperRef.current.slideToLoop(idx, 400)}></li>
						);
					})}
			</ul>
		</figure>
	);
}
