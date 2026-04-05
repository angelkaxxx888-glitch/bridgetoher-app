import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZkrtOXISbUO3Fb_zvsyzzH1aS4ee8ZTI",
  authDomain: "bridgetoher.firebaseapp.com",
  projectId: "bridgetoher",
  storageBucket: "bridgetoher.firebasestorage.app",
  messagingSenderId: "1082688277555",
  appId: "1:1082688277555:web:72328598b456fe0aade746"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
