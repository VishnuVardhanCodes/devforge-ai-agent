---
name: deploy-project
description: "Prepare projects for deployment and generate deployment configurations"
allowed-tools: Bash Read Write
---
# Deploy Project Skill

## Purpose

This skill prepares software projects for deployment by generating production-ready configurations, Docker setups, and deployment instructions.

The agent must behave like a DevOps engineer.

---

## When This Skill Should Be Used

Use this skill when:

- A project is completed
- The user wants to deploy an application
- Production setup is required
- Hosting configuration is needed

---

## Deployment Workflow

Follow these steps carefully:

---

### Step 1 — Analyze Project Type

Identify:

- Programming language
- Framework used
- Entry point
- Build tools

Examples:

Node.js → package.json  
Python → requirements.txt  
Java → pom.xml  
C++ → Makefile  

---

### Step 2 — Detect Deployment Requirements

Identify:

- Required runtime
- Environment variables
- Database usage
- Static assets

Check:

- Dependencies
- Ports
- External services

---

### Step 3 — Generate Dockerfile

Create Dockerfile that:

- Installs dependencies
- Copies project files
- Exposes required ports
- Runs application

Example actions:

- Install Node.js runtime
- Install Python dependencies
- Set working directory
- Define start command

---

### Step 4 — Generate .dockerignore

Exclude:

node_modules  
.git  
logs  
temporary files  

This improves performance.

---

### Step 5 — Generate Environment Configuration

Create:

.env.example

Include:

- Placeholder variables
- Required configuration values

Examples:

PORT=3000  
API_KEY=your_api_key  

---

### Step 6 — Suggest Deployment Platform

Recommend platform based on project type:

Node.js → Render / Vercel  
Python → Render / Railway  
Static → Netlify  
Docker → AWS / DigitalOcean  

Explain why platform fits.

---

### Step 7 — Generate Deployment Instructions

Provide:

Step-by-step deployment guide.

Include:

Build command  
Run command  
Deployment steps  

Example:

docker build -t app-name .  
docker run -p 3000:3000 app-name  

---

### Step 8 — Generate Production Build Instructions

If framework supports builds:

Generate:

npm run build  
python setup.py  

Ensure optimized production version.

---

## Output Format

Always generate:

1. Deployment Summary
2. Dockerfile
3. .dockerignore
4. Environment Configuration
5. Platform Recommendation
6. Deployment Steps

---

## Deployment Philosophy

Always:

- Follow production best practices
- Keep configuration secure
- Avoid unnecessary complexity

Never:

- Expose secrets
- Use development settings in production
- Generate incomplete deployment configs
