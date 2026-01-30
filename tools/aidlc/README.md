# aidlc

AI-DLC (AI-Driven Development Lifecycle) workflow CLI for Claude Code.

## Overview

`aidlc` provides templates and slash commands to run structured AI-DLC workflows in Claude Code. It initializes your project with:

- `.claude/` - Commands (`/aidlc-start`, `/aidlc-resume`) and agents for orchestrating AI-DLC
- `.aidlc/config.json` - Configuration including language setting
- `aidlc-docs/` - Document templates for Intent, Requirements, Design, User Stories, Units, and Bolts

## Quick Start

```bash
# Initialize with defaults (English)
npx aidlc init

# Initialize with Japanese output
npx aidlc init --lang ja

# Custom docs directory
npx aidlc init --docs-dir docs/aidlc

# Preview changes without making them
npx aidlc init --dry-run
```

## Commands

### `aidlc init`

Initialize AI-DLC templates in your project.

**Options:**

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--agent` | `-a` | `claude-code` | Target agent |
| `--target` | `-t` | `.` | Target directory |
| `--lang` | `-l` | `en` | Language for AI outputs (`en`, `ja`) |
| `--docs-dir` | `-d` | `aidlc-docs` | Documentation directory name |
| `--force` | `-f` | `false` | Overwrite existing files |
| `--dry-run` | `-n` | `false` | Preview changes |

## Generated Structure

```
your-project/
├── .aidlc/
│   └── config.json           # Configuration (language, docs_dir, etc.)
├── .claude/
│   ├── CLAUDE.md             # Claude Code rules
│   ├── agents/               # AI-DLC agent definitions
│   │   ├── aidlc-orchestrator.md
│   │   ├── aidlc-architect.md
│   │   ├── aidlc-builder.md
│   │   ├── aidlc-planner.md
│   │   ├── aidlc-reviewer.md
│   │   └── aidlc-tester.md
│   └── commands/             # Slash commands
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

After initialization, use the slash commands in Claude Code:

```
/aidlc-start "What you want to build"
```

The orchestrator will:
1. Read language setting from `.aidlc/config.json`
2. Search existing artifacts for related work
3. Ask questions to clarify scope (Intent/Unit/Bolt)
4. Guide you through the AI-DLC workflow

To resume interrupted work:

```
/aidlc-resume
```

## Language Support

The `--lang` option sets the language for AI-generated outputs. Templates are language-agnostic; the AI reads the language setting from `.aidlc/config.json` and generates content in the specified language.

Supported languages:
- `en` - English (default)
- `ja` - Japanese

## Reference

This tool is inspired by:
- [AI-DLC Whitepaper](https://prod.d13rzhkk8cj2z0.amplifyapp.com/)
- [cc-sdd](https://github.com/gotalab/cc-sdd) - Spec-driven development for Claude Code

## License

MIT
