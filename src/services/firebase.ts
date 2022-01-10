import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    //YOU FIREBASE CONFIG
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export {
    auth,
    database
}