import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { getSafeZoneForProgress } from './safeZones';

interface CameraRigProps {
  progress: number; // 0.0 to 1.0
  mouseX: number;
  mouseY: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({ progress, mouseX, mouseY }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 22));
  const targetPos = useRef(new THREE.Vector3(0, 0, 22));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const p = Math.max(0, Math.min(1, progress));
    const safeZone = getSafeZoneForProgress(p);

    const mx = mouseX * 0.6;
    const my = mouseY * 0.6;

    // Continuous Camera Spline Waypoints across the 7 scenes with Safe-Zone Framing
    if (p < 0.16) {
      // 0. Hero: Approaches from depth (Z: 22 -> 14), framed slightly to right
      const local = p / 0.16;
      targetPos.current.set(safeZone.cameraOffsetX + mx, safeZone.cameraOffsetY + my, 22 - local * 8);
      targetLookAt.current.set(safeZone.cameraOffsetX * 0.5, 0, 0);
    } else if (p < 0.32) {
      // 1. Hero -> About: Camera swoops to side, framing left typography
      const local = (p - 0.16) / 0.16;
      targetPos.current.set(safeZone.cameraOffsetX + mx + local * 0.6, safeZone.cameraOffsetY + my, 14 - local * 3.5);
      targetLookAt.current.set(1.0, 0, 0);
    } else if (p < 0.48) {
      // 2. About -> Skills: Centers with slight elevation for 3D constellation
      const local = (p - 0.32) / 0.16;
      targetPos.current.set(mx, my, 10.5 - local * 2.2);
      targetLookAt.current.set(0, 0, -1);
    } else if (p < 0.64) {
      // 3. Skills -> Experience: Glides smoothly along spatial ribbon
      const local = (p - 0.48) / 0.16;
      const waveX = Math.sin(local * Math.PI) * 2.2;
      targetPos.current.set(waveX + mx, -0.4 + my, 8.8 - local * 1.2);
      targetLookAt.current.set(0, 0, -local * 1.5);
    } else if (p < 0.80) {
      // 4. Experience -> Projects (AlphaForge & Dwarapala)
      // Camera framed to keep left side calm for text
      const local = (p - 0.64) / 0.16;
      targetPos.current.set(1.4 + mx, 0.2 + my, 8.5);
      targetLookAt.current.set(1.2, 0, 0);
    } else if (p < 0.92) {
      // 5. Projects -> Achievements: Elevated view framing Knight jewel to right
      const local = (p - 0.80) / 0.12;
      targetPos.current.set(0.8 + mx, 1.2 + my, 11 - local * 1.8);
      targetLookAt.current.set(0.6, 0.1, 0);
    } else {
      // 6. Achievements -> Contact: Pulls back into deep space
      const local = (p - 0.92) / 0.08;
      targetPos.current.set(mx, my, 13 + local * 2.5);
      targetLookAt.current.set(0, 0, 0);
    }

    // Smooth lerp camera movement for cinematic weight
    currentPos.current.lerp(targetPos.current, 0.07);
    currentLookAt.current.lerp(targetLookAt.current, 0.07);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
