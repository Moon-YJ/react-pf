import { useSelector } from 'react-redux';
import './Visual.scss';

export default function Visual() {
	const Vids = useSelector(store => store.youtubeReducer.videos);
	return (
		<figure className='Visual'>
			<div className='video-box'>
				{Vids?.map((vid, idx) => {
					if (idx < 3) return null;
					else
						return (
							<img
								key={vid + idx}
								src={vid.snippet.thumbnails.default ? vid.snippet.thumbnails.default.url : '/img/member1.jpg'}
								alt={vid.snippet.title}
							/>
						);
				})}
			</div>
		</figure>
	);
}
