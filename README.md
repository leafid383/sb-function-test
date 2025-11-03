# Storybook Play Function Test Project

Next.js + TypeScript + Storybook + shadcn/ui環境で、Storybookのplay functionとChromaticを試すプロジェクトです。

## 📋 プロジェクト概要

このプロジェクトでは以下の技術スタックを使用します：

- **Next.js 15** (App Router)
- **TypeScript 5**
- **Storybook 8.6** (play function対応)
- **shadcn/ui** (デザインフレームワーク)
- **Tailwind CSS v4**
- **Storybook Play Function** (インタラクションテスト)
- **Storybook MCP** (Model Context Protocol)
- **Chromatic** (ビジュアルリグレッションテスト)

## 🎬 Storybookで体験できること

このプロジェクトを完成させると、Storybookで以下のことが体験・確認できます：

### 📦 コンポーネントカタログ
- shadcn/uiベースの高品質なUIコンポーネント
- 各コンポーネントの全てのvariant（デフォルト、破壊的、アウトライン等）
- サイズバリエーション（sm, md, lg）
- ライト/ダークモード対応

### 🎮 インタラクティブテスト（Play Function）
- ボタンクリックの自動テスト
- フォーム入力のシミュレーション
- ダイアログ（モーダル）の開閉テスト
- 成功/失敗/エッジケースの網羅的なテストシナリオ
- Interactionsパネルでステップバイステップの動作確認

### 🤖 AI連携（Storybook MCP）
- Claude Codeからコンポーネント情報への直接アクセス
- props、variants、使用例の自動取得
- AIによるコンポーネントドキュメント生成

### 👁️ ビジュアルテスト（Chromatic）
- ビジュアルリグレッションテスト
- UI変更の差分可視化
- PRでの自動ビジュアルレビュー
- コンポーネント変更履歴の追跡

## 🎯 実装プラン

### フェーズ1: 基本セットアップ ✅

#### 1. Next.js + TypeScript プロジェクトの初期化
- [x] リポジトリ作成
- [x] Next.js 15 with App Router
- [x] TypeScript設定
- [x] 基本的なディレクトリ構造

#### 2. Tailwind CSS + shadcn/ui のセットアップ
- [x] Tailwind CSS v4設定
- [x] shadcn/ui初期化（components.json、utils.ts）
- [x] 必要なコンポーネントのインストール
  - [x] Button
  - [x] Form (Input, Label)
  - [x] Card
  - [x] Dialog
- [x] テーマ設定（light/dark mode対応）

#### 3. Storybook 8のインストールと設定
- [x] Storybook 8.6 インストール
- [x] Next.js用のアドオン設定
- [x] Tailwind CSSとの統合
- [x] TypeScript対応
- [x] @storybook/test と @storybook/addon-interactions 追加

**📺 Storybookで確認できること：**
- Storybookサーバーが正常に起動する（`npm run storybook`）
- Tailwind CSSのスタイルが適用されている
- デフォルトのサンプルストーリーが表示される

### フェーズ2: コンポーネントとplay function ✅

#### 4. shadcn/uiベースのコンポーネント作成
- [x] Buttonコンポーネント
  - [x] 各種variant (default, destructive, outline, secondary, ghost, link)
  - [x] サイズバリエーション (sm, default, lg, icon)
- [x] Formコンポーネント
  - [x] Input, Label
  - [x] バリデーション
  - [x] 複数の入力パターン
- [x] Cardコンポーネント
  - [x] ヘッダー、コンテンツ、フッター
  - [x] 様々なユースケース（プロダクト、プロフィール、フォーム等）
- [x] Dialogコンポーネント
  - [x] モーダル開閉
  - [x] フォーム統合

#### 5. Play functionの実装
- [x] @storybook/test のセットアップ
- [x] ユーザーインタラクションのシミュレーション
  - [x] ボタンクリック
  - [x] フォーム入力
  - [x] モーダル開閉
- [x] アサーションテスト
  - [x] DOM状態の検証
  - [x] イベントハンドラーの動作確認
- [x] 複数のシナリオ
  - [x] 成功パターン
  - [x] 無効化（disabled）パターン
  - [x] フォームバリデーション

**📺 Storybookで確認できること：**
- 全てのshadcn/uiコンポーネント（Button, Input, Label, Card, Dialog）のストーリー
- 各コンポーネントの全てのvariantとサイズ
- インタラクティブなControls（プロパティの変更）
- Play functionによる自動インタラクションテスト
  - ボタンクリック時の動作
  - フォーム入力のシミュレーション
  - ダイアログの開閉
- Interactionsパネルでステップバイステップのテスト実行
- テストの成功/失敗状態

### フェーズ3: Storybook MCPの設定 ✅

#### 6. Storybook MCP（Model Context Protocol）のセットアップ
- [x] MCP設定ファイルの作成
- [x] Storybook MCPサーバーの設定
- [x] 統合テスト手順の文書化
- [x] ドキュメント化

**📺 Storybookで確認できること：**
- MCP経由でStorybookのストーリー情報にアクセス可能
- AI（Claude）がStorybookのコンポーネント情報を取得できる
- コンポーネントのpropsやvariantの自動ドキュメント化
- Claude Desktop/Claude CodeからStorybookコンポーネントを直接操作可能

### フェーズ4: Chromatic統合 ✅

#### 7. Chromaticのセットアップ
- [x] Chromaticアカウント連携手順の文書化
- [x] プロジェクト設定ガイド
- [x] ビジュアルリグレッションテスト設定
- [x] インタラクションテストの有効化
- [x] CI/CD統合（GitHub Actions）
  - [x] PR時の自動テスト
  - [x] ビジュアルレビューワークフロー
  - [x] 自動コメント機能

**📺 Storybookで確認できること：**
- ChromaticのPublish Storybook機能で公開されたURL
- ビジュアルリグレッションテストの結果（変更差分の可視化）
- インタラクションテスト（play function）の実行結果
- PR内でのビジュアルレビュー
- 各コミットでのビジュアル変更履歴
- ベースラインとの比較スナップショット
- GitHub ActionsでのCI統合

### 追加機能

#### 8. ドキュメント整備
- [ ] README更新（セットアップ手順、使用方法）
- [ ] 各コンポーネントのMDXドキュメント
- [ ] play functionの使用例
- [ ] ベストプラクティスガイド

## 🚀 セットアップ手順

### 基本セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **Storybookの起動**
   ```bash
   npm run storybook
   ```
   ブラウザで `http://localhost:6006` を開いてStorybookを確認できます。

3. **Next.jsアプリケーションの起動**（オプション）
   ```bash
   npm run dev
   ```

### Storybook MCP設定（Claude Desktop/Claude Code連携）

Storybook MCPを設定すると、Claude（AI）がStorybookのコンポーネント情報に直接アクセスできるようになります。

#### 前提条件
- Storybookが起動していること（`npm run storybook`）
- Claude DesktopまたはClaude Codeがインストールされていること

#### 設定手順

1. **Claude Desktopの設定ファイルを開く**
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. **MCP設定を追加**

   以下の設定を追加（`.mcp/claude-desktop-config.json`からコピー可能）：
   ```json
   {
     "mcpServers": {
       "storybook": {
         "command": "npx",
         "args": ["-y", "storybook-mcp"],
         "env": {
           "STORYBOOK_URL": "http://localhost:6006/index.json"
         }
       }
     }
   }
   ```

3. **Claude Desktopを再起動**

4. **動作確認**

   Claude Desktop/Claude Codeで以下のように質問してみてください：
   - "Storybookにあるコンポーネントの一覧を教えて"
   - "Buttonコンポーネントのpropsを教えて"
   - "Cardコンポーネントにはどんなストーリーがある？"

詳細な設定方法やトラブルシューティングは [.mcp/README.md](.mcp/README.md) を参照してください。

### Chromatic設定（ビジュアルテスト・公開）

Chromaticを設定すると、ビジュアルリグレッションテストとStorybookの自動公開が可能になります。

#### 前提条件
- GitHubリポジトリが必要
- Chromaticアカウント（無料プランあり）

#### 設定手順

1. **Chromaticアカウントを作成**
   - [chromatic.com](https://www.chromatic.com/)にアクセス
   - GitHubアカウントでサインアップ
   - 「Add project」をクリックしてリポジトリを選択
   - プロジェクトトークンをコピー

2. **GitHub Secretsにトークンを設定**
   - GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」
   - 「New repository secret」をクリック
   - **Name:** `CHROMATIC_PROJECT_TOKEN`
   - **Secret:** コピーしたプロジェクトトークン

3. **初回プッシュでベースライン作成**
   ```bash
   git push
   ```
   GitHub Actionsが自動実行され、Chromaticにアップロードされます。

4. **Chromaticダッシュボードで確認**
   - ビルド状況の確認
   - ビジュアル変更の検出
   - インタラクションテストの結果

**ローカルでの実行（オプション）:**
```bash
# .env.localファイルを作成
echo "CHROMATIC_PROJECT_TOKEN=your_token" > .env.local

# Chromaticを実行
npm run chromatic
```

詳細な設定方法やベストプラクティスは [.chromatic/README.md](.chromatic/README.md) を参照してください。

## 📖 実装ログ

### 2025-11-03: フェーズ1完了 ✅

**セットアップ内容：**
- Next.js 15プロジェクトをTypeScript + App Routerで初期化
- Tailwind CSS v4をセットアップ（@tailwindcss/postcss使用）
- shadcn/uiを手動セットアップ
  - `components.json`設定ファイル作成
  - `src/lib/utils.ts`にcn関数実装
  - `src/app/globals.css`にCSS変数とテーマ設定追加
- shadcn/uiコンポーネント実装
  - Button（variant: default, destructive, outline, secondary, ghost, link）
  - Label（Radix UI使用）
  - Input
  - Card（Header, Title, Description, Content, Footer付き）
  - Dialog（Radix UI使用、モーダル機能）
- Storybook 8.6をインストール
  - @storybook/nextjs設定
  - @storybook/addon-essentials
  - @storybook/addon-interactions（play function用）
  - @storybook/test（テストユーティリティ）
  - @chromatic-com/storybook（Chromatic連携用）
  - Tailwind CSSをStorybookに統合（preview.tsでglobals.cssをインポート）

**依存関係：**
- Next.js 15.0.3
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Storybook 8.6.14
- Radix UI（Dialog, Label, Slot）
- class-variance-authority
- clsx + tailwind-merge

**コミット：** `512dc53`

### 2025-11-03: フェーズ2完了 ✅

**実装内容：**
- 全shadcn/uiコンポーネントのStorybookストーリー作成
  - **Button** (button.stories.tsx)
    - 6種類のvariant（default, destructive, outline, secondary, ghost, link）
    - 4種類のサイズ（sm, default, lg, icon）
    - 全バリエーションを表示するAllVariantsストーリー
  - **Input & Label** (input.stories.tsx)
    - 基本入力フィールド
    - メール、パスワードフィールド
    - 複数フィールドのフォーム
  - **Card** (card.stories.tsx)
    - 基本カード構造
    - プロダクトカード、ユーザープロフィールカード
    - フォームカード
    - 複数カードのグリッドレイアウト
  - **Dialog** (dialog.stories.tsx)
    - 基本モーダル
    - フォーム統合モーダル
    - 制御されたダイアログ（Controlled Dialog）
    - 確認ダイアログ（Confirmation Dialog）

- Play function実装（合計20以上のインタラクションテスト）
  - **Buttonテスト**
    - クリックテスト、無効化テスト
    - onClickハンドラーテスト
    - 全ボタンの表示確認
  - **Input/Formテスト**
    - テキスト入力のシミュレーション
    - クリア動作のテスト
    - メールバリデーション
    - 複数フィールドへの同時入力
    - フォーカステスト
  - **Cardテスト**
    - コンテンツ表示確認
    - ボタン存在確認
    - 複数カードの表示確認
  - **Dialogテスト**
    - モーダルの開閉テスト
    - フォーム入力テスト（モーダル内）
    - 制御されたダイアログのステート管理テスト
    - 確認ダイアログのインタラクション

**主な使用ライブラリ：**
- @storybook/test（expect, userEvent, within, waitFor）
- @storybook/addon-interactions

**テストカバレッジ：**
- 成功パターン: ✅
- エラー/無効化パターン: ✅
- 複雑なインタラクション（モーダル開閉、フォーム入力）: ✅

**コミット：** `02177af`

### 2025-11-03: フェーズ3完了 ✅

**実装内容：**
- Storybook Model Context Protocol (MCP) 設定の完備
  - **MCP設定ファイル**
    - `.mcp/claude-desktop-config.json` - 基本設定（推奨）
    - `.mcp/claude-desktop-config-advanced.json` - 高度な設定（スクリーンショット機能付き）
    - `.mcp/README.md` - 詳細なセットアップ手順とトラブルシューティング

  - **サポートするMCP実装**
    - mcpland/storybook-mcp（基本機能）
    - stefanoamorelli/storybook-mcp-server（拡張機能）

- **利用可能なMCPツール**
  - `getComponentList` - Storybookの全コンポーネント一覧を取得
  - `getComponentPropsType` - 特定のコンポーネントの詳細なprops情報を取得
  - `captureScreenshot` - 個別ストーリーのスクリーンショット撮影（拡張版）
  - `captureAllScreenshots` - 全ストーリーの一括スクリーンショット撮影（拡張版）

- **ドキュメント整備**
  - メインREADMEにMCPセットアップ手順を追加
  - 使用例とトラブルシューティングガイド
  - macOS/Windows両対応の設定パス記載

**主な機能：**
- Claude Desktop/Claude CodeからStorybookコンポーネント情報に直接アクセス
- AIによるコンポーネントprops、variants、ストーリーの自動取得
- コンポーネントドキュメントの自動生成支援

**設定場所：**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**使用例：**
```
ユーザー: "Storybookにあるコンポーネントを教えて"
Claude: [MCPツール使用] 現在以下のコンポーネントがあります：
- UI/Button (6 variants, 4 sizes)
- UI/Input
- UI/Card
- UI/Dialog
```

**コミット：** `6769c4d`

### 2025-11-03: フェーズ4完了 ✅

**実装内容：**
- Chromatic統合の完全セットアップ
  - **GitHub Actions ワークフロー**
    - `.github/workflows/chromatic.yml` - CI/CD自動化
    - プッシュごとの自動実行
    - フルgit履歴の取得（fetch-depth: 0）
    - インタラクションテストの有効化
    - mainブランチの自動承認設定

  - **NPMスクリプト**
    - `npm run chromatic` - ローカル実行用コマンド追加

  - **設定ファイル**
    - `.gitignore` - Storybook/Chromaticの出力ファイルを除外
      - `storybook-static`
      - `build-storybook.log`
      - `screenshots`

  - **詳細ドキュメント**
    - `.chromatic/README.md` - 包括的なガイド
      - セットアップ手順（アカウント作成からCI設定まで）
      - PRワークフロー
      - Chromaticダッシュボードの使い方
      - 高度な設定オプション
      - トラブルシューティング
      - ベストプラクティス
      - コスト管理のヒント

- **主な機能：**
  - ビジュアルリグレッションテスト（UIの視覚的変更を自動検出）
  - インタラクションテスト（play functionの自動実行）
  - Storybook自動公開（Chromatic上でホスティング）
  - PRでの視覚的レビュー
  - GitHub Actionsとの完全統合

- **GitHub Actions設定：**
  - Node.js 20
  - npm ciで依存関係を高速インストール
  - chromaui/action@latestでChromaticを実行
  - プロジェクトトークンはGitHub Secretsで管理

- **ドキュメント更新：**
  - メインREADMEにChromaticセットアップ手順を追加
  - ローカル実行方法の記載
  - GitHub Secrets設定ガイド

**使用方法：**

1. **Chromaticアカウント作成**
   - chromatic.comでサインアップ
   - プロジェクトトークンを取得

2. **GitHub Secretsに設定**
   - `CHROMATIC_PROJECT_TOKEN`を追加

3. **自動実行**
   - プッシュするだけで自動的にテスト実行
   - PRにChromaticの結果がコメントされる

**料金プラン：**
- 無料: 月5,000スナップショット
- スナップショット削減のヒント有り

## 📚 参考リンク

### 基本技術
- [Next.js Documentation](https://nextjs.org/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Storybook拡張
- [Storybook Play Function](https://storybook.js.org/docs/writing-stories/play-function)
- [@storybook/test](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Chromatic Documentation](https://www.chromatic.com/docs)

### Model Context Protocol (MCP)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [mcpland/storybook-mcp](https://github.com/mcpland/storybook-mcp)
- [stefanoamorelli/storybook-mcp-server](https://github.com/stefanoamorelli/storybook-mcp-server)
- [Storybook MCP Discussion](https://github.com/storybookjs/storybook/discussions/31788)

## 📝 ライセンス

MIT
