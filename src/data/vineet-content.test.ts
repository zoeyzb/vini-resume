import { describe, expect, it } from "vitest";
import { education, experience, profile } from "./content";

describe("Vineet portfolio content", () => {
  it("uses Vineet Singh as the portfolio identity", () => {
    expect(profile.name).toBe("Vineet Singh");
    expect(profile.location).toBe("Galesburg, Illinois");
    expect(profile.email).toBe("vineet.singh14204@gmail.com");
  });

  it("shows the Knox College education from Vineet's resume", () => {
    expect(education).toEqual([
      {
        school: "Knox College, Galesburg, IL",
        detail: "B.S. Computer Science · B.A. Business (Accounting & Finance)",
        period: "Graduating Winter 2026",
      },
    ]);
  });

  it("includes the highlighted F&M Bank teller experience", () => {
    const bank = experience.find((job) => job.role === "Bank Teller" && job.org === "F&M Bank");
    expect(bank).toBeDefined();
    expect(bank?.period).toBe("Sep 2023 – Sep 2024");
    expect(bank?.tags[0]).toBe("Highlighted");
    expect(bank?.points).toContain("Processed $3–4M+ in financial transactions with zero compliance errors");
    expect(bank?.points).toContain("Identified cross-selling opportunities while maintaining high accuracy and risk awareness");
  });
});
