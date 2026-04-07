@echo off
set PROMPT_FILE=%1
if "%PROMPT_FILE%"=="" set PROMPT_FILE=demo-prompts\todo-api.txt

if not exist %PROMPT_FILE% (
    echo ❌ ERROR: Prompt file %PROMPT_FILE% not found.
    exit /b 1
)

set /p PROMPT_CONTENT=<%PROMPT_FILE%

echo ==========================================
echo 🚀 DevForge AI Software Factory - DEMO
echo ==========================================
echo Target: %PROMPT_FILE%
echo Prompt: %PROMPT_CONTENT%
echo ------------------------------------------

call gitclaw.cmd run pipeline-orchestrator -d . "%PROMPT_CONTENT%"

echo ------------------------------------------
echo ✅ Demo Completed! Check the output directory.
echo ==========================================
pause
