from pydantic import BaseModel
from enum import Enum

#schemas.py – it's an essential part of how FastAPI connects Pydantic (for data validation) with SQLAlchemy (for database models). #
#A schema is a Pydantic model that defines the structure, types, and validation rules for the data you send and receive via the API.
#It says: “This is what my API expects” or “This is what my API will return”#

# Define a restricted set of possible values for a task's status using Enum
class TaskStatus(str, Enum): # This defines a restricted set of possible values for a task's status.
    in_progress = "in_progress"
    completed = "completed"
    failed = "failed"

# TaskCreate schema: Used when creating a new task via the API (POST request)
class TaskCreate(BaseModel): # This schema is used when a user creates a new task via the API (POST).
    username: str
    description: str
    num_points: int = 10  # this is a simple filter how many point a user can select

# TaskOut schema: Used to serialize the task data when sending a response (GET request)
class TaskOut(BaseModel):
    id: int
    username: str
    description: str
    status: TaskStatus

    class Config:
        orm_mode = True
