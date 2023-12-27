import { createContext, useContext, useState } from 'react';

// 전역 데이터 객체 생성
export const GlobalContext = createContext(null);

// 전역객체 생성후 특정 state값들을 내부로 전달해주는 wrapping component 생성
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Dark, setDark] = useState(false);

	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ModalOpen, setModalOpen, Dark, setDark }}>{children}</GlobalContext.Provider>;
}

// GlobalContext의 값을 호출할 수 있는 custom hook
// useContext로 반환한 전체 전역 데이터를 내보내는 custom hook 생성 후 export
export function useGlobalData() {
	return useContext(GlobalContext);
}
