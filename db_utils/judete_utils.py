import json
import os
from datagov_scraper import get_all_csv_links, print_dict, read_csv
import urllib3


def get_list_of_sets(all_csv_links):
    sets = []
    for i in range(42):
        sets.append(set())

    for year in all_csv_links:
        for month in all_csv_links[year]:
            for category in all_csv_links[year][month]:
                link = all_csv_links[year][month][category]
                rows = read_csv(link)

                if 'BUC' in rows[42][0].upper():
                    rows.insert(28, rows[42])

                for i in range(len(sets)):
                    row = rows[i+1]
                    judet = row[0].replace(' ', '')
                    sets[i].add(judet)

    return sets


def get_consistency_filter(all_csv_links):
    sets = get_list_of_sets(all_csv_links)
    filter = dict()
    for set_judet in sets:
        versions = list(set_judet)
        final = versions[0]
        if len(versions) > 1:
            if all(['BUC' in version.upper() for version in versions]):
                final = 'BUCURESTI'
            elif all(['SATU' in version.upper() for version in versions]):
                final = 'SATU-MARE'
            elif all(['BISTR' in version.upper() for version in versions]):
                final = 'BISTRITA'
            elif all(['CARA' in version.upper() for version in versions]):
                final = 'CARAS-SEVERIN'
            else:
                print(versions)
        for name in versions:
            filter[name] = final
    return filter


filter = None
def filter_name(name, all_csv_links):
    global filter
    if filter is None:
        filter = get_consistency_filter(all_csv_links)
    return filter[name.upper().replace(' ', '')]


ids = None
def get_judet_id(name, all_csv_links):
    global ids
    if ids is None:
        with open('judete.json', 'r') as fd:
            ids = json.load(fd)
    return ids[filter_name(name, all_csv_links)]


def assert_column_names_are_consistent(all_csv_links, categ):
    versions = set()
    for year in all_csv_links:
        for month in all_csv_links[year]:
            link = all_csv_links[year][month][categ]
            rows = read_csv(link)
            columns = [column.strip() for column in rows[0]]
            if not columns[-1]:
                columns.pop()
            versions.add(tuple(columns))
    assert len(versions) == 1, 'column names for "{}" files are not consistent'.format(categ)


def assert_county_names_are_consistent(all_csv_links):
    with open('judete.json', 'r') as fd:
        ids = json.load(fd)
    judete_expected = sorted(list(set([name.upper() for name in list(ids.keys())])))
    judete_from_csv = sorted(list(set(list(get_consistency_filter(all_csv_links).values()))))

    for a, b in zip(judete_from_csv, judete_expected):
        assert a == b, str(a + " " + b)


if __name__ == '__main__':
    urllib3.disable_warnings()
    all_csv_links = get_all_csv_links()
    for categ in ['medii', 'varste', 'rata', 'educatie']:
        assert_column_names_are_consistent(all_csv_links, categ)
    assert_county_names_are_consistent(all_csv_links)