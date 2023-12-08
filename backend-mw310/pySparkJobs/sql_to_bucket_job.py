from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("CloudSQLToGCS").getOrCreate()

jdbc_url = "jdbc:mysql://34.171.173.25:3306/mw310"
properties = {
    "user": "root",
    "password": "pw_mw310",
    "driver": "com.mysql.cj.jdbc.Driver"
}

query = "SELECT * FROM transactions"

data = spark.read.format("jdbc").option("url", jdbc_url).option("dbtable", f"({query}) as subquery").option("user", properties["user"]).option("password", properties["password"]).option("driver", properties["driver"]).load()

output_path = "gs://dataproc-bucket-mw310/output"

data.write.mode("overwrite").option("header", "true").csv(output_path)

spark.stop()