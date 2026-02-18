import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Palette, Lightbulb, PenTool, Brain, Target } from 'lucide-react';

const Achievements = () => {
    const [viewType, setViewType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    useEffect(() => {
        const checkView = () => {
            const width = window.innerWidth;
            if (width < 480) setViewType('mobile');
            else if (width < 768) setViewType('tablet');
            else setViewType('desktop');
        };
        checkView();
        window.addEventListener('resize', checkView);
        return () => window.removeEventListener('resize', checkView);
    }, []);

    const isMobile = viewType === 'mobile';
    const isTablet = viewType === 'tablet';

    const badgeWidth = isMobile ? 180 : (isTablet ? 220 : 280);
    const badgeGap = isMobile ? 12 : (isTablet ? 16 : 24);
    const totalItemWidth = badgeWidth + badgeGap;

    const badgeItems = [
        {
            name: "GitHub Pull Shark",
            detail: "Merged Pull Requests",
            icon: <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
            bg: 'rgba(0, 102, 255, 0.1)',
            border: 'rgba(0, 102, 255, 0.2)',
            gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)'
        },
        {
            name: "Spot Award",
            detail: "L&T Technology Services",
            icon: <Award size={24} color="white" />,
            bg: 'rgba(0, 242, 255, 0.05)',
            border: 'rgba(0, 242, 255, 0.15)',
            gradient: 'linear-gradient(135deg, #00f2ff 0%, #0066ff 100%)'
        },
        {
            name: "Best UI/UX Designer",
            detail: "Health Care Innovation Center",
            icon: <Palette size={20} color="white" />,
            bg: 'rgba(255, 102, 255, 0.05)',
            border: 'rgba(255, 102, 255, 0.15)',
            gradient: 'linear-gradient(135deg, #ff66ff 0%, #0066ff 100%)'
        },
        {
            name: "Problem Solver",
            detail: "L&T Technology Services",
            icon: <Lightbulb size={20} color="white" />,
            bg: 'rgba(255, 170, 0, 0.05)',
            border: 'rgba(255, 170, 0, 0.15)',
            gradient: 'linear-gradient(135deg, #ffaa00 0%, #ff6600 100%)'
        },
        {
            name: "Developer of the Month",
            detail: "L&T Technology Services",
            icon: <Trophy size={20} color="white" />,
            bg: 'rgba(0, 255, 136, 0.05)',
            border: 'rgba(0, 255, 136, 0.15)',
            gradient: 'linear-gradient(135deg, #00ff88 0%, #00bcff 100%)'
        },
        {
            name: "Designer Award",
            detail: "L&T Technology Services",
            icon: <PenTool size={20} color="white" />,
            bg: 'rgba(255, 255, 0, 0.05)',
            border: 'rgba(255, 255, 0, 0.15)',
            gradient: 'linear-gradient(135deg, #ffee00 0%, #ff8800 100%)'
        },
        {
            name: "Critical Thinker",
            detail: "L&T Technology Services",
            icon: <Brain size={20} color="white" />,
            bg: 'rgba(129, 140, 248, 0.05)',
            border: 'rgba(129, 140, 248, 0.15)',
            gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
        },
        {
            name: "Achiever Award",
            detail: "L&T Technology Services",
            icon: <Target size={20} color="white" />,
            bg: 'rgba(239, 68, 68, 0.05)',
            border: 'rgba(239, 68, 68, 0.15)',
            gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
        }
    ];

    // Duplicate badges for seamless loop
    const displayBadges = [...badgeItems, ...badgeItems];

    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            marginTop: 'auto',
            paddingTop: isMobile ? '2rem' : '3rem',
            paddingBottom: '2rem',
            position: 'relative'
        }}>
            <motion.div
                animate={{
                    x: [0, -totalItemWidth * badgeItems.length],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 50,
                        ease: "linear",
                    },
                }}
                style={{
                    display: 'flex',
                    gap: `${badgeGap}px`,
                    width: 'max-content',
                    padding: `0 ${badgeGap}px`
                }}
            >
                {displayBadges.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass-morphism"
                        style={{
                            padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? '0.75rem' : '1rem',
                            background: item.bg,
                            borderColor: item.border,
                            width: `${badgeWidth}px`,
                            flexShrink: 0
                        }}
                    >
                        <div style={{
                            width: isMobile ? '35px' : '40px',
                            height: isMobile ? '35px' : '40px',
                            borderRadius: '50%',
                            background: item.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 15px ${item.bg === 'rgba(255, 255, 255, 0.05)' ? 'rgba(255,255,255,0.1)' : item.bg.replace('0.05', '0.3')}`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {item.icon}
                        </div>
                        <div>
                            <h5 style={{ fontSize: isMobile ? '0.75rem' : '0.8rem', color: 'var(--text-primary)', margin: 0 }}>{item.name}</h5>
                            <p style={{ fontSize: isMobile ? '0.6rem' : '0.65rem', color: 'var(--text-secondary)', margin: 0 }}>{item.detail}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Achievements;
