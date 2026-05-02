# Mil Apparel - Agent Environment

This project uses a 3-layer architecture designed to maximize reliability by separating probabilistic AI decision-making from deterministic code execution.

## Architecture Overview

### Layer 1: Directive (What to do)
- **Location**: `directives/`
- **Purpose**: SOPs written in Markdown
- **Contains**: Goals, inputs, tools/scripts, outputs, edge cases
- **Format**: Natural language instructions

### Layer 2: Orchestration (Decision making)
- **Purpose**: Intelligent routing and coordination
- **Responsibilities**:
  - Read directives
  - Call execution tools in the right order
  - Handle errors
  - Ask for clarification
  - Update directives with learnings

### Layer 3: Execution (Doing the work)
- **Location**: `execution/`
- **Purpose**: Deterministic Python scripts
- **Characteristics**: Reliable, testable, fast
- **Handles**: API calls, data processing, file operations, database interactions

## Why This Works

**Error Compounding Problem**: 90% accuracy per step = 59% success over 5 steps

**Solution**: Push complexity into deterministic code. The AI focuses on decision-making, not manual execution.

## Directory Structure

```
Mil Apparel/
├── .tmp/                 # Temporary files (never commit)
├── execution/            # Python scripts (deterministic tools)
├── directives/           # SOPs in Markdown (instruction set)
├── .env                  # Environment variables and API keys
├── credentials.json      # Google OAuth credentials
├── token.json           # Google OAuth token
├── .gitignore           # Protect sensitive files
└── AGENTS.md            # This architecture documentation
```

## Operating Principles

### 1. Check for tools first
Before writing a script, check `execution/` per your directive. Only create new scripts if none exist.

### 2. Self-anneal when things break
- Read error message and stack trace
- Fix the script and test it again
- Update the directive with learnings
- Example: Hit API rate limit → find batch endpoint → rewrite script → test → update directive

### 3. Update directives as you learn
Directives are living documents. When you discover:
- API constraints
- Better approaches
- Common errors
- Timing expectations

Update the directive! But don't create or overwrite directives without asking.

## Self-Annealing Loop

Errors are learning opportunities:
1. Fix it
2. Update the tool
3. Test tool, make sure it works
4. Update directive to include new flow
5. System is now stronger

## File Organization Philosophy

**Deliverables vs Intermediates:**
- **Deliverables**: Google Sheets, Google Slides, or other cloud-based outputs (user can access)
- **Intermediates**: Temporary files in `.tmp/` (can be deleted and regenerated)

**Key Principle**: Local files are only for processing. Deliverables live in cloud services.

## Getting Started

1. **Set up environment variables** in `.env`
2. **Add Google OAuth credentials** (replace `credentials.json` placeholder)
3. **Create your first directive** in `directives/`
4. **Write execution scripts** in `execution/`
5. **Let the AI orchestrate** the workflow

## Summary

The AI sits between human intent (directives) and deterministic execution (Python scripts).

**Be pragmatic. Be reliable. Self-anneal.**
