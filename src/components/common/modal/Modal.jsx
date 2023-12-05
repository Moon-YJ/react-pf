import './Modal.scss';

export default function Modal({ setOpen, children }) {
	return (
		<div className='Modal'>
			<div className='con'>{children}</div>
			<span onClick={() => setOpen(false)}>close</span>
		</div>
	);
}
