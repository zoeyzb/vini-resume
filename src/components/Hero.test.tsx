import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL_HREF, profile } from "../data/content";
import Hero from "./Hero";

describe("Hero contact action", () => {
  it("opens contact options with a working email link", () => {
    render(<Hero />);

    fireEvent.click(screen.getByRole("button", { name: /^contact/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(profile.email) })).toHaveAttribute("href", CONTACT_EMAIL_HREF);
  });
});
