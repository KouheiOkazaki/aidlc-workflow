# AI-DLC Workflow Template

AI主導の開発ライフサイクル（AI-DLC: AI-Driven Development Lifecycle）を、リポジトリ上で運用するためのテンプレートです。

このテンプレートは、以下のホワイトペーパーの考え方・用語・進め方を参考にしています。
https://prod.d13rzhkk8cj2z0.amplifyapp.com/

## Quick Start

```bash
# プロジェクトにAI-DLCテンプレートを導入
npx aidlc init

# 日本語出力で初期化
npx aidlc init --lang ja

# カスタムドキュメントディレクトリ
npx aidlc init --docs-dir docs/aidlc
```

詳細は [tools/aidlc/README.md](tools/aidlc/README.md) を参照してください。

## 概要

- **Inception**：Intent単位で要件・ストーリー・Unit分割・設計を固める
- **Construction**：Bolt単位で設計差分→実装→単体テスト→デプロイ単位を進める
- **Operations**：Bolt単位で運用観点（監視・切り戻し等）を整備する

成果物は `aidlc-docs/` と `UNITS/` 配下に配置します。

## 使い方

### 開始

```text
/aidlc-start "やりたいこと"
```

例:
```text
/aidlc-start "ログイン画面のUIを修正する"
```

オーケストレータが既存成果物を調査し、Intent / Unit / Bolt のどれで進めるべきかを推定したうえで、askQuestionToolで確認します。

### 再開

```text
/aidlc-resume
```

中断した作業を再開します。既存成果物を確認し、未完了の箇所を整理します。

## ディレクトリ構成

```
your-project/
├── .aidlc/
│   └── config.json           # 設定（言語、ドキュメントディレクトリなど）
├── .claude/
│   ├── CLAUDE.md             # Claude Code共通ルール
│   ├── agents/               # AI-DLCエージェント定義
│   └── commands/             # スラッシュコマンド
└── aidlc-docs/               # ドキュメントテンプレート
    ├── requirements/         # Intent/Requirements/NFR
    ├── design/               # Domain/Logical/Component Design
    ├── plans/                # Inception/Construction/Operations Plan
    ├── story-artifacts/      # User Stories
    └── UNITS/                # Unit/Bolt成果物
```

## 参考

- [AI-DLC Whitepaper](https://prod.d13rzhkk8cj2z0.amplifyapp.com/)
- [cc-sdd](https://github.com/gotalab/cc-sdd) - Spec-driven development for Claude Code

## License

MIT
