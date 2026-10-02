/**
 * CINEMATIC ARRIVAL SOUND DIRECTOR
 * 
 * Direct replacement of section-appearance audio.
 * Inspired by the reference: alexis_gaming_cam-the-suspenseful-braam-334309.mp3
 * (Used as the acoustic reference for weight, depth, darkness, and impact).
 * 
 * Architecture:
 * - Event-driven: onSceneArrival(sceneId) tied to master GSAP animation timeline.
 * - Pre-impact tension: 0.5s - 1.0s sub-bass rise and vacuum intake before arrival.
 * - Arrival impact: 4-layer cinematic braam (Sub Body, Mid Body, Air/Texture, Resonance).
 * - Shared sonic family with 8 distinct, subtle scene variations:
 *   Hero, About, Skills, Experience, AlphaForge, Dwarapala, Achievements, Contact.
 * - Micro-delay (~25ms) for physical tactile weight.
 * - Fast-scrolling cancellation: only the final resting scene fires arrival.
 * - Reverse-scrolling protection: no spam when scrubbing backwards.
 * - Guaranteed silence following the resonance.
 */

export interface SceneAudioConfig {
  name: string;
  anchor: number;             // Timeline progress point where scene locks into place
  baseFrequency: number;      // Root pitch (Hz)
  subIntensity: number;       // Deep sub-bass weight (0.0 -> 1.0)
  impactIntensity: number;    // Mid-body braam punch (0.0 -> 1.0)
  brightness: number;         // Filter cutoff (Hz)
  resonanceDuration: number;  // Spatial decay length (seconds)
  stereoWidth: number;        // Spatial dispersion (0.0 -> 1.0)
  character: string;          // Acoustic description
}

export const SCENE_CONFIGS: Record<string, SceneAudioConfig> = {
  hero: {
    name: 'Hero',
    anchor: 0.04,
    baseFrequency: 55.0, // A1
    subIntensity: 0.92,
    impactIntensity: 0.85,
    brightness: 220,
    resonanceDuration: 1.1,
    stereoWidth: 0.8,
    character: 'Deep + mysterious cosmic mass'
  },
  about: {
    name: 'About',
    anchor: 0.22,
    baseFrequency: 65.41, // C2
    subIntensity: 0.82,
    impactIntensity: 0.78,
    brightness: 260,
    resonanceDuration: 0.9,
    stereoWidth: 0.65,
    character: 'Warmer + softer acoustic presence'
  },
  skills: {
    name: 'Skills',
    anchor: 0.38,
    baseFrequency: 82.41, // E2
    subIntensity: 0.85,
    impactIntensity: 0.88,
    brightness: 340,
    resonanceDuration: 0.75,
    stereoWidth: 0.9,
    character: 'Sharper + crystalline architectural focus'
  },
  experience: {
    name: 'Experience',
    anchor: 0.54,
    baseFrequency: 73.42, // D2
    subIntensity: 0.88,
    impactIntensity: 0.84,
    brightness: 290,
    resonanceDuration: 0.85,
    stereoWidth: 0.75,
    character: 'Deep + mechanical industrial momentum'
  },
  alphaforge: {
    name: 'AlphaForge',
    anchor: 0.67,
    baseFrequency: 87.31, // F2
    subIntensity: 0.90,
    impactIntensity: 0.86,
    brightness: 310,
    resonanceDuration: 0.85,
    stereoWidth: 0.85,
    character: 'Dark + technological quantitative tension'
  },
  dwarapala: {
    name: 'Dwarapala',
    anchor: 0.76,
    baseFrequency: 61.74, // B1
    subIntensity: 0.94,
    impactIntensity: 0.82,
    brightness: 240,
    resonanceDuration: 0.95,
    stereoWidth: 0.8,
    character: 'Organic + mysterious biometric depth'
  },
  achievements: {
    name: 'Achievements',
    anchor: 0.86,
    baseFrequency: 110.0, // A2
    subIntensity: 0.86,
    impactIntensity: 0.90,
    brightness: 380,
    resonanceDuration: 1.2,
    stereoWidth: 1.0,
    character: 'Wider + more triumphant spatial elevation'
  },
  contact: {
    name: 'Contact',
    anchor: 0.96,
    baseFrequency: 65.41, // C2
    subIntensity: 0.78,
    impactIntensity: 0.70,
    brightness: 200,
    resonanceDuration: 1.0,
    stereoWidth: 0.6,
    character: 'Very soft + warm emotional arrival'
  }
};

export class ArrivalSoundDirector {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  // Master Dynamics Bus (Ensures pristine studio ceiling & anti-clipping)
  private masterCompressor: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;

  // Pre-Impact Tension Bus (Atmospheric intake & sub rise)
  private preTensionGain: GainNode | null = null;
  private preTensionFilter: BiquadFilterNode | null = null;
  private preTensionOsc: OscillatorNode | null = null;
  private preTensionNoise: AudioBufferSourceNode | null = null;

  // Arrival State Tracking
  private currentSceneId: string = 'hero';
  private lastArrivedSceneId: string | null = null;
  private pendingArrivalTimer: number | null = null;
  private lastArrivalTimestamp: number = 0;

  constructor() {
    // Lazy initialization on first user gesture
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Studio Dynamics Compressor
      this.masterCompressor = this.ctx.createDynamicsCompressor();
      this.masterCompressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
      this.masterCompressor.knee.setValueAtTime(10, this.ctx.currentTime);
      this.masterCompressor.ratio.setValueAtTime(4.5, this.ctx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterCompressor.connect(this.ctx.destination);

      // Master Output Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.92, this.ctx.currentTime);
      this.masterGain.connect(this.masterCompressor);

      // Build Pre-Impact Tension Track
      this.buildPreTensionTrack();

      this.isInitialized = true;
    } catch {
      // AudioContext fallback
    }
  }

  public ensureRunning() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Pre-Impact Tension Track:
   * Smoothly ramps up sub-bass pressure and atmospheric vacuum intake
   * during the 0.5s - 1.0s before arrival.
   */
  private buildPreTensionTrack() {
    if (!this.ctx || !this.masterGain) return;

    // Sub-bass tension oscillator (pure sine, 35Hz -> 80Hz)
    this.preTensionOsc = this.ctx.createOscillator();
    this.preTensionOsc.type = 'sine';
    this.preTensionOsc.frequency.setValueAtTime(36, this.ctx.currentTime);

    // Atmospheric noise intake buffer
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.08;
    }

    this.preTensionNoise = this.ctx.createBufferSource();
    this.preTensionNoise.buffer = buffer;
    this.preTensionNoise.loop = true;

    this.preTensionFilter = this.ctx.createBiquadFilter();
    this.preTensionFilter.type = 'lowpass';
    this.preTensionFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.preTensionGain = this.ctx.createGain();
    this.preTensionGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    this.preTensionOsc.connect(this.preTensionGain);
    this.preTensionNoise.connect(this.preTensionFilter);
    this.preTensionFilter.connect(this.preTensionGain);
    this.preTensionGain.connect(this.masterGain);

    this.preTensionOsc.start();
    this.preTensionNoise.start();
  }

  /**
   * Updates pre-impact tension based on continuous scroll approach:
   * tension: 0.0 (far) -> 1.0 (just before arrival peak)
   */
  public updateTension(tension: number, velocity: number = 0) {
    if (this.isMuted || !this.ctx || !this.preTensionGain || !this.preTensionFilter || !this.preTensionOsc) return;

    const now = this.ctx.currentTime;
    const isMoving = Math.abs(velocity) > 0.003;
    const clampedTension = Math.max(0, Math.min(1, tension));

    if (!isMoving || clampedTension < 0.08) {
      // Fade quickly to silence
      this.preTensionGain.gain.setTargetAtTime(0.0, now, 0.09);
      return;
    }

    // Pre-tension rises smoothly 0.5s - 1.0s before arrival
    const targetGain = clampedTension * 0.038;
    const targetCutoff = 140 + clampedTension * 280;
    const targetSubFreq = 36 + clampedTension * 40;

    this.preTensionGain.gain.setTargetAtTime(targetGain, now, 0.08);
    this.preTensionFilter.frequency.setTargetAtTime(targetCutoff, now, 0.09);
    this.preTensionOsc.frequency.setTargetAtTime(targetSubFreq, now, 0.07);
  }

  /**
   * CANCEL PENDING ARRIVAL SOUNDS
   * Called on fast scroll so skipping across multiple sections only triggers
   * the final section that actually settles.
   */
  public cancelPending() {
    if (this.pendingArrivalTimer !== null) {
      window.clearTimeout(this.pendingArrivalTimer);
      this.pendingArrivalTimer = null;
    }
  }

  /**
   * MAIN EVENT: onSceneArrival(sceneId)
   * Triggered ONLY when the new scene has visually reached its intended main-stage position.
   * Features a ~25ms micro-delay for physical tactile weight.
   */
  public onSceneArrival(sceneId: string, customIntensity: number = 1.0) {
    if (this.isMuted) return;
    this.ensureRunning();

    // Guard against duplicate triggers of the currently active scene
    if (this.lastArrivedSceneId === sceneId) {
      return;
    }

    // Guard against rapid re-triggering (minimum 400ms between arrival braams)
    const nowMs = Date.now();
    if (nowMs - this.lastArrivalTimestamp < 400) {
      return;
    }

    this.cancelPending();

    // Micro-delay (~25ms) so the sound hits with physical tactile impact
    this.pendingArrivalTimer = window.setTimeout(() => {
      this.executeArrivalBraam(sceneId, customIntensity);
      this.lastArrivedSceneId = sceneId;
      this.currentSceneId = sceneId;
      this.lastArrivalTimestamp = Date.now();
      this.pendingArrivalTimer = null;
    }, 25);
  }

  /**
   * Executes the 4-layer cinematic arrival braam:
   * Layer 1: Sub Body (deep tectonic pressure)
   * Layer 2: Mid Body (harmonic braam punch)
   * Layer 3: Air / Texture (subtle spatial clarity)
   * Layer 4: Scene-Specific Resonance (spatial tail -> SILENCE)
   */
  private executeArrivalBraam(sceneId: string, intensity: number) {
    if (!this.ctx || !this.masterGain) return;

    const config = SCENE_CONFIGS[sceneId] || SCENE_CONFIGS.hero;
    const now = this.ctx.currentTime;
    const baseFreq = config.baseFrequency;
    const subAmp = config.subIntensity * intensity * 0.46;
    const midAmp = config.impactIntensity * intensity * 0.32;

    // Immediately silence any lingering pre-tension
    if (this.preTensionGain) {
      this.preTensionGain.gain.setValueAtTime(0.0001, now);
    }

    // ==========================================
    // LAYER 1: SUB BODY (Very deep controlled cinematic pressure)
    // Pure sine sweeping from (baseFreq * 1.25) down to (baseFreq * 0.42)
    // ==========================================
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(baseFreq * 1.25, now);
    subOsc.frequency.exponentialRampToValueAtTime(Math.max(22.0, baseFreq * 0.42), now + 0.65);

    // Fast 3ms attack -> peak -> exponential decay over 350ms
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(subAmp, now + 0.004);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.75);

    // ==========================================
    // LAYER 2: MID BODY (The actual harmonic body of the braam impact)
    // Dual tuned oscillator (Root + Fifth) with soft warm filter
    // ==========================================
    const midRoot = this.ctx.createOscillator();
    const midFifth = this.ctx.createOscillator();
    const midFilter = this.ctx.createBiquadFilter();
    const midGain = this.ctx.createGain();

    midRoot.type = 'triangle';
    midFifth.type = 'sine';

    midRoot.frequency.setValueAtTime(baseFreq * 2.0, now);
    midFifth.frequency.setValueAtTime(baseFreq * 3.0, now);

    midFilter.type = 'lowpass';
    midFilter.frequency.setValueAtTime(config.brightness, now);
    midFilter.Q.setValueAtTime(1.8, now);

    midGain.gain.setValueAtTime(0.001, now);
    midGain.gain.linearRampToValueAtTime(midAmp, now + 0.006);
    midGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    midRoot.connect(midFilter);
    midFifth.connect(midFilter);
    midFilter.connect(midGain);
    midGain.connect(this.masterGain);

    midRoot.start(now);
    midFifth.start(now);
    midRoot.stop(now + 0.42);
    midFifth.stop(now + 0.42);

    // ==========================================
    // LAYER 3: AIR / TEXTURE (Subtle spatial clarity without tingling)
    // Bandpassed soft noise burst (300Hz - 800Hz)
    // ==========================================
    const airBufferSize = Math.floor(this.ctx.sampleRate * 0.3);
    const airBuffer = this.ctx.createBuffer(1, airBufferSize, this.ctx.sampleRate);
    const airData = airBuffer.getChannelData(0);
    for (let i = 0; i < airBufferSize; i++) {
      airData[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const airSource = this.ctx.createBufferSource();
    airSource.buffer = airBuffer;

    const airFilter = this.ctx.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.setValueAtTime(config.brightness * 1.5, now);
    airFilter.Q.setValueAtTime(1.2, now);

    const airGain = this.ctx.createGain();
    airGain.gain.setValueAtTime(0.001, now);
    airGain.gain.linearRampToValueAtTime(0.04 * intensity, now + 0.005);
    airGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    airSource.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(this.masterGain);

    airSource.start(now);
    airSource.stop(now + 0.32);

    // ==========================================
    // LAYER 4: SCENE-SPECIFIC RESONANCE (Controlled spatial decay -> SILENCE)
    // ==========================================
    const resOsc = this.ctx.createOscillator();
    const resFilter = this.ctx.createBiquadFilter();
    const resGain = this.ctx.createGain();

    resOsc.type = 'sine';
    resOsc.frequency.setValueAtTime(baseFreq * 1.5, now);

    resFilter.type = 'lowpass';
    resFilter.frequency.setValueAtTime(config.brightness * 0.8, now);

    const decayTime = config.resonanceDuration;
    resGain.gain.setValueAtTime(0.001, now);
    resGain.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.01);
    resGain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

    resOsc.connect(resFilter);
    resFilter.connect(resGain);
    resGain.connect(this.masterGain);

    resOsc.start(now);
    resOsc.stop(now + decayTime + 0.05);
  }

  /**
   * Reset arrived state when moving far away from the scene anchor
   */
  public checkSceneExit(currentProgress: number) {
    if (!this.lastArrivedSceneId) return;
    const config = SCENE_CONFIGS[this.lastArrivedSceneId];
    if (config) {
      const dist = Math.abs(currentProgress - config.anchor);
      if (dist > 0.09) {
        // We have genuinely departed this scene; allow re-arrival later
        this.lastArrivedSceneId = null;
      }
    }
  }

  /**
   * Timeline audio update called by master GSAP scroll timeline
   */
  public updateState(state: { progress: number; scrollVelocity: number; cameraX: number; cameraY: number; cameraZ: number }) {
    if (this.isMuted) return;
    this.ensureRunning();

    const p = Math.max(0, Math.min(1, state.progress));
    const vel = state.scrollVelocity;

    // Check departure from current anchor
    this.checkSceneExit(p);

    // Find nearest approaching scene
    let nearestSceneId = 'hero';
    let minDistance = 999;

    Object.entries(SCENE_CONFIGS).forEach(([id, cfg]) => {
      const d = Math.abs(p - cfg.anchor);
      if (d < minDistance) {
        minDistance = d;
        nearestSceneId = id;
      }
    });

    // 1. Scene Arrival Check:
    // When distance to intended anchor is < 0.035 and moving toward it, fire arrival
    if (minDistance < 0.035 && this.lastArrivedSceneId !== nearestSceneId) {
      this.onSceneArrival(nearestSceneId, 1.0);
    } else {
      // 2. Pre-impact tension curve:
      // Tension builds as distance shrinks from 0.09 down to 0.035
      const approachDistance = Math.max(0, 0.09 - minDistance);
      const tension = Math.min(1.0, approachDistance / 0.055);
      this.updateTension(tension, vel);
    }
  }

  public updateTimelineAudio(progress: number, velocity: number) {
    this.updateState({
      progress,
      scrollVelocity: velocity,
      cameraX: 0,
      cameraY: 0,
      cameraZ: 20
    });
  }

  /**
   * External trigger alias for manual navigation or modal events
   */
  public triggerArrival(sceneId: string, intensity: number = 1.0) {
    this.onSceneArrival(sceneId, intensity);
  }

  public triggerHeavySectionBassDrop(dropFreq?: number, rumbleFreq?: number, fullEffect?: boolean) {
    this.onSceneArrival(this.currentSceneId, 1.0);
  }

  public playInitiationSequence() {
    this.onSceneArrival('hero', 1.15);
  }

  public playClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.ensureRunning();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.03);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  public playHover() {
    // Intentionally silent
  }

  public playChime() {
    this.onSceneArrival('achievements', 0.9);
  }

  public playNote(noteIndex: number) {
    this.onSceneArrival('skills', 0.85);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.92, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundFx = new ArrivalSoundDirector();
