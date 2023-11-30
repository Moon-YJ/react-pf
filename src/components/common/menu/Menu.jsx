import { useEffect } from 'react';
import './Menu.scss';

export default function Menu({ SetMenuToggle }) {
	const closeMenu = () => {
		window.innerWidth >= 1000 && SetMenuToggle(false);
	};

	useEffect(() => {
		closeMenu();
		window.addEventListener('resize', closeMenu);

		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, []);

	return (
		<aside className='Menu'>
			<h1>Mobile Menu</h1>
		</aside>
	);
}
