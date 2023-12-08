from google.cloud import bigquery
import pandas as pd
import requests
from fastapi import HTTPException

class Bigquery_client:
    def __init__(self, project_name: str):
        self.client = bigquery.Client(project=project_name)

    def select_transcations_count(self) -> int:
        """Returns number of records in the transaction table in Bigquery."""

        query = "SELECT COUNT(*) as transaction_count FROM `retail_dataset.transactions_log`;"
        query_job = self.client.query(query)
        
        count = 0

        for row in query_job:
            # Row values can be accessed by field name or index.
            count = row['transaction_count']
            print(f"count: {row['transaction_count']}")
        
        return count

    def select_forecast(self, hours: int):
        
        query = f"SELECT * FROM ML.FORECAST(MODEL `retail_dataset.arima_plus_model`,  STRUCT({hours} AS horizon));"
        query_job = self.client.query(query)
        response_dict = {}

        for row in query_job:
            product_name = row['product_name']
            forecast_timestamp = row['forecast_timestamp']
            forecast_value = row['forecast_value']
            # Row values can be accessed by field name or index.
            print("Product Name: {}, Forecast Timestamp: {}, Forecast value: {}".format(product_name, forecast_timestamp, forecast_value))
            if product_name not in response_dict.keys():
                response_dict[product_name] = {}
            response_dict[product_name][forecast_timestamp] = forecast_value
        
        print(response_dict)
        return response_dict

    def get_ueberbestand(self, store_id: int):
        query = f"SELECT * FROM mw310-404810.mw310_dataset.coupons where store_id = {store_id}"
        
        query_job = self.client.query(query)

        result = []

        for row in query_job:
            entry = {}
            entry['product_name'] = row['product_name']
            entry['coupon_id'] = row['coupon_id']
            result.append(entry)

        result = handle_generate_coupon(result)
        
        return result
    
    def increment_coupon_counter(self, coupon_id):
        try:
            # Führe das BigQuery-Update durch
            query = f"UPDATE mw310_dataset.coupons SET times_used = times_used + 1 WHERE coupon_id = '{coupon_id}';"
            query_job = self.client.query(query)
            results = query_job.result()

            return {"success": "Coupon wurde eingelöst!"}
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    
    def get_summed_sales_for_stores_gcp(self):

        
        query = f"SELECT store_id, product_name, SUM(quantity) as quantity FROM `retail_dataset.transactions_log` WHERE (EXTRACT(DAYOFWEEK FROM TIMESTAMP (time_of_sale)) - 1) < 3 GROUP BY store_id, product_name ORDER BY store_id ASC;"
        query_job = self.client.query(query)
        
        result_dict = {}

        for row in query_job:
            store_id = row[0]
            product_name = row[1]
            quantity = row[2]

            # Überprüfe, ob die Store ID bereits im Dictionary vorhanden ist
            if store_id in result_dict:
                # Wenn vorhanden, füge das Produkt mit der Quantität hinzu
                result_dict[store_id][product_name] = quantity
            else:
                # Wenn nicht vorhanden, erstelle ein neues Dictionary für die Store ID
                result_dict[store_id] = {product_name: quantity}

        # Konvertiere das Dictionary in eine Liste von Dictionaries mit dem gewünschten Format
        result_list = [{"store_id": store_id, **products} for store_id, products in result_dict.items()]
        
        return result_list

def handle_generate_coupon(products: list):
    options = {
        'method': 'GET',
        'url': 'https://gustar-io-deutsche-rezepte.p.rapidapi.com/search_api',
        'params': {'text': ''},
        'headers': {
            'X-RapidAPI-Key': 'fa264fdff5mshaf102c64fb75600p12a728jsnce42ddceb0dd',
            'X-RapidAPI-Host': 'gustar-io-deutsche-rezepte.p.rapidapi.com'
        }
    }

    recipe_list = []

    for item in products:
        options['params']['text'] = item['product_name']
        # print(options['params']['text'])
        
        try:
            response = requests.request(**options)
            response_data = response.json()
            # print(response_data)
            
            # Begrenzen des Ergebnis
            limit = response_data[0]
            print(limit)
            # limit[0]['product_name'] = item
            item['recipe'] = limit
            # print("Hallo")
            # print(limit[0])
            print(item)
            recipe_list.append(item)
            
        except Exception as error:
            print(f"Error: {error}")
    
    return recipe_list
