import React from 'react';
import { ExternalLinkIcon, GithubIcon } from './Icons';

interface Project {
  name: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  badge: React.ReactNode;
}

const projects: Project[] = [
  { name: "Comfort Reader", description: "A web extension designed to enhance reading comfort and enable real-time collaboration. Features a multi-format viewer (PDF, ePub, CBR), dark mode, and cloud sync.", tech: ["JavaScript", "Firebase", "HTML/CSS"], liveUrl: "#", githubUrl: "#", badge: <svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><path d="M24 6 L36 14 L36 30 L24 38 L12 30 L12 14 Z" className="fill-current text-gray-500 dark:text-gray-400" stroke="currentColor" strokeWidth="2"/><path d="M24 22 L30 18 L36 14" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 14 L18 18 L24 22" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M18 18 L18 34" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M30 18 L30 34" fill="none" stroke="currentColor" strokeWidth="2"/></svg> },
  { name: "CertifiCat", description: "A powerful certificate generation platform. Allows users to create customizable templates and bulk-generate personalized PDF certificates from CSV data.", tech: ["Next.js", "TypeScript", "MongoDB", "ShadCN"], liveUrl: "#", githubUrl: "#", badge: <svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><circle cx="24" cy="24" r="18" className="fill-current text-gray-500 dark:text-gray-400" stroke="currentColor" strokeWidth="2"/><path d="M20 16 H28 L24 24 Z" fill="currentColor"/><rect x="22" y="24" width="4" height="8" fill="currentColor"/></svg> },
  { name: "YouTheme", description: "A hyper-customizable browser extension for theming websites. Users can select page sections and apply a variety of base themes or create their own from scratch.", tech: ["Vanilla JS", "HTML", "CSS"], liveUrl: "#", githubUrl: "#", badge: <svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><path d="M24,4 A20,20 0 1,1 24,44 A20,20 0 0,1 24,4" className="fill-current text-gray-500 dark:text-gray-400" stroke="currentColor" strokeWidth="2"/><path d="M24,4 A20,20 0 0,1 41.3,16" fill="none" className="stroke-current text-orange-500 dark:text-magenta-light" strokeWidth="4"/><path d="M41.3,16 A20,20 0 0,1 16.7,41.3" fill="none" className="stroke-current text-teal-500 dark:text-lavender-light" strokeWidth="4"/><path d="M16.7,41.3 A20,20 0 0,1 24,4" fill="none" className="stroke-current text-blue-500" strokeWidth="4"/></svg> },
  { name: "TempShare", description: "A temporary file sharing platform. Upload files and generate a time-limited link that automatically expires and deletes the file after the set duration.", tech: ["React.js", "Firebase", "Prisma"], liveUrl: "#", githubUrl: "#", badge: <svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><path d="M14 14 h20 v20 h-20 z" className="fill-current text-gray-500 dark:text-gray-400" stroke="currentColor" strokeWidth="2"/><path d="M18 10 v8 M30 10 v8 M10 24 h8 M24 10 v8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg> },
  { name: "NewFeat", description: "A Python-based news aggregator that fetches and displays news from various sources using the googlenews library, providing a clean, unified feed.", tech: ["Python", "Flask", "googlenews"], liveUrl: "#", githubUrl: "#", badge: <svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><rect x="10" y="10" width="28" height="28" className="fill-current text-gray-500 dark:text-gray-400" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="8" height="8" fill="currentColor"/><path d="M26 14 h8 M26 18 h8 M14 26 h20 M14 30 h20 M14 34 h12" fill="none" stroke="currentColor" strokeWidth="2"/></svg> },
];

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-cream-light dark:bg-charcoal-surface rounded-lg shadow-lg overflow-hidden border border-orange-500/10 dark:border-magenta-light/10 transform hover:-translate-y-2 transition-transform duration-300">
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">{project.badge}</div>
        <h3 className="text-2xl font-bold text-charcoal-dark dark:text-cream-light">{project.name}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t: string) => <span key={t} className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-800 dark:bg-lavender-dark dark:text-lavender-light rounded-full">{t}</span>)}
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 dark:bg-magenta-light text-white rounded-md font-semibold hover:bg-orange-600 dark:hover:bg-magenta-dark transition-colors">
          <ExternalLinkIcon /> Live Demo
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold hover:text-orange-500 dark:hover:text-magenta-light transition-colors">
          <GithubIcon /> Source Code
        </a>
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => (
  <section id="projects" className="py-20 px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-charcoal-dark dark:text-cream-light">My Gym Badges <span className="text-orange-500 dark:text-magenta-light">//</span> Projects</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
    </div>
  </section>
);

export default Projects;
