import Hero from "@/app/[locale]/+components/Hero";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
describe("Hero EN", () => {
  it("Renders a Hero Section EN", () => {
    render(<Hero locale="en" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h1).toHaveTextContent(/HOT CHILLY !!!/i);
    expect(h2).toHaveTextContent(/Where the Heat Meets the Hype!/i);
  });
});
describe("Hero FA", () => {
  it("Renders a Hero Section FA", () => {
    render(<Hero locale="fa" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h1).toHaveTextContent(/HOT CHILLY/i);
    expect(h2).toHaveTextContent(/غذاهای تند اینجا پیدا میشن!/i);
  });
});
