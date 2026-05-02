# Execution Scripts

This folder contains deterministic Python scripts that do the actual work. These scripts should be:

- **Reliable**: Handle errors gracefully
- **Testable**: Can be run independently
- **Fast**: Optimize for performance
- **Well-commented**: Explain what's happening
- **Deterministic**: Same inputs = same outputs

## Best Practices

1. **Use environment variables** from `.env` for API keys
2. **Handle errors** with try/except blocks
3. **Log important information** for debugging
4. **Use type hints** for better code clarity
5. **Add docstrings** to explain function purpose

## Common Patterns

### Loading Environment Variables
```python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('API_KEY')
```

### Error Handling
```python
try:
    result = risky_operation()
except SpecificError as e:
    print(f"Error occurred: {e}")
    # Handle gracefully
```

### Command Line Arguments
```python
import sys

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    # Process...
```
