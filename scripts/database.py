

user = 'root'
password = ''

db_name = 'testdb'

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user=user,
  passwd=password
)

print(mydb)

cursor = mydb.cursor()

cursor.execute('describe primu')

for i in cursor:
  print(i)