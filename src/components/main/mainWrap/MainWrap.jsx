import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Banner />
			{/* <Btns frame={스크롤 제어할 프레임 요소의 클래스명} items={스크롤이 걸릴 영역의 공통 클래스명} base={활성화될 기준점} isAuto={autoScroll 적용 여부(boolean)}
			/> */}
			<Btns />
		</div>
	);
}
