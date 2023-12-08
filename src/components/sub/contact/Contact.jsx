import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const [Index, setIndex] = useState(1);

	const { kakao } = window;
	const mapFrame = useRef(null);
	// 지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: '코엑스',
			// 위치값 정밀하게 보정하는 법
			// 기존 구글지도 위치값 복사한 뒤, 카카오예제의 클릭한위치의 마커표시 직접해보기에서
			// 해당 코드를 붙여넣기 하고 원하는 지점을 찍으면 아래와 같이 정밀한 수치값을 확인 가능
			latlng: new kakao.maps.LatLng(37.51264336059771, 127.05882782975769),
			imgSrc: process.env.PUBLIC_URL + '/img/marker1.png',
			// 마커 이미지 크기 지정
			imgSize: new kakao.maps.Size(232, 99),
			// 마커 이미지의 꼭지점 이동 (이미지 넓이의 절반만큼, 높이만큼)
			imgOption: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	// 마커 인스턴스 생성
	const markerInstance = new kakao.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgOption
		),
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, { center: mapInfo.current[Index].latlng, level: 3 });
		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
