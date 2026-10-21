"use client";
import useReducedMotion from '../../common/useReducedMotion';
import Arrow from '../../common/Arrow';
import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import Rounded from '../../common/RoundedButton';
import { profile, socials } from '../../app/data';
import styles from './styles.module.scss';
export default function Contact() {
	const ref=useRef(null);
	const reduce=useReducedMotion();
	const { scrollYProgress }=useScroll({target:ref,offset:['start end','end end']});
	const x=useTransform(scrollYProgress,[0,1],[0,60]);
	return <footer ref={ref} className={styles.contact} id="contact"><div className={styles.body}>
		<div className={styles.title}><span><div className={styles.imageContainer}><Image fill src={profile.portrait} alt="Abass Ibrahim" sizes="100px" /></div><h2>Let’s work</h2></span><h2>together.</h2><motion.div style={{x:reduce?0:x}} className={styles.buttonContainer}><Rounded href={`mailto:${profile.email}`} className={styles.rounded}>Get in touch <Arrow /></Rounded></motion.div><span className={styles.arrow} aria-hidden="true"><Arrow direction="downLeft" /></span></div>
		<div className={styles.nav}><a href={`mailto:${profile.email}`} className={styles.button}>{profile.email}</a><a href={profile.resume} download className={styles.button}>Download CV <Arrow /></a></div>
		<div className={styles.info}><div><span><h3>Location</h3><p>{profile.location}</p></span><span><h3>Version</h3><p>2026 © Edition</p></span></div><nav aria-label="Social links">{socials.map(s=><Magnetic key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <Arrow /></a></Magnetic>)}</nav></div>
	</div></footer>;
}
