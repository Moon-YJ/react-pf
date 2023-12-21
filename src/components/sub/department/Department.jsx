import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

// 비동기 데이터를 내부적으로 활용하는 컴포넌트에서 너무 빨리 다른 컴포넌트로 이동시
// 특정 값이 없다고 뜨면서 memory leak이라는 에러문구 뜨는 현상

// 이유: 특정 컴포넌트 마운트시 해당 컴포넌트가 비동기 데이터를 fetching하는 경우라면, fetching 완료하고 해당값을 state에 담기기까지 물리적인 시간 필요
// 따라서 데이터 fetching 요청이 들어가고 fulfilled(데이터 반환) 이전에 해당 컴포넌트가 언마운트되면 담을 state는 사라졌는데 fetching요청은 계속 수행됨 (== 메모리 누수현상 발생)

// 해결방법: 해당 컴포넌트에 특정 state 만들어서 초기값을 false로 지정하고
// 해당 컴포넌트 언마운트시 state값을 true로 변경
// 해당 state값이 true일때는 state에 값 담기는 것이 실행되지 않도록 조건문 처리
export default function Department() {
	const [Mounted, setMounted] = useState(true);

	const MemberData = useSelector(store => store.memberReducer.members);
	const HistoryData = useSelector(store => store.historyReducer.history);
	const path = useRef(process.env.PUBLIC_URL);
	const combinedTxt = useCustomText('combined');

	useEffect(() => {
		return () => setMounted(false);
	}, [Mounted]);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTxt('history')}</h2>
				<div className='con'>
					{/* HistoryData가 반복도는 각각의 데이터 {년도: 배열} */}
					{Mounted &&
						HistoryData?.map((data, idx) => {
							return (
								<article key={data + idx}>
									{/* 현재 반복돌고 있는 객체의 key값을 뽑아서 h3로 출력 :2016 */}
									<h3>{Object.keys(data)[0]}</h3>
									<ul>
										{/* 현재 반복돌고 있는 객체의 value을 뽑아서 li로 반복출력 [문자열, 문자열] */}
										{Object.values(data)[0].map((list, idx) => {
											return <li key={list + idx}>{list}</li>;
										})}
									</ul>
								</article>
							);
						})}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTxt('members')}</h2>
				<div className='con'>
					{Mounted &&
						MemberData?.map((member, idx) => {
							return (
								<article key={member + idx}>
									<div className='pic'>
										<img
											src={`${path.current}/img/${member.pic}`}
											alt={member.name}
										/>
									</div>
									<h3>{member.name}</h3>
									<p>{member.position}</p>
								</article>
							);
						})}
				</div>
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
