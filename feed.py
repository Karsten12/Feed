from newsapi import NewsApiClient
# import pyrebase
import json
import dateutil.parser as date
# Firebase admin packages
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 \
  import Features, EntitiesOptions, KeywordsOptions


# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)

#  Class variables 
newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')
# IBM auth
natural_language_understanding = 0

def initFirebase():
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate('./firebase-KEY.json')
    # Initialize the app with a service account, granting admin privileges
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://feed-b8503.firebaseio.com"
    })
    getNews()

def readIBMKEY():
    global natural_language_understanding 
    IBMKEYS = None 
    fileName = "IBM-KEY.txt"
    with open(fileName) as f:
        content = f.readlines()
        IBMKEYS = [x.strip() for x in content]

    natural_language_understanding = NaturalLanguageUnderstandingV1(
        username=IBMKEYS[0],
        password=IBMKEYS[1],
        version='2018-03-16'
    )  

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
    # initFirebase()
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
    # initFirebase()
    readIBMKEY()
    IBM()
