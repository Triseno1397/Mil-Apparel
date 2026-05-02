#!/usr/bin/env python3
"""
Example execution script: Hello World
Demonstrates the deterministic execution layer of the 3-layer architecture.
"""

import sys
from typing import Optional


def generate_greeting(name: Optional[str] = None) -> str:
    """
    Generate a personalized greeting.
    
    Args:
        name: The name to greet. Defaults to "World" if None or empty.
        
    Returns:
        Formatted greeting string.
    """
    # Handle edge case: empty or None name
    if not name or name.strip() == "":
        name = "World"
    
    # Clean and format the name
    name = name.strip()
    
    # Generate greeting
    greeting = f"Hello, {name}! Welcome to the 3-layer architecture."
    
    return greeting


def main():
    """Main entry point for command line execution."""
    # Get name from command line arguments
    name = sys.argv[1] if len(sys.argv) > 1 else None
    
    # Generate and print greeting
    greeting = generate_greeting(name)
    print(greeting)
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
