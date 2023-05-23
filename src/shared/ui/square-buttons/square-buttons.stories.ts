import type { Meta, StoryObj } from "@storybook/react";

import { SquareButton } from ".";

const meta: Meta<typeof SquareButton> = {
  title: "Buttons/SquareButton",
  component: SquareButton,
  tags: ["autodocs"],
  argTypes: {
    icon: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CloseButton: Story = {
  args: {
    buttonType: "close",
  },
};

export const EditButton: Story = {
  args: {
    buttonType: "edit",
  },
};

export const ConfirmButton: Story = {
  args: {
    buttonType: "confirm",
  },
};

export const Disabled: Story = {
  args: {
    buttonType: "edit",
    disabled: true,
  },
};
