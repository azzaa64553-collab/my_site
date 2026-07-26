import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
remove,
set,
onDisconnect
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


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



const PASSWORD = "_mamad_13900_";



const loginScreen = document.getElementById("login-screen");
const site = document.getElementById("site");

const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("toggle");

const message = document.getElementById("message");
const countdown = document.getElementById("countdown");



const membersPage = document.getElementById("membersPage");
const membersBtn = document.getElementById("membersBtn");
const backBtn = document.getElementById("backBtn");



const chatBtn = document.getElementById("chatBtn");
const chatLogin = document.getElementById("chatLogin");
const chatRoom = document.getElementById("chatRoom");

const chatCode = document.getElementById("chatCode");
const chatEnter = document.getElementById("chatEnter");
const chatMessage = document.getElementById("chatMessage");

const messages = document.getElementById("messages");
const chatText = document.getElementById("chatText");
const sendBtn = document.getElementById("sendBtn");

const clearChat = document.getElementById("clearChat");
const exitChat = document.getElementById("exitChat");

const membersList = document.getElementById("membersList");



site.style.display="none";
membersPage.style.display="none";
chatLogin.style.display="none";
chatRoom.style.display="none";



let attempts = 0;
let locked = false;

let currentUser = "";
let currentName = "";

let chatListenerStarted = false;



const users = {

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

if(locked)return;


if(password.value===PASSWORD){


message.style.color="#00ff66";

message.innerHTML="در حال ورود...";


setTimeout(()=>{

loginScreen.style.display="none";

site.style.display="block";


},1200);



}else{


attempts++;

message.style.color="red";

message.innerHTML="رمز اشتباه است";


password.value="";



if(attempts>=3){


locked=true;

loginBtn.disabled=true;

password.disabled=true;



let sec=30;


countdown.innerHTML="تلاش دوباره: "+sec;



let timer=setInterval(()=>{


sec--;


countdown.innerHTML="تلاش دوباره: "+sec;



if(sec<=0){


clearInterval(timer);


attempts=0;

locked=false;


loginBtn.disabled=false;

password.disabled=false;


countdown.innerHTML="";

message.innerHTML="";


}


},1000);



}


}


}







// صفحه اعضا


membersBtn.onclick=function(){

site.style.display="none";

membersPage.style.display="block";

};



backBtn.onclick=function(){

membersPage.style.display="none";

site.style.display="block";

};







// باز کردن ورود چتروم


chatBtn.onclick=function(){

site.style.display="none";

chatLogin.style.display="flex";

};









// نمایش اعضا و وضعیت آنلاین


function showMembers(){


if(!membersList) return;



onValue(ref(db,"online"),(snapshot)=>{


let onlineUsers = snapshot.val() || {};



membersList.innerHTML = `

<h3>👥 اعضای LA3</h3>

`;



for(let code in users){


let status = onlineUsers[code] ? "🟢 آنلاین" : "⚫ آفلاین";



membersList.innerHTML += `

<div class="member-item">

${status} - ${users[code]}

</div>

`;



}


});


}








// ورود کاربر به چتروم


chatEnter.onclick=function(){


let code = chatCode.value.trim();



if(users[code]){


currentUser = code;

currentName = users[code];



// ثبت آنلاین بودن

const userStatus = ref(db,"online/"+currentUser);



set(userStatus,{

name: currentName,

online:true,

time:new Date().toLocaleTimeString("fa-IR")

});



// اگر اینترنت قطع شد یا صفحه بسته شد

onDisconnect(userStatus).remove();



chatLogin.style.display="none";

chatRoom.style.display="block";



showMembers();

loadMessages();



}else{


chatMessage.style.color="red";

chatMessage.innerHTML="کد اشتباه است";


}


};
// ارسال پیام


sendBtn.onclick=function(){


let text = chatText.value.trim();


if(text==="") return;



push(ref(db,"chat"),{


name: currentName,

user: currentUser,

text: text,

time: new Date().toLocaleTimeString("fa-IR")


})

.catch(error=>{


console.log(error);

alert("خطا در ارسال پیام");


});


chatText.value="";


};







// ارسال با Enter


chatText.addEventListener("keydown",function(e){


if(e.key==="Enter"){


sendBtn.click();


}


});








// نمایش پیام ها


function loadMessages(){


if(chatListenerStarted) return;


chatListenerStarted=true;



onValue(ref(db,"chat"),(snapshot)=>{


messages.innerHTML="";



snapshot.forEach((item)=>{


let msg=item.val();


let type="";



if(msg.user===currentUser){


type="my-message";


}else{


type="other-message";


}



messages.innerHTML += `


<div class="chat-message ${type}">


<div class="username">

${msg.name}

</div>


<div class="text">

${msg.text}

</div>


<div class="time">

${msg.time}

</div>


</div>


`;



});



messages.scrollTop = messages.scrollHeight;


});


}









// پاک کردن تاریخچه فقط مدیر


clearChat.onclick=function(){


if(currentUser==="modir12131213"){


remove(ref(db,"chat"))

.then(()=>{


messages.innerHTML="";


})


.catch(error=>{


console.log(error);

alert("خطا در پاک کردن چت");


});


}else{


alert("فقط مدیر اجازه پاک کردن دارد");


}


};









// خروج از چتروم


exitChat.onclick=function(){



if(currentUser){


// آفلاین کردن کاربر هنگام خروج

remove(ref(db,"online/"+currentUser));


}



chatRoom.style.display="none";

site.style.display="block";



currentUser="";

currentName="";


};








// جلوگیری از راست کلیک


document.addEventListener("contextmenu",function(e){


e.preventDefault();


});
