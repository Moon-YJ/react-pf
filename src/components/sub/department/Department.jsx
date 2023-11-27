import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const [MemberData, setMemberData] = useState([]);
	const path = process.env.PUBLIC_URL; // public폴더까지의 경로를 구하는 구문
	const fetchDepartment = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.catch((err) => console.log(err))
			.then((json) => setMemberData(json.members));
	};
	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Department'}>
			{MemberData.map((member, idx) => {
				return (
					<div key={member + idx}>
						<h2>{member.name}</h2>
					</div>
				);
			})}
		</Layout>
	);
}

/*
	- React에서 외부데이터를 가져와서 화면에 동적으로 출력하는 순서
		1. 외부 데이터를 가져와서 담을 빈 state 추가 (보통 빈 배열로 초기화)
		2. fetch문을 이용해서 특정 URL의 데이터를 가져온 뒤,동기적으로 배열로 뽑음. 그 다음에 state에 담아주는 함수 정의
		3. 위에서 만든 함수를 의존성 배열이 비어있는 useEffect문 안쪽에서 호출 (다음번 랜더링 타이밍에 state값 활용 가능)
		4. state에 담겨있는 데이터 배열값을 map으로 반복 돌면서 JSX 구문 생성
*/
