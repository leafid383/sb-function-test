# Storybook Play Function Test Project

Next.js + TypeScript + Storybook + shadcn/ui環境で、Storybookのplay functionとChromaticを試すプロジェクトです。

## 📋 プロジェクト概要

このプロジェクトでは以下の技術スタックを使用します：

- **Next.js 14+** (App Router)
- **TypeScript**
- **Storybook 8** (最新版)
- **shadcn/ui** (デザインフレームワーク)
- **Tailwind CSS**
- **Storybook Play Function** (インタラクションテスト)
- **Storybook MCP** (Model Context Protocol)
- **Chromatic** (ビジュアルリグレッションテスト)

## 🎯 実装プラン

### フェーズ1: 基本セットアップ

#### 1. Next.js + TypeScript プロジェクトの初期化
- [x] リポジトリ作成
- [ ] Next.js 14+ with App Router
- [ ] TypeScript設定
- [ ] 基本的なディレクトリ構造

#### 2. Tailwind CSS + shadcn/ui のセットアップ
- [ ] Tailwind CSS設定
- [ ] shadcn/ui初期化
- [ ] 必要なコンポーネントのインストール
  - Button
  - Form (Input, Label)
  - Card
  - Dialog
- [ ] テーマ設定（light/dark mode対応）

#### 3. Storybook 8のインストールと設定
- [ ] Storybook 8.x インストール
- [ ] Next.js用のアドオン設定
- [ ] Tailwind CSSとの統合
- [ ] TypeScript対応

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

## 📚 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Storybook Play Function](https://storybook.js.org/docs/writing-stories/play-function)
- [Chromatic Documentation](https://www.chromatic.com/docs)
- [Storybook MCP](https://github.com/storybookjs/mcp)

## 📝 ライセンス

MIT
