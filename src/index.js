import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './hooks/useGlobalData';

ReactDOM.render(
	<BrowserRouter>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	- react-query의 기본 개념(면접용)
		1. 서버에서 수시로 변경될수도 있고 클라이언트단에서 변경점을 인지하지 못하는 서버데이터를 fetching된 상태 그대로 전역 store에 static하게 저장하는 개념 자체가 잘못됨(redux-toolkit)
		2. 서버 사이드 데이터와 클라이언트 사이드 데이터는 성격이 다름에도 불구하고 redux로 통합해서 관리하는 것이 비효율적
		3. 서버 사이드 비동기 데이터는 사용자가 호출할때마다 계속해서 최신 데이터를 가져와서 옛날 데이터를 활용하지 않는 것이 중요
		4. 동일한 서버 사이드 데이터를 여러 컴포넌트에서 재활용하려고 할때 매번 같은 데이터를 refetching해야하는 것이 비효율적
		5. 따라서 react-query는 서버사이드 데이터가 필요할때마다 요청을 하되, 이미 한번 불러온 이력이 있는 데이터는 고유의 쿼리키를 붙여서 데이터를 구분
		6. 쿼리 클라이언트 인스턴스 객체를 컴포넌트 전역에 활용 가능하게 하고, 캐싱된 비동기 데이터의 쿼리키를 공유
		7. 클라이언트로 하여금 동일한 쿼리에 등록되어있는 비동기 데이터는 refetching하지않고, 캐싱된 값을 재활용
		8. react-query로 비동기 데이터의 캐싱 시간과 refetching 하지 않을 시간을 비동기 데이터의 성격에 맞게 설정 가능
		9. react-query를 통해서 반환된 데이터는 state에 저장되는 것이 아니기 때문에 useState, useEffect, useCallback 등의 hook을 불필요하게 호출할 필요가 없어서 편리

	- 해당 브랜치에서 react-query 사용하게 된 이유
		1. redux-toolkit으로 모든 비동기 데이터를 store에 저장해서 재활용하고 있었는데
		2. 유독 flickr 컴포넌트만 조금 느리게 나타나는 이슈 발생
		3. flickr 데이터에 새로운 이미지 업로드시 새로 업로드한 이미지가 업데이트 되지 않고 예전 이미지가 출력되는 이슈 확인
		4. 구글링 결과, 비동기 데이터를 전역 state 저장시 redux-toolkit의 한계를 알게되었고, react-query를 적용하게 됨

	- redux-saga -> redux-toolkit -> react-query로 변경하면서 느낀점(기존 redux-saga 프로젝트를 다시 갈아엎고 react-query로 변경하면서 좋아진 점)
		1. client side data와 server side data를 분리함으로써 코드 관리가 수월해짐
		2. 비동기 데이터를 redux로 관리할 필요가 없어지면서 클라이언트 사이드 데이터를 굳이 무거운 redux 시스템으로 관리할 필요가 없어짐
		3. react의 기본 내장 훅인 context API 기반의 createContext, useContext를 조합한 custom hook으로 보다 편리하게 클라이언트 사이드 데이터를 관리할 수 있게됨
		4. react-query로 비동기 데이터 호출 및 쿼리키 관리를 custom hook으로 분리해서 제작하여 react-query를 활용한 비동기 데이터의 재사용성 높임
		5. 비동기 데이터의 성격별로 staleTime, cacheTime을 다르게 설정해서 자주 변경되는 데이터는 새로운 데이터를 호출하게 해주고, 변경 주기가 느린 서버 데이터는 staleTime과 cacheTime은 길게 설정해서 라우터 이동시 불필요하게 refetching하지 않도록 성능 개선

	- react-query 작업 순서
		1. 루트 컴포넌트인 App에서 비동기 데이터별 쿼리키를 공유할 수 있는 쿼리 클라이언트 인스턴스 생성하여 전달
		2. hooks 폴더에서 react-query를 활용한 비동기 데이터 카테고리별 custom hook 생성
		3. useQuery로 fetching호출시 해당 반환 데이터에 대한 고유 쿼리키 등록 및 staleTime, cacheTime 설정
		4. 원하는 컴포넌트에서 해당 hook을 호출하기만 하면 됨
	
	- 이슈: flickr의 경우 option값을 state에 담아서 option값 변경될때마다 재랜더링되게 처리
*/
