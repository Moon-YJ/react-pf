import { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { GoMail } from 'react-icons/go';
import { BsTelephone } from 'react-icons/bs';
import { useThrottle } from '../../../hooks/useThrottle';

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

	// 로드뷰 출력함수
	// useRef를 useCallback으로 메모이제이션 처리해서 Index state 변경될때마다 풀리게
	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	/*
		const roadview = () => {
			new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
				new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
			});
		};
	*/

	// 지도 가운데로 위치하게 하는 함수
	// 윈도우에 등록된 함수(언마운트시 호출되는 클린업함수)는 참조객체에 담으면 안되고 useCallback으로 처리해야함
	// 내부에 변경될만한 state값이 있으면 배열에 등록해서 해당 값이 바뀔때는 memoization 풀어줌
	const setCenter = useCallback(() => {
		//roadview.current();
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	// useThrottle로 setCenter함수를 인수로 넣어서 throttling 적용된 새로운 함수로 반환
	// 고차함수(hof)
	const throttled = useThrottle(setCenter, 300);

	// Index값 변경될때마다 지도 정보 갱신해서 화면 재랜더링 useEffect
	// 컴포넌트 마운시 참조객체에 담아놓은 DOM 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		// 버튼 클릭시 지도 중첩되는 오류 해결
		mapFrame.current.innerHTML = '';
		// Index값이 변경된다는 것은 출력할 맵정보가 변경된다는 의미이므로 기존 프레임 안쪽의 정보를 지워서 초기화
		// 지점정보 바뀔때마다 로드뷰 초기화
		viewFrame.current.innerHTML = '';
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
		// 로드뷰 이미지 때문에 무거워지는 이슈(따라서 처음 마운트시 실행하지 않음)
		//roadview.current();
		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		// 마우스 휠 줌 기능 비활성화
		mapInstance.current.setZoomable(false);
	}, [Index]);

	// Traffic 토글시마다 화면 재랜더링 useEffect
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	// RoadView 토글시마다 화면 재랜더링 useEffect
	useEffect(() => {
		// RoadView 토글시 무조건 로드뷰를 출력하는 것이 아닌 viewFrame안의 내용이 없을때만 호출하고
		// 값이 있을때는 기존 데이터를 재활용해서 불필요한 로드뷰 중복 호출을 막음으로써 고용량 이미지 refetching 방지
		// RoadView가 true이고 viewFrame 안쪽에 자식요소가 없을때만 roadview 실행(해당조건이 없으면 로드뷰버튼 클릭할때마다 이미지가 새로 계속 추가됨)
		RoadView && viewFrame.current.children.length === 0 && roadview();
	}, [RoadView, roadview]);

	// 윈도우 객체에 등록할 핸들러 함수를 따로 useEffect로 빼놓은 다음, 의존성 배열을 가급적 비워두는 것이 좋음
	// 윈도우에 등록되는 핸드러함수에 만약 특정 state값을 의존한다면, 연결되는 함수 이름 자체를 의존성배열에 등록하되 useCallback처리
	useEffect(() => {
		// resize 이벤트에 throttle 적용된 함수를 등록(resize 시스템 이벤트 자체는 60번 발생하지만 핸들러 함수는 1초에 두번만 실행됨)
		window.addEventListener('resize', throttled);

		return () => window.removeEventListener('resize', throttled);
	}, [throttled]);

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
					<nav className='branch-set'>
						{mapInfo.current.map((el, idx) =>
							//prettier-ignore
							<div key={idx} onClick={() => setIndex(idx)} className={`branch  ${idx === Index ? 'on' : ''}`}>
								<h3>{el.title}</h3>
								<div className='info'>
									<span className="tel">
										<BsTelephone />
										<span>02-222-222</span>
									</span>
									<span className="mail">
										<GoMail />
										<span>dfd@dafd.com</span>
									</span>
								</div>
							</div>
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

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	- Contact.jsx 기능 소개
		1. email.js API로 폼 메일 기능 연동
		2. Kakao map API 활용해서 카카오 지도 정보 연동
		3. 지점이 많은 경우, 많은 지도 정보를 효율적으로 관리하기 위해서 객체값을 연동하여 지도 데이터 반복 출력
		4. 로드뷰 기능 추가
		5. useThrottle 커스텀훅 생성해서 기능 적용 (useThrottle.js 작업가이드 p.100)

	- 이슈사항
		1. cdn 방식으로 데이터를 연동하다보니 리액트 컴포넌트 안에서 kakao객체 호출 실패
		2. 지도 정보가 여러개 있어서 사용자 이벤트에 의해 지도 정보를 실시간으로 변경해야해서 코드가 길어짐
		3. 로드뷰 출력시 불필요하게 무겁게 동작
		4. 브라우저 리사이즈했을때 마커위치가 센터에서 벗어나는 문제
		5. 브라우저 리사이즈시 지도 이미지 버벅이는 문제

	- 해결
		1. 컴포넌트 안에서 비구조화할당으로 window객체로부터 직접 kakao객체 가져와서 활용
		2. 여러가지 지도 정보를 각각의 객체로 구조화해서 배열로 그룹화한뒤 자동으로 지도 인스턴스 생성하는 로직 구현
		3. 지도 정보 변경시 로드뷰 인스턴스도 같이 생성함으로 인해서 발생하는 문제였으므로  roadview버튼 클릭이벤트가 발생하지 않으면 인스턴스 생성하지 않게 처리
		4. window resize이벤트로 마커 위치 센터로 이동시키는 메서드 호출
		5. 리사이즈할때마다 불필요하게 많은 지도 정보를 불러오게되므로 useThrottle custom hook을 생성해서 1초에 60번 발생하던 함수 호출은 세번으로 줄임 (--> useThrottle.js 작업가이드 p.100)
*/
