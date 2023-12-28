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
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalData } from './hooks/useGlobalData';
import CookieModal from './components/common/cookieModal/CookieModal';
//import { useCookie } from './hooks/useCookie';

export default function App() {
	const queryClient = new QueryClient();
	const { Mode } = useGlobalData();

	//useCookie('today', 'done', 20);

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Mode === 'light' ? 'light' : 'dark'} ${useMedia()}`}>
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

				<CookieModal
					wid={300}
					ht={200}>
					<h1>쿠키팝업</h1>
				</CookieModal>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/*
	- react-query 개념 정리(server-side-data 관리)
		: server-side-data를 static한 상태로 전역객체(global context)에 물리적으로 저장하는 것이 아닌
		: 서버쪽 데이터가 필요할때마다 호출해서 항상 최신상태의 서버 데이터 사용하기 위한 라이브러리
		: 쿼리키를 통해서 특정 fetching된 promise 리턴값을 매핑해서 서버요청시에 동일한 쿼리키에 이미 매핑된 데이터가 있으면 refetching 하지않음
		: 쿼리키로 초기 데이터 매핑시 cacheTime(->gcTime), staleTime으로 서버데이터의 캐시 저장 시간 및 refetching 금지 시간 지정

	- react-query 작업 순서
		1. index 혹은 App 컴포넌트에서 query client 인스턴스 생성 후 Provider 통해서 전역 전달 (모든 컴포넌트에서 등록된 쿼리키 공유 가능)
		2. fetching func, 쿼리키 등록하는 custom hook 생성 (cacheTime, staleTime 및 서버 쿼리 관련 옵션 지정)
		3. 비동기 데이터가 필요한 컴포넌트에서 custom hook 호출 및 반환하는 객체의 property값 사용 (data, isSuccess, isError, isLoading)

	- react-query 사용시의 이점
		: 서버 데이터를 위한 useState, useEffect, useCallback 등의 hook 사용 불필요
		: 한번 fetching한 내역이 있는 데이터는 쿼리키가 동일하다는 전제하에 cache에 등록된 값 재활용 및 불필요하게 서버 요청하지 않음
		: 쿼리 옵션에 따라서 항상 최신의 서버 데이터를 핸들링 가능

	- context api를 활용한 전역 데이터 관리 custom hook (client-side-data 관리)
		: 복잡한 서버데이터는 이미 react-query가 관리하고 있으므로 간단한 client-side-data를 굳이 redux같은 외부 라이브러리로 관리하는 것이 불필요
		: react에 기본 내장되어있는 context api 기반의 createContext, useContext를 이용한 custom hook 사용

	- context api 기반 custom hook 작업 순서
		: createContext로 전역 context 생성(=store 개념)
		: 전역 context에 내장되어있는 Provider로 App을 감싸서 전역으로 관리할 State 전달
		: 자식 컴포넌트에서는 useContext를 활용해서 자유롭게 전역 context값 접근 가능
*/
