---
agent: 'agent'
description: 'List GitHub issues for this repository with optional filters'
argument-hint: 'Optional: state (open/closed/all), label, or assignee'
---

List the GitHub issues for the current repository using the `gh` CLI.

By default, list **open** issues without prompting the user. Only ask for filters if the user explicitly requested a different state, a label filter, or an assignee filter in their message.

Run the following command in the terminal:

```bash
gh issue list --state open --limit 50 --json number,title,state,labels,assignees,createdAt
```

- If the user specified a different state (e.g. "closed", "all"), replace `--state open` accordingly.
- If the user specified a label filter, append `--label "<label>"`.
- If the user specified an assignee filter, append `--assignee "<username>"`.
- Do NOT prompt the user for these values — infer them from the user's message, and default to `--state open` with no extra filters otherwise.

After running the command, present the results as a Markdown table with these columns:

| # | Title | State | Labels | Assignee | Created |

Rules:
- Sort by most recently created first
- If a field is empty, show `—`
- Highlight any issues that are more than 30 days old with a ⚠️ prefix on the title
- After the table, show a brief summary: total count, how many are open vs closed
