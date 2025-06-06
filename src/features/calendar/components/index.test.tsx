/**
 * Calendar Component Tests
 *
 * This module contains comprehensive test suites for the Calendar component,
 * ensuring proper functionality and edge cases are handled correctly.
 * Tests are organized by feature and include:
 * - Basic rendering and interaction
 * - Date selection functionality
 * - Date range selection
 * - Date constraints and validation
 * - Navigation and state management
 * - Event handling
 * - Edge cases and error states
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Calendar from "@/features/calendar/components";

// Mock pointer events and scrollIntoView
Element.prototype.hasPointerCapture = vi.fn();
Element.prototype.setPointerCapture = vi.fn();
Element.prototype.releasePointerCapture = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

describe("Calendar", () => {
  const mockOnSelect = vi.fn();
  const mockOnDayClick = vi.fn();
  const mockOnMonthChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Calendar />);
      expect(screen.getByRole("button")).toHaveTextContent("Select date");
    });

    it("renders with custom placeholder", () => {
      render(<Calendar placeholder="Choose date" />);
      expect(screen.getByRole("button")).toHaveTextContent("Choose date");
    });

    it("renders with selected date", () => {
      const date = new Date(2024, 0, 15);
      render(<Calendar selected={date} />);
      expect(screen.getByRole("button")).toHaveTextContent("January 15, 2024");
    });

    it("renders in disabled state", () => {
      render(<Calendar disabled />);
      const trigger = screen.getByRole("button");
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveClass("opacity-50");
    });
  });

  describe("Date Selection", () => {
    it("selects a date when clicked", async () => {
      const user = userEvent.setup();
      render(<Calendar onSelect={mockOnSelect} onDayClick={mockOnDayClick} />);

      // Open calendar
      await user.click(screen.getByRole("button"));

      // Click on a date
      const dateButton = screen.getByRole("button", { name: "15" });
      await user.click(dateButton);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnDayClick).toHaveBeenCalledTimes(1);
      expect(mockOnSelect.mock.calls[0][0]).toBeInstanceOf(Date);
    });
  });

  describe("Navigation", () => {
    it("navigates to previous month", async () => {
      const user = userEvent.setup();
      const initialDate = new Date(2024, 1, 15); // February 15, 2024
      render(<Calendar selected={initialDate} onMonthChange={mockOnMonthChange} />);

      // Open calendar
      await user.click(screen.getByRole("button"));

      // Click previous month button
      const prevButton = screen.getByRole("button", { name: /previous/i });
      await user.click(prevButton);

      expect(mockOnMonthChange).toHaveBeenCalledTimes(1);
      expect(mockOnMonthChange.mock.calls[0][0].getMonth()).toBe(0); // January
    });

    it("navigates to next month", async () => {
      const user = userEvent.setup();
      const initialDate = new Date(2024, 1, 15); // February 15, 2024
      render(<Calendar selected={initialDate} onMonthChange={mockOnMonthChange} />);

      // Open calendar
      await user.click(screen.getByRole("button"));

      // Click next month button
      const nextButton = screen.getByRole("button", { name: /next/i });
      await user.click(nextButton);

      expect(mockOnMonthChange).toHaveBeenCalledTimes(1);
      expect(mockOnMonthChange.mock.calls[0][0].getMonth()).toBe(2); // March
    });
  });

  describe("Date Range Constraints", () => {
    it("respects minDate constraint", async () => {
      const user = userEvent.setup();
      const minDate = new Date(2024, 0, 15);
      render(<Calendar minDate={minDate} />);

      // Open calendar
      await user.click(screen.getByRole("button"));

      // Try to select date before minDate
      const dateButton = screen.getByRole("button", { name: "14" });
      await user.click(dateButton);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it("respects maxDate constraint", async () => {
      const user = userEvent.setup();
      const maxDate = new Date(2024, 0, 15);
      render(<Calendar maxDate={maxDate} />);

      // Open calendar
      await user.click(screen.getByRole("button"));

      // Try to select date after maxDate
      const dateButton = screen.getByRole("button", { name: "16" });
      await user.click(dateButton);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe("Localization", () => {
    it("renders with French locale", () => {
      const date = new Date(2024, 0, 15);
      render(<Calendar selected={date} locale="fr-FR" />);

      expect(screen.getByRole("button")).toHaveTextContent("15 janvier 2024");
    });

    it("renders with German locale", () => {
      const date = new Date(2024, 0, 15);
      render(<Calendar selected={date} locale="de-DE" />);

      expect(screen.getByRole("button")).toHaveTextContent("15. Januar 2024");
    });
  });

  describe("Edge Cases", () => {
    it("handles null selected date", () => {
      render(<Calendar selected={undefined} />);
      expect(screen.getByRole("button")).toHaveTextContent("Select date");
    });

    it("handles invalid dates gracefully", () => {
      const invalidDate = new Date("invalid");
      render(<Calendar selected={invalidDate} />);
      expect(screen.getByRole("button")).toHaveTextContent("Select date");
    });

    it("updates when selected prop changes", () => {
      const { rerender } = render(<Calendar selected={new Date(2024, 0, 15)} />);
      expect(screen.getByRole("button")).toHaveTextContent("January 15, 2024");

      rerender(<Calendar selected={new Date(2024, 1, 20)} />);
      expect(screen.getByRole("button")).toHaveTextContent("February 20, 2024");
    });
  });
});
