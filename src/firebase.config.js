import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAjQwLZv_IzxyYtdRrh6KVPwgBpn5ZHUTg",
	authDomain: "matching-811f8.firebaseapp.com",
	projectId: "matching-811f8",
	storageBucket: "matching-811f8.appspot.com",
	messagingSenderId: "735748774475",
	appId: "1:735748774475:web:26a17026d35cbf0eb0cbce",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
