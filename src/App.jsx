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
import { useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';

export default function App() {
	const [Dark, setDark] = useState(false);
	const [MenuToggle, SetMenuToggle] = useState(false);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header setDark={setDark} Dark={Dark} MenuToggle={MenuToggle} SetMenuToggle={SetMenuToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer />
			{MenuToggle && <Menu SetMenuToggle={SetMenuToggle} />}
		</div>
	);
}
