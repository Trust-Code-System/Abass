import styles from './style.module.scss';
import Footer from './Footer';
export default function Nav({ onNavigate }) {
	return <div className={styles.body}><nav aria-label="Expanded navigation" className={styles.nav}><p id="navigation-title" className={styles.header}>Navigation</p>{['Home', 'Work', 'About', 'Contact'].map((title,i) => <a key={title} href={`#${title.toLowerCase()}`} onClick={onNavigate}><span>0{i+1}</span>{title}</a>)}</nav><Footer /></div>;
}
