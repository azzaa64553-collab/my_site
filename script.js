// ======================================
// Firebase Imports
// ======================================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// ======================================
// Firebase Config
// ======================================

const firebaseConfig = {
  apiKey: "AIzaSyBM5zOgIQKSG7_zQJ_L7taB0CQGjYWRSVA",
  authDomain: "la3chat.firebaseapp.com",
  databaseURL: "https://la3chat-default-rtdb.firebaseio.com",
  projectId: "la3chat",
  storageBucket: "la3chat.firebasestorage.app",
  messagingSenderId: "831502350386",
  appId: "1:831502350386:web:944a347e3b7656ea60242b",
  measurementId: "G-0LCL5N0KPL"
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ======================================
// Login System
// ======================================

const PASSWORD = "_mamad_13900_";

const loginScreen =
document.getElementById("login-screen");

const site =
document.getElementById("site");

const password =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");


let userName = "Guest";


if(loginBtn){

loginBtn.onclick = ()=>{

if(password.value === PASSWORD){

loginScreen.style.display="none";

site.style.display="block";

localStorage.setItem("login","true");

}else{

alert("رمز اشتباه است");

}

};

}
// ======================================
// Auto Login
// ======================================

if(localStorage.getItem("login") === "true"){

if(loginScreen)
loginScreen.style.display="none";

if(site)
site.style.display="block";

}


// ======================================
// Chat System
// ======================================

const chatBox =
document.getElementById("chatBox");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");


// ارسال پیام

if(sendBtn){

sendBtn.onclick = ()=>{

let text = messageInput.value.trim();


if(text === "") return;


push(
ref(db,"messages"),
{
name:userName,
text:text,
time:serverTimestamp()
}
);


messageInput.value="";

};

}


// دریافت پیام‌ها

function loadMessages(){

if(!chatBox) return;


onValue(
ref(db,"messages"),
(snapshot)=>{


chatBox.innerHTML="";


snapshot.forEach((child)=>{


let msg = child.val();


let div =
document.createElement("div");


div.className="msg";


div.innerHTML = `

<b>${msg.name}</b>

<br>

${msg.text}

`;


chatBox.appendChild(div);


});


});

}


// فعال کردن چت

loadMessages();
// ======================================
// Members Page
// ======================================

const membersBtn =
document.getElementById("membersBtn");

const membersPage =
document.getElementById("membersPage");


if(membersBtn){

membersBtn.onclick = ()=>{

if(membersPage){

membersPage.style.display="block";

}

};

}


// ======================================
// Home Button
// ======================================

const homeBtn =
document.getElementById("homeBtn");


if(homeBtn){

homeBtn.onclick = ()=>{

if(membersPage){

membersPage.style.display="none";

}

};

}


// ======================================
// Logout
// ======================================

const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){

logoutBtn.onclick = ()=>{

localStorage.removeItem("login");

location.reload();

};

}


// ======================================
// Loaded
// ======================================

console.log("LA3 Cyber Security Loaded");
