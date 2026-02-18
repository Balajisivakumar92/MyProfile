import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#050505',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Pulse Effect */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '2px solid #00f2ff',
                    }}
                />

                {/* Heartbeat Icon */}
                <Activity size={48} color="#00f2ff" />
            </div>

            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                    color: '#00f2ff',
                    marginTop: '1.5rem',
                    fontFamily: 'monospace',
                    letterSpacing: '2px',
                    fontSize: '0.9rem'
                }}
            >
                INITIALIZING SYSTEMS...
            </motion.p>
        </motion.div>
    );
};

export default Loader;
