# Directives

This folder contains SOPs (Standard Operating Procedures) written in Markdown. Each directive defines:

- **Goal**: What needs to be accomplished
- **Inputs**: What data or parameters are needed
- **Tools/Scripts**: Which execution scripts to use
- **Outputs**: What the result should look like
- **Edge Cases**: Known issues or special scenarios to handle

## Example Directive Structure

```markdown
# [Task Name]

## Goal
What we're trying to accomplish.

## Inputs
- Input 1: Description
- Input 2: Description

## Tools/Scripts
- `execution/script_name.py` - What it does

## Process
1. Step one
2. Step two
3. Step three

## Outputs
- What gets created/returned

## Edge Cases
- Known issue 1: How to handle
- Known issue 2: How to handle

## Notes
Any learnings, API constraints, timing considerations, etc.
```

## Naming Convention

Use descriptive names with underscores:
- `scrape_website.md`
- `create_google_sheet.md`
- `send_email_campaign.md`
