import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


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


// رمز مدیر

const adminPassword = "modir12131213";


// ورود مدیر

window.adminLogin = function(){

let pass = document.getElementById("adminPassword").value;


if(pass === adminPassword){

document.getElementById("adminLogin").style.display="none";
document.getElementById("uploadBox").style.display="block";


}else{

document.getElementById("adminError").innerHTML="رمز اشتباه است";

}

}



// کلید ImgBB

const imgbbKey = "18c7479323fbf5429d49cf4b8b538e02";


window.uploadImage = async function(){


let file = document.getElementById("imageFile").files[0];


if(!file){

document.getElementById("status").innerHTML="عکس انتخاب نشده";

return;

}



let form = new FormData();

form.append("image", file);



document.getElementById("status").innerHTML="در حال آپلود...";



let response = await fetch(
`https://api.imgbb.com/1/upload?key=${imgbbKey}`,
{
method:"POST",
body:form
}
);



let data = await response.json();


let url = data.data.url;



let imageRef = push(ref(db,"gallery"));


await set(imageRef,{

url:url

});



document.getElementById("status").innerHTML="آپلود شد ✅";


  }
