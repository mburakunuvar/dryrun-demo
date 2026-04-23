---
name: "Issue 1 — Azure Static Web App Setup"
about: "Deploy blank pages to Azure Static Web Apps"
title: "Azure Static Web App Setup"
labels: "init-demo"
---

## Task
Create an Azure Static Web App and deploy the repo to it.

### Steps
> The repo already contains `.github/workflows/azure-static-web-apps.yml`. Do **not** use `--login-with-github` (it would create a second workflow and a randomly-named secret).

1. `az login`
2. `az group create --name <rg-name> --location <region>`
3. `az staticwebapp create --name <app-name> --resource-group <rg-name> --location <region> --sku Free`
4. `az staticwebapp secrets list --name <app-name> --resource-group <rg-name> --query "properties.apiKey" -o tsv`
5. `gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --body "<token>"`
6. `gh workflow run "Azure Static Web Apps CI/CD"`
7. Verify the live URL: `az staticwebapp show --name <app-name> --resource-group <rg-name> --query "defaultHostname" -o tsv`
8. Update `azure_resource.md` with the actual resource details, commit and push.
