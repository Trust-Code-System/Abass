"use client";
import { useEffect, useRef, useState } from 'react';
import Nav from './nav';
import Magnetic from '../../common/Magnetic';
import styles from './style.module.scss';

export default function Header() {
	const dialog = useRef(null);
	const [visible, setVisible] = useState(false);
	const [keyboard, setKeyboard] = useState(false);
	useEffect(() => {
		const update = () => setVisible(window.scrollY > window.innerHeight * .65 || window.innerWidth <= 768);
		update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
		return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
	}, []);
	const close = () => dialog.current?.close();
	return <>
		<header className={styles.header}>
			<a href="#home" className={styles.logo} aria-label="Abass Ibrahim, home"><span className={styles.copyright}>©</span><span className={styles.name}><span>Code by Abass</span><span aria-hidden="true">Abass Ibrahim</span></span></a>
			<nav className={styles.nav} aria-label="Main navigation">{['Work', 'About', 'Contact'].map(label => <Magnetic key={label}><a href={`#${label.toLowerCase()}`}>{label}<span aria-hidden="true">•</span></a></Magnetic>)}</nav>
		</header>
		<button className={styles.menuTrigger} data-visible={visible} tabIndex={visible ? 0 : -1} type="button" aria-haspopup="dialog" aria-controls="navigation-dialog" aria-label="Open navigation" onClick={e => { setKeyboard(e.detail === 0); dialog.current.showModal(); }}><span /><span /></button>
		<dialog ref={dialog} className={styles.dialog} data-keyboard={keyboard} id="navigation-dialog" aria-labelledby="navigation-title" onClick={e => { if (e.target === dialog.current) { const b=dialog.current.getBoundingClientRect(); if(e.clientX < b.left || e.clientY > b.bottom) close(); } }}>
			<button type="button" className={styles.close} onClick={close} aria-label="Close navigation" autoFocus>×</button>
			<Nav onNavigate={close} />
		</dialog>
	</>;
}
