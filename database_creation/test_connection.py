# test_connection.py

from sqlalchemy import create_engine

# Replace these with your actual credentials
db_url = "postgresql://myuser:mypassword@127.0.0.1:5432/mydb" # <- match the port from postgresql.conf

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        print("Connection to PostgreSQL was successful!")
except Exception as e:
    print("Connection failed:", e)
