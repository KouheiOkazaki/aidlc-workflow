#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface InitOptions {
  agent: string;
  target: string;
  lang: string;
  docsDir: string;
  force: boolean;
  dryRun: boolean;
}

interface Manifest {
  version: number;
  artifacts: Array<{
    id: string;
    source: {
      type: 'templateDir' | 'templateFile';
      fromDir?: string;
      from?: string;
      toDir: string;
      rename?: string;
    };
    when?: { agent?: string };
  }>;
}

const SUPPORTED_AGENTS = ['claude-code'];
const SUPPORTED_LANGS = ['en', 'ja'];

function parseArgs(args: string[]): { command: string; options: Partial<InitOptions> } {
  const options: Partial<InitOptions> = {
    agent: 'claude-code',
    target: process.cwd(),
    lang: 'en',
    docsDir: 'aidlc-docs',
    force: false,
    dryRun: false,
  };

  let command = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === 'init') {
      command = 'init';
    } else if (arg === '--agent' || arg === '-a') {
      options.agent = args[++i];
    } else if (arg === '--target' || arg === '-t') {
      options.target = args[++i];
    } else if (arg === '--lang' || arg === '-l') {
      options.lang = args[++i];
    } else if (arg === '--docs-dir' || arg === '-d') {
      options.docsDir = args[++i];
    } else if (arg === '--force' || arg === '-f') {
      options.force = true;
    } else if (arg === '--dry-run' || arg === '-n') {
      options.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      command = 'help';
    } else if (arg === '--version' || arg === '-v') {
      command = 'version';
    }
  }

  return { command, options };
}

function showHelp(): void {
  console.log(`
ai-dlccc - AI-DLC Workflow CLI for Claude Code

Usage:
  ai-dlccc init [options]    Initialize AI-DLC templates in your project

Options:
  --agent, -a <agent>     Target agent (default: claude-code)
                          Supported: ${SUPPORTED_AGENTS.join(', ')}
  --target, -t <dir>      Target directory (default: current directory)
  --lang, -l <lang>       Language for AI outputs (default: en)
                          Supported: ${SUPPORTED_LANGS.join(', ')}
  --docs-dir, -d <dir>    Documentation directory name (default: aidlc-docs)
  --force, -f             Overwrite existing files
  --dry-run, -n           Show what would be done without making changes
  --help, -h              Show this help message
  --version, -v           Show version

Examples:
  ai-dlccc init                          # Initialize with defaults
  ai-dlccc init --lang ja                # Initialize with Japanese output
  ai-dlccc init --docs-dir docs/specs    # Custom docs directory
  ai-dlccc init --dry-run                # Preview changes
`);
}

function showVersion(): void {
  const packageJsonPath = join(__dirname, '..', 'package.json');
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    console.log(`ai-dlccc v${packageJson.version}`);
  } else {
    console.log('ai-dlccc v0.1.0');
  }
}

function getTemplatesDir(): string {
  // When running from dist/, templates are at ../templates/
  return join(__dirname, '..', 'templates');
}

function resolveVariables(str: string, options: InitOptions): string {
  const timestamp = new Date().toISOString();
  return str
    .replace(/\{\{AGENT\}\}/g, options.agent)
    .replace(/\{\{BASE_DIR\}\}/g, options.target)
    .replace(/\{\{DOCS_DIR\}\}/g, options.docsDir)
    .replace(/\{\{LANG_CODE\}\}/g, options.lang)
    .replace(/\{\{TIMESTAMP\}\}/g, timestamp);
}

function processFileContent(content: string, options: InitOptions): string {
  return resolveVariables(content, options);
}

function copyFile(
  srcPath: string,
  destPath: string,
  options: InitOptions,
  processContent: boolean = false
): boolean {
  if (existsSync(destPath) && !options.force) {
    return false; // skipped
  }

  if (!options.dryRun) {
    mkdirSync(dirname(destPath), { recursive: true });
    
    if (processContent) {
      const content = readFileSync(srcPath, 'utf-8');
      const processedContent = processFileContent(content, options);
      writeFileSync(destPath, processedContent, 'utf-8');
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
  
  return true; // created
}

function copyDirectory(
  srcDir: string,
  destDir: string,
  options: InitOptions
): { created: string[]; skipped: string[] } {
  const created: string[] = [];
  const skipped: string[] = [];

  if (!existsSync(srcDir)) {
    return { created, skipped };
  }

  const entries = readdirSync(srcDir);

  for (const entry of entries) {
    const srcPath = join(srcDir, entry);
    const destPath = join(destDir, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      const subResult = copyDirectory(srcPath, destPath, options);
      created.push(...subResult.created);
      skipped.push(...subResult.skipped);
    } else {
      // Process .md and .json files for variable replacement
      const shouldProcess = entry.endsWith('.md') || entry.endsWith('.json');
      const wasCreated = copyFile(srcPath, destPath, options, shouldProcess);
      
      if (wasCreated) {
        created.push(relative(options.target, destPath));
      } else {
        skipped.push(relative(options.target, destPath));
      }
    }
  }

  return { created, skipped };
}

function loadManifest(templatesDir: string, agent: string): Manifest | null {
  const manifestPath = join(templatesDir, 'manifests', `${agent}.json`);
  if (!existsSync(manifestPath)) {
    return null;
  }
  return JSON.parse(readFileSync(manifestPath, 'utf-8'));
}

function runInit(options: InitOptions): void {
  const templatesDir = getTemplatesDir();

  if (!SUPPORTED_AGENTS.includes(options.agent)) {
    console.error(`Error: Unsupported agent '${options.agent}'. Supported: ${SUPPORTED_AGENTS.join(', ')}`);
    process.exit(1);
  }

  if (!SUPPORTED_LANGS.includes(options.lang)) {
    console.error(`Error: Unsupported language '${options.lang}'. Supported: ${SUPPORTED_LANGS.join(', ')}`);
    process.exit(1);
  }

  console.log(`\nInitializing AI-DLC templates...`);
  console.log(`  Agent: ${options.agent}`);
  console.log(`  Language: ${options.lang}`);
  console.log(`  Target: ${options.target}`);
  console.log(`  Docs directory: ${options.docsDir}`);
  if (options.dryRun) {
    console.log(`  Mode: DRY RUN (no changes will be made)`);
  }
  console.log('');

  const manifest = loadManifest(templatesDir, options.agent);
  if (!manifest) {
    console.error(`Error: Manifest not found for agent '${options.agent}'`);
    process.exit(1);
  }

  const allCreated: string[] = [];
  const allSkipped: string[] = [];

  for (const artifact of manifest.artifacts) {
    // Check if artifact applies to this agent
    if (artifact.when?.agent && artifact.when.agent !== options.agent) {
      continue;
    }

    const source = artifact.source;

    if (source.type === 'templateDir') {
      const fromDir = join(templatesDir, resolveVariables(source.fromDir || '', options));
      const toDir = join(options.target, resolveVariables(source.toDir, options));

      const result = copyDirectory(fromDir, toDir, options);
      allCreated.push(...result.created);
      allSkipped.push(...result.skipped);
    } else if (source.type === 'templateFile') {
      const fromFile = join(templatesDir, resolveVariables(source.from || '', options));
      const toDir = join(options.target, resolveVariables(source.toDir, options));
      const fileName = source.rename ? resolveVariables(source.rename, options) : basename(fromFile);
      const toFile = join(toDir, fileName);

      if (existsSync(fromFile)) {
        // Always process template files for variable replacement
        const wasCreated = copyFile(fromFile, toFile, options, true);
        
        if (wasCreated) {
          allCreated.push(relative(options.target, toFile));
        } else {
          allSkipped.push(relative(options.target, toFile));
        }
      }
    }
  }

  // Summary
  if (allCreated.length > 0) {
    console.log(`${options.dryRun ? 'Would create' : 'Created'} files:`);
    for (const file of allCreated) {
      console.log(`  + ${file}`);
    }
  }

  if (allSkipped.length > 0) {
    console.log(`\nSkipped (already exist):`);
    for (const file of allSkipped) {
      console.log(`  - ${file}`);
    }
  }

  if (allCreated.length === 0 && allSkipped.length === 0) {
    console.log('No templates found to install.');
  } else {
    console.log(`\n${options.dryRun ? 'Dry run complete.' : 'Done!'}`);
    if (!options.dryRun && allCreated.length > 0) {
      console.log('\nNext steps:');
      console.log('  1. Review the generated files');
      console.log('  2. Use /aidlc-start in Claude Code to begin your AI-DLC workflow');
    }
  }
}

function main(): void {
  const args = process.argv.slice(2);
  const { command, options } = parseArgs(args);

  switch (command) {
    case 'init':
      runInit(options as InitOptions);
      break;
    case 'help':
      showHelp();
      break;
    case 'version':
      showVersion();
      break;
    default:
      if (args.length === 0) {
        showHelp();
      } else {
        console.error(`Unknown command: ${args[0]}`);
        console.error('Run "ai-dlccc --help" for usage information.');
        process.exit(1);
      }
  }
}

main();
