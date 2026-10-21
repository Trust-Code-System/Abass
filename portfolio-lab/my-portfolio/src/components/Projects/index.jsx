'use client';
import useReducedMotion from '../../common/useReducedMotion';
import Arrow from '../../common/Arrow';
import Image from 'next/image';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import styles from './style.module.scss';
export default function Card({ i, title, description, description2, description3, src, link, color, progress, range, targetScale, isLast }) {
	const container = useRef(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
	const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
	const scale = useTransform(progress, range, [1, targetScale]);
	return (
		<article ref={container} className={`${styles.cardContainer} ${isLast ? styles.lastCard : ''}`} data-reduced={!!reduce} aria-labelledby={`project-${i}`}>
			<motion.div style={{ backgroundColor: color, scale: reduce ? 1 : scale, top: `${i * 18}px` }} className={styles.card}>
				<div className={styles.heading}><span>0{i + 1} / Selected work</span><h3 id={`project-${i}`}>{title}</h3></div>
				<div className={styles.body}><div className={styles.description}><p>{description}</p><p className={styles.stack}>{description2}</p><p className={styles.category}>{description3}</p><a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${title} (opens in new tab)`}>Explore project <span aria-hidden="true"><Arrow /></span></a></div><div className={styles.imageContainer}><motion.div className={styles.inner} style={{ scale: reduce ? 1 : imageScale }}><Image fill src={`/images/${src}`} alt={`Original project cover for ${title}`} sizes="(max-width: 768px) 90vw, 50vw" /></motion.div></div></div>
			</motion.div>
		</article>
	);
}
