import { describe, expect, it } from "vitest";
import { caseStudies, experience, links, projects, skills } from "./content";

describe("content data integrity", () => {
  it("gives every experience entry a non-empty workflow", () => {
    experience.forEach((job) => {
      expect(job.flow.length).toBeGreaterThan(0);
    });
  });

  it("gives every case study a non-empty workflow", () => {
    Object.values(caseStudies).forEach((cs) => {
      expect(cs.flow.length).toBeGreaterThan(0);
    });
  });

  it("does not expose a résumé link", () => {
    expect(links).not.toHaveProperty("resume");
  });

  it("keeps every project tag list non-empty and unique in name", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has exactly three skills categories", () => {
    expect(Object.keys(skills)).toHaveLength(3);
  });
});
