import requests
import json
from lxml import html
import csv

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
    _, _, month, year = month_link.split('-')
    url = 'https://data.gov.ro{}'.format(month_link)

    links = get_all_hrefs_from_url(url)

    filters = ['csv', 'resource', 'somaj']
    links = [link for link in links if all(word in link for word in filters)]
    return month, links


def main():
    demo = get_month_links()

    all_csv_links = dict()

    for month_link in demo:
        month, csv_links = get_csv_links(month_link)
        all_csv_links[month] = csv_links

    print_dict(all_csv_links)


if __name__ == '__main__':
    main()
