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
	const toUpperText = (txt) => {
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
				.map((data) => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}
}
