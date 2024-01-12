import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer, { fetchYoutube } from './redux/youtubeSlice';
import membersReducer, { fetchDepartment } from './redux/membersSlice';
import historyReducer, { fetchHistory } from './redux/historySlice';
import flickrReducer, { fetchFlickr } from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import menuReducer from './redux/menuSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		members: membersReducer,
		history: historyReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App api={[fetchDepartment, fetchHistory, fetchYoutube, fetchFlickr]} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

//npm i @reduxjs/toolkit@1 react-redux
/*
	리덕스 비동기데이터의 효율적인 처리를 위한 대표적인 미들웨어 두가지
	- redux-saga: action객체의 변화를 감시하면서 적절한 상태 변화 시점에 action객체를 생성해서 reducer에 전달하는 미들웨어(generator 사용)
	- redux-thunk: action객체가 아니라 함수 자체를 reducer에 전달하게 해주는 미들웨어(해당 함수가 자동으로 action 객체를 반환하도록 처리)

	- redux-toolkit 이라는 thunk 기반의 통합 전역관리 패키지가 나오게 된 배경
		: 초반에는 action 객체를 중앙 집중적으로 관리하면서 reducer에 전달하는 방식(saga)이 기존 리덕스를 사용하던 개발자에게 thunk 방식에 비해서 더 친숙해서 saga를 많이 쓰게됨
		: saga방식으로 하다보니 관리할 파일의 개수가 많아지고 코드의 관리가 어려워짐
		: 데이터 카테고리별로 전역관리할 비동기 데이터를 분리할 필요성
		: 이시점에 불편했던 thunk방식의 코드를 개선한 redux-toolkit이라는 통합 라이브러리 등장
		
	- redux-toolkit의 장점
		: 데이터별로 전역상태관리 파일을 분리할 수 있고
		: 사용자가 직접 데이터 상태별로 action타입을 만들 필요없이 자동 생성됨
		: 하나의 slice 파일안에 api함수와 reducer함수를 간결한 문법으로 관리 가능
*/

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	- redux-toolkit 개념(redux, 미들웨어인 thunk, immer.js가 조합된 통합 라이브러리)
		1. redux-thunk: saga와 더불어서 많이 쓰이는 비동기 데이터 관련 미들웨어
		2. thunk는 함수 자체를 객체로 묶어서 reducer로 전달하는 방식
		3. immer.js를 기반으로 saga대비 코드의 구조가 간결해짐

	- redux-toolkit으로 프로젝트를 진행한 이유
		1. 숙지해야할 saga전용의 메서드가 많고 파일구조도 복잡하고 코드양이 많아서 코드 관리가 어렵고 액션타입 일일이 지정해야하는 불편함
		2. 특정 카테고리의 비동기 데이터를 관리하기 위해서는 saga, reducer, api, actionType파일들을 같이 봐야하는 번거로움
		3. 비동기 데이터를 카테고리별로 관리하기 힘듦(파일별로 관리해야하므로)

	- redux-toolkit을 쓰면서 좋았던 점
		1. toolkit slice파일의 reducer가 자동으로 asyncThunk메서드가 반환하는 비동기 promise의 상태를 인지해서 일일이 액션타입을 지정할 필요가 없어서 편함 (pending, fulfilled, rejected 상태를 인지해서 내부적으로 고유액션타입을 자동생성해줌)
		2. api함수 및 reducer함수를 slice파일 하나로 관리할 수 있기 때문에 코드의 복잡도가 내려가고 전역관리하는 비동기 데이터를 카테고리별로 관리할 수 있음

	- redux-toolkit 작업 순서
		1. 데이터 카테고리별로 slice파일안에 asyncThunk 비동기 데이터 반환 및 액션객체 생성함수와 reducer역할을 해주는 slice함수를 같이 정의
		2. index.js에서 각각의 slice함수가 반환하는 객체들을 합쳐서 store로 만든 다음 Provider로 App에 전달
		3. fetching함수도 같이 App에 props로 전달
		4. App에서 배열로 전달된 데이터별 thunk함수를 반복호출하면서 dispatch로 slice에 전달 

	- redux-toolkit의 단점
		1. 처음에는 자주쓰는 비동기 데이터를 전역 데이터에 저장해서 재활용하는것이 불필요하게 refetching하지 않아도돼서 편하다고 생각됨
		2. **중요** 비동기 데이터(서버 데이터)는 클라이언트에 제어권이 없는 수시로 변경되는 데이터인데, fetching한 그 순간의 정적인 상태로 store에 저장하는 것이 적절하지 않다는 생각이 듦(store에 저장되어있는 비동기 데이터는 최신 데이터가 아닌, fetching된 시점의 옛날 데이터(outdated data)인데 모든 컴포넌트에서 해당 데이터를 공유하는 것은 데이터의 신뢰성에 문제가 있을 것이라고 판단됨)
		3. 비동기 데이터를 컴포넌트에서 활용하기 위해서는 'state 생성 -> fetching함수 정의 -> useCallback으로 fetching함수 메모이제이션 -> useEffect에서 fetching함수 호출' 이라는 번거로운 작업흐름
		4. react-query라는 새로운 개념의 비동기 데이터 방법을 알게됨(배민에서 처음 발표) (--> react-query 가이드 문서 p.100)
*/
