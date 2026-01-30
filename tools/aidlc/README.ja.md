# ai-dlccc

日本語 | [English](README.md)

Claude Code 向け AI-DLC（AI-Driven Development Lifecycle）ワークフロー CLI

## インストール

```bash
npx ai-dlccc init
```

## 使い方

```bash
# デフォルト（英語出力）
ai-dlccc init

# 日本語出力
ai-dlccc init --lang ja

# カスタムドキュメントディレクトリ
ai-dlccc init --docs-dir docs/specs

# 変更せずにプレビュー
ai-dlccc init --dry-run

# 既存ファイルを上書き
ai-dlccc init --force
```

## オプション

| オプション | 短縮 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `--agent` | `-a` | `claude-code` | ターゲットエージェント |
| `--target` | `-t` | `.` | ターゲットディレクトリ |
| `--lang` | `-l` | `en` | 出力言語（`en`, `ja`） |
| `--docs-dir` | `-d` | `aidlc-docs` | ドキュメントディレクトリ |
| `--force` | `-f` | `false` | 既存ファイルを上書き |
| `--dry-run` | `-n` | `false` | 変更をプレビュー |

## 生成されるファイル

```
.aidlc/
└── config.json

.claude/
├── CLAUDE.md
├── agents/
│   ├── aidlc-orchestrator.md
│   ├── aidlc-architect.md
│   ├── aidlc-builder.md
│   ├── aidlc-planner.md
│   ├── aidlc-reviewer.md
│   └── aidlc-tester.md
└── commands/
    ├── aidlc-start.md
    └── aidlc-resume.md

aidlc-docs/
├── requirements/
├── design/
├── plans/
├── story-artifacts/
└── UNITS/
```

## Claude Code コマンド

```
/aidlc-start "機能の説明"
/aidlc-resume
```

## ライセンス

MIT
