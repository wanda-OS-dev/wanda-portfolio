import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wanda-os-dev.github.io/wanda-portfolio';
  const staticRoutes = ['/', '/work', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/work/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
