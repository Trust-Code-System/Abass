// Edit the portfolio here. See CONTENT_REVIEW.md for source provenance and review items.
export const greetings = [
	{ text: 'Hello', lang: 'en' },
	{ text: 'Bonjour', lang: 'fr' },
	{ text: 'Hola', lang: 'es' },
	{ text: 'Ciao', lang: 'it' },
	{ text: 'Olá', lang: 'pt' },
	{ text: 'Hallo', lang: 'de' },
	{ text: 'こんにちは', lang: 'ja' },
	{ text: '안녕하세요', lang: 'ko' },
	{ text: '你好', lang: 'zh' },
	{ text: 'مرحبا', lang: 'ar', dir: 'rtl' },
];

export const profile = {
	name: 'Abass Ibrahim',
	role: 'Developer & Designer',
	location: 'Lagos, Nigeria',
	timeZone: 'Africa/Lagos',
	email: 'abassibrahim591@gmail.com',
	portrait: '/images/abass.png',
	resume: '/Abass_Ibrahim_CV.pdf',
	intro: 'I build thoughtful digital experiences, from the first idea to the final interaction.',
	about: 'Full-stack development, UI/UX design, AI and automation, Web3, and e-commerce. I co-lead TrustCode System Limited, bringing design and engineering together to build useful technology.',
};
export const socials = [
	{ label: 'GitHub', href: 'https://github.com/Lingz450' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/abass-ibrahim-devv' },
	{ label: 'TrustCode', href: 'https://trustcodesystem.tech/' },
];
export const capabilities = ['Full-stack development', 'UI/UX design', 'AI & automation', 'Web3 & e-commerce'];
export const navigation = [
	{ title: 'Home', href: '/#home' },
	{ title: 'Work', href: '/#work' },
	{ title: 'About', href: '/about' },
	{ title: 'Contact', href: '/#contact' },
];
export const siteGuide = {
	name: 'Byte',
	title: 'A little help finding your way?',
	description: 'Pick a place. I’ll take you there.',
	sprite: '/images/byte-guide-v1.png',
	links: navigation.filter(item => item.title !== 'Home'),
};
// Professional history and education adapted from the supplied CV. No new metrics added.
export const expertise = [
	{ title: 'Design with intent.', label: '01 / Design', description: 'Clear journeys, considered interfaces, and the details that make a product feel right.', tags: ['UI/UX', 'Responsive design', 'Interaction'] },
	{ title: 'Build it to work.', label: '02 / Engineering', description: 'From the interface to the database. Full-stack applications with practical integrations and maintainable code.', tags: ['Web platforms', 'E-commerce', 'AI & automation'] },
	{ title: 'Keep it moving.', label: '03 / Operations', description: 'Reliable systems beyond launch. Deployment, technical support, and the everyday work that keeps teams productive.', tags: ['Deployment', 'IT support', 'Access & security'] },
];
export const experience = [
	{ company: 'Metropole Petroleum', role: 'IT Officer', period: '2024 - Present', location: 'Lagos, Nigeria', description: 'Managing daily IT operations, troubleshooting business systems, supporting staff, and maintaining devices and user access.' },
	{ company: 'Bono Energy Group', role: 'IT Assistant', period: '2024 - Present', location: 'Lagos, Nigeria · Concurrent role', description: 'Supporting infrastructure, end-user devices, software installations, system maintenance, and technical diagnostics.' },
	{ company: 'Independent', role: 'Full-stack Developer', period: '2022 - Present', location: 'Remote · Lagos, Nigeria', description: 'Designing and developing web applications across education, e-commerce, fintech, and marketplaces, from authentication and databases to deployment.' },
	{ company: 'Community & education', role: 'Founder & Crypto Trading Educator', period: '2021 - Present', location: 'Online', description: 'Creating educational content and mentorship around cryptocurrency, Web3 fundamentals, and risk management. Turning complex concepts into clear, practical material.' },
];
export const skillGroups = [
	{ title: 'Interface', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'React Query'] },
	{ title: 'Behind the scenes', skills: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'Prisma', 'MongoDB', 'Supabase', 'Firebase'] },
	{ title: 'Shipping & support', skills: ['Git & GitHub', 'Vercel', 'Netlify', 'Networking', 'Troubleshooting', 'User access'] },
	{ title: 'Beyond the stack', skills: ['Web3', 'Automation bots', 'Technical writing', 'Community education'] },
];
export const education = { degree: 'B.Sc. Educational Management', school: 'University of Ilorin', location: 'Kwara State, Nigeria', period: '2019 - 2024' };
export const writing = [
	{ label: 'Hashnode', href: 'https://hashnode.com/@ghost69' },
	{ label: 'Medium', href: 'https://medium.com/@Ghost69' },
];
export const projects = [
	{
		title: 'The Thesis Desk',
		description: 'A focused workspace for a trading community. Market information, journaling, and daily routines brought into one product.',
		description2: 'Next.js / TypeScript / Tailwind CSS',
		description3: 'Product engineering · Trading tools',
		src: 'thesis.svg',
		link: 'https://thethesisdesk.xyz/',
		color: '#d6e4df',
	},
	{
		title: 'Helping Tribe Academy',
		description: 'A school management platform with clear, distinct journeys for students, facilitators, and administrators.',
		description2: 'Next.js / TypeScript / Role-based access',
		description3: 'Full-stack development · Education',
		src: 'helping-tribe.svg',
		link: 'https://helpingtribeacademy.com/',
		color: '#e4dfee',
	},
	{
		title: 'Wearables Atelier',
		description: 'An editorial approach to Nigerian womenswear. A considered shopping experience for ready-to-wear and custom pieces.',
		description2: 'Next.js / TypeScript / Tailwind CSS',
		description3: 'Design & development · E-commerce',
		src: 'wearables.svg',
		link: 'https://wearables-atelier.vercel.app/',
		color: '#e9d7ca',
	},
	{
		title: 'Atlas HR',
		description: 'A workspace for cross-border teams, bringing HR workflows, country-specific guidance, and AI-assisted tools together.',
		description2: 'Next.js / TypeScript / AI workflows',
		description3: 'Product engineering · HR technology',
		src: 'atlas.svg',
		link: 'https://atlas-hr-fq24.vercel.app/',
		color: '#dce0ec',
	},
];
