#!/bin/bash

# DevForge Professional Demo Script
# Usage: ./run-demo.sh [prompt_file]

PROMPT_FILE=${1:-"demo-prompts/todo-api.txt"}

if [ ! -f "$PROMPT_FILE" ]; then
    echo "❌ Error: Prompt file $PROMPT_FILE not found."
    exit 1
fi

PROMPT_CONTENT=$(cat "$PROMPT_FILE")

echo "=========================================="
echo "🚀 DevForge AI Software Factory - DEMO"
echo "=========================================="
echo "Target: $PROMPT_FILE"
echo "Prompt: $PROMPT_CONTENT"
echo "------------------------------------------"

# Execute using our gitclaw wrapper
./gitclaw run pipeline-orchestrator -d . "$PROMPT_CONTENT"

echo "------------------------------------------"
echo "✅ Demo Completed! Check the output directory."
echo "=========================================="
