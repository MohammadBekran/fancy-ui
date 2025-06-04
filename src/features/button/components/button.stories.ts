import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@/features/button/components";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
  },
};

export default meta;
type TStory = StoryObj<typeof Button>;

export const Primary: TStory = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: TStory = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Outline: TStory = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Small: TStory = {
  args: {
    size: "sm",
    children: "Button",
  },
};

export const Medium: TStory = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: TStory = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const Loading: TStory = {
  args: {
    isLoading: true,
    children: "Loading",
  },
};
