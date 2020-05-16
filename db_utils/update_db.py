import mysql.connector
from contextlib import contextmanager
from datagov_scraper import get_all_csv_links, print_dict, read_csv, MONTHS
from judete_utils import filter_name, get_judet_id, assert_county_names_are_consistent, assert_column_names_are_consistent
import urllib3
import os
import json


@contextmanager
def get_cursor(*args, **kwargs):
    db = mysql.connector.connect(*args, **kwargs)
    cursor = db.cursor()
    try:
        yield cursor
    finally:
        cursor.close()
        db.close()


def add_csv_files_to_judete(cursor):
    with open('judete.json', 'r') as fd:
        judete = json.load(fd)
        entries = [(judete[name], name) for name in judete]
        query = "insert into judete(id, nume) values(%s, %s)"
        cursor.executemany(query, entries)

    print('tabel "judete" initializat')


def last_year_month_from_table(cursor, table_name):
    cursor.execute('SELECT COUNT(1) FROM {}'.format(table_name))
    n_rows, = cursor.fetchone()
    if n_rows > 0:
        cursor.execute('SELECT MAX(an) from {}'.format(table_name))
        year, = cursor.fetchone()

        cursor.execute('SELECT MAX(luna) from {} where an={}'.format(table_name, year))
        month, = cursor.fetchone()

        return year, month
    return -1, -1


def add_csv_files_to_educatie(cursor, csv_links):
    max_year, max_month = last_year_month_from_table(cursor, 'educatie')
    entries = []
    for year in csv_links:
        for month in csv_links[year]:
            month_index = MONTHS.index(month) + 1
            if int(year) > max_year or (year == max_year and month_index > max_month):
                link = csv_links[year][month]['educatie']
                rows = read_csv(link)
                for row in rows[1:43]:
                    judet = row[0].upper()
                    judet = filter_name(judet, csv_links)
                    id_judet = get_judet_id(judet, csv_links)
                    total = int(row[1])
                    fara_studii = int(row[2])
                    primar = int(row[3])
                    gimnazial = int(row[4])
                    liceal = int(row[5])
                    postliceal = int(row[6])
                    profesional = int(row[7])
                    univ = int(row[8])
                    e = (id_judet, total, fara_studii, primar, gimnazial, liceal, postliceal, profesional, univ, year, month_index)
                    entries.append(e)
                print('added {}-{} records to "{}" table'.format(year, month, 'educatie'))

    if entries:
        query = "insert into educatie(id_judet, total, fara_studii, primar, gimnazial, liceal, postliceal, profesional, universitar, an, luna) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.executemany(query, entries)
    else:
        print('table "educatie" is already up to date')


def add_csv_files_to_varste(cursor, csv_links):
    max_year, max_month = last_year_month_from_table(cursor, 'varste')
    entries = []
    for year in csv_links:
        for month in csv_links[year]:
            month_index = MONTHS.index(month) + 1
            if int(year) > max_year or (year == max_year and month_index > max_month):
                link = csv_links[year][month]['varste']
                rows = read_csv(link)

                for row in rows[1:43]:
                    judet = row[0].upper()
                    judet = filter_name(judet, csv_links)
                    id_judet = get_judet_id(judet, csv_links)
                    sub25 = int(row[2])
                    interval25_29 = int(row[3])
                    interval30_39 = int(row[4])
                    interval40_49 = int(row[5])
                    interval50_55 = int(row[6])
                    peste55 = int(row[7])
                    e = (id_judet, sub25, interval25_29, interval30_39, interval40_49, interval50_55, peste55, year, month_index)
                    entries.append(e)
                print('added {}-{} records to "{}" table'.format(year, month, 'varste'))

    if entries:
        query = "insert into varste(id_judet, sub25, interval25_29, interval30_39, interval40_49, interval50_55, peste55, an, luna) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.executemany(query, entries)
    else:
        print('table "varste" is already up to date')


def add_csv_files_to_medii(cursor, csv_links):
    max_year, max_month = last_year_month_from_table(cursor, 'medii')
    entries = []
    for year in csv_links:
        for month in csv_links[year]:
            month_index = MONTHS.index(month) + 1
            if int(year) > max_year or (year == max_year and month_index > max_month):
                link = csv_links[year][month]['medii']
                rows = read_csv(link)

                for row in rows[1:43]:
                    judet = row[0].upper()
                    judet = filter_name(judet, csv_links)
                    id_judet = get_judet_id(judet, csv_links)
                    urban_femei = int(row[5])
                    urban_barbati = int(row[6])
                    rural_femei = int(row[8])
                    rural_barbati = int(row[9])

                    e = (id_judet, urban_femei, urban_barbati, rural_femei, rural_barbati, year, month_index)
                    entries.append(e)
                print('added {}-{} records to "{}" table'.format(year, month, 'medii'))

    if entries:
        query = "insert into medii(id_judet, urban_femei, urban_barbati, rural_femei, rural_barbati, an, luna) values(%s,%s,%s,%s,%s,%s,%s)"
        cursor.executemany(query, entries)
    else:
        print('table "medii" is already up to date')


def add_csv_files_to_rata(cursor, csv_links):
    max_year, max_month = last_year_month_from_table(cursor, 'rata')
    entries = []
    for year in csv_links:
        for month in csv_links[year]:
            month_index = MONTHS.index(month) + 1
            if int(year) > max_year or (year == max_year and month_index > max_month):
                link = csv_links[year][month]['rata']
                rows = read_csv(link)

                for row in rows[1:43]:
                    judet = row[0].upper()
                    judet = filter_name(judet, csv_links)
                    id_judet = get_judet_id(judet, csv_links)
                    total = int(row[1].replace(',', ''))
                    total_femei = int(row[2].replace(',', ''))
                    total_barbati = int(row[3].replace(',', ''))
                    indemnizati = int(row[4].replace(',', ''))
                    neindemnizati = int(row[5].replace(',', ''))
                    procent_total = float(row[6].replace(' ', ''))
                    procent_femei = float(row[7].replace(' ', ''))
                    procent_barbati = float(row[8].replace(' ', ''))

                    e = (id_judet, total, total_femei, total_barbati, indemnizati, neindemnizati, procent_total, procent_femei, procent_barbati, year, month_index)
                    entries.append(e)
                print('added {}-{} records to "{}" table'.format(year, month, 'rata'))


    if entries:
        query = "insert into rata(id_judet, total, total_femei, total_barbati, indemnizati, neindemnizati, procent_total, procent_femei, procent_barbati, an, luna) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.executemany(query, entries)
    else:
        print('table "rata" is already up to date')


def setup(cursor):
    for name in ['medii', 'varste', 'rata', 'educatie', 'judete']:
        cursor.execute('drop table {}'.format(name))
        print('dropped table {}'.format(name))


def create_tables(cursor):
    for name in ['medii', 'varste', 'rata', 'educatie', 'judete']:
        filename = 'create_table_{}.sql'.format(name)
        filepath = os.path.join('sql_commands', filename)
        with open(filepath, 'r') as fd:
            cursor.execute(fd.read())
            print('created table "{}"'.format(name))


def update_data(cursor, csv_links, rebuild=False):
    if rebuild:
        setup(cursor)
        create_tables(cursor)
        add_csv_files_to_judete(cursor)
    add_csv_files_to_educatie(cursor, csv_links)
    add_csv_files_to_varste(cursor, csv_links)
    add_csv_files_to_medii(cursor, csv_links)
    add_csv_files_to_rata(cursor, csv_links)


def main():
    # longUrl = "mysql://b4ce0916cecd87:0aa128f5@eu-cdbr-west-03.cleardb.net/heroku_79d4353e46b22ee?reconnect=true"
    url = "eu-cdbr-west-03.cleardb.net"
    database = "heroku_79d4353e46b22ee"
    password = "0aa128f5"
    user = "b4ce0916cecd87"

    csv_links = get_all_csv_links()

    # print('checking county naming consistency')
    # assert_county_names_are_consistent(csv_links)
    # print("county names are consistent")

    # print('checking column naming consistency')
    # for categ in ['medii', 'varste', 'rata', 'educatie']:
    #     assert_column_names_are_consistent(csv_links, categ)
    # print("column names are consistent")

    with get_cursor(host=url, user=user, passwd=password, database=database, autocommit=True) as cursor:
        update_data(cursor, csv_links)


if __name__ == '__main__':
    urllib3.disable_warnings()
    main()
