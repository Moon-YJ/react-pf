import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: { open: false },
	reducers: {
		menuToggle: state => {
			state.open = !state.open;
		},
		menuClose: state => {
			state.open = false;
		}
	}
});

export const { menuToggle, menuClose } = menuSlice.actions;
export default menuSlice.reducer;
