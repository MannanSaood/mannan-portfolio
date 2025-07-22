import { useState, useEffect } from 'react';
import { AnimationStyles, EmberBackground, MistBackground } from './components/Animations';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import KonamiCode from './components/EasterEggs';

export default function App() {
    const [theme, setTheme] = useState('light');
    const [activeSection, setActiveSection] = useState('hero');
    const pokemonList = ["Pikachu", "Charizard", "Gengar", "Snorlax", "Eevee", "Mewtwo", "Gyarados", "Dragonite"];

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme')!);
        }
        window.speechSynthesis.getVoices();
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    useEffect(() => {
        const caughtPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        console.log(`%c Hey there, fellow Trainer! You've found a secret. You caught a ${caughtPokemon}! `, `font-family: monospace; color: ${theme === 'light' ? '#F4812F' : '#E573E5'}; background: ${theme === 'light' ? '#FEF9F3' : '#1A1A20'}; padding: 8px; border-radius: 4px; border: 1px solid;`);
    }, [theme]);

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px" });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * -50;
            const y = (clientY / innerHeight - 0.5) * -50;
            document.documentElement.style.setProperty('--mouse-x', `${x}px`);
            document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="bg-cream-light dark:bg-charcoal-dark transition-colors duration-500 relative overflow-hidden">
            <AnimationStyles />
            {theme === 'light' ? <EmberBackground /> : <MistBackground />}
            <Header
                theme={theme}
                setTheme={setTheme}
                activeSection={activeSection}
            />
            <main>
                <Hero />
                <Projects />
                <Skills />
                <About />
                <Contact />
            </main>
            <Footer />
            <KonamiCode />
        </div>
    );
}
