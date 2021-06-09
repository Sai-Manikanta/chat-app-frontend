import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDon_7fXTnAmcMGxIpgS6GcgWalD2TXx38",
    authDomain: "reactchat-d2a36.firebaseapp.com",
    projectId: "reactchat-d2a36",
    databaseURL: "https://reactchat-d2a36-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "reactchat-d2a36.appspot.com",
    messagingSenderId: "297765797587",
    appId: "1:297765797587:web:782997845e4b39ec435e26"
};

firebase.initializeApp(firebaseConfig);

export default firebase