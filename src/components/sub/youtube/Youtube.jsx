import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtubeReducer.videos);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	// 	// promise then구문을 async await 변경하기 위한 조건 2가지
	// 	// 조건1 - promise반환 함수를 감싸주는 wrapping함수 필요 (async)
	// 	// 조건2 - await문은 promise반환함수에만 지정 가능
	// 	// .then구문
	// 	/*
	// 		fetch(baseURL)
	// 		.then((data) => data.json())
	// 		.then((json) => setVids(json.items));
	// 	*/
	// };

	return (
		<Layout title={'Youtube'}>
			{Vids &&
				Vids.map((data, idx) => {
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
