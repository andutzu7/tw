import requests
import json
from lxml import html
import csv
import urllib3
import os


def print_dict(dictionary):
    print(json.dumps(dictionary, indent=4))


MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'sepembrie', 'octombrie', 'noiembrie', 'decembrie']


def get_all_hrefs_from_url(url):
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed')
        exit()
    webpage = html.fromstring(page.content)
    return webpage.xpath('//a/@href')


def get_month_links():
    # link provided by pava
    url = 'https://data.gov.ro/dataset?q=somaj&sort=metadata_modified+desc'

    links = get_all_hrefs_from_url(url)

    # filter unnecessary links
    links = [link for link in links if '/dataset/somajul-inregistrat-' in link]

    # remove duplicates
    links = list(set(links))

    return links


def get_csv_links(month_link):
    _, _, month, _ = month_link.split('-')
    url = 'https://data.gov.ro{}'.format(month_link)

    links = get_all_hrefs_from_url(url)

    filters = ['csv', 'resource']
    links = [link for link in links if all(word in link for word in filters)]
    return month, links


def quick_fix(all_csv_links):
    """
    linkurile de pe data.gov pentru luna mai:
        varsta - valid
        educatie - valid
        rata -  contine dataset pentru 'medii'      # solved
        medii - contine dataset pentru 'varste'     # temporary fix

    datasetul pentru luna mai, categoria rata nu este disponibil
    am copiat datasetul pentru luna decembrie, categoria rata
    """

    all_csv_links['mai']['medii'] = all_csv_links['mai']['rata']
    all_csv_links['mai']['rata'] = all_csv_links['decembrie']['rata']


def get_all_csv_links():
    if os.path.exists('all_csv_links.json'):
        with open('all_csv_links.json', 'r') as fd:
            return json.load(fd)

    month_links = get_month_links()

    all_csv_links = dict()

    for month_link in month_links:
        month, csv_links = get_csv_links(month_link)
        all_csv_links[month] = dict()
        for link in csv_links:
            category = [categ for categ in ['varste', 'medii', 'educatie', 'rata'] if categ in link][0]
            all_csv_links[month][category] = link
    quick_fix(all_csv_links)

    # cache
    with open('all_csv_links.json', 'w') as fd:
        json.dump(all_csv_links, fd, indent=4)
    return all_csv_links


def read_csv(url):
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed {}'.format)
        exit()

    lines = page.text.splitlines()
    reader = csv.reader(lines)
    return list(reader)


def download_url_to_path(url, path):
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed {}'.format)
        exit()
    with open(path, 'wb') as file:
        file.write(page.content)


def download_all_csv(all_csv_links, dir='csv_backup'):
    for month in all_csv_links:
        for category in all_csv_links[month]:
            filename = '{}_{}.csv'.format(month,category)
            path = os.path.join(dir, filename)
            link = all_csv_links[month][category]
            download_url_to_path(link, path)
            print('{} file created'.format(path))


def backup():
    all_csv_links = get_all_csv_links()
    download_all_csv(all_csv_links)


def main():
    a = get_all_csv_links()
    print_dict(a)


if __name__ == '__main__':
    urllib3.disable_warnings()
    main()
