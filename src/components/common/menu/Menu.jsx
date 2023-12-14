import { useCallback, useEffect } from 'react';
import './Menu.scss';

export default function Menu({ SetMenuToggle }) {
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && SetMenuToggle(false);
	}, [SetMenuToggle]);

	useEffect(() => {
		closeMenu();
		window.addEventListener('resize', closeMenu);

		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<aside className='Menu'>
			<h1>Mobile Menu</h1>
		</aside>
	);
}
