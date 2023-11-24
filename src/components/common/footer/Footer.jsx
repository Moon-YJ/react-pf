import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
// npm i react-icons

export default function Footer() {
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
		</footer>
	);
}
