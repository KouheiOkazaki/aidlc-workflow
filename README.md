# AI-DLC Workflow Template

AI主導の開発ライフサイクル（AI-DLC: AI-Driven Development Lifecycle）を、リポジトリ上で運用するためのテンプレートです。

このテンプレートは、以下のホワイトペーパーの考え方・用語・進め方を参考にしています。
https://prod.d13rzhkk8cj2z0.amplifyapp.com/

## 概要

- Inception：Intent単位で要件・ストーリー・Unit分割・設計を固める
- Construction：Bolt単位で設計差分→実装→単体テスト→デプロイ単位を進める
- Operations：Bolt単位で運用観点（監視・切り戻し等）を整備する

成果物は `aidlc-docs/` と `UNITS/` 配下に配置します。

## 使い方

### 開始

```text
/ai-dlc start "やりたいこと"
```

例:
```text
/ai-dlc start "ログイン画面のUIを修正する"
```

オーケストレータが既存成果物を調査し、Intent / Unit / Bolt のどれで進めるべきかを推定したうえで、askQuestionToolで確認します。

### 状況確認 / 再開

```text
/ai-dlc status
/ai-dlc resume
```
