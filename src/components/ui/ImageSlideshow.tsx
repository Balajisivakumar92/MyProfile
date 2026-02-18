import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface ImageSlideshowProps {
    images: string[];
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
    };

    useEffect(() => {
        if (!images || images.length <= 1 || isExpanded) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, images.length, isExpanded]);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                borderRadius: '12px',
                backgroundColor: 'rgba(0,0,0,0.2)',
                cursor: 'pointer'
            }}
                onClick={() => setIsExpanded(true)}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(_, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        alt={`Project slide ${currentIndex + 1}`}
                    />
                </AnimatePresence>

                {/* Hover Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease',
                    zIndex: 5
                }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)')}
                >
                    <Maximize2 size={32} color="white" style={{ opacity: 0.5 }} />
                </div>

                {/* Navigation Arrows */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    zIndex: 10,
                    pointerEvents: 'none'
                }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(-1);
                        }}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(1);
                        }}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem',
                    zIndex: 10
                }}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            style={{
                                width: index === currentIndex ? '1rem' : '0.5rem',
                                height: '0.5rem',
                                borderRadius: '9999px',
                                backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Popup rendered via Portal to escape parent transforms */}
            {createPortal(
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                zIndex: 99999, // Use extremely high z-index
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem'
                            }}
                            onClick={() => setIsExpanded(false)}
                        >
                            <motion.button
                                style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    zIndex: 100001
                                }}
                                onClick={() => setIsExpanded(false)}
                            >
                                <X size={32} />
                            </motion.button>

                            <motion.div
                                style={{
                                    width: '80vw',
                                    height: '80vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    zIndex: 100000
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    src={images[currentIndex]}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                    }}
                                />
                            </motion.div>

                            {/* Modal Navigation */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '2rem',
                                pointerEvents: 'none',
                                zIndex: 100001
                            }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        paginate(-1);
                                    }}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        pointerEvents: 'auto',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        paginate(1);
                                    }}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        pointerEvents: 'auto',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

        </>
    );
};

export default ImageSlideshow;
