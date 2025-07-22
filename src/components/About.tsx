import React, { useState, useRef } from 'react';
import { PlayIcon } from './Icons';

const About: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const bioTextRef = useRef<HTMLDivElement>(null);

  const handlePlayPokedexVoice = () => {
    if (isSpeaking || !bioTextRef.current) return;
    const textToSpeak = bioTextRef.current.textContent || '';
    const utterance = new window.SpeechSynthesisUtterance(textToSpeak);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name.includes('Google UK English Male')) || voices.find(voice => voice.name.includes('David')) || voices.find(voice => voice.name.includes('Mark'));
    utterance.voice = selectedVoice || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    utterance.pitch = 0.8;
    utterance.rate = 0.9;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-charcoal-dark dark:text-cream-light">The Trainer Behind the Code</h2>
        <div ref={bioTextRef}>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm a full-stack developer with over 5 years of professional experience, including extensive work as a freelancer, who loves building elegant, high-performance web applications from concept to cloud. My journey into development began over eight years ago, sparked by the realization that code was a powerful tool for innovation.
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
            That initial curiosity quickly grew into a dedicated passion for problem-solving and a drive to engineer products that are not only technically sound but genuinely helpful to people. When I'm not at the keyboard, I enjoy a fast-paced game of badminton, tinkering with PC hardware, and staying on the cutting edge of the tech world. And yes, a lifelong love for Pokémon often inspires my creative approach to challenges.
          </p>
        </div>
        <button onClick={handlePlayPokedexVoice} disabled={isSpeaking} className="inline-flex items-center gap-2 px-4 py-2 bg-cream-light dark:bg-charcoal-surface border border-orange-500/20 dark:border-magenta-light/20 rounded-md text-orange-500 dark:text-magenta-light font-semibold hover:bg-orange-100 dark:hover:bg-charcoal-dark disabled:opacity-50 transition-colors">
          <PlayIcon /> {isSpeaking ? 'Reading...' : 'Read Bio'}
        </button>
        <h3 className="text-2xl font-bold text-charcoal-dark dark:text-cream-light mt-16">Trainer Connect</h3>
        <div className="mt-8 max-w-2xl mx-auto bg-cream-light dark:bg-charcoal-surface rounded-lg shadow-lg border border-orange-500/10 dark:border-magenta-light/10 p-4 flex items-center gap-4 group">
          <div className="p-4 bg-orange-100 dark:bg-lavender-dark rounded-full">
            <div className="w-8 h-8 text-orange-500 dark:text-magenta-light">
              <img src="../../public/pokeball.png" alt="Pokeball" className="w-full h-full transition-transform duration-500 group-hover:rotate-180" />
            </div>
          </div>
          <div className="flex-grow rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://github.com/MannanSaood" target="_blank" rel="noopener noreferrer" className="connect-card flex items-center gap-3 p-4 bg-cream-light dark:bg-charcoal-dark rounded-lg transition-transform duration-300 hover:scale-105">
              {/* GithubIcon */}
              <span className="w-6 h-6"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" /></span>
              <div>
                <h4 className="font-bold text-left text-charcoal-dark dark:text-cream-light">GitHub</h4>
                <p className="text-sm text-left text-gray-500 dark:text-gray-400">/MannanSaood</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/mannansaood/" target="_blank" rel="noopener noreferrer" className="connect-card flex items-center gap-3 p-4 bg-cream-light dark:bg-charcoal-dark rounded-lg transition-transform duration-300 hover:scale-105">
              {/* LinkedinIcon */}
              <span className="w-6 h-6"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" /></span>
              <div>
                <h4 className="font-bold text-left text-charcoal-dark dark:text-cream-light">LinkedIn</h4>
                <p className="text-sm text-left text-gray-500 dark:text-gray-400">/in/mannansaood</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
