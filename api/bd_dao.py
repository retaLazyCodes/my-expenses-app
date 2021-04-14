import pymysql
from datetime import datetime
import bd_connect


def get_bd_connection():
    connection_bd = pymysql.connect(
        user="root",
        password=bd_connect.password,
        host="localhost",
        database="expensesapp")
    return connection_bd


def execute_query(query, parameters):
    connection_bd = get_bd_connection()
    cursor = connection_bd.cursor()
    cursor.execute(query, parameters)
    connection_bd.commit()
    cursor.close()
    connection_bd.close()


def create_table():
    sql_table_created = """ CREATE TABLE Transactions ( 
                                id VARCHAR(6) UNSIGNED PRIMARY KEY,
                                type VARCHAR(191) COLLATE utf8mb4_unicode_ci NOT NULL,
                                description VARCHAR(200),
                                price VARCHAR(7),
                                category VARCHAR(200),
                                date VARCHAR(20) 
                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                            """
    execute_query(sql_table_created)


def get_insert_transaction_query(transaction):
    sql_insert = '''INSERT INTO transactions (id, type, description, category, price, date) 
                    VALUES ( %s,%s,%s,%s,%s,%s);'''

    date_str = transaction['transactionDate']
    date_obj = datetime.strptime(date_str, '%d/%m/%y')
    print(date_obj)
    formatted_date = date_obj.strftime('%Y-%m-%d')
    print(formatted_date)

    parameters_to_insert = (transaction['transactionId'],
                            transaction['transactionType'],
                            transaction['transactionDescription'],
                            transaction['transactionCategory'],
                            transaction['transactionAmount'],
                            formatted_date,
                            )

    return sql_insert, parameters_to_insert


def insert_transaction(transaction_form):
    (query, parameters) = get_insert_transaction_query(transaction_form)
    execute_query(query, parameters)


def db_transaction_to_transaction(row):
    return {'type': row[0], 'description': row[1],
            'price': row[2], 'category': row[3], 'date': row[4], 'id': row[5]}


def get_all_transactions():
    connection_bd = get_bd_connection()
    cursor = connection_bd.cursor()
    select_all_transactions_query = "SELECT type, description, price, category, date, id FROM expensesapp.transactions;"
    cursor.execute(select_all_transactions_query)
    rows = cursor.fetchall()
    all_transactions_obj = []
    print("rows", rows)
    for row in rows:
        all_transactions_obj.append(db_transaction_to_transaction(row))
    return all_transactions_obj


def delete_transaction(id):
    delete_transaction_query = "DELETE FROM expensesapp.transactions WHERE id = %s"
    execute_query(delete_transaction_query, id)