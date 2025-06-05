import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";

import Input from "@/features/input/components";
import Button from "@/features/button/components";

/**
 * The Input component is a highly customizable, accessible, and reusable form input component.
 * It supports various features like validation, error handling, helper text, password visibility toggle,
 * loading states, and more. Built with accessibility in mind and following React best practices.
 *
 * @example
 * ```tsx
 * <Input
 *   name="email"
 *   label="Email"
 *   type="email"
 *   validationType="email"
 *   required
 *   helperText="We'll never share your email"
 * />
 * ```
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Form.Root>
        <Story />
      </Form.Root>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
A flexible and accessible input component that supports various types and states.
Built with TypeScript and styled with TailwindCSS.

## Features
- Multiple input types (text, email, password, number, tel, url, search)
- Password visibility toggle
- Character count
- Loading state
- Error handling with animations
- Helper text
- Label support
- Full width option
- Customizable styling
- Accessibility support
- Smooth animations

## Usage
\`\`\`tsx
import * as Form from "@radix-ui/react-form";

import { Input } from "@mohammadbekran/fancy-ui";

function MyForm() {
  return (
    <Form.Root>
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
    </Form.Root>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "The type of input to render",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take full width of its container",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showPasswordToggle: {
      control: "boolean",
      description: "Whether to show password toggle button for password inputs",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showCharacterCount: {
      control: "boolean",
      description: "Whether to show character count",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Whether to show loading state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: "text",
      description: "Error message to display below the input",
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the input",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    classes: {
      description: "Custom classes for styling different parts of the input",
      control: "object",
    },
  },
};

export default meta;

type TStory = StoryObj<typeof Input>;

export const Default: TStory = {
  args: {
    name: "default",
    label: "Default Input",
    placeholder: "Enter text here",
  },
};

export const WithError: TStory = {
  args: {
    name: "with-error",
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters long",
  },
};

export const WithHelperText: TStory = {
  args: {
    name: "with-helper",
    label: "Username",
    helperText: "Choose a unique username",
  },
};

export const WithPasswordToggle: TStory = {
  args: {
    name: "password",
    label: "Password",
    type: "password",
    showPasswordToggle: true,
    validationType: "strongPassword",
    placeholder: "Enter your password",
    helperText:
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
  },
};

export const WithCharacterCount: TStory = {
  args: {
    name: "character-count",
    label: "Bio",
    showCharacterCount: true,
    maxLength: 100,
    placeholder: "Tell us about yourself",
  },
};

export const WithLoading: TStory = {
  args: {
    name: "loading",
    label: "Loading Input",
    isLoading: true,
    placeholder: "Loading...",
  },
};

export const FullWidth: TStory = {
  args: {
    name: "full-width",
    label: "Full Width Input",
    fullWidth: true,
    placeholder: "This input takes full width",
  },
};

export const FormExample: TStory = {
  render: () => (
    <Form.Root className="space-y-4 max-w-md">
      <Input name="full-name" label="Full Name" required placeholder="Enter your full name" />
      <Input
        name="email"
        label="Email"
        type="email"
        required
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        required
        showPasswordToggle
        validationType="strongPassword"
        placeholder="Enter your password"
        helperText="Must be at least 8 characters with uppercase, lowercase, number, and special character"
      />
      <Input
        name="bio"
        label="Bio"
        maxLength={100}
        showCharacterCount
        placeholder="Tell us about yourself..."
      />
      <Form.Submit asChild>
        <Button type="button">Submit</Button>
      </Form.Submit>
    </Form.Root>
  ),
};

export const InteractiveExample: TStory = {
  render: () => {
    const [error, setError] = useState("");
    const [value, setValue] = useState("");

    // Validate input
    const validateInput = (value: string) => {
      if (value.length < 3) {
        setError("Input must be at least 3 characters long");
      } else {
        setError("");
      }
    };

    // Handle inout change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      validateInput(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      console.log("Form submitted");
    };

    return (
      <Form.Root onSubmit={handleSubmit}>
        <Input
          name="interactive"
          label="Interactive Input"
          placeholder="Type to see validation"
          value={value}
          onChange={handleInputChange}
          error={error}
        />
      </Form.Root>
    );
  },
};
