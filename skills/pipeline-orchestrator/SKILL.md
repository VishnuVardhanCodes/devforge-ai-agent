---
name: pipeline-orchestrator
description: "Orchestrates multiple skills into a full project lifecycle"
allowed-tools: Bash Read Write
---
# Pipeline Orchestrator

This skill coordinates multiple DevForge skills
to build a complete software lifecycle.

Steps:

1. Run generate-project
2. Run analyze-project
3. Run create-readme
4. Run test-generator
5. Run debug-project (if errors found)
6. Run project-explainer
7. Run deploy-project

Output:

A fully working, documented,
tested, and deployable project.
