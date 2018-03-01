from newsapi import NewsApiClient

def getNews():
    top_headlines = newsapi.get_top_headlines(q='bitcoin',
                                          sources='bbc-news,the-verge',
                                          category='business',
                                          language='en',
                                          country='us')
    print(top_headlines)



if __name__ == '__main__':
    getNews()
