import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'
import { Button } from './button'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>This is a simple card with only content.</p>
      </CardContent>
    </Card>
  ),
}

export const WithButton: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">Check your inbox for new messages.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>View Messages</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // カードのタイトルが表示されていることを確認
    const title = canvas.getByText(/notifications/i)
    await expect(title).toBeInTheDocument()

    // ボタンが2つ存在することを確認
    const buttons = canvas.getAllByRole('button')
    await expect(buttons).toHaveLength(2)
  },
}

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>$99.99</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is a fantastic product that you will love. It comes with amazing
          features and great quality.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 価格が表示されていることを確認
    const price = canvas.getByText(/\$99\.99/i)
    await expect(price).toBeInTheDocument()

    // カートに追加ボタンが存在することを確認
    const addButton = canvas.getByRole('button', { name: /add to cart/i })
    await expect(addButton).toBeInTheDocument()
    await expect(addButton).toBeEnabled()
  },
}

export const UserProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>@johndoe</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Followers</span>
            <span className="font-medium">1,234</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Following</span>
            <span className="font-medium">567</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Follow</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // ユーザー名が表示されていることを確認
    const username = canvas.getByText(/john doe/i)
    await expect(username).toBeInTheDocument()

    // フォロワー数が表示されていることを確認
    const followers = canvas.getByText(/1,234/)
    await expect(followers).toBeInTheDocument()

    // フォローボタンが存在することを確認
    const followButton = canvas.getByRole('button', { name: /follow/i })
    await expect(followButton).toBeInTheDocument()
  },
}

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for card 1</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for card 2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for card 3</p>
        </CardContent>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 3つのカードすべてが表示されていることを確認
    const card1 = canvas.getByText(/card 1/i)
    const card2 = canvas.getByText(/card 2/i)
    const card3 = canvas.getByText(/card 3/i)

    await expect(card1).toBeInTheDocument()
    await expect(card2).toBeInTheDocument()
    await expect(card3).toBeInTheDocument()
  },
}

export const FormCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Account</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // フォームフィールドが存在することを確認
    const nameInput = canvas.getByPlaceholderText(/john doe/i)
    const emailInput = canvas.getByPlaceholderText(/john@example.com/i)

    await expect(nameInput).toBeInTheDocument()
    await expect(emailInput).toBeInTheDocument()

    // 送信ボタンが存在することを確認
    const submitButton = canvas.getByRole('button', { name: /create account/i })
    await expect(submitButton).toBeInTheDocument()
  },
}
