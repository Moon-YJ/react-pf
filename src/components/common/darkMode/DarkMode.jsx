import { useEffect } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';
import './DarkMode.scss';

export default function DarkMode() {
	//const { setCookie, isCookie } = useCookie();
	const { Mode, setMode } = useGlobalData('');
	const DarkTheme = localStorage.getItem('theme') || 'light';

	const changeMode = () => {
		//setMode(Mode === 'light' ? 'dark' : 'light');
		if (Mode === 'light') {
			setMode('dark');
			localStorage.setItem('darkTheme', 'light');
		} else {
			setMode('light');
			localStorage.setItem('darkTheme', 'dark');
		}
		//setCookie('mode', Mode === 'light' ? 'dark' : 'light', 60 * 60 * 24);
	};

	useEffect(() => {
		setMode(DarkTheme);
	}, [setMode, DarkTheme]);

	// useEffect(() => {
	// 	if (isCookie('mode')) setMode(document.cookie.split('mode=')[1].split(';')[0]);
	// }, [isCookie, setMode]);

	return (
		<div
			className={`DarkMode ${Mode === 'light' ? 'light' : 'dark'}`}
			onClick={changeMode}>
			<div className='ball'></div>
		</div>
	);
}
