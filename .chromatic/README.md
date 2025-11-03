# Chromatic設定

このディレクトリには、Chromaticに関する設定とドキュメントが含まれています。

## Chromaticとは？

Chromaticは、Storybookのビジュアルテストと公開を自動化するサービスです。UIコンポーネントの視覚的な変更を検出し、レビューワークフローを提供します。

### 主な機能

1. **ビジュアルリグレッションテスト**
   - UIの視覚的な変更を自動検出
   - ピクセル単位での差分比較
   - ベースラインとの比較

2. **インタラクションテスト**
   - Storybookのplay functionを自動実行
   - ユーザーインタラクションのテスト
   - テスト結果の可視化

3. **Storybook公開**
   - 公開可能なStorybookをホスティング
   - チーム内での共有
   - PRコメントでの自動リンク

4. **UIレビュー**
   - PR内での視覚的レビュー
   - 変更の承認/却下
   - コメント機能

## セットアップ手順

### 1. Chromaticアカウントを作成

1. [chromatic.com](https://www.chromatic.com/)にアクセス
2. GitHubアカウントでサインアップ
3. 「Add project」をクリック
4. GitHubリポジトリを選択
5. プロジェクトトークンをコピー

### 2. プロジェクトトークンを設定

#### ローカル開発の場合

`.env.local`ファイルを作成（gitignoreに追加されています）：

```bash
CHROMATIC_PROJECT_TOKEN=your_project_token_here
```

ローカルで実行：
```bash
npm run chromatic
```

#### GitHub Actionsの場合

1. GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」に移動
2. 「New repository secret」をクリック
3. 以下を入力：
   - **Name:** `CHROMATIC_PROJECT_TOKEN`
   - **Secret:** Chromaticから取得したプロジェクトトークン
4. 「Add secret」をクリック

### 3. GitHub Actionsワークフローの確認

`.github/workflows/chromatic.yml`ファイルが自動的に実行されます：

- **トリガー:** すべてのプッシュ
- **実行内容:**
  - Storybookのビルド
  - Chromaticへのアップロード
  - ビジュアルテストの実行
  - インタラクションテストの実行

### 4. 初回ベースラインの作成

最初のプッシュで、Chromaticがベースライン（基準となるスクリーンショット）を作成します：

```bash
git add .
git commit -m "Initial Chromatic setup"
git push
```

GitHub Actionsが実行され、Chromaticにストーリーがアップロードされます。

## 使い方

### ローカルでChromaticを実行

```bash
# プロジェクトトークンを環境変数に設定してから実行
export CHROMATIC_PROJECT_TOKEN=your_token
npm run chromatic

# またはワンライナーで
CHROMATIC_PROJECT_TOKEN=your_token npm run chromatic
```

### PRワークフロー

1. **ブランチを作成してコードを変更**
   ```bash
   git checkout -b feature/new-button-style
   # コンポーネントを修正
   git commit -m "Update button styles"
   git push
   ```

2. **GitHub ActionsでChromaticが自動実行**
   - ビジュアル変更を検出
   - インタラクションテストを実行
   - PRにコメントでリンクを投稿

3. **Chromaticで変更を確認**
   - PRのChromaticリンクをクリック
   - 変更前後の差分を確認
   - 承認または却下

4. **変更を承認してマージ**
   - Chromaticで「Accept」をクリック
   - GitHubでPRをマージ

## Chromaticダッシュボード

Chromaticダッシュボードでは以下が確認できます：

### Builds（ビルド）
- 各コミットのビルド履歴
- ビルドステータス（成功/失敗/変更あり）
- ビルド時間

### Library（ライブラリ）
- すべてのコンポーネントとストーリー
- 各ストーリーのスクリーンショット
- ストーリーの履歴

### Tests（テスト）
- ビジュアルテストの結果
- インタラクションテストの結果
- テスト失敗の詳細

### Manage（管理）
- プロジェクト設定
- チームメンバー管理
- 通知設定

## 高度な設定

### Chromaticの設定オプション

`package.json`の`chromatic`スクリプトにオプションを追加できます：

```json
{
  "scripts": {
    "chromatic": "chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --auto-accept-changes main"
  }
}
```

**よく使うオプション:**

- `--auto-accept-changes <branch>` - 指定ブランチの変更を自動承認
- `--exit-zero-on-changes` - 変更があってもエラーコード0で終了
- `--only-changed` - 変更されたストーリーのみテスト
- `--skip` - Chromaticをスキップ（CI制御用）
- `--build-script-name <name>` - カスタムビルドスクリプト

### インタラクションテストの有効化

`.github/workflows/chromatic.yml`に既に設定済み：

```yaml
- name: Run Chromatic
  uses: chromaui/action@latest
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    interactionTestsEnabled: true
```

### 特定のストーリーをスキップ

ストーリーファイルで設定：

```typescript
export const MyStory: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: true  // このストーリーのスナップショットを無効化
    },
  },
}
```

## トラブルシューティング

### ビルドが失敗する

**問題:** Storybookのビルドエラー
**解決策:**
```bash
npm run build-storybook
# エラーを確認して修正
```

### プロジェクトトークンエラー

**問題:** `Project token is required`
**解決策:**
1. `.env.local`にトークンが設定されているか確認
2. GitHub Secretsに正しく設定されているか確認
3. トークンが有効期限切れでないか確認

### 変更が検出されない

**問題:** UIを変更したが、Chromaticが変更を検出しない
**解決策:**
1. ブラウザのキャッシュをクリア
2. Storybookをローカルで確認（`npm run storybook`）
3. Chromaticで「Re-run」を実行

### GitHub Actionsが実行されない

**問題:** プッシュしてもワークフローが動かない
**解決策:**
1. `.github/workflows/chromatic.yml`が存在するか確認
2. リポジトリの「Actions」タブで有効になっているか確認
3. ワークフローファイルのYAML構文エラーをチェック

## ベストプラクティス

### 1. 意味のあるストーリー名を使用

```typescript
// 良い例
export const PrimaryButton: Story = {}
export const DisabledState: Story = {}

// 悪い例
export const Story1: Story = {}
export const Test: Story = {}
```

### 2. ストーリーを整理

```typescript
// コンポーネントごとにフォルダを作成
// src/components/ui/button/
//   - button.tsx
//   - button.stories.tsx
```

### 3. 重要な状態をテスト

```typescript
// すべてのvariantをカバー
export const AllVariants: Story = {
  render: () => (
    <>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </>
  )
}
```

### 4. mainブランチは自動承認

```yaml
# .github/workflows/chromatic.yml
autoAcceptChanges: "main"
```

これにより、mainブランチへのマージ後は自動的にベースラインが更新されます。

## コスト管理

Chromaticは使用量に基づく課金です：

### 無料プラン
- 月5,000スナップショット
- 無制限のチームメンバー
- 基本的なサポート

### スナップショット削減のヒント

1. **不要なストーリーをスキップ**
   ```typescript
   parameters: { chromatic: { disableSnapshot: true } }
   ```

2. **変更されたファイルのみテスト**
   ```bash
   chromatic --only-changed
   ```

3. **mainブランチのみChromaticを実行**
   ```yaml
   on:
     push:
       branches: [main]
   ```

## 参考リンク

- [Chromatic公式ドキュメント](https://www.chromatic.com/docs/)
- [GitHub Actions統合](https://www.chromatic.com/docs/github-actions/)
- [インタラクションテスト](https://www.chromatic.com/docs/interactions/)
- [ビジュアルテストガイド](https://www.chromatic.com/docs/test/)
- [Storybook統合](https://www.chromatic.com/docs/storybook/)

## サポート

- [Chromatic Discord](https://discord.gg/storybook)
- [GitHub Issues](https://github.com/chromaui/chromatic-cli/issues)
- [サポートメール](mailto:support@chromatic.com)
