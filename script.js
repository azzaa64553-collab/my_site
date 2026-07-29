// ===============================
// LA3 Cyber Security
// Final Fixed Script
// Chat Fixed Version
// Part 1
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// ===============================
// Firebase
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyBM5OgIQKSG7_zQJ_L7taB0CQGjYWRSVA",
    authDomain: "la3chat.firebaseapp.com",
    databaseURL: "https://la3chat-default-rtdb.firebaseio.com",
    projectId: "la3chat",
    storageBucket: "la3chat.firebasestorage.app",
    messagingSenderId: "831502350386",
    appId: "1:831502350386:web:944a347e3b7656ea60242b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// ===============================
// Elements
// ===============================

const loginScreen = document.getElementById("login-screen");
const password = document.getElementById("password");
const toggle = document.getElementById("toggle");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

const site = document.getElementById("site");
const membersBtn = document.getElementById("membersBtn");
const membersPage = document.getElementById("membersPage");
const backBtn = document.getElementById("backBtn");

const chatBtn = document.getElementById("chatBtn");
const chatLogin = document.getElementById("chatLogin");
const chatCode = document.getElementById("chatCode");
const chatEnter = document.getElementById("chatEnter");
const chatMessage = document.getElementById("chatMessage");

const chatRoom = document.getElementById("chatRoom");
const currentUser = document.getElementById("currentUser");
const messages = document.getElementById("messages");
const chatText = document.getElementById("chatText");
const sendBtn = document.getElementById("sendBtn");
const clearChat = document.getElementById("clearChat");
const exitChat = document.getElementById("exitChat");


// ===============================
// Variables
// ===============================

const PASSWORD = "_mamad_13900_";

const users = {
    "ali5678": "سید علی اصغر",
    "ms9675": "سید علی موسوی",
    "z4321": "طاها زالی",
    "sa9988": "سعدی",
    "modir12131213": "محمد"
};

// مهم: دیگر از localStorage برای مقدار اولیه استفاده نمی‌کنیم
let username = "";
let currentCode = "";
let isAdmin = false;


// ===============================
// Initial State
// ===============================

if (site) site.style.display = "none";
if (membersPage) membersPage.style.display = "none";
if (chatLogin) chatLogin.style.display = "none";
if (chatRoom) chatRoom.style.display = "none";
// ===============================
// Open Chat
// ===============================

if (chatBtn) {

    chatBtn.onclick = () => {

        if (site) site.style.display = "none";
        if (chatLogin) chatLogin.style.display = "flex";

        if (chatMessage) chatMessage.innerText = "";
        if (chatCode) chatCode.value = "";

    };

}


// ===============================
// Enter Chat (Fixed)
// ===============================

if (chatEnter) {

    chatEnter.onclick = () => {

        const code = chatCode.value.trim();

        if (!users.hasOwnProperty(code)) {

            if (chatMessage) {
                chatMessage.innerText = "کد اشتباه است ❌";
            }

            return;
        }

        currentCode = code;
        username = users[code];
        isAdmin = (code === "modir12131213");

        localStorage.setItem("LA3user", username);
        localStorage.setItem("LA3code", code);

        if (chatLogin) chatLogin.style.display = "none";
        if (chatRoom) chatRoom.style.display = "block";

        if (currentUser) {
            currentUser.innerText = "کاربر وارد شده: " + username;
        }

        if (clearChat) {
            clearChat.style.display = isAdmin ? "inline-block" : "none";
        }

        if (chatText) {
            chatText.value = "";
            chatText.focus();
        }

        if (chatMessage) {
            chatMessage.innerText = "";
        }

        loadMessages();

    };

    }
// ===============================
// Send Message (Completely Fixed)
// ===============================

async function sendMessage() {

    if (!chatText) return;
    if (!sendBtn) return;

    const text = chatText.value.trim();

    if (text === "") {
        chatText.focus();
        return;
    }

    if (!username || !currentCode) {
        alert("ابتدا وارد چت شوید ❌");
        return;
    }

    sendBtn.disabled = true;

    try {

        await push(ref(db, "messages"), {
            name: username,
            code: currentCode,
            text: text,
            time: Date.now()
        });

        chatText.value = "";
        chatText.focus();

    } catch (error) {

        console.error("Firebase Error:", error);

        alert("خطا در ارسال پیام:\n" + error.message);

    } finally {

        sendBtn.disabled = false;

    }

}


// فقط یکبار رویدادها ثبت شوند

if (sendBtn) {

    sendBtn.replaceWith(sendBtn.cloneNode(true));

    const newSendBtn = document.getElementById("sendBtn");

    newSendBtn.addEventListener("click", sendMessage);

}


if (chatText) {

    chatText.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    });

      }
// ===============================
// Load Messages (Fixed)
// ===============================

let chatListenerStarted = false;

function loadMessages() {

    if (!messages) return;

    if (chatListenerStarted) return;

    chatListenerStarted = true;

    onValue(ref(db, "messages"), (snapshot) => {

        messages.innerHTML = "";

        if (!snapshot.exists()) return;

        snapshot.forEach((item) => {

            const data = item.val();

            if (!data) return;

            const div = document.createElement("div");

            div.className = "chat-message";

            if (data.code === currentCode) {
                div.classList.add("my-message");
            } else {
                div.classList.add("other-message");
            }

            div.innerHTML = `
                <div class="username">${data.name ?? "کاربر"}</div>
                <div class="text">${data.text ?? ""}</div>
                <div class="time">${new Date(data.time).toLocaleString("fa-IR")}</div>
            `;

            messages.appendChild(div);

        });

        messages.scrollTop = messages.scrollHeight;

    });

}


// ===============================
// Clear Chat
// ===============================

if (clearChat) {

    clearChat.onclick = async () => {

        if (!isAdmin) {

            alert("فقط مدیر اجازه حذف چت را دارد ❌");
            return;

        }

        if (!confirm("همه پیام‌ها حذف شوند؟")) return;

        try {

            await remove(ref(db, "messages"));

        } catch (err) {

            console.error(err);
            alert(err.message);

        }

    };

}


// ===============================
// Exit Chat
// ===============================

if (exitChat) {

    exitChat.onclick = () => {

        if (chatRoom) chatRoom.style.display = "none";
        if (site) site.style.display = "block";

        username = "";
        currentCode = "";
        isAdmin = false;

        if (chatText) chatText.value = "";

        localStorage.removeItem("LA3user");
        localStorage.removeItem("LA3code");

    };

}
