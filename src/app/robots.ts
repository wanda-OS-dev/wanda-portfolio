import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://wanda-os-dev.github.io/wanda-portfolio/sitemap.xml',
  };
}
