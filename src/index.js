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
	- saga만 flickr 연동 하지 않은 이유: flickr는 계속 fetchflickr를 호출해야하는데(랜덤,검색,my 변경할때마다) saga 버전에서는 api함수가 컴포넌트 외부에 있지않고 컴포넌트 내부에 있으므로 의미가 없음
*/

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	- 해당 프로젝트에서 Redux를 사용한 이유(코딩가이드)
		1. 서브 컴포넌트에서 활용하는 멤버 정보, 유튜브, 플리커같은 정보값을 메인 컴포넌트에서 미리보기 형식으로 출력하고싶음
		2. 같은 데이터를 불러오는데 다시 fetching은 비효율적이고, props로 전달하기에는 컴포넌트가 지저분해져서 전역 데이터 관리의 필요성을 느끼게 됨
		3. 따라서 redux를 활용해서 root 컴포넌트인 App 마운트시 전역으로 관리할 모든 데이터를 전역에 담아서 활용
		4. client side data, 자주 갱신될 필요없는 멤버 정보, 유튜브 데이터같은 비동기 데이터는 redux로 전역관리할 수 있었지만 사용자 이벤트에 의해서 수시로 변경되어야하는 flickr 데이터는 redux로 관리하기에는 한계점을 느낌 (--> 면접: 한계점이 무엇인지? redux에서는 컴포넌트 외부에서 api함수를 공유해서 쓸 수 없기 때문에 App에서 API함수를 fetching한 후 action객체를 생성해야하고, Gallery 컴포넌트 안에서 똑같은 API 함수 생성해도 매번 action 객체를 전달해야하는 번거로움이 생김) (--> redux-saga 브랜치에서 해당 문제점 개선 p.100)

	- Redux로 전역 상태관리가 필요한 이유(면접용)
		1. 리액트는 기본적으로 단방향 데이터 바인딩이기 때문에 부모에서 직계 자식 컴포넌트로만 props 전달 가능
		2. 지역 State 정보값을 여러 컴포넌트에서 공유해야하는 경우, props를 통해서 전달하게되면 데이터 전달을 위한 로직이 복잡해짐
		3. 따라서 컴포넌트 외부에서 독립적으로 동작하는 전역 State 생성하여 관리하면 아무리 depth가 깊은 자식 컴포넌트이더라도 전역 State접근 및 변경요청이 자유로워짐, 이를 위한 개발 방법론
		4. context API를 활용한 외부 라이브러리 (리액트 전용 기능 아님)
		5. context API: GlobalContext라는 전역 저장 객체를 생성해서 해당 전역객체를 하위요소에서 구독하면서 action이라는 객체를 통해서 전역객체를 변경요청 처리할 수 있게 해주는 API(Application Programming Interface)
		6. react에서는 context API를 활용한 createContext(내장 함수), useContext(훅) 있음
		7. 위의 리액트 내장 기능을 쓰기 편하도록 라이브러리화한게 redux
		8. store(전역 State가 담기는 객체), reducer(store에 담겨 있는 전역 State를 변경할 수 있는 변형자 함수), action(reducer가 store데이터를 변경하기 위한 특별한 형태의 객체 {type, payload}), dispatch(컴포넌트에서 생성된 action객체를 reducer로 전달해주는 역할)
		9. store, reducer, action은 컴포넌트 외부에서 독립적으로 동작되어야하므로 부수효과를 발생시키지않는 순수함수형태로 로직이 처리되어야함 (순수함수: 동일한 인수가 전달되었을때 동일한 리턴값을 반환하여 부수효과를 발생시키지 않는 함수, 부수효과: 순수 자바스크립트 기능이 아닌 외부요인으로 인해 예상치 못한 리턴값을 반환하는 현상)
		
		역으로 자식 컴포넌트에서 부모 컴포넌트로 값을 전달하는 방법
			1. 부모에서 빈 State를 생성하고 자식 컴포넌트에서 state변경함수를 props로 전달해서 자식 컴포넌트에 담은 state를 부모에서 활용
			2. forwardRef(hoc: 고차 컴포넌트) 생성함수 (redux로 전역관리하고있기 때문에 굳이 사용할 필요 없음)
				: forwardRef(특정 컴포넌트 반환 함수) => 특정 컴포넌트 함수를 인수로 받아서 새로운 컴포넌트 반환
				: forwardRef 사용하는 이유 - 특정 자식 컴포넌트를 호출하는 부모 컴포넌트에게 자기자신을 통째로 forwarding처리
				: forwardRef로 생성된 고차 컴포넌트는 내부적으로 useImperativeHandle이라는 내장 훅 사용 가능
				: 특정 컴포넌트 안쪽에 있는 특정 정보값을 객체로 묶어서 부모 컴포넌트에 역으로 전달 가능
*/
