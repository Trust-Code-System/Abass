'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { greetings } from '../../app/data';
import styles from './style.module.scss';
export default function Preloader({ onComplete }) {
	const [index, setIndex] = useState(0);
	const isLast = index === greetings.length - 1;
	const greeting = greetings[index];

	useEffect(() => {
		// Advance after each rendered greeting so a busy page never skips a language.
		const delay = index === 0 ? 500 : isLast ? 400 : 180;
		const timer = setTimeout(() => {
			if (isLast) onComplete();
			else setIndex(current => current + 1);
		}, delay);
		return () => clearTimeout(timer);
	}, [index, isLast, onComplete]);

	return <motion.div className={styles.introduction} initial={{ opacity: 1 }} exit={{ transform: 'translateY(-100%)' }} transition={{ duration: .65, ease: [.77, 0, .175, 1] }} aria-hidden="true"><p><span /><bdi lang={greeting.lang} dir={greeting.dir || 'ltr'}>{greeting.text}</bdi></p></motion.div>;
}
