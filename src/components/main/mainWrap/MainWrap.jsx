import { useScroll } from '../../../hooks/useScroll';
import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import Illust from '../illust/Illust';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	const { scrollTo } = useScroll();
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Illust />
			{/* <Pics />
			<Banner /> */}
			{/* <Btns frame={스크롤 제어할 프레임 요소의 클래스명} items={스크롤이 걸릴 영역의 공통 클래스명} base={활성화될 기준점} isAuto={autoScroll 적용 여부(boolean)}
			/> */}
			<Btns />
			<button
				className='btnTop'
				onClick={() => scrollTo(0)}>
				Top
			</button>
		</div>
	);
}
