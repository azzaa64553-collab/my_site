// ===============================
// LA3 Cyber Security
// Final Fixed Script
// Chat Fixed Version
// Part 1
// ===============================


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {
getDatabase,
ref,
push,
onValue,
remove
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// ===============================
// Firebase
// ===============================


const firebaseConfig = {

apiKey: "AIzaSyBM5OgIQKSG7_zQJ_L7taB0CQGjYWRSVA",

authDomain: "la3chat.firebaseapp.com",

databaseURL:"https://la3chat-default-rtdb.firebaseio.com",

projectId:"la3chat",

storageBucket:"la3chat.firebasestorage.app",

messagingSenderId:"831502350386",

appId:"1:831502350386:web:944a347e3b7656ea60242b"

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


const site = document.getElementById("site");

const membersBtn = document.getElementById("membersBtn");

const membersPage = document.getElementById("membersPage");

const backBtn = document.getElementById("backBtn");


const chatBtn = document.getElementById("chatBtn");

const chatLogin = document.getElementById("chatLogin");

const chatCode = document.getElementById("chatCode");

const chatEnter = document.getElementById("chatEnter");

const chatMessage = document.getElementById("chatMessage");


const chatRoom = document.getElementById("chatRoom");

const currentUser = document.getElementById("currentUser");

const messages = document.getElementById("messages");

const chatText = document.getElementById("chatText");

const sendBtn = document.getElementById("sendBtn");

const clearChat = document.getElementById("clearChat");

const exitChat = document.getElementById("exitChat");


// ===============================
// Variables
// ===============================


const PASSWORD = "_mamad_13900_";


const users = {

"ali5678":"سید علی اصغر",

"ms9675":"سید علی موسوی",

"z4321":"طاها زالی",

"sa9988":"سعدی",

"modir12131213":"محمد"

};


let username = localStorage.getItem("LA3user") || "";

let isAdmin = false;
// ===============================
// Initial State
// ===============================


if(site)
site.style.display="none";


if(membersPage)
membersPage.style.display="none";


if(chatLogin)
chatLogin.style.display="none";


if(chatRoom)
chatRoom.style.display="none";




// ===============================
// Password Toggle
// ===============================


if(toggle){

toggle.onclick=()=>{


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
// Main Login
// ===============================


if(loginBtn){


loginBtn.onclick=()=>{


if(password.value===PASSWORD){


message.innerText="ورود موفق ✅";


setTimeout(()=>{


if(loginScreen)
loginScreen.style.display="none";


if(site)
site.style.display="block";


},500);



}

else{


message.innerText="رمز اشتباه است ❌";


password.value="";


}



};


}





// ===============================
// Open Chat
// ===============================


if(chatBtn){


chatBtn.onclick=()=>{


site.style.display="none";


chatLogin.style.display="flex";


};


}





// ===============================
// Enter Chat
// ===============================


if(chatEnter){


chatEnter.onclick=()=>{


let code = chatCode.value.trim();



if(users[code]){


username = users[code];


isAdmin = (code==="modir12131213");



localStorage.setItem(
"LA3user",
username
);



chatLogin.style.display="none";


chatRoom.style.display="block";



if(currentUser){

currentUser.innerText =
"کاربر وارد شده: " + username;

}



if(clearChat){

if(isAdmin){

clearChat.style.display="inline-block";

}

else{

clearChat.style.display="none";

}

}



loadMessages();



}

else{


if(chatMessage)

chatMessage.innerText =
"کد اشتباه است ❌";


}



}
}
// ===============================
// Send Message Fixed
// ===============================


if(sendBtn){

sendBtn.onclick = ()=>{

alert("دکمه ارسال اجرا شد");

let text = chatText.value.trim();



if(text === "")
return;



if(username === ""){

alert("ابتدا وارد چت شوید ❌");

return;

}



push(ref(db,"messages"),{

    name: username,

    text: text,

    time: Date.now()

})

.then(()=>{

    alert("پیام داخل Firebase ذخیره شد");

    chatText.value="";

})

.catch((error)=>{

    alert("خطا: " + error.message);

    console.error(error);

});


});


};


}





// ===============================
// Load Messages
// ===============================


function loadMessages(){


if(!messages)
return;



onValue(
ref(db,"messages"),
(snapshot)=>{


messages.innerHTML="";



snapshot.forEach((item)=>{


let data=item.val();



if(!data)
return;



let div=document.createElement("div");



div.className="chat-message";



if(data.name===username){

div.classList.add("my-message");

}

else{

div.classList.add("other-message");

}



div.innerHTML=`

<div class="username">
${data.name || "کاربر"}
</div>

<div class="text">
${data.text || ""}
</div>

<div class="time">
${new Date(data.time).toLocaleString("fa-IR")}
</div>

`;



messages.appendChild(div);



});



messages.scrollTop =
messages.scrollHeight;



}

);


}





// ===============================
// Clear Chat Admin
// ===============================


if(clearChat){


clearChat.onclick=()=>{


if(isAdmin){


remove(
ref(db,"messages")
);


}

else{


alert("فقط مدیر اجازه دارد ❌");


}



};


}





// ===============================
// Exit Chat
// ===============================


if(exitChat){


exitChat.onclick=()=>{


chatRoom.style.display="none";


site.style.display="block";


username="";


isAdmin=false;


localStorage.removeItem("LA3user");


};


}
