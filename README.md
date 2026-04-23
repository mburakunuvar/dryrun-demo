# ghcp-in-action

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mburakunuvar/ghcp-in-action-demo_v2-DONT-DELETE/generate)

> Click **"Use this template"** above to create your own copy of this repo and follow along with the demo.

A hands-on quick demo showcasing **GitHub Copilot** working across three developer surfaces — the GitHub web UI, your IDE, and your terminal — to build, review, and deploy a mini web application about GitHub Copilot itself.

---

## About This Demo

This demo walks through a realistic developer workflow driven entirely by GitHub Issues. Each issue is assigned to the Copilot tool best suited for the job, demonstrating how the different surfaces complement each other rather than overlap.

By the end of the demo, a small web app has been:
- **Built** (home page, primitives page, APE page)
- **Reviewed** by two AI models with findings filed as new issues
- **Deployed** to Azure via an AI-generated GitHub Actions workflow

### Content Pages

| Page | Topic | Source |
|---|---|---|
| **Home** (`index.html`) | GitHub Copilot Across Surfaces — the four surfaces at a glance | [dailydoseofghcp.com](https://www.dailydoseofghcp.com/posts/ghcp-across-multiple-surfaces.html) |
| **Primitives** (`primitives.html`) | The 8 Primitives of GitHub Copilot Customization | [microsoftnorman/customize-your-repo-with-github-copilot](https://github.com/microsoftnorman/customize-your-repo-with-github-copilot) |
| **APE** (`ape.html`) | Agentic Platform Engineering with GitHub Copilot (Git-Ape) | [Azure/git-ape](https://github.com/Azure/git-ape) |

---

## GitHub Copilot Surfaces

| Tool | Where | Best for |
|---|---|---|
| **GitHub Coding Agent** | GitHub.com (Issues / PRs) | Async, cloud-based coding tasks kicked off from an issue |
| **Agent Mode** | IDE (VS Code) | Interactive, local workspace tasks with real-time iteration |
| **Copilot CLI** | Terminal | Shell commands, DevOps tasks, and quick code tasks without leaving the terminal |

---

## Prerequisites

Before running this demo, make sure the following are in place:

- A GitHub repository with **7 issues** (see [Getting Started](#getting-started) below to create them)
- **GitHub Copilot** enabled on the account and the repository
- **VS Code** with the repo cloned locally and Agent Mode enabled
- **Copilot CLI** installed and authenticated — verify with `gh auth status`

> 🎬 **The live demo starts at Issue 1.** All issues are worked through during the demo.

---

## Getting Started

After creating a new repo from this template, the **7 demo issues are not created automatically** — GitHub does not trigger workflows on the initial commit from a template.

Run this command once to seed all issues and labels:

```bash
gh workflow run "Setup Demo Issues" --repo <owner>/<your-new-repo>
```

After ~30 seconds, verify the issues were created:

```bash
gh issue list --repo <owner>/<your-new-repo>
```

> 💡 You can also trigger the workflow from the **Actions** tab → **Setup Demo Issues** → **Run workflow**.

---

## Demo Scenarios

### Issue 1 — Azure Static Web App Setup
**Tool**: Azure Portal / az CLI &nbsp;|&nbsp; **Surface**: Azure Portal

Create an Azure Static Web App, connect it to the repo, add `AZURE_STATIC_WEB_APPS_API_TOKEN` to repo secrets, and verify the live URL. The deployment workflow is `workflow_dispatch` only — trigger it manually after setup to deploy the blank pages.

---

### Issue 2 — Scaffold and Beautify the Home Page
**Tool**: GitHub Coding Agent &nbsp;|&nbsp; **Surface**: GitHub.com

Copilot is assigned the issue directly from the GitHub Issues UI. The blank `index.html` already exists — the agent scaffolds and beautifies it as a **GitHub Copilot Across Surfaces** overview with a brief introduction to the four surfaces (GitHub.com, IDE, CLI, SDK) and two navigation buttons linking to `primitives.html` and `ape.html`. The agent opens a draft PR with its changes.

---

### Issue 3 — Primitives Page
**Tool**: Copilot CLI &nbsp;|&nbsp; **Surface**: Terminal

From the terminal, Copilot CLI scaffolds the Primitives child page using a natural language prompt. The page covers the eight primitives of GitHub Copilot customization. The suggestion is reviewed, executed, and committed — without ever leaving the command line.

```sh
gh copilot suggest "scaffold a Primitives child page based on the structure in index.html using template-primitives.txt"
```

---

### Issue 4 — Agentic Platform Engineering Page
**Tool**: Agent Mode &nbsp;|&nbsp; **Surface**: IDE (VS Code)

In VS Code, Agent Mode reads the existing page structure and builds a matching APE (Agentic Platform Engineering) child page. The page covers Git-Ape — a multi-agent platform engineering framework built on GitHub Copilot for planning, validating, and deploying Azure infrastructure. The agent inspects files, proposes edits inline, and can run a local preview to verify the result.

---

### Issue 5 — Azure Deployment
**Tool**: Agent Mode &nbsp;|&nbsp; **Surface**: IDE (VS Code)

> **⚠️ Prerequisite**: Issues #1 (Azure Static Web App Setup), #2 (Home Page), #3 (Primitives Page), and #4 (APE Page) must be closed before deployment. Code Review happens after this step.

Agent Mode confirms Issues 1–4 are closed, checks the existing `.github/workflows/azure-static-web-apps.yml` workflow, triggers the deployment, and the audience sees the fully built app at the live URL.

---

### Issue 6 — Code Review & Performance
**Tool**: Copilot CLI &nbsp;|&nbsp; **Surface**: Terminal

Copilot CLI reviews the live deployed app for code quality and performance:

1. **Code quality review** — best practices, error handling, accessibility
2. **Performance review** — asset optimization, render-blocking resources, caching

The findings are filed as four new GitHub issues using `gh issue create`:
- Fix: missing alt attributes and semantic HTML
- Fix: render-blocking CSS and missing meta tags
- Write and run unit tests for the application
- Deploy latest version to Azure

After filing the issues, Copilot CLI generates a `suggested_improvements.md` report in the repo root summarizing all findings and recommendations.

---

### Fix: missing alt attributes and semantic HTML *(auto-created)*
**Created by**: Copilot CLI during Issue 6 &nbsp;|&nbsp; **Addressed by**: GitHub Coding Agent

Tracks code quality findings surfaced by the review.

---

### Fix: render-blocking CSS and missing meta tags *(auto-created)*
**Created by**: Copilot CLI during Issue 6 &nbsp;|&nbsp; **Addressed by**: GitHub Coding Agent

Tracks performance findings surfaced by the review.

---

### Write and run unit tests *(auto-created)*
**Created by**: Copilot CLI during Issue 6

Write and execute unit tests for the application.

---

### Deploy latest version to Azure *(auto-created)*
**Created by**: Copilot CLI during Issue 6

Trigger the existing Azure Static Web Apps workflow to deploy the updated application.

---

## Quick Reference

| Issue | Task | Tool | Surface |
|---|---|---|---|
| 1 | Azure Static Web App Setup | Azure Portal / az CLI | Azure Portal |
| 2 | Scaffold & Beautify Home Page | GitHub Coding Agent | GitHub.com |
| 3 | Primitives Page | Copilot CLI | Terminal |
| 4 | Agentic Platform Engineering Page | Agent Mode | IDE |
| 5 | Azure Deployment | Agent Mode | IDE |
| 6 | Code Review & Performance | Copilot CLI | Terminal |
| 7 | Clean Up Azure Resources | — | Azure Portal |
| *(auto-created)* | Fix: missing alt attributes and semantic HTML | GitHub Coding Agent | GitHub.com |
| *(auto-created)* | Fix: render-blocking CSS and missing meta tags | GitHub Coding Agent | GitHub.com |
| *(auto-created)* | Write and run unit tests | — | — |
| *(auto-created)* | Deploy latest version to Azure | — | — |

---

## Repo Contents

| File | Description |
|---|---|
| `README.md` | This file |
| `index.html` | Blank home page scaffold — GitHub Copilot Across Surfaces |
| `primitives.html` | Blank primitives page scaffold — The 8 Customization Primitives |
| `ape.html` | Blank APE page scaffold — Agentic Platform Engineering |
| `template-primitives.txt` | Primitives content template (referenced by Issue #3) |
| `template-ape.txt` | APE content template (referenced by Issue #4) |
| `template-azureapp.md` | Reusable runbook for Azure Static Web App setup (Issue #1) |
| `.github/workflows/setup-issues.yml` | Creates issues and labels — trigger manually after using the template (see [Getting Started](#getting-started)) |
| `.github/workflows/azure-static-web-apps.yml` | Manual-trigger deployment to Azure Static Web Apps |
