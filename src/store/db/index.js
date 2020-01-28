import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase
  .initializeApp({
    apiKey: "AIzaSyBzN5ye82q2LeSOGosau4T-N4C_1VF7si0",
    authDomain: "servicario-im.firebaseapp.com",
    databaseURL: "https://servicario-im.firebaseio.com",
    projectId: "servicario-im",
    storageBucket: "servicario-im.appspot.com",
    messagingSenderId: "675092451532",
    appId: "1:675092451532:web:1ce5b6450c053a0597f269",
    measurementId: "G-L1YB9Z0WMZ"
  })
  .firestore();

export default db;

const { Timestamp } = firebase.firestore;
export { Timestamp };
