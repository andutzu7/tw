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

    #remove duplicates
    links = list(set(links))

    return links


def get_csv_links(month_link):
    _, _, month, _ = month_link.split('-')
    url = 'https://data.gov.ro{}'.format(month_link)

    links = get_all_hrefs_from_url(url)

    filters = ['csv', 'resource']
    links = [link for link in links if all(word in link for word in filters)]
    return month, links


def read_csv(url):
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed {}'.format)
        exit()
    
    print(page.content)

    lines = page.text.splitlines()
    reader = csv.reader(lines)
    parsed_csv = list(reader)

    # for line in parsed_csv:
    #     print(line)
    # TODO


def download_url_to_path(url, path):
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed {}'.format)
        exit()
    with open(path, 'wb') as file:
        file.write(page.content)


def download_all_csv(all_csv_links, dir='csv_backup'):
    for month in all_csv_links:
        for link in all_csv_links[month]:
            category = [categ for categ in ['varste', 'medii', 'educatie', 'rata'] if categ in link][0]
            filename = '{}_{}.csv'.format(month,category)
            path = os.path.join(dir, filename)
            download_url_to_path(link, path)
            print('{} file created'.format(path))


def backup():
    demo = get_month_links()

    all_csv_links = dict()

    for month_link in demo:
        month, csv_links = get_csv_links(month_link)
        all_csv_links[month] = csv_links

    # print_dict(all_csv_links)
    # read_csv(all_csv_links['iunie'][1])
    download_all_csv(all_csv_links)


def main():
    pass


if __name__ == '__main__':
    urllib3.disable_warnings()
    main()
