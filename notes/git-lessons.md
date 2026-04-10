# Git Lessons

This file is for turning coding sessions into explicit lessons.

## Commit Rule

Use:

- one commit = one idea

Examples:

- `feat: add habit streak display`
- `fix: reset todo editing when date changes`
- `fix: filter habit logs by date range`
- `style: improve habit tracker layout`

Avoid:

- `update`
- `fix error`
- `changes`

## Before Commit Checklist

Before creating a commit:

1. Run `git status`
2. Check whether the changed files belong to one idea
3. If not, split the work into more than one commit
4. Write a commit message that says what changed

## Current Example

Recent commit:

- `Add habit history and streak tracking`

What it grouped together:

- backend support for date range filtering in habit logs
- frontend logic for recent habit history
- frontend streak calculation
- CSS for history dots and streak display

This is acceptable because all of those changes support the same feature.

## Reflection Template

When you finish a coding session, write:

### What I changed

- 

### Why I changed it

- 

### What broke

- 

### What the real cause was

- 

### What I learned

- 
