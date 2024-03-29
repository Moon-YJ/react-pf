import { createContext, useContext, useState } from 'react';

// 전역 데이터 객체 생성
export const GlobalContext = createContext(null);

// 전역객체 생성후 특정 state값들을 내부로 전달해주는 wrapping component 생성
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Mode, setMode] = useState('light');

	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ModalOpen, setModalOpen, Mode, setMode }}>{children}</GlobalContext.Provider>;
}

// GlobalContext의 값을 호출할 수 있는 custom hook
// useContext로 반환한 전체 전역 데이터를 내보내는 custom hook 생성 후 export
export function useGlobalData() {
	return useContext(GlobalContext);
}

/*
	- useGlobalData() custom hook 만들게 된 이유
		: 기존 비동기 데이터를 react-query로 관리하면서 굳이 간단한 client side data를 무거운 redux시스템으로 관리할 필요가 없어짐
		: 기존 react에 내장되어 있는 context API 기반의 createContext, useContext훅을 활용한 커스텀 훅 제작 필요

		- GlobalProvider : 전역으로 관리할 특정 정보값을 담아서 전역인 App 컴포넌트에 전달해주는 Wrapping Provider 컴포넌트
		- useGlobalData() : 자식 컴포넌트에서 전역 컨텍스트의 값을 가져오기 위한 커스텀 훅
*/
