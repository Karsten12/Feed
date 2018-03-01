from newsapi import NewsApiClient

newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')


def getNews():
    top_headlines = newsapi.get_top_headlines(q='bitcoin',
                                          sources='bbc-news,the-verge',
                                          category='business',
                                          language='en',
                                          country='us')
    print(top_headlines)



if __name__ == '__main__':
    getNews()
