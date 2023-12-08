import sqlalchemy
from sqlalchemy import Engine

def select_from_transactions(pool: Engine, product_name: str):
    with pool.connect() as db_conn:
        results = db_conn.execute(sqlalchemy.text(f"SELECT * FROM transactions WHERE product_name = '{product_name}' LIMIT 100;")).fetchall()

        response = []

        entry = {}

        for row in results:
            entry = {"timestamp":row[0], "order_id":row[1], "product_name":row[2], "price":row[3], "quantity":row[4],"payment_method":row[5], "store_id":row[6], "user_id":row[7]}
            response.append(entry)
        return response

def select_transactions_grouped(pool: Engine, product_name: str):
    with pool.connect() as db_conn:
        results = db_conn.execute(sqlalchemy.text(f"SELECT DATE(time_of_sale) as date, product_name, SUM(quantity) FROM transactions WHERE product_name = '{product_name}' GROUP BY date, product_name ORDER BY date ASC;")).fetchall()

        response = []

        entry = {}

        for row in results:
            entry = {"timestamp":row[0], "product_name":row[1], "quantity":row[2]}
            response.append(entry)
        return response

def get_filters_product_name(pool: Engine):
    with pool.connect() as db_conn:
        result = db_conn.execute(sqlalchemy.text("SELECT DISTINCT product_name FROM transactions;"))

        response = []

        for row in result:
            response.append(row[0])

        return response
        
def select_certain_day(pool: Engine, ):
    with pool.connect() as db_conn:
        results = db_conn.execute(sqlalchemy.text("select time_of_sale, product_name, sum(quantity) from transactions where product_name = 'Limes' AND DATE(time_of_sale) = '2021-11-30' GROUP BY time_of_sale, product_name ORDER BY time_of_sale ASC;"))
        
        response = []

        entry = {}

        for row in results:
            entry = {"timestamp":row[0], "product_name":row[1], "quantity":row[2]}
            response.append(entry)
        return response

def select_grouped_sales_for_products(pool: Engine):
    with pool.connect() as db_conn:
        results = db_conn.execute(sqlalchemy.text(""))

def select_sales_for_week(pool: Engine):
    with pool.connect() as db_conn:
        results = db_conn.execute(sqlalchemy.text("SELECT date(time_of_sale), WEEKDAY(time_of_sale), product_name, SUM(quantity) FROM transactions WHERE WEEK(time_of_sale, 1) = 47 AND YEAR(time_of_sale) = 2021 GROUP BY date(time_of_sale), WEEKDAY(time_of_sale), product_name;"))

        response = []

        montag = {"day_of_week": "Montag"}
        dienstag = {"day_of_week": "Dienstag"}
        mittwoch = {"day_of_week": "Mittwoch"}
        donnerstag = {"day_of_week": "Donnerstag"}
        freitag = {"day_of_week": "Freitag"}
        samstag = {"day_of_week": "Samstag"}
        sonntag = {"day_of_week": "Sonntag"}

        for row in results:
            if row[1] == 0:
                montag[row[2]] = row[3]
            elif row[1] == 1:
                dienstag[row[2]] = row[3]
            elif row[1] == 2:
                mittwoch[row[2]] = row[3]
            elif row[1] == 3:
                donnerstag[row[2]] = row[3]
            elif row[1] == 4:
                freitag[row[2]] = row[3]
            elif row[1] == 5:
                samstag[row[2]] = row[3]
            elif row[1] == 6:
                sonntag[row[2]] = row[3]

            
        response.append(montag)
        response.append(dienstag)
        response.append(mittwoch)
        response.append(donnerstag)
        response.append(freitag)
        response.append(samstag)
        response.append(sonntag)

        print(response)

        return response

def sales_sum_for_week(pool: Engine, week: int = 47, bis: int = 3):
    with pool.connect() as db_conn:
        results = db_conn.execute(sqlalchemy.text(f"SELECT product_name, SUM(quantity) FROM transactions WHERE WEEK(time_of_sale, 1) = {week} AND WEEKDAY(time_of_sale) < {bis} GROUP BY product_name;"))

        # response = {}

        # for row in results:
            # response[row[0]] = row[1]
            # print(response)

        response = []


        for row in results:
            entry = {}
            
            entry['product_name'] = row[0]
            entry['sum_quantity'] = row[1]

            response.append(entry)

        print(response)
        return response
