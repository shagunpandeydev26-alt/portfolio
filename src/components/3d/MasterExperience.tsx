import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraRig } from './CameraRig';
import { MorphingSwarm } from './MorphingSwarm';
import { SceneGeometry } from './SceneGeometry';

interface MasterExperienceProps {
  progress: number;
  mouseX: number;
  mouseY: number;
}

export const MasterExperience: React.FC<MasterExperienceProps> = ({
  progress,
  mouseX,
  mouseY
}) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        dpr={[1, 2]}
      >
        {/* Ambient & Atmospheric Lighting */}
        <ambientLight intensity={0.65} />
        <pointLight position={[10, 10, 10]} color="#38bdf8" intensity={2.8} distance={40} />
        <pointLight position={[-10, -8, 8]} color="#34d399" intensity={2.4} distance={40} />
        <pointLight position={[0, 6, -6]} color="#818cf8" intensity={2.0} distance={30} />
        <fogExp2 attach="fog" args={['#07080c', 0.035]} />

        {/* Continuous Camera Rig */}
        <CameraRig progress={progress} mouseX={mouseX} mouseY={mouseY} />

        {/* 1,200 Particle Continuous Morphing Swarm */}
        <MorphingSwarm progress={progress} />

        {/* Structural Scene Geometries */}
        <SceneGeometry progress={progress} />
      </Canvas>
    </div>
  );
};
