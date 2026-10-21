'use client';
import useReducedMotion from '../../common/useReducedMotion';
import Arrow from '../../common/Arrow';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './styles.module.scss';
import Rounded from '../../common/RoundedButton';
import { useResumeModal } from '../../common/ResumeModal';
import { profile } from '../../app/data';
import Circuit from '../Circuit/Circuit';

export default function Description() {
	const ref = useRef(null);
	const visible = useInView(ref, { once: true, margin: '-40px' });
	const reduce = useReducedMotion();
	const { openResume } = useResumeModal();
	return (
		<section ref={ref} className={styles.description} id="about" aria-labelledby="about-title">
			<span className={styles.eyebrow}>A little about me</span>
			<div className={styles.body}>
				<h2 id="about-title">{profile.intro.split(' ').map((word, i) => <span key={i} className={styles.mask}><motion.span initial={false} animate={{ transform: reduce || visible ? 'translateY(0)' : 'translateY(105%)' }} transition={{ duration: .5, delay: reduce ? 0 : i * .015, ease: [.23, 1, .32, 1] }}>{word}&nbsp;</motion.span></span>)}</h2>
				<div className={styles.details}><p>{profile.about}</p><Rounded onClick={openResume} className={styles.button}>View résumé <span aria-hidden="true"><Arrow /></span></Rounded></div>
			</div>
			<Circuit />
		</section>
	);
}
