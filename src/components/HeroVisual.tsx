import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/usePortfolio';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Neural Network / Computational Node Graph
    const group = new THREE.Group();
    scene.add(group);

    // Node count and positions
    const nodeCount = 64;
    const nodePositions: THREE.Vector3[] = [];
    const radius = 6.5;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 1.8;
      const y = radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 1.8;
      const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 1.8;
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Node points geometry
    const pointsGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(nodeCount * 3);
    const colorArray = new Float32Array(nodeCount * 3);

    const baseColor = new THREE.Color('#38bdf8'); // sky blue
    const accentColor = new THREE.Color('#34d399'); // emerald
    const purpleColor = new THREE.Color('#818cf8'); // indigo

    for (let i = 0; i < nodeCount; i++) {
      posArray[i * 3] = nodePositions[i].x;
      posArray[i * 3 + 1] = nodePositions[i].y;
      posArray[i * 3 + 2] = nodePositions[i].z;

      const c = i % 3 === 0 ? baseColor : i % 3 === 1 ? accentColor : purpleColor;
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    // Neural Synapse Connecting Lines
    const lineIndices: number[] = [];
    const maxDistance = 3.6;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance) {
          lineIndices.push(i, j);
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineIndices.length * 3);

    for (let i = 0; i < lineIndices.length; i++) {
      const idx = lineIndices[i];
      linePositions[i * 3] = nodePositions[idx].x;
      linePositions[i * 3 + 1] = nodePositions[idx].y;
      linePositions[i * 3 + 2] = nodePositions[idx].z;
    }

    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    group.add(lines);

    // Inner wireframe morphing icosahedron (abstract mathematical core)
    const coreGeometry = new THREE.IcosahedronGeometry(3.5, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Ambient floating data particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const ambientParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(ambientParticles);

    // Mouse movement interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      targetX = (clientX / rect.width) * 2 - 1;
      targetY = -(clientY / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (!reducedMotion) {
        // Smooth lerp mouse tracking
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Dynamic rotation & tilt
        group.rotation.y = time * 0.12 + mouseX * 0.8;
        group.rotation.x = time * 0.06 - mouseY * 0.6;

        coreMesh.rotation.y = -time * 0.18;
        coreMesh.rotation.z = time * 0.1;

        // Subtle scale pulse
        const pulse = 1 + Math.sin(time * 1.5) * 0.03;
        coreMesh.scale.set(pulse, pulse, pulse);

        ambientParticles.rotation.y = time * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[420px] md:min-h-[580px] relative pointer-events-none"
      aria-hidden="true"
    />
  );
};
