import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { fetchYoutube } from '../../../redux/youtubeSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const dispatch = useDispatch();
	const Vids = useSelector(store => store.youtube.data);

	useEffect(() => {
		dispatch(fetchYoutube());
	}, [dispatch]);

	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id + idx}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img
									src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'}
									alt={data.snippet.title}
								/>
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
