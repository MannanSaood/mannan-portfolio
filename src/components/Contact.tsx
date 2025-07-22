import React from 'react';
import pokeball from '../../public/pokeball.png';
const Contact: React.FC = React.memo(() => (
  <section id="contact" className="py-20 px-4 bg-orange-500/5 dark:bg-charcoal-surface">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 text-charcoal-dark dark:text-cream-light">Start a New Adventure</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Have a project, a question, or just want to connect? My Pokédex is always open.</p>
      <a href="mailto:syed.mannan@outlook.com" className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-orange-500 dark:bg-magenta-light text-white rounded-md font-semibold text-lg hover:bg-orange-600 dark:hover:bg-magenta-dark transition-colors">
        <img src={pokeball} alt="Pokeball" className="w-6 h-6" /> Send a Message
      </a>
    </div>
  </section>
));

export default Contact;
