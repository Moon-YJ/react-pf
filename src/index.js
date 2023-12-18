import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
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
