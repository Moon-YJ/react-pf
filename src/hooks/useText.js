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
        <span style='transition-duration:${speed}s; transition-delay:${interval * count}s; display: inline-block;'>${letter}</span>
      `;
		}
		ref.innerHTML = tags;
	};
}

export function useCustomText(type) {
	const toUpperText = txt => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};

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
		// regEx (regular expression: 정규표현식) - 문자열에서 특정 문자 조합을 찾기 위한 패턴
		// /정규표현식/
		return (txt, spc = ' ') => {
			const resultText = txt
				.split(/-|_|\+/) //인수로 들어가는 특수문자가 -,_,+일때는 해당 구분자로 문자를 분리함 (예약어 문자열은 앞에 \붙여서 처리)
				.map(data => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}
}

/*
	- useText custom hook 만들게 된 이유
		: 각 컴포넌트에서 텍스트 데이터를 가공할때 자주쓰는 패턴을 미리 훅으로 제작해서 불필요한 로직을 반복하지 않기 위함
	
		- useSplitText() : 인수로 특정 문자열을 받아서 해당 문자를 글자별로 분리해주는 함수 반환
		- useCustomText(타입) : 타입에 따라 문자열을 가공해주는 함수 반환
		- 'shorten'타입 : 원하는 글자수만큼 글자짜르고 말줄임표 붙임
		- 'combined'타입 : 특정 기호를 구분해서 문자열을 분리후 원하는 요소로 이어붙여줌
*/
