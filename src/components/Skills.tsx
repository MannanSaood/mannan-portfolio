import React from 'react';
import { FireIcon, GrassIcon } from './Icons';

interface Skill {
  name: string;
  mastery: number;
  type: 'Frontend' | 'Backend' | 'Both' | string;
}

const skills: Skill[] = [
  { name: "React", mastery: 95, type: 'Frontend' }, { name: "Next.js", mastery: 90, type: 'Frontend' },
  { name: "Node.js", mastery: 85, type: 'Backend' }, { name: "TypeScript", mastery: 90, type: 'Both' },
  { name: "MongoDB", mastery: 80, type: 'Backend' }, { name: "PostgreSQL", mastery: 75, type: 'Backend' },
  { name: "Firebase", mastery: 88, type: 'Backend' }, { name: "Tailwind CSS", mastery: 98, type: 'Frontend' },
  { name: "HTML", mastery: 100, type: 'Frontend' }, { name: "CSS", mastery: 98, type: 'Frontend' },
  { name: "JavaScript", mastery: 96, type: 'Both' }, { name: "Python", mastery: 70, type: 'Both' },
];

export const SkillTypeBadge: React.FC<{ type: Skill['type'] }> = ({ type }) => {
  if (type === 'Both') {
    return (
      <div className="flex justify-center gap-1 mt-1">
        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 rounded-full"><FireIcon /> Frontend</span>
        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-300 rounded-full"><GrassIcon /> Backend</span>
      </div>
    );
  }
  if (type === 'Frontend') {
    return <span className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 rounded-full"><FireIcon /> Frontend</span>;
  }
  if (type === 'Backend') {
    return <span className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold px-2 py-0.5 bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-300 rounded-full"><GrassIcon /> Backend</span>;
  }
  return <span className="mt-1 text-xs font-semibold px-2 py-0.5 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">{type}</span>;
};

const Skills: React.FC = () => {
  const getAnimationClass = (type: Skill['type']) => {
    if (type === 'Frontend') return 'has-fire-effect';
    if (type === 'Backend') return 'has-grass-effect';
    if (type === 'Both') return 'has-fire-effect has-grass-effect';
    return '';
  };

  return (
    <section id="skills" className="py-20 px-4 bg-orange-500/5 dark:bg-magenta-light/5">
      <h2 className="text-4xl font-bold text-center mb-12 text-charcoal-dark dark:text-cream-light">Tech Pokédex <span className="text-orange-500 dark:text-magenta-light">//</span> Skills</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className={`skill-card bg-cream-light dark:bg-charcoal-surface p-4 rounded-lg shadow-md border border-orange-500/10 dark:border-magenta-light/10 text-center transform hover:scale-105 transition-transform duration-300 flex flex-col relative overflow-hidden ${getAnimationClass(skill.type)}`}>
            <div className="fire-aura"><span></span><span></span><span></span></div>
            <div className="energy-aura"><span></span></div>
            <h3 className="font-bold text-lg text-charcoal-dark dark:text-cream-light">{skill.name}</h3>
            <SkillTypeBadge type={skill.type} />
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-2 mt-auto">
              <div className="bg-gradient-to-r from-teal-400 to-orange-500 dark:from-lavender-light dark:to-magenta-light h-2.5 rounded-full" style={{ width: `${skill.mastery}%` }}></div>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{skill.mastery}% Mastery</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
