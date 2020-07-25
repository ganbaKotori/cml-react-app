import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAeHG5vaR3oF3R15FyBInHMJ2c1f8rCqlE",
    authDomain: "cml-app-1e900.firebaseapp.com",
    databaseURL: "https://cml-app-1e900.firebaseio.com",
    projectId: "cml-app-1e900",
    storageBucket: "cml-app-1e900.appspot.com",
    messagingSenderId: "599938066652",
    appId: "1:599938066652:web:58ba7cf0963f79fbadec19",
    measurementId: "G-3WFHGWWPRN"
  };


firebase.initializeApp(firebaseConfig);

export default firebase;