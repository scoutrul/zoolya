import { FirebaseApp, User, Doc, Collection } from 'sveltefire';
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/performance';
// import 'firebase/analytics';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDeAhEFGL7QBS4u21ufr3K1cDqcFyo7TDI",
    authDomain: "zoolya.firebaseapp.com",
    databaseURL: "https://zoolya.firebaseio.com",
    projectId: "zoolya",
    storageBucket: "zoolya.appspot.com",
    messagingSenderId: "1065320094276",
    appId: "1:1065320094276:web:6f32c78bf0bfa08d67fa11"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
