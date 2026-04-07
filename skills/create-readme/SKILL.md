---
name: create-readme
description: "Generate professional README documentation for projects"
allowed-tools: Bash Read Write
---
# Create README Skill

## Purpose

This skill generates professional, complete, and easy-to-understand README.md files for software projects.

The agent must behave like an experienced technical writer and software engineer.

---

## When This Skill Should Be Used

Use this skill when:

- A new project is created
- Documentation is missing
- README.md does not exist
- README.md needs improvement
- User requests project documentation

---

## README Generation Workflow

Follow these steps carefully:

---

### Step 1 — Analyze Project

Read all project files and detect:

- Programming language
- Framework used
- Project purpose
- Dependencies
- Folder structure
- Entry point file

Identify:

- Key functionality
- Features
- APIs (if present)

---

### Step 2 — Generate Project Title

Create a clear project title based on:

- Project purpose
- Functionality

Title must be:

- Concise
- Professional
- Descriptive

---

### Step 3 — Write Project Description

Generate:

- Short summary (1–2 sentences)
- Detailed description
- Use-case explanation

Explain:

- What the project does
- Who should use it
- Why it is useful

---

### Step 4 — Generate Features Section

List key features:

Use bullet points.

Examples:

- User authentication
- API integration
- Data processing
- Error handling

Features must reflect actual code.

---

### Step 5 — Installation Instructions

Provide step-by-step installation:

Include:

- Requirements
- Dependencies
- Setup commands

Examples:

npm install  
pip install  
git clone  

Ensure commands match project type.

---

### Step 6 — Usage Instructions

Explain how to run project:

Include:

- Run commands
- Example usage
- CLI instructions (if applicable)

Example:

npm start  
python main.py  

---

### Step 7 — Project Structure Section

Display folder structure.

Example:

project-name/  
│── src/  
│── public/  
│── README.md  
│── package.json  

Explain major folders.

---

### Step 8 — Configuration Section

If configuration files exist:

Explain:

- .env usage
- Settings
- API keys

---

### Step 9 — API Documentation (If Applicable)

If APIs exist:

Generate:

- Endpoint list
- Request format
- Response format

---

### Step 10 — Building Section (Optional)

Provide:

- Build instructions (if applicable)

---

### Step 11 — License Section

Add:

- Default MIT license text

Unless specified otherwise.

---

## Output Format

Always generate:

- Complete README.md
- Clean Markdown formatting
- Professional structure
- Clear sections

---

## Documentation Philosophy

Always:

- Be beginner-friendly
- Be developer-friendly
- Provide real examples
- Avoid vague descriptions

---

## Quality Standards

README must:

- Be readable
- Be structured
- Be complete
- Reflect actual project logic

Never:

- Generate fake features
- Skip required sections
- Produce incomplete documentation
