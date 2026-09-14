import { describe, expect, it } from "vitest";
import { actZoom, zoomForProgress } from "./ParticleBackground";
import {
  FORMATION_COUNT,
  SECTION_FORMATION,
  SECTION_IDS,
  assertNoSelfMorph,
  buildFormations,
  formationWeights,
} from "./particleFormations";

describe("zoomForProgress", () => {
  it("starts pulled back and ends deeper in", () => {
    expect(zoomForProgress(0)).toBeGreaterThan(zoomForProgress(1));
  });

  it("moves in monotonically as the page scrolls down", () => {
    let previous = Infinity;
    for (let step = 0; step <= 20; step += 1) {
      const z = zoomForProgress(step / 20);
      expect(z, `progress ${step / 20}`).toBeLessThanOrEqual(previous);
      previous = z;
    }
  });

  it("clamps out-of-range and non-finite input instead of flinging the camera", () => {
    expect(zoomForProgress(-5)).toBe(zoomForProgress(0));
    expect(zoomForProgress(99)).toBe(zoomForProgress(1));
    expect(Number.isFinite(zoomForProgress(Number.NaN))).toBe(true);
  });
});

describe("actZoom", () => {
  it("pushes in as an act boundary crosses the middle of the screen", () => {
    // Lower z is closer in. `burst` peaks at 1 on a crossing and is 0 at rest.
    expect(actZoom(0.5, 1)).toBeLessThan(actZoom(0.5, 0));
  });

  it("returns to the resting dolly between crossings", () => {
    expect(actZoom(0.5, 0)).toBe(zoomForProgress(0.5));
  });

  it("still trends deeper overall as the page progresses", () => {
    expect(actZoom(1, 0)).toBeLessThan(actZoom(0, 0));
  });

  it("scales the push with the strength of the crossing", () => {
    const half = actZoom(0.5, 0.5);
    expect(half).toBeLessThan(actZoom(0.5, 0));
    expect(half).toBeGreaterThan(actZoom(0.5, 1));
  });

  it("never returns a non-finite camera position", () => {
    [
      [Number.NaN, 0.5],
      [0.5, Number.NaN],
      [-3, 12],
    ].forEach(([page, burst]) => {
      expect(Number.isFinite(actZoom(page, burst))).toBe(true);
    });
  });
});

describe("formationWeights", () => {
  it("always sums to one, so the cloud never collapses or doubles up", () => {
    for (let section = 0; section < SECTION_IDS.length; section += 1) {
      for (let step = 0; step <= 10; step += 1) {
        const total = formationWeights(section, step / 10).reduce((sum, w) => sum + w, 0);
        expect(total, `section ${section} at ${step / 10}`).toBeCloseTo(1, 6);
      }
    }
  });

  it("rests fully in one shape early in a section", () => {
    const weights = formationWeights(0, 0.1);
    expect(weights[SECTION_FORMATION[0]]).toBe(1);
  });

  it("has crossed into the next section's shape by the end", () => {
    const weights = formationWeights(1, 1);
    expect(weights[SECTION_FORMATION[2]]).toBe(1);
  });

  it("blends between exactly two shapes mid-crossing", () => {
    const nonZero = formationWeights(1, 0.75).filter((w) => w > 0.001);
    expect(nonZero.length).toBeLessThanOrEqual(2);
  });

  it("clamps past the last section instead of reading off the end", () => {
    const weights = formationWeights(SECTION_IDS.length + 5, 0.5);
    expect(weights.reduce((sum, w) => sum + w, 0)).toBeCloseTo(1, 6);
  });
});

describe("buildFormations", () => {
  it("fills a buffer for every formation", () => {
    const { buffers, random, slots } = buildFormations(240, 9);
    expect(buffers).toHaveLength(FORMATION_COUNT);
    buffers.forEach((buffer, index) => {
      expect(buffer, `formation ${index}`).toHaveLength(240 * 3);
      expect(buffer.some((value) => value !== 0), `formation ${index} is empty`).toBe(true);
    });
    expect(random).toHaveLength(240 * 4);
    expect(slots).toHaveLength(240);
  });

  it("is deterministic, so the field looks the same on every visit", () => {
    expect(Array.from(buildFormations(64, 9).buffers[0])).toEqual(
      Array.from(buildFormations(64, 9).buffers[0]),
    );
  });

  it("makes each formation a genuinely different shape", () => {
    const { buffers } = buildFormations(600, 9);
    // Compare vertical spread: a column is tall and narrow, streams are wide
    // and flat. If two formations had the same profile the morph would be
    // invisible.
    const profile = (buffer: Float32Array) => {
      let sumX = 0;
      let sumY = 0;
      for (let i = 0; i < buffer.length; i += 3) {
        sumX += Math.abs(buffer[i]);
        sumY += Math.abs(buffer[i + 1]);
      }
      return sumY / Math.max(0.001, sumX);
    };

    const column = profile(buffers[3]);
    const streams = profile(buffers[1]);
    expect(column).toBeGreaterThan(streams * 2);
  });

  it("keeps the four stream lanes separated", () => {
    const { buffers } = buildFormations(400, 9);
    const streams = buffers[1];
    const lanes = new Map<number, number[]>();
    for (let index = 0; index < 400; index += 1) {
      const lane = index % 4;
      lanes.set(lane, [...(lanes.get(lane) ?? []), streams[index * 3 + 1]]);
    }
    const centres = [...lanes.values()].map(
      (values) => values.reduce((sum, v) => sum + v, 0) / values.length,
    );
    centres.sort((a, b) => a - b);
    for (let index = 1; index < centres.length; index += 1) {
      expect(Math.abs(centres[index] - centres[index - 1])).toBeGreaterThan(0.5);
    }
  });
});

describe("SECTION_FORMATION", () => {
  it("gives every section a shape", () => {
    expect(SECTION_FORMATION).toHaveLength(SECTION_IDS.length);
  });

  it("never rests two neighbouring sections in the same shape", () => {
    // This is the regression that mattered: when a section and the next one
    // shared a formation, the crossfade ran its full length and the viewer saw
    // nothing happen at all.
    expect(() => assertNoSelfMorph()).not.toThrow();
  });

  it("reports which pair collided when one does", () => {
    expect(() => assertNoSelfMorph([0, 1, 1, 2])).toThrow(/share formation 1/);
  });

  it("only refers to shapes that exist", () => {
    SECTION_FORMATION.forEach((shape) => {
      expect(shape).toBeGreaterThanOrEqual(0);
      expect(shape).toBeLessThan(FORMATION_COUNT);
    });
  });

  it("uses every shape at least once, so none is dead weight", () => {
    expect(new Set(SECTION_FORMATION).size).toBe(FORMATION_COUNT);
  });
});

describe("palette slots", () => {
  it("assigns every particle one of the three palette colours", () => {
    const { slots } = buildFormations(500, 9);
    slots.forEach((slot) => expect([0, 1, 2]).toContain(slot));
  });

  it("uses all three, so the field keeps its warm/cool contrast", () => {
    expect(new Set(buildFormations(500, 9).slots).size).toBe(3);
  });
});
