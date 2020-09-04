import firebase from 'firebase';
require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyB9JrW91I2sEP5iIVJKkgd6-Nm4q8RuVI8",
    authDomain: "goblog-562f2.firebaseapp.com",
    databaseURL: "https://goblog-562f2.firebaseio.com",
    projectId: "goblog-562f2",
    storageBucket: "goblog-562f2.appspot.com",
    messagingSenderId: "710475594514",
    appId: "1:710475594514:web:69802fc712a8efa19151cb",
    measurementId: "G-25266ETS9J"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const servertime = firebase.firestore.FieldValue.serverTimestamp()

export {db, auth, servertime};
