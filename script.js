import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
set,
push,
onValue,
remove,
onDisconnect
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";



const firebaseConfig = {

apiKey: "AIzaSyBM5zQ1gUKSG7_zQJ_L7taB0CGjWR5VA",

authDomain: "la3chat.firebaseapp.com",

databaseURL:"https://la3chat-default-rtdb.firebaseio.com",

projectId:"la3chat",

storageBucket:"la3chat.firebasestorage.app",

messagingSenderId:"831502350386",

appId:"1:831502350386:web:944a347e37656e60242b"

};



const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



const PASSWORD="_mamad_13900_";



// عناصر

const loginScreen=document.getElementById("login-screen");

const site=document.getElementById("site");

const password=document.getElementById("password");

const loginBtn=document.getElementById("loginBtn");

const toggle=document.getElementById("toggle");

const message=document.getElementById("message");

const countdown=document.getElementById("countdown");



const chatBtn=document.getElementById("chatBtn");

const chatLogin=document.getElementById("chatLogin");

const chatRoom=document.getElementById("chatRoom");

const chatCode=document.getElementById("chatCode");

const chatEnter=document.getElementById("chatEnter");

const chatMessage=document.getElementById("chatMessage");



const messages=document.getElementById("messages");

const chatText=document.getElementById("chatText");

const sendBtn=document.getElementById("sendBtn");

const clearChat=document.getElementById("clearChat");

const exitChat=document.getElementById("exitChat");

const membersList=document.getElementById("membersList");



let currentUser="";

let currentName="";

let chatListenerStarted=false;



const users={

"ali5678":"سید علی اصغر",

"z4321":"طاها زالی",

"ms9675":"سید علی موسوی",

"sa9988":"امیر مهدی",

"modir12131213":"محمد (مدیر)"

};
// نمایش رمز

toggle.onclick=function(){

if(password.type==="password"){

password.type="text";

toggle.innerHTML="🙈";

}else{

password.type="password";

toggle.innerHTML="👁";

}

};




password.addEventListener("keydown",function(e){

if(e.key==="Enter"){

login();

}

});



loginBtn.onclick=login;



function login(){


if(password.value===PASSWORD){


message.style.color="#00ff66";

message.innerHTML="در حال ورود...";


setTimeout(()=>{


loginScreen.style.display="none";

site.style.display="block";


},1000);



}else{


message.style.color="red";

message.innerHTML="رمز اشتباه است";

password.value="";


}


}








// ورود به چتروم


chatBtn.onclick=function(){

site.style.display="none";

chatLogin.style.display="flex";

};







// نمایش اعضا با وضعیت


function showMembers(){


if(!membersList)return;



onValue(ref(db,"members"),(membersSnap)=>{


let members = membersSnap.val() || {};



onValue(ref(db,"online"),(onlineSnap)=>{


let online = onlineSnap.val() || {};



membersList.innerHTML=`

<h3>👥 اعضای LA3</h3>

`;



for(let code in members){


let status = online[code]

? "🟢 آنلاین"

: "⚫ آفلاین";



membersList.innerHTML += `

<div class="member-item">

${status} - ${members[code].name}

</div>

`;



}



});


});


}








// ورود کاربر چتروم


chatEnter.onclick=function(){


let code=chatCode.value.trim();



if(users[code]){


currentUser=code;

currentName=users[code];



// ذخیره دائمی عضو

set(ref(db,"members/"+currentUser),{

name:currentName

});





// آنلاین کردن کاربر


const onlineRef=ref(db,"online/"+currentUser);



set(onlineRef,{

name:currentName,

online:true,

time:new Date().toLocaleTimeString("fa-IR")

});




// حذف خودکار آنلاین هنگام بستن صفحه

onDisconnect(onlineRef).remove();




chatLogin.style.display="none";

chatRoom.style.display="block";



showMembers();

loadMessages();



}else{


chatMessage.style.color="red";

chatMessage.innerHTML="کد اشتباه است";


}


};
// ===============================
// Online Members System
// ===============================

import {
    doc,
    setDoc,
    onSnapshot,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// کاربر فعلی
const username = localStorage.getItem("username");


// ثبت آنلاین بودن کاربر
if (username) {

    const userStatusRef = doc(db, "onlineUsers", username);

    setDoc(userStatusRef, {
        username: username,
        online: true,
        lastSeen: serverTimestamp()
    });


    // وقتی صفحه بسته شد
    window.addEventListener("beforeunload", () => {

        setDoc(userStatusRef, {
            username: username,
            online: false,
            lastSeen: serverTimestamp()
        });

    });

}


// نمایش اعضای آنلاین
const onlineList = document.getElementById("onlineList");


if (onlineList) {

    const usersRef = collection(db, "onlineUsers");


    onSnapshot(usersRef, (snapshot) => {

        onlineList.innerHTML = "";


        snapshot.forEach((userDoc) => {

            const user = userDoc.data();


            if (user.online) {

                const div = document.createElement("div");

                div.innerHTML = `
                🟢 ${user.username}
                `;

                onlineList.appendChild(div);

            }

        });

    });

  }
