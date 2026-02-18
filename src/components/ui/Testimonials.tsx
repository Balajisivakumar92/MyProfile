import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        text: "Balaji Sivakumar is a talented Software Engineer and has great leadership qualities. I worked with him for more than 1.5 years and I was happy that I learned a lot with his guidance. I fully recommend him for any opportunities for future endeavours.",
        author: "Lakshmanan B",
        location: "India"
    },
    {
        text: "Balaji was a great professional to work with. We worked together at Curneu MedTech Innovations and he helped me a lot to get started and also to understand the project. He always kept the team motivated and shared knowledge. He was very pragmatic in solving the problems. I’m delighted I had the chance to learn from him.",
        author: "Manibarathi Sivakumar",
        location: "India"
    },
    {
        text: "I have worked with Balaji Sivakumar for almost a year and a half now. During this time we collaborated on multiple sprints to improvise our product. Since our product requires synchronised firmware and software communication, we had to figure out a lot of problems together to reach the ultimate goal of satisfying our customers with a great user experience. Balaji is an exceptional team leader with the quality of addressing the problems in a united way. He is very smooth in handling difficult tasks and doesn't rely on other departments to address the problems rather takes up the challenge to solve it from a software standpoint. I wish to continue learning from him and enhance myself with the exceptional qualities that he carries with himself.",
        author: "Pratik Roy",
        location: "India"
    },
    {
        text: "I had a privilege in working with Balaji Sivakumar in Software Development team of Curneu Medtech Innovations Private Limited. He was an inspiring team leader who was down to earth, highly experienced, productive and always focused towards the ultimate goal. Balaji's strategies and motivation during the software development process helped us to move swiftly towards the ultimate goal with high standards. He never hesitated to provide his wisdom and support when needed. He is one of the most valuable person of Curneu.",
        author: "Dharani Prasad",
        location: "India"
    },
    {
        text: "I highly recommend Balaji for his exceptional expertise in Python and AWS. His guidance and support have been invaluable to me, helping me navigate complex technical challenges with clarity and patience. Balaji is not only knowledgeable but also genuinely dedicated to fostering growth.",
        author: "Sanjana",
        location: "USA"
    }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000); // Change every 8 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4rem',
            marginBottom: '2rem'
        }}>
            <div className="glass-morphism" style={{
                width: '100%',
                maxWidth: '800px',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', opacity: 0.1 }}>
                    <Quote size={40} color="#00f2ff" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -10 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ textAlign: 'center' }}
                    >
                        <p style={{
                            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                            lineHeight: '1.7',
                            color: 'var(--text-primary)',
                            fontStyle: 'italic',
                            marginBottom: '1.5rem',
                            padding: '0 1rem'
                        }}>
                            "{testimonials[index].text}"
                        </p>

                        <div>
                            <h4 style={{
                                color: 'var(--accent-teal)',
                                fontSize: '1rem',
                                marginBottom: '0.2rem',
                                fontFamily: 'Orbitron, sans-serif'
                            }}>
                                {testimonials[index].author}
                            </h4>
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                fontWeight: '500'
                            }}>
                                {testimonials[index].location}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Dots */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    marginTop: '2rem'
                }}>
                    {testimonials.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: i === index ? 'var(--accent-teal)' : 'rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease',
                                boxShadow: i === index ? '0 0 10px var(--accent-teal)' : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
