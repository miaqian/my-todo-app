# Study Plan

This plan is for learning this project in a controlled order.

The goal is not to understand everything at once.
The goal is to build a correct mental model step by step.

## Phase 1: Run The Project Reliably

Objective:

- know what must be running
- know which terminal commands belong to frontend vs backend
- know what a healthy local setup looks like

You should be able to answer:

- what runs on port `3000`
- what runs on port `8000`
- why both are needed in this project
- what `python manage.py runserver` does
- what `npm start` does

Minimum understanding:

- React page and Django API are separate processes
- frontend renders UI
- backend handles data

## Phase 2: Understand One Complete Request

Objective:

- understand one feature from click to database

Use this example:

- add a todo

You should be able to trace:

1. where the button click is handled
2. where `fetch(...)` is called
3. which URL is requested
4. which Django route receives it
5. which view handles it
6. which serializer validates it
7. which model maps to the database table
8. how the response comes back to React

Files to focus on:

- `frontend/src/App.js`
- `frontend/src/api.js`
- `backend/backend/urls.py`
- `backend/todos/urls.py`
- `backend/todos/views.py`
- `backend/todos/serializers.py`
- `backend/todos/models.py`

Do not move on until this flow feels concrete.

## Phase 3: Understand Database Sync

Objective:

- understand why model changes do not automatically update the database

You should be able to explain:

- what a model is
- what a migration is
- what `python manage.py migrate` does
- why code can be newer than the actual database schema

Files to focus on:

- `backend/todos/models.py`
- `backend/todos/migrations/`

Core lesson:

- model code describes structure
- migrations apply structure changes
- database stores the real data

## Phase 4: Understand Reusable CRUD Pattern

Objective:

- notice that most of the project follows the same request pattern

You should compare:

- create todo
- delete todo
- edit todo
- add habit
- create habit log

Look for the repeated pattern:

- frontend event
- fetch request
- URL
- viewset action
- serializer
- model
- response

This is where the project starts to feel smaller.

## Phase 5: Learn To Debug By Classification

Objective:

- stop debugging randomly

Every bug should be classified first:

1. frontend state / rendering
2. request URL / network
3. backend route / serializer
4. database / migration

You should get used to asking:

- did the click handler run?
- what request was sent?
- which server answered?
- what status code came back?
- is the backend running?
- is the schema current?

Use:

- `notes/debug-log.md`

to record real examples.

## Phase 6: Learn Small-Commit Workflow

Objective:

- connect coding changes to clear ideas

Before each commit:

1. decide the change scope
2. confirm which files belong to that scope
3. write a commit message that names the idea

Use:

- `notes/git-lessons.md`

to record what each commit taught you.

## What Not To Worry About Yet

Do not try to master these immediately:

- deployment architecture
- advanced DRF internals
- production database setup
- authentication
- optimization
- advanced React patterns

Those matter later.
For now, depth on one small full-stack flow is more valuable than shallow exposure to everything.

## Weekly Working Method

For each study session:

1. pick one feature or one bug
2. trace the full request flow
3. write 3-5 lines in notes
4. make one clean commit
5. record what you now understand that you did not understand before

## Success Standard

You are making progress if you can do these without guessing:

- explain what each main folder does
- explain why frontend and backend are separate
- trace one request end to end
- explain one real bug and its true cause
- describe why a commit was made

That is enough foundation for a first project.
