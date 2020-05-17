import requests
import json
from lxml import html
import csv
import urllib3


def print_dict(dictionary):
    print(json.dumps(dictionary, indent=4))


MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'sepembrie', 'octombrie', 'noiembrie', 'decembrie']


def get_all_hrefs_from_url(url):
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed {}'.format(url))
        exit()
    webpage = html.fromstring(page.content)

    links = webpage.xpath('//a/@href')

    # remove duplicates
    links = list(set(links))

    return links


def get_month_links():
    base_url = 'https://data.gov.ro/dataset?q=somaj&sort=metadata_modified+desc'

    print('scraping {} for month links'.format(base_url))
    links = get_all_hrefs_from_url(base_url)

    # filter unnecessary links
    links = [link for link in links if '/dataset/somajul-inregistrat-' in link]

    return links


def get_csv_links(month_link):
    _, _, month, year = month_link.split('-')

    url = 'https://data.gov.ro{}'.format(month_link)

    print('scraping data for {}-{}'.format(year, month))
    links = get_all_hrefs_from_url(url)

    filters = ['csv', 'resource']
    links = [link for link in links if all(word in link for word in filters)]
    return year, month, links


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

    all_csv_links['2019']['mai']['medii'] = all_csv_links['2019']['mai']['rata']
    all_csv_links['2019']['mai']['rata'] = all_csv_links['2019']['decembrie']['rata']


def get_all_csv_links():
    month_links = get_month_links()

    all_csv_links = dict()

    for month_link in month_links:
        year, month, csv_links = get_csv_links(month_link)
        if year not in all_csv_links:
            all_csv_links[year] = dict()
        all_csv_links[year][month] = dict()
        for link in csv_links:
            category = None
            for categ in ['varste', 'medii', 'rata', 'ed']:
                if categ in link:
                    category = categ
                    break
            if category is None:
                print("invalid link: {}".format(link))
                exit()
            if category == 'ed':
                category = 'educatie'
            all_csv_links[year][month][category] = link
    quick_fix(all_csv_links)

    return all_csv_links


csv_cache = dict()
def read_csv(url):
    global csv_cache
    if '/' in url:
        url_to_log = url.split('/')[-1]
    else:
        url_to_log = url

    if url in csv_cache:
        return csv_cache[url]

    print('reading {} from data.gov'.format(url_to_log))
    page = requests.get(url, verify=False)  # I get a SSL exception without the verify kwarg
    if not page.ok:
        print('request failed {}'.format)
        exit()

    lines = page.text.splitlines()
    reader = csv.reader(lines)
    rows_as_list = list(reader)
    csv_cache[url] = rows_as_list
    return rows_as_list


def main():
    print_dict(get_all_csv_links())


if __name__ == '__main__':
    urllib3.disable_warnings()
    main()
