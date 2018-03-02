from newsapi import NewsApiClient
import json
newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')


def getNews():
    get_theVerge()
    
def get_arsTechnica():
    top = newsapi.get_top_headlines(sources='ars-technica')
    readJson(top)
    # with open('data.txt', 'w') as outfile:  
    #     json.dump(top, outfile)

def get_engadget():
     top = newsapi.get_top_headlines(sources='engadget')
     readJson(top)

def get_reuters():
     top = newsapi.get_top_headlines(sources='reuters')
     readJson(top)

def get_theVerge():
     top = newsapi.get_top_headlines(sources='the-verge')
     readJson(top)

def get_wired():
     top = newsapi.get_top_headlines(sources='wired')
     readJson(top)

def get_usTech():
     top = newsapi.get_top_headlines(category='technology', country='us')
     readJson(top)

def readJson(inputJson):
    articles = inputJson["articles"]
    for i in articles:
        # articleTitle = i["title"]
        print(i)


if __name__ == '__main__':
    getNews()
