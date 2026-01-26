# 🦞 Clawdbot-Next

**Clawdbot-Next** is a modified version of [Clawdbot](https://www.google.com/search?q=https://github.com/clawdbot/clawdbot), designed to provide a more customizable personal AI agent experience. This project maintains the core architecture while introducing specific enhancements and deployment optimizations.

> **⚠️ Notice**: This project is distributed and modified in accordance with the original Clawdbot license. Please refer to the `LICENSE` file for detailed information.

## ✨ Features (Modified)

* **Agent Core**: Built upon the powerful Clawdbot AI Agent framework.
* **Multi-Channel Support**: Seamless integration with platforms like WhatsApp, Telegram, Discord, and more.
* **Docker Ready**: Simplified deployment using containerization.
* **Enhanced Toolkit**: Custom skills and improved installation workflows.

## 🧠 ClawdMatrix Engine (Modifications)

This repository is an enhanced fork featuring the **ClawdMatrix Engine** — a sophisticated "Prompt Builder Engine" designed to give the bot a dynamic, context-aware brain.

### Key Enhancements

Unlike the original implementation which relies on static system prompts, **ClawdMatrix** introduces a 5-stage cognitive pipeline:

1. **🕵️ Requirement Triangulation**: Analyzes `Domain`, `User Level`, and `Tone` before generating a prompt.
2. **🧩 Dynamic Skill Injection**: Intelligently loads only relevant tool definitions to keep the context window lean and efficient.
3. **🎭 Personality Layer**: Swaps out "Souls" dynamically based on the conversation topic (e.g., switching from a strict "Coder" persona to a friendly "Assistant").
4. **🌊 Streaming Logic**: Optimized for real-time feedback and tool execution status updates.

---

## 🚀 Installation & Setup

You can choose to start quickly using Docker or perform a manual installation for development.

### Method 1: Using Docker (Recommended)

Docker provides an isolated environment and simplifies dependency management.

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
cp .env.example .env
# Edit .env and provide your API keys
docker-compose up -d

```



### Method 2: Manual Installation (Developer Mode)

Required for debugging or contributing to the codebase.

**Prerequisites:**

* [Node.js](https://www.google.com/search?q=https://nodejs.org/) (v20 or higher recommended)
* [pnpm](https://www.google.com/search?q=https://pnpm.io/) (required for workspace management)

1. **Install Dependencies**
```bash
pnpm install

```


2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your settings

```


3. **Build & Start**
```bash
pnpm build
pnpm start

```



---

## 📂 Project Structure

* **apps/**: Main application logic for various platforms (Android, iOS, macOS, Shared).
* **extensions/**: Integrations for Discord, Slack, Telegram, WhatsApp, etc.
* **packages/**: Shared libraries and utilities.
* **scripts/**: Tools for building, deployment, and maintenance.

## 🤝 Attribution & License

This project is a derivative work based on Clawdbot.

* **Original Project**: [Clawdbot](https://www.google.com/search?q=https://github.com/clawdbot/clawdbot).
* **License**: Please see the [LICENSE](https://www.google.com/search?q=./LICENSE) file for terms of use.

## 🤝 Collaboration & Contact

To maintain high response quality and filter out automated spam, please use the following channels for collaboration:

* 💼 **LinkedIn**: [Connect on LinkedIn](https://www.google.com/search?q=https://www.linkedin.com/in/hung-ming-liu-83b63212/)

---

*Generated for the Clawdbot-Next project.*