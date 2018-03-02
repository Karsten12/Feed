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
    addToFirebase(articles)
    # for i in articles:
    #     # articleTitle = i["title"]
    #     print(i)


def addToFirebase(data):
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
    dataString = "Articles"
    db = firebase.database()
    # ref = db.reference('server/saving-data/fireblog')
    results = db.child(dataString).set(data)

if __name__ == '__main__':
    getNews()
