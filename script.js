// ===============================
// LA3 Cyber Security - script.js
// Fixed Version Part 1
// ===============================


// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// Firebase Config
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


// ===============================
// Elements
// ===============================

const loginScreen = document.getElementById("login-screen");
const password = document.getElementById("password");
const toggle = document.getElementById("toggle");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");
const countdown = document.getElementById("countdown");


const site = document.getElementById("site");

const membersBtn = document.getElementById("membersBtn");
const chatBtn = document.getElementById("chatBtn");


const membersPage = document.getElementById("membersPage");
const backBtn = document.getElementById("backBtn");


const chatLogin = document.getElementById("chatLogin");
const chatCode = document.getElementById("chatCode");
const chatEnter = document.getElementById("chatEnter");

const chatRoom = document.getElementById("chatRoom");
const chatMessage = document.getElementById("chatMessage");

const messages = document.getElementById("messages");
const chatText = document.getElementById("chatText");

const sendBtn = document.getElementById("sendBtn");
const clearChat = document.getElementById("clearChat");
const exitChat = document.getElementById("exitChat");


// ===============================
// Password
// ===============================

const PASSWORD = "_mamad_13900_";


// ===============================
// Initial State
// ===============================

if(site) site.style.display="none";
if(membersPage) membersPage.style.display="none";
if(chatLogin) chatLogin.style.display="none";
if(chatRoom) chatRoom.style.display="none";


// ===============================
// Show / Hide Password
// ===============================

if(toggle){

toggle.onclick = ()=>{

if(password.type==="password"){
password.type="text";
toggle.innerText="مخفی";
}
else{
password.type="password";
toggle.innerText="نمایش";
}

};

}


// ===============================
// Login
// ===============================

if(loginBtn){

loginBtn.onclick = ()=>{

if(password.value === PASSWORD){

message.innerText="ورود موفق ✅";

setTimeout(()=>{

if(loginScreen)
loginScreen.style.display="none";

if(site)
site.style.display="block";

},500);


}else{

message.innerText="رمز اشتباه است ❌";
password.value="";

}

};

    }
// ===============================
// Members Page
// ===============================

if(membersBtn){

membersBtn.onclick = ()=>{

if(site)
site.style.display="none";

if(membersPage)
membersPage.style.display="block";

};

}


if(backBtn){

backBtn.onclick = ()=>{

if(membersPage)
membersPage.style.display="none";

if(site)
site.style.display="block";

};

}


// ===============================
// Chat Open
// ===============================

if(chatBtn){

chatBtn.onclick = ()=>{

if(site)
site.style.display="none";

if(chatLogin)
chatLogin.style.display="block";

};

}


// ===============================
// Enter Chat
// ===============================

if(chatEnter){

chatEnter.onclick = ()=>{


let code = chatCode.value.trim();


if(code==="LA3"){


if(chatLogin)
chatLogin.style.display="none";


if(chatRoom)
chatRoom.style.display="block";


loadMessages();


}else{


if(chatMessage)
chatMessage.innerText="کد اشتباه است ❌";


}


};

}


// ===============================
// Send Message
// ===============================

if(sendBtn){

sendBtn.onclick = ()=>{


let text = chatText.value.trim();


if(text==="")
return;


push(ref(db,"messages"),{

text:text,
time:Date.now()

});


chatText.value="";


};

    }
// ===============================
// Load Messages
// ===============================

function loadMessages(){

if(!messages)
return;


onValue(ref(db,"messages"),(snapshot)=>{


messages.innerHTML="";


snapshot.forEach((item)=>{


let data=item.val();


let div=document.createElement("div");

div.className="message";

div.innerText=data.text;


messages.appendChild(div);


});


messages.scrollTop=messages.scrollHeight;


});


}


// ===============================
// Clear Chat
// ===============================

if(clearChat){

clearChat.onclick=()=>{


remove(ref(db,"messages"));


};

}


// ===============================
// Exit Chat
// ===============================

if(exitChat){

exitChat.onclick=()=>{


if(chatRoom)
chatRoom.style.display="none";


if(site)
site.style.display="block";


};

}


// ===============================
// Enter Key Send
// ===============================

if(chatText){

chatText.addEventListener("keydown",(e)=>{


if(e.key==="Enter"){

if(sendBtn)
sendBtn.click();

}


});

}
