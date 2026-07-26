// Firebase imports

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


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
// Login System
// ===============================

const PASSWORD = "_mamad_13900_";


const loginScreen =
document.getElementById("login-screen");

const site =
document.getElementById("site");

const passwordInput =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");


let userName = "Guest";



if(loginBtn){

loginBtn.onclick = ()=>{


let pass = passwordInput.value;


if(pass === PASSWORD){


if(loginScreen)
loginScreen.style.display="none";


if(site)
site.style.display="block";


localStorage.setItem(
"login",
"true"
);


}else{


alert("رمز اشتباه است");


}


};

}



// ورود خودکار

if(localStorage.getItem("login") === "true"){



if(loginScreen)
loginScreen.style.display="none";


if(site)
site.style.display="block";


}
// ===============================
// Chat Room
// ===============================

const chatBox =
document.getElementById("chatBox");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");


if(sendBtn){

sendBtn.onclick = ()=>{

const text = messageInput.value.trim();

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


function loadMessages(){

if(!chatBox) return;


onValue(
ref(db,"messages"),
(snapshot)=>{

chatBox.innerHTML="";


snapshot.forEach((item)=>{

const data=item.val();


const msg=document.createElement("div");

msg.className="msg";


msg.innerHTML=`
<b>${data.name}</b>
<br>
${data.text}
`;


chatBox.appendChild(msg);


});

});

}


loadMessages();
