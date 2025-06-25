# PostgreSQL Setup for FastAPI + React App (WSL2)

This guide helps to set up a PostgreSQL database in **WSL2 (Ubuntu)** to be used by the FastAPI + React app. It includes:

- PostgreSQL installation and configuration
- Creating a superuser and database
- Allowing external tools like DBeaver to connect
- Connecting and initializing tables using Python

---

## Step 1: Install & Start PostgreSQL in WSL2

Start by preparing your WSL2 Ubuntu environment to install and run PostgreSQL.

1. **Update the package list**  
   Updates the list of available software and versions to make sure you're installing the most current packages:
   ```bash
   sudo apt update
   ```

2. **Install PostgreSQL and useful extensions**  
   Installs the PostgreSQL server and `postgresql-contrib`, which includes helpful tools and extensions (like `uuid-ossp`, `hstore`, etc.):
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

3. **Start the PostgreSQL service**  
   Activates PostgreSQL so it starts running in the background:
   ```bash
   sudo service postgresql start
   ```

4. **Enable PostgreSQL to start on boot**  
   Ensures PostgreSQL will start automatically every time the system boots:
   ```bash
   sudo systemctl enable postgresql
   ```

---

##  Step 2: Create a PostgreSQL Superuser and Database

1. Enter PostgreSQL CLI:
   ```bash
   sudo -u postgres psql
   ```

2. Create a superuser (replace `myuser` and `mypassword`):
   ```sql
   CREATE ROLE myuser WITH LOGIN SUPERUSER PASSWORD 'mypassword';
   ```

3. Create a database owned by your user:
   ```sql
   CREATE DATABASE mydb OWNER myuser;
   ```

4. Exit:
   ```sql
   \q
   ```

---

## Step 3: Allow External Connections (for Tools like DBeaver)

> Replace `16` with your PostgreSQL version.

Edit config files:

```bash
sudo nano /etc/postgresql/16/main/postgresql.conf
```

- Find and edit:
  ```
  listen_addresses = '*'
  ```

```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

- Add at the end:
  ```
  host    all     all     0.0.0.0/0     md5
  ```

Then restart PostgreSQL:

```bash
sudo service postgresql restart
```

---

## Step 4: Connect Using DBeaver (test connection)

1. Open DBeaver and create a new PostgreSQL connection.
2. Use:
   - Host: `localhost`
   - Port: `5432` # <- match the port from postgresql.conf
   - User: `myuser`
   - Password: `mypassword`
   - Database: `mydb`
3. Test Connection
   Click "Test Connection" to verify the connection settings. If successful, click "Finish".


---

## Step 5: Connect to PostgreSQL in Python

To interact with your PostgreSQL database from Python, install the required packages:

```bash
pip install sqlalchemy psycopg2
```

Two example scripts are provided in this folder:

- [`test_connection.py`](./test_connection.py): Checks if your Python script can connect to the PostgreSQL database
- [`init_tables.py`](./init_tables.py): Creates the required `task` and `data` tables with a foreign key reference

---

### Test the Database Connection

Use `test_connection.py` to verify that your database credentials and host are working:

Run the script:

```bash
python test_connection.py
```

---

### Create Tables in PostgreSQL

Once your connection works, use `init_tables.py` to create your database schema:

```bash
python init_tables.py
```

This will:

- Create the `task` table with `id`, `username`, and `description`
- Create the `data` table with `current`, `voltage`, and a foreign key `task_id` referencing `task(id)`
- Skip table creation if they already exist

You'll see this message if successful:

```
Tables 'data' and 'task' created successfully, with 'task_id' as a foreign key in 'data'.
```
