from newsapi import NewsApiClient
# import pyrebase
import json
import dateutil.parser as date
# Firebase admin packages
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)

#  Class variables 
newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')

def initFirebase_viaADMIN():
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate('./feedKEY.json')
    # Initialize the app with a service account, granting admin privileges
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://feed-b8503.firebaseio.com"
    })
    getNews()

# def initFirebase_viaPYRE(){
#     config = {
#     "apiKey": "AIzaSyBj3mbnomNrReTYcUG8rvz-KJ0FfTXA0w4",
#     "authDomain": "feed-b8503.firebaseapp.com",
#     "databaseURL": "https://feed-b8503.firebaseio.com",
#     "projectId": "feed-b8503",
#     "storageBucket": "feed-b8503.appspot.com",
#     "messagingSenderId": "519738845227"
#     }
#     # firebase = pyrebase.initialize_app(config)
#     # db = firebase.database()
#     results = db.reference("Articles").child(dataSource).set(data)
# }

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
    initFirebase_viaADMIN()
