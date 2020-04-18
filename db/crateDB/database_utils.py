import mysql.connector
from contextlib import contextmanager
from datagov_scraper import get_all_csv_links, print_dict
import urllib3
import pretty


@contextmanager
def get_db(*args, **kwds):
    db = mysql.connector.connect(*args, **kwds)
    try:
        yield db
    finally:
        db.close()


def create_tables(db):
    pass


def main():
    # longUrl = "mysql://b4ce0916cecd87:0aa128f5@eu-cdbr-west-03.cleardb.net/heroku_79d4353e46b22ee?reconnect=true"
    url = "eu-cdbr-west-03.cleardb.net"
    database = "heroku_79d4353e46b22ee"
    password = "0aa128f5"
    user = "b4ce0916cecd87"

    #print_dict(get_all_csv_links())

    with get_db(host=url, user=user, passwd=password, database=database) as db:
        create_tables(db)


if __name__ == '__main__':
    urllib3.disable_warnings()
    main()
