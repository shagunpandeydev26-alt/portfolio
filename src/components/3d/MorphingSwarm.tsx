import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { generateMorphTargets } from './morphTargets';
import { getSafeZoneForProgress } from './safeZones';

interface MorphingSwarmProps {
  progress: number; // 0.0 to 1.0
}

export const MorphingSwarm: React.FC<MorphingSwarmProps> = ({ progress }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const targets = useMemo(() => generateMorphTargets(), []);
  const count = targets.COUNT;

  // Buffer attributes
  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const currentColors = useMemo(() => new Float32Array(count * 3), [count]);

  const pRef = useRef(progress);
  pRef.current = progress;

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colAttr = geo.attributes.color as THREE.BufferAttribute;

    const p = Math.max(0, Math.min(1, pRef.current));
    const time = state.clock.getElapsedTime();

    // Get current text-safe zone avoidance configuration
    const safeZone = getSafeZoneForProgress(p);

    let fromArr: Float32Array;
    let toArr: Float32Array;
    let segmentT = 0;

    if (p < 0.16) {
      fromArr = targets.heroPositions;
      toArr = targets.aboutPositions;
      segmentT = p / 0.16;
    } else if (p < 0.32) {
      fromArr = targets.aboutPositions;
      toArr = targets.skillsPositions;
      segmentT = (p - 0.16) / 0.16;
    } else if (p < 0.48) {
      fromArr = targets.skillsPositions;
      toArr = targets.expPositions;
      segmentT = (p - 0.32) / 0.16;
    } else if (p < 0.64) {
      fromArr = targets.expPositions;
      toArr = targets.alphaPositions;
      segmentT = (p - 0.48) / 0.16;
    } else if (p < 0.80) {
      fromArr = targets.alphaPositions;
      toArr = targets.dwaraPositions;
      segmentT = (p - 0.64) / 0.16;
    } else if (p < 0.92) {
      fromArr = targets.dwaraPositions;
      toArr = targets.achievePositions;
      segmentT = (p - 0.80) / 0.12;
    } else {
      fromArr = targets.achievePositions;
      toArr = targets.contactPositions;
      segmentT = (p - 0.92) / 0.08;
    }

    const smoothT = segmentT * segmentT * (3 - 2 * segmentT);

    const positions = posAttr.array as Float32Array;
    const colors = colAttr.array as Float32Array;

    const { centerX, centerY, radiusX, radiusY, particleAlpha, repulsionForce } = safeZone;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      let x = fromArr[idx] + (toArr[idx] - fromArr[idx]) * smoothT;
      let y = fromArr[idx + 1] + (toArr[idx + 1] - fromArr[idx + 1]) * smoothT;
      let z = fromArr[idx + 2] + (toArr[idx + 2] - fromArr[idx + 2]) * smoothT;

      // Subtle atmospheric drift
      x += Math.sin(time * 0.8 + i) * 0.08;
      y += Math.cos(time * 0.8 + i) * 0.08;

      // ==========================================
      // TEXT-SAFE ZONE AVOIDANCE & REPULSION
      // ==========================================
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      const distSq = dx * dx + dy * dy;

      let dimFactor = 1.0;

      if (distSq < 1.0) {
        // Particle is inside the text reading zone!
        const dist = Math.sqrt(distSq) || 0.001;
        const push = (1.0 - dist) * repulsionForce;

        // Repel particle outward away from text center
        x = centerX + (dx / dist) * radiusX * (1.0 + push * 0.4);
        y = centerY + (dy / dist) * radiusY * (1.0 + push * 0.4);

        // Push deeper in Z so it never overlaps foreground text planes
        z -= (1.0 - dist) * 12.0;

        // Dim brightness near text
        dimFactor = particleAlpha * (0.3 + dist * 0.7);
      } else if (distSq < 1.6) {
        // Near safe-zone margin: gentle fade
        const t = (distSq - 1.0) / 0.6;
        dimFactor = particleAlpha + (1.0 - particleAlpha) * t;
      }

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      // Color & brightness modulation
      const isEven = i % 2 === 0;
      colors[idx] = (isEven ? 0.22 : 0.20) * dimFactor;
      colors[idx + 1] = (isEven ? 0.74 : 0.83) * dimFactor;
      colors[idx + 2] = (isEven ? 0.97 : 0.60) * dimFactor;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[currentColors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
