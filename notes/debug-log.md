# Debug Log

This file records real problems from the project and what they actually meant.

## Problem: `ERR_CONNECTION_REFUSED`

Observed behavior:

- frontend could not load `/api/todos/`
- browser showed request failures to port `8000`

Actual cause:

- Django was not running on port `8000`

Meaning:

- the browser tried to contact the backend
- there was no process listening on that port

Lesson:

- before debugging React code, confirm the backend server is actually running

## Problem: `Cannot POST /api/todos/`

Observed behavior:

- submitting a todo returned an HTML error page

Actual cause:

- the request reached the frontend dev server instead of Django

Meaning:

- the browser made a request to the wrong server
- React dev server does not provide the Django API route

Lesson:

- when an API request returns HTML instead of JSON, first check which server handled it

## Problem: `Failed to fetch`

Observed behavior:

- frontend showed a generic network failure

Possible causes in this project:

- backend server is not running
- request is going to the wrong port
- CORS / proxy setup is wrong

Lesson:

- `Failed to fetch` is usually a network path problem, not a serializer problem

## Problem: Todo create fails after adding `date` to the model

Observed behavior:

- frontend could not create a new todo

Actual cause:

- the model included `date`
- the SQLite table did not yet include the `date` column
- only the initial migration had been applied

Meaning:

- code and database schema were out of sync

Lesson:

- changing `models.py` is not enough
- database migrations must also be applied

## Project-Specific Debug Rule

Always classify the failure first:

1. frontend UI/state
2. request URL / network
3. backend route / serializer
4. database schema / migration

If you do not classify first, debugging becomes random.
