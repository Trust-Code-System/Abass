'use client';
import Arrow from '../../common/Arrow';
import Image from 'next/image';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../../app/data';
import styles from './style.module.scss';

export default function Landing() {
	const slider = useRef(null);
	const [time, setTime] = useState('');
	const [paused, setPaused] = useState(false);
	useEffect(() => {
		const update = () => setTime(new Date().toLocaleTimeString('en-GB', { timeZone: profile.timeZone, hour: '2-digit', minute: '2-digit', hour12: false }));
		update(); const id = setInterval(update, 30000); return () => clearInterval(id);
	}, []);
	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		const context = gsap.matchMedia();
		context.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
			gsap.to(slider.current, { x: '-12vw', ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: .5 } });
		});
		return () => context.revert();
	}, []);
	return (
		<section className={styles.landing} id="home" aria-label="Introduction">
			<div className={styles.portrait}><Image src={profile.portrait} fill alt="Abass Ibrahim" priority sizes="(max-width: 768px) 100vw, 65vw" /></div>
			<h1 className="sr-only">{profile.name}, {profile.role}</h1>
			<div className={styles.location}><span>Based in</span><p>Lagos, Nigeria <span aria-hidden="true"><Arrow /></span></p></div>
			<div className={styles.description}><span aria-hidden="true"><Arrow direction="downRight" /></span><p>Full-stack developer<br />& UI/UX designer</p><small>Lagos {time || 'WAT'}<span className={styles.statusDot} aria-hidden="true" /></small></div>
			<div className={styles.sliderContainer} aria-hidden="true"><div ref={slider}><div className={styles.slider} data-paused={paused}><span>{profile.name} · </span><span>{profile.name} · </span></div></div></div>
			<div className={styles.bottom}><a href="#about">Scroll to explore <span aria-hidden="true"><Arrow direction="down" /></span></a><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Play name animation' : 'Pause name animation'}>{paused ? 'Play motion' : 'Pause motion'} <span aria-hidden="true" className={styles.playbackIcon} data-paused={paused} /></button></div>
		</section>
	);
}
