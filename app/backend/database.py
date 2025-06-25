#####################################

########################################
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError 
from sqlalchemy import text 

#DATABASE_URL =
# Database connection URL: Format -> "postgresql://<user>:<password>@<host>:<port>/<database>"
DATABASE_URL = "postgresql://<user>:<password>@<host>:<port>/<database>"  ### set your psw and db name!!

# Create the connection engine that will manage communication with the PostgreSQL database
engine = create_engine(DATABASE_URL)
# SessionLocal is used to create sessions that allow interaction with the database
# autocommit=False ensures the session is not automatically committed to the database
# autoflush=False prevents SQLAlchemy from automatically flushing changes to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base class is used to define database models (tables)
Base = declarative_base()

# Try to connect to the database --> debug !!
"""try:
    # Attempt to create a session
    session = SessionLocal()
    
    # Try a simple query to check the connection (for example, fetching all tables)
    result = session.execute(text("SELECT 1"))
    print("Connection to the database is successful!")
    
except OperationalError as e:
    print(f"Connection failed: {e}")
finally:
    # Close the session
    session.close()
"""
