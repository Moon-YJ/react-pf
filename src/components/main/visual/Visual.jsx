import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Visual.scss';
import { useRef } from 'react';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		breakpoints: {
			1000: {
				slidesPerView: 2,
				spaceBetween: 50
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 50
			}
		},
		onSwiper: swiper => {
			swiper.slideNext(300);
		}
	});
	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= 5) return null;
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
		</figure>
	);
}
