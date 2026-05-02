# Quick Start Guide

## Environment Setup Complete! ✅

Your 3-layer architecture is now instantiated. Here's what was created:

### Directory Structure
```
Mil Apparel/
├── .tmp/                    # Temporary files (gitignored)
├── execution/               # Python scripts
│   ├── README.md
│   └── hello_world.py      # Example script
├── directives/              # SOPs in Markdown
│   ├── README.md
│   └── example_hello_world.md  # Example directive
├── .env                     # Environment variables
├── .gitignore              # Git protection
├── README.md               # Architecture documentation
├── AGENTS.md               # Original instructions
├── requirements.txt        # Python dependencies
└── QUICKSTART.md          # This file
```

## Next Steps

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Edit `.env` and add your API keys:
```bash
# Example:
GOOGLE_SHEETS_SPREADSHEET_ID=your_id_here
API_KEY=your_key_here
```

### 3. Set Up Google OAuth (if needed)
- Go to Google Cloud Console
- Enable required APIs (Sheets, Drive, etc.)
- Download credentials.json
- Replace the placeholder credentials.json with your actual file

### 4. Try the Example
The example demonstrates the full workflow:
```bash
python execution/hello_world.py "Your Name"
```

### 5. Create Your First Real Workflow

**Step 1**: Create a directive in `directives/`
```markdown
# My Task

## Goal
What you want to accomplish

## Inputs
- Input 1: Description

## Tools/Scripts
- `execution/my_script.py` - What it does

## Process
1. Step by step

## Outputs
What gets created

## Edge Cases
Known issues
```

**Step 2**: Create the execution script in `execution/`
```python
#!/usr/bin/env python3
"""
My Script - Does something useful
"""

def main():
    # Your deterministic code here
    pass

if __name__ == "__main__":
    main()
```

**Step 3**: Ask the AI to run your workflow
```
"Execute the [task name] directive with these inputs: ..."
```

## How to Use the Architecture

### As a User
1. Tell the AI what you want to accomplish
2. The AI reads the relevant directive (or asks you to clarify)
3. The AI orchestrates the execution scripts
4. Results are delivered (usually to cloud services)

### When Things Break (Self-Annealing)
The AI will:
1. Read the error message
2. Fix the script
3. Test it again
4. Update the directive with learnings
5. System gets stronger

## Key Principles

✅ **Cloud deliverables** - Results go to Google Sheets/Slides/etc, not local files  
✅ **Deterministic execution** - Scripts should be reliable and testable  
✅ **Living documentation** - Directives improve over time  
✅ **Check for tools first** - Reuse before creating  
✅ **Self-anneal** - Learn from errors  

## Examples of What You Can Build

- **Data collection**: Scrape websites → process → Google Sheets
- **Email campaigns**: Read contacts → send personalized emails → track responses
- **Report generation**: Fetch data → analyze → create Google Slides
- **API integrations**: Connect services → sync data → monitor status
- **Automated workflows**: Complex multi-step processes with error handling

## Getting Help

- Read `AGENTS.md` for the full architecture explanation
- Check `directives/README.md` for directive structure
- Review `execution/README.md` for Python best practices
- Study the example workflow to see it all in action

---

**You're all set!** Start by creating your first directive or ask the AI to help you build a workflow.
