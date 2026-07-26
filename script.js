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
}
from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// ======================================
// Firebase
// ======================================

const firebaseConfig = {

apiKey:"AIzaSyBM5zOgIQKSG7_zQJ_L7taB0CQGjYWRSVA",

authDomain:"la3chat.firebaseapp.com",

databaseURL:"https://la3chat-default-rtdb.firebaseio.com",

projectId:"la3chat",

storageBucket:"la3chat.firebasestorage.app",

messagingSenderId:"831502350386",

appId:"1:831502350386:web:944a347e3b7656ea60242b"

};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ======================================
// Elements
// ======================================

const loginScreen =
document.getElementById("login-screen");

const site =
document.getElementById("site");

const password =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");

const message =
document.getElementById("message");

const membersBtn =
document.getElementById("membersBtn");

const chatBtn =
document.getElementById("chatBtn");

const backBtn =
document.getElementById("backBtn");


// ======================================
// User
// ======================================

let userID =
localStorage.getItem("LA3_ID");

let userName =
localStorage.getItem("LA3_NAME");

const PASSWORD="_mamad_13900_";


// ======================================
// Login
// ======================================

loginBtn.onclick=()=>{


if(password.value !== PASSWORD){

message.innerHTML =
"❌ رمز عبور اشتباه است";

return;

}


message.innerHTML="";


if(!userID){

userID="user_"+Date.now();

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
// Online System
// ======================================

function setOnline(){

if(!userID) return;


const userRef =
ref(db,"online/"+userID);


// وقتی قطع شد آفلاین شود
onDisconnect(userRef).set({

name:userName,

online:false,

time:serverTimestamp()

});


// آنلاین شدن
set(userRef,{

name:userName,

online:true,

time:serverTimestamp()

});


}



// ======================================
// Members
// ======================================

function loadMembers(){


const membersPage =
document.getElementById("membersPage");


if(!membersPage) return;


onValue(
ref(db,"online"),
(snapshot)=>{


membersPage.innerHTML="";


let count=0;


snapshot.forEach((child)=>{


const member =
child.val();


if(member.online){


count++;


const div =
document.createElement("div");


div.innerHTML =
`
<div class="member">
🟢 ${member.name}
</div>
`;


membersPage.appendChild(div);


}


});



const title =
document.createElement("h3");


title.innerHTML =
"اعضای آنلاین: "+count;


membersPage.prepend(title);



});


}



// ======================================
// Page Buttons
// ======================================


membersBtn.onclick=()=>{


document.getElementById("home").style.display="none";

document.getElementById("membersPage").style.display="block";


};



chatBtn.onclick=()=>{


document.getElementById("home").style.display="none";

document.getElementById("chatPage").style.display="block";


};



backBtn.onclick=()=>{


document.getElementById("membersPage").style.display="none";

document.getElementById("chatPage").style.display="none";


document.getElementById("home").style.display="block";


};
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

sendBtn.onclick=()=>{


let text =
messageInput.value.trim();


if(text==="") return;



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




// دریافت پیام ها

function loadMessages(){


if(!chatBox) return;


onValue(
ref(db,"messages"),
(snapshot)=>{


chatBox.innerHTML="";


snapshot.forEach((child)=>{


const msg =
child.val();


const div =
document.createElement("div");


div.innerHTML=
`
<div class="msg">

<b>${msg.name}</b>

<br>

${msg.text}

</div>
`;



chatBox.appendChild(div);



});


});


}





// ======================================
// Logout
// ======================================


const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){


logoutBtn.onclick=()=>{


if(userID){


set(
ref(db,"online/"+userID),

{

name:userName,

online:false,

time:serverTimestamp()

}

);


}



localStorage.clear();


location.reload();


};


}
