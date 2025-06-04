import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Button from "@/features/button/components";
import Modal from "@/features/modal/components";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    showCloseButton: {
      control: "boolean",
    },
    closeOnOutsideClick: {
      control: "boolean",
    },
  },
};

export default meta;
type TStory = StoryObj<typeof Modal>;

export const WithTrigger: TStory = {
  render: () => (
    <Modal trigger={<Button>Open Modal</Button>} title="Modal with Trigger">
      <p>This modal opens with a trigger</p>
    </Modal>
  ),
};

export const Controlled: TStory = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = () => setIsOpen(!isOpen);

    return (
      <>
        <Button onClick={handleOpenChange}>Open Modal</Button>
        <Modal isOpen={isOpen} title="Controlled Modal" onClose={handleOpenChange}>
          <p>This modal opens with a trigger</p>
          <div className="flex justify-end mt-4">
            <Button onClick={handleOpenChange} variant="secondary">
              Close
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: TStory = {
  render: () => (
    <Modal trigger={<Button>Open Modal</Button>} title="No Close Button" showCloseButton={false}>
      <p>This modal has no close button</p>
    </Modal>
  ),
};

export const CustomStyling: TStory = {
  render: () => (
    <Modal
      trigger={<Button>Open Modal</Button>}
      title="Custom Styled Modal"
      classes={{
        content: "bg-gray-100",
        overlay: "bg-black/70",
      }}
    >
      <p>This modal has custom styling</p>
    </Modal>
  ),
};
