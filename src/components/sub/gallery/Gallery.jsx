import { useEffect, useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	console.log('re-render');
	const id = useRef('195294341@N02');
	// isUser의 초기값으로 id값 등록
	const isUser = useRef(id.current);
	const refNav = useRef(null);
	const [Pics, setPics] = useState([]);

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
		// isUser값이 비어있기만하면 함수 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const fetchFlickr = async (opt) => {
		const num = 20;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;

		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: id.current });
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
			</article>

			<section>
				<Masonry className={'container'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic, idx) => {
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
					})}
				</Masonry>
			</section>
		</Layout>
	);
}
