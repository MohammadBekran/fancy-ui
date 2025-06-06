/**
 * Calendar Component Stories
 *
 * This module contains Storybook stories for the Calendar component,
 * showcasing various use cases, states, and configurations. Each story
 * demonstrates a specific feature or combination of features to help
 * developers understand the component's capabilities.
 *
 * Stories are organized by feature and include:
 * - Basic usage and configuration
 * - Date selection modes (single/range)
 * - Date constraints and validation
 * - Visual states and styling
 * - Accessibility features
 * - Localization examples
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import Calendar from "@/features/calendar/components";

/**
 * Story configuration for the Calendar component
 * Defines component metadata, documentation, and available controls
 */
const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A highly customizable and accessible calendar component built on top of Radix UI.
Supports date selection, range selection, disabled dates, and more.

## Features
- Date selection with customizable format
- Month/year navigation with dropdown selectors
- Disabled dates and date ranges
- Custom styling through classNames prop
- Full accessibility support (ARIA attributes, keyboard navigation)
- Smooth animations and transitions
- Localization support
- Responsive design

## Usage
\`\`\`tsx
import { Calendar } from "@mohammadbekran/fancy-ui";

function MyComponent() {
  const [date, setDate] = useState<Date>();
  
  return (
    <Calendar
      selected={date}
      onSelect={setDate}
      showOutsideDays
      locale="en-US"
      placeholder="Select a date"
    />
  );
}
\`\`\`

## Accessibility
- Fully keyboard navigable
- ARIA attributes for screen readers
- Focus management
- Color contrast compliance
        `,
      },
    },
  },
  argTypes: {
    locale: {
      control: "select",
      options: ["en-US", "fr-FR", "de-DE", "es-ES", "pt-BR"],
      description: "Locale for date formatting",
    },
    disabled: {
      control: "boolean",
      description: "Whether the calendar is disabled",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Whether to show days from adjacent months",
    },
    fixedWeeks: {
      control: "boolean",
      description: "Whether to show a fixed number of weeks",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

/**
 * Story type definition for Calendar component stories
 */
type TStory = StoryObj<typeof Calendar>;

/**
 * Default calendar configuration
 * Shows basic date selection functionality
 */
export const Default: TStory = {
  args: {
    placeholder: "Select a date",
  },
};

/**
 * Calendar with date range selection enabled
 * Demonstrates range selection functionality
 */
export const WithDateRange: TStory = {
  args: {
    enableRange: true,
    placeholder: "Select date range",
  },
};

/**
 * Calendar with disabled dates
 * Shows how to restrict date selection
 */
export const WithDisabledDates: TStory = {
  args: {
    disabledDays: [new Date(2024, 0, 1), new Date(2024, 0, 2)],
    placeholder: "Select a date",
  },
};

/**
 * Calendar with min/max date constraints
 * Demonstrates date range restrictions
 */
export const WithDateConstraints: TStory = {
  args: {
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
    placeholder: "Select a date",
  },
};

/**
 * Calendar with fixed weeks
 * Demonstrates fixed week display
 */
export const WithFixedWeeks: TStory = {
  args: {
    fixedWeeks: true,
    placeholder: "Select a date",
  },
};

/**
 * Calendar with outside days hidden
 * Shows calendar without adjacent month days
 */
export const WithoutOutsideDays: TStory = {
  args: {
    showOutsideDays: false,
    placeholder: "Select a date",
  },
};

/**
 * Disabled calendar state
 * Demonstrates disabled state styling
 */
export const Disabled: TStory = {
  args: {
    disabled: true,
    placeholder: "Select a date",
  },
};
