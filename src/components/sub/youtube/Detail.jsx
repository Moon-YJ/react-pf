import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Detail'} className='Detail'>
			{/* 
        - Optional Chaining: 객체명?.property 
          : 해당 객체에 값이 없을때는 무시하고 값이 있을때만 property에 접근
      */}
			{YoutubeData && (
				<article>
					<div className='videoBox'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`}
						></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					{/* <h3>{YoutubeData?.title}</h3> */}
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}
