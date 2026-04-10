# Project Map

This project has two main parts:

- `frontend/`: the React app that renders the page and handles user interaction
- `backend/`: the Django app that provides API endpoints and talks to the database

## Frontend

Important files:

- `frontend/src/App.js`
  Main todo page.
  Handles:
  - loading todos
  - adding todos
  - editing todos
  - deleting todos
  - choosing a date from the calendar
  - rendering the `HabitTracker`

- `frontend/src/HabitTracker.js`
  Habit feature UI.
  Handles:
  - loading habits
  - loading habit logs
  - adding a habit
  - deleting a habit
  - checking and unchecking a habit for a selected date
  - showing recent history and streaks

- `frontend/src/api.js`
  Stores the API base URL used by the frontend.
  This is the place to check when requests go to the wrong server.

- `frontend/src/App.css`
  Main styling for the page, todo list, calendar, and habit tracker.

## Backend

Important files:

- `backend/manage.py`
  Django command entry point.
  Used for:
  - `runserver`
  - `migrate`
  - `makemigrations`
  - `check`

- `backend/backend/settings.py`
  Django configuration.
  Includes:
  - installed apps
  - database setup
  - CORS
  - debug mode

- `backend/backend/urls.py`
  Top-level URL router.
  Routes `/api/` into the `todos` app.

- `backend/todos/models.py`
  Database structure in code.
  Defines:
  - `Todo`
  - `Habit`
  - `HabitLog`

- `backend/todos/serializers.py`
  Converts model objects to JSON and validates incoming JSON.

- `backend/todos/views.py`
  Request handling logic.
  Uses DRF `ModelViewSet` for CRUD behavior.

- `backend/todos/urls.py`
  API routes for todos, habits, and habit logs.

- `backend/todos/migrations/`
  Database change history.
  If models change, migrations must be applied to keep the database in sync.

## Mental Model

When the app works correctly:

1. User interacts with the React page in `frontend/`
2. React sends an HTTP request to `/api/...`
3. Django receives the request in `backend/`
4. Django view + serializer validate and process the data
5. Django reads or writes the database
6. Django returns JSON
7. React updates local state and re-renders the page

## Rule Of Thumb

When debugging, first ask:

1. Is this a frontend state problem?
2. Is this a request / URL problem?
3. Is this a backend route or serializer problem?
4. Is this a database / migration problem?
