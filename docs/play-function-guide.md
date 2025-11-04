# Storybook Play Function 使用ガイド

このガイドでは、Storybookのplay functionを使用したインタラクションテストの書き方を説明します。

## 目次

1. [Play Functionとは](#play-functionとは)
2. [基本的な使い方](#基本的な使い方)
3. [@storybook/test API](#storybooktest-api)
4. [実践的な例](#実践的な例)
5. [よくあるパターン](#よくあるパターン)
6. [トラブルシューティング](#トラブルシューティング)
7. [ベストプラクティス](#ベストプラクティス)

---

## Play Functionとは

Play functionは、Storybookでコンポーネントのユーザーインタラクションを自動的にシミュレートする機能です。

### 主な用途

- **インタラクションテスト**: ボタンクリック、フォーム入力などのテスト
- **統合テスト**: 複数のコンポーネント間の相互作用テスト
- **ビジュアルテスト**: Chromaticと組み合わせた視覚的テスト
- **デモ**: ストーリーで自動的にインタラクションをデモ

### メリット

✅ **再現可能**: 手動テストと異なり、常に同じ手順で実行
✅ **自動化**: CI/CDパイプラインで自動実行可能
✅ **ドキュメント**: コードがそのまま使用例のドキュメントになる
✅ **デバッグ**: Interactionsパネルでステップバイステップ確認

---

## 基本的な使い方

### 1. 必要なパッケージ

```bash
npm install -D @storybook/test
```

### 2. 基本的なPlay Function

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof meta>

export const WithClick: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    // 1. canvasを取得
    const canvas = within(canvasElement)

    // 2. 要素を取得
    const button = canvas.getByRole('button', { name: /click me/i })

    // 3. インタラクション
    await userEvent.click(button)

    // 4. アサーション
    await expect(button).toBeEnabled()
  },
}
```

### 3. Play Functionの構造

```typescript
play: async ({ canvasElement, args, step }) => {
  // canvasElement: ストーリーのDOM要素
  // args: ストーリーのargs
  // step: テストをステップに分割（オプション）
}
```

---

## @storybook/test API

### userEvent (ユーザーインタラクション)

#### クリック

```typescript
import { userEvent } from '@storybook/test'

// 基本的なクリック
await userEvent.click(button)

// ダブルクリック
await userEvent.dblClick(button)

// 右クリック
await userEvent.pointer({ keys: '[MouseRight]', target: element })
```

#### テキスト入力

```typescript
// テキスト入力
await userEvent.type(input, 'Hello World')

// クリア
await userEvent.clear(input)

// 一文字ずつ入力（デフォルト）
await userEvent.type(input, 'Slow typing')

// 高速入力
await userEvent.type(input, 'Fast typing', { delay: 0 })

// 特殊キー
await userEvent.type(input, '{Enter}')
await userEvent.type(input, '{Tab}')
await userEvent.type(input, '{Escape}')
```

#### キーボード操作

```typescript
// キーボード入力
await userEvent.keyboard('Hello')

// 特殊キーの組み合わせ
await userEvent.keyboard('{Control>}A{/Control}') // Ctrl+A
await userEvent.keyboard('{Shift>}Tab{/Shift}') // Shift+Tab
```

#### フォーカス/ホバー

```typescript
// フォーカス
await userEvent.click(input) // クリックでフォーカス
input.focus() // 直接フォーカス

// ホバー
await userEvent.hover(element)
await userEvent.unhover(element)
```

#### セレクト/チェックボックス

```typescript
// セレクトボックス
await userEvent.selectOptions(select, 'option1')
await userEvent.selectOptions(select, ['option1', 'option2']) // 複数選択

// チェックボックス/ラジオボタン
await userEvent.click(checkbox)
```

### within (要素の検索)

```typescript
import { within } from '@storybook/test'

const canvas = within(canvasElement)

// ロール（推奨）
canvas.getByRole('button', { name: /submit/i })
canvas.getByRole('textbox', { name: /email/i })
canvas.getByRole('heading', { level: 1 })

// テキスト
canvas.getByText(/hello world/i)
canvas.getByText('Exact text')

// ラベル（フォーム要素）
canvas.getByLabelText(/email/i)

// プレースホルダー
canvas.getByPlaceholderText(/enter your name/i)

// テストID（最終手段）
canvas.getByTestId('custom-element')

// 複数要素
canvas.getAllByRole('button')

// クエリ（存在しない可能性がある場合）
canvas.queryByRole('button') // なければnull
```

### expect (アサーション)

```typescript
import { expect } from '@storybook/test'

// 存在確認
await expect(element).toBeInTheDocument()
await expect(element).not.toBeInTheDocument()

// 表示/非表示
await expect(element).toBeVisible()
await expect(element).not.toBeVisible()

// 有効/無効
await expect(button).toBeEnabled()
await expect(button).toBeDisabled()

// 値
await expect(input).toHaveValue('text')
await expect(input).toHaveValue('') // 空

// テキスト
await expect(element).toHaveTextContent('Hello')
await expect(element).toHaveTextContent(/hello/i)

// 属性
await expect(element).toHaveAttribute('aria-label', 'Close')

// CSS
await expect(element).toHaveClass('active')
await expect(element).toHaveStyle({ color: 'red' })

// フォーカス
await expect(input).toHaveFocus()

// チェック状態
await expect(checkbox).toBeChecked()
await expect(checkbox).not.toBeChecked()
```

### waitFor (非同期待機)

```typescript
import { waitFor } from '@storybook/test'

// 条件が満たされるまで待機
await waitFor(async () => {
  const dialog = within(document.body).getByRole('dialog')
  await expect(dialog).toBeInTheDocument()
})

// タイムアウト指定
await waitFor(
  async () => {
    // アサーション
  },
  { timeout: 3000 }
)

// 特定時間待機
await new Promise(resolve => setTimeout(resolve, 1000))
```

---

## 実践的な例

### 例1: フォーム送信テスト

```typescript
export const FormSubmission: Story = {
  render: () => (
    <form onSubmit={(e) => {
      e.preventDefault()
      alert('Form submitted!')
    }}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // フィールドを取得
    const emailInput = canvas.getByPlaceholderText(/email/i)
    const passwordInput = canvas.getByPlaceholderText(/password/i)
    const submitButton = canvas.getByRole('button', { name: /submit/i })

    // 入力
    await userEvent.type(emailInput, 'user@example.com')
    await userEvent.type(passwordInput, 'password123')

    // 値の確認
    await expect(emailInput).toHaveValue('user@example.com')
    await expect(passwordInput).toHaveValue('password123')

    // 送信
    await userEvent.click(submitButton)
  },
}
```

### 例2: モーダル開閉テスト

```typescript
export const ModalInteraction: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="open-modal">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogDescription>Modal content here</DialogDescription>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // モーダルを開く
    const openButton = canvas.getByTestId('open-modal')
    await userEvent.click(openButton)

    // モーダルが表示されるのを待つ
    await waitFor(async () => {
      const dialog = within(document.body).getByRole('dialog')
      await expect(dialog).toBeInTheDocument()
    })

    // モーダル内のコンテンツを確認
    const title = within(document.body).getByText(/modal title/i)
    await expect(title).toBeInTheDocument()

    // モーダルを閉じる
    const closeButton = within(document.body).getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    // モーダルが消えることを確認
    await waitFor(async () => {
      const dialog = within(document.body).queryByRole('dialog')
      expect(dialog).not.toBeInTheDocument()
    })
  },
}
```

### 例3: バリデーションテスト

```typescript
export const ValidationTest: Story = {
  render: () => {
    const [error, setError] = React.useState('')

    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        const email = (e.target as any).email.value
        if (!email.includes('@')) {
          setError('Invalid email')
        } else {
          setError('')
        }
      }}>
        <input name="email" placeholder="Email" />
        <button type="submit">Submit</button>
        {error && <p role="alert">{error}</p>}
      </form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 無効なメールアドレスを入力
    const emailInput = canvas.getByPlaceholderText(/email/i)
    await userEvent.type(emailInput, 'invalid-email')

    // 送信
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)

    // エラーメッセージの確認
    await waitFor(async () => {
      const errorMessage = canvas.getByRole('alert')
      await expect(errorMessage).toHaveTextContent(/invalid email/i)
    })

    // 修正
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'valid@example.com')
    await userEvent.click(submitButton)

    // エラーが消えることを確認
    await waitFor(async () => {
      const errorMessage = canvas.queryByRole('alert')
      expect(errorMessage).not.toBeInTheDocument()
    })
  },
}
```

### 例4: ステップを使った構造化

```typescript
export const MultiStepTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Step 1: Fill in email', async () => {
      const emailInput = canvas.getByLabelText(/email/i)
      await userEvent.type(emailInput, 'user@example.com')
      await expect(emailInput).toHaveValue('user@example.com')
    })

    await step('Step 2: Fill in password', async () => {
      const passwordInput = canvas.getByLabelText(/password/i)
      await userEvent.type(passwordInput, 'password123')
      await expect(passwordInput).toHaveValue('password123')
    })

    await step('Step 3: Submit form', async () => {
      const submitButton = canvas.getByRole('button', { name: /submit/i })
      await userEvent.click(submitButton)
    })
  },
}
```

---

## よくあるパターン

### パターン1: 複数の要素をテスト

```typescript
export const MultipleButtons: Story = {
  render: () => (
    <div>
      <Button data-testid="btn-1">Button 1</Button>
      <Button data-testid="btn-2">Button 2</Button>
      <Button data-testid="btn-3">Button 3</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // すべてのボタンを取得
    const buttons = canvas.getAllByRole('button')
    await expect(buttons).toHaveLength(3)

    // 各ボタンをクリック
    for (const button of buttons) {
      await userEvent.click(button)
      await expect(button).toBeEnabled()
    }
  },
}
```

### パターン2: コンポーネント外の要素（ポータル）

```typescript
export const PortalTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // トリガーをクリック
    const trigger = canvas.getByRole('button')
    await userEvent.click(trigger)

    // ポータル（document.body直下）の要素を取得
    await waitFor(async () => {
      const portal = within(document.body).getByRole('dialog')
      await expect(portal).toBeInTheDocument()
    })
  },
}
```

### パターン3: デバウンス/非同期処理

```typescript
export const AsyncTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const input = canvas.getByRole('textbox')
    await userEvent.type(input, 'search query')

    // デバウンス後の結果を待つ
    await waitFor(
      async () => {
        const results = canvas.getByTestId('search-results')
        await expect(results).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  },
}
```

### パターン4: Argsを使った動的テスト

```typescript
export const DynamicTest: Story = {
  args: {
    onClick: fn(), // Storybookのモック関数
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const button = canvas.getByRole('button')
    await userEvent.click(button)

    // モック関数が呼ばれたか確認
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}
```

---

## トラブルシューティング

### 問題1: 要素が見つからない

**エラー:**
```
TestingLibraryElementError: Unable to find an element
```

**解決策:**
```typescript
// ❌ 悪い例
canvas.getByRole('button') // すぐに取得しようとする

// ✅ 良い例: 待機する
await waitFor(async () => {
  const button = canvas.getByRole('button')
  await expect(button).toBeInTheDocument()
})

// または、queryを使って存在確認
const button = canvas.queryByRole('button')
if (button) {
  await userEvent.click(button)
}
```

### 問題2: ポータル要素にアクセスできない

**解決策:**
```typescript
// ❌ 悪い例: canvas内を探す
const modal = canvas.getByRole('dialog') // 見つからない

// ✅ 良い例: document.body内を探す
const modal = within(document.body).getByRole('dialog')
```

### 問題3: タイミングの問題

**解決策:**
```typescript
// ❌ 悪い例: すぐにアサーション
await userEvent.click(button)
await expect(modal).toBeVisible() // まだ表示されていない

// ✅ 良い例: 待機してからアサーション
await userEvent.click(button)
await waitFor(async () => {
  await expect(modal).toBeVisible()
})
```

### 問題4: クリーンアップされない状態

**解決策:**
```typescript
// 各テスト後にクリーンアップ
play: async ({ canvasElement }) => {
  // テスト実行

  // クリーンアップ（必要な場合）
  const modal = within(document.body).queryByRole('dialog')
  if (modal) {
    const closeButton = within(modal).getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)
  }
}
```

---

## ベストプラクティス

### 1. アクセシビリティを優先

```typescript
// ✅ 推奨: セマンティックロールを使用
canvas.getByRole('button', { name: /submit/i })
canvas.getByRole('textbox', { name: /email/i })

// ❌ 非推奨: data-testidは最終手段
canvas.getByTestId('submit-button')
```

### 2. ユーザーの視点でテストを書く

```typescript
// ✅ 推奨: ユーザーがするように操作
await userEvent.type(input, 'user@example.com')
await userEvent.click(button)

// ❌ 非推奨: 内部実装に依存
input.value = 'user@example.com'
button.onclick()
```

### 3. 明確なテスト名とステップ

```typescript
// ✅ 推奨: 何をテストするか明確
export const SubmitFormWithValidation: Story = {
  play: async ({ canvasElement, step }) => {
    await step('Enter invalid email', async () => {
      // ...
    })

    await step('Verify error message appears', async () => {
      // ...
    })
  },
}

// ❌ 非推奨: 曖昧な名前
export const Test1: Story = {}
```

### 4. 適切な待機

```typescript
// ✅ 推奨: waitForで条件待機
await waitFor(async () => {
  await expect(element).toBeVisible()
})

// ❌ 非推奨: 固定時間待機
await new Promise(resolve => setTimeout(resolve, 1000))
```

### 5. 失敗時のデバッグ情報

```typescript
// デバッグ用にスクリーンショットを追加（Chromaticで確認）
play: async ({ canvasElement }) => {
  try {
    // テスト実行
  } catch (error) {
    console.error('Test failed at step X')
    throw error
  }
}
```

### 6. 再利用可能なヘルパー関数

```typescript
// helpers.ts
export async function fillLoginForm(
  canvas: ReturnType<typeof within>,
  email: string,
  password: string
) {
  const emailInput = canvas.getByLabelText(/email/i)
  const passwordInput = canvas.getByLabelText(/password/i)

  await userEvent.type(emailInput, email)
  await userEvent.type(passwordInput, password)
}

// story.tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await fillLoginForm(canvas, 'user@example.com', 'password123')
}
```

---

## まとめ

Play functionは強力なインタラクションテストツールです：

✅ **自動化されたテスト** - CI/CDで自動実行
✅ **生きたドキュメント** - コードが使用例になる
✅ **視覚的なデバッグ** - Interactionsパネルで確認
✅ **Chromaticとの統合** - ビジュアルテストと組み合わせ

このガイドのパターンを参考に、堅牢なインタラクションテストを構築してください！

## 参考リンク

- [Storybook Play Function公式ドキュメント](https://storybook.js.org/docs/writing-stories/play-function)
- [@storybook/test API](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Testing Library クエリ](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)
