import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-orange-200/50 dark:bg-magenta-dark/50 text-charcoal-dark dark:text-cream-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-light dark:focus:ring-offset-charcoal-dark focus:ring-orange-500 dark:focus:ring-magenta-light"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
  activeSection: string;
}

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
  e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header: React.FC<HeaderProps> = React.memo(({ theme, setTheme, activeSection }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-cream-light/80 dark:bg-charcoal-dark/80 backdrop-blur-sm border-b border-orange-500/10 dark:border-magenta-light/10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <a href="#hero" className="font-bold text-xl tracking-wider text-charcoal-dark dark:text-cream-light" onClick={e => scrollToSection(e, 'hero')}>SYED MANNAN SAOOD</a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#projects" onClick={e => scrollToSection(e, 'projects')} className={`font-semibold transition-colors ${activeSection === 'projects' ? 'text-orange-500 dark:text-magenta-light' : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-magenta-light'}`}>Projects</a>
          <a href="#skills" onClick={e => scrollToSection(e, 'skills')} className={`font-semibold transition-colors ${activeSection === 'skills' ? 'text-orange-500 dark:text-magenta-light' : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-magenta-light'}`}>Skills</a>
          <a href="#about" onClick={e => scrollToSection(e, 'about')} className={`font-semibold transition-colors ${activeSection === 'about' ? 'text-orange-500 dark:text-magenta-light' : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-magenta-light'}`}>About</a>
          <a href="#contact" onClick={e => scrollToSection(e, 'contact')} className={`font-semibold transition-colors ${activeSection === 'contact' ? 'text-orange-500 dark:text-magenta-light' : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-magenta-light'}`}>Contact</a>
        </nav>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </div>
  </header>
));

export default Header;
