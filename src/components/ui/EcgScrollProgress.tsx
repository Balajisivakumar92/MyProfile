import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

const EcgScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth the progress for a more organic medical feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Generate a repeating ECG path
    // A standard ECG complex (P-QRS-T)
    const ecgPattern = [
        { x: 0, y: 0 },    // Baseline
        { x: 2, y: -2 },   // P wave start
        { x: 5, y: -5 },   // P wave peak
        { x: 8, y: -2 },   // P wave end
        { x: 10, y: 0 },   // Baseline
        { x: 12, y: 2 },   // Q wave
        { x: 15, y: -30 }, // R wave peak (Big spike)
        { x: 18, y: 10 },  // S wave
        { x: 20, y: 0 },   // Baseline
        { x: 25, y: -4 },  // T wave start
        { x: 30, y: -8 },  // T wave peak
        { x: 35, y: -4 },  // T wave end
        { x: 45, y: 0 },   // Long baseline
    ];

    const verticalPath = useMemo(() => {
        let path = "M 0 0 ";
        let currentY = 0;
        const totalHeight = 2000; // Large height to repeat the pattern
        const segmentHeight = 65; // Height of one ECG complex

        while (currentY < totalHeight) {
            ecgPattern.forEach(point => {
                const y = currentY + point.x;
                const x = point.y; // Swap X and Y for vertical orientation
                path += `L ${x} ${y} `;
            });
            currentY += segmentHeight;
        }
        return path;
    }, []);

    const opacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

    return (
        <div style={{
            position: 'fixed',
            left: isMobile ? '5px' : '40px',
            top: '0',
            width: isMobile ? '15px' : '30px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 50,
            pointerEvents: 'none',
            opacity: 0.8
        }}>
            <svg
                width="40"
                height="100%"
                viewBox="-40 0 80 2000"
                preserveAspectRatio="none"
                style={{ height: '100vh' }}
            >
                {/* Background Shadow Path (Full length, low opacity) */}
                <path
                    d={verticalPath}
                    fill="none"
                    stroke="rgba(0, 242, 255, 0.05)"
                    strokeWidth="5"
                />

                {/* Animated Progress Path */}
                <motion.path
                    d={verticalPath}
                    fill="none"
                    stroke="url(#ecgGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                        pathLength: smoothProgress,
                        opacity
                    }}
                    filter="url(#glow)"
                />

                <defs>
                    <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00f2ff" />
                        <stop offset="100%" stopColor="#0066ff" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>

            {/* Glowing heartbeat bead at the current scroll position */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isMobile ? '5px' : '7px',
                    height: isMobile ? '5px' : '7px',
                    borderRadius: '50%',
                    backgroundColor: '#00f2ff',
                    boxShadow: '0 0 15px #00f2ff, 0 0 30px #00f2ff',
                    opacity,
                    zIndex: 1
                }}
                animate={{
                    scale: [1, 1.4, 1.2, 1.8, 1],
                    opacity: [1, 0.8, 1, 0.5, 1],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "loop",
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default EcgScrollProgress;
