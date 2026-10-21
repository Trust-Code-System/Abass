import { siteUrl, isProduction } from './site';

export default function sitemap() {
	return isProduction ? [{ url: siteUrl }, { url: `${siteUrl}/about` }] : [];
}
