import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL_HREF } from "../data/content";
import { StageProvider } from "../lib/stage";
import Nav from "./Nav";

describe("Nav contact actions", () => {
  it("uses the same standard email link in desktop and mobile navigation", () => {
    render(<StageProvider><Nav /></StageProvider>);

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", CONTACT_EMAIL_HREF);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("link", { name: "Contact Vineet" })).toHaveAttribute("href", CONTACT_EMAIL_HREF);
  });
});
