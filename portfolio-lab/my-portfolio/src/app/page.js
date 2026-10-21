'use client';
import useReducedMotion from '../common/useReducedMotion';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, useScroll, MotionConfig } from 'framer-motion';
import styles from './page.module.scss';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import Contact from '../components/Contact';
import Lenis from '@studio-freight/lenis';
import { projects } from './data';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const reduce = useReducedMotion();
	const container = useRef(null);
	const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
	useEffect(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		let lenis, rafId;
		function stop() { cancelAnimationFrame(rafId); lenis?.destroy(); lenis = null; }
		function start() {
			stop();
			if (preference.matches) return;
			lenis = new Lenis({ duration: 1.1 });
			function raf(time) { lenis?.raf(time); rafId = requestAnimationFrame(raf); }
			rafId = requestAnimationFrame(raf);
		}
		start(); preference.addEventListener('change', start);
		return () => { stop(); preference.removeEventListener('change', start); };
	}, []);
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), reduce ? 0 : 1100);
		return () => clearTimeout(timer);
	}, [reduce]);
	return (
		<MotionConfig reducedMotion="user">
			<main ref={container} className={styles.main} id="main-content" tabIndex={-1}>
				<AnimatePresence>{isLoading && !reduce && <Preloader />}</AnimatePresence>
				<Landing />
				<Description />
				<section className={styles.projectsContainer} aria-labelledby="work-title" id="work">
					<div className={styles.workHeading}><span>Selected work / 01 - 04</span><h2 id="work-title">Built with purpose.</h2></div>
					{projects.map((project, i) => (
						<Projects key={project.title} i={i} {...project} progress={scrollYProgress} range={[i * 0.2, 1]} targetScale={1 - (projects.length - i) * 0.04} isLast={i === projects.length - 1} />
					))}
				</section>
				<Contact />
			</main>
		</MotionConfig>
	);
}
