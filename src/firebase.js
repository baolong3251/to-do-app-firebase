import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAvVZkxCMQQXYhcQFf3McEnvqFSstRSt3M",
    authDomain: "todo-app-react-c71b3.firebaseapp.com",
    projectId: "todo-app-react-c71b3",
    storageBucket: "todo-app-react-c71b3.appspot.com",
    messagingSenderId: "160668235848",
    appId: "1:160668235848:web:b15d497d05248b11b3c07d",
    measurementId: "G-CYK0HQ1MDS"
})

const db = firebaseApp.firestore();

export default db;