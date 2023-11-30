import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();

	return (
		<Layout title={'Detail'} className='Detail'>
			<h3>{id}</h3>
		</Layout>
	);
}
