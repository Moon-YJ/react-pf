import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
// npm i react-icons
import { useSelector } from 'react-redux';

export default function Footer() {
	const nameData = useSelector(store => store.memberReducer.members[0].name);
	return (
		<footer className='Footer'>
			<h1>DCODELAB</h1>

			<p>2023 DCODELAB &copy; All Rights Reserved. {nameData}</p>

			<ul>
				<li>
					<FaFacebookF />
					{/* <FaInstagram color={'hotpink'} size={30} /> */}
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
			</ul>
		</footer>
	);
}
