import Layout from '../../common/layout/Layout';
import './Community.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPenToSquare } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const customDate = useCustomText('combined');
	const korTime = useRef(new Date().getTime() + 1000 * 60 * 60 * 9);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		// 로컬저장소에 post 키값에 값이 있으면 parsing해서 객체로 리턴
		if (data) return JSON.parse(data);
		// 값이 없으면 빈 배열 리턴 (해당 컴포넌트가 맨 처음 호출될때 한번)
		else return [];
	};

	const [Post, setPost] = useState(getLocalData);
	const [CurNum, setCurNum] = useState(0); //페이징 버튼 클릭시 현재 보일 페이지 번호가 담길 state
	const [PageNum, setPageNum] = useState(0); //전체 PageNum이 담길 state

	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);
	const len = useRef(0); //전체 Post의 개수를 담을 참조객체
	const pageNum = useRef(0); //전체 페이지 개수를 추후에 연산해서 담을 참조객체
	const perNum = useRef(3); //한 페이지당 보일 포스트 개수

	const resetPost = (e) => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	const createPost = (e) => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			return alert('제목과 본문을 모두 작성해 주세요');
		}
		if (refTit.current.value.length > 5 || refCon.current.value.length > 300) {
			return alert('제목은 5글자, 본문은 300글자 미만으로 작성해 주세요');
		}
		// new Date().toLocalString() - 해당 지역의 표준시로 변환해서 반환, but 단점은 원하지 않는 형태로 가공됨
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime.current) }, ...Post]);
		resetPost();
	};

	const deletePost = (delIdx) => {
		if (!window.confirm('해당 게시글을 삭제하시겠습니까?')) return;
		// map과 마찬가지로 기존 배열값을 deep copy해서 새로운 배열 반환
		// 이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 필터링해서 반환
		setPost(Post.filter((_, idx) => delIdx !== idx));
	};

	const enableUpdate = (editIdx) => {
		if (editMode.current) return;
		editMode.current = true;
		// 기존의 Post배열을 반복 돌면서 파라미터로 전달된 editIdx 순번의 Post에만 enableUpdate = true 라는 구분자를 추가해서 다시 state 변경처리
		// 다음번 랜더링때 해당 구분자가 있는 Post 객체만 수정모드로 분기처리하기 위함
		setPost(
			Post.map((el, idx) => {
				if (editIdx === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	const disableUpdate = (disableIdx) => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (disableIdx === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const updatePost = (updateIdx) => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('제목과 본문을 모두 작성해 주세요');
		}
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (updateIdx === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.date = new Date(korTime.current);
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	const getFiltered = (txt) => {
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
	};

	useEffect(() => {
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));

		// 전체 Post 개수 구함
		len.current = Post.length;

		// 전체 페이지버튼 개수 구하는 공식
		// 전체 데이터 개수 / 한 페이지당 보일 포스트 개수
		// 만약 딱 나누어 떨어지면 나눈 몫을 바로 담음
		// 만약 나머지가 있으면 나눈 몫에 1을 더한 값
		pageNum.current =
			len.current % perNum.current === 0 ? len.current / perNum.current : parseInt(len.current / perNum.current) + 1;

		// 새로고침했을때 페이징 버튼이 안뜨는 문제
		// 원인 : 현재 로직이 Post값자체게 변경되면 pageNum.current값이 변경되게 하고 있는데..
		// pageNum.current가 변경되고 state가 아니기 때문에 화면을 자동 재랜더링하지 않는 문제 발생
		// 해결방법 : 만들어진 참조객체값을 state PageNum에 옮겨담음
		setPageNum(pageNum.current);
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<nav className='pagination'>
				{Array(PageNum)
					.fill()
					.map((_, idx) => {
						return (
							<button key={idx} onClick={() => idx !== CurNum && setCurNum(idx)} className={idx === CurNum ? 'on' : ''}>
								{idx + 1}
							</button>
						);
					})}
			</nav>
			<div className='wrap-box'>
				<div className='input-box'>
					<input type='text' placeholder='title' name='tit' ref={refTit} />
					<textarea cols='30' rows='3' name='con' placeholder='content' ref={refCon}></textarea>
					<nav>
						<button onClick={resetPost}>
							<IoCloseSharp />
						</button>
						<button onClick={createPost}>
							<FaPenToSquare />
						</button>
					</nav>
				</div>
				<div className='show-box'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate =
							customDate(date.split('T')[0].slice(1), '.') + ' ' + date.split('T')[1].split('Z')[0].split('.')[0];

						//c>=0 (3*curNum)  && c < 3 (3* (curNum+1)) --> 0,1,2번째 보여야됨
						//c>=3 (3*curNum) && c < 6 (3* (curNum+1)) --> 3,4,5번째 보여야됨
						if (idx >= perNum.current * CurNum && idx < perNum.current * (CurNum + 1)) {
							return (
								<article key={el + idx}>
									{el.enableUpdate ? (
										// 수정 모드
										<>
											<div className='txt'>
												<input ref={refEditTit} type='text' defaultValue={el.title} />
												<textarea ref={refEditCon} cols='30' rows='3' defaultValue={el.content}></textarea>
												<span>{strDate}</span>
											</div>
											<nav>
												<button onClick={() => disableUpdate(idx)}>Cancel</button>
												<button onClick={() => updatePost(idx)}>Update</button>
											</nav>
										</>
									) : (
										// 출력 모드
										<>
											<div className='txt'>
												<h2>{el.title}</h2>
												<p>{el.content}</p>
												<span>{strDate}</span>
											</div>
											<nav>
												<button onClick={() => enableUpdate(idx)}>Edit</button>
												<button
													onClick={() => {
														deletePost(idx);
													}}
												>
													Delete
												</button>
											</nav>
										</>
									)}
								</article>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		</Layout>
	);
}

/*
	Create (데이터 저장) - 글 작성
	Read (데이터 호출) - 글 목록보기
	Update (데이터 변경) - 글 수정
	Delete(데이터 삭제) - 글 삭제

	1. 글 입력 박스, 글 출력박스 생성
	2. 전체글을 관리할 배열 state를 생성 [{글정보1}, {글정보2}, {글정보3}]
	3. 글 입력박스에 글 입력 후 저장 버튼 클릭시 글 정보를 객체형태로 state 계속 추가 (Create)
	4. 배열 state에 추가된 값들을 반복돌면서 글 리스트 출력 (Read)
	5. 글 출력시 삭제버튼, 수정버튼 추가해서 출력
	6. 글 리스트에서 삭제버튼 클릭시 해당 배열 state에서 이벤트가 발생한 순번의 객체를 제거해서 글 삭제 (Delete)
*/

/*
	LocalStorage: 모든 브라우저가 내장하고있는 경량의 저장소(콘솔창 Application에서 확인가능)
	- 문자값만 저장 가능 (5MB)
	- 로컬저장소에 문자열 이외의 값을 저장할때는 강제로 문자화시켜서 저장
	- 로컬저장소의 값을 JS로 가져올때는 문자값을 반대로 객체화시켜서 호출
	
	LocalStorage객체에 활용가능한 메서드
	- localStorage.setItem('key', '문자화된 데이터'); //해당 키값에 데이터를 담아서 저장
	- localStorage.getItem('key'); //해당 키값에 매칭되는 데이터를 가져옴
*/

/*
	글 수정(Update)로직 단계
		1. 각 포스트에서 수정버튼 클릭시 해당 객체에 enableUpdate=true라는 프로퍼티를 동적으로 추가 후 state 저장
		2. 다음번 랜더링 사이클에서 포스트를 반복돌며 객체에 enableUpdate값이 true이면 제목 본문을 input 요소에 담아서 출력하도록 분기처리(출력시 수정모드로 분기처리해서 출력)
		3. 수정모드일때는 수정취소, 수정완료 버튼 생성
		4. 수정모드에서 수정취소버튼 클릭시 해당 포스트 객체에 enableUpdate=false로 변경해서 다시 출력모드로 변경
		5. 수정모드에서 수정완료 버튼 클릭시 해당 폼요소에 수정된 value값을 가져와서 저장한 뒤 다시 출력모드로 변경
*/

/*
	전체 페이지버튼 개수 구하는 공식

	- 전체 데이터 개수 / 한 페이지당 보일 포스트 개수 
		--> 딱 나누어 떨어지면 나눈 몫을 바로 담음
	- 전체 데이터 개수 / 한 페이지당 보일 포스트 개수 
		--> 만약 나머지가 있으면 나눈 몫에 1을 더한 값
*/
