# template-azureapp.md

Purpose: Reusable template to accelerate resolving Issue #1 (Azure Static Web App Setup) without modifying any repository files or GitHub workflow files.

## Scope Guardrails

- Do not edit any file under .github/workflows.
- Only perform infrastructure setup, secret setup, workflow trigger, verification, and `azure_resource.md` update.

## Reusable Prompt (Copy/Paste)

Use this exact prompt when starting execution:

"address issue #1 Azure Static Web App Setup (Pre-demo) based on template-azureapp.md"

When executing, follow this template strictly and avoid unrelated changes.

## Fill-In Inputs

Replace placeholders before running commands.

- [SUBSCRIPTION_ID]: Azure subscription ID
- [SUBSCRIPTION_NAME]: Optional friendly name
- [RESOURCE_GROUP]: Resource group name (example: live-demo-dryrun-rg)
- [LOCATION]: Azure region (example: westeurope)
- [STATIC_WEB_APP_NAME]: Static Web App name (example: live-demo-dryrun-swa)
- [GITHUB_OWNER]: GitHub org/user (example: mburakunuvar)
- [GITHUB_REPO]: Repository name (example: live-demo-dryrun)
- [BRANCH]: Git branch (default: main)
- [WORKFLOW_NAME]: Azure Static Web Apps CI/CD
- [LIVE_URL]: Expected site URL after deployment (example: https://<hostname>.azurestaticapps.net)

## Runbook (Issue #1)

1. Create or confirm resource group.
2. Create Azure Static Web App.
3. Retrieve deployment token from Azure.
4. Add GitHub Actions secret named AZURE_STATIC_WEB_APPS_API_TOKEN.
5. Trigger workflow [WORKFLOW_NAME].
6. Wait for workflow completion and confirm success.
7. Verify the live URL responds with HTTP 200.
8. Close Issue #1 with evidence.

## Command Checklist (CLI)

Run from anywhere with az and gh authenticated.

```bash
# 0) Optional: set subscription context
az account set --subscription "[SUBSCRIPTION_ID]"

# 1) Create resource group (idempotent)
az group create \
  --name "[RESOURCE_GROUP]" \
  --location "[LOCATION]"

# 2) Create Static Web App (idempotent if already exists with same name)
az staticwebapp create \
  --name "[STATIC_WEB_APP_NAME]" \
  --resource-group "[RESOURCE_GROUP]" \
  --location "[LOCATION]" \
  --sku Free \
  --query "{name:name,defaultHostname:defaultHostname,resourceGroup:resourceGroup}" \
  -o json

# 3) Get deployment token
TOKEN=$(az staticwebapp secrets list \
  --name "[STATIC_WEB_APP_NAME]" \
  --resource-group "[RESOURCE_GROUP]" \
  --query "properties.apiKey" -o tsv)

# 4) Set GitHub repo secret
printf "%s" "$TOKEN" | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN \
  --repo "[GITHUB_OWNER]/[GITHUB_REPO]"

# 5) Trigger deployment workflow
gh workflow run "[WORKFLOW_NAME]" \
  --repo "[GITHUB_OWNER]/[GITHUB_REPO]"

# 6) Get latest run ID for workflow
RUN_ID=$(gh run list \
  --repo "[GITHUB_OWNER]/[GITHUB_REPO]" \
  --workflow "[WORKFLOW_NAME]" \
  --limit 1 --json databaseId --jq '.[0].databaseId')

# 7) Wait until complete
gh run watch "$RUN_ID" \
  --repo "[GITHUB_OWNER]/[GITHUB_REPO]" \
  --interval 10

# 8) Show final run status
gh run view "$RUN_ID" \
  --repo "[GITHUB_OWNER]/[GITHUB_REPO]" \
  --json conclusion,status,url,displayTitle,startedAt,updatedAt

# 9) Verify live URL is accessible
curl -I -L --max-time 20 "[LIVE_URL]"
```

## Completion Evidence (Paste Into Issue #1 Comment)

- Azure Static Web App: [STATIC_WEB_APP_NAME]
- Resource Group: [RESOURCE_GROUP]
- Live URL: [LIVE_URL]
- Secret configured: AZURE_STATIC_WEB_APPS_API_TOKEN
- Workflow: [WORKFLOW_NAME]
- Workflow run URL: [WORKFLOW_RUN_URL]
- Verification: HTTP 200 received from [LIVE_URL]

## Issue Closure Command

```bash
gh issue close 1 \
  --repo "[GITHUB_OWNER]/[GITHUB_REPO]" \
  --comment "Closing as completed. Azure Static Web App is deployed, workflow succeeded, and live URL is reachable."
```

## Quick Sanity Checks

```bash
# Confirm secret exists
gh secret list --repo "[GITHUB_OWNER]/[GITHUB_REPO]"

# Confirm workflow exists
gh workflow list --repo "[GITHUB_OWNER]/[GITHUB_REPO]"

# Confirm open issues
gh issue list --repo "[GITHUB_OWNER]/[GITHUB_REPO]" --state open
```
