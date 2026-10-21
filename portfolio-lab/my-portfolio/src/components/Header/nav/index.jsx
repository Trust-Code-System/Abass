import styles from './style.module.scss';
import Footer from './Footer';
import Link from 'next/link';
import { navigation } from '../../../app/data';
export default function Nav({ onNavigate }) {
	return <div className={styles.body}><nav aria-label="Expanded navigation" className={styles.nav}><p id="navigation-title" className={styles.header}>Navigation</p>{navigation.map((item,i) => <Link key={item.title} href={item.href} onClick={onNavigate}><span>0{i+1}</span>{item.title}</Link>)}</nav><Footer /></div>;
}
