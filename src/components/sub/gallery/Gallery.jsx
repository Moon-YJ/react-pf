import { useEffect, useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	console.log('rerender');
	const id = useRef('195294341@N02');
	const refNav = useRef(null);
	const [Pics, setPics] = useState([]);

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => {
			btn.classList.remove('on');
			e.target.classList.add('on');
		});
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
					<button
						onClick={(e) => {
							if (e.target.classList.contains('on')) return;
							activateBtn(e);
							fetchFlickr({ type: 'interest' });
						}}
					>
						Interest Gallery
					</button>
					<button
						className='on'
						onClick={(e) => {
							if (e.target.classList.contains('on')) return;
							activateBtn(e);
							fetchFlickr({ type: 'user', id: id.current });
						}}
					>
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
									<span
										onClick={(e) => {
											fetchFlickr({ type: 'user', id: pic.owner });
										}}
									>
										{pic.owner}
									</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout>
	);
}
