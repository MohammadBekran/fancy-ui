/**
 * Button Component Test Suite
 *
 * This test suite verifies the functionality, accessibility, and user interaction
 * of the Button component. The tests cover all major features and edge cases to
 * ensure the component behaves as expected in various scenarios.
 *
 * Test Coverage:
 * - Basic rendering and props
 * - Visual variants
 * - Size variants
 * - Loading state
 * - User interactions
 * - Accessibility
 * - Styling and customization
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "../components";

describe("Button", () => {
  /**
   * Basic Rendering Tests
   * These tests verify that the component renders correctly with various props
   */
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  /**
   * Variant Tests
   * Verifies that different visual variants are applied correctly
   */
  it("applies primary variant styles", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-600");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-600");
  });

  it("applies outline variant styles", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });

  /**
   * Size Tests
   * Verifies that different size variants are applied correctly
   */
  it("applies small size styles", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");
  });

  it("applies medium size styles", () => {
    render(<Button size="md">Medium</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-10");
  });

  it("applies large size styles", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-12");
  });

  /**
   * Loading State Tests
   * Verifies the loading state UI and behavior
   */
  it("shows loading spinner when isLoading is true", () => {
    render(<Button isLoading>Loading</Button>);
    const spinner = screen.getByRole("button").querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  /**
   * User Interaction Tests
   * Verifies that the component handles user interactions correctly
   */
  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  /**
   * Accessibility Tests
   * Verifies that the component meets accessibility requirements
   */
  it("maintains focus styles", () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("focus-visible:ring-2");
  });

  it("preserves button role", () => {
    render(<Button>Accessible</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
