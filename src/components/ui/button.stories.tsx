import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from './button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🚀',
  },
}

// Play function examples
export const WithClickTest: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })

    // ボタンが存在することを確認
    await expect(button).toBeInTheDocument()

    // ボタンをクリック
    await userEvent.click(button)

    // ボタンがクリック可能であることを確認
    await expect(button).toBeEnabled()
  },
}

export const DisabledButton: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /disabled/i })

    // ボタンが無効化されていることを確認
    await expect(button).toBeDisabled()
  },
}

export const WithOnClick: Story = {
  args: {
    children: 'Click Counter',
    onClick: () => {
      // この関数はStorybookのActionsアドオンでログされる
      console.log('Button clicked!')
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click counter/i })

    // ボタンを3回クリック
    await userEvent.click(button)
    await userEvent.click(button)
    await userEvent.click(button)

    // onClickが呼ばれたことは、Actionsパネルで確認できる
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🚀</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // すべてのボタンが表示されていることを確認
    const buttons = canvas.getAllByRole('button')
    await expect(buttons).toHaveLength(10)

    // 各ボタンがクリック可能であることを確認
    for (const button of buttons) {
      await expect(button).toBeEnabled()
    }
  },
}
