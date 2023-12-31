import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Illust.scss';

export default function Illust() {
	const pathEl = useRef(null);

	const handleCustomScroll = scroll => {
		const pathLen = 1510;
		if (pathEl.current) {
			// 선 안보이는 상태
			pathEl.current.style.strokeDashoffset = pathLen;
			// 섹션 기준점에 도달하기 전까지는 기존값 유지
			if (scroll < 0) {
				pathEl.current.style.strokeDashoffset = pathLen;
			}
			// 섹션에 도달하는 순간부터 스크롤값 연동
			if (scroll >= 0) {
				let resultScroll = 0;
				pathLen - scroll * 4 < 0 ? (resultScroll = 0) : (resultScroll = pathLen - scroll * 4);
				pathEl.current.style.strokeDashoffset = resultScroll;
			}
			// 섹션을 벗어나는 순간부터는 0값 유지해서 계속해서 보이게 처리
			if (scroll >= scroll + refEl.current.offsetHeight) {
				pathEl.current.style.strokeDashoffset = 0;
			}
		}
	};

	const { refEl } = useScroll(handleCustomScroll);

	return (
		<div
			className='Illust myScroll'
			ref={refEl}>
			<div className='svg-box'>
				{/* viewBox='가로위치값 세로위치값 가로폭의비율 세로폭의비율' '0 0 512 512' */}
				<svg viewBox='-1 -1 514 514'>
					<path
						ref={pathEl}
						d='M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z'
					/>
				</svg>
			</div>
		</div>
	);
}
