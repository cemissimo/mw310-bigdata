from io import BytesIO
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google_cloud.client import Bigquery_client
import sqlalchemy
from database.db import getconn
import database.service as db
import pandas as pd


bigquery_client = Bigquery_client(project_name="mw310-404810")

pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/transactions/count")
async def get_transactions_count():
    count = bigquery_client.select_transcations_count()
    return {"transaction": count}

@app.get("/transactions/forecast/{forecast_hours}")
async def get_forecast(forecast_hours: int):
    forecast = bigquery_client.select_forecast(forecast_hours)
    return forecast

@app.get("/transactions_limit/{product_name}")
async def get_transactions(product_name: str):
    return db.select_from_transactions(pool, product_name)

@app.get("/transactions_grouped")
async def get_transactions(product_name: str):
    return db.select_transactions_grouped(pool, product_name)
    
@app.get("/transactions/product_filter")
async def get_product_filters():
    return db.get_filters_product_name(pool)

@app.get("/sales_for_week")
async def get_sales_for_week():
    result = db.select_sales_for_week(pool)
    return result

@app.post("/upload_csv")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()

    # Wandele den Inhalt in ein Pandas DataFrame um
    df = pd.read_csv(BytesIO(contents))

    df['time_of_sale'] = pd.to_datetime(df['time_of_sale'], format='%Y-%m-%d %H:%M:%S %Z')

    print(df.head())

    df.to_sql("transactions", con=pool, if_exists='append', index=False, chunksize=1000)

    # query = f"SELECT * FROM city"

    # Daten aus der SQL-Tabelle in ein Pandas DataFrame laden
    # df = pd.read_sql(query, con=pool)

    # DataFrame in eine CSV-Datei exportieren
    # csv_file_path = "csv/city.csv"
    # df.to_csv(csv_file_path, index=False)
    
    return {"filename": file.filename, "content_type": file.content_type, "contents": contents}

@app.get("/sum_sales_for_week")
async def get_sum_sales_for_week(week: int | None = None, bis: int | None = None):
    
    if not week and not bis:
        print("Erstes IF")
        return db.sales_sum_for_week(pool)
    elif week and not bis:
        print("zweites IF")
        return db.sales_sum_for_week(pool, week) 
    elif not week and bis:
        print("Drittes IF")
        return db.sales_sum_for_week(pool, bis=bis) 
    elif week and bis:
        print("Viertes IF")
        return db.sales_sum_for_week(pool,week=week, bis=bis)

@app.get("/summed_sales_for_stores")
async def get_summed_sales_for_stores():
    return bigquery_client.get_summed_sales_for_stores_gcp()

@app.get("/coupons")
async def coupons_for_store(store_id: int):
    print("hallo")
    return bigquery_client.get_ueberbestand(store_id)

@app.post("/increment_coupon_counter")
async def increment_coupon_counter(coupon_id: str):
    return bigquery_client.increment_coupon_counter(coupon_id)
    
    