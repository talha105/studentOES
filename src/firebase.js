import firebase from "firebase";

    const firebaseConfig = {
      apiKey: "AIzaSyDZdaMivoayWTwohXioExLO-acXwdqejho",
      authDomain: "prac-198a8.firebaseapp.com",
      databaseURL: "https://prac-198a8.firebaseio.com",
      projectId: "prac-198a8",
      storageBucket: "prac-198a8.appspot.com",
      messagingSenderId: "668790121628",
      appId: "1:668790121628:web:0d70e3bcd514a099c4b959"
    };



     export default   firebase.initializeApp(firebaseConfig)