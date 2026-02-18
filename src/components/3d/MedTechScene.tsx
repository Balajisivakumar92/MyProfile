import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows } from '@react-three/drei';
import DicomSliceStack from './DicomSliceStack';

const MedTechScene = ({ onLoad }: { onLoad?: () => void }) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) setScale(0.6);
            else if (width < 768) setScale(0.8);
            else setScale(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, touchAction: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                eventSource={document.getElementById('root') || undefined}
                eventPrefix="client"
            >
                <color attach="background" args={['#0a0a0a']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

                <Suspense fallback={null}>
                    <PresentationControls
                        global
                        cursor={false}
                        speed={2}
                        rotation={[0, 0.3, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 2, Math.PI / 2]}
                    >
                        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                            <group scale={scale}>
                                <DicomSliceStack onLoad={onLoad} />
                            </group>
                        </Float>
                    </PresentationControls>
                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={24} far={4.5} />
                </Suspense>
            </Canvas>
        </div>
    );
};


export default MedTechScene;
