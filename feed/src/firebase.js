import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBj3mbnomNrReTYcUG8rvz-KJ0FfTXA0w4",
    authDomain: "feed-b8503.firebaseapp.com",
    databaseURL: "https://feed-b8503.firebaseio.com",
    projectId: "feed-b8503",
    storageBucket: "feed-b8503.appspot.com",
    messagingSenderId: "519738845227"
  };
firebase.initializeApp(config);
export default firebase;