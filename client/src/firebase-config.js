import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "< YOUR API KEY >",
    authDomain: "< YOUR AUTHDOMAIN >",
    projectId: "< YOUR PROJECTID >",
    storageBucket: "< YOUR STORAGEBUCKET >",
    messagingSenderId: "< YOUR MESSAGINGSENDERID >",
    appId: "< YOUR ADDID >"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();