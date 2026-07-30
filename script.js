import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyBbdl66zVNsYTxDdOCPKB9f8IUNCCSopek",
  authDomain: "la3na-25f90.firebaseapp.com",
  databaseURL: "https://la3na-25f90-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "la3na-25f90",
  storageBucket: "la3na-25f90.firebasestorage.app",
  messagingSenderId: "118931572344",
  appId: "1:118931572344:web:f1748267c6cb21ea558f8d"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// رمز مشاهده عکس‌ها

const viewPassword = "LA3_naaaammm";


// ورود کاربران

window.checkPassword = function(){

    let pass = document.getElementById("viewPassword").value;

    if(pass === viewPassword){

        document.getElementById("loginBox").style.display="none";
        document.getElementById("galleryBox").style.display="block";

        loadImages();

    }else{

        document.getElementById("error").innerHTML="رمز اشتباه است";

    }

}



// گرفتن عکس‌ها از Firebase

function loadImages(){

 const gallery = document.getElementById("gallery");

 const imagesRef = ref(db,"gallery");


 onValue(imagesRef,(snapshot)=>{

    gallery.innerHTML="";


    snapshot.forEach((child)=>{

        let data = child.val();


        let img = document.createElement("img");

        img.src = data.url;

        gallery.appendChild(img);


    });


 });


}
img.onclick = function(){
    window.open(data.url, "_blank");
};
