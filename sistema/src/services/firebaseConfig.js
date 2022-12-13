import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBypKubcLf_TVVWggzIZp1kVmjiSN0h0-I",
    authDomain: "sistema-989d2.firebaseapp.com",
    projectId: "sistema-989d2",
    storageBucket: "sistema-989d2.appspot.com",
    messagingSenderId: "473042085665",
    appId: "1:473042085665:web:54d543ac3486597debc060",
    measurementId: "G-XQYVJYJ6QK"
  };
  
 if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
 }
 export default firebase;
 