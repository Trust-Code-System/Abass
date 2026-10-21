'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Arrow from '../../common/Arrow';
import useReducedMotion from '../../common/useReducedMotion';
import { siteGuide } from '../../app/data';
import styles from './style.module.scss';

const HIDDEN_KEY = 'abass-guide-hidden';
const PAUSED_KEY = 'abass-guide-paused';
function savePreference(key, value) {
	try { localStorage.setItem(key, String(value)); } catch { /* Preferences are optional. */ }
}

export default function SiteGuide() {
	const [ready, setReady] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [paused, setPaused] = useState(false);
	const [open, setOpen] = useState(false);
	const [pageVisible, setPageVisible] = useState(true);
	const dialog = useRef(null);
	const trigger = useRef(null);
	const restore = useRef(null);
	const moveFocus = useRef(false);
	const pathname = usePathname();
	const reduce = useReducedMotion();

	useEffect(() => {
		try {
			setHidden(localStorage.getItem(HIDDEN_KEY) === 'true');
			setPaused(localStorage.getItem(PAUSED_KEY) === 'true');
		} catch { /* Keep the guide usable when storage is unavailable. */ }
		setReady(true);
		const update = () => setPageVisible(!document.hidden);
		update(); document.addEventListener('visibilitychange', update);
		return () => document.removeEventListener('visibilitychange', update);
	}, []);
	useEffect(() => { dialog.current?.close(); }, [pathname]);
	useEffect(() => {
		if (moveFocus.current) {
			(hidden ? restore.current : trigger.current)?.focus();
			moveFocus.current = false;
		}
	}, [hidden]);

	function closeGuide() { dialog.current?.close(); }
	function changeHidden(value) {
		closeGuide(); savePreference(HIDDEN_KEY, value);
		moveFocus.current = true; setHidden(value);
	}
	function openGuide() {
		if (!dialog.current?.open) { dialog.current.showModal(); setOpen(true); }
	}
	if (!ready) return null;

	return <aside className={styles.dock} aria-label="Site guide" data-site-guide data-motion-paused={paused || reduce || open || !pageVisible}>
		{hidden ? <button ref={restore} type="button" className={styles.restore} onClick={() => changeHidden(false)} aria-label="Show site guide"><span aria-hidden="true">&gt;_</span> Guide</button> : <div className={styles.companion}>
			<button ref={trigger} type="button" className={styles.trigger} aria-label={`Open ${siteGuide.name} site guide`} aria-haspopup="dialog" aria-controls="site-guide-dialog" aria-expanded={open} onClick={openGuide}>
				<span className={styles.hint} aria-hidden="true">Need a hand?</span>
				<span className={styles.sprite}><Image src={siteGuide.sprite} alt="" width={112} height={112} sizes="(max-width: 600px) 80px, 104px" /></span>
				<span className={styles.shadow} aria-hidden="true" />
			</button>
			<button type="button" className={styles.dismiss} aria-label="Hide site guide" onClick={() => changeHidden(true)}><span aria-hidden="true">×</span></button>
		</div>}
		<dialog ref={dialog} id="site-guide-dialog" className={styles.panel} aria-labelledby="site-guide-title" aria-describedby="site-guide-description" onClose={() => setOpen(false)} onClick={event => {
			if (event.target !== dialog.current) return;
			const box = dialog.current.getBoundingClientRect();
			if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeGuide();
		}}>
			<div className={styles.panelTop}><span><span className={styles.status} aria-hidden="true" />{siteGuide.name} / Site guide</span><button type="button" aria-label="Close site guide" onClick={closeGuide} autoFocus>×</button></div>
			<h2 id="site-guide-title">{siteGuide.title}</h2>
			<p id="site-guide-description">{siteGuide.description}</p>
			<nav aria-label="Guide shortcuts" className={styles.shortcuts}>{siteGuide.links.map((item, index) => <Link key={item.title} href={item.href} onClick={closeGuide}><span><small aria-hidden="true">0{index + 1}</small>{item.title}</span><Arrow /></Link>)}</nav>
			<div className={styles.preferences}>{reduce ? <span>Motion off</span> : <button type="button" aria-pressed={paused} onClick={() => { savePreference(PAUSED_KEY, !paused); setPaused(!paused); }}>{paused ? 'Resume motion' : 'Pause motion'}</button>}<button type="button" onClick={() => changeHidden(true)}>Hide companion</button></div>
		</dialog>
	</aside>;
}
