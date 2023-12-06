import Layout from '../../common/layout/Layout';
import './Community.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPenToSquare } from 'react-icons/fa6';

export default function Community() {
	return (
		<div className='Community'>
			<Layout title={'Community'}>
				<div className='wrap-box'>
					<div className='input-box'>
						<form>
							<input type='text' placeholder='title' name='tit' />
							<textarea cols='30' rows='3' name='con' placeholder='content'></textarea>
							<nav>
								<button>
									<IoCloseSharp />
								</button>
								<button>
									<FaPenToSquare />
								</button>
							</nav>
						</form>
					</div>
					<div className='show-box'></div>
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
	2. 전체글을 관리할 배열 state를 생성 [{글정보1},{글정보2},{글정보3}]
	3. 글 입력박스에 글 입력 후 저장 버튼 클릭시 글 정보를 객체형태로 state 계속 추가 (Create)
	4. 배열 state에 추가된 값들을 반복돌면서 글 리스트 출력 (Read)
	5. 글 출력시 삭제버튼, 수정버튼 추가해서 출력
	6. 글 리스트에서 삭제버튼 클릭시 해당 배열 state에서 이벤트가 발생한 순번의 객체를 제거해서 글 삭제 (Delete)
*/
