import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect, useRef, useCallback, StrictMode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import * as types from './redux/action';

export default function App() {
	// 순서 2 - dispatch 함수 활성화(추후 fetching된 데이터를 액션에 담아서 reducer에게 전달하기 위함)
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const Dark = useSelector(store => store.darkReducer.dark);

	// fetching된 데이터값을 받아서 action객체에 담은 뒤 dispatch로 reducer에 전달하는 함수를 정의
	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 7;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	// 순서 4 - 컴포넌트가 처음 마운트 되었을때 함수를 호출해서 비동기 데이터를 reducer에 전달
	// 그러면 첫번째 랜더링에서는 전역 store의 값은 빈배열
	// 두번째 랜더링 타이밍에 비로소 각 컴포넌트에서 useSelector로 해당 비동기 데이터에 접근 가능
	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
			<Route
				exact
				path='/'
				component={MainWrap}
			/>
			<Route
				path='/department'
				component={Department}
			/>
			<Route
				path='/gallery'
				component={Gallery}
			/>
			<Route
				path='/community'
				component={Community}
			/>
			<Route
				path='/members'
				component={Members}
			/>
			<Route
				path='/contact'
				component={Contact}
			/>
			<Route
				path='/youtube'
				component={Youtube}
			/>
			<Route
				path='/detail/:id'
				component={Detail}
			/>
			<Footer />
			<Menu />
		</div>
	);
}

/*
	*** 필수 이해 필요
	- reducer, store, app으로의 데이터 전달 흐름 이해
	- reducer가 하는 역할
	- action 객체가 필요한 이유
	- 컴포넌트에서 데이터 호출 및 데이터 변경 요청을 위한 useSelector, useDispatch
	- App에서 fetching후 action 객체를 통해 dispatch로 reducer에 데이터 변경 요청 흐름

	- reducer(변경자) : dispatch 요청에 따른 state 정보값 변경
	- store: reducer로부터 전달받은 state 정보값을 저장
	- dispatch : state 정보값 변경을 요청
	- action : dispatch로 요청을 보내기 위한 변경사항이 담겨있는 객체 {type, payload}

	*** redux 작업 흐름
	1. 컴포넌트에서 fetch 데이터 요청을 해서 반환된 결과값을 action객체로 담아서 dispatch로 reducer에 전달
	2. reducer는 해당 action객체의 타입에 따라 데이터를 변형한뒤 store에 전달
	3. 스토어는 reducer로부터 전달받은 state정보값을 저장하고 index.js 에서 Provider에 의해서 App컴포넌트에 전달됨
	4. 각 컴포넌트에서는 useSelector를 통해서 자유롭게 전역 스테이트값 호출 가능
	5. 자식 컴포넌트에서 리듀어에 전역 스테이트값 변경요청을 할때는 변경사항을 action객체에 담아서 dispatch로 배송
*/

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	코딩가이드 한 페이지씩 정리(연혁 나열 X)

	- App.jsx에서의 개발 흐름
		1. 루트 컴포넌트이기 때문에 모든 비동기 데이터를 호출한 후, 액션 객체를 생성해서 dispatch로 reducer에 전달한 후 store에 저장
		2. 메인 페이지, 서브 페이지용 컴포넌트를 Router 설정
		3. 실무에서 아직 레거시(옛날)코드를 많이 쓰기 때문에 일부러 react-router-dom 5버전대를 썼고, 마찬가지로 프로젝트에서 redux를 활용해보고자 react 17버전으로 작업
		4. (중요***) media query로 작업하지 않은 이유: module sass는 아니지만 컴포넌트의 효율적인 유지보수를 위해서 폴더별로 jsx와 scss파일을 그룹화하다보니 일반 미디어쿼리로 반응형처리하기에는 반복작업과 css변수 활용에 어려움이 있어서 useMedia custom hook을 직접 만들어서 스크립트로 반응형 처리할 수 있게 구현

	- 해당 컴포넌트 작업시 발생했던 이슈사항
		1. 원래 비동기 데이터를 여러 컴포넌트에서 재활용하기 위해서 redux로 전역관리 하려고 했는데, flickr데이터처럼 검색이 필요하거나 사용자 이벤트에 따라서 빈번하게 비동기 데이터를 다시 불러와야하는 경우에 redux로 처리하기 힘들었다. 따라서 flickr 제외한 나머지 비동기 데이터만 redux로 전역관리
		2. 루트 컴포넌트인 App.jsx에서 모든 비동기 데이터를 불러와야하는 번거로움(지저분함)

	- 해결
		1. flickr만 redux로 작업하지 못해서 고민하던 중에 비동기데이터 전역 State 처리를 위한 redux-saga가 있음을 알게 되었고, 따라서 saga버전으로 작업을 진행했다
*/
