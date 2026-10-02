import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PortfolioCanvasProps {
  progress: number; // 0.0 to 1.0 from master scroll timeline
  mouseX: number;
  mouseY: number;
}

export const PortfolioCanvas: React.FC<PortfolioCanvasProps> = ({
  progress,
  mouseX,
  mouseY
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ progress, mouseX, mouseY });

  useEffect(() => {
    stateRef.current = { progress, mouseX, mouseY };
  }, [progress, mouseX, mouseY]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080c, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 40);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x34d399, 2.5, 40);
    pointLight2.position.set(-10, -8, 8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x818cf8, 2, 30);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    // ==========================================
    // 1. MASTER AMBIENT PARTICLE FIELD
    // ==========================================
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 40;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      particleOriginals[i * 3] = x;
      particleOriginals[i * 3 + 1] = y;
      particleOriginals[i * 3 + 2] = z;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ==========================================
    // 2. HERO / CORE OBJECT: NEURAL GEODESIC CONSTRUCT
    // ==========================================
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Core Wireframe Icosahedron
    const coreIcosaGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const coreIcosaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreIcosa = new THREE.Mesh(coreIcosaGeo, coreIcosaMat);
    heroGroup.add(coreIcosa);

    // Inner Concentric Polyhedron
    const innerOctaGeo = new THREE.OctahedronGeometry(1.9, 0);
    const innerOctaMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true
    });
    const innerOcta = new THREE.Mesh(innerOctaGeo, innerOctaMat);
    heroGroup.add(innerOcta);

    // Rotating Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    heroGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(5.4, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI * 0.4;
    heroGroup.add(ring2);

    // Floating Synaptic Nodes around Core
    const nodeCount = 32;
    const nodeGroup = new THREE.Group();
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const x = 4.2 * Math.cos(theta) * Math.sin(phi);
      const y = 4.2 * Math.sin(theta) * Math.sin(phi);
      const z = 4.2 * Math.cos(phi);
      nodePositions.push(new THREE.Vector3(x, y, z));

      const sphereGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0x34d399,
        transparent: true,
        opacity: 0.8
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(x, y, z);
      nodeGroup.add(sphere);
    }
    heroGroup.add(nodeGroup);

    // ==========================================
    // 3. ABOUT SCENE: ARCHITECTURAL LATTICE / CS FOUNDATIONS
    // ==========================================
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(4, 0, -2);
    scene.add(aboutGroup);

    // Columnar Grid pillars representing architectural foundations (HBTU & CS)
    const pillarCount = 5;
    const pillars: THREE.Mesh[] = [];
    for (let i = 0; i < pillarCount; i++) {
      const pGeo = new THREE.BoxGeometry(0.3, 4 + (i % 3) * 1.5, 0.3);
      const pMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const pillar = new THREE.Mesh(pGeo, pMat);
      pillar.position.set((i - 2) * 1.6, 0, (i % 2) * 0.8);
      aboutGroup.add(pillar);
      pillars.push(pillar);
    }

    // Floating Data Disc / Foundation Ring
    const discGeo = new THREE.RingGeometry(2.5, 4.5, 32);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = Math.PI * 0.5;
    disc.position.y = -2.2;
    aboutGroup.add(disc);

    // ==========================================
    // 4. SKILLS SCENE: 3D CONSTELLATION / NETWORK GRAPH
    // ==========================================
    const skillsGroup = new THREE.Group();
    skillsGroup.position.set(-3, 0, -4);
    scene.add(skillsGroup);

    // Cluster centers for 6 Skill Categories
    const clusterCenters = [
      new THREE.Vector3(-4, 2.5, 0),   // AI / ML
      new THREE.Vector3(-1.5, -2, 1),  // Web / Frontend
      new THREE.Vector3(2.5, 2, -1),   // Backend & Cloud
      new THREE.Vector3(4, -1.8, 0.5), // Languages (C++, Python)
      new THREE.Vector3(0, 3.2, 1.2),  // Databases
      new THREE.Vector3(-3.5, -3, -1)  // Blockchain / Tools
    ];

    const clusterMeshes: THREE.Mesh[] = [];
    clusterCenters.forEach((center, idx) => {
      const geom = new THREE.IcosahedronGeometry(0.65, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x38bdf8 : 0x34d399,
        wireframe: true,
        roughness: 0.1
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(center);
      skillsGroup.add(mesh);
      clusterMeshes.push(mesh);
    });

    // Connecting Synaptic Lines between skill nodes
    const skillLinesGeo = new THREE.BufferGeometry();
    const skillLinePoints: number[] = [];
    for (let i = 0; i < clusterCenters.length; i++) {
      for (let j = i + 1; j < clusterCenters.length; j++) {
        skillLinePoints.push(
          clusterCenters[i].x, clusterCenters[i].y, clusterCenters[i].z,
          clusterCenters[j].x, clusterCenters[j].y, clusterCenters[j].z
        );
      }
    }
    skillLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(skillLinePoints, 3));
    const skillLinesMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25
    });
    const skillLines = new THREE.LineSegments(skillLinesGeo, skillLinesMat);
    skillsGroup.add(skillLines);

    // ==========================================
    // 5. EXPERIENCE SCENE: SPATIAL 3D TIMELINE PATH
    // ==========================================
    const expGroup = new THREE.Group();
    expGroup.position.set(0, -1, -6);
    scene.add(expGroup);

    // Sweeping timeline curve
    const timelineCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, -2, -4),
      new THREE.Vector3(-2, 0, -1),
      new THREE.Vector3(2, -0.5, 2),
      new THREE.Vector3(6, 1.5, 4)
    ]);
    const timelineTubeGeo = new THREE.TubeGeometry(timelineCurve, 64, 0.06, 8, false);
    const timelineTubeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5
    });
    const timelineTube = new THREE.Mesh(timelineTubeGeo, timelineTubeMat);
    expGroup.add(timelineTube);

    // Waypoint 1: 2026 GsSoC (Guitariz 88-key piano wave)
    const gssocNodeGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 50);
    const gssocNodeMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true });
    const gssocNode = new THREE.Mesh(gssocNodeGeo, gssocNodeMat);
    gssocNode.position.set(-2, 0, -1);
    expGroup.add(gssocNode);

    // Waypoint 2: 2025 Taskswap (Distributed backend box)
    const taskswapNodeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const taskswapNodeMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const taskswapNode = new THREE.Mesh(taskswapNodeGeo, taskswapNodeMat);
    taskswapNode.position.set(2, -0.5, 2);
    expGroup.add(taskswapNode);

    // ==========================================
    // 6. PROJECTS SCENE: ALPHAFORGE & DWARAPALA
    // ==========================================
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(0, 0, -8);
    scene.add(projectsGroup);

    // --- ALPHAFORGE (RL Market Terrain Grid & Agent Vector) ---
    const alphaGroup = new THREE.Group();
    alphaGroup.position.set(-3, 0, 0);
    projectsGroup.add(alphaGroup);

    const gridGeo = new THREE.PlaneGeometry(6, 6, 12, 12);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const gridPlane = new THREE.Mesh(gridGeo, gridMat);
    gridPlane.rotation.x = -Math.PI * 0.4;
    alphaGroup.add(gridPlane);

    // RL Trajectory Spline
    const rlTrajectoryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.5, -1.2, 0),
      new THREE.Vector3(-1.2, -0.2, 0.8),
      new THREE.Vector3(0.2, -0.8, 1.2),
      new THREE.Vector3(1.5, 0.9, 1.8),
      new THREE.Vector3(2.5, 1.6, 2.2)
    ]);
    const rlTubeGeo = new THREE.TubeGeometry(rlTrajectoryCurve, 40, 0.05, 8, false);
    const rlTubeMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const rlTube = new THREE.Mesh(rlTubeGeo, rlTubeMat);
    alphaGroup.add(rlTube);

    // RL Agent Pulsing Sphere
    const agentSphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const agentSphereMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const agentSphere = new THREE.Mesh(agentSphereGeo, agentSphereMat);
    agentSphere.position.set(2.5, 1.6, 2.2);
    alphaGroup.add(agentSphere);

    // --- DWARAPALA (Biometric 3D Wireframe Face Mask & Laser Scan) ---
    const dwaraGroup = new THREE.Group();
    dwaraGroup.position.set(3, 0, 0);
    projectsGroup.add(dwaraGroup);

    // Abstract 3D Face Wireframe (approximated via scaled geodesic hemisphere)
    const faceMaskGeo = new THREE.SphereGeometry(2.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const faceMaskMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const faceMask = new THREE.Mesh(faceMaskGeo, faceMaskMat);
    faceMask.scale.set(0.9, 1.3, 0.9);
    faceMask.rotation.x = Math.PI * 0.1;
    dwaraGroup.add(faceMask);

    // Biometric Verification Target Rings (ArcFace 512D)
    const targetRingGeo = new THREE.RingGeometry(2.6, 2.65, 48);
    const targetRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const targetRing = new THREE.Mesh(targetRingGeo, targetRingMat);
    dwaraGroup.add(targetRing);

    // Laser Scanning Plane
    const scanPlaneGeo = new THREE.PlaneGeometry(5.2, 0.08);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    dwaraGroup.add(scanPlane);

    // ==========================================
    // 7. ACHIEVEMENTS SCENE: HOLOGRAPHIC TROPHY / KNIGHT EMBLEM
    // ==========================================
    const achieveGroup = new THREE.Group();
    achieveGroup.position.set(0, 0, -10);
    scene.add(achieveGroup);

    // Central LeetCode Knight Octahedral Jewel
    const knightJewelGeo = new THREE.OctahedronGeometry(2.4, 0);
    const knightJewelMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9
    });
    const knightJewel = new THREE.Mesh(knightJewelGeo, knightJewelMat);
    achieveGroup.add(knightJewel);

    // Golden Algoqueen Championship Rings
    const goldRingGeo = new THREE.TorusGeometry(3.6, 0.05, 16, 64);
    const goldRingMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 });
    const goldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
    goldRing.rotation.x = Math.PI * 0.45;
    achieveGroup.add(goldRing);

    // ==========================================
    // ANIMATION & SCROLL PROGRESS INTERPOLATION
    // ==========================================
    let animId: number;
    let clock = new THREE.Clock();
    let currentCamPos = new THREE.Vector3(0, 0, 20);
    let targetCamPos = new THREE.Vector3(0, 0, 20);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const p = stateRef.current.progress; // 0.0 to 1.0
      const mx = stateRef.current.mouseX * 0.8;
      const my = stateRef.current.mouseY * 0.8;

      // ------------------------------------------
      // Continuous Camera Choreography by Progress
      // ------------------------------------------
      // Phase 0: Hero [0.00 - 0.14]
      // Phase 1: About [0.14 - 0.30]
      // Phase 2: Skills [0.30 - 0.46]
      // Phase 3: Experience [0.46 - 0.62]
      // Phase 4: Projects [0.62 - 0.80]
      // Phase 5: Achievements [0.80 - 0.92]
      // Phase 6: Contact [0.92 - 1.00]

      if (p < 0.14) {
        // Hero: Dive from Z:20 to Z:14
        const local = p / 0.14;
        targetCamPos.set(mx * 1.5, my * 1.2, 20 - local * 6);
        camera.lookAt(0, 0, 0);

        heroGroup.visible = true;
        aboutGroup.visible = false;
        skillsGroup.visible = false;
        expGroup.visible = false;
        projectsGroup.visible = false;
        achieveGroup.visible = false;

        heroGroup.scale.setScalar(1 + local * 0.3);
        heroGroup.position.set(0, 0, 0);
      } else if (p < 0.30) {
        // Hero -> About: Camera orbits to the right, hero fragments, About pillars emerge
        const local = (p - 0.14) / 0.16;
        targetCamPos.set(4 * local + mx, 1.2 * local + my, 14 - local * 4);
        camera.lookAt(2 * local, 0, 0);

        heroGroup.visible = true;
        heroGroup.position.set(-6 * local, 0, -local * 6);
        heroGroup.scale.setScalar(Math.max(0.2, 1.3 - local * 0.9));

        aboutGroup.visible = true;
        aboutGroup.position.set(2 * (1 - local) + 1, 0, 0);
        skillsGroup.visible = false;
        expGroup.visible = false;
        projectsGroup.visible = false;
        achieveGroup.visible = false;
      } else if (p < 0.46) {
        // About -> Skills: Fly into 3D constellation
        const local = (p - 0.30) / 0.16;
        targetCamPos.set(-2 * local + mx, -0.5 * local + my, 10 - local * 3);
        camera.lookAt(0, 0, -2);

        heroGroup.visible = false;
        aboutGroup.visible = local < 0.5;
        skillsGroup.visible = true;
        skillsGroup.scale.setScalar(0.7 + local * 0.5);
        skillsGroup.rotation.y = time * 0.1 + local * Math.PI;

        expGroup.visible = false;
        projectsGroup.visible = false;
        achieveGroup.visible = false;
      } else if (p < 0.62) {
        // Skills -> Experience: Glide along spatial timeline
        const local = (p - 0.46) / 0.16;
        targetCamPos.set(Math.sin(local * Math.PI) * 3 + mx, -0.8 + my, 9 - local * 2);
        camera.lookAt(0, 0, -local * 3);

        heroGroup.visible = false;
        aboutGroup.visible = false;
        skillsGroup.visible = local < 0.3;
        expGroup.visible = true;
        expGroup.position.set(0, -0.5, -2 + local * 3);

        projectsGroup.visible = false;
        achieveGroup.visible = false;
      } else if (p < 0.80) {
        // Experience -> Projects: Showcase AlphaForge & Dwarapala
        const local = (p - 0.62) / 0.18;
        // Pan between AlphaForge (left) and Dwarapala (right)
        const panX = local < 0.5 ? -1.8 + mx : 1.8 + mx;
        targetCamPos.set(panX, 0.4 + my, 8.5);
        camera.lookAt(local < 0.5 ? -3 : 3, 0, 0);

        heroGroup.visible = false;
        aboutGroup.visible = false;
        skillsGroup.visible = false;
        expGroup.visible = false;
        projectsGroup.visible = true;
        achieveGroup.visible = false;

        // Laser scan animation
        scanPlane.position.y = Math.sin(time * 3.5) * 1.8;
      } else if (p < 0.92) {
        // Projects -> Achievements: Elevated view of Knight jewel & trophy
        const local = (p - 0.80) / 0.12;
        targetCamPos.set(mx, 1.8 + my, 12 - local * 2);
        camera.lookAt(0, 0.2, 0);

        heroGroup.visible = false;
        aboutGroup.visible = false;
        skillsGroup.visible = false;
        expGroup.visible = false;
        projectsGroup.visible = false;
        achieveGroup.visible = true;
        achieveGroup.scale.setScalar(0.8 + local * 0.3);
      } else {
        // Contact: Converge into ambient breathing galaxy
        const local = (p - 0.92) / 0.08;
        targetCamPos.set(mx, my, 14 + local * 3);
        camera.lookAt(0, 0, 0);

        heroGroup.visible = true;
        heroGroup.position.set(0, 0, 0);
        heroGroup.scale.setScalar(0.7);

        aboutGroup.visible = false;
        skillsGroup.visible = false;
        expGroup.visible = false;
        projectsGroup.visible = false;
        achieveGroup.visible = false;
      }

      // Smooth camera interpolation
      currentCamPos.lerp(targetCamPos, 0.08);
      camera.position.copy(currentCamPos);

      // Rotations & dynamic life
      heroGroup.rotation.y = time * 0.18;
      heroGroup.rotation.x = time * 0.08;
      innerOcta.rotation.y = -time * 0.3;
      ring1.rotation.z = time * 0.15;
      ring2.rotation.z = -time * 0.2;

      aboutGroup.rotation.y = time * 0.05;
      disc.rotation.z = time * 0.1;

      clusterMeshes.forEach((mesh, idx) => {
        mesh.rotation.y = time * (0.2 + idx * 0.1);
        mesh.rotation.x = time * 0.1;
      });

      gssocNode.rotation.x = time * 0.2;
      gssocNode.rotation.y = time * 0.15;
      taskswapNode.rotation.y = time * 0.2;
      taskswapNode.rotation.x = time * 0.1;

      faceMask.rotation.y = Math.sin(time * 0.8) * 0.25;
      targetRing.rotation.z = time * 0.3;

      knightJewel.rotation.y = time * 0.25;
      knightJewel.rotation.x = time * 0.1;
      goldRing.rotation.z = -time * 0.2;

      // Ambient particle breathing
      particleSystem.rotation.y = time * 0.02 + p * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden"
      aria-hidden="true"
    />
  );
};
