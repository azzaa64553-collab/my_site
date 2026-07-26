// ======================================
// LA3 Cyber Security
// Main Script
// ======================================

// عناصر صفحه
const loginScreen = document.getElementById("login-screen");
const site = document.getElementById("site");
const membersPage = document.getElementById("membersPage");

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");


// رمز ورود
const PASSWORD = "_mamad_13900_";


// نام کاربر
let userName = "Guest";


// ورود به سایت
if(loginBtn){

loginBtn.onclick = ()=>{

    const pass = passwordInput.value;

    if(pass === PASSWORD){

        loginScreen.style.display="none";
        site.style.display="block";

        localStorage.setItem("login","true");

    }else{

        alert("رمز اشتباه است");

    }

};

}


// بررسی ورود قبلی
if(localStorage.getItem("login")==="true"){

    if(loginScreen)
        loginScreen.style.display="none";

    if(site)
        site.style.display="block";

}
// ======================================
// Firebase Setup
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


// تنظیمات Firebase خودت
const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_AUTH_DOMAIN",

databaseURL: "YOUR_DATABASE_URL",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_STORAGE_BUCKET",

messagingSenderId: "YOUR_MESSAGING_SENDER_ID",

appId: "YOUR_APP_ID"

};


// شروع Firebase

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


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


// نمایش پیام‌ها

function loadMessages(){

if(!chatBox) return;


onValue(
ref(db,"messages"),
(snapshot)=>{


chatBox.innerHTML="";


snapshot.forEach((child)=>{


const msg = child.val();


const div =
document.createElement("div");


div.className="msg";


div.innerHTML=
`
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
// Page Controls
// ======================================


// رفتن به صفحه اعضا

const membersBtn =
document.getElementById("membersBtn");


if(membersBtn){

membersBtn.onclick = ()=>{

if(membersPage){

membersPage.style.display="block";

}

};

}



// برگشت به صفحه اصلی

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


logoutBtn.onclick=()=>{


localStorage.removeItem("login");


location.reload();


};


}



// ======================================
// Security Message
// ======================================

console.log(
"LA3 Cyber Security Loaded Successfully"
);
