import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    limit 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==================== НАСТРОЙКИ FIREBASE ====================
// ⚠️ ЗАМЕНИ apiKey НА СВОЙ!
const firebaseConfig = {
    apiKey: "AIzaSy...",  // 👈 ВСТАВЬ СВОЙ API КЛЮЧ
    authDomain: "bridgetoher.firebaseapp.com",
    projectId: "bridgetoher",
    storageBucket: "bridgetoher.firebasestorage.app",
    messagingSenderId: "1082688277555",
    appId: "1:1082688277555:web:72328598b456fe0aade746"
};

// Инициализация
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ==================== СОХРАНЕНИЕ НАСТРОЕНИЯ ====================
export async function saveMood(mood, note) {
    try {
        const docRef = await addDoc(collection(db, "moods"), {
            mood: mood,
            note: note,
            createdAt: new Date()
        });
        console.log("Настроение сохранено с ID:", docRef.id);
        return true;
    } catch (error) {
        console.error("Ошибка сохранения настроения:", error);
        throw error;
    }
}

// ==================== ПОЛУЧЕНИЕ ПОСЛЕДНЕГО НАСТРОЕНИЯ ====================
export async function getLastMood() {
    try {
        const moodsRef = collection(db, "moods");
        // Сортируем по дате создания (от новых к старым) и берём первый
        const q = query(moodsRef, orderBy("createdAt", "desc"), limit(1));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            console.log("Нет сохранённых настроений");
            return null;
        }
        
        const doc = snapshot.docs[0];
        const data = doc.data();
        
        // Преобразуем Firebase Timestamp в обычную дату (если нужно)
        let createdAt = data.createdAt;
        if (createdAt && typeof createdAt.toDate === 'function') {
            createdAt = createdAt.toDate();
        }
        
        return {
            id: doc.id,
            mood: data.mood || '😌',
            note: data.note || '',
            createdAt: createdAt
        };
    } catch (error) {
        console.error("Ошибка получения последнего настроения:", error);
        return null;
    }
}

// ==================== ПОДСКАЗКА ДЛЯ ПАРТНЁРА ====================
export function getPhaseHint(mood) {
    const hints = {
        '😌 спокойно': '🌿 Она в гармонии с собой. Хороший день для разговоров по душам.',
        '🥰 нежность': '💕 Ей хочется тепла. Обними её или скажи что-то ласковое.',
        '😊 радость': '🌟 Отличное время для совместных планов и сюрпризов.',
        '🔥 страсть': '💋 Сегодня она особенно чувственна. Устрой романтический вечер.',
        '😴 усталость': '🛋 Ей нужен отдых. Возьми часть дел на себя.',
        '😠 раздражение': '🧘‍♀️ Лучше не спорить. Просто будь рядом и предложи помощь.',
        '😭 грусть': '🤗 Обними её. Сейчас важнее всего твоя поддержка.',
        '🤢 тошнота': '🫖 Предложи травяной чай или просто побудь рядом.'
    };
    
    // Если настроение не найдено в списке — стандартная подсказка
    return hints[mood] || '🌸 Будь внимателен к ней сегодня ❤️';
}
