import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Typewriter from './Typewriter';
import Achievements from './Achievements';

const Hero = () => {
    return (
        <section className="section-container" style={{ userSelect: 'none', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
                <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
                    <h2 className="text-secondary" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                        MedTech Software Professional
                    </h2>
                    <h1 style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typewriter text="Precision Engineering for" speed={0.10} />
                        <Typewriter
                            text="Healthcare Impact"
                            delay={1.5}
                            speed={0.10}
                            className="text-gradient"
                        />
                    </h1>

                    <p className="text-secondary" style={{ maxWidth: '600px', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', marginBottom: '2rem' }}>
                        8.5+ years of experience in developing cutting-edge MedTech systems and sophisticated graphics user interfaces.
                    </p>

                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-morphism"
                        style={{
                            padding: '1rem 2rem',
                            color: 'white',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            fontSize: '1rem',
                            width: 'max-content'
                        }}
                    >
                        View My Work <ArrowRight size={20} color="#00f2ff" />
                    </motion.a>
                </div>

                <Achievements />
            </motion.div>
        </section>
    );
};

export default Hero;
