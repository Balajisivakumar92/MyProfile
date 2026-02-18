import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DNAHelix = ({ interactive = false }: { interactive?: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const radius = 1.0;
    const height = 12;
    const turns = 4;
    const dotsPerStrand = 100;
    const rungsCount = 20;

    const dots = useMemo(() => {
        const items = [];

        // Create strands as dots
        for (let i = 0; i < dotsPerStrand; i++) {
            const t = i / dotsPerStrand;
            const angle = t * Math.PI * 2 * turns;
            const x = t * height - height / 2; // Horizontal axis

            // Strand 1 dots
            items.push({
                pos: [x, radius * Math.cos(angle), radius * Math.sin(angle)],
                color: '#00f2ff',
                size: 0.08,
            });

            // Strand 2 dots
            items.push({
                pos: [x, radius * Math.cos(angle + Math.PI), radius * Math.sin(angle + Math.PI)],
                color: '#0066ff',
                size: 0.08,
            });
        }

        // Create rungs as dots
        for (let i = 0; i < rungsCount; i++) {
            const t = i / (rungsCount - 1);
            const angle = t * Math.PI * 2 * turns;
            const x = t * height - height / 2;

            const p1 = new THREE.Vector3(x, radius * Math.cos(angle), radius * Math.sin(angle));
            const p2 = new THREE.Vector3(x, radius * Math.cos(angle + Math.PI), radius * Math.sin(angle + Math.PI));

            const dotsOnRung = 6;
            for (let j = 1; j < dotsOnRung; j++) {
                const lerpFactor = j / dotsOnRung;
                const pos = new THREE.Vector3().lerpVectors(p1, p2, lerpFactor);
                items.push({
                    pos: [pos.x, pos.y, pos.z],
                    color: '#ffffff',
                    size: 0.03,
                });
            }
        }

        return items;
    }, [radius, height, turns, dotsPerStrand, rungsCount]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const { x, y } = state.pointer;

        // Set base diagonal angle (top-right to bottom-left)
        const baseDiagonalRotation = -Math.PI / 4; // -45 degrees

        // Target values based on interaction state
        const targetXRotation = interactive ? time * 0.05 - y * 1.5 : time * 0.05;
        const targetZRotation = interactive ? baseDiagonalRotation + x * 0.5 : baseDiagonalRotation;
        const targetXPos = interactive ? x * 2 : 0;
        const targetYPos = interactive ? Math.sin(time * 0.3) * 0.2 + y * 1 : Math.sin(time * 0.3) * 0.2;

        // Apply rotations
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetXRotation, 0.05);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZRotation, 0.05);

        // Apply positions
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetXPos, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetYPos, 0.05);
    });

    return (
        <group ref={groupRef}>
            {dots.map((dot, idx) => (
                <mesh key={idx} position={dot.pos as [number, number, number]}>
                    <sphereGeometry args={[dot.size, 8, 8]} />
                    <meshStandardMaterial
                        color={dot.color}
                        emissive={dot.color}
                        emissiveIntensity={2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default DNAHelix;
