import Arrow from '../../../../common/Arrow';
import { socials } from '../../../../app/data';
import styles from './style.module.scss';
import { useResumeModal } from '../../../../common/ResumeModal';
export default function Footer() {
	const { openResume } = useResumeModal();
	return <div className={styles.footer}>{socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}<button type="button" onClick={openResume}>Résumé <Arrow /></button></div>;
}
