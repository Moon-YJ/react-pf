import { createSlice } from '@reduxjs/toolkit';

// server side data 관리가 아닌 client side data이기때문에 createAsyncThunk 함수 불필요
const modalSlice = createSlice({
	name: 'modal',
	initialState: { open: false },
	// extraReducers: [pending, fulfilled, rejected] 상태관리를 위한 reducer
	// 정적인 데이터는 reducers 사용
	// slice함수 호출시 modalSlice라는 객체반환
	reducers: {
		modalOpen: state => {
			state.open = true;
		},
		modalClose: state => {
			state.open = false;
		}
	}
});

// const {reducer: 변경된 전역 객체, actions: reducer에 등록된 action객체 생성 함수} = createSlice()
// 해당 action객체 생성함수는 추후 컴포넌트에서 호출해서 반환된 action 객체를 dispatch로 전달
export const { modalOpen, modalClose } = modalSlice.actions;
// 해당 reducer객체는 index.js에서 store에 담김
export default modalSlice.reducer;
