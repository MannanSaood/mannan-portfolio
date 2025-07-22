import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-cream-light dark:bg-charcoal-dark text-center py-6 px-4 border-t border-orange-500/10 dark:border-magenta-light/10">
    <p className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Syed Mannan Saood - Gotta code 'em all!</p>
  </footer>
);

export default Footer;
