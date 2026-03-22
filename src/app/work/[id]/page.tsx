import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import type { Metadata } from 'next';
import { ProjectDetail } from '@/components/ProjectDetail';

// O(1) project lookup map for static generation and rendering
const projectMap = new Map(projects.map((p) => [p.id, p]));

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const project = projectMap.get(params.id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectMap.get(params.id);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
