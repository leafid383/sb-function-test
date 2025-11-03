# Storybook MCP設定

このディレクトリには、Storybook Model Context Protocol (MCP) の設定例が含まれています。

## MCPとは？

Model Context Protocol (MCP)は、AIアシスタント（Claude等）が外部のツールやデータソースと統合するためのプロトコルです。Storybook MCPを使用すると、ClaudeがStorybookのコンポーネント情報、ストーリー、propsなどに直接アクセスできるようになります。

## セットアップ手順

### 1. Storybookを起動

まず、Storybookを起動しておく必要があります：

```bash
npm run storybook
```

Storybookは通常 `http://localhost:6006` で起動します。

### 2. Claude Desktop設定ファイルを編集

Claude Desktopの設定ファイルに、以下のMCP設定を追加します。

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### 3. 設定例を選択

#### オプション1: 基本設定（推奨）

`claude-desktop-config.json`の内容をClaude Desktopの設定ファイルに追加：

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

**機能：**
- コンポーネント一覧の取得
- ストーリー情報の取得
- Props/Argsの取得

#### オプション2: 高度な設定（スクリーンショット機能付き）

`claude-desktop-config-advanced.json`の内容を使用：

```json
{
  "mcpServers": {
    "storybook": {
      "command": "npx",
      "args": ["storybook-mcp-server"],
      "env": {
        "STORYBOOK_URL": "http://localhost:6006",
        "OUTPUT_DIR": "./screenshots",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

**追加機能：**
- スクリーンショット撮影
- より詳細なログ
- カスタマイズ可能な出力ディレクトリ

### 4. Claude Desktopを再起動

設定を保存したら、Claude Desktopを完全に再起動してください。

### 5. 動作確認

Claude Desktop（またはClaude Code）で以下のように質問してみてください：

- "Storybookにあるコンポーネントの一覧を教えて"
- "Buttonコンポーネントのpropsを教えて"
- "Dialogコンポーネントにはどんなストーリーがある？"

## 利用可能なMCPツール

### 基本ツール（mcpland/storybook-mcp）

1. **getComponentList**
   - Storybookの全コンポーネント一覧を取得

2. **getComponentPropsType**
   - 特定のコンポーネントの詳細なprops情報を取得

### 拡張ツール（stefanoamorelli/storybook-mcp-server）

上記に加えて：

3. **captureScreenshot**
   - 個別ストーリーのスクリーンショットを撮影

4. **captureAllScreenshots**
   - すべてのストーリーのスクリーンショットを一括撮影

## トラブルシューティング

### MCPサーバーが起動しない

1. Storybookが起動していることを確認
   ```bash
   curl http://localhost:6006/index.json
   ```

2. ポート番号が正しいことを確認（デフォルトは6006）

3. Claude Desktopのログを確認
   - macOS: `~/Library/Logs/Claude/`
   - Windows: `%APPDATA%\Claude\logs\`

### コンポーネント情報が取得できない

- Storybookのビルドが最新であることを確認
  ```bash
  npm run build-storybook
  ```

- `index.json`が生成されていることを確認
  - 開発モード: `http://localhost:6006/index.json`
  - ビルド版: `storybook-static/index.json`

## 参考リンク

- [Model Context Protocol 仕様](https://modelcontextprotocol.io/)
- [mcpland/storybook-mcp](https://github.com/mcpland/storybook-mcp)
- [stefanoamorelli/storybook-mcp-server](https://github.com/stefanoamorelli/storybook-mcp-server)
- [Storybook Documentation](https://storybook.js.org/docs)

## 使用例

### 例1: コンポーネント一覧の取得

```
ユーザー: Storybookにあるコンポーネントをすべて教えて

Claude: MCPツールを使用してStorybookからコンポーネント一覧を取得します...

現在、以下のコンポーネントがあります：
- UI/Button
- UI/Input
- UI/Card
- UI/Dialog
```

### 例2: Props情報の取得

```
ユーザー: Buttonコンポーネントのpropsを詳しく教えて

Claude: ButtonコンポーネントのProps:
- variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
- size: 'default' | 'sm' | 'lg' | 'icon'
- disabled: boolean
- asChild: boolean
- onClick: () => void
...
```

### 例3: 新しいストーリーの提案

```
ユーザー: Cardコンポーネントに新しいストーリーを追加したい

Claude: 現在のCardコンポーネントのストーリーを確認します...
[MCPでストーリー情報を取得]

以下のような新しいストーリーを提案します：
- NotificationCard: 通知カード
- StatisticsCard: 統計情報カード
- ImageCard: 画像付きカード
```

## 注意事項

- MCPサーバーはローカル環境でのみ動作します
- Storybookが起動している必要があります
- ネットワーク経由でのStorybookアクセスも可能ですが、セキュリティに注意してください
- スクリーンショット機能を使用する場合、十分なディスク容量を確保してください
