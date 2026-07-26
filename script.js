// ===============================
// Firebase
// ===============================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
set,
onValue,
push,
onDisconnect
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// تنظیمات Firebase خودت را اینجا نگه دار
const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_AUTH_DOMAIN",

databaseURL: "YOUR_DATABASE_URL",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_STORAGE_BUCKET",

messagingSenderId: "YOUR_MESSAGING_ID",

appId: "YOUR_APP_ID"

};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



// ===============================
// Elements
// ===============================

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


const sendBtn =
document.getElementById("sendBtn");


const membersList =
document.getElementById("membersList");


const exitChat =
document.getElementById("exitChat");


let currentName = "";
// ===============================
// Login
// ===============================

loginBtn.addEventListener("click",()=>{


    const name = password.value.trim();


    if(name === ""){

        alert("رمز را وارد کنید");

        return;

    }


    currentName = name;


    localStorage.setItem(
        "username",
        currentName
    );


    loginScreen.style.display = "none";

    site.style.display = "block";


    setOnline();


});




// ===============================
// Online Status
// ===============================

function setOnline(){


    const userRef =
    ref(db,"online/"+currentName);



    set(userRef,{

        name: currentName,

        online:true,

        time:Date.now()

    });



    onDisconnect(userRef).set({

        name: currentName,

        online:false,

        time:Date.now()

    });


}
// ===============================
// Chat System
// ===============================


// ارسال پیام

sendBtn.addEventListener("click",()=>{


    const text =
    chatText.value.trim();


    if(text === "") return;



    const messageRef =
    push(ref(db,"messages"));



    set(messageRef,{

        name: currentName,

        text: text,

        time: new Date()
        .toLocaleTimeString("fa-IR")

    });



    chatText.value = "";


});





// ===============================
// دریافت پیام‌ها
// ===============================


onValue(ref(db,"messages"),(snapshot)=>{


    if(!messages) return;


    messages.innerHTML = "";



    snapshot.forEach((item)=>{


        const data =
        item.val();



        const div =
        document.createElement("div");



        div.innerHTML = `

        <b>${data.name}</b>

        : 

        ${data.text}

        <small>

        ${data.time}

        </small>

        `;



        messages.appendChild(div);



    });



    messages.scrollTop =
    messages.scrollHeight;


});
// ===============================
// Online Members
// ===============================


onValue(ref(db,"online"),(snapshot)=>{


    if(!membersList) return;


    membersList.innerHTML = "";



    snapshot.forEach((user)=>{


        const data =
        user.val();



        if(data.online === true){


            const div =
            document.createElement("div");



            div.innerHTML = `

            🟢 ${data.name}

            `;



            membersList.appendChild(div);


        }



    });



});





// ===============================
// Logout
// ===============================


if(exitChat){


exitChat.addEventListener("click",()=>{


    if(currentName){


        set(
        ref(db,"online/"+currentName),
        {

            name: currentName,

            online:false,

            time:Date.now()

        });


    }



    localStorage.removeItem("username");



    site.style.display="none";



    loginScreen.style.display="flex";



    password.value="";



});

}
