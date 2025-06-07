import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Button from "@/features/button/components";
import Modal from "@/features/modal/components";

describe("Modal", () => {
  it("renders with trigger", () => {
    render(
      <Modal title="Hello" trigger={<Button>Open</Button>}>
        Content
      </Modal>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        size="sm"
        title="Small Modal"
        description="A small modal"
      >
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("w-[90%] max-w-[300px]");

    rerender(
      <Modal
        isOpen={true}
        onClose={() => {}}
        size="md"
        title="Medium Modal"
        description="A medium modal"
      >
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("w-[90%] max-w-[500px]");

    rerender(
      <Modal
        isOpen={true}
        onClose={() => {}}
        size="lg"
        title="Large Modal"
        description="A large modal"
      >
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("w-[90%] max-w-[800px]");

    rerender(
      <Modal
        isOpen={true}
        onClose={() => {}}
        size="xl"
        title="Extra Large Modal"
        description="An extra large modal"
      >
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("w-[90%] max-w-[1200px]");

    rerender(
      <Modal
        isOpen={true}
        onClose={() => {}}
        size="full"
        title="Full Modal"
        description="A full screen modal"
      >
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("w-[95%] h-[95vh]");
  });

  it("handles custom styling", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Custom Modal"
        description="A custom styled modal"
        classNames={{
          content: "custom-content",
        }}
      >
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("custom-content");
  });
});
