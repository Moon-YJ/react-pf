import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';

export default function Contact() {
	const form = useRef();
	const inp_name = useRef(null);
	const inp_email = useRef(null);
	const inp_msg = useRef(null);

	const resetForm = () => {
		//그룹형식의 DOM을 탐색할때 반환되는 두가지 형태의 유사배열
		//parentDOM.children : HTMLCollection (유사배열: forEach, map 모두 반복불가, Live DOM:상태변경이 실시간)
		//parentDOM.querySelectorAll : NodeList (유사배열: forEach로는 반복 가능. Static DOM:탐색된 시점의 정적 DOM)
		/*
			const inputs = form.current.children;
			Array.from(inputs).forEach(input => {
				if (input.name === 'user_name' || 'user_email' || 'message') input.value = '';
			});
		*/
		inp_name.current.value = '';
		inp_email.current.value = '';
		inp_msg.current.value = '';
	};

	const sendEmail = e => {
		e.preventDefault();

		/*
			const [user, email] = form.current.querySelectorAll('input');
			const txt = form.current.querySelector('textarea');
			if (!user.value.trim() || !email.value.trim() || !txt.value.trim()) return alert('모든 항목을 입력해 주세요');
		*/

		if (!inp_name.current.value.trim() || !inp_name.current.value.trim() || !inp_email.current.value.trim() || !inp_msg.current.value.trim())
			return alert('모든 항목을 입력해 주세요');

		emailjs.sendForm('service_5tlzo4v', 'template_f5admma', form.current, '93d00hlz3pqQunJrz').then(
			result => {
				alert('문의 내용이 성공적으로 전달되었습니다');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요. aa@aa.com');
			}
		);
	};

	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [RoadView, setRoadView] = useState(false);

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
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	// 마커 인스턴스 생성 (브라우저 DOM의 기능이 필요없으므로 useEfeect 바깥에서 만들어도 됨)
	markerInstance.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgPos)
	});

	const roadview = () => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	};

	const setCenter = () => {
		roadview();
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	};

	// 컴포넌트 마운시 참조객체에 담아놓은 DOM 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		// 버튼 클릭시 지도 중첩되는 오류 해결
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		markerInstance.current.setMap(mapInstance.current);
		// Index state가 바뀌어서 지도 재랜더링 되면 Traffic값도 false로 변경
		setTraffic(false);
		setRoadView(false);

		// 로드뷰 출력
		// 50은 반경 50m이내의 로드뷰를 출력한다는 의미 (ex. 만약 규모가 큰 장소라면 해당 숫자를 늘려야 함)
		roadview();
		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
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
			<section className='mail'>
				<form
					ref={form}
					onSubmit={sendEmail}>
					<label>Name</label>
					<input
						type='text'
						name='user_name'
						ref={inp_name}
					/>
					<label>Email</label>
					<input
						type='email'
						name='user_email'
						ref={inp_email}
					/>
					<label>Message</label>
					<textarea name='message' />
					<input
						type='submit'
						value='Send'
						ref={inp_msg}
					/>
				</form>
			</section>

			<section className='map-area'>
				<div className='control-box'>
					<nav className='branch'>
						{mapInfo.current.map((el, idx) =>
							//prettier-ignore
							<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
								{el.title}
							</button>
						)}
					</nav>
					<nav className='info'>
						<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
						<button onClick={() => setRoadView(!RoadView)}>{RoadView ? '일반 지도 보기' : '로드뷰 보기'}</button>
						<button onClick={setCenter}>위치 초기화</button>
					</nav>
				</div>

				<section className='tab'>
					<article
						id='map'
						className={!RoadView ? 'on' : ''}
						ref={mapFrame}></article>
					<article
						className={`view-box ${RoadView ? 'on' : ''}`}
						ref={viewFrame}></article>
				</section>
			</section>
		</Layout>
	);
}

/*
	1. cdn을 통해 window에서 불러온 외부 객체값을 가져와서 인스턴스 생성
	2. 인스턴스값을 참조객체 담는 이유 (의존성배열에 불필요하게 등록하지 않기 위해서)
	3. 화면에 변경점이 발생해야 될때 state값에 따라서 변경되게 로직화한 다음 이벤트 발생시 state를 변경해서 화면 재랜더링 유도
*/
