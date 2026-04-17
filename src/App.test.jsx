import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Clutch2Live landing", () => {
  it("renders sections in the planned order", () => {
    const { container } = render(<App />);
    const sections = [...container.querySelectorAll("[data-section]")].map((node) =>
      node.getAttribute("data-section")
    );

    expect(sections).toEqual(["hero", "contact"]);
  });

  it("creates mailto fallback after contact validation", () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "" };

    render(<App />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Nova" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "nova@pilot.io" }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Interested in launch partnership." }
    });
    fireEvent.click(screen.getByRole("button", { name: /open email client/i }));

    expect(window.location.href).toContain("mailto:contact@clutch2live.com");
    expect(window.location.href).toContain("Clutch2Live%20Contact");

    window.location = originalLocation;
  });
});
