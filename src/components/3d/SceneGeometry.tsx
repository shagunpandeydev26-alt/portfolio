import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SceneGeometryProps {
  progress: number;
}

export const SceneGeometry: React.FC<SceneGeometryProps> = ({ progress }) => {
  const heroGroupRef = useRef<THREE.Group>(null);
  const aboutGroupRef = useRef<THREE.Group>(null);
  const alphaGroupRef = useRef<THREE.Group>(null);
  const dwaraGroupRef = useRef<THREE.Group>(null);
  const achieveGroupRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.Mesh>(null);
  const ppoAgentRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Hero Object Dynamics (Framed to the Right of Typography)
    if (heroGroupRef.current) {
      heroGroupRef.current.rotation.y = time * 0.14;
      heroGroupRef.current.rotation.x = time * 0.07;
      const heroOpacity = Math.max(0, 1 - progress * 4.5);
      heroGroupRef.current.scale.setScalar(Math.max(0.01, 1 - progress * 2.2));
      heroGroupRef.current.visible = heroOpacity > 0.01;
    }

    // 2. About Pillars (Framed on the Right)
    if (aboutGroupRef.current) {
      const isAbout = progress >= 0.11 && progress <= 0.34;
      aboutGroupRef.current.visible = isAbout;
      aboutGroupRef.current.rotation.y = time * 0.05;
    }

    // 3. AlphaForge Market Dynamics (Framed on the Right)
    if (alphaGroupRef.current) {
      const isAlpha = progress >= 0.52 && progress <= 0.76;
      alphaGroupRef.current.visible = isAlpha;
      if (ppoAgentRef.current) {
        const t = (Math.sin(time * 1.5) * 0.5 + 0.5) * 5 - 2.5;
        ppoAgentRef.current.position.set(t, Math.sin(t * 1.2) * 1.0, Math.cos(t) * 0.7);
      }
    }

    // 4. Dwarapala Biometric Scanning Plane (Framed on the Right)
    if (dwaraGroupRef.current) {
      const isDwara = progress >= 0.68 && progress <= 0.88;
      dwaraGroupRef.current.visible = isDwara;
      dwaraGroupRef.current.rotation.y = Math.sin(time * 0.7) * 0.18;
      if (laserRef.current) {
        laserRef.current.position.y = Math.sin(time * 2.2) * 1.8;
      }
    }

    // 5. Achievements Knight Jewel (Framed in the upper right)
    if (achieveGroupRef.current) {
      const isAchieve = progress >= 0.82 && progress <= 0.96;
      achieveGroupRef.current.visible = isAchieve;
      achieveGroupRef.current.rotation.y = time * 0.22;
      achieveGroupRef.current.rotation.z = Math.sin(time * 0.5) * 0.08;
    }
  });

  return (
    <>
      {/* 1. HERO CONSTRUCT: Offset to the right to frame left-aligned typography */}
      <group ref={heroGroupRef} position={[3.6, 0.2, -2]}>
        <mesh>
          <icosahedronGeometry args={[2.8, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.8, 0]} />
          <meshStandardMaterial color="#34d399" wireframe roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI * 0.35, 0, 0]}>
          <torusGeometry args={[4.2, 0.018, 16, 80]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI * 0.4, 0]}>
          <torusGeometry args={[4.8, 0.015, 16, 80]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* 2. ABOUT: Architectural CS Foundation Pillars (Deep on the right) */}
      <group ref={aboutGroupRef} position={[4.2, 0, -3]} visible={false}>
        {[-2, -1, 0, 1, 2].map((idx) => (
          <mesh key={idx} position={[idx * 1.4, 0, (idx % 2) * 0.5]}>
            <boxGeometry args={[0.22, 4.0 + Math.abs(idx) * 0.6, 0.22]} />
            <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.25} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI * 0.5, 0, 0]} position={[0, -2.0, 0]}>
          <ringGeometry args={[1.8, 3.8, 32]} />
          <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} wireframe transparent opacity={0.18} />
        </mesh>
      </group>

      {/* 3. ALPHAFORGE: 3D Market Grid & PPO Trajectory (Framed to right) */}
      <group ref={alphaGroupRef} position={[3.6, -0.3, -3]} visible={false}>
        <mesh rotation={[-Math.PI * 0.4, 0, 0]}>
          <planeGeometry args={[6, 6, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.25} />
        </mesh>
        <mesh ref={ppoAgentRef}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>

      {/* 4. DWARAPALA: 3D Biometric Face Mesh & Laser Plane (Framed to right) */}
      <group ref={dwaraGroupRef} position={[3.6, 0.1, -2.5]} visible={false}>
        <mesh scale={[0.85, 1.2, 0.85]}>
          <sphereGeometry args={[2.0, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.32} />
        </mesh>
        <mesh ref={laserRef}>
          <planeGeometry args={[4.6, 0.05]} />
          <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.3, 2.35, 48]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* 5. ACHIEVEMENTS: LeetCode Knight Octahedral Jewel (Framed in upper right) */}
      <group ref={achieveGroupRef} position={[3.2, 0.6, -3]} visible={false}>
        <mesh>
          <octahedronGeometry args={[2.0, 0]} />
          <meshStandardMaterial color="#f59e0b" wireframe roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI * 0.45, 0, 0]}>
          <torusGeometry args={[3.2, 0.035, 16, 64]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
        </mesh>
      </group>
    </>
  );
};
