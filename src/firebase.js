import firebase from "firebase/app"
import 'firebase/firestore'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDlZbq4EMluepyQ5wc0SWqRL8le_BkI0iE",
    authDomain: "myroleplayappserver.firebaseapp.com",
    databaseURL: "https://myroleplayappserver-default-rtdb.firebaseio.com",
    projectId: "myroleplayappserver",
    storageBucket: "myroleplayappserver.appspot.com",
    messagingSenderId: "608104043594",
    appId: "1:608104043594:web:72e25882afda54750182b3",
    measurementId: "G-3F09WYWXPV"
})

export const db = firebase.firestore();

export const auth = app.auth()
export default app