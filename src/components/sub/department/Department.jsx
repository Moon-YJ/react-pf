import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [MemberData, setMemberData] = useState([]);
	const [MemberTit, setMemberTit] = useState('');
	const path = useRef(process.env.PUBLIC_URL);

	const combinedTxt = useCustomText('combined');

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.catch((err) => console.log(err))
			.then((json) => {
				//setMemberData(Object.values(json)[0]); //객체 반복돌면서 value값만 배열로 반환
				setMemberData(Object.values(json)[0]);
				setMemberTit(Object.keys(json)[0]); //객체 반복돌면서 key값만 배열로 반환
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='memberBox'>
				<h2>{combinedTxt(MemberTit)}</h2>
				{MemberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
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

/*
	- 객체의 property에서 key와 value값 반복 도는 방법
		ex. const student = {name: 'David', age: 20}
		- key 반복 돌면서 배열 반환
		: Object.keys(student) //['name', 'age']
		- value 반복 돌면서 배열 반환
		: Object.values(student) //['David', 20]
*/

/*
	문자열 관련 내장 메서드
	- 문자열.charAt(순서): 전체 문자열에서 해당 순서의 문자값만 반환
	- 문자열.slice(순서1, 순서2): 전체 문자열에서 순서1부터 순서2 위치까지 문자를 잘라서 반환
	- 문자열.upperCase(): 문자열 전체를 대문자로 반환
	- 문자열.lowerCase(): 문자열 전체를 소문자로 반환
	- 문자열.split(구분자): 전체 문자열을 구분자를 기준으로 나눠서 배열로 반환
	- 배열.join(구분자): 각 배열값을 구분자로 이어붙이면서 하나의 문자열로 반환
*/