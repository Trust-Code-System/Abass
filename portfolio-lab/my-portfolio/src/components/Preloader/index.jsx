'use client';
import { motion } from 'framer-motion';
import styles from './style.module.scss';
export default function Preloader() {
	return <motion.div className={styles.introduction} initial={{ opacity: 1 }} exit={{ transform: 'translateY(-100%)' }} transition={{ duration: .65, ease: [.77, 0, .175, 1] }} aria-hidden="true"><p><span />Hello</p></motion.div>;
}
