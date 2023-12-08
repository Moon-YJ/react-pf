import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
//9ccbf4d9fc75facc6101ad5e5cad392e (js key값)

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	const mapOption = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	});

	useEffect(() => {
		var map = new kakao.maps.Map(mapFrame.current, mapOption.current);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
