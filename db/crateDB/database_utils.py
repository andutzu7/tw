import mysql.connector
from contextlib import contextmanager
from datagov_scraper import get_all_csv_links, print_dict
import urllib3
import os


@contextmanager
def get_cursor(*args, **kwargs):
    db = mysql.connector.connect(*args, **kwargs)
    cursor = db.cursor()
    try:
        yield cursor
    finally:
        cursor.close()
        db.close()


def setup(cursor):
    for name in ['medii', 'varste', 'rata', 'educatie']:
        cursor.execute('drop table {}'.format(name))
        print('dropped table {}'.format(name))


def create_tables(cursor):
    for name in ['medii', 'varste', 'rata', 'educatie']:
        filename = 'create_table_{}.sql'.format(name)
        filepath = os.path.join('sql_commands', filename)
        with open(filepath, 'r') as fd:
            cursor.execute(fd.read())
            print('created table "{}"'.format(name))




def main():
    # longUrl = "mysql://b4ce0916cecd87:0aa128f5@eu-cdbr-west-03.cleardb.net/heroku_79d4353e46b22ee?reconnect=true"
    url = "eu-cdbr-west-03.cleardb.net"
    database = "heroku_79d4353e46b22ee"
    password = "0aa128f5"
    user = "b4ce0916cecd87"

    #print_dict(get_all_csv_links())

    with get_cursor(host=url, user=user, passwd=password, database=database, autocommit=True) as cursor:
        #setup(cursor)
        create_tables(cursor)


if __name__ == '__main__':
    urllib3.disable_warnings()
    main()
