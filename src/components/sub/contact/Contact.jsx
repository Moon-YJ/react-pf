import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const kakao = useRef(window.kakao);

	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const markerInstance = useRef(null);
	const mapInstance = useRef(null);

	// 지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			// 위치값 정밀하게 보정하는 법
			// 기존 구글지도 위치값 복사한 뒤, 카카오예제의 클릭한위치의 마커표시 직접해보기에서
			// 해당 코드를 붙여넣기 하고 원하는 지점을 찍으면 아래와 같이 정밀한 수치값을 확인 가능
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			// 마커 이미지 크기 지정
			imgSize: new kakao.current.maps.Size(232, 99),
			// 마커 이미지의 꼭지점 이동 (이미지 넓이의 절반만큼, 높이만큼)
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
	]);

	// 마커 인스턴스 생성 (브라우저 DOM의 기능이 필요없으므로 useEfeect 바깥에서 만들어도 됨)
	markerInstance.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgPos
		),
	});

	const setCenter = () => mapInstance.current.setCenter(mapInfo.current[Index].latlng);

	// 컴포넌트 마운시 참조객체에 담아놓은 DOM 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		// 버튼 클릭시 지도 중첩되는 오류 해결
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		markerInstance.current.setMap(mapInstance.current);
		// Index state가 바뀌어서 지도 재랜더링 되면 Traffic값도 false로 변경
		setTraffic(false);

		// 로드뷰 출력
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, (panoId) => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(
			new kakao.current.maps.MapTypeControl(),
			kakao.current.maps.ControlPosition.TOPRIGHT
		);
		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		// 마우스 휠 줌 기능 비활성화
		mapInstance.current.setZoomable(false);
		// 지도 중심 이동
		window.addEventListener('resize', setCenter);

		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contact'}>
			<div className='control-box'>
				<nav className='branch'>
					{mapInfo.current.map((el, idx) => (
						<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</button>
					))}
				</nav>
				<nav className='info'>
					<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
				</nav>
			</div>
			<article id='map' ref={mapFrame}></article>
			<article className='view-box' ref={viewFrame}></article>
		</Layout>
	);
}

/*
	1. cdn을 통해 window에서 불러온 외부 객체값을 가져와서 인스턴스 생성
	2. 인스턴스값을 참조객체 담는 이유 (의존성배열에 불필요하게 등록하지 않기 위해서)
	3. 화면에 변경점이 발생해야 될때 state값에 따라서 변경되게 로직화한 다음 이벤트 발생시 state를 변경해서 화면 재랜더링 유도
*/
