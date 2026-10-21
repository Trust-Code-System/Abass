export default function Arrow({ direction = 'upRight', className = '' }) {
	const rotation = { upRight: 0, downRight: 90, downLeft: 180, down: 135 }[direction];
	return <svg aria-hidden="true" focusable="false" className={`arrow-icon ${className}`} viewBox="0 0 24 24" fill="none" style={{ rotate: `${rotation}deg` }}><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.25" /></svg>;
}
