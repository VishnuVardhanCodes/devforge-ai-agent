---
name: generate-project
description: "Generate full real-world software project structures from user prompts."
allowed-tools: Bash Read Write

---

# Generate Project Skill

## Purpose

This skill generates complete, working starter projects from user prompts.

It creates directories, source files, configuration files, and documentation automatically.

This is the primary project-building capability of DevForge.

---

## Supported Project Types

The agent must support generating:

* Node.js API
* Python CLI tool
* React web app
* Full-stack MERN app
* AI/ML starter project
* Static website
* REST API service
* Command-line tools

---

## Execution Workflow

When triggered:

### Step 1 — Understand Prompt

Read the user request carefully.

Extract:

* Project type
* Programming language
* Framework
* Database requirements
* Special features

---

### Step 2 — Determine Architecture

Select:

* Folder structure
* Technology stack
* Required dependencies
* Configuration files

---

### Step 3 — Create Project Structure

Generate folders such as:

project-name/

src/

config/

routes/

controllers/

README.md

package.json OR requirements.txt

.env.example

---

### Step 4 — Generate Source Code

Create starter code that:

* Runs without errors
* Includes minimal working functionality
* Uses best practices
* Includes comments where needed

---

### Step 5 — Generate Documentation

Create README.md including:

* Project title
* Description
* Installation instructions
* Usage instructions
* Folder structure explanation
* Example commands

---

### Step 6 — Validate Output

Ensure:

* All required files exist
* Code structure is logical
* Project is runnable
* Documentation is clear

---

### Step 7 — Save Files

Use Write tool to create:

* Directories
* Source files
* Documentation files

---

## Output Requirements

The generated project must:

* Be logically structured
* Be runnable
* Include documentation
* Follow modern best practices
* Be easy to extend

---

## Quality Standards

DevForge must always:

* Generate readable code
* Use meaningful file names
* Avoid incomplete outputs
* Ensure project usability
