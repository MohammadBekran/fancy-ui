import * as Form from "@radix-ui/react-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Input from "@/features/input/components";

const renderWithForm = (ui: React.ReactElement) => {
  return render(<Form.Root>{ui}</Form.Root>);
};

describe("Input", () => {
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

  it("shows character count", () => {
    renderWithForm(<Input name="test" value="test" maxLength={10} showCharacterCount />);
    expect(screen.getByText("4/10")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    renderWithForm(<Input name="test" isLoading />);
    expect(screen.getByRole("textbox")).toHaveClass("pr-10");
  });

  it("handles input change", async () => {
    const handleChange = vi.fn();
    renderWithForm(<Input name="test" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test value");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test value");
  });

  it("applies disabled state", () => {
    renderWithForm(<Input name="test" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

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

    // Test password without uppercase
    await userEvent.clear(input);
    await userEvent.type(input, "password123!");
    expect(input).toHaveAttribute("aria-invalid", "true");

    // Test password without lowercase
    await userEvent.clear(input);
    await userEvent.type(input, "PASSWORD123!");
    expect(input).toHaveAttribute("aria-invalid", "true");

    // Test password without number
    await userEvent.clear(input);
    await userEvent.type(input, "Password!");
    expect(input).toHaveAttribute("aria-invalid", "true");

    // Test password without special character
    await userEvent.clear(input);
    await userEvent.type(input, "Password123");
    expect(input).toHaveAttribute("aria-invalid", "true");

    // Test valid strong password
    await userEvent.clear(input);
    await userEvent.type(input, "StrongP@ss123");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

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
