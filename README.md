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

### フェーズ2: コンポーネントとplay function

#### 4. shadcn/uiベースのコンポーネント作成
- [ ] Buttonコンポーネント
  - 各種variant (default, destructive, outline, ghost)
  - サイズバリエーション
- [ ] Formコンポーネント
  - Input, Label
  - バリデーション
  - エラー表示
- [ ] Cardコンポーネント
  - ヘッダー、コンテンツ、フッター
- [ ] Dialogコンポーネント
  - モーダル開閉
  - フォーム統合

#### 5. Play functionの実装
- [ ] @storybook/test のセットアップ
- [ ] ユーザーインタラクションのシミュレーション
  - ボタンクリック
  - フォーム入力
  - モーダル開閉
- [ ] アサーションテスト
  - DOM状態の検証
  - イベントハンドラーの動作確認
- [ ] 複数のシナリオ
  - 成功パターン
  - 失敗パターン
  - エッジケース

### フェーズ3: Storybook MCPの設定

#### 6. Storybook MCP（Model Context Protocol）のセットアップ
- [ ] MCP設定ファイルの作成
- [ ] Storybook MCPサーバーの設定
- [ ] 統合テスト
- [ ] ドキュメント化

### フェーズ4: Chromatic統合

#### 7. Chromaticのセットアップ
- [ ] Chromaticアカウント連携
- [ ] プロジェクト設定
- [ ] ビジュアルリグレッションテスト
- [ ] インタラクションテストの実行
- [ ] CI/CD統合（GitHub Actions）
  - PR時の自動テスト
  - ビジュアルレビューワークフロー

### 追加機能

#### 8. ドキュメント整備
- [ ] README更新（セットアップ手順、使用方法）
- [ ] 各コンポーネントのMDXドキュメント
- [ ] play functionの使用例
- [ ] ベストプラクティスガイド

## 🚀 セットアップ手順

*(実装後に追記)*

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

## 📚 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Storybook Play Function](https://storybook.js.org/docs/writing-stories/play-function)
- [Chromatic Documentation](https://www.chromatic.com/docs)
- [Storybook MCP](https://github.com/storybookjs/mcp)

## 📝 ライセンス

MIT
