"use client";
import Arrow from '../Arrow';
import { createContext, useContext, useRef, useEffect } from 'react';
import { profile } from '../../app/data';
import styles from './style.module.scss';
const ResumeModalContext = createContext(null);
export function ResumeModalProvider({ children }) {
	const dialog = useRef(null);
	useEffect(() => {
		const element=dialog.current;
		const onClose=()=>{document.body.style.overflow='';};
		element.addEventListener('close',onClose);
		return ()=>{element.removeEventListener('close',onClose);document.body.style.overflow='';};
	},[]);
	const openResume = () => { dialog.current.showModal(); document.body.style.overflow='hidden'; };
	return <ResumeModalContext.Provider value={{openResume}}>{children}<dialog ref={dialog} className={styles.panel} aria-labelledby="resume-title"><div className={styles.toolbar}><h2 id="resume-title">Abass Ibrahim / Résumé</h2><a href={profile.resume} download className={styles.download}>Download PDF <Arrow /></a><button type="button" className={styles.close} onClick={()=>dialog.current.close()} aria-label="Close resume" autoFocus>×</button></div><iframe src={profile.resume} title="Abass Ibrahim résumé" className={styles.frame} /><p className={styles.fallback}>PDF not displayed? <a href={profile.resume} target="_blank" rel="noopener noreferrer">Open the résumé in a new tab</a>.</p></dialog></ResumeModalContext.Provider>;
}
export function useResumeModal(){ return useContext(ResumeModalContext); }
