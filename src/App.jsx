import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect, useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import * as types from '../src/redux/actionType';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
	const dispatch = useDispatch();
	const [Dark, setDark] = useState(false);
	const [MenuToggle, SetMenuToggle] = useState(false);
	useSelector(store => console.log(store.flickrReducer.flickr));

	useEffect(() => {
		dispatch({ type: types.MEMBERS.start });
		dispatch({ type: types.HISTORY.start });
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: '195294341@N02' } });
	}, [dispatch]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header
				setDark={setDark}
				Dark={Dark}
				MenuToggle={MenuToggle}
				SetMenuToggle={SetMenuToggle}
			/>
			<Route
				exact
				path='/'
				component={MainWrap}
			/>
			<Route
				path='/department'
				component={Department}
			/>
			<Route
				path='/gallery'
				component={Gallery}
			/>
			<Route
				path='/community'
				component={Community}
			/>
			<Route
				path='/members'
				component={Members}
			/>
			<Route
				path='/contact'
				component={Contact}
			/>
			<Route
				path='/youtube'
				component={Youtube}
			/>
			<Route
				path='/detail/:id'
				component={Detail}
			/>
			<Footer />
			{MenuToggle && <Menu SetMenuToggle={SetMenuToggle} />}
		</div>
	);
}
