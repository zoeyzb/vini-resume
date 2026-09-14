import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Clock,
  Color,
  Float32BufferAttribute,
  MathUtils,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { FORMATION_COUNT, buildFormations, formationWeights } from "./particleFormations";
import { useStage } from "../lib/stage";

const ZOOM_FAR = 22;
const ZOOM_NEAR = 15.1;
const PULSE_DEPTH = 1.3;
const FIELD_OF_VIEW = 45;
const SPREAD = 9.4;
const PARTICLE_COUNT = { full: 1420, low: 500 };
const DRIFT_SPEED = 0.31;
const ROTATION_SPEED = 0.013;
const MORPH_DAMPING = 1.8;
const POINTER_RADIUS = 5.7;
const POINTER_STRENGTH = 1.25;
const SLOW_FRAME_MS = 24;
const SLOW_FRAME_LIMIT = 90;

export function zoomForProgress(progress: number) {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
  const eased = clamped * clamped * (3 - 2 * clamped);
  return ZOOM_FAR + (ZOOM_NEAR - ZOOM_FAR) * eased;
}

export function actZoom(pageProgress: number, burst: number) {
  const base = zoomForProgress(pageProgress);
  const peak = Math.min(1, Math.max(0, Number.isFinite(burst) ? burst : 0));
  return base - PULSE_DEPTH * peak;
}

const vertexShader = /* glsl */ `
  attribute vec3 aStreams;
  attribute vec3 aRing;
  attribute vec3 aColumn;
  attribute vec3 aLattice;
  attribute vec3 aSpiral;
  attribute vec3 aWave;
  attribute vec4 aRandom;
  attribute float aSlot;

  uniform float uTime;
  uniform vec4 uWeightsA;
  uniform vec3 uWeightsB;
  uniform float uBaseSize;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform float uPointerRadius;
  uniform float uPointerStrength;
  uniform float uBurst;
  uniform float uVelocity;

  varying vec4 vRandom;
  varying float vFocus;
  varying float vSlot;

  void main() {
    vRandom = aRandom;
    vSlot = aSlot;

    vec3 pos =
      position * uWeightsA.x +
      aStreams * uWeightsA.y +
      aRing * uWeightsA.z +
      aColumn * uWeightsA.w +
      aLattice * uWeightsB.x +
      aSpiral * uWeightsB.y +
      aWave * uWeightsB.z;

    pos += normalize(pos + 0.0001) * uBurst * 0.78;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    worldPosition.x += sin(t * aRandom.z + 6.28 * aRandom.w) * mix(0.18, 1.2, aRandom.x);
    worldPosition.y += sin(t * aRandom.y + 6.28 * aRandom.x) * mix(0.18, 1.2, aRandom.w);
    worldPosition.z += sin(t * aRandom.w + 6.28 * aRandom.y) * mix(0.18, 1.2, aRandom.z);

    vec2 toPointer = worldPosition.xy - uPointer;
    float push = smoothstep(uPointerRadius, 0.0, length(toPointer)) * uPointerStrength;
    worldPosition.xy += normalize(toPointer + vec2(0.0001)) * push;

    vec4 viewPosition = viewMatrix * worldPosition;
    float depth = length(viewPosition.xyz);
    vFocus = smoothstep(74.0, 9.0, depth);

    float randomScale = mix(0.68, 1.42, aRandom.x);
    float nearBoost = mix(0.72, 1.52, vFocus);
    float size = (uBaseSize * randomScale) / max(1.0, depth);
    gl_PointSize = clamp(size * uPixelRatio * nearBoost * (1.0 + uVelocity * 0.12), 1.2, 22.0);

    gl_Position = projectionMatrix * viewPosition;
  }
`;

const haloFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uBurst;
  uniform vec3 uWarm;
  uniform vec3 uCool;
  uniform vec3 uBridge;

  varying vec4 vRandom;
  varying float vFocus;
  varying float vSlot;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);
    if (d > 0.5) discard;

    vec3 color = vSlot < 0.5 ? uWarm : (vSlot < 1.5 ? uCool : uBridge);
    float halo = pow(smoothstep(0.5, 0.0, d), 3.0);
    float pulse = 0.82 + 0.28 * sin(uTime * (0.8 + vRandom.z * 0.4) + vRandom.y * 6.2831);
    float alpha = halo * uOpacity * (0.38 + 0.44 * vRandom.x) * mix(0.45, 1.0, vFocus);
    alpha *= pulse * (1.0 + uBurst * 0.45);

    gl_FragColor = vec4(color * (1.4 + vFocus * 0.6), alpha);
  }
`;

const coreFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uBurst;
  uniform vec3 uWarm;
  uniform vec3 uCool;
  uniform vec3 uBridge;

  varying vec4 vRandom;
  varying float vFocus;
  varying float vSlot;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);
    if (d > 0.5) discard;

    vec3 color = vSlot < 0.5 ? uWarm : (vSlot < 1.5 ? uCool : uBridge);
    float body = pow(smoothstep(0.42, 0.045, d), 2.2);
    float core = pow(smoothstep(0.13, 0.0, d), 3.0);
    float pulse = 0.92 + 0.18 * sin(uTime * (0.95 + vRandom.w * 0.28) + vRandom.x * 6.2831);
    vec3 whiteCore = mix(color * 1.55, vec3(1.0), 0.62 + 0.22 * vFocus);
    vec3 rgb = color * body * 1.25 + whiteCore * core * 3.6;
    rgb *= pulse * (1.0 + uBurst * 0.55);

    float alpha = (body * 0.86 + core) * uOpacity * (0.68 + 0.48 * vRandom.x);
    alpha *= mix(0.58, 1.0, vFocus);

    gl_FragColor = vec4(rgb, alpha);
  }
`;

function readThemeColor(name: string, fallback: string) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  try {
    return new Color(raw || fallback);
  } catch {
    return new Color(fallback);
  }
}

function complementOf(color: Color) {
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  return new Color().setHSL((hsl.h + 0.5) % 1, Math.min(1, hsl.s * 1.1), Math.min(0.84, hsl.l * 1.08));
}

function vivid(color: Color) {
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  return new Color().setHSL(hsl.h, Math.min(1, hsl.s * 1.55 + 0.18), Math.min(0.84, Math.max(0.62, hsl.l)));
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useStage();
  const stageRef = useRef(stage);
  stageRef.current = stage;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return;
    }

    const count = coarse ? PARTICLE_COUNT.low : PARTICLE_COUNT.full;
    let pixelRatio = Math.min(window.devicePixelRatio, coarse ? 1 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;filter:saturate(1.26) contrast(1.08)";

    const scene = new Scene();
    const camera = new PerspectiveCamera(FIELD_OF_VIEW, 1, 0.1, 400);
    camera.position.z = ZOOM_FAR;

    const { buffers, random, slots } = buildFormations(count, SPREAD);
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(buffers[0], 3));
    ["aStreams", "aRing", "aColumn", "aLattice", "aSpiral", "aWave"].forEach((name, index) => {
      geometry.setAttribute(name, new Float32BufferAttribute(buffers[index + 1], 3));
    });
    geometry.setAttribute("aRandom", new Float32BufferAttribute(random, 4));
    geometry.setAttribute("aSlot", new Float32BufferAttribute(slots, 1));

    const readPalette = () => ({
      warm: vivid(readThemeColor("--theme-primary", "#ff8f70")),
      cool: vivid(complementOf(readThemeColor("--theme-primary", "#ff8f70"))),
      bridge: vivid(readThemeColor("--theme-tertiary", "#9ff2d0")),
    });

    const palette = readPalette();
    const targetWarm = palette.warm.clone();
    const targetCool = palette.cool.clone();
    const targetBridge = palette.bridge.clone();

    const sharedUniforms = {
      uTime: { value: 0 },
      uWeightsA: { value: [1, 0, 0, 0] },
      uWeightsB: { value: [0, 0, 0] },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uPointer: { value: new Vector2(1e4, 1e4) },
      uPointerRadius: { value: POINTER_RADIUS },
      uPointerStrength: { value: prefersReduced ? 0 : POINTER_STRENGTH },
      uBurst: { value: 0 },
      uVelocity: { value: 0 },
      uWarm: { value: palette.warm },
      uCool: { value: palette.cool },
      uBridge: { value: palette.bridge },
    };

    const haloMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader: haloFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        ...sharedUniforms,
        uBaseSize: { value: 360 },
        uOpacity: { value: 0.52 },
      },
    });

    const coreMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader: coreFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        ...sharedUniforms,
        uBaseSize: { value: 145 },
        uOpacity: { value: 0.98 },
      },
    });

    const haloPoints = new Points(geometry, haloMaterial);
    const corePoints = new Points(geometry, coreMaterial);
    haloPoints.frustumCulled = false;
    corePoints.frustumCulled = false;
    scene.add(haloPoints, corePoints);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      haloMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      coreMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    resize();
    window.addEventListener("resize", resize);

    const onThemeChange = () => {
      const next = readPalette();
      targetWarm.copy(next.warm);
      targetCool.copy(next.cool);
      targetBridge.copy(next.bridge);
    };
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-portfolio-theme"],
    });

    const clock = new Clock();
    const targetWeights = Array.from<number>({ length: FORMATION_COUNT }).fill(0);
    const pointerWorld = new Vector2(1e4, 1e4);
    let frame = 0;
    let running = true;
    let slowFrames = 0;
    let shedDetail = false;

    const syncUniforms = (delta: number) => {
      const { pageProgress, sectionIndex, sectionProgress, burst, velocity, pointerX, pointerY } = stageRef.current;
      const materials = [haloMaterial, coreMaterial];

      materials.forEach((material) => {
        material.uniforms.uTime.value += delta * DRIFT_SPEED;
      });

      const zoom = actZoom(pageProgress.get(), burst.get());
      camera.position.z = MathUtils.damp(camera.position.z, zoom, 3.2, delta);

      const weights = formationWeights(sectionIndex.get(), sectionProgress.get());
      for (let i = 0; i < FORMATION_COUNT; i += 1) targetWeights[i] = weights[i];

      materials.forEach((material) => {
        const a = material.uniforms.uWeightsA.value as number[];
        const b = material.uniforms.uWeightsB.value as number[];
        for (let i = 0; i < 4; i += 1) a[i] = MathUtils.damp(a[i], targetWeights[i], MORPH_DAMPING, delta);
        for (let i = 0; i < 3; i += 1) b[i] = MathUtils.damp(b[i], targetWeights[i + 4], MORPH_DAMPING, delta);

        material.uniforms.uBurst.value = MathUtils.damp(material.uniforms.uBurst.value as number, burst.get(), 6, delta);
        material.uniforms.uVelocity.value = MathUtils.damp(material.uniforms.uVelocity.value as number, velocity.get() * 0.08, 4, delta);
      });

      const halfHeight = Math.tan(MathUtils.degToRad(FIELD_OF_VIEW) / 2) * Math.abs(camera.position.z);
      pointerWorld.set(pointerX.get() * halfHeight * camera.aspect, pointerY.get() * halfHeight);
      materials.forEach((material) => {
        const live = material.uniforms.uPointer.value as Vector2;
        live.x = MathUtils.damp(live.x, pointerWorld.x, 8, delta);
        live.y = MathUtils.damp(live.y, pointerWorld.y, 8, delta);

        (material.uniforms.uWarm.value as Color).lerp(targetWarm, Math.min(1, delta * 4));
        (material.uniforms.uCool.value as Color).lerp(targetCool, Math.min(1, delta * 4));
        (material.uniforms.uBridge.value as Color).lerp(targetBridge, Math.min(1, delta * 4));
      });
    };

    const renderFrame = () => {
      const rawDelta = clock.getDelta();
      const delta = Math.min(rawDelta, 1 / 30);
      syncUniforms(delta);

      const t = haloMaterial.uniforms.uTime.value as number;
      const yRot = delta * ROTATION_SPEED;
      haloPoints.rotation.y += yRot;
      corePoints.rotation.y += yRot;
      const xRot = Math.sin(t * 0.18) * 0.12;
      haloPoints.rotation.x = xRot;
      corePoints.rotation.x = xRot;
      const zDrift = Math.sin(t * 0.11) * 0.22;
      haloPoints.position.z = zDrift;
      corePoints.position.z = zDrift;

      renderer.render(scene, camera);

      if (!shedDetail && rawDelta * 1000 > SLOW_FRAME_MS) {
        slowFrames += 1;
        if (slowFrames > SLOW_FRAME_LIMIT) {
          shedDetail = true;
          pixelRatio = Math.min(pixelRatio, 1);
          renderer.setPixelRatio(pixelRatio);
          haloMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
          coreMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
          geometry.setDrawRange(0, Math.floor(count / 2));
          resize();
        }
      } else if (slowFrames > 0) {
        slowFrames -= 1;
      }
    };

    const tick = () => {
      if (!running) return;
      frame = window.requestAnimationFrame(tick);
      renderFrame();
    };

    renderFrame();
    if (!prefersReduced) frame = window.requestAnimationFrame(tick);

    const onVisibility = () => {
      if (prefersReduced) return;
      const visible = document.visibilityState === "visible";
      if (visible && !running) {
        running = true;
        clock.getDelta();
        frame = window.requestAnimationFrame(tick);
      } else if (!visible && running) {
        running = false;
        window.cancelAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      geometry.dispose();
      haloMaterial.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
