import { useEffect, useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { RiSearchLine } from 'react-icons/ri';

export default function Gallery() {
	const id = useRef('195294341@N02');
	// isUser의 초기값으로 id값 등록
	const isUser = useRef(id.current);
	const refNav = useRef(null);
	const [Pics, setPics] = useState([]);
	console.log(isUser.current, '!!!');

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		// handleInterest함수 호출시 isUser값을 빈문자열로 초기화(false로 인식되는 값)
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleUser = (e) => {
		// isUser의 값과 id값이 동일할때만 함수 중지
		if (e.target.classList.contains('on') || isUser.current === id.current) return;
		isUser.current = id.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: id.current });
	};

	const handleOwner = (e) => {
		// isUser값이 비어있을때만 함수 실행
		// 값이 있으면 함수 중지
		//if (isUser.current !== '') return;
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = (e) => {
		// 기본적으로 submit 이벤트는 전송기능이기 때문에 무조건 화면이 새로고침됨
		// 전송을 하는것이 아니라 리액트로 추가 로직구현을 해야하므로 기본 전송기능 막음
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const searchTxt = e.target.children[0].value;
		if (!searchTxt.trim()) return;
		e.target.children[0].value = '';
		fetchFlickr({ type: 'search', keyword: searchTxt });
	};

	const fetchFlickr = async (opt) => {
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
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: id.current });
		// fetchFlickr({ type: 'search', keyword: 'ocean' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav ref={refNav} className='btn-set'>
					<button onClick={handleInterest}>Interest Gallery</button>
					<button className='on' onClick={handleUser}>
						My Gallery
					</button>
				</nav>

				<form onSubmit={handleSearch}>
					<input type='text' placeholder='Search' />
					<button className='btn-search'>
						<RiSearchLine />
					</button>
				</form>
			</article>

			<section>
				<Masonry className={'container'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.length === 0 ? (
						<h2>해당 검색어의 결과값이 없습니다.</h2>
					) : (
						Pics.map((pic, idx) => {
							return (
								<article key={pic.id}>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
											alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
										/>
									</div>
									<h2>{pic.title}</h2>
									<div className='profile'>
										<img
											src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
											alt={pic.owner}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
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
	);
}
