/**
 * Button Component Stories
 *
 * This module contains Storybook stories for the Button component, showcasing
 * its various variants, sizes, and states. Each story demonstrates a specific
 * aspect of the component's functionality and provides interactive examples
 * for developers.
 *
 * The stories are designed to serve as both documentation and a visual testing
 * ground for the component's features.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@/features/button/components";

/**
 * Button component metadata and configuration
 * Defines the component's display in Storybook and available controls
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A flexible and accessible button component that supports various variants and states.
Built with TypeScript and styled with TailwindCSS.

## Features
- Multiple variants (primary, secondary, danger, ghost)
- Different sizes (sm, md, lg)
- Loading state
- Disabled state
- Icon support
- Full width option
- Custom styling support
- Accessibility support

## Usage
\`\`\`tsx
import { Button } from "@mohammadbekran/fancy-ui";

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-4">
      <Button onClick={handleClick} isLoading={isLoading}>
        Click Me
      </Button>
      
      <Button variant="secondary" disabled>
        Disabled Button
      </Button>
      
      <Button variant="danger" size="lg">
        Delete
      </Button>
      
      <Button variant="ghost" leftIcon={<span className="i-heroicons-heart-20-solid" />}>
        Like
      </Button>
    </div>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

/**
 * Story type definition for Button component stories
 */
type TStory = StoryObj<typeof Button>;

/**
 * Primary Button Story
 * Demonstrates the default primary button variant with solid background
 */
export const Primary: TStory = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

/**
 * Secondary Button Story
 * Shows the secondary button variant with a different color scheme
 */
export const Secondary: TStory = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

/**
 * Outline Button Story
 * Displays the outline variant with transparent background and border
 */
export const Outline: TStory = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

/**
 * Small Button Story
 * Demonstrates the smallest size variant
 */
export const Small: TStory = {
  args: {
    size: "sm",
    children: "Button",
  },
};

/**
 * Medium Button Story
 * Shows the default medium size variant
 */
export const Medium: TStory = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

/**
 * Large Button Story
 * Displays the largest size variant
 */
export const Large: TStory = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

/**
 * Loading Button Story
 * Demonstrates the button's loading state with spinner
 */
export const Loading: TStory = {
  args: {
    isLoading: true,
    children: "Loading",
  },
};
