# ai-dlccc

[日本語](README.ja.md) | English

[![npm version](https://img.shields.io/npm/v/ai-dlccc.svg)](https://www.npmjs.com/package/ai-dlccc)
[![license](https://img.shields.io/npm/l/ai-dlccc.svg)](https://github.com/KouheiOkazaki/ai-dlccc/blob/main/LICENSE)

**AI-DLC (AI-Driven Development Lifecycle) workflow CLI for Claude Code.**

Transform AI coding agents into structured development workflows with clear phases: Inception → Construction → Operations.

## Installation

```bash
npx ai-dlccc init
```

Or install globally:

```bash
npm install -g ai-dlccc
ai-dlccc init
```

## Quick Start

```bash
# Initialize with English output (default)
npx ai-dlccc init

# Initialize with Japanese output
npx ai-dlccc init --lang ja

# Custom documentation directory
npx ai-dlccc init --docs-dir docs/specs

# Preview changes without writing files
npx ai-dlccc init --dry-run
```

## What Gets Generated

```
your-project/
├── .aidlc/
│   └── config.json           # Configuration (language, paths)
├── .claude/
│   ├── CLAUDE.md             # AI rules and guidelines
│   ├── agents/               # Specialized AI agents
│   │   ├── aidlc-orchestrator.md
│   │   ├── aidlc-architect.md
│   │   ├── aidlc-builder.md
│   │   ├── aidlc-planner.md
│   │   ├── aidlc-reviewer.md
│   │   └── aidlc-tester.md
│   └── commands/
│       ├── aidlc-start.md
│       └── aidlc-resume.md
└── aidlc-docs/               # Document templates
    ├── requirements/
    ├── design/
    ├── plans/
    ├── story-artifacts/
    └── UNITS/
```

## Usage in Claude Code

### Start a New Workflow

```
/aidlc-start "What you want to build"
```

The orchestrator will:
1. Search existing artifacts for related work
2. Ask clarifying questions (Intent/Unit/Bolt scope)
3. Guide you through the appropriate phase

### Resume Interrupted Work

```
/aidlc-resume
```

## CLI Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--agent` | `-a` | `claude-code` | Target agent |
| `--target` | `-t` | `.` | Target directory |
| `--lang` | `-l` | `en` | Output language (`en`, `ja`) |
| `--docs-dir` | `-d` | `aidlc-docs` | Documentation directory |
| `--force` | `-f` | `false` | Overwrite existing files |
| `--dry-run` | `-n` | `false` | Preview changes |

## AI-DLC Phases

| Phase | Scope | Outputs |
|-------|-------|---------|
| **Inception** | Per Intent | Requirements, NFR, User Stories, Units, Design |
| **Construction** | Per Bolt | Design diff, Implementation, Tests, Deployment Units |
| **Operations** | Per Bolt | Monitoring, Runbooks, Rollback procedures |

## Language Support

The `--lang` option controls the language of AI-generated outputs. Templates are language-agnostic; the AI reads `.aidlc/config.json` and generates content in the specified language.

Supported: `en` (English), `ja` (Japanese)

## References

- [AI-DLC Whitepaper](https://prod.d13rzhkk8cj2z0.amplifyapp.com/) - Methodology and concepts

## License

MIT
