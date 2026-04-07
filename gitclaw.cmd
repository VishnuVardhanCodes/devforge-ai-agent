@echo off
setlocal enabledelayedexpansion

rem Check for --demo flag and strip it from arguments
set "IS_DEMO=false"
set "RAW_ARGS=%*"
set "CLEAN_ARGS="

for %%a in (%*) do (
    if "%%a"=="--demo" (
        set "IS_DEMO=true"
    ) else (
        if defined CLEAN_ARGS (
            set "CLEAN_ARGS=!CLEAN_ARGS! %%a"
        ) else (
            set "CLEAN_ARGS=%%a"
        )
    )
)

if "!IS_DEMO!"=="true" (
    set "PATH=%~dp0mock-bin;!PATH!"
) else (
    set "PATH=%~dp0node_modules\.bin;!PATH!"
)

npx gitagent !CLEAN_ARGS!
