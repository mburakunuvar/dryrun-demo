---
name: "Issue 5 — Azure Deployment"
about: "Verify and trigger deployment after home, primitives & APE are done"
title: "Azure Deployment"
labels: "agent-mode"
---

## Task
The application is already deployed to Azure Static Web Apps and a CI/CD workflow is in place (`.github/workflows/azure-static-web-apps.yml`).

> ⚠️ **Important**: The workflow only triggers on `workflow_dispatch` — **not on push**. Do NOT push to remote expecting a deployment. Trigger it manually with:
> ```bash
> gh workflow run "Azure Static Web Apps CI/CD"
> ```

For this step:
1. Confirm the **Azure Static Web App Setup**, **Home Page**, **Primitives Page**, and **APE Page** issues are closed
2. Verify the latest changes are live at the deployed URL
3. If anything needs to be re-triggered, trigger the workflow manually using the command above

> ⚠️ **Prerequisite**: The **Home Page**, **Primitives**, and **APE** issues must be closed before deployment. The **Code Review and Performance** issue happens after this step.

## Assigned to
Agent Mode in IDE (VS Code) — prompt: *"The Home Page, Primitives, and APE issues are resolved. Verify the app is deployed and the live site reflects all the latest changes. Trigger a re-deployment if needed."*

## Pre-flight requirement
The presenter must have already completed the **Azure Static Web App Setup** issue before the demo:
- Azure Static Web App created and connected to this repository
- `AZURE_STATIC_WEB_APPS_API_TOKEN` added to the repository secrets

## Completion
Once deployment is verified and the live site is confirmed working, close this issue from the GitHub UI or with `gh issue close <this-issue-number>`.
