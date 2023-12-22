import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	- actionType.js: 문자열인 액션타입명을 재활용하기 편하게 객체형태로 미리 정의한 액션타입 모음집
	- store.js: 전역객체 생성, saga 미들웨어 추가
	- reducer.js: 전역 데이터 변경함수(기존 reducer에 비해 pending,fulfilled, rejected에 대한 추가 분기처리 작업 필요)
	- api.js: fetching함수를 모아놓은 파일(컴포넌트 외부에서 비동기 데이터 호출 함수를 한번에 관리하기 위함)
	- saga.js: reducer에 전달되는 초기 action타입을 캐치해서 saga 자체적으로 데이터 호출 및 비동기데이터 상태에 따른 action 객체를 만들어서 reducer에 재전달
*/

/*
	redux vs redux-saga 작업 순서 비교

	- redux: component(api 호출 및 비동기 데이터 반환) -> reducer(비동기 데이터 받아서 전역 객체 생성) -> store(전역 객체 저장)
	- redux-saga: component(데이터 요청 action 초기 타입만 전달) -> reducer(초기 요청을 받은 뒤 saga에게 작업 전달) -> saga(saga 자체적으로 api 호출 및 비동기 데이터 반환 후 새로운 action 객체 생성후 reducer에 전달) -> reducer(saga로부터 받은 action 객체를 통해서 전역 객체 생성) -> store(전역 객체 저장)

	- 요약: redux는 c->r->s / redux-saga는 c->r**->sa->r**->s
*/

/*
	Redux-saga버전에서 자가진단 항목
	- 비동기 데이터의 fetching함수가 api.js에 등록되어있고 각 컴포넌트 마운트시 fetching호출이 있는지 확인 (Member, History, Youtube, Flickr)
	- client side data가 saga없이 reducer만으로 전역 관리되고있는지 확인 (modal, menu, dark)
	- Layout 컴포넌트 optional chaining 되어있는지 확인
	- 특정 컴포넌트에서 store로부터 복수개의 reducer를 가져올때 store 전체를 가져온다음 비구조화할당 금지 (특정 컴포넌트에 모든 리듀서객체를 다 가져올 필요가 없기 때문)
	- 초기 App에서 api.js로부터 fetching함수 호출시 인수로 전달되는 값이 있다면 (gallery컴포넌트의 opt인수전달) api.js단에서 내부 default option처리가 효율적임 (==> App에서 모든 dispatch문을 반복문 처리 가능하므로)
*/
