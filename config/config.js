import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAbkhmBGVrQM3L4b9OmBQO-ZOj8Hja1yEg",
    authDomain: "firstproject-c8625.firebaseapp.com",
    databaseURL: "https://firstproject-c8625.firebaseio.com",
    projectId: "firstproject-c8625",
    storageBucket: "firstproject-c8625.appspot.com",
    messagingSenderId: "334593278493",
    appId: "1:334593278493:web:15d627d59d10aeffa73cf4",
    measurementId: "G-4TTB3LX466"
};

firebase.initializeApp(firebaseConfig)

export const f = firebase
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();