# ai-dlccc

[日本語](README.ja.md) | English

AI-DLC (AI-Driven Development Lifecycle) workflow CLI for Claude Code.

## Installation

```bash
npx ai-dlccc init
```

## Usage

```bash
# Default (English output)
ai-dlccc init

# Japanese output
ai-dlccc init --lang ja

# Custom docs directory
ai-dlccc init --docs-dir docs/specs

# Preview without changes
ai-dlccc init --dry-run

# Overwrite existing files
ai-dlccc init --force
```

## Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--agent` | `-a` | `claude-code` | Target agent |
| `--target` | `-t` | `.` | Target directory |
| `--lang` | `-l` | `en` | Output language (`en`, `ja`) |
| `--docs-dir` | `-d` | `aidlc-docs` | Documentation directory |
| `--force` | `-f` | `false` | Overwrite existing files |
| `--dry-run` | `-n` | `false` | Preview changes |

## Generated Files

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

## Claude Code Commands

```
/aidlc-start "Feature description"
/aidlc-resume
```

## License

MIT
