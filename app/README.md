# FastAPI + React App Setup Guide

This guide explains how to build and run a full-stack app using **FastAPI** for the backend and **React** for the frontend, connected to a PostgreSQL database.
This app provides a simple end-to-end demonstration of a full stack system where users can create tasks, trigger background computations, and analyze results.

---

## App Overview

The goal of the app is to simulate a background computation workflow. Users can:

1. Fill in the **task name**, **description**, and select the **number of points to generate**.
2. Click **"Create Task"** to start the process.
3. The app marks the task status as **"in progress"**.
4. Once the simulated calculation (random number generation) completes, the task status updates to **"completed"**.
5. Additional buttons appear:
   - **"Delete Task"** – to remove the task
   - **"Show Plot Task"** – to view results as a **scatter plot** and **histogram**

All results are stored in a PostgreSQL database and the system is designed to be extended for more advanced data processing.

The following image shows the **task manager** part of the app interface. Here, users can view all created tasks, monitor their status, and actions like deleting or visualizing task data.

![app_task_menager](https://github.com/user-attachments/assets/9d0b2987-4618-4a09-b20f-748b308e7af3)

---

##  Prerequisites

Make sure the PostgreSQL database is already created with the necessary tables and columns.

For this guide, we assume:

- **Database Name**: `task` # <- or 'yourdbname'
- **Host**: `localhost`
- **Port**: `5432`  # <- match the port from postgresql.conf
- **Username**: `youruser`
- **Password**: `yourpassword`

➡ Follow the [database_creation](../database_creation/) guide to set up the database in WSL2 and test the connection with DBeaver._

---

## 📁 Project Structure

### Frontend (React)
- Text field to enter filter (number of data points)
- Text field to enter task info
- Buttons to:
  - Create task
  - Delete task
  - Show plots (scatter, histogram)
- Real-time task list with status (in progress, completed, failed)

### Backend (FastAPI)
- Database Tables: `task`, `data`
- Endpoints:
  - `POST /task/create`
  - `GET /task/list`
  - `DELETE /task/{id}`
  - `GET /task/{task_id}/data`
- Background task system to populate the `data` table
- Docker support for deployment

---


```
project_app/
├── backend/
│   ├── main.py              ✅ FastAPI app entry point and route definitions
│   ├── models.py            ✅ SQLAlchemy ORM models for DB tables
│   ├── database.py          ✅ Database engine and session setup
│   ├── task_logic.py        ✅ Task creation, deletion, listing logic
│   ├── requirements.txt     ✅ Python package dependencies
│   ├── Dockerfile.backend   ✅ Docker config for backend service
│   ├── Others.py            🚧 Placeholder for extra backend logic (TBD)
├── frontend/
│   ├── src/
│   │   ├── api.js            ✅ API functions to call FastAPI backend
│   │   ├── App.js            ✅ Main UI logic
│   │   ├── TaskForm.js       ✅ Component to create a task
│   │   ├── TaskList.js       ✅ Component to list and delete tasks
│   │   ├── ScatterPlot.js    ✅ Component to create plot
│   │   ├── HistogramPlot.js  ✅ Component to create plot
│   │   ├── ScatterPage.js    ✅ Page that renders the scatter plot
│   │   ├── HistogramPage.js  ✅ Page that renders the histogram
│   │   └── index.js          ✅ React entry point (renders App)
│   ├── Dockerfile.frontend   ✅ Docker config for frontend service
├── docker-compose.yml        ✅ Launches backend + frontend containers together
├── package.json              ✅ React app dependencies and metadata

```

---

## Step 0: Create the Main Project Folder

```bash
mkdir project_app
cd project_app
```

---

## Step 1: Set Up the Backend

```bash
mkdir backend && cd backend
touch main.py database.py models.py task_logic.py requirements.txt Dockerfile.backend
```

Install backend dependencies (inside a virtualenv):

```bash
pip install fastapi uvicorn psycopg2-binary sqlalchemy pydantic asyncpg
pip freeze > requirements.txt
```

---

## Step 2: Set Up the Frontend

```bash
cd ../
npx create-react-app frontend
```

If you're behind a proxy:

```bash
npm config set strict-ssl false
```

You should see:

```
Success! Created frontend at /path/to/project_app/frontend
```

---

## Application Logic Summary

After setting up both the backend and frontend structure, here’s a breakdown of each file’s purpose. These tables explain the responsibilities of all main components in both the backend and frontend folders.

## Backend Script Roles

| File            | Purpose |
|-----------------|---------|
| `main.py`       | Entry point for FastAPI app and route definitions |
| `database.py`   | PostgreSQL connection setup using SQLAlchemy |
| `models.py`     | SQLAlchemy ORM models for `task` and `data` tables |
| `schemas.py`    | Pydantic models for request/response validation |
| `task_logic.py` | Functions for creating, listing, deleting tasks |
| `requirements.txt` | List of dependencies |
| `Dockerfile.backend` | Docker setup for backend |

You can create backend files using (as explained in step 1):

```bash
touch main.py database.py schemas.py models.py task_logic.py
```
---
## Frontend Component Roles

| Component/File     | Purpose                                           | Details |
|--------------------|---------------------------------------------------|---------|
| `App.js`           | Entry point; sets up routing and global state     | Uses `BrowserRouter`, `Routes`, and `useState` to manage page navigation and task filters |
| `api.js`           | Central API communication layer                   | Defines `createTask`, `fetchTasks`, and `deleteTask` with fetch calls to FastAPI backend |
| `FilterBar.js`     | UI for task parameters                            | Controlled component with input for number of data points; updates `filters` state |
| `TaskForm.js`      | Submits new task to backend                       | Uses form fields and `createTask()` to send task info and filters |
| `TaskList.js`      | Displays all tasks and actions                    | Polls backend every 2 seconds, lists tasks, and includes delete and plot buttons |
| `ScatterPage.js`   | Shows scatter plot for a task                     | Extracts `taskId` via `useParams`, renders `ScatterPlot` component |
| `HistogramPage.js` | Shows histogram plot for a task                   | Similar to `ScatterPage`, uses `HistogramPlot` for visual output |
| `ScatterPlot.js`   | Renders the scatter plot visualization            | Accepts `taskId`, fetches related data from backend and renders plot |
| `HistogramPlot.js` | Renders the histogram visualization               | Same logic as `ScatterPlot.js`, but shows a histogram instead |


---
## Docker Integration

The project includes Docker support for running the full stack locally or in production.

### Components & Features:
1. **Backend**  – Containerized with Dockerfile.backend, running the FastAPI app with dependencies (requirements.txt).
2. **Frontend** – Built and served using `Dockerfile.frontend`, which compiles the React app and serves it with Nginx.
3. **Compose** with three services:
   - Backend – Builds from ./backend using Dockerfile.backend, exposes port 8000, mounts the source code as a volume for live development, and waits for the database to become healthy before starting.
   - Frontend – Builds from ./frontend using Dockerfile.frontend, exposes the React app on port 3000, and mounts the local source for development purposes.
   - Database (PostgreSQL) – Uses the official postgres:15 image, initializes with configured database name, user, and password. A named volume (pgdata) ensures data persistence. Includes a health check to signal readiness    to dependent services.

### Usage:
- `docker-compose up --build`: Build and start all services.
- `docker-compose down`: Stop all services.
- `docker volume rm project_app_pgdata`: (Optional) Remove database volume to reset DB.
- `docker-compose logs -f`: View real-time logs of all services.

### Development Notes:
- For development, volume mounts allow code changes without rebuilding.
- For production, remove volume mounts and rebuild images before deployment.
- Use a `.env` file to manage environment variables and secrets.


