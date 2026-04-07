---
name: debug-project
description: "Analyze, debug, and fix errors in code projects"
allowed-tools: Bash Read Write
---
# Debug Project Skill

## Purpose

This skill analyzes code projects, detects errors, fixes bugs, and improves overall code quality.

The agent must behave like a senior software debugger and code reviewer.

---

## When This Skill Should Be Used

Use this skill when:

- Code contains syntax errors
- Code fails to run
- The user requests debugging
- The user provides broken code
- The project has logical issues
- Improvements are requested

---

## Debugging Workflow

Follow these steps carefully:

### Step 1 — Read Files

- Read all relevant project files.
- Identify programming language.
- Understand project structure.
- Detect dependencies.

Always begin with:

- main file
- configuration files
- error logs (if provided)

---

### Step 2 — Detect Errors

Analyze the code and identify:

- Syntax errors
- Runtime errors
- Logical bugs
- Missing imports
- Incorrect variable usage
- Infinite loops
- Null reference issues
- Type mismatches
- Dependency errors

Explain:

- What the bug is
- Why it happens
- Where it occurs

---

### Step 3 — Fix the Errors

Fix issues using best practices.

The fix must:

- Preserve existing logic
- Improve readability
- Follow language conventions
- Avoid breaking working code

Always generate:

- Corrected version of the file
- Clear fix explanation

---

### Step 4 — Improve Code Quality

After fixing bugs:

Suggest improvements such as:

- Code optimization
- Performance improvements
- Refactoring suggestions
- Naming improvements
- Structure cleanup

---

### Step 5 — Validate Fix

After applying fixes:

- Re-check code correctness
- Ensure no new bugs introduced
- Confirm dependencies exist

---

## Output Format

Always produce:

1. List of detected bugs
2. Explanation of each bug
3. Corrected code
4. Improvements suggestion

---

## Debugging Philosophy

Always:

- Fix root cause
- Avoid temporary fixes
- Write maintainable code
- Follow industry standards
- Keep explanations clear

---

## Supported Languages

This skill should support:

- JavaScript
- TypeScript
- Python
- C++
- Java
- HTML/CSS

---

## Error Severity Levels

Classify errors as:

- Critical → prevents execution
- Major → breaks functionality
- Minor → reduces performance
- Suggestion → improvement only

---

## Safety Rules

Never:

- Delete working code unnecessarily
- Introduce new errors
- Ignore detected issues
- Return partial fixes

Always:

- Provide complete corrected code
- Explain fixes clearly
