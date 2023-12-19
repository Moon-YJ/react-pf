import { useCallback, useEffect } from 'react';
import './Menu.scss';
import * as types from '../../../redux/actionType';
import { useDispatch, useSelector } from 'react-redux';

export default function Menu() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menuReducer.menu);
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false });
	}, [dispatch]);

	useEffect(() => {
		closeMenu();
		window.addEventListener('resize', closeMenu);

		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<>
			{Open && (
				<aside className='Menu'>
					<h1>Mobile Menu</h1>
				</aside>
			)}
		</>
	);
}
