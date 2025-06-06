/**
 * Input Component Test Suite
 *
 * This test suite verifies the functionality, accessibility, and user interaction
 * of the Input component. The tests cover all major features and edge cases to
 * ensure the component behaves as expected in various scenarios.
 *
 * Test Coverage:
 * - Basic rendering and props
 * - Form integration
 * - Validation
 * - User interactions
 * - Accessibility
 * - Styling and customization
 * - Error handling
 * - State management
 */

import * as Form from "@radix-ui/react-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Input from "@/features/input/components";

/**
 * Helper function to render the Input component within a Form context
 * @param {React.ReactElement} ui - The Input component to render
 * @returns {ReturnType<typeof render>} The render result
 */
const renderWithForm = (ui: React.ReactElement) => {
  return render(<Form.Root>{ui}</Form.Root>);
};

describe("Input", () => {
  /**
   * Basic Rendering Tests
   * These tests verify that the component renders correctly with various props
   */
  it("renders with default props", () => {
    renderWithForm(<Input name="test" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    renderWithForm(<Input name="test" label="Test Label" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    renderWithForm(<Input name="test" helperText="Helper text" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    renderWithForm(<Input name="test" error="Error message" />);
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    renderWithForm(<Input name="test" label="Required Field" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    renderWithForm(<Input name="test" placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText("Custom placeholder")).toBeInTheDocument();
  });

  /**
   * Password Visibility Tests
   * Verifies the password toggle functionality
   */
  it("handles password visibility toggle", async () => {
    renderWithForm(
      <Input name="test" type="password" placeholder="Enter your password" showPasswordToggle />
    );
    const input = screen.getByPlaceholderText("Enter your password");
    const toggleButton = screen.getByRole("button");

    expect(input).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  /**
   * Character Count Tests
   * Verifies the character counting feature
   */
  it("shows character count", () => {
    renderWithForm(<Input name="test" value="test" maxLength={10} showCharacterCount />);
    expect(screen.getByText("4/10")).toBeInTheDocument();
  });

  /**
   * Loading State Tests
   * Verifies the loading state UI
   */
  it("shows loading state", () => {
    renderWithForm(<Input name="test" isLoading />);
    expect(screen.getByRole("textbox")).toHaveClass("pr-10");
  });

  /**
   * User Interaction Tests
   * Verifies that the component handles user input correctly
   */
  it("handles input change", async () => {
    const handleChange = vi.fn();
    renderWithForm(<Input name="test" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test value");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test value");
  });

  /**
   * State Management Tests
   * Verifies various component states
   */
  it("applies disabled state", () => {
    renderWithForm(<Input name="test" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  /**
   * Styling Tests
   * Verifies that custom styling is applied correctly
   */
  it("applies fullWidth class when fullWidth prop is true", () => {
    renderWithForm(<Input name="test" fullWidth />);
    const wrapper = screen.getByRole("textbox").parentElement?.parentElement;
    expect(wrapper).toHaveClass("w-full");
  });

  it("applies custom classes", () => {
    const customClasses = {
      wrapper: "custom-wrapper",
      input: "custom-input",
      label: "custom-label",
      error: "custom-error",
    };

    renderWithForm(<Input name="test" label="Test" error="Error" classes={customClasses} />);

    const wrapper = screen.getByRole("textbox").closest(".flex.flex-col");
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Test");
    const error = screen.getByText("Error");

    expect(wrapper).toHaveClass("custom-wrapper");
    expect(input).toHaveClass("custom-input");
    expect(label).toHaveClass("custom-label");
    expect(error).toHaveClass("custom-error");
  });

  /**
   * Validation Tests
   * Verifies that input validation works as expected
   */
  it("validates email format", async () => {
    const handleChange = vi.fn();
    renderWithForm(
      <Input name="email" type="email" validationType="email" onChange={handleChange} />
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "invalid-email");
    expect(input).toHaveAttribute("aria-invalid", "true");

    await userEvent.clear(input);
    await userEvent.type(input, "valid@email.com");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("validates password strength", async () => {
    const handleChange = vi.fn();
    renderWithForm(
      <Input
        name="password"
        type="password"
        validationType="strongPassword"
        onChange={handleChange}
        placeholder="Enter your password"
      />
    );

    const input = screen.getByPlaceholderText("Enter your password");

    // Test weak password
    await userEvent.type(input, "weak");
    expect(input).toHaveAttribute("aria-invalid", "true");

    // Test valid strong password
    await userEvent.clear(input);
    await userEvent.type(input, "StrongP@ss123");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  /**
   * Form Integration Tests
   * Verifies that the component works correctly within a form context
   */
  it("works within a form context", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form.Root onSubmit={handleSubmit}>
        <Input name="test" required />
        <button type="submit">Submit</button>
      </Form.Root>
    );

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "test value");
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
