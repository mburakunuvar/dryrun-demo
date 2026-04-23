---
name: "Issue 6 — Code Review and Performance"
about: "AI-powered code review of the live deployed app; findings become new issues"
title: "Code Review and Performance"
labels: "copilot-cli"
---

## Task
Perform a code review of the full application (targeting the live deployed app):

1. **Code quality review** — focus on best practices, error handling, accessibility
2. **Performance review** — focus on asset optimization, render-blocking resources, caching

The findings from each review should be filed as four new GitHub issues using `gh issue create`, **in this exact order so that "Deploy latest version to Azure" is the last issue created**:
1. Fix: missing alt attributes and semantic HTML
2. Fix: render-blocking CSS and missing meta tags
3. Write and run unit tests for the application
4. Deploy latest version to Azure (trigger the existing workflow with `gh workflow run "Azure Static Web Apps CI/CD"`) — **must be filed last**

After filing the issues, generate a `suggested_improvements.md` report in the repo root summarizing all findings and recommendations from the review.

## Assigned to
Copilot CLI — review the codebase, file the issues, generate the report.

## Note
This step happens after the **Azure Deployment** issue. The reviews target the live deployed app.

## Completion
Once the issues are created, the report is generated, and changes are committed and pushed, close this issue from the GitHub UI or with `gh issue close <this-issue-number>`.
