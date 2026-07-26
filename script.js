// ================================
// Firebase
// ================================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
set,
push,
onValue,
onDisconnect,
serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// Firebase Config

const firebaseConfig = {

apiKey: "AIzaSyBM5zOgIQKSG7_zQJ_L7taB0CQGjYWRSVA",

authDomain: "la3chat.firebaseapp.com",

databaseURL:
"https://la3chat-default-rtdb.firebaseio.com",

projectId: "la3chat",

storageBucket:
"la3chat.firebasestorage.app",

messagingSenderId:
"831502350386",

appId:
"1:831502350386:web:944a347e3b7656ea60242b",

measurementId:
"G-0LCL5N0KPL"

};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



// ================================
// Elements
// ================================

const loginScreen =
document.getElementById("login-screen");

const site =
document.getElementById("site");

const passwordInput =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");

const chatBox =
document.getElementById("chatBox");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");

const membersPage =
document.getElementById("membersPage");



// ================================
// User
// ================================

let currentUser =
localStorage.getItem("LA3_user");

let currentName =
localStorage.getItem("LA3_name");




// ================================
// Login
// ================================

loginBtn.onclick = ()=>{


let pass =
passwordInput.value.trim();


if(pass !== "_mamad_13900_"){

alert("رمز اشتباه است");

return;

}



if(!currentUser){

currentUser =
"user_"+Date.now();

localStorage.setItem(
"LA3_user",
currentUser
);

}



if(!currentName){

currentName =
prompt("نام شما:");

if(!currentName)
currentName="مهمان";


localStorage.setItem(
"LA3_name",
currentName
);

}



loginScreen.style.display="none";

site.style.display="block";


startOnline();

loadMessages();

loadMembers();


};



// ================================
// Online System
// ================================

function startOnline(){


const userRef =
ref(db,"online/"+currentUser);



onDisconnect(userRef)
.set(null);



set(userRef,{

name:currentName,

online:true,

time:serverTimestamp()

});


}



// ================================
// Members
// ================================

function loadMembers(){


const onlineRef =
ref(db,"online");


onValue(
onlineRef,
(snapshot)=>{


if(!membersPage)
return;


membersPage.innerHTML="";


let count=0;



snapshot.forEach(
(child)=>{


let user =
child.val();


if(user.online){


count++;


let div =
document.createElement("div");


div.textContent =
"🟢 "+user.name;


membersPage.appendChild(div);


}


});



let title =
document.createElement("h3");


title.textContent =
"اعضای آنلاین: "+count;


membersPage.prepend(title);



});

 }
// ================================
// Messages
// ================================


function loadMessages(){


const messagesRef =
ref(db,"messages");


onValue(
messagesRef,
(snapshot)=>{


chatBox.innerHTML="";


snapshot.forEach(
(child)=>{


const msg =
child.val();


let box =
document.createElement("div");


box.className="message";


let name =
document.createElement("b");


name.textContent =
msg.user+" : ";


let text =
document.createElement("span");


text.textContent =
msg.text;



box.appendChild(name);

box.appendChild(text);


chatBox.appendChild(box);



});



chatBox.scrollTop =
chatBox.scrollHeight;



});

}




// ================================
// Send Message
// ================================


sendBtn.onclick = ()=>{


let text =
messageInput.value.trim();



if(!text)
return;



let msgRef =
push(ref(db,"messages"));



set(msgRef,{

user:currentName,

text:text,

time:serverTimestamp()

});



messageInput.value="";


};





messageInput.addEventListener(
"keydown",
(e)=>{


if(e.key==="Enter"){

sendBtn.click();

}


});




// ================================
// Logout
// ================================


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.onclick=()=>{


set(
ref(db,"online/"+currentUser),
null
);



site.style.display="none";


loginScreen.style.display="block";



};

}




// ================================
// Clear Chat
// ================================


const clearBtn =
document.getElementById("clearBtn");



if(clearBtn){


clearBtn.onclick=()=>{


if(confirm("پاک کردن همه پیام‌ها؟")){


set(
ref(db,"messages"),
null
);


}


};


}




// ================================
// Auto Login
// ================================


if(currentUser && currentName){


loginScreen.style.display="none";


site.style.display="block";


startOnline();


loadMessages();


loadMembers();


}



console.log(
"LA3 Chat Ready"
);
