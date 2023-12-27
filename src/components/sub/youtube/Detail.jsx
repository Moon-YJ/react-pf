import { useCallback, useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useYoutubeByIdQuery } from '../../../hooks/useYoutubeQuery';

export default function Detail() {
	const { id } = useParams();

	const { data: YoutubeData, isSuccess } = useYoutubeByIdQuery(id);

	return (
		<Layout
			title={'Detail'}
			className='Detail'>
			{/* 
        - Optional Chaining: 객체명?.property 
          : 해당 객체에 값이 없을때는 무시하고 값이 있을때만 property에 접근
      */}
			{isSuccess && (
				<article>
					<div className='videoBox'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`}></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					{/* <h3>{YoutubeData?.title}</h3> */}
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}
