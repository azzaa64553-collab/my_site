import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


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


// عناصر ورود اصلی
const loginScreen = document.getElementById("login-screen");
const site = document.getElementById("site");

const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("toggle");

const message = document.getElementById("message");
const countdown = document.getElementById("countdown");


// اعضا
const membersPage = document.getElementById("membersPage");
const membersBtn = document.getElementById("membersBtn");
const backBtn = document.getElementById("backBtn");


// چتروم
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



site.style.display="none";
membersPage.style.display="none";
chatLogin.style.display="none";
chatRoom.style.display="none";



let attempts = 0;
let locked = false;

let currentUser = "";
let currentName = "";



// کاربران چتروم

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







// ورود چتروم


chatBtn.onclick=function(){

site.style.display="none";
chatLogin.style.display="flex";

};





chatEnter.onclick=function(){


let code=chatCode.value;


if(users[code]){


currentUser=code;
currentName=users[code];


chatLogin.style.display="none";
chatRoom.style.display="block";


loadMessages();


}else{


chatMessage.style.color="red";
chatMessage.innerHTML="کد اشتباه است";


}


};







// ارسال پیام به Firebase


sendBtn.onclick=function(){


let text=chatText.value.trim();


if(text==="") return;



let data={

name:currentName,

text:text,

time:new Date().toLocaleTimeString("fa-IR")

};



// ذخیره در دیتابیس

push(ref(db,"chat"),data);



chatText.value="";


};







// نمایش پیام ها از Firebase


function loadMessages(){


onValue(ref(db,"chat"),(snapshot)=>{


messages.innerHTML="";



snapshot.forEach((item)=>{


let msg=item.val();



messages.innerHTML += `

<div class="chat-message">


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



});


}







// پاک کردن تاریخچه فقط مدیر


clearChat.onclick=function(){


if(currentUser==="modir12131213"){


remove(ref(db,"chat"));


}else{


alert("فقط مدیر اجازه پاک کردن دارد");


}


};







// خروج از چتروم


exitChat.onclick=function(){


chatRoom.style.display="none";

site.style.display="block";


};






// جلوگیری از راست کلیک

document.addEventListener("contextmenu",function(e){

e.preventDefault();

});
