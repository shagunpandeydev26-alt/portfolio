import * as THREE from 'three';

// Generate 1,200 points for each of the 7 scenes
const COUNT = 1200;

export function generateMorphTargets() {
  const heroPositions = new Float32Array(COUNT * 3);
  const aboutPositions = new Float32Array(COUNT * 3);
  const skillsPositions = new Float32Array(COUNT * 3);
  const expPositions = new Float32Array(COUNT * 3);
  const alphaPositions = new Float32Array(COUNT * 3);
  const dwaraPositions = new Float32Array(COUNT * 3);
  const achievePositions = new Float32Array(COUNT * 3);
  const contactPositions = new Float32Array(COUNT * 3);

  // 1. HERO: Concentric sphere / polyhedral shell
  for (let i = 0; i < COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / COUNT);
    const theta = Math.sqrt(COUNT * Math.PI) * phi;
    const r = 3.8 + (i % 3 === 0 ? 0.8 : -0.4);
    heroPositions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
    heroPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    heroPositions[i * 3 + 2] = r * Math.cos(phi);
  }

  // 2. ABOUT: Architectural Foundation Columns (HBTU & CS Pillars)
  for (let i = 0; i < COUNT; i++) {
    const pillarIdx = i % 5;
    const pX = (pillarIdx - 2) * 2.2 + 2;
    const height = ((i / COUNT) * 10 - 5);
    const angle = (i * 0.4);
    const radius = 0.6;
    aboutPositions[i * 3] = pX + Math.cos(angle) * radius;
    aboutPositions[i * 3 + 1] = height;
    aboutPositions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  // 3. SKILLS: 3D Constellation Cluster Network
  const clusterCenters = [
    [-4, 2.5, 0],    // AI / ML
    [-1.5, -2, 1],   // Web / Frontend
    [2.5, 2, -1],    // Backend
    [4, -1.8, 0.5],  // Languages
    [0, 3.2, 1.2],   // Databases
    [-3.5, -3, -1]   // Blockchain
  ];
  for (let i = 0; i < COUNT; i++) {
    const center = clusterCenters[i % clusterCenters.length];
    const spread = 1.2 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    skillsPositions[i * 3] = center[0] + spread * Math.sin(phi) * Math.cos(theta);
    skillsPositions[i * 3 + 1] = center[1] + spread * Math.sin(phi) * Math.sin(theta);
    skillsPositions[i * 3 + 2] = center[2] + spread * Math.cos(phi);
  }

  // 4. EXPERIENCE: Sweeping 3D Spline Ribbon Timeline
  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2.5;
    const x = Math.sin(t) * 5;
    const y = ((i / COUNT) - 0.5) * 8;
    const z = Math.cos(t) * 4;
    const ringAngle = i * 0.5;
    expPositions[i * 3] = x + Math.cos(ringAngle) * 0.4;
    expPositions[i * 3 + 1] = y + Math.sin(ringAngle) * 0.4;
    expPositions[i * 3 + 2] = z;
  }

  // 5. ALPHAFORGE: 3D Financial Market Terrain & PPO Trajectory
  for (let i = 0; i < COUNT; i++) {
    if (i < 400) {
      // PPO Agent Trajectory spline
      const t = i / 400;
      alphaPositions[i * 3] = (t - 0.5) * 8;
      alphaPositions[i * 3 + 1] = Math.sin(t * 8) * 1.8 + t * 2 - 1;
      alphaPositions[i * 3 + 2] = Math.cos(t * 6) * 1.5;
    } else {
      // Market grid terrain
      const row = Math.floor((i - 400) / 28);
      const col = (i - 400) % 28;
      const x = (col - 14) * 0.45;
      const z = (row - 14) * 0.45;
      const y = Math.sin(x * 0.6) * Math.cos(z * 0.6) * 0.8 - 2;
      alphaPositions[i * 3] = x;
      alphaPositions[i * 3 + 1] = y;
      alphaPositions[i * 3 + 2] = z;
    }
  }

  // 6. DWARAPALA: 3D Biometric Facial Wireframe Mesh & Landmarks
  for (let i = 0; i < COUNT; i++) {
    // Ellipsoidal head structure with facial features
    const u = (i / COUNT) * Math.PI;
    const v = (i % 40) / 40 * Math.PI * 2;
    let rx = 2.4 * Math.sin(u) * Math.cos(v);
    let ry = 3.2 * Math.cos(u);
    let rz = 2.0 * Math.sin(u) * Math.sin(v);

    // Flatten back of head and accentuate face front
    if (rz < 0) rz *= 0.5;
    else {
      // Eye sockets and nose protrusion
      if (ry > 0 && ry < 1.2) rz += 0.4;
    }
    dwaraPositions[i * 3] = rx;
    dwaraPositions[i * 3 + 1] = ry;
    dwaraPositions[i * 3 + 2] = rz;
  }

  // 7. ACHIEVEMENTS: Constellation of Stars & Knight Octahedron
  for (let i = 0; i < COUNT; i++) {
    if (i < 500) {
      // Knight Octahedron core
      const t = (i / 500) * Math.PI * 2;
      const h = ((i % 100) / 100 - 0.5) * 4;
      const r = (2.2 - Math.abs(h) * 0.8);
      achievePositions[i * 3] = Math.cos(t) * r;
      achievePositions[i * 3 + 1] = h;
      achievePositions[i * 3 + 2] = Math.sin(t) * r;
    } else {
      // Golden Algoqueen orbital rings
      const t = (i / 700) * Math.PI * 2;
      const ringRadius = 5.2 + (i % 2 === 0 ? 0.8 : -0.8);
      achievePositions[i * 3] = Math.cos(t) * ringRadius;
      achievePositions[i * 3 + 1] = Math.sin(t * 3) * 0.5;
      achievePositions[i * 3 + 2] = Math.sin(t) * ringRadius;
    }
  }

  // 8. CONTACT: Ambient Deep Space Galaxy
  for (let i = 0; i < COUNT; i++) {
    const angle = i * 0.12;
    const dist = Math.sqrt(i) * 0.45;
    contactPositions[i * 3] = Math.cos(angle) * dist;
    contactPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    contactPositions[i * 3 + 2] = Math.sin(angle) * dist;
  }

  return {
    COUNT,
    heroPositions,
    aboutPositions,
    skillsPositions,
    expPositions,
    alphaPositions,
    dwaraPositions,
    achievePositions,
    contactPositions
  };
}
