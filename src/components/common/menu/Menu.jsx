import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { menuClose } from '../../../redux/menuSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Menu() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menu.open);
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch(menuClose());
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
