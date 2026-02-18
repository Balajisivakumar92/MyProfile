import { motion } from 'framer-motion';
import { Shield, Activity, Monitor, Code2, Server, Smartphone } from 'lucide-react';

const About = () => {
    const highlights = [
        { icon: <Shield size={32} color="#00f2ff" />, title: "Precision Systems", desc: "Developing core-critical MedTech software that ensures patient safety." },
        { icon: <Activity size={32} color="#00f2ff" />, title: "MedTech Domain", desc: "8.5+ years specialized in IVD, Neurosurgery Simulation, and Monitoring devices." },
        { icon: <Monitor size={32} color="#00f2ff" />, title: "GUIs & Graphics", desc: "Expertise in Qt/QML and OpenGL for sophisticated medical interfaces." }
    ];

    const skills = [
        { name: "C / C++ / C# / Python", icon: <Code2 size={24} color="#0066ff" /> },
        { name: "Qt Widgets / QML", icon: <Monitor size={24} color="#0066ff" /> },
        { name: "AWS / Azure / Cloud", icon: <Server size={24} color="#0066ff" /> },
        { name: "React / React Native", icon: <Smartphone size={24} color="#0066ff" /> },
        { name: "ML / Neural Network", icon: <Code2 size={24} color="#0066ff" /> },
        { name: "UI/UX (Figma/Adobe XD)", icon: <Monitor size={24} color="#0066ff" /> }
    ];

    return (
        <section className="section-container">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2>
                    Professional <span className="text-gradient">Core</span>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="glass-morphism"
                            style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{item.title}</h3>
                            <p className="text-secondary">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-morphism" style={{ padding: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Digital Arsenal</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {skills.map((skill, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {skill.icon}
                                <span style={{ fontWeight: '500' }}>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
