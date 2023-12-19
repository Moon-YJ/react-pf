import { useEffect, useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { RiSearchLine } from 'react-icons/ri';
import Modal from '../../common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Gallery() {
	const dispatch = useDispatch();
	const id = useRef('195294341@N02');
	const Pics = useSelector(store => store.flickrReducer.flickr);
	// isUser의 초기값으로 id값 등록
	const isUser = useRef(id.current);
	const refNav = useRef(null);
	const refWrap = useRef(null);
	const gap = useRef(20);
	// search 함수가 실행됐는지 확인하기 위한 참조객체
	const searched = useRef(false);

	//const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		// handleInterest함수 호출시 isUser값을 빈문자열로 초기화(false로 인식되는 값)
		isUser.current = '';
		activateBtn(e);
		dispatch({ type: types.FLICKR.start, opt: { type: 'interest' } });
	};

	const handleUser = e => {
		// isUser의 값과 id값이 동일할때만 함수 중지
		if (e.target.classList.contains('on') || isUser.current === id.current) return;
		isUser.current = id.current;
		activateBtn(e);
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: id.current } });
	};

	const handleOwner = e => {
		// isUser값이 비어있을때만 함수 실행
		// 값이 있으면 함수 중지
		//if (isUser.current !== '') return;
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: e.target.innerText } });
	};

	const handleSearch = e => {
		// 기본적으로 submit 이벤트는 전송기능이기 때문에 무조건 화면이 새로고침됨
		// 전송을 하는것이 아니라 리액트로 추가 로직구현을 해야하므로 기본 전송기능 막음
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const searchTxt = e.target.children[0].value;
		if (!searchTxt.trim()) return;
		e.target.children[0].value = '';
		dispatch({ type: types.FLICKR.start, opt: { type: 'search', keyword: searchTxt } });
		// 검색함수가 한번이라도 실행되면 true로 변경
		searched.current = true;
	};

	useEffect(() => {
		refWrap.current.style.setProperty('--gap', gap.current + 'px');
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav
						ref={refNav}
						className='btn-set'>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button
							className='on'
							onClick={handleUser}>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSearch}>
						<input
							type='text'
							placeholder='Search'
						/>
						<button className='btn-search'>
							<RiSearchLine />
						</button>
					</form>
				</article>

				<section
					className='wrap-con'
					ref={refWrap}>
					<Masonry
						className={'container'}
						options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{/* 처음 마운트 됐을때는 실행 안되고 검색했을때만 실행되게 처리 */}
						{Pics.length === 0 && searched.current ? (
							<h2>해당 검색어의 결과값이 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={e => {
												setOpen(true);
												setIndex(idx);
											}}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleOwner}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			<Modal
				Open={Open}
				setOpen={setOpen}>
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].title}
					/>
				)}
			</Modal>
		</>
	);
}

/*
	순서1 - 일반 동적 데이터를 제외한 일반 정적인 컨텐츠가 렌더링됨 (참조객체에 20 상수값을 미리 담아놓음)
	순서2 - 정적인 JSX가 요소 일단은 브라우저에 렌더링완료되었기 때문에 useEffect실행가능해짐
	순서3 - useEffect안쪽에서 미리 참조객체에 연결해놓은 refFrameWrap에 접근 가능 (이때 refFrameWrap에 --gap변수에 20이라는 값을 강제 적용 이때부터는 sass파일에 --gap이란 변수가 없더라도 리액트에서 동적으로 gap이라는 변수값을 넣었기 때문에 활용가능)
	순서4 - 리액트에 동적으로 변수값을 적용해서 돔을생성하고 나면 그 이후 scss가 해당 변수값을 읽어서 화면 스타일링

	(핵심)
	순서1 - 처음에 gap이라는 참조객체값을 해석
	순서2 - 두번째 렌더링타임에 useEffect가 실행되면서 참조객체에 담겨있는 section요소에 강제로 gap변수값을 적용
	순서3 - 세번째 렌더링 타임에 fecthing데이터에 의한 동적 요소가 출력되면서 그때 변수값이 적용된 sass styling 적용 (paint)
*/
