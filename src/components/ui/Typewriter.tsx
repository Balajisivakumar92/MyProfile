import React from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
}

const Typewriter: React.FC<TypewriterProps> = ({
    text,
    delay = 0,
    speed = 0.05,
    className,
    style
}) => {
    const characters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: speed, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },

    };

    return (
        <motion.span
            style={{ display: 'inline-block', ...style }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default Typewriter;
