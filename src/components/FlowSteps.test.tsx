import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FlowSteps from "./FlowSteps";

describe("FlowSteps", () => {
  it("renders every step as text except a literal 'Waveform' step", () => {
    render(<FlowSteps steps={["Lead found", "Waveform", "Routed"]} />);

    expect(screen.getByText("Lead found")).toBeInTheDocument();
    expect(screen.getByText("Routed")).toBeInTheDocument();
    expect(screen.queryByText("Waveform")).not.toBeInTheDocument();
  });

  it("draws one fewer connector than there are steps", () => {
    const { container } = render(<FlowSteps steps={["A", "B", "C", "D"]} />);
    expect(container.querySelectorAll("[data-connector]")).toHaveLength(3);
  });

  it("states each step's status in text, not only in colour", () => {
    render(<FlowSteps steps={["A", "B", "C"]} />);

    // Index 0 is active on first render, so the two after it are queued.
    expect(screen.getByText(/in progress/)).toBeInTheDocument();
    expect(screen.getAllByText(/queued/)).toHaveLength(2);
  });
});
