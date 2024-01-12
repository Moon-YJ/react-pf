import { useEffect, useState, useRef, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { RiSearchLine } from 'react-icons/ri';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/action';

export default function Gallery() {
	const dispatch = useDispatch();
	const id = useRef('195294341@N02');
	// isUser의 초기값으로 id값 등록
	const isUser = useRef(id.current);
	const refNav = useRef(null);
	const refWrap = useRef(null);
	const gap = useRef(20);
	// search 함수가 실행됐는지 확인하기 위한 참조객체
	const searched = useRef(false);

	const [Pics, setPics] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);

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
		fetchFlickr({ type: 'interest' });
	};

	const handleUser = e => {
		// isUser의 값과 id값이 동일할때만 함수 중지
		if (e.target.classList.contains('on') || isUser.current === id.current) return;
		isUser.current = id.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: id.current });
	};

	const handleOwner = e => {
		// isUser값이 비어있을때만 함수 실행
		// 값이 있으면 함수 중지
		//if (isUser.current !== '') return;
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
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
		fetchFlickr({ type: 'search', keyword: searchTxt });
		// 검색함수가 한번이라도 실행되면 true로 변경
		searched.current = true;
	};

	const fetchFlickr = useCallback(
		async opt => {
			const num = 20;
			const flickr_api = process.env.REACT_APP_FLICKR_API;
			const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
			const method_interest = 'flickr.interestingness.getList';
			const method_user = 'flickr.people.getPhotos';
			const method_search = 'flickr.photos.search';
			const interestURL = `${baseURL}${method_interest}`;
			const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
			const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;

			let url = '';
			opt.type === 'user' && (url = userURL);
			opt.type === 'interest' && (url = interestURL);
			opt.type === 'search' && (url = searchURL);

			const data = await fetch(url);
			const json = await data.json();
			/*
			if (json.photos.photo.length === 0) return alert('해당 검색어의 결과값이 없습니다.');
		*/
			Mounted && setPics(json.photos.photo);
		},
		[Mounted]
	);

	useEffect(() => {
		refWrap.current.style.setProperty('--gap', gap.current + 'px');
		fetchFlickr({ type: 'user', id: id.current });
		return () => setMounted(false);
	}, [fetchFlickr]);

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
											onClick={() => {
												dispatch({ type: types.MODAL.start, payload: true });
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

			<Modal>
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

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	- Gallery.jsx 작업 흐름
		1. flickr API 연동해서 갤러리 데이터 동적 생성
		2. 초기 마이 갤러리 출력
		3. 검색 트렌드 높은 flickr 추천 갤러리를 사용자 이벤트에 의해 refetching후 출력
		4. 사용자 프로필 클릭시 해당 사용자 갤러리 refetching후 출력
		5. masonry API 활용해서 pinterest와 비슷한 UI로 구현
		6. 썸네일 클릭시 모달창 생성 state값 redux로 전역관리

	- 이슈사항
		1. 비동기 데이터가 사용자 이벤트에 의해서 빈번하게 refetching 되어 코드가 지저분해짐
		2. masonry 적용시 UI 위치값을 제대로 인지하지 못해서 적용 안되는 이슈 발생
		3. 반응형 작업시 column 개수 변경할때 Scss에서 너무 많은 구문을 수정해야하는 번거로움 발생
		4. 갤러리 컴포넌트에서 다른 컴포넌트로 빠르게 라우터 이동시 콘솔창에 메모리 누수 오류 발생
		5. 갤러리에서 모달창 생성시 지역 State로 모달창을 제어하니 모달 컴포넌트 재활용 어려움 

	- 해결
		1. 비동기 데이터 fetching함수를 async await로 wrapping하고, 호출해야하는 데이터 카테고리별로 쿼리에 적용할 값을 인수로 전달 ==> 각 이벤트마다 fetching함수를 다르게 전달하는 식으로 코드 재사용할수 있도록 작업
		2. masonry에서 사이 간격을 제대로 인식하지 못하는 문제는 Scss에서 변수를 활용해서 위치값을 보정해주고, 반응형시 변수값 변경만으로 column개수를 효율적으로 제어할 수 있도록 scss 연산 로직 활용
		3. 구글링을 통해서 아직 비동기 데이터가 state가 담기지 않았는데 컴포넌트가 언마운트돼서 발생하는 문제였으므로 State를 생성해서 클린업 함수를 사용해서 해당 컴포넌트 언마운트시 비동기데이터를 state에 담지 않도록 처리
		4. 모달 컴포넌트를 범용적으로 활용하기 위해서 모달창을 열고 닫는 State자체를 redux로 전역관리
*/
