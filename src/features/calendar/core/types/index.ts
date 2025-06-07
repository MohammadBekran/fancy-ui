/**
 * Calendar Component Type Definitions
 *
 * This module contains TypeScript type definitions for the Calendar component,
 * ensuring type safety and providing comprehensive documentation for developers.
 * The types are designed to be extensible while maintaining strict type checking.
 */

import * as Popover from "@radix-ui/react-popover";

/**
 * Custom class names for styling different parts of the calendar component.
 * Provides granular control over the appearance of each calendar element.
 */
export interface ICalendarClasses {
  /** Root container of the calendar */
  root?: string;
  /** Trigger button that opens the calendar */
  trigger?: string;
  /** Main content container of the calendar */
  content?: string;
  /** Header section containing navigation controls */
  header?: string;
  /** Title text showing current month/year */
  title?: string;
  /** Previous month navigation button */
  prevButton?: string;
  /** Next month navigation button */
  nextButton?: string;
  /** Button that triggers the calendar popover */
  triggerButton?: string;
  /** Main calendar view container */
  view?: string;
  /** Weekday header cells */
  weekday?: string;
  /** Individual day cells */
  day?: string;
  /** Empty day cells (outside current month) */
  emptyDay?: string;
  /** Month selection dropdown */
  monthSelect?: string;
  /** Year selection dropdown */
  yearSelect?: string;
  /** Dropdown trigger button */
  selectTrigger?: string;
  /** Dropdown content container */
  selectContent?: string;
  /** Individual dropdown items */
  selectItem?: string;
  /** Text within dropdown items */
  selectItemText?: string;
  /** Selection indicator for dropdown items */
  selectItemIndicator?: string;
  /** Popover content container */
  popoverContent?: string;
}

/**
 * Date range interface for calendar selection
 */
export interface IDateRange {
  /** Start date of the range */
  from: Date;
  /** End date of the range */
  to: Date;
}

/**
 * Type representing a selected date or date range
 */
export type SelectedDate = Date | IDateRange | undefined;

/**
 * Calendar component props interface
 * Extends Radix UI Popover props with calendar-specific functionality
 */
export interface ICalendarProps extends Omit<Popover.PopoverProps, "className"> {
  /** Custom class names for styling different parts of the calendar */
  classNames?: ICalendarClasses;
  /** Whether to show days from adjacent months */
  showOutsideDays?: boolean;
  /** Whether to display week numbers */
  showWeekNumbers?: boolean;
  /** Whether to show the trigger button */
  showTriggerButton?: boolean;
  /** Whether to show a fixed number of weeks */
  fixedWeeks?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Currently selected date or date range */
  selected?: SelectedDate;
  /** Callback when a date is selected */
  onSelect?: (date: SelectedDate) => void;
  /** Callback when a day is clicked */
  onDayClick?: (date: Date) => void;
  /** Callback when month changes */
  onMonthChange?: (date: Date) => void;
  /** Locale for date formatting */
  locale?: string;
  /** Whether the calendar is disabled */
  disabled?: boolean;
  /** Array of dates that are disabled */
  disabledDays?: Date[];
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Whether to enable date range selection */
  enableRange?: boolean;
}
