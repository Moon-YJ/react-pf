import { useCookie } from '../../../hooks/useCookie';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
// npm i react-icons

export default function Footer() {
	const setCookie = useCookie();
	const createCookie = () => {
		setCookie('today', 'done', 20);
	};
	console.log(document.cookie);
	return (
		<footer className='Footer'>
			<h1>DCODELAB</h1>

			<p>2023 DCODELAB &copy; All Rights Reserved.</p>

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
			<button onClick={createCookie}>쿠키 생성</button>
		</footer>
	);
}
