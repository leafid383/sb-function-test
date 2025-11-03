'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within, waitFor } from '@storybook/test'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './dialog'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description that explains what the dialog is for.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">Dialog content goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="@johndoe" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Play function example: ダイアログを開いて閉じるテスト
export const OpenAndCloseTest: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="open-dialog">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This dialog will be opened and closed by the test.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Dialog content</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // トリガーボタンが存在することを確認
    const triggerButton = canvas.getByTestId('open-dialog')
    await expect(triggerButton).toBeInTheDocument()

    // ダイアログを開く
    await userEvent.click(triggerButton)

    // ダイアログが表示されることを確認（少し待つ）
    await waitFor(async () => {
      const dialog = within(document.body).getByRole('dialog')
      await expect(dialog).toBeInTheDocument()
    })

    // ダイアログのタイトルを確認
    const dialogTitle = within(document.body).getByText(/test dialog/i)
    await expect(dialogTitle).toBeInTheDocument()

    // 閉じるボタン（X）をクリック
    const closeButton = within(document.body).getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    // ダイアログが閉じられることを確認
    await waitFor(async () => {
      const dialog = within(document.body).queryByRole('dialog')
      expect(dialog).not.toBeInTheDocument()
    })
  },
}

// Play function example: フォーム入力テスト
export const FormInputTest: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="open-form-dialog">Open Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>Enter your information below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="form-name">Name</Label>
            <Input id="form-name" placeholder="Enter name" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="form-email">Email</Label>
            <Input id="form-email" type="email" placeholder="Enter email" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" data-testid="submit-form">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // ダイアログを開く
    const triggerButton = canvas.getByTestId('open-form-dialog')
    await userEvent.click(triggerButton)

    // ダイアログが開くのを待つ
    await waitFor(async () => {
      const dialog = within(document.body).getByRole('dialog')
      await expect(dialog).toBeInTheDocument()
    })

    // フォームに入力
    const nameInput = within(document.body).getByPlaceholderText(/enter name/i)
    await userEvent.type(nameInput, 'John Doe')
    await expect(nameInput).toHaveValue('John Doe')

    const emailInput = within(document.body).getByPlaceholderText(/enter email/i)
    await userEvent.type(emailInput, 'john@example.com')
    await expect(emailInput).toHaveValue('john@example.com')

    // Submitボタンが有効であることを確認
    const submitButton = within(document.body).getByTestId('submit-form')
    await expect(submitButton).toBeEnabled()
  },
}

// Controlled Dialog with State
export const ControlledDialog: Story = {
  render: function ControlledDialogStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)} data-testid="controlled-open">
          Open Controlled Dialog
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled externally.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>You can control this dialog programmatically.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)} data-testid="controlled-close">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 開くボタンをクリック
    const openButton = canvas.getByTestId('controlled-open')
    await userEvent.click(openButton)

    // ダイアログが開くのを待つ
    await waitFor(async () => {
      const dialog = within(document.body).getByRole('dialog')
      await expect(dialog).toBeInTheDocument()
    })

    // 閉じるボタンをクリック
    const closeButton = within(document.body).getByTestId('controlled-close')
    await userEvent.click(closeButton)

    // ダイアログが閉じることを確認
    await waitFor(async () => {
      const dialog = within(document.body).queryByRole('dialog')
      expect(dialog).not.toBeInTheDocument()
    })
  },
}

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" data-testid="delete-button">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" data-testid="cancel-button">
            Cancel
          </Button>
          <Button variant="destructive" data-testid="confirm-button">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 削除ボタンをクリック
    const deleteButton = canvas.getByTestId('delete-button')
    await userEvent.click(deleteButton)

    // 確認ダイアログが表示されることを確認
    await waitFor(async () => {
      const dialog = within(document.body).getByRole('dialog')
      await expect(dialog).toBeInTheDocument()
    })

    // 警告メッセージが表示されていることを確認
    const warningText = within(document.body).getByText(/this action cannot be undone/i)
    await expect(warningText).toBeInTheDocument()

    // キャンセルボタンと確認ボタンが存在することを確認
    const cancelButton = within(document.body).getByTestId('cancel-button')
    const confirmButton = within(document.body).getByTestId('confirm-button')

    await expect(cancelButton).toBeInTheDocument()
    await expect(confirmButton).toBeInTheDocument()

    // キャンセルボタンをクリックして閉じる
    await userEvent.click(cancelButton)
  },
}
