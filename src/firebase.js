import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADfeTzsMobMLA8t9_C8Jh9Eduynd2oNAA",
  authDomain: "ama2on-clone.firebaseapp.com",
  projectId: "ama2on-clone",
  storageBucket: "ama2on-clone.appspot.com",
  messagingSenderId: "607789414629",
  appId: "1:607789414629:web:7a37624e367e2028bf7c0c",
  measurementId: "G-VX561JB3TQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
