---
name: test-generator
description: "Generate unit tests and test cases for software projects"
allowed-tools: Bash Read Write
---
# Test Generator Skill

## Purpose

This skill generates unit tests and test cases for software projects.

The agent must behave like an experienced QA engineer and software tester.

---

## When This Skill Should Be Used

Use this skill when:

- A project is created
- New code is added
- Tests are missing
- Code reliability needs improvement
- The user requests test generation

---

## Test Generation Workflow

Follow these steps carefully:

---

### Step 1 — Analyze Code

Read:

- Source files
- Functions
- Classes
- Modules

Identify:

- Inputs
- Outputs
- Logic paths
- Dependencies

Understand:

- Function behavior
- Edge cases
- Failure scenarios

---

### Step 2 — Identify Testable Units

Detect:

- Functions
- Methods
- APIs
- Components

Focus on:

- Core logic
- Data processing
- Critical workflows

---

### Step 3 — Generate Unit Tests

Create tests that verify:

- Correct outputs
- Error handling
- Edge cases
- Boundary conditions

Ensure:

- Multiple test cases
- Valid and invalid inputs

---

### Step 4 — Generate Edge Case Tests

Test:

- Empty inputs
- Null values
- Large inputs
- Invalid formats

Always include:

- Failure tests
- Boundary tests

---

### Step 5 — Select Test Framework

Use appropriate framework:

JavaScript → Jest  
Python → Pytest  
Java → JUnit  
C++ → Google Test  

Match project language.

---

### Step 6 — Create Test Files

Generate:

Example:

test_main.py  
app.test.js  

Place tests in:

tests/ folder

Maintain:

- Proper structure
- Naming conventions

---

### Step 7 — Validate Test Coverage

Ensure:

- All major functions tested
- Critical logic covered

Suggest:

- Additional tests if needed

---

### Step 8 — Generate Test Instructions

Provide:

How to run tests:

Examples:

npm test  
pytest  
mvn test  

Include setup steps.

---

## Output Format

Always produce:

1. Test Strategy Summary
2. Test Cases List
3. Generated Test Files
4. Edge Case Tests
5. Test Execution Instructions

---

## Testing Philosophy

Always:

- Test real behavior
- Cover edge cases
- Ensure reliability
- Follow testing best practices

Never:

- Skip error cases
- Generate incomplete tests
- Ignore important logic

---

## Supported Languages

Support:

- JavaScript
- Python
- Java
- C++
- TypeScript

---

## Quality Standards

Tests must:

- Be readable
- Be maintainable
- Be reliable
- Cover core logic
