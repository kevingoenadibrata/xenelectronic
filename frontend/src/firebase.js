// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ2kThfRk3Jnq-ohMlUKqeD3PgjTPrTWs",
  authDomain: "xenelectronic.firebaseapp.com",
  projectId: "xenelectronic",
  storageBucket: "xenelectronic.appspot.com",
  messagingSenderId: "1069691558218",
  appId: "1:1069691558218:web:6217a706a72ba8154889b3",
  measurementId: "G-GGD00QQFR6",
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
