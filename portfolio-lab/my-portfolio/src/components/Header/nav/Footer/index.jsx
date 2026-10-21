import Arrow from '../../../../common/Arrow';
import { profile, socials } from '../../../../app/data';
import styles from './style.module.scss';
export default function Footer() {
	return <div className={styles.footer}>{socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}<a href={profile.resume} download>Download CV <Arrow /></a></div>;
}
