import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import * as types from '../../../redux/actionType';

export default function Header() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menuReducer.menu);
	const Dark = useSelector(store => store.darkReducer.dark);
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>DCODELAB</Link>
			</h1>

			<ul>
				<li>
					<NavLink
						to='/department'
						activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/youtube'
						activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/gallery'
						activeClassName={'on'}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/community'
						activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/members'
						activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/contact'
						activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
			</ul>

			<div
				className={`themeBox ${Dark ? 'dark' : ''}`}
				onClick={() => {
					dispatch({ type: types.DARK.start, payload: !Dark });
				}}>
				<div className='ball'></div>
			</div>

			<button
				className='menuToggle'
				onClick={() => dispatch({ type: types.MENU.start, payload: !Open })}>
				Menu
			</button>
		</header>
	);
}
