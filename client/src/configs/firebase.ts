import firebase from "firebase/compat/app";

import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCrBlrKbmy7W2uDM8T8kDKQNgEThLYsmJ4",
    authDomain: "eclassroom-80b31.firebaseapp.com",
    projectId: "eclassroom-80b31",
    storageBucket: "eclassroom-80b31.appspot.com",
    messagingSenderId: "895333168665",
    appId: "1:895333168665:web:bdef051a1a45ed4e949c88",
    measurementId: "G-VFKRR6KS45"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const storage = app.storage();

// const storage = app.
export { storage, firebase as default};