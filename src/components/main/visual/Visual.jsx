import { useSelector } from 'react-redux';
import './Visual.scss';

export default function Visual() {
	const Vids = useSelector(store => store.youtubeReducer.videos);
	return (
		<figure className='Visual'>
			{/* 
				- Vids 값의 유무로 에러처리를 할 수 없는 이유
				// 설사 데이터 반환에 실패 하더라도 Vids에는 undefined라는 값이 들어가 있기 때문에
				// 데이터 반환에 실패해서 분기처리하기 위해서는 err객체에만 있는 message라는 property로 분기처리
			*/}

			{/* 
				- 반복도는 Vids뒤에도 무조건 optional chaining 처리하는 이유
				// 리액트가 해당 조건문을 읽을때 Vids값이 undefined이기 때문에 undefined에 message, map 프로퍼티 접근 자체가 구문 오류이기 때문에 초기 구문오류 에러를 피하기 위해서
			*/}

			{Vids?.message ? (
				<h1>{Vids.message}</h1>
			) : (
				Vids?.map((vid, idx) => {
					if (idx < 3) return null;
					else
						return (
							<img
								key={vid + idx}
								src={vid.snippet.thumbnails.default ? vid.snippet.thumbnails.default.url : '/img/member1.jpg'}
								alt={vid.snippet.title}
							/>
						);
				})
			)}
		</figure>
	);
}
