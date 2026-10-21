import Image from 'next/image';
import Link from 'next/link';
import Arrow from '../../common/Arrow';
import Contact from '../../components/Contact';
import { profile, expertise, experience, skillGroups, education, writing } from '../data';
import styles from './page.module.scss';

export const metadata = {
	title: 'About Abass | Design, Development & Delivery',
	description: 'Meet Abass Ibrahim. Full-stack developer, designer, IT specialist, and co-lead at TrustCode System Limited in Lagos, Nigeria.',
	alternates: { canonical: '/about' },
};

export default function About() {
	return <main id="main-content" tabIndex={-1} className={styles.page}>
		<section className={styles.hero} aria-labelledby="profile-title">
			<div className={styles.topline}><span className={styles.eyebrow}>A little more about me / 01</span><a href={profile.resume} download className={styles.download}>Download CV <span>PDF <Arrow /></span></a></div>
			<h1 id="profile-title">A builder’s mind.<br /><span>A designer’s eye.</span></h1>
			<div className={styles.heroBottom}><p>Abass Ibrahim <span>Developer, designer & problem solver.</span></p><a href="#story" className={styles.explore}>Get to know me <Arrow direction="down" /></a></div>
		</section>
		<section className={styles.story} id="story" aria-labelledby="story-title">
			<figure className={styles.portrait}><div><Image src={profile.portrait} alt={profile.name} fill priority sizes="(max-width: 768px) 100vw, 42vw" /></div><figcaption><span>{profile.location}</span><span>Design + code + care</span></figcaption></figure>
			<div className={styles.storyCopy}><span className={styles.eyebrow}>The person behind the pixels</span><h2 id="story-title">Good ideas deserve<br />a thoughtful build.</h2><p>I bring design and engineering together to make technology useful. From a first sketch to a working product, I care about the decisions that make an experience clear, reliable, and easy to use.</p><p>My work spans web platforms, e-commerce, AI and automation, and IT support. Working across products and business systems keeps my approach grounded in how people actually use technology.</p><a href="https://trustcodesystem.tech/" target="_blank" rel="noopener noreferrer" className={styles.studio}><span className={styles.studioMark} aria-hidden="true">TC</span><span><small>Building together at</small>TrustCode System Limited<span className={styles.studioRole}>Co-lead · Full-Stack Delivery & Design</span></span><Arrow /></a></div>
		</section>
		<section className={styles.expertise} id="expertise" aria-labelledby="expertise-title">
			<div className={styles.sectionHeading}><span className={styles.eyebrow}>How I can help / 02</span><h2 id="expertise-title">From the first idea.<br />To the everyday details.</h2></div>
			<div className={styles.services}>{expertise.map(item => <article className={styles.service} key={item.label}><span className={styles.eyebrow}>{item.label}</span><Arrow /><h3>{item.title}</h3><p>{item.description}</p><ul>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
		</section>
		<section className={styles.experience} id="experience" aria-labelledby="experience-title">
			<div className={styles.sectionHeading}><span className={styles.eyebrow}>Experience / 03</span><h2 id="experience-title">Built on real work.</h2><p>Product development, technical operations, and a habit of learning by doing.</p></div>
			<ol className={styles.timeline}>{experience.map((item, index) => <li key={item.company}><div className={styles.timelineMeta}><span className={styles.index}>0{index + 1}</span><span>{item.period}</span></div><div className={styles.position}><span>{item.company}</span><h3>{item.role}</h3><p>{item.location}</p></div><p className={styles.roleDescription}>{item.description}</p></li>)}</ol>
		</section>
		<section className={styles.toolkit} id="toolkit" aria-labelledby="toolkit-title">
			<div className={styles.sectionHeading}><span className={styles.eyebrow}>Tools & foundations / 04</span><h2 id="toolkit-title">The right tools.<br />For the actual problem.</h2></div>
			<div className={styles.skillGroups}>{skillGroups.map(group => <div className={styles.skillGroup} key={group.title}><h3>{group.title}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
			<div className={styles.foundations}><div className={styles.education}><span className={styles.eyebrow}>Education</span><span className={styles.year}>{education.period}</span><h3>{education.degree}</h3><p>{education.school}<span>{education.location}</span></p></div><div className={styles.writing}><span className={styles.eyebrow}>Notes from the work</span><h3>Learning out loud.</h3><p>Technical writing, ideas, and lessons from building.</p><div>{writing.map(item => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label} <Arrow /></a>)}</div></div></div>
			<Link href="/#work" className={styles.workLink}><span>See the work behind the words</span><Arrow /></Link>
		</section>
		<Contact />
	</main>;
}
