import './Layout.scss';

export default function Layout({ children, title }) {
	return (
		<main className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{/* Layout 컴포넌트로 감싼 영역의 내부 콘텐츠가 아래 children 위치에 출력됨 */}
			{children}
		</main>
	);
}
