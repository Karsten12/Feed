from newsapi import NewsApiClient
import json
import dateutil.parser as date
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 \
  import Features, EntitiesOptions, KeywordsOptions

newsapi = 0
natural_language_understanding = 0

def initFirebase():
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate('./firebase-KEY.json')
    # Initialize the app with a service account, granting admin privileges
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://feed-b8503.firebaseio.com"
    })
    getNews()

def read_keys():
    global natural_language_understanding 
    global newsapi

    IBMKEYS = None 
    # Read IBM KEY
    file1 = "IBM-KEY.txt"
    with open(file1) as f:
        content = f.readlines()
        IBMKEYS = [x.strip() for x in content]

    natural_language_understanding = NaturalLanguageUnderstandingV1(
        username=IBMKEYS[0],
        password=IBMKEYS[1],
        version='2018-03-16'
    )  

    # Read NEWSAPI KEY
    file2 = "NEWS-KEY.txt"
    with open(file2) as f:
        content = f.readline()
        newsapi = NewsApiClient(api_key=content.strip())

def IBM():
    response = natural_language_understanding.analyze(
        # text=inputText
        text='IBM is an American multinational technology company '
        'headquartered in Armonk, New York, United States, '
        'with operations in over 170 countries.',
        features=Features(
            keywords=KeywordsOptions(
                emotion=True,
                sentiment=True,
                limit=5
            )
        )
    )
    keywords = response["keywords"]
    for i in keywords:
        print(i["text"])

def getNews():
    sources = ['cnn', 'ars-technica', 'engadget', 'reuters', 'the-verge', 'wired']
    for i in sources:
        news = newsapi.get_top_headlines(sources=i)
        articles = news["articles"]
        for article in articles:
            article["publishedAt"] = str(date.parse(article["publishedAt"]).date().strftime("%m-%d-%Y"))
        addToFirebase(i, articles)

    # source = "technology"
    # news = newsapi.get_top_headlines(category='technology', country='us')
    # readJson(source, news)
    
def addToFirebase(dataSource, data):
    results = db.reference("Articles").child(dataSource).set(data)

      

if __name__ == '__main__':
    read_keys()
    initFirebase()
    # IBM()
