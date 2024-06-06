import pandas as pd
import mysql.connector
from mysql.connector import Error

# Load the CSV file into a DataFrame
csv_file_path = './Patients.csv'
df = pd.read_csv(csv_file_path)
df = df.where(pd.notnull(df), None)

# Establish a database connection
# try:
connection = mysql.connector.connect(
    host='localhost',         # e.g., 'localhost'
    port=3306,                # e.g., 3306
    database='CareNet',   # Replace with your database name
    user='root',     # Replace with your username
    password='Huytr1997'  # Replace with your password
)

if connection.is_connected():
    cursor = connection.cursor()
    # Create table if not exists
    create_table_query = """
    CREATE TABLE IF NOT EXISTS user (
        username VARCHAR(255),
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        role VARCHAR(50),
        gender VARCHAR(50),
        phone VARCHAR(50),
        email VARCHAR(255),
        address VARCHAR(255),
        password VARCHAR(255),
        weight INT,
        height DECIMAL(4, 2),
        occupation VARCHAR(255),
        allergies VARCHAR(255),
        current_medication VARCHAR(255),
        genetic_conditions VARCHAR(255),
        last_surgery VARCHAR(255),
        emergency_contact VARCHAR(50),
        insurance VARCHAR(255)
    );
    """
    
    cursor.execute(create_table_query)
    connection.commit()

    # Insert data into the table
    for index, row in df.iterrows():
        insert_query = """
        INSERT INTO user (
            username, firstname, lastname, role, gender, phone, email, address, password, weight, height, occupation, allergies, current_medication, genetic_conditions, last_surgery, emergency_contact, insurance, image_path
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NULL)
        """
        cursor.execute(insert_query, tuple(row[1:]))
    
    connection.commit()
    print("Data inserted successfully.")

# except Error as e:
#     print(f"Error: {e}")

# finally:
if connection.is_connected():
    cursor.close()
    connection.close()
    print("MySQL connection is closed.")
