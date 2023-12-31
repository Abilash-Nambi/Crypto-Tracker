import firebaseConfig from "../Config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp(firebaseConfig);
const Auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { Auth, db };
