/**
 * Text-Safe Zone Specification for Cinematic 3D Compositions
 * Defines 3D exclusion zones, particle repulsion forces, and depth layering
 * so background geometry frames the typography without intersecting words.
 */

export interface SafeZoneConfig {
  centerX: number;      // Center X in 3D world space
  centerY: number;      // Center Y in 3D world space
  radiusX: number;      // Safe horizontal radius
  radiusY: number;      // Safe vertical radius
  particleAlpha: number;// Particle brightness/opacity inside or near zone
  repulsionForce: number;// Repulsion push strength away from text
  cameraOffsetX: number;// Framing camera offset
  cameraOffsetY: number;// Framing camera offset
}

export function getSafeZoneForProgress(p: number): SafeZoneConfig {
  // Phase 0: Hero [0.00 - 0.16] - Text on left/center-left, 3D Core framed on right
  if (p < 0.16) {
    return {
      centerX: -2.8,
      centerY: 0.2,
      radiusX: 4.8,
      radiusY: 4.0,
      particleAlpha: 0.35,
      repulsionForce: 3.2,
      cameraOffsetX: 0.8,
      cameraOffsetY: 0.0
    };
  }

  // Phase 1: About [0.16 - 0.32] - Editorial statement left, architectural pillars right
  if (p < 0.32) {
    return {
      centerX: -3.2,
      centerY: 0.0,
      radiusX: 5.2,
      radiusY: 4.2,
      particleAlpha: 0.25,
      repulsionForce: 4.0,
      cameraOffsetX: 1.2,
      cameraOffsetY: 0.2
    };
  }

  // Phase 2: Skills [0.32 - 0.48] - Category & competencies card center-right, constellation nodes framed around
  if (p < 0.48) {
    return {
      centerX: 0.0,
      centerY: -0.2,
      radiusX: 5.5,
      radiusY: 4.2,
      particleAlpha: 0.22,
      repulsionForce: 4.4,
      cameraOffsetX: 0.0,
      cameraOffsetY: 0.0
    };
  }

  // Phase 3: Experience [0.48 - 0.64] - Timeline narrative card center, ribbon curve swoops above & below
  if (p < 0.64) {
    return {
      centerX: 0.0,
      centerY: 0.0,
      radiusX: 5.8,
      radiusY: 4.4,
      particleAlpha: 0.25,
      repulsionForce: 4.2,
      cameraOffsetX: 0.0,
      cameraOffsetY: 0.0
    };
  }

  // Phase 4: Projects (AlphaForge & Dwarapala) [0.64 - 0.80]
  // Text on left, live 3D simulations & models framed on right
  if (p < 0.80) {
    return {
      centerX: -3.4,
      centerY: 0.2,
      radiusX: 5.0,
      radiusY: 4.2,
      particleAlpha: 0.20,
      repulsionForce: 3.8,
      cameraOffsetX: 1.0,
      cameraOffsetY: 0.0
    };
  }

  // Phase 5: Achievements [0.80 - 0.92] - LeetCode 1875 & Contest stats framed cleanly
  if (p < 0.92) {
    return {
      centerX: 0.0,
      centerY: 0.0,
      radiusX: 5.6,
      radiusY: 4.2,
      particleAlpha: 0.25,
      repulsionForce: 4.0,
      cameraOffsetX: 0.0,
      cameraOffsetY: 0.4
    };
  }

  // Phase 6: Contact [0.92 - 1.00] - Final transmission form center, galaxy nebula around edges
  return {
    centerX: 0.0,
    centerY: 0.0,
    radiusX: 6.2,
    radiusY: 4.8,
    particleAlpha: 0.20,
    repulsionForce: 4.5,
    cameraOffsetX: 0.0,
    cameraOffsetY: 0.0
  };
}
