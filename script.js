// =====================================
// Firebase Config
// =====================================

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


// Firebase
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


// =====================================
// Elements
// =====================================

const loginScreen = document.getElementById("login-screen");
const site = document.getElementById("site");

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


// =====================================
// User
// =====================================

let currentUser = "";
let currentName = "";


// =====================================
// Login
// =====================================


loginBtn.onclick = () => {

 const pass = passwordInput.value.trim();


 if(pass === "_mamad_13900_"){

  currentUser =
  "user_" + Date.now();


  currentName =
  "Member";


  loginScreen.style.display="none";
  site.style.display="block";


  setOnline();

  loadMessages();

 }
 else{

  alert("رمز اشتباه است");

 }

};



// =====================================
// Online System
// =====================================


function setOnline(){

 const userRef =
 ref(db,"online/"+currentUser);


 set(userRef,{
  name:currentName,
  online:true,
  time:serverTimestamp()
 });


 onDisconnect(userRef)
 .set({

  name:currentName,
  online:false,
  time:serverTimestamp()

 });

}
// =====================================
// Send Message
// =====================================


sendBtn.onclick = () => {

 const text =
 messageInput.value.trim();


 if(text === "") return;


 const messageRef =
 push(ref(db,"messages"));


 set(messageRef,{

  user: currentName,

  text:text,

  time:serverTimestamp()

 });


 messageInput.value="";

};



// ارسال با Enter

messageInput.addEventListener(
"keydown",
(e)=>{

 if(e.key==="Enter"){

  sendBtn.click();

 }

});




// =====================================
// Load Messages
// =====================================


function loadMessages(){

 const messagesRef =
 ref(db,"messages");


 onValue(messagesRef,(snapshot)=>{


  chatBox.innerHTML="";


  snapshot.forEach((child)=>{


   const msg =
   child.val();


   const div =
   document.createElement("div");


   div.className="message";


   div.innerHTML =
   `
   <b>${msg.user}</b>
   :
   ${msg.text}
   `;


   chatBox.appendChild(div);


  });


  chatBox.scrollTop =
  chatBox.scrollHeight;


 });


}





// =====================================
// Online Members
// =====================================


function loadOnlineMembers(){


 const onlineRef =
 ref(db,"online");


 onValue(onlineRef,(snapshot)=>{


  if(!membersPage) return;


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
    🟢 ${member.name}
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



loadOnlineMembers();
// =====================================
// Keep Online Status Alive
// =====================================


window.addEventListener(
"beforeunload",
()=>{


 if(currentUser){


  set(
   ref(db,"online/"+currentUser),
   {

    name:currentName,

    online:false,

    time:serverTimestamp()

   }
  );


 }


});




// =====================================
// Update User Name
// =====================================


function updateName(name){


 if(!name) return;


 currentName=name;


 if(currentUser){


  set(
   ref(db,"online/"+currentUser),
   {

    name:currentName,

    online:true,

    time:serverTimestamp()

   }
  );


 }


}




// =====================================
// Delete Messages (Admin)
// =====================================


const clearBtn =
document.getElementById("clearBtn");


if(clearBtn){


 clearBtn.onclick = ()=>{


  if(
   confirm(
   "همه پیام‌ها پاک شود؟"
   )
  ){


   set(
    ref(db,"messages"),
    null
   );


  }


 };


}




// =====================================
// Logout
// =====================================


const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){


 logoutBtn.onclick=()=>{


  if(currentUser){


   set(
    ref(db,"online/"+currentUser),
    {

     name:currentName,

     online:false,

     time:serverTimestamp()

    }
   );


  }



  currentUser="";
  currentName="";


  site.style.display="none";

  loginScreen.style.display="block";


 };


}
