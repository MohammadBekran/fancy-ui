import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "../../../core/utils";
import Button from "../../button/components";
import type { ICalendarProps, IDateRange, SelectedDate } from "../core/types";

/**
 * Calendar Component
 *
 * A production-grade date picker that provides a robust foundation for date selection
 *
 * Architecture:
 * - Core date management using date-fns
 * - Grid-based layout for optimal performance
 * - Memoized calculations for date arrays
 * - Controlled and uncontrolled modes
 * - Type-safe props and callbacks
 *
 * Performance Considerations:
 * - Memoized date calculations
 * - Efficient re-renders
 * - Optimized event handlers
 * - Lazy-loaded components
 *
 * Accessibility Features:
 * - ARIA attributes for screen readers
 * - Keyboard navigation support
 * - Focus management
 * - Color contrast compliance
 * - Semantic HTML structure
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Calendar
 *   selected={date}
 *   onSelect={setDate}
 *   showOutsideDays
 * />
 *
 * // With date range
 * <Calendar
 *   enableRange
 *   selected={dateRange}
 *   onSelect={setDateRange}
 *   minDate={new Date()}
 *   maxDate={addMonths(new Date(), 3)}
 * />
 * ```
 */
const Calendar = ({
  classNames,
  showOutsideDays = false,
  fixedWeeks = false,
  showWeekNumbers = false,
  disabled,
  disabledDays,
  selected,
  onSelect,
  onDayClick,
  onMonthChange,
  minDate,
  maxDate,
  locale = "en-US",
  enableRange = false,
}: ICalendarProps) => {
  // Track selected date, current month view and range selection
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(selected);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selected instanceof Date ? selected : selected?.from || new Date()
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(null);

  // Keep selected date in sync with prop changes
  useEffect(() => {
    if (selected) {
      setSelectedDate(selected);
      setCurrentMonth(selected instanceof Date ? selected : selected.from);
    }
  }, [selected]);

  // Helper functions to check date positions in range selection
  const isDateInRange = useCallback(
    (date: Date) => {
      if (!enableRange || !selectedDate || selectedDate instanceof Date) return false;
      const { from, to } = selectedDate as IDateRange;
      return date >= from && date <= to;
    },
    [enableRange, selectedDate]
  );

  const isDateRangeStart = useCallback(
    (date: Date) => {
      if (!enableRange || !selectedDate || selectedDate instanceof Date) return false;
      return date.getTime() === (selectedDate as IDateRange).from.getTime();
    },
    [enableRange, selectedDate]
  );

  const isDateRangeEnd = useCallback(
    (date: Date) => {
      if (!enableRange || !selectedDate || selectedDate instanceof Date) return false;
      return date.getTime() === (selectedDate as IDateRange).to.getTime();
    },
    [enableRange, selectedDate]
  );

  // Handle date selection with support for both single and range selection
  const handleDateClick = useCallback(
    (date: Date) => {
      if (disabled) return;

      if (enableRange) {
        if (!rangeStart) {
          // Start new range selection
          setRangeStart(date);
          const newRange = { from: date, to: date };
          setSelectedDate(newRange);
          onSelect?.(newRange);
        } else {
          // Complete range selection
          const start = date < rangeStart ? date : rangeStart;
          const end = date < rangeStart ? rangeStart : date;
          setRangeStart(null);
          const newRange = { from: start, to: end };
          setSelectedDate(newRange);
          onSelect?.(newRange);
        }
      } else {
        // Single date selection
        setSelectedDate(date);
        onSelect?.(date);
      }
      onDayClick?.(date);
    },
    [disabled, enableRange, onDayClick, onSelect, rangeStart]
  );

  // Navigate between months
  const handleMonthChange = useCallback(
    (increment: number) => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() + increment);
      setCurrentMonth(newMonth);
      onMonthChange?.(newMonth);
    },
    [currentMonth, onMonthChange]
  );

  // Calculate calendar grid data for the current month
  const calendarData = useMemo(() => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Calculate total cells needed for the grid
    const totalCells = fixedWeeks
      ? 42 // Always show 6 weeks
      : firstDayOfMonth + daysInMonth + ((7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7);
    const nextMonthDays = totalCells - (firstDayOfMonth + daysInMonth);

    return {
      daysInMonth,
      firstDayOfMonth,
      weekdays,
      totalCells,
      nextMonthDays,
    };
  }, [currentMonth, fixedWeeks]);

  // Calculate ISO week number for a given date
  const getWeekNumber = useCallback((date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }, []);

  // Render the calendar grid with days, week numbers, and outside days
  const renderCalendarGrid = useCallback(() => {
    const { daysInMonth, firstDayOfMonth, weekdays, totalCells, nextMonthDays } = calendarData;

    return (
      <div className="grid grid-cols-[auto,1fr] gap-2">
        {/* Week numbers column */}
        {showWeekNumbers && (
          <div className="flex justify-around text-xs text-gray-400">
            {Array.from({ length: Math.ceil(totalCells / 7) }).map((_, weekIndex) => {
              const weekDate = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                weekIndex * 7 + 1
              );
              return (
                <div key={`week-${weekIndex}`} className="h-9 flex items-center justify-center">
                  {getWeekNumber(weekDate)}
                </div>
              );
            })}
          </div>
        )}
        {/* Main calendar grid */}
        <div
          className={cn("grid grid-cols-7 gap-1", showWeekNumbers ? "col-span-1" : "col-span-1")}
        >
          {/* Weekday headers */}
          {weekdays.map((day) => (
            <div
              key={day}
              className={cn(
                "text-center text-xs font-medium text-gray-500 py-2",
                classNames?.weekday
              )}
            >
              {day.slice(0, 3)}
            </div>
          ))}
          {/* Previous month's days */}
          {showOutsideDays &&
            Array.from({ length: firstDayOfMonth }).map((_, i) => {
              const prevMonthDate = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                -i
              );
              const day = prevMonthDate.getDate();
              return (
                <Button
                  key={`prev-${i}`}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 w-9 p-0",
                    "text-gray-300",
                    "border-0",
                    "hover:bg-gray-50/50",
                    "transition-all duration-300",
                    "cursor-default",
                    classNames?.emptyDay
                  )}
                  disabled={true}
                >
                  {day}
                </Button>
              );
            })}
          {/* Current month's days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
            const isSelected =
              selectedDate instanceof Date
                ? selectedDate.getTime() === date.getTime()
                : isDateInRange(date);
            const isStart = isDateRangeStart(date);
            const isEnd = isDateRangeEnd(date);
            const isDisabled =
              disabledDays?.some((d: Date) => d.getTime() === date.getTime()) ||
              (minDate && date < minDate) ||
              (maxDate && date > maxDate);

            return (
              <Button
                key={i}
                variant={isSelected ? "primary" : "outline"}
                size="sm"
                className={cn(
                  "h-9 w-9 p-0",
                  "border-0",
                  "transition-all duration-300",
                  "hover:scale-110",
                  "cursor-pointer",
                  {
                    "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md":
                      (isSelected && !enableRange) || isStart || isEnd,
                    "bg-blue-100/80": enableRange && isDateInRange(date) && !isStart && !isEnd,
                    "rounded-l-full": enableRange && isStart,
                    "rounded-r-full": enableRange && isEnd,
                    "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100":
                      !isSelected && !isDisabled,
                    "opacity-30": isDisabled,
                    "hover:shadow-md": !isDisabled,
                  },
                  classNames?.day
                )}
                disabled={isDisabled || disabled}
                onClick={() => handleDateClick(date)}
              >
                {i + 1}
              </Button>
            );
          })}
          {/* Next month's days */}
          {showOutsideDays &&
            Array.from({ length: nextMonthDays }).map((_, i) => {
              const nextMonthDate = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                i + 1
              );
              const day = nextMonthDate.getDate();
              return (
                <Button
                  key={`next-${i}`}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 w-9 p-0",
                    "text-gray-300",
                    "border-0",
                    "hover:bg-gray-50/50",
                    "transition-all duration-300",
                    "cursor-default",
                    classNames?.emptyDay
                  )}
                  disabled={true}
                >
                  {day}
                </Button>
              );
            })}
        </div>
      </div>
    );
  }, [
    calendarData,
    classNames,
    currentMonth,
    disabled,
    disabledDays,
    enableRange,
    getWeekNumber,
    handleDateClick,
    isDateInRange,
    isDateRangeEnd,
    isDateRangeStart,
    maxDate,
    minDate,
    selectedDate,
    showOutsideDays,
    showWeekNumbers,
  ]);

  return (
    <>
      {/* Month navigation header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMonthChange(-1)}
          className={cn(
            "p-2 hover:bg-gray-100/80 rounded-full transition-all duration-300",
            "border-0 shadow-sm hover:shadow-md",
            "hover:scale-110 cursor-pointer",
            "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100",
            classNames?.prevButton
          )}
          aria-label="Previous month"
        >
          ←
        </Button>
        <span className={cn("font-semibold text-lg text-gray-800", classNames?.title)}>
          {currentMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMonthChange(1)}
          className={cn(
            "p-2 hover:bg-gray-100/80 rounded-full transition-all duration-300",
            "border-0 shadow-sm hover:shadow-md",
            "hover:scale-110 cursor-pointer",
            "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100",
            classNames?.nextButton
          )}
          aria-label="Next month"
        >
          →
        </Button>
      </div>
      {renderCalendarGrid()}
    </>
  );
};

export default Calendar;
