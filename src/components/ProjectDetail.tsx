import { Project, projects } from '@/lib/projects';
import { ProjectHero } from './ProjectHero';
import { ProjectContent } from './ProjectContent';
import { NextProjectNav } from './NextProjectNav';

export function ProjectDetail({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #0d0816 0%, #0a0a0a 40%)' }}
    >
      <ProjectHero project={project} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <ProjectContent project={project} />
        <NextProjectNav nextProject={nextProject} />
      </div>
    </div>
  );
}
