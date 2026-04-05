import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSy...", // замени на свои
  authDomain: "bridgetoher.firebaseapp.com",
  projectId: "bridgetoher",
  storageBucket: "bridgetoher.firebasestorage.app",
  messagingSenderId: "1082688277555",
  appId: "1:1082688277555:web:72328598b456fe0aade746"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveMood(mood, note) {
  await addDoc(collection(db, "moods"), {
    mood: mood,
    note: note,
    createdAt: new Date()
  });
}
