import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Using Formspree for real email delivery
            const response = await fetch('https://formspree.io/f/maqdbdyr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('submitted');
                setFormData({ name: '', email: '', message: '' });
                // Reset to idle after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ width: '100%', maxWidth: '1100px' }}>
            <h2>
                Let's Connect for <span className="text-gradient">Impact</span>
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>Reach Out</h3>
                    <p className="text-secondary">
                        Looking forward to discussing how we can create life-saving software and innovative medical solutions together.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="glass-morphism" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                                <Mail size={24} color="#00f2ff" />
                            </div>
                            <div>
                                <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Email</p>
                                <a href="mailto:balajisivakumar2830@hotmail.com" style={{ textDecoration: 'none', color: 'white' }}>
                                    balajisivakumar2830@hotmail.com
                                </a>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="glass-morphism" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                                <Phone size={24} color="#00f2ff" />
                            </div>
                            <div>
                                <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Phone</p>
                                <a href="tel:+918072830783" style={{ textDecoration: 'none', color: 'white' }}>
                                    +91 8072830783
                                </a>
                            </div>
                        </div>

                        <a
                            href="https://www.linkedin.com/in/balajisivakumar2830/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="glass-morphism" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                                <Linkedin size={24} color="#00f2ff" />
                            </div>
                            <div>
                                <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Professional Network</p>
                                <span style={{ textDecoration: 'none', color: 'white' }}>LinkedIn /balajisivakumar</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        {status === 'idle' || status === 'submitting' || status === 'error' ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="glass-morphism"
                                style={{
                                    padding: 'clamp(1rem, 5vw, 3rem)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem'
                                }}
                            >
                                {status === 'error' && (
                                    <div style={{ color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(255, 77, 77, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                                        Submission failed. Please try again.
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', resize: 'none' }}
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'submitting'}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: 'linear-gradient(90deg, var(--accent-teal), var(--accent-blue))',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '700',
                                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        opacity: status === 'submitting' ? 0.7 : 1
                                    }}
                                >
                                    {status === 'submitting' ? 'Transmitting...' : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </motion.button>
                            </motion.form>
                        ) : status === 'submitted' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-morphism"
                                style={{
                                    padding: '4rem 3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    textAlign: 'center'
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.2 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                >
                                    <CheckCircle size={64} color="#00f2ff" />
                                </motion.div>
                                <h3 style={{ fontSize: '1.8rem' }}>Message Received</h3>
                                <p className="text-secondary">
                                    Thank you for reaching out. <br /> Your transmission has been successfully delivered.
                                </p>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Contact;
