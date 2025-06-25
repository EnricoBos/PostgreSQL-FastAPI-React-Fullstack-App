##create_tables ##############################
import psycopg2

# Connect to the database (replace with your own connection details)
conn = psycopg2.connect(
    dbname="mydb",
    user="myuser",
    password="mypassword",  
    host="localhost",
    port=5432
)
cursor = conn.cursor()

# Create the 'task' table with the specified columns
cursor.execute("""
CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    description TEXT NOT NULL
);
""")
conn.commit()

# Create the 'data' table with the specified columns and the 'task_id' foreign key
cursor.execute("""
CREATE TABLE IF NOT EXISTS data (
    id SERIAL PRIMARY KEY,
    current NUMERIC NOT NULL,
    voltage NUMERIC NOT NULL,
    task_id INTEGER,
    FOREIGN KEY (task_id) REFERENCES task(id)
);
""")
conn.commit()

print("Tables 'data' and 'task' created successfully, with 'task_id' as a foreign key in 'data'.")

# Close the connection
cursor.close()
conn.close()
