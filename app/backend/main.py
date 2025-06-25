from fastapi import FastAPI, BackgroundTasks, HTTPException
#from . import models, schemas, task_handler, database
import models # Import the database models (Task, Data)
import schemas  # Import the Pydantic schemas for data validation and response formatting
import task_handler # Import the background task handler
import database # Import the database setup and session

from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

###  Use absolute imports inside your .py files, based on the enrico_app root package
"""
FastAPI: Main class to create your web API.

BackgroundTasks: Enables you to run tasks in the background (e.g., calculations after user triggers them).

HTTPException: Used to raise errors with a status code, like 404 (Not Found).

Import your local Python modules:

    models: SQLAlchemy table definitions (Task, Data)

    database: DB connection (SessionLocal, engine)

    schemas: Pydantic schemas (for validation and response)

    task_handler: Background logic (e.g., simulate computation)

from sqlalchemy.orm import Session --> Allows type hinting for database sessions (optional here, but useful).

from fastapi.middleware.cors import CORSMiddleware --> This lets your backend accept requests from another domain (e.g., React on localhost:3000).

"""

## This creates the actual database tables from your SQLAlchemy models (Task, Data)
models.Base.metadata.create_all(bind=database.engine) 

##  Initialize FastAPI app
app = FastAPI() 

# Define allowed origins (frontend can be on localhost:3000):  React frontend origin
origins = ["http://localhost:3000"] 

# Add CORS middleware to allow React app to connect with the FastAPI backend
app.add_middleware(CORSMiddleware,
                    allow_origins=origins,  # allow React to connect 
                    allow_credentials=True, 
                    allow_methods=["*"], # allow all HTTP methods (GET, POST, etc.)
                    allow_headers=["*"])

 # Endpoint to create a new task --> Retrieve data: When your React app sends a request to /task/create: It uses POST to send a new task (username + description).
 # Like writing in the book 
@app.post("/task/create", response_model=schemas.TaskOut)
def create_task(task: schemas.TaskCreate, background_tasks: BackgroundTasks):
    db = database.SessionLocal()
    new_task = models.Task(username=task.username, description=task.description)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    print("Received num_points:", task.num_points) ### debug !!
    # Pass num_points to the background task
    background_tasks.add_task(task_handler.run_calculation, new_task.id, task.num_points)
    db.close()
    return new_task

#  GET /task/list--> Send (create or modify) data : When your React app loads and wants to show all tasks: It uses GET
#Returns a list of all tasks in the DB
@app.get("/task/list", response_model=list[schemas.TaskOut])
def list_tasks():
    """
    This endpoint fetches all tasks from the database and returns them as a list.
    """
    db = database.SessionLocal()
    tasks = db.query(models.Task).all()
    db.close()
    return tasks

# Endpoint to delete a task by ID
@app.delete("/task/{task_id}")
def delete_task(task_id: int):
    """
    This endpoint deletes a task and all related data from the database.
    """
    db = database.SessionLocal()
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        db.close()
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Delete all Data linked to the task
    db.query(models.Data).filter(models.Data.task_id == task_id).delete()
    
    # Delete the task itself
    db.delete(task)
    
    db.commit()  # Commit the changes (delete operations)
    db.close()
    
    return {"detail": "Task and related data deleted"}

# Endpoint for the root URL (welcome message)
@app.get("/")
async def read_root():
    """
    A simple endpoint to test if the backend is running.
    """
    return {"message": "Welcome to your FastAPI app!"}

# Add endpoint for visualization Fetching Data from database
@app.get("/task/{task_id}/data")
def get_task_data(task_id: int):
    """
    This endpoint fetches all the data related to a specific task using the task's ID.
    """
    db = database.SessionLocal()
    # Fetch all data associated with the given task ID
    data = db.query(models.Data).filter(models.Data.task_id == task_id).all()
    db.close()
    # Return the data in a structured format (index, current value, voltage)
    return [
        {"index": i, "current": d.current, "voltage": d.voltage}
        for i, d in enumerate(data)
    ]