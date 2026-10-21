import Magnetic from '../Magnetic';
import styles from './style.module.scss';
export default function RoundedButton({ children, href, className = '', ...attributes }) {
	const Tag = href ? 'a' : 'button';
	return <Magnetic><Tag href={href} type={href ? undefined : 'button'} className={`${styles.roundedButton} ${className}`} {...attributes}><span>{children}</span></Tag></Magnetic>;
}
