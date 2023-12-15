import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
// npm i react-icons
import { useSelector } from 'react-redux';

export default function Footer() {
	// 순서 5 - 전역 store값을 useSelector로 바로 호출 가능
	const MemberData = useSelector(store => store.memberReducer.members);
	return (
		<footer className='Footer'>
			<h1>DCODELAB</h1>
			{/* 아래 코드에서 조건문을 쓰는 이유 */}
			{/* 첫번째 랜더링시에는 store부터 빈 배열이 전달되므로 두번째 랜더링부터 해당 구문이 실행되도록 조건문 처리 */}
			{/* App.js 기준으로 Department 컴포넌트는 메인에서 값이 이미 담긴후에 접속하게돼서 데이터가 있는데 Footer.jsx는 바로 불러와지므로 해당 조건문 필요 */}
			<p>{MemberData && `${MemberData[0].position} : ${MemberData[0].name}`}</p>

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
