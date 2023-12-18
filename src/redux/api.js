//컴포넌트 안쪽에 있는 fetching함수에서 react, DOM API기능을 제외한
//순수자바스크립트로 동작하는 순수함수 형태로 변환한 뒤 내보냄

const path = process.env.PUBLIC_URL;

export const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};

/*
  redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 
  부수효과를 발생시키지 않는 순수함수 형태로 제작

  부수효과 (Side Effect) : 순수 JS기능이 아닌 Web API나 리액트등의 외부 기능들 
  순수함수 (Pure Function) : 부수효과를 발생시키지 않는 순수 자바스크립트로만 구현 가능한 함수
*/
