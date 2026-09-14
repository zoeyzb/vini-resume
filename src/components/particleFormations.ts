/**
 * The shapes the particle field morphs between as the page scrolls.
 *
 * Every formation is generated once on the CPU into its own buffer. The blend
 * between them happens in the vertex shader, so moving from one section to the
 * next costs a handful of uniform writes rather than rewriting thousands of
 * positions every frame.
 *
 * Positions are baked in world units — each formation controls its own depth,
 * which a single-cloud version could not do because it applied one global
 * z-stretch to everything.
 */

/** Section ids in the order they appear in App.tsx. */
export const SECTION_IDS = [
  "top",
  "projects",
  "range",
  "marketing",
  "workflow",
  "experience",
  "skills",
  "leadership",
  "about",
  "contact",
] as const;

export const FORMATION_COUNT = 7;

/**
 * Which shape each section settles into.
 *
 *   0 shell    a sphere of stars, the resting state
 *   1 streams  four horizontal lanes, work moving along tracks
 *   2 ring     concentric orbits
 *   3 column   a vertical spine, a timeline
 *   4 lattice  a structured grid
 *   5 spiral   a galaxy arm, work radiating outward
 *   6 wave     a rippled sheet, reach and propagation
 *
 * Sections reuse shapes deliberately — ten distinct formations would read as
 * noise rather than as a place. The one hard rule is that no two *adjacent*
 * sections may share a shape: a crossing that morphs a shape into itself runs
 * the whole crossfade and shows the viewer nothing. `assertNoSelfMorph` below
 * enforces it and the test suite calls it.
 */
export const SECTION_FORMATION = [
  0, // top       — a calm sphere, nothing asked of the reader yet
  1, // projects  — work moving along tracks
  5, // range     — side activities radiating outward
  6, // marketing — reach propagating across a surface
  4, // workflow  — a structured system
  3, // experience— a vertical spine, the timeline
  4, // skills    — structure again, but arrived at from the spine
  2, // leadership— orbits, people around a centre
  0, // about     — back to the resting sphere
  6, // contact   — reaching outward
];

/**
 * Throws if any two neighbouring sections rest in the same shape.
 *
 * This is the bug the previous map had: marketing and projects both sat in
 * `streams`, and leadership and contact both sat in `ring`, so several section
 * crossings were visually dead.
 */
export function assertNoSelfMorph(map: number[] = SECTION_FORMATION) {
  for (let index = 1; index < map.length; index += 1) {
    if (map[index] === map[index - 1]) {
      throw new Error(
        `Sections ${SECTION_IDS[index - 1]} and ${SECTION_IDS[index]} share formation ${map[index]}; the crossing between them would show nothing.`,
      );
    }
  }
  return true;
}

/** Deterministic PRNG so the field is identical on every visit. */
function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export type Formations = {
  /** One Float32Array of xyz per formation, indexed as above. */
  buffers: Float32Array[];
  /** Four stable randoms per particle, for per-particle wander and sizing. */
  random: Float32Array;
  /**
   * Which of the three palette colours each particle takes, as 0, 1 or 2.
   *
   * This is a stable attribute rather than a baked RGB triple so that changing
   * theme can lerp three uniforms instead of re-randomising and re-uploading
   * the whole colour buffer — which is what used to make the field visibly
   * shuffle on every theme change.
   */
  slots: Float32Array;
};

export function buildFormations(count: number, spread: number): Formations {
  const random = makeRandom(0x9e3779b9);
  const buffers = Array.from({ length: FORMATION_COUNT }, () => new Float32Array(count * 3));
  const randoms = new Float32Array(count * 4);
  const slots = new Float32Array(count);

  const [shell, streams, ring, column, lattice, spiral, wave] = buffers;
  const laneY = [1.5, 0.5, -0.5, -1.5];

  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;
    randoms.set([random(), random(), random(), random()], index * 4);

    // Warm and cool carry the field; the bridge tone punctuates it.
    const pick = random();
    slots[index] = pick < 0.34 ? 0 : pick < 0.84 ? 1 : 2;

    // --- 0: shell. An even sphere, stretched deep so there is room to fly. ---
    let x = 0;
    let y = 0;
    let z = 0;
    let lengthSquared = 0;
    do {
      x = random() * 2 - 1;
      y = random() * 2 - 1;
      z = random() * 2 - 1;
      lengthSquared = x * x + y * y + z * z;
    } while (lengthSquared > 1 || lengthSquared === 0);
    const radius = Math.cbrt(random());
    shell[i3] = x * radius * spread;
    shell[i3 + 1] = y * radius * spread;
    shell[i3 + 2] = z * radius * spread * 10;

    // --- 1: streams. Four lanes running across the frame. ---
    const lane = index % 4;
    const along = random();
    streams[i3] = (-1 + along * 2) * spread * 1.7;
    streams[i3 + 1] =
      laneY[lane] * spread * 0.22 +
      Math.sin(along * Math.PI * 2.5 + lane) * spread * 0.05 +
      (random() - 0.5) * spread * 0.06;
    streams[i3 + 2] = (random() * 2 - 1) * spread * 6;

    // --- 2: ring. Concentric orbits at a few depths. ---
    const angle = random() * Math.PI * 2;
    const orbit = 0.45 + Math.floor(random() * 3) * 0.22 + (random() - 0.5) * 0.05;
    ring[i3] = Math.cos(angle) * orbit * spread * 1.4;
    ring[i3 + 1] = Math.sin(angle) * orbit * spread * 1.4;
    ring[i3 + 2] = (random() * 2 - 1) * spread * 4;

    // --- 3: column. A vertical spine, most hugging the axis. ---
    const down = index / count;
    const branches = random() < 0.16;
    const reach = branches ? 0.35 + random() * 0.55 : random() * 0.09;
    column[i3] = (index % 2 === 0 ? 1 : -1) * reach * spread;
    column[i3 + 1] = (-1 + down * 2) * spread * 1.25;
    column[i3 + 2] = (random() * 2 - 1) * spread * 5;

    // --- 4: lattice. A jittered grid. ---
    const gx = (index % 12) - 5.5;
    const gy = (Math.floor(index / 12) % 9) - 4;
    const gz = (Math.floor(index / 108) % 7) - 3;
    lattice[i3] = (gx / 5.5) * spread + (random() - 0.5) * spread * 0.08;
    lattice[i3 + 1] = (gy / 4) * spread * 0.72 + (random() - 0.5) * spread * 0.08;
    lattice[i3 + 2] = (gz / 3) * spread * 4;

    // --- 5: spiral. Two galaxy arms, denser toward the core. ---
    const arm = index % 2;
    // Square-rooting keeps the centre bright instead of evenly dusting the disc.
    const along5 = Math.sqrt(random());
    const sweep = along5 * Math.PI * 2.6 + arm * Math.PI;
    const armRadius = along5 * spread * 1.35;
    const scatter = (random() - 0.5) * spread * 0.16 * (0.35 + along5);
    spiral[i3] = Math.cos(sweep) * armRadius + scatter;
    spiral[i3 + 1] = Math.sin(sweep) * armRadius * 0.62 + scatter * 0.6;
    spiral[i3 + 2] = (random() * 2 - 1) * spread * 3.2 - along5 * spread * 1.5;

    // --- 6: wave. A rippled sheet seen at a shallow angle. ---
    const u = (index % 40) / 39;
    const v = Math.floor(index / 40) / Math.max(1, Math.floor(count / 40));
    const wx = (u * 2 - 1) * spread * 1.8;
    const wz = (v * 2 - 1) * spread * 5;
    wave[i3] = wx + (random() - 0.5) * spread * 0.05;
    wave[i3 + 1] =
      Math.sin(u * Math.PI * 3 + v * Math.PI * 2) * spread * 0.42 +
      Math.cos(v * Math.PI * 2.2) * spread * 0.2 +
      (random() - 0.5) * spread * 0.05;
    wave[i3 + 2] = wz;
  }

  return { buffers, random: randoms, slots };
}

/**
 * Blend weights across the formation buffers.
 *
 * Only ever two are non-zero: the shape the current section rests in, and the
 * shape the next one rests in, crossfaded by how far through the section the
 * visitor has scrolled. The crossfade is held back until the second half of the
 * section so each shape has time to actually be seen.
 */
export function formationWeights(sectionIndex: number, sectionProgress: number): number[] {
  const weights = Array.from<number>({ length: FORMATION_COUNT }).fill(0);

  const safeIndex = Math.max(0, Math.min(SECTION_FORMATION.length - 1, Math.floor(sectionIndex)));
  const nextIndex = Math.min(SECTION_FORMATION.length - 1, safeIndex + 1);

  const t = Math.min(1, Math.max(0, Number.isFinite(sectionProgress) ? sectionProgress : 0));
  // Hold the current shape through the first 45%, then cross over.
  const raw = Math.min(1, Math.max(0, (t - 0.45) / 0.55));
  const blend = raw * raw * (3 - 2 * raw);

  weights[SECTION_FORMATION[safeIndex]] += 1 - blend;
  weights[SECTION_FORMATION[nextIndex]] += blend;

  return weights;
}
