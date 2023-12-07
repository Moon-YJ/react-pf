import Layout from '../../common/layout/Layout';
import './Community.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPenToSquare } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const customDate = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		// 로컬저장소에 post 키값에 값이 있으면 parsing해서 객체로 리턴
		if (data) return JSON.parse(data);
		// 값이 없으면 빈 배열 리턴 (해당 컴포넌트가 맨 처음 호출될때 한번)
		else return [];
	};
	const [Post, setPost] = useState(getLocalData);
	const refTit = useRef(null);
	const refCon = useRef(null);

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
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};

	const deletePost = (delIdx) => {
		// map과 마찬가지로 기존 배열값을 deep copy해서 새로운 배열 반환
		// 이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 필터링해서 반환
		setPost(Post.filter((_, idx) => delIdx !== idx));
	};

	const getFiltered = (txt) => {
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<div className='Community'>
			<Layout title={'Community'}>
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
							console.log(date);
							const strDate = customDate(date.split('T')[0].slice(1), '.');
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										<span>{strDate}</span>
									</div>
									<nav>
										<button onClick={() => getFiltered('a')}>Edit</button>
										<button
											onClick={() => {
												deletePost(idx);
											}}
										>
											Delete
										</button>
									</nav>
								</article>
							);
						})}
					</div>
				</div>
			</Layout>
		</div>
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
