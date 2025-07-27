import React from 'react';
import { ExternalLinkIcon, GithubIcon } from './Icons';

interface Project {
  name: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  badge: string;
}

const projects: Project[] = [
  { name: "Comfort Reader", description: "A web extension designed to enhance reading comfort and enable real-time collaboration. Features a multi-format viewer (PDF, ePub, CBR), dark mode, and cloud sync.", tech: ["JavaScript", "Firebase", "HTML/CSS"], liveUrl: "#", githubUrl: "https://github.com/MannanSaood/ComfortReader", badge: "/badges/1024px-Boulder_Badge.png" },
  { name: "CertifiCat", description: "A powerful certificate generation platform. Allows users to create customizable templates and bulk-generate personalized PDF certificates from CSV data.", tech: ["Next.js", "TypeScript", "MongoDB", "ShadCN"], liveUrl: "https://certificates.ecellnmit.in/", githubUrl: "https://github.com/MannanSaood/CertifiCat", badge: "/badges/1024px-Cascade_Badge.png" },
  { name: "YouTheme", description: "A hyper-customizable browser extension for theming websites. Users can select page sections and apply a variety of base themes or create their own from scratch.", tech: ["Vanilla JS", "HTML", "CSS"], liveUrl: "#", githubUrl: "https://github.com/MannanSaood/YouTheme-Extension", badge: "/badges/1024px-Thunder_Badge.png" },
  { name: "TempShare", description: "A temporary file sharing platform. Upload files and generate a time-limited link that automatically expires and deletes the file after the set duration.", tech: ["React.js", "Firebase", "Prisma"], liveUrl: "#", githubUrl: "https://github.com/MannanSaood/TempShare", badge: "/badges/1024px-Marsh_Badge.png" },
  { name: "NewFeat", description: "A Python-based news aggregator that fetches and displays news from various sources using the googlenews library, providing a clean, unified feed.", tech: ["Python", "Flask", "googlenews"], liveUrl: "#", githubUrl: "https://github.com/MannanSaood/NewFeat", badge: "/badges/1024px-Soul_Badge.png" },
];

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-cream-light dark:bg-charcoal-surface rounded-lg shadow-lg overflow-hidden border border-orange-500/10 dark:border-magenta-light/10 transform hover:-translate-y-2 transition-transform duration-300">
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0">
          <img 
            src={project.badge} 
            alt={`${project.name} badge`} 
            className="w-12 h-12 object-contain pixelated-badge" 
          />
        </div>
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
