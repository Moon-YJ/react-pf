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
					{/* window.open은 권장사항 아님 (성능이슈나 보안 이슈) */}
					{/* 외부 링크 연결시 일반 a태그 처리(Link 안써도됨), rel='noopener noreferrer'속성 추가해서 window객체에 이전 리액트 컴포넌트의 정보를 참조 못하게 처리 */}
					<a
						href='https://www.naver.com'
						target='_self'
						rel='noopener noreferrer'>
						<FaFacebookF />
					</a>
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
