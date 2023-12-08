from google.cloud.sql.connector import Connector
import sqlalchemy

# initialize parameters
project_id = "mw310-404810"
region = "us-central1"
instance_name = "mysql-mw310"


INSTANCE_CONNECTION_NAME = f"{project_id}:{region}:{instance_name}" 
print(f"Your instance connection name is: {INSTANCE_CONNECTION_NAME}")
DB_USER = "root"
DB_PASS = "pw_mw310"
DB_NAME = "mw310"

# initialize Connector object
connector = Connector()

# function to return the database connection object
def getconn():
    conn = connector.connect(
        INSTANCE_CONNECTION_NAME,
        "pymysql",
        user=DB_USER,
        password=DB_PASS,
        db=DB_NAME
    )
    return conn

# create connection pool with 'creator' argument to our connection object function
# pool = sqlalchemy.create_engine(
#     "mysql+pymysql://",
#     creator=getconn,
# )

# connect to connection pool
