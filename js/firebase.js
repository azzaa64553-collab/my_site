// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// Config
const firebaseConfig = {

    apiKey: "AIzaSyBM5zOgIQKSG7_zQJ_L7taB0CQGjYWRSVA",

    authDomain: "la3chat.firebaseapp.com",

    projectId: "la3chat",

    storageBucket: "la3chat.firebasestorage.app",

    messagingSenderId: "831502350386",

    appId: "1:831502350386:web:944a347e3b7656ea60242b"

};

// Initialize
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Storage
const storage = getStorage(app);

// Export
export { app, db, storage };
