from newsapi import NewsApiClient
import json
newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')


def getNews():
    top = newsapi.get_top_headlines(sources='bbc-news')
    readJson(top)
    # with open('data.txt', 'w') as outfile:  
    #     json.dump(top, outfile)



def readJson(inputJson):
    articles = inputJson["articles"]
    for i in articles:
        articleTitle = i["title"]
        print(articleTitle)


if __name__ == '__main__':
    getNews()
