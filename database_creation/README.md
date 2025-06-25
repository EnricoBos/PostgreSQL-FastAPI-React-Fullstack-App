# PostgreSQL Setup for FastAPI + React App (WSL2)

This guide helps you set up a PostgreSQL database in **WSL2 (Ubuntu)** to be used by the FastAPI + React app. It includes:

- PostgreSQL installation and configuration
- Creating a superuser and database
- Allowing external tools like DBeaver to connect
- Connecting and initializing tables using Python

---

## Step 1: Install & Start PostgreSQL in WSL2

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
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

## Step 3: Allow External Connections (Optional for Tools like DBeaver)

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

## Step 4: Connect Using DBeaver (Optional)

1. Open DBeaver and create a new PostgreSQL connection.
2. Use:
   - Host: `localhost`
   - Port: `5432`
   - User: `myuser`
   - Password: `mypassword`
   - Database: `mydb`
3. Test and save the connection.

---

## Step 5: Connect to PostgreSQL in Python

Install the libraries:

```bash
pip install sqlalchemy psycopg2
```
