import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	1. Redux
		- store: 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있게 컴포넌트 외부에 있는 독립적인 전역 데이터 공간
		- reducer: 변경될 데이터를 store에 전달해주는 변형자 함수 (action객체를 받아야지만 store에 변경요청 가능)
		- action: 컴포넌트가 reducer에 변경요청을 의뢰할 때 필요한 특별한 형태의 객체 {type: '타입', payload: '데이터'}
		===> Redux 기능
		- dispatch: 컴포넌트에서 action객체를 전달할때는 무조건 dispatch를 통해서만 가능
		- selector: 컴포넌트에서 전역 store 데이터 요청할때는 무조건 selector를 통해서만 호출 가능
		===> react-redux 기능
*/

/*
	Redux버전에서 숙지할 내용
	- flickr 제외하고 비동기 데이터 사용 컴포넌트에서 store를 통해 데이터 공유 (Member, History, Youtube)
	- client side data를 store를 통해 공유 (Modal, Menu, Dark)
	- Layout에서 0.3초후에 on이 붙게 되는데 라우터 이동이 0.3초보다 빨리 일어날때 optional chaining으로 에러 핸들링
	- Contact 컴포넌트에서 throttle이 적용된 throttledSetCenter resize 이벤트 연결문을 따로 useEffect로 분리
	- store에서 전역 데이터로 관리하고 있지 않은 gallery 컴포넌트의 메모리 누수 해결
*/
