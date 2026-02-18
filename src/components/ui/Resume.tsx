import { motion } from 'framer-motion';

const Resume = () => {
    const experiences = [
        {
            company: "Radiometer - Danaher Corporation",
            role: "Senior Software Engineer II",
            period: "2024 - Present",
            details: [
                "Migrated TCM device software from Windows to Embedded Linux using Qt/QML.",
                "Supported AQT90 FLEX immunoassay analyzer backend and connectivity infrastructure.",
                "Implemented IoT device configuration framework and cloud connectivity.",
                "Designed proxy-based network communication layer for hospital environments."
            ]
        },
        {
            company: "L&T Technology Services",
            role: "Senior Software Engineer",
            period: "2022 - 2024",
            details: [
                "Developed advanced MedTech IVD software systems with high performance.",
                "Designed sophisticated GUIs using Qt and QML.",
                "Collaborated with experts to implement product improvements.",
                "Received Spot Award (Apr 2023) for outstanding performance."
            ]
        },
        {
            company: "SurgeonsLab AG",
            role: "Lead Software Engineer",
            period: "2020 - 2022",
            details: [
                "Led a cross-functional team of 4–7 engineering professionals to deliver complex simulation software.",
                "Architected and developed the entire product lifecycle from initial UI/UX design to production-ready cloud deployment.",
                "Built high-performance neurosurgery simulation software using Qt (Widgets/QML), C++, and Python.",
                "Developed high-performance 3D rendering engines and integrated DICOM rendering for neurosurgical visualization and patient-specific planning using VTK, ITK, and CTK.",
                "Engineered a scalable serverless backend using AWS Lambda, S3, API Gateway, and DynamoDB.",
                "Enhanced neurosurgical training by translating complex medical procedures into high-fidelity digital simulations."
            ]
        },
        {
            company: "Curneu MedTech Innovation",
            role: "Lead Software Engineer",
            period: "2019 - 2020",
            details: [
                "Led a team of 7 building simulation software for Traditional Medicine.",
                "Developed 'Project AcuPlan' using Qt, C++, Python.",
                "Built recommendation engine for clinically proven acupuncture points."
            ]
        },
        {
            company: "Curneu MedTech Innovation",
            role: "Machine Learning Engineer",
            period: "2018 - 2019",
            details: [
                "Building a personalised & Collaborative and knowledge-based recommendation engine to recommend the best and clinically proven acupuncture points to practitioners"
            ]
        },
        {
            company: "Ashok Leyland (Layam Payroll)",
            role: "Quality Inspector",
            period: "2015 - 2016",
            details: [
                "As a Quality Inspector, I was responsible for inspecting the cab dashboard monitoring system and supported the cross-functional team with tasks in both software and production."
            ]
        }
    ];

    const education = [
        {
            school: "Saveetha School of Engineering",
            degree: "Bachelor of Engineering - BE, Electronic and Communications Engineering",
            period: "2013 - 2017" // Fixed year based on 8.5+ years exp logic
        },
        {
            school: "NTTF (Nettur Technical Training Foundation)",
            degree: "Diploma, Electrical, Electronic and Communications Engineering Technology",
            period: "2010 - 2013"
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', width: '100%' }}>
            <h2>
                Professional <span className="text-gradient">Timeline</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-morphism"
                        style={{ padding: 'clamp(1rem, 5vw, 2.5rem)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', color: '#00f2ff' }}>{exp.role}</h3>
                                <h4 style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginTop: '0.2rem' }}>{exp.company}</h4>
                            </div>
                            <span className="text-secondary" style={{ fontWeight: '600', fontSize: '0.9rem' }}>{exp.period}</span>
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            {exp.details.map((detail, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <h2>
                Academic <span className="text-gradient">Roots</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {education.map((edu, index) => (
                    <div key={index} className="glass-morphism" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{edu.school}</h3>
                        <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{edu.degree}</p>
                        <span style={{ color: '#0066ff', fontWeight: 'bold' }}>{edu.period}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resume;
