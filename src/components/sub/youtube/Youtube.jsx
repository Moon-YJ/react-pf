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

/*
	[코딩가이드 들어갈 내용 및 면접 예상 질문 정리]

	- Youtube.jsx 작업흐름
		1. Youtube API를 활용한 동적 Youtube 동영상 갤러리 페이지
		2. 썸네일 클릭시 params를 전달해서 상세페이지로 유튜브 영상 출력
		3. useText custom hook으로 미리보기 문자열 처리

	- 이슈사항
		0. api 가지고올때 이슈사항?
		1. 유튜브 목록을 미리보기 형식으로 가져올때 유튜브 제목이 길어서 목록 UI 깨지는 현상
		2. 유튜브 영상 시간 출력시 불필요한 텍스트들이 있었음

	- 해결
		1. 문자열을 원하는 개수만큼 자르고, 전체 문자열에서 원하는 옵션에 따라 가공할 수 있는 재활용 가능한 hook으로 useText 수정
*/
