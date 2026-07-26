// ======================================
// Firebase Imports
// ======================================

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



// ======================================
// Firebase Config
// ======================================

const firebaseConfig = {

apiKey: "AIzaSyBM5zOgIQKSG7_zQJ_L7taB0CQGjYWRSVA",

authDomain: "la3chat.firebaseapp.com",

databaseURL:
"https://la3chat-default-rtdb.firebaseio.com",

projectId:"la3chat",

storageBucket:
"la3chat.firebasestorage.app",

messagingSenderId:"831502350386",

appId:
"1:831502350386:web:944a347e3b7656ea60242b",

measurementId:"G-0LCL5N0KPL"

};



const app =
initializeApp(firebaseConfig);


const db =
getDatabase(app);



// ======================================
// HTML Elements (طبق سایت خودت)
// ======================================


const loginScreen =
document.getElementById("login-screen");


const site =
document.getElementById("site");


const password =
document.getElementById("password");


const loginBtn =
document.getElementById("loginBtn");


const messages =
document.getElementById("messages");


const chatText =
document.getElementById("chatText");


const membersList =
document.getElementById("membersList");


const clearChat =
document.getElementById("clearChat");


const exitChat =
document.getElementById("exitChat");


const membersBtn =
document.getElementById("membersBtn");


const chatBtn =
document.getElementById("chatBtn");



// ======================================
// User
// ======================================

let userID =
localStorage.getItem("LA3_ID");


let userName =
localStorage.getItem("LA3_NAME");



// ======================================
// Login
// ======================================


loginBtn.onclick = ()=>{


if(password.value !== "_mamad_13900_"){

alert("رمز اشتباه است");

return;

}



if(!userID){

userID =
"user_"+Date.now();

localStorage.setItem(
"LA3_ID",
userID
);

}



if(!userName){

userName =
prompt("نام شما؟") || "مهمان";


localStorage.setItem(
"LA3_NAME",
userName
);

}



loginScreen.style.display="none";

site.style.display="block";


setOnline();


loadMessages();


loadMembers();


};
// ======================================
// Online / Offline System
// ======================================

function setOnline(){


const userRef =
ref(db,"online/"+userID);



onDisconnect(userRef)
.set(null);



set(userRef,{

name:userName,

online:true,

time:serverTimestamp()

});


}



// ======================================
// Load Online Members
// ======================================


function loadMembers(){


const onlineRef =
ref(db,"online");


onValue(
onlineRef,
(snapshot)=>{


membersList.innerHTML="";


let count=0;



snapshot.forEach(
(child)=>{


const member =
child.val();



if(member && member.online){


count++;


const item =
document.createElement("div");


item.textContent =
"🟢 "+member.name;


membersList.appendChild(item);


}


});



const title =
document.createElement("h3");


title.textContent =
"اعضای آنلاین: "+count;


membersList.prepend(title);



});


}





// ======================================
// Chat Messages
// ======================================


function loadMessages(){


const msgRef =
ref(db,"messages");


onValue(
msgRef,
(snapshot)=>{


messages.innerHTML="";



snapshot.forEach(
(child)=>{


const data =
child.val();



const box =
document.createElement("div");


box.className="message";


box.textContent =
data.user+" : "+data.text;



messages.appendChild(box);



});



messages.scrollTop =
messages.scrollHeight;



});


}




// ======================================
// Send Message
// ======================================


chatText.addEventListener(
"keydown",
(e)=>{


if(e.key==="Enter"){


sendMessage();


}


});



function sendMessage(){


const text =
chatText.value.trim();



if(!text)
return;



const newMsg =
push(ref(db,"messages"));



set(newMsg,{

user:userName,

text:text,

time:serverTimestamp()

});



chatText.value="";


}



// اگر دکمه ارسال داری
const sendBtn =
document.getElementById("sendBtn");


if(sendBtn){


sendBtn.onclick =
sendMessage;


 }
// ======================================
// Clear Chat
// ======================================

if(clearChat){

clearChat.onclick = ()=>{


if(confirm("همه پیام‌ها پاک شود؟")){


set(
ref(db,"messages"),
null
);


}


};


}




// ======================================
// Exit Chat
// ======================================

if(exitChat){


exitChat.onclick = ()=>{


if(userID){


set(
ref(db,"online/"+userID),
null
);


}



site.style.display="none";


loginScreen.style.display="block";



};



}




// ======================================
// Page Buttons
// ======================================


if(membersBtn){


membersBtn.onclick = ()=>{


site.style.display="none";


const membersPage =
document.getElementById("membersPage");


if(membersPage){

membersPage.style.display="block";

}


};


}





if(chatBtn){


chatBtn.onclick = ()=>{


const chatLogin =
document.getElementById("chatLogin");


if(chatLogin){

chatLogin.style.display="block";

}


};


}





// ======================================
// Auto Login
// ======================================


if(userID && userName){


loginScreen.style.display="none";


site.style.display="block";


setOnline();


loadMessages();


loadMembers();


}



console.log(
"LA3 CHAT READY"
);
