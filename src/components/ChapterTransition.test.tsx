import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChapterTransition from "./ChapterTransition";
import { ACTS, GATE_IDS } from "../lib/stage";

describe("ChapterTransition", () => {
  it("names the acts on either side of the gate", () => {
    render(<ChapterTransition gate={1} />);

    expect(screen.getByText(ACTS[0].label)).toBeInTheDocument();
    expect(screen.getByText(ACTS[1].label)).toBeInTheDocument();
  });

  it("carries the gate id the stage measures the particle burst against", () => {
    const { container } = render(<ChapterTransition gate={3} />);
    expect(container.querySelector(`#${GATE_IDS[2]}`)).not.toBeNull();
  });

  it("mounts no canvas — the single background field owns all particle work", () => {
    const { container } = render(<ChapterTransition gate={2} />);
    expect(container.querySelector("canvas")).toBeNull();
  });
});
