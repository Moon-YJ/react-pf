/*
  - use로 시작하는 커스텀hook 함수는 컴포넌트단에서 호출 가능
  - 컴포넌트 안쪽의 또다른 hook이나 일반 핸들러 함수 안쪽에서는 호출 불가능
  - 해결방법: 커스텀hook이 특정 기능을 수행해주는 또 다른 함수를 내부적으로 생성한 다음, 해당 함수를 리턴
  - 일반 핸들러 함수 안쪽에서 커스텀hook자체는 호출 불가하지만 커스텀hook이 리턴한 자식 함수는 호출 가능
*/

export function useSplitText() {
	// 해당 useSplitText hook은 아래의 함수를 리턴
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			count++;
			tags += `
        <span style='transition-duration:${speed}s; transition-delay:${
				interval * count
			}s; display: inline-block;'>${letter}</span>
      `;
		}
		ref.innerHTML = tags;
	};
}

export function useCustomText(type) {
	if (type === 'title') {
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		};
	}
	if (type === 'shorten') {
		return (txt, len = 50) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}
	if (type === 'combined') {
		return (txt, seperate) => {
			const resultText = txt //원본텍스트를 가져옴
				.split(seperate) //split으로 두번째 인수로 받은 구분자로 분리해서 배열로 반환
				.map((data) => data.charAt(0).toUpperCase() + data.slice(1)) //배열값을 map으로 반복돌며 첫글자만 대문자로 변환해서 새로운 배열로 반환
				.join(' '); //새롭게 반환된 배열을 다시 빈칸을 구분자로 해서 하나의 문자열로 이어붙여줌
			return resultText; //위에서 만들어진 문자값을 최종적으로 반환
		};
	}
}
