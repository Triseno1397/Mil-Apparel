# Example Task: Hello World

## Goal
Demonstrate the 3-layer architecture by creating a simple "hello world" workflow.

## Inputs
- `name`: The name to greet (string)

## Tools/Scripts
- `execution/hello_world.py` - Generates a personalized greeting

## Process
1. Agent reads this directive
2. Agent calls `execution/hello_world.py` with the name parameter
3. Script returns formatted greeting
4. Agent reports result to user

## Outputs
- Formatted greeting string: "Hello, [name]! Welcome to the 3-layer architecture."

## Edge Cases
- **Empty name**: Script should use "World" as default
- **Special characters**: Script should handle unicode properly

## Notes
This is a simple example to demonstrate the architecture. Real directives will:
- Call APIs
- Process data
- Create deliverables in cloud services
- Handle complex error scenarios
