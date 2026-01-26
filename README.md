# 🦞 Clawdbot-Next

**Clawdbot-Next** is a modified version of [Clawdbot](https://www.google.com/search?q=https://github.com/clawdbot/clawdbot), designed to provide a more customizable personal AI agent experience. This project maintains the core architecture while introducing specific enhancements and deployment optimizations.

> **⚠️ Notice**: This project is distributed and modified in accordance with the original Clawdbot license. Please refer to the `LICENSE` file for detailed information.

## ✨ Features (Modified)

* **Agent Core**: Built upon the powerful Clawdbot AI Agent framework.
* **Multi-Channel Support**: Seamless integration with platforms like WhatsApp, Telegram, Discord, and more.
* **Docker Ready**: Simplified deployment using containerization.
* **Enhanced Toolkit**: Custom skills and improved installation workflows.

## 🧠 ClawdMatrix Engine (Modifications / 與原版之差異)

This repository is an enhanced fork of the original [Clawdbot](https://github.com/clawdbot/clawdbot), featuring the **ClawdMatrix Engine** — a sophisticated "Prompt Builder Engine" designed to give the bot a dynamic, context-aware brain.

### Key Enhancements (核心優化)

Unlike the original implementation which relies on static system prompts, **ClawdMatrix** introduces a 5-stage cognitive pipeline:

1.  **🕵️ Requirement Triangulation (需求三角定位)**:
    - Instead of treating all text equally, the engine analyzes `Domain`, `User Level`, and `Tone` before generating a prompt.
    - **Hybrid Routing**: Uses ultra-fast Regex rules for obvious intents (e.g., code blocks -> Coding Mode) and falls back to LLM inference for nuance.

2.  **💉 Logic Injection (動態邏輯注入)**:
    - Implements the "Skill Instantiation Protocol".
    - Skills are no longer static text blocks. They are dynamic templates where variables like `{Input_Data}` are automatically mapped to domain-specific contexts (e.g., `$Stock_Feed` in Finance mode vs. `$AST_Tree` in Coding mode).

3.  **🛡️ Quality Gates & Fallbacks (品質閘門與保底機制)**:
    - Includes a **Guide Mode** that detects ambiguous requests and strictly asks for clarification instead of guessing.
    - Built-in "Safe Mode" ensures the bot never crashes even if the local classification model fails.

### Architecture Comparison

| Feature | Original Clawdbot | **ClawdMatrix Engine** |
| :--- | :--- | :--- |
| **Prompt Generation** | Static String Concatenation | Dynamic Logic Assembly |
| **Context Awareness** | Passive (Reactive) | Active (Triangulation) |
| **Skill Adaptability** | Fixed Description | Variable Injection |
| **Ambiguity Handling** | Best Effort Guess | **Guide Mode** (Clarification Request) |


## 🚀 Installation & Setup

You can choose to start quickly using Docker or perform a manual installation for development.

### Method 1: Using Docker (Recommended)

Docker provides an isolated environment and simplifies the dependency management.

1. **Clone the repository**
```bash
git clone https://github.com/cyrilliu1974/clawdbot-next.git
cd clawdbot-next

```


2. **Run the Setup Script**
The project includes an automated script to assist with environment configuration:
```bash
./docker-setup.sh

```


3. **Manual Docker Compose (Alternative)**
If you prefer to manage the containers manually:
```bash
# Copy the environment template
cp .env.example .env
# Edit .env and provide your API keys
vim .env

# Start the services
docker-compose up -d

```



### Method 2: Manual Installation (Developer Mode)

Required for debugging or contributing to the codebase.

**Prerequisites:**

* [Node.js](https://www.google.com/search?q=https://nodejs.org/) (v20 or higher recommended).
* [pnpm](https://www.google.com/search?q=https://pnpm.io/) (used for workspace package management).

1. **Install Dependencies**
```bash
pnpm install

```


2. **Configure Environment**
Copy the example file and fill in your settings (API Keys, Bot Tokens, etc.):
```bash
cp .env.example .env

```


3. **Build the Project**
```bash
pnpm build

```


4. **Start Services**
```bash
pnpm start

```


*For development with hot-reload:*
```bash
pnpm dev

```



## 📂 Project Structure

* **apps/**: Main application logic for various platforms (Android, iOS, macOS, Shared).
* **extensions/**: Integrations for Discord, Slack, Telegram, WhatsApp, etc.
* **packages/**: Shared libraries and utilities.
* **scripts/**: Tools for building, deployment, and maintenance.

## 🤝 Attribution & License

This project is a derivative work based on Clawdbot.

* **Original Project**: [Clawdbot](https://www.google.com/search?q=https://github.com/clawdbot/clawdbot).
* **License**: Please see the [LICENSE](https://www.google.com/search?q=./LICENSE) file in the root directory for terms of use.

## 🤝 Collaboration 


### Contact Information
To maintain high response quality and filter out automated spam, please use the following channels:

* 💼 **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/hung-ming-liu-8063299a/) —— *Please include a brief note regarding your interest.*



---

*Generated for the Clawdbot-Next project.*