# Import the Base class used to define our models
#from backend.database import Base
from database import Base
# Import required SQLAlchemy column types
from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

# Import Python's enum module to define status options
import enum

# Define possible task statuses using an Enum (acts like a dropdown with fixed choices)
class TaskStatus(str, enum.Enum):
    in_progress = "in_progress"
    completed = "completed"
    failed = "failed"

# Define the Task table: This table stores information about tasks
class Task(Base):
    __tablename__ = "task"  # Name of the table in the database

    id = Column(Integer, primary_key=True, index=True)  # Unique ID for each task
    username = Column(String, nullable=False)           # Name of the person who created the task
    description = Column(String, nullable=False)        # Description of the task
    status = Column(Enum(TaskStatus), default=TaskStatus.in_progress)  
    # Status of the task: can be "in_progress", "completed", or "failed"

# Define the Data table: This table stores measurement data related to tasks
class Data(Base):
    __tablename__ = "data"  # Name of the table in the database
    #### id, current, voltage, task_id are exacply name of the table column in db !!
    id = Column(Integer, primary_key=True, index=True)   # Unique ID for each data row
    current = Column(Integer, nullable=False)            # Current measurement
    voltage = Column(Integer, nullable=False)            # Voltage measurement

    # Link this data entry to a specific task using a foreign key
    task_id = Column(Integer, ForeignKey("task.id"), nullable=False)

    # Create a relationship so we can easily access the task from the data
    task = relationship("Task", backref="data")


