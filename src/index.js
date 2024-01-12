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

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	- Redux-saga로 작업한 이유
		1. redux로 비동기 데이터를 전역관리하다보니 redux는 기본적으로 특정 데이터를 저장하는 역할
		2. redux 자체적으로 비동기 데이터를 처리하기 위한 로직이 없음
		3. redux-saga, redux-thunk, redux-toolkit같은 redux 전용의 미들웨어가 필요함을 구글링을 통해 알게됨
		4. type, payload까지 포함된 action 객체(컴포넌트에서) -> reducer : 비동기 관련 미들웨어 없을때의 순서
		5. type만 포함된 action 객체(컴포넌트) -> saga(middleware가 비동기 데이터요청 수행 후 초기 action객체 생성) -> reducer
		6. generator기반으로 promise객체의 상태값을 내부적으로 판단해서 yield문으로 동기화처리 후 반환된 값을 reducer에 전달
			 : generator함수 (여러개의 함수의 리턴값을 동기적으로 반환하게하는 이터러블 객체를 생성해주는 함수)
		
	- Redux-saga로 비동기 데이터를 전역관리함으로써 개선된 점
		1. api함수를 컴포넌트 외부에서 정의하고, saga 미들웨어를 통해서 비동기 데이터의 상태에 따라 적절한 시점에 action객체에 담아 비동기 데이터를 reducer에 자동으로 전달되도록 처리해줌, 따라서 전역 state에 저장될 데이터의 동기화 이슈를 신경 쓸 필요가 없어짐
		2. 프로젝트에서 수시로 데이터 변경요청이 일어나는 flickr데이터도 컴포넌트 외부에서 saga로 편리하게 관리가 가능해짐
		
	- Redux-saga적용하면서 느낀 개인적으로 아쉬운 부분
		1. 비동기 데이터를 관리하기 위해서 설정해야하는 함수와 파일이 많아져서 편리성이 떨어짐. 코드관리가 오히려 더 어려워지는 문제
		2. 코드 자체가 너무 중앙집중적이라서 전역 관리해야하는 비동기 데이터가 많아질수록 파일에 들어가는 코드양이 많아져서 관리가 어려울 것 같음(saga.js, api.js 등 파일 하나하나에 담겨지는 함수가 많음)
		3. saga 전용 메서드를 숙지해야되는 러닝커브가 높음 (call, put, takeLatest, fork 등등)
		4. 해당 문제점을 개선하기 위해서 또다른 redux 비동기 데이터관련 미들웨어중 redux-toolkit이 해당 단점을 보완해줄 수 있는 미들웨어임을 구글링을 통해 알게됨 (--> redux-toolkit 작업 가이드 p.100)
*/
