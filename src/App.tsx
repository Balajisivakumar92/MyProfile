import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MedTechScene from './components/3d/MedTechScene.tsx';
import Navbar from './components/ui/Navbar.tsx';
import Hero from './components/ui/Hero.tsx';
import About from './components/ui/About.tsx';
import Resume from './components/ui/Resume.tsx';
import Projects from './components/ui/Projects.tsx';
import Contact from './components/ui/Contact.tsx';
import Testimonials from './components/ui/Testimonials.tsx';
import EcgScrollProgress from './components/ui/EcgScrollProgress.tsx';
import Loader from './components/ui/Loader.tsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      <AnimatePresence>
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}>
        <EcgScrollProgress />
        <MedTechScene onLoad={() => setTimeout(() => setIsLoading(false), 800)} />
        <Navbar />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <section id="hero">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="testimonials" className="section-container" style={{ minHeight: 'auto', padding: 'clamp(2rem, 5vw, 4rem) 5%' }}>
            <Testimonials />
          </section>

          <section id="resume" className="section-container">
            <Resume />
          </section>

          <section id="projects" className="section-container">
            <Projects />
          </section>

          <section id="contact" className="section-container" style={{ alignItems: 'center' }}>
            <Contact />

            <footer className="text-secondary" style={{ marginTop: '4rem', opacity: 0.6, fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} Balaji Sivakumar. All Rights Reserved. Built with React, Three.js & Framer Motion.
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
