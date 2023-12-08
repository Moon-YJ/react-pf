import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const mapOption = useRef({
		// 위치값 정밀하게 보정하는 법
		// 기존 구글지도 위치값 복사한 뒤, 카카오예제의 클릭한위치의 마커표시 직접해보기에서
		// 해당 코드를 붙여넣기 하고 원하는 지점을 찍으면 아래와 같이 정밀한 수치값을 확인 가능
		center: new kakao.maps.LatLng(37.51264336059771, 127.05882782975769),
		level: 3,
	});

	const imgSrc = process.env.PUBLIC_URL + '/img/marker1.png';
	const imgSize = new kakao.maps.Size(232, 99);
	// 마커 이미지의 꼭지점 이동 (이미지 넓이의 절반만큼, 높이만큼)
	const imgOption = { offset: new kakao.maps.Point(116, 99) };

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const markerImageInstance = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);

		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
			image: markerImageInstance,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
