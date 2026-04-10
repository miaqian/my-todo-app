# Request Flow

This note tracks the exact path from a user action to the database.

## Example: Add Todo

### Step 1: User action

The user types text into the input and clicks `+ Add` in:

- `frontend/src/App.js`

### Step 2: Frontend handler

`handleAdd` in `App.js` runs.

It:

- checks that the input is not empty
- builds a JSON body with:
  - `title`
  - `completed`
  - `date`
- sends a `POST` request to:
  - `${API_BASE}/todos/`

### Step 3: API base URL

`API_BASE` is defined in:

- `frontend/src/api.js`

If requests go to the wrong server, this file is one of the first places to check.

### Step 4: Django top-level routing

The request reaches:

- `backend/backend/urls.py`

`/api/` is routed to:

- `todos.urls`

### Step 5: App-level routing

Inside:

- `backend/todos/urls.py`

the router connects `/todos/` to:

- `TodoViewSet`

### Step 6: View logic

Inside:

- `backend/todos/views.py`

`TodoViewSet` inherits from `ModelViewSet`.

That means DRF provides the default create/list/update/delete behavior.

For `POST /api/todos/`, DRF runs create logic automatically.

### Step 7: Serializer validation

Inside:

- `backend/todos/serializers.py`

`TodoSerializer` checks:

- which fields are allowed
- whether the data types are valid

If valid, the serializer creates a `Todo` model instance.

### Step 8: Database write

Inside:

- `backend/todos/models.py`

the `Todo` model defines the database fields.

If the database schema matches the model, Django writes the new row.

If the schema is outdated, this is where create requests can fail.

### Step 9: Response back to frontend

Django returns the created todo as JSON.

Then in `App.js`:

- the new todo is appended to `todos`
- the input is cleared
- React re-renders the list

## Same Pattern For Other Features

This same request chain also applies to:

- deleting a todo
- editing a todo
- toggling completed
- adding a habit
- checking a habit log

Only the URL, method, and data change.

## Debugging Checklist

When a request fails, inspect in this order:

1. Did the button handler run?
2. What URL did `fetch` call?
3. What HTTP method was used?
4. Did the frontend send the expected JSON?
5. Did Django receive the request?
6. Did the serializer reject the data?
7. Is the database schema up to date?
