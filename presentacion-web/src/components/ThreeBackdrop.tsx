import { memo, useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SlideTone = 'obsidian' | 'indigo' | 'plum' | 'teal';

interface ThreeBackdropProps {
  currentSlide: number;
  slideTone: SlideTone;
}

const TONE_THREE_COLORS: Record<
  SlideTone,
  { wire: string; inner: string; ring1: string; ring2: string; line: string }
> = {
  obsidian: {
    wire: '#8B5CF6',
    inner: '#C4B5FD',
    ring1: '#A78BFA',
    ring2: '#7C3AED',
    line: '#8B5CF6',
  },
  indigo: {
    wire: '#6366F1',
    inner: '#A5B4FC',
    ring1: '#818CF8',
    ring2: '#4F46E5',
    line: '#6366F1',
  },
  plum: {
    wire: '#A855F7',
    inner: '#E9D5FF',
    ring1: '#C084FC',
    ring2: '#9333EA',
    line: '#A855F7',
  },
  teal: {
    wire: '#2DD4BF',
    inner: '#99F6E4',
    ring1: '#5EEAD4',
    ring2: '#0D9488',
    line: '#14B8A6',
  },
};

/** Genera una textura circular luminosa para los nodos WebGL */
function createGlowSpriteTexture(): THREE.CanvasTexture | null {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.28, 'rgba(237, 233, 254, 0.95)');
  gradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.45)');
  gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const ThreeBackdrop = memo(function ThreeBackdrop({
  currentSlide,
  slideTone,
}: ThreeBackdropProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const targetSlideRef = useRef(currentSlide);
  const toneRef = useRef<SlideTone>(slideTone);

  targetSlideRef.current = currentSlide;
  toneRef.current = slideTone;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 14.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    /* 1. Red de nodos geoespaciales (9.904 locales representados como constelación) */
    const nodeCount = 156;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const palette = [
      new THREE.Color('#7C3AED'),
      new THREE.Color('#A78BFA'),
      new THREE.Color('#5EEAD4'),
      new THREE.Color('#818CF8'),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const angle = i * 2.3999632;
      const radius = 3.1 + (i % 20) * 0.58;
      positions[i * 3] = Math.cos(angle) * radius * 1.18;
      positions[i * 3 + 1] = Math.sin(angle * 0.72) * 7.4 + ((i % 7) - 3) * 0.8;
      positions[i * 3 + 2] = Math.sin(angle) * 5.4 - 1.5;

      const c = palette[i % palette.length] ?? palette[0]!;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const spriteTex = createGlowSpriteTexture();
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.42,
      map: spriteTex ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    rootGroup.add(pointsMesh);

    /* 2. Filamentos relacionales entre nodos */
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const ix = positions[i * 3] ?? 0;
        const iy = positions[i * 3 + 1] ?? 0;
        const iz = positions[i * 3 + 2] ?? 0;
        const jx = positions[j * 3] ?? 0;
        const jy = positions[j * 3 + 1] ?? 0;
        const jz = positions[j * 3 + 2] ?? 0;
        if (Math.hypot(ix - jx, iy - jy, iz - jz) < 3.9) {
          linePositions.push(ix, iy, iz, jx, jy, jz);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#8B5CF6'),
      transparent: true,
      opacity: 0.22,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    rootGroup.add(linesMesh);

    /* 3. Núcleo geodésico dual + anillos orbitales + partículas en órbita */
    const coreGroup = new THREE.Group();
    coreGroup.position.set(5.3, -0.2, -2.2);
    rootGroup.add(coreGroup);

    const wireGeo = new THREE.IcosahedronGeometry(3.9, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8B5CF6'),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireSphere);

    const innerGeo = new THREE.OctahedronGeometry(2.1, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#C4B5FD'),
      wireframe: true,
      transparent: true,
      opacity: 0.26,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    const ringGeo1 = new THREE.TorusGeometry(5.1, 0.032, 12, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#A78BFA'),
      transparent: true,
      opacity: 0.34,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI * 0.36;
    coreGroup.add(orbitRing1);

    const ringGeo2 = new THREE.TorusGeometry(6.0, 0.024, 12, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7C3AED'),
      transparent: true,
      opacity: 0.24,
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI * 0.28;
    orbitRing2.rotation.y = Math.PI * 0.22;
    coreGroup.add(orbitRing2);

    /* Flujo de 46 partículas viajando sobre la órbita */
    const streamCount = 46;
    const streamPos = new Float32Array(streamCount * 3);
    const streamGeo = new THREE.BufferGeometry();
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
    const streamMat = new THREE.PointsMaterial({
      size: 0.36,
      map: spriteTex ?? undefined,
      color: new THREE.Color('#EDE9FE'),
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    orbitRing1.add(streamPoints);

    /* Anillo expansivo de entrada (shockwave) animado con LoopOnce */
    const shockGeo = new THREE.TorusGeometry(4.2, 0.045, 12, 100);
    const shockMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#5EEAD4'),
      transparent: true,
      opacity: prefersReducedMotion ? 0 : 0.9,
      blending: THREE.AdditiveBlending,
    });
    const shockRing = new THREE.Mesh(shockGeo, shockMat);
    shockRing.rotation.x = Math.PI * 0.34;
    coreGroup.add(shockRing);

    /* AnimationMixer + crossFadeTo: entrada cinematográfica (LoopOnce) -> órbita continua */
    const introScaleTrack = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, 0.95, 1.65],
      [0.14, 0.14, 0.14, 1.13, 1.13, 1.13, 0.98, 0.98, 0.98]
    );
    introScaleTrack.setInterpolation(THREE.InterpolateSmooth);
    const introRotTrack = new THREE.NumberKeyframeTrack('.rotation[y]', [0, 1.65], [-Math.PI * 1.15, 0]);
    introRotTrack.setInterpolation(THREE.InterpolateSmooth);
    const introClip = new THREE.AnimationClip('heroCoreIntro', 1.65, [introScaleTrack, introRotTrack]);

    const scaleTrack = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, 2.5, 5],
      [0.98, 0.98, 0.98, 1.07, 1.07, 1.07, 0.98, 0.98, 0.98]
    );
    scaleTrack.setInterpolation(THREE.InterpolateSmooth);
    const rotTrack = new THREE.NumberKeyframeTrack('.rotation[y]', [0, 14], [0, Math.PI * 2]);
    const coreClip = new THREE.AnimationClip('corePulseAndOrbit', 14, [scaleTrack, rotTrack]);

    const mixer = new THREE.AnimationMixer(coreGroup);
    const introAction = mixer.clipAction(introClip);
    introAction.setLoop(THREE.LoopOnce, 1);
    introAction.clampWhenFinished = true;

    const coreAction = mixer.clipAction(coreClip);
    coreAction.setLoop(THREE.LoopRepeat, Infinity);

    if (prefersReducedMotion) {
      coreAction.play();
    } else {
      introAction.play();
    }

    const onMixerFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === introAction) {
        coreAction.reset().play();
        introAction.crossFadeTo(coreAction, 0.7, false);
      }
    };
    mixer.addEventListener('finished', onMixerFinished);

    const shockScaleTrack = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, 1.55],
      [0.25, 0.25, 0.25, 2.65, 2.65, 2.65]
    );
    shockScaleTrack.setInterpolation(THREE.InterpolateSmooth);
    const shockOpacityTrack = new THREE.NumberKeyframeTrack('.material.opacity', [0, 0.35, 1.55], [0.0, 0.92, 0.0]);
    const shockClip = new THREE.AnimationClip('heroShockwave', 1.55, [shockScaleTrack, shockOpacityTrack]);
    const shockMixer = new THREE.AnimationMixer(shockRing);
    const shockAction = shockMixer.clipAction(shockClip);
    shockAction.setLoop(THREE.LoopOnce, 1);
    shockAction.clampWhenFinished = true;
    if (!prefersReducedMotion) {
      shockAction.play();
    }

    /* Timer independiente de FPS */
    const timer = new THREE.Timer();
    timer.connect(document);

    const targetWire = new THREE.Color();
    const targetInner = new THREE.Color();
    const targetRing1 = new THREE.Color();
    const targetRing2 = new THREE.Color();
    const targetLine = new THREE.Color();

    let pointerX = 0;
    let pointerY = 0;
    let dampedRotY = prefersReducedMotion ? 0 : -0.82;
    let dampedRotX = prefersReducedMotion ? 0 : 0.24;
    let dampedCamZ = prefersReducedMotion ? 14.5 : 23.0;
    let dampedCoreX = prefersReducedMotion ? 3.2 : 6.4;
    let dampedCoreY = prefersReducedMotion ? 0.85 : -1.2;
    let dampedRing2Z = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 0.72;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 0.45;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    const animate = () => {
      timer.update();
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();

      if (!prefersReducedMotion) {
        mixer.update(delta);
        shockMixer.update(delta);
        innerCore.rotation.x = elapsed * 0.35;
        innerCore.rotation.z = -elapsed * 0.25;

        const attr = streamGeo.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < streamCount; i++) {
          const a = (i / streamCount) * Math.PI * 2 + elapsed * 0.65;
          attr.setXYZ(i, Math.cos(a) * 5.1, Math.sin(a) * 5.1, Math.sin(a * 3 + elapsed) * 0.14);
        }
        attr.needsUpdate = true;
      }

      const slideIndex = targetSlideRef.current;
      const targetRotY = pointerX + slideIndex * 0.2 + (prefersReducedMotion ? 0 : elapsed * 0.052);
      const targetRotX = pointerY * 0.75 + (prefersReducedMotion ? 0 : Math.sin(elapsed * 0.48) * 0.08);
      const targetCamZ = 14.5 - Math.sin((slideIndex / 17) * Math.PI) * 1.9;
      const isCenteredHero = slideIndex === 0 || slideIndex === 6 || slideIndex === 17;
      const targetCoreX = isCenteredHero ? 3.2 : 5.2 - Math.sin(slideIndex * 0.45) * 2.1;
      const targetCoreY = Math.cos(slideIndex * 0.55) * 0.85;
      const targetRing2Z = slideIndex * 0.22 + (prefersReducedMotion ? 0 : elapsed * 0.18);

      dampedRotY = THREE.MathUtils.damp(dampedRotY, targetRotY, 4.2, delta);
      dampedRotX = THREE.MathUtils.damp(dampedRotX, targetRotX, 4.2, delta);
      dampedCamZ = THREE.MathUtils.damp(dampedCamZ, targetCamZ, 3.2, delta);
      dampedCoreX = THREE.MathUtils.damp(dampedCoreX, targetCoreX, 3.0, delta);
      dampedCoreY = THREE.MathUtils.damp(dampedCoreY, targetCoreY, 3.0, delta);
      dampedRing2Z = THREE.MathUtils.damp(dampedRing2Z, targetRing2Z, 3.8, delta);

      rootGroup.rotation.y = dampedRotY;
      rootGroup.rotation.x = dampedRotX;
      camera.position.z = dampedCamZ;
      coreGroup.position.x = dampedCoreX;
      coreGroup.position.y = dampedCoreY;
      orbitRing2.rotation.z = dampedRing2Z;

      const toneCfg = TONE_THREE_COLORS[toneRef.current];
      const colorStep = 1 - Math.exp(-3.2 * delta);
      wireMat.color.lerp(targetWire.set(toneCfg.wire), colorStep);
      innerMat.color.lerp(targetInner.set(toneCfg.inner), colorStep);
      ringMat1.color.lerp(targetRing1.set(toneCfg.ring1), colorStep);
      ringMat2.color.lerp(targetRing2.set(toneCfg.ring2), colorStep);
      linesMat.color.lerp(targetLine.set(toneCfg.line), colorStep);

      const heroBoost = isCenteredHero ? 1.15 : 0.82;
      pointsMat.opacity = THREE.MathUtils.damp(pointsMat.opacity, 0.72 * heroBoost, 4.5, delta);
      linesMat.opacity = THREE.MathUtils.damp(linesMat.opacity, 0.22 * heroBoost, 4.5, delta);
      wireMat.opacity = THREE.MathUtils.damp(wireMat.opacity, 0.22 * heroBoost, 4.5, delta);
      innerMat.opacity = THREE.MathUtils.damp(innerMat.opacity, 0.26 * heroBoost, 4.5, delta);
      ringMat1.opacity = THREE.MathUtils.damp(ringMat1.opacity, 0.34 * heroBoost, 4.5, delta);
      ringMat2.opacity = THREE.MathUtils.damp(ringMat2.opacity, 0.24 * heroBoost, 4.5, delta);

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      timer.dispose();
      mixer.removeEventListener('finished', onMixerFinished);
      mixer.stopAllAction();
      mixer.uncacheRoot(coreGroup);
      shockMixer.stopAllAction();
      shockMixer.uncacheRoot(shockRing);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      spriteTex?.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      shockGeo.dispose();
      shockMat.dispose();
      streamGeo.dispose();
      streamMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="three-backdrop" aria-hidden="true">
      <div className={`backdrop-tone-layer tone-obsidian ${slideTone === 'obsidian' ? 'is-active' : ''}`} />
      <div className={`backdrop-tone-layer tone-indigo ${slideTone === 'indigo' ? 'is-active' : ''}`} />
      <div className={`backdrop-tone-layer tone-plum ${slideTone === 'plum' ? 'is-active' : ''}`} />
      <div className={`backdrop-tone-layer tone-teal ${slideTone === 'teal' ? 'is-active' : ''}`} />
      <div ref={mountRef} className="three-canvas-mount" />
    </div>
  );
});

export default ThreeBackdrop;
