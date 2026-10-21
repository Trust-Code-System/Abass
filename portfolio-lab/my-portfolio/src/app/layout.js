import './globals.css';
import '@fontsource-variable/lexend';
import Header from '../components/Header';
import { ResumeModalProvider } from '../common/ResumeModal';
import { profile } from './data';

export const metadata = {
	metadataBase: new URL('http://localhost:3000'),
	title: 'Abass Ibrahim | Developer & Designer',
	description: 'Full-stack development, UI/UX design, AI and automation. The personal portfolio of Abass Ibrahim, co-lead at TrustCode System Limited.',
	robots: { index: false, follow: false },
};
export const viewport = { themeColor: '#1c1d20', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<a className="skip-link" href="#main-content">Skip to content</a>
				<ResumeModalProvider>
					<Header />
					{children}
				</ResumeModalProvider>
				<noscript><p className="noscript-note">For contact and enquiries, email {profile.email}.</p></noscript>
			</body>
		</html>
	);
}
