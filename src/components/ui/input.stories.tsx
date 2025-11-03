import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
  },
}

export const Password: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Enter password" />
    </div>
  ),
}

// Play function examples
export const WithTypingTest: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" placeholder="Enter your name" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/enter your name/i)

    // 入力フィールドが存在することを確認
    await expect(input).toBeInTheDocument()

    // テキストを入力
    await userEvent.type(input, 'John Doe')

    // 入力された値を確認
    await expect(input).toHaveValue('John Doe')
  },
}

export const WithClearTest: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="clearable">Clearable Input</Label>
      <Input type="text" id="clearable" placeholder="Type and clear" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/type and clear/i)

    // テキストを入力
    await userEvent.type(input, 'Text to clear')
    await expect(input).toHaveValue('Text to clear')

    // すべてクリア
    await userEvent.clear(input)
    await expect(input).toHaveValue('')
  },
}

export const EmailValidationForm: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-validation">Email</Label>
      <Input
        type="email"
        id="email-validation"
        placeholder="test@example.com"
        required
      />
      <p className="text-sm text-muted-foreground">Enter a valid email address</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/test@example.com/i)

    // 無効なメールアドレスを入力
    await userEvent.type(input, 'invalid-email')
    await expect(input).toHaveValue('invalid-email')

    // クリアして有効なメールアドレスを入力
    await userEvent.clear(input)
    await userEvent.type(input, 'valid@example.com')
    await expect(input).toHaveValue('valid@example.com')
  },
}

export const FormWithMultipleInputs: Story = {
  render: () => (
    <form className="grid w-full max-w-sm gap-4">
      <div className="grid items-center gap-1.5">
        <Label htmlFor="firstName">First Name</Label>
        <Input type="text" id="firstName" placeholder="John" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="lastName">Last Name</Label>
        <Input type="text" id="lastName" placeholder="Doe" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="email-form">Email</Label>
        <Input type="email" id="email-form" placeholder="john@example.com" />
      </div>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 各フィールドに入力
    const firstNameInput = canvas.getByPlaceholderText(/john/i)
    await userEvent.type(firstNameInput, 'John')
    await expect(firstNameInput).toHaveValue('John')

    const lastNameInput = canvas.getByPlaceholderText(/doe/i)
    await userEvent.type(lastNameInput, 'Doe')
    await expect(lastNameInput).toHaveValue('Doe')

    const emailInput = canvas.getByPlaceholderText(/john@example.com/i)
    await userEvent.type(emailInput, 'john.doe@example.com')
    await expect(emailInput).toHaveValue('john.doe@example.com')
  },
}

export const FocusTest: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="focus-test">Focus Test</Label>
      <Input type="text" id="focus-test" placeholder="Click to focus" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/click to focus/i)

    // フォーカスを当てる
    await userEvent.click(input)
    await expect(input).toHaveFocus()

    // テキストを入力
    await userEvent.keyboard('Focused text')
    await expect(input).toHaveValue('Focused text')
  },
}
