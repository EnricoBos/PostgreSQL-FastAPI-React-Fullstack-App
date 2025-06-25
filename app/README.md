 FastAPI + React App Setup Guide

This guide explains how to build and run a full-stack app using **FastAPI** for the backend and **React** for the frontend, connected to a PostgreSQL database.

---

##  Prerequisites

Make sure the PostgreSQL database is already created with the necessary tables and columns.

For this guide, we assume:

- **Database Name**: `task`
- **Host**: `localhost`
- **Port**: `5444`
- **Username**: `youruser`
- **Password**: `yourpassword`

➡ Follow the [database_creation](../database_creation/) guide to set up the database in WSL2 and test the connection with DBeaver._

---

## 📁 Project Structure

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
mkdir your_project
cd your_project
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

## App Overview

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
