from newsapi import NewsApiClient

newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')


def getNews():
    top = apnewsapii.get_top_headlines(sources='bbc-news')
    print(top)



if __name__ == '__main__':
    getNews()
