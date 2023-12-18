import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import './Info.scss';
import postData from './dummyPosts.json';

export default function Info() {
	const customDate = useCustomText('combined');
	//const korTime = useRef(new Date().getTime() + 1000 * 60 * 60 * 9);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return postData.dummyPosts;
	};
	const [Post] = useState(getLocalData);

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<section className='Info'>
			<div className='show-box'>
				{Post.map((el, idx) => {
					const date = JSON.stringify(el.date);
					const strDate = customDate(date.split('T')[0].slice(1), '.') + ' ' + date.split('T')[1].split('Z')[0].split('.')[0];
					if (idx >= 4) return null;
					return (
						<article key={el + idx}>
							<div className='txt'>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
								<span>{strDate}</span>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
