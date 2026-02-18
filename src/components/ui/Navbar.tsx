import { motion } from 'framer-motion';
import { FileText, Briefcase, Mail, Activity, MessageSquare } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Resume', icon: <FileText size={18} />, href: '#resume' },
        { name: 'Testimonials', icon: <MessageSquare size={18} />, href: '#testimonials' },
        { name: 'Projects', icon: <Briefcase size={18} />, href: '#projects' },
        { name: 'Contact', icon: <Mail size={18} />, href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            className="glass-morphism navbar-container"
        >
            <motion.a
                href="#hero"
                whileHover={{ scale: 1.05 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginRight: '1rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                }}
            >
                <Activity size={24} color="#00f2ff" />
                <span className="nav-logo-text" style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '0.9rem' }}>BALAJI <span className="text-gradient">SIVAKUMAR</span></span>
            </motion.a>

            <div className="nav-links">
                {navItems.map((item) => (
                    <motion.a
                        key={item.name}
                        href={item.href}
                        whileHover={{ scale: 1.1, color: '#00f2ff' }}
                        className="nav-link"
                    >
                        {item.icon}
                        <span className="nav-text">{item.name}</span>
                    </motion.a>
                ))}
            </div>

        </motion.nav>
    );
};

export default Navbar;
