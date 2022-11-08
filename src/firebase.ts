import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8H7lkHbJUzNaao4p5k-7VlUFu6_UoA40",
    authDomain: "proxima-parada-storage.firebaseapp.com",
    projectId: "proxima-parada-storage",
    storageBucket: "proxima-parada-storage.appspot.com",
    messagingSenderId: "136678107832",
    appId: "1:136678107832:web:66c6cca6b8d74f886ea24d",
    measurementId: "G-B1Z1FCWDQF",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
