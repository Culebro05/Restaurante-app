import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDXXw_5zYReAa6KhkEfrte6SvLvaEs2nlk",
  authDomain: "restaurante-691d3.firebaseapp.com",
  projectId: "restaurante-691d3",
  storageBucket: "restaurante-691d3.appspot.com",
  messagingSenderId: "215761128395",
  appId: "1:215761128395:web:03c7140beaf5b335a6844e"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)