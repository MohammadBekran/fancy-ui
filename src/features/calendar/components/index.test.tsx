/**
 * Calendar Component Tests
 *
 * This module contains test suites for the Calendar component,
 * ensuring proper functionality and edge cases are handled correctly.
 * Tests are organized by feature and include:
 * - Date selection functionality
 * - Navigation between months
 * - Date range constraints and validation
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Calendar from "../components";

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

  describe("Date Selection", () => {
    it("selects a date when clicked", async () => {
      const user = userEvent.setup();
      render(<Calendar onSelect={mockOnSelect} onDayClick={mockOnDayClick} />);

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

      // Try to select date before minDate
      const dateButton = screen.getByRole("button", { name: "14" });
      await user.click(dateButton);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it("respects maxDate constraint", async () => {
      const user = userEvent.setup();
      const maxDate = new Date(2024, 0, 15);
      render(<Calendar maxDate={maxDate} />);

      // Try to select date after maxDate
      const dateButton = screen.getByRole("button", { name: "16" });
      await user.click(dateButton);

      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });
});
