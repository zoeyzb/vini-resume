import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";
import { CONTACT_EMAIL_HREF, profile } from "../data/content";

describe("Contact", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("copies the email address and shows a confirmation", async () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: /copy email/i }));

    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(profile.email));
    await waitFor(() => expect(screen.getByText("Copied ✓")).toBeInTheDocument());
  });

  it("links the email card to the real address through the standard mailto protocol", () => {
    render(<Contact />);
    const mailLink = screen.getByRole("link", { name: profile.email });
    expect(mailLink).toHaveAttribute("href", CONTACT_EMAIL_HREF);
  });
});
