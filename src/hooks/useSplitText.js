/*
  - use로 시작하는 커스텀hook 함수는 컴포넌트단에서 호출 가능
  - 컴포넌트 안쪽의 또다른 hook이나 일반 핸들러 함수 안쪽에서는 호출 불가능
  - 해결방법: 커스텀hook이 특정 기능을 수행해주는 또 다른 함수를 내부적으로 생성한 다음, 해당 함수를 리턴
  - 일반 핸들러 함수 안쪽에서 커스텀hook자체는 호출 불가하지만 커스텀hook이 리턴한 자식 함수는 호출 가능
*/

export function useSplitText(txt) {
	// 해당 useSplitText hook은 아래의 함수를 리턴
	return (txt) => {
		console.log(txt);
	};
}
