// ===============================
// Firebase Config
// ===============================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getDatabase,
ref,
set,
onValue,
push,
onDisconnect,
serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


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

const membersPage =
document.getElementById("membersPage");

const chatBox =
document.getElementById("chatBox");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");


let currentUser = "";

let currentName = "";
// ===============================
// Login System
// ===============================

loginBtn.addEventListener("click", () => {

    const pass = password.value.trim();


    if(pass === ""){

        alert("رمز را وارد کنید");
        return;

    }


    // ساخت نام کاربر از رمز
    currentUser = pass;

    currentName = pass;


    localStorage.setItem(
        "username",
        currentName
    );


    loginScreen.style.display = "none";

    site.style.display = "block";


    // فعال کردن آنلاین بودن
    setOnline();

});



// ===============================
// Online Status
// ===============================

function setOnline(){

    const userRef = ref(
        db,
        "online/" + currentName
    );


    set(userRef,{

        name: currentName,

        online: true,

        time: new Date().toLocaleTimeString("fa-IR")

    });


    // وقتی کاربر خارج شد
    onDisconnect(userRef).set({

        name: currentName,

        online:false,

        time: new Date().toLocaleTimeString("fa-IR")

    });

}
// ===============================
// Chat System
// ===============================


// ارسال پیام

sendBtn.addEventListener("click", () => {

    const text = messageInput.value.trim();


    if(text === "") return;


    const messagesRef = ref(db,"messages");


    const newMessage = push(messagesRef);


    set(newMessage,{

        name: currentName,

        text: text,

        time: new Date().toLocaleTimeString("fa-IR")

    });


    messageInput.value = "";

});




// دریافت پیام‌ها

const messagesRef = ref(db,"messages");


onValue(messagesRef,(snapshot)=>{


    chatBox.innerHTML = "";


    snapshot.forEach((item)=>{


        const msg = item.val();


        const div = document.createElement("div");


        div.innerHTML = `

        <b>${msg.name}</b>

        :

        ${msg.text}

        <small>

        ${msg.time}

        </small>

        `;


        chatBox.appendChild(div);


    });


    // رفتن به آخر چت

    chatBox.scrollTop = chatBox.scrollHeight;


});
// ===============================
// Online Members List
// ===============================


const onlineList =
document.getElementById("onlineList");


if(onlineList){


    const onlineRef =
    ref(db,"online");


    onValue(onlineRef,(snapshot)=>{


        onlineList.innerHTML = "";


        snapshot.forEach((user)=>{


            const data = user.val();


            if(data.online === true){


                const div =
                document.createElement("div");


                div.innerHTML = `

                🟢 ${data.name}

                `;


                onlineList.appendChild(div);


            }


        });


    });


}




// ===============================
// Logout
// ===============================


const exitBtn =
document.getElementById("exitBtn");


if(exitBtn){


    exitBtn.addEventListener("click",()=>{


        if(currentName){


            set(
                ref(db,"online/"+currentName),
                {

                name:currentName,

                online:false,

                time:new Date().toLocaleTimeString("fa-IR")

                }
            );


        }


        localStorage.removeItem("username");


        site.style.display="none";


        loginScreen.style.display="flex";


        password.value="";


    });


}
