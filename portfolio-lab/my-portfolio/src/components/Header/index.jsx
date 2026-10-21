"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '../../app/data';
import Nav from './nav';
import Magnetic from '../../common/Magnetic';
import styles from './style.module.scss';

export default function Header() {
	const pathname = usePathname();
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
			<Link href="/#home" className={styles.logo} aria-label="Abass Ibrahim, home"><span className={styles.copyright}>©</span><span className={styles.name}><span>Code by Abass</span><span aria-hidden="true">Abass Ibrahim</span></span></Link>
			<nav className={styles.nav} aria-label="Main navigation">{navigation.slice(1).map(item => <Magnetic key={item.title}><Link href={item.href} aria-current={item.href === pathname ? 'page' : undefined}>{item.title}<span aria-hidden="true">•</span></Link></Magnetic>)}</nav>
		</header>
		<button className={styles.menuTrigger} data-visible={visible} tabIndex={visible ? 0 : -1} type="button" aria-haspopup="dialog" aria-controls="navigation-dialog" aria-label="Open navigation" onClick={e => { setKeyboard(e.detail === 0); dialog.current.showModal(); }}><span /><span /></button>
		<dialog ref={dialog} className={styles.dialog} data-keyboard={keyboard} id="navigation-dialog" aria-labelledby="navigation-title" onClick={e => { if (e.target === dialog.current) { const b=dialog.current.getBoundingClientRect(); if(e.clientX < b.left || e.clientY > b.bottom) close(); } }}>
			<button type="button" className={styles.close} onClick={close} aria-label="Close navigation" autoFocus>×</button>
			<Nav onNavigate={close} />
		</dialog>
	</>;
}
