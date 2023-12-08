from pyspark.sql import SparkSession
import os

# Initialisieren der Spark Session
spark = SparkSession.builder.appName("LoadToBigQuery").getOrCreate()

# Definieren des Pfads zum Cloud Storage-Bucket und dem Präfix der CSV-Dateien
bucket_path = "gs://dataproc-bucket-mw310/output/"
prefix = "part"

# Lesen der CSV-Datei im Cloud Storage-Bucket
data = spark.read.csv(os.path.join(bucket_path, prefix + "*"), header=True, inferSchema=True)

# Auslassen der Spalte 'Payment_Method'
data_without_payment_method = data.drop("payment_method")

# Definieren der Ziel-BigQuery-Tabelle
table_id = "mw310-404810.mw310_dataset.transactions"

# Schreiben der Daten in die BigQuery-Tabelle
data_without_payment_method.write\
    .format("bigquery")\
    .option("temporaryGcsBucket", "mw310-temp-data")\
    .mode("overwrite")\
    .save(table_id)

# Stoppen der Spark Session
spark.stop()
