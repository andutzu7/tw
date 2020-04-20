import json
import os
from datagov_scraper import get_all_csv_links, print_dict, read_csv
import urllib3


def get_list_of_sets(all_csv_links):
    sets = []
    for i in range(42):
        sets.append(set())

    for month in all_csv_links:
        for category in all_csv_links[month]:
            link = all_csv_links[month][category]
            rows = read_csv(link)

            if 'BUC' in rows[42][0].upper():
                rows.insert(28, rows[42])

            for i in range(len(sets)):
                row = rows[i+1]
                judet = row[0].replace(' ', '')
                sets[i].add(judet)

    return sets


def get_consistency_filter():
    if os.path.exists('name_filter.json'):
        with open('name_filter.json', 'r') as fd:
            return json.load(fd)
    else:
        all_csv_links = get_all_csv_links()
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
        with open('name_filter.json', 'w') as fd:
            json.dump(filter, fd, indent=4)
    return filter


filter = None
def filter_name(name):
    global filter
    if filter is None:
        filter = get_consistency_filter()
    return filter[name.upper().replace(' ', '')]


ids = None
def get_judet_id(name):
    global ids
    if ids is None:
        with open('judete.json', 'r') as fd:
            ids = json.load(fd)
    return ids[filter_name(name)]


def print_column_names(all_csv_links, categ):
    for month in all_csv_links:
        link = all_csv_links[month][categ]
        rows = read_csv(link)
        columns = [column.strip() for column in rows[0]]
        print(columns)


def check_column_names(all_csv_links):
    print_column_names(all_csv_links, 'rata')
    print_column_names(all_csv_links, 'varste')
    print_column_names(all_csv_links, 'educatie')
    print_column_names(all_csv_links, 'medii')


def assert_county_names_are_consistent():
    with open('judete.json', 'r') as fd:
        ids = json.load(fd)
    judete = sorted(list(set([name.upper() for name in list(ids.keys())])))
    judetecsv = sorted(list(set(list(get_consistency_filter().values()))))

    for a, b in zip(judetecsv, judete):
        assert a == b, str(a + " " + b)

    print("names ar consistent")


urllib3.disable_warnings()
assert_county_names_are_consistent()