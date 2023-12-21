import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import membersReducer from './redux/membersSlice';
import historyReducer from './redux/historySlice';
import flickrReducer from './redux/flickrSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		members: membersReducer,
		history: historyReducer,
		flickr: flickrReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
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
