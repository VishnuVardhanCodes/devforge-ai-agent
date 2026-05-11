<div align="center">

<img src="https://img.shields.io/badge/DevForge-AI%20Software%20Factory-6366f1?style=for-the-badge&logo=robot&logoColor=white" alt="DevForge" />

# ⚡ DevForge AI Software Factory 

**An intelligent, autonomous AI agent that generates full-stack production-ready projects from a single prompt.**

[![Version](https://img.shields.io/badge/version-0.2.0-6366f1?style=flat-square)](https://github.com/VishnuVardhanCodes/devforge-ai-agent)
[![Agent](https://img.shields.io/badge/agent-gitagent%20v0.2.0-22d3ee?style=flat-square)](https://github.com/open-gitagent)
[![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.x-f59e0b?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/dashboard-React%20%2B%20Vite-61dafb?style=flat-square&logo=react)](./dashboard)

<br/>

> 🤖 Type a prompt. Watch the agent work. Get a complete project — instantly.

<br/>

</div>

---

## 🌟 What is DevForge?

DevForge is an **AI-powered software factory** built on the `gitagent` framework. It takes a natural language prompt (e.g., *"create a chatbot app using React"*) and autonomously scaffolds a fully structured, ready-to-run project — complete with source code, configuration, dependencies, and documentation.

It ships with a **real-time React dashboard** where you can:
- Submit prompts and watch live terminal output stream in
- See all generated files in a dynamic file explorer
- Preview the final generated project structure

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🧠 **AI Pipeline Orchestration** | Multi-step pipeline that thinks, designs, codes, tests, and documents |
| ⚡ **Real-time Terminal Streaming** | Live output logs streamed to the UI via Server-Sent Events (SSE) |
| 📁 **Dynamic File Explorer** | Real generated file tree shown in the UI after each run |
| 🛠 **Smart Project Detection** | Detects project type from prompt keywords — React, Node API, etc. |
| 🧪 **Test Generation Skill** | Auto-generates test scaffolding for generated projects |
| 🐞 **Debug Skill** | Autonomous project debugging pipeline |
| 📝 **README Auto-generation** | Creates professional documentation per project |
| 🎯 **Multi-skill Agent** | Modular skill system — add new capabilities without touching core logic |

---

## 🏗 Architecture

```
devforge-agent/
│
├── agent.yaml                  # Agent configuration (skills, version, metadata)
├── SOUL.md                     # Agent identity & personality
├── RULES.md                    # Agent operating constraints
│
├── skills/                     # 🧠 Modular AI skills
│   ├── generate-react-app/     # React app scaffolding skill
│   ├── generate-node-api/      # Node.js REST API skill
│   ├── debug-project/          # Auto-debugging skill
│   ├── test-generator/         # Test suite generation skill
│   ├── pipeline-orchestrator/  # Master skill that chains others
│   ├── create-readme/          # Documentation generation skill
│   ├── deploy-project/         # Deployment automation skill
│   ├── project-explainer/      # Code explanation skill
│   └── analyze-project/        # Project analysis skill
│
├── dashboard/                  # 🖥 React + Vite real-time UI
│   ├── src/
│   │   ├── pages/Dashboard.jsx # Main dashboard page
│   │   ├── components/
│   │   │   ├── Terminal.jsx    # Live terminal with SSE streaming
│   │   │   ├── FileExplorer.jsx# Dynamic real file tree viewer
│   │   │   ├── PromptBox.jsx   # Prompt input with loading state
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   └── PreviewPanel.jsx# Output preview panel
│   └── server.js               # Express API bridge (port 3001)
│
├── demo-output/                # 📦 All AI-generated projects land here
├── demo-prompts/               # Sample prompts for quick testing
├── mock-claude.js              # Smart project generator (agent engine)
├── gitclaw / gitclaw.cmd       # CLI runner scripts
└── run-demo.bat                # One-click demo launcher (Windows)
```

---

## 🔧 Pipeline Steps

When you submit a prompt, DevForge runs a **7-step autonomous pipeline**:

```
Step 1 → 🔍 Analyze project requirements from prompt
Step 2 → 🏗  Design system architecture & folder structure
Step 3 → 📦 Create project manifest (package.json, configs)
Step 4 → 🛠  Generate core application source code
Step 5 → 🧪 Scaffold automated test suites
Step 6 → 📝 Generate professional documentation (README.md)
Step 7 → ✅ Validate all files & report success
```

All steps stream to the UI terminal in real time. Generated files appear in the File Explorer automatically when the pipeline completes.

---

## 🖥 Supported Project Types

| Prompt Keywords | Generated Project |
|---|---|
| `react`, `chatbot`, `ui`, `frontend` | React App with `App.jsx`, `components/`, `index.css`, `index.html` |
| `node`, `api`, `express`, `todo`, `rest` | Node.js REST API with routes, middleware, `.env.example` |
| `next`, `nextjs` | Next.js App Router scaffold *(coming soon)* |
| `ecommerce`, `shop` | Full-stack E-commerce scaffold *(coming soon)* |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js `>= 18.x`
- npm `>= 9.x`

### 1. Clone the Repository

```bash
git clone https://github.com/VishnuVardhanCodes/devforge-ai-agent.git
cd devforge-ai-agent
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Dashboard Dependencies

```bash
cd dashboard
npm install
```

### 4. Start the Dashboard (Dev Mode)

```bash
npm run dev
```

This runs **both** the Vite (React) frontend and the Express API bridge concurrently:
- 🌐 Frontend: `http://localhost:5173`
- 🔌 API Server: `http://localhost:3001`

### 5. Generate Your First Project

1. Open `http://localhost:5173` in your browser
2. Type a prompt in the input box (e.g., *"create a chatbot application using React"*)
3. Click **Generate Project**
4. Watch the terminal stream live logs
5. See your generated files appear in the File Explorer!

---

## 🎮 CLI Usage

You can also run DevForge from the command line:

**Windows:**
```cmd
run-demo.bat demo-prompts\react-app.txt
```

**Any OS:**
```bash
node mock-claude.js -p "create a todo API using express"
```

The generated project will be saved in `demo-output/`.

---

## 📂 Sample Prompts

Try these prompts in the dashboard or CLI:

```
"create a chatbot application using react"
"build a todo REST API using express and node.js"
"generate an e-commerce backend API"
"create a react frontend with authentication"
```

---

## 🧠 Skills System

DevForge is built on a **modular skills architecture**. Each skill is a self-contained unit with its own `SKILL.md` prompt and configuration.

To add a new skill:

1. Create a folder under `skills/your-skill-name/`
2. Write a `SKILL.md` with the prompt and metadata
3. Register it in `agent.yaml` under `skills:`

```yaml
skills:
  - generate-react-app
  - generate-node-api
  - debug-project
  - your-new-skill       # ← just add it here
```

---

## 📸 Dashboard Preview

```
┌────────────────────────────────────────────────────────────────────────┐
│  ⚡ DevForge AI Software Factory                              v0.2.0   │
├─────────────────────────────────────────┬──────────────────────────────┤
│  📁 Generated Files                     │  ● ● ●  gitclaw output       │
│  demo-output/                           │                              │
│  └── react-chatbot/                     │  DevForge v0.2.0 initialized │
│      ├── 📄 package.json                │  🚀 Received prompt...       │
│      ├── 📄 README.md                   │  ▶ Invoking pipeline...      │
│      ├── 📄 index.html                  │  ▶ [1/7] generate-project    │
│      └── 📂 src/                        │    ∟ Created: package.json   │
│          ├── 🟡 App.jsx                 │    ∟ Created: App.jsx        │
│          ├── 🟡 index.jsx               │    ∟ Created: ChatWindow.jsx  │
│          └── 📂 components/             │  ✅ Pipeline completed!       │
│              ├── 🟡 ChatWindow.jsx      │                              │
│              └── 🟡 MessageInput.jsx    │  _                           │
├─────────────────────────────────────────┴──────────────────────────────┤
│  🟢 Live Preview / API Status                      localhost:3000       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-skill`
3. Commit your changes: `git commit -m 'Add amazing skill'`
4. Push to the branch: `git push origin feature/amazing-skill`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Vishnu Vardhan Codes**

⭐ Star this repo if DevForge helped you build something awesome!

[![GitHub stars](https://img.shields.io/github/stars/VishnuVardhanCodes/devforge-ai-agent?style=social)](https://github.com/VishnuVardhanCodes/devforge-ai-agent)

</div>