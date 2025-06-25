# Import models and database session
#from . import Task, Data, TaskStatus  # Task and Data are ORM classes, TaskStatus is an Enum
#from .models import Task, Data
#from .schemas import TaskStatus
#from .database import SessionLocal          # Function to get a database session

from models import Task, Data
from schemas import TaskStatus
from database import SessionLocal

import time, random                         # Standard modules for simulating work and randomness

def run_calculation(task_id: int, num_points: int = 10):
    # Open a new database session
    #SessionLocal is a class constructor, not a session object yet.
    #To actually get a real session object, you must call it with parentheses: SessionLocal().
    
    db = SessionLocal() # db is a real, live database session object, connected to your database.

    try: # Do stuff: db.query(), db.add(), db.commit()
        #  Search the Task table for the one with the given task_id.
        task = db.query(Task).filter(Task.id == task_id).first() # This line is querying your database to retrieve a single Task object based on its id. Here’s how it works

        # If the task is not found, exit early
        if not task:
            return

        # Set the task status to "in_progress"
        task.status = TaskStatus.in_progress
        db.commit()  # Save change to DB

        # Simulate a long-running calculation (e.g. processing data)
        for _ in range(num_points):
            # Create a new Data row with random values between 1 and 100
            val = Data(
                current=random.randint(1, 100),
                voltage=random.randint(1, 100),
                task_id=task_id  ## add task id in column task_id !
            )
            db.add(val)         # Stage the data object for insertion
            time.sleep(0.2)     # Simulate delay to mimic computation


        db.commit()  # Commit all inserted Data rows to DB

        # Mark the task as completed
        task.status = TaskStatus.completed
        db.commit()

    except:
        # If there's any exception during the process, mark task as failed
        task.status = TaskStatus.failed
        db.commit()

    finally:
        # Always close the DB session
        db.close()

# run_calculation(task_id=1)