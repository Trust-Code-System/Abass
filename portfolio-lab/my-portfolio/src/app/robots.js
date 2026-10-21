import { siteUrl, isProduction } from './site';

export default function robots() {
	return isProduction
		? { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` }
		: { rules: { userAgent: '*', disallow: '/' } };
}
