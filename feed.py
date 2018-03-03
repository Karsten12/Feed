from newsapi import NewsApiClient
import pyrebase
import json
import datetime
# Firebase admin packages
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)

#  Class variables 
newsapi = NewsApiClient(api_key='21b90e53af6a4713baf4fd0d3d33cd2b')
# firebase = None

# def initFirebase():
#     config = {
#         "apiKey": "AIzaSyBj3mbnomNrReTYcUG8rvz-KJ0FfTXA0w4",
#         "authDomain": "feed-b8503.firebaseapp.com",
#         "databaseURL": "https://feed-b8503.firebaseio.com",
#         "projectId": "feed-b8503",
#         "storageBucket": "feed-b8503.appspot.com",
#         "messagingSenderId": "519738845227"
#     }
#     firebase = pyrebase.initialize_app(config)

def getNews():
    # initFirebase()
    sources = ['cnn', 'ars-technica', 'engadget', 'reuters', 'the-verge', 'wired']
    for i in sources:
        news = newsapi.get_top_headlines(sources=i)
        readJson(i, news)
    source = "technology"
    news = newsapi.get_top_headlines(category='technology', country='us')
    readJson(source, news)
    

def readJson(source, inputJson):
    articles = inputJson["articles"]
    addToFirebase(source, articles)


def addToFirebase(dataSource, data):
    config = {
        "apiKey": "AIzaSyBj3mbnomNrReTYcUG8rvz-KJ0FfTXA0w4",
        "authDomain": "feed-b8503.firebaseapp.com",
        "databaseURL": "https://feed-b8503.firebaseio.com",
        "projectId": "feed-b8503",
        "storageBucket": "feed-b8503.appspot.com",
        "messagingSenderId": "519738845227"
    }
    firebase = pyrebase.initialize_app(config)

    # curDate = datetime.datetime.today().strftime('%Y-%m-%d')

    db = firebase.database()
    # ref = db.reference('server/saving-data/fireblog')
    results = db.child("Articles").child(dataSource).set(data)

if __name__ == '__main__':
    getNews()
