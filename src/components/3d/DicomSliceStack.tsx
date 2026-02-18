import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { loadDicom } from '../../utils/dicomLoader';
import type { LoadedDicom } from '../../utils/dicomLoader';

// Get all files from the dicom folder
const dicomFiles = import.meta.glob('../../assets/dicom/*.dcm', { eager: true, as: 'url' });

const DicomSliceStack = ({ onLoad }: { onLoad?: () => void }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [loadedSlices, setLoadedSlices] = useState<LoadedDicom[]>([]);

    // Configuration
    const sampleRate = 5; // Fewer slices for better transparency control
    const sliceSpacing = 0.30; // More air between slices
    const sliceSize = 3.5;

    // Filter and sample the files
    const sliceUrls = useMemo(() => {
        const urls = Object.values(dicomFiles) as string[];
        return urls.filter((_, idx) => idx % sampleRate === 0);
    }, [sampleRate]);

    const sliceCount = sliceUrls.length;

    useEffect(() => {
        let isMounted = true;

        async function loadAll() {
            const results: LoadedDicom[] = [];
            for (const url of sliceUrls) {
                try {
                    const data = await loadDicom(url);
                    results.push(data);
                } catch (err) {
                    console.error('Error loading DICOM:', url, err);
                }
            }
            if (isMounted) {
                setLoadedSlices(results);
                if (onLoad) onLoad();
            }
        }

        loadAll();
        return () => { isMounted = false; };
    }, [sliceUrls, onLoad]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.1;
            groupRef.current.rotation.x = -Math.PI / 6; // Slight tilt towards the camera
        }
    });

    if (loadedSlices.length === 0) return null;

    return (
        <group ref={groupRef}>
            {loadedSlices.map((slice, idx) => (
                <group key={idx} position={[0, (idx - sliceCount / 2) * sliceSpacing, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    {/* The Medical Scan Slice */}
                    <mesh>
                        <planeGeometry args={[sliceSize, sliceSize]} />
                        <meshStandardMaterial
                            map={slice.texture}
                            transparent
                            opacity={0.7}
                            side={THREE.DoubleSide}
                            // Subtle blue-tinted grayscale
                            emissive="#b0d4ff"
                            emissiveIntensity={0.02}
                            blending={THREE.NormalBlending}
                        />
                    </mesh>

                    {/* Slice Border Grid (Subtle Blue) */}
                    <mesh rotation={[0, 0, Math.PI / 4]}>
                        <ringGeometry args={[sliceSize / 2, sliceSize / 2 + 0.01, 4]} />
                        <meshStandardMaterial
                            color="#4a90e2"
                            emissive="#4a90e2"
                            emissiveIntensity={1}
                            transparent
                            opacity={0.2}
                        />
                    </mesh>

                    {/* Subtle outer frame */}
                    <mesh position={[0, 0, 0.001]}>
                        <planeGeometry args={[sliceSize, sliceSize]} />
                        <meshStandardMaterial color="#4a90e2" wireframe transparent opacity={0} />
                    </mesh>
                </group>
            ))}

            {/* Scanning Effect Plane */}
            <ScanEffect sliceCount={sliceCount} sliceSpacing={sliceSpacing} sliceSize={sliceSize} />
        </group>
    );
};

const ScanEffect = ({ sliceCount, sliceSpacing, sliceSize }: { sliceCount: number, sliceSpacing: number, sliceSize: number }) => {
    const scanRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const range = sliceCount * sliceSpacing;
        const y = ((time % 4) / 4) * range - range / 2;
        scanRef.current.position.y = y;
    });

    return (
        <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[sliceSize + 0.05, sliceSize + 0.05]} />
            <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.20}
                emissive="#ffffff"
                emissiveIntensity={4}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

export default DicomSliceStack;
