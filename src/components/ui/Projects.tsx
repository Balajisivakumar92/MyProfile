import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ImageSlideshow from './ImageSlideshow';

// Import all images from the assets folder
const projectImages = import.meta.glob('../../assets/Images/**/*.{png,jpg,jpeg,JPG}', { eager: true, as: 'url' });

const Projects = () => {
    const getImagesForProject = (folderName: string) => {
        return Object.entries(projectImages)
            .filter(([path]) => path.includes(`/Images/${folderName}/`))
            .map(([_, url]) => url as string);
    };

    const projects = [
        {
            title: "Project FD",
            folder: "FD",
            company: "L&T Technology Services",
            desc: "Developed advanced MedTech IVD software systems, ensuring high performance, accuracy, and user-friendliness using Qt and QML.",
            tech: ["Qt", "QML", "C++", "MedTech IVD"]
        },
        {
            title: "Project SurgView",
            folder: "SurgView",
            company: "SurgeonsLab AG",
            desc: "Neurosurgery simulation software helping surgeons and residents practice using complex brain models and haptic feedback simulations.",
            tech: ["Qt", "C++", "AWS", "3D Graphics", "DICOM"]
        },
        {
            title: "Project AcuPlan",
            folder: "AcuPlan",
            company: "Curneu MedTech Innovation",
            desc: "Knowledge-based recommendation engine for Acupuncture, identifying optimal needle points for practitioners.",
            tech: ["Python", "ML", "C++", "Qt"]
        }
    ];

    return (
        <div style={{ width: '100%' }}>
            <h2>
                Featured <span className="text-gradient">Innovations</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                {projects.map((project, index) => {
                    const images = getImagesForProject(project.folder);
                    return (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            className="glass-morphism"
                            style={{ padding: 'clamp(1.2rem, 5vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}
                        >
                            <ImageSlideshow images={images} />

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: '#00f2ff' }}>{project.title}</h3>
                                    <ExternalLink size={20} className="text-secondary" />
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--accent-blue)', fontWeight: '600', marginTop: '0.2rem' }}>
                                    {project.company}
                                </p>
                            </div>

                            <p className="text-secondary" style={{ flexGrow: 1 }}>{project.desc}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {project.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontSize: '0.75rem',
                                            padding: '0.4rem 0.8rem',
                                            background: 'rgba(0, 102, 255, 0.1)',
                                            color: '#0066ff',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(0, 102, 255, 0.2)'
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;

