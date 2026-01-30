# ai-dlccc

日本語 | [English](README.md)

[![npm version](https://img.shields.io/npm/v/ai-dlccc.svg)](https://www.npmjs.com/package/ai-dlccc)
[![license](https://img.shields.io/npm/l/ai-dlccc.svg)](https://github.com/KouheiOkazaki/ai-dlccc/blob/main/LICENSE)

**Claude Code 向け AI-DLC（AI-Driven Development Lifecycle）ワークフロー CLI**

AIコーディングエージェントを構造化された開発ワークフローに変換します。明確なフェーズ：Inception → Construction → Operations

## インストール

```bash
npx ai-dlccc init
```

またはグローバルインストール：

```bash
npm install -g ai-dlccc
ai-dlccc init
```

## クイックスタート

```bash
# 英語出力で初期化（デフォルト）
npx ai-dlccc init

# 日本語出力で初期化
npx ai-dlccc init --lang ja

# カスタムドキュメントディレクトリ
npx ai-dlccc init --docs-dir docs/specs

# ファイルを書き込まずに変更をプレビュー
npx ai-dlccc init --dry-run
```

## 生成されるもの

```
your-project/
├── .aidlc/
│   └── config.json           # 設定（言語、パス）
├── .claude/
│   ├── CLAUDE.md             # AIルールとガイドライン
│   ├── agents/               # 専門AIエージェント
│   │   ├── aidlc-orchestrator.md
│   │   ├── aidlc-architect.md
│   │   ├── aidlc-builder.md
│   │   ├── aidlc-planner.md
│   │   ├── aidlc-reviewer.md
│   │   └── aidlc-tester.md
│   └── commands/
│       ├── aidlc-start.md
│       └── aidlc-resume.md
└── aidlc-docs/               # ドキュメントテンプレート
    ├── requirements/
    ├── design/
    ├── plans/
    ├── story-artifacts/
    └── UNITS/
```

## Claude Code での使い方

### 新しいワークフローを開始

```
/aidlc-start "作りたいもの"
```

オーケストレータが以下を実行します：
1. 既存成果物から関連する作業を検索
2. 確認事項を質問（Intent/Unit/Bolt のスコープ）
3. 適切なフェーズにガイド

### 中断した作業を再開

```
/aidlc-resume
```

## CLI オプション

| オプション | 短縮 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `--agent` | `-a` | `claude-code` | ターゲットエージェント |
| `--target` | `-t` | `.` | ターゲットディレクトリ |
| `--lang` | `-l` | `en` | 出力言語（`en`, `ja`） |
| `--docs-dir` | `-d` | `aidlc-docs` | ドキュメントディレクトリ |
| `--force` | `-f` | `false` | 既存ファイルを上書き |
| `--dry-run` | `-n` | `false` | 変更をプレビュー |

## AI-DLC フェーズ

| フェーズ | スコープ | 成果物 |
|---------|---------|--------|
| **Inception** | Intent単位 | 要件、NFR、ユーザーストーリー、Units、設計 |
| **Construction** | Bolt単位 | 設計差分、実装、テスト、デプロイ単位 |
| **Operations** | Bolt単位 | 監視、運用手順、切り戻し手順 |

## 言語サポート

`--lang` オプションは AI が生成する出力の言語を制御します。テンプレート自体は言語非依存で、AI は `.aidlc/config.json` を読み取り、指定された言語でコンテンツを生成します。

対応言語: `en`（英語）, `ja`（日本語）

## 参考

- [AI-DLC ホワイトペーパー](https://prod.d13rzhkk8cj2z0.amplifyapp.com/) - 方法論とコンセプト

## ライセンス

MIT
