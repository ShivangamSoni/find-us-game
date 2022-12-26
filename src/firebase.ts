import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyChUz7R5rELHUB_YFVwGsKitGDFdGzwp64",
    authDomain: "find-us-game.firebaseapp.com",
    projectId: "find-us-game",
    storageBucket: "find-us-game.appspot.com",
    messagingSenderId: "89093524934",
    appId: "1:89093524934:web:bb0a1002e6e6e8c900b6c7",
    measurementId: "G-D9GLSL0KLG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get FirestoreDB Instance
export const db = getFirestore(app);

// Get Authentication Instance
export const auth = getAuth(app);

// Get Cloud Storage Instance
export const storage = getStorage(app);
