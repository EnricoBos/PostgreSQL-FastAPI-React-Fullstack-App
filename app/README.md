# FastAPI + React App Setup Guide

This guide explains how to build and run a full-stack app using **FastAPI** for the backend and **React** for the frontend, connected to a PostgreSQL database.
This app provides a simple end-to-end demonstration of a full-stack system where users can create tasks, trigger background computations, and analyze results.

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

![app_task_menager](https://github.com/user-attachments/assets/45231083-ee1d-4ac2-843f-c8baeed294f5)

---

##  Prerequisites

Make sure the PostgreSQL database is already created with the necessary tables and columns.

For this guide, we assume:

- **Database Name**: `task`
- **Host**: `localhost`
- **Port**: `5432`  # <- match the port from postgresql.conf
- **Username**: `youruser`
- **Password**: `yourpassword`

➡ Follow the [database_creation](../database_creation/) guide to set up the database in WSL2 and test the connection with DBeaver._

---

## 📁 Project Structure

### Frontend (React)
- Text field to enter filter (number of point)
- Text field to enter task info
- Buttons to:
  - Create task
  - Delete task
  - Show plots (scatter, histogram)
- Real-time task list with status (in progress, completed, failed)

### Backend (FastAPI)
- Tables: `task`, `data`
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
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── task_logic.py
│   ├── requirements.txt
│   ├── Dockerfile.backend
│   ├── Others.py (TBD)
├── frontend/
│   ├── src/
│   │   ├── api.js            ✅ API functions to call FastAPI backend
│   │   ├── App.js            ✅ Main UI logic
│   │   ├── TaskForm.js       ✅ Component to create a task
│   │   ├── TaskList.js       ✅ Component to list and delete tasks
│   │   ├── ScatterPlot.js    ✅ Component to create plot
│   │   ├── HistogramPlot.js  ✅ Component to create plot
│   │   ├── ScatterPage.js    ✅ Component to create plot
│   │   ├── HistogramPage.js  ✅ Component to create plot
│   │   └── index.js          ✅ React entry point (renders App)
│   ├── Dockerfile.frontend
├── docker-compose.yml
├── package.json              ✅ Contains metadata and dependencies for the React app

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
Success! Created frontend at /path/to/your_project/frontend
```

---



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

You can create backend boilerplate files using:

```bash
touch main.py database.py schemas.py models.py task_logic.py
```

---
