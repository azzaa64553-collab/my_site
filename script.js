const PASSWORD = "_mamad_13900_";

const loginScreen = document.getElementById("login-screen");
const site = document.getElementById("site");
const membersPage = document.getElementById("membersPage");

const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("toggle");

const membersBtn = document.getElementById("membersBtn");
const backBtn = document.getElementById("backBtn");

const message = document.getElementById("message");
const countdown = document.getElementById("countdown");

let attempts = 0;
let locked = false;

site.style.display = "none";
membersPage.style.display = "none";


// نمایش رمز
toggle.onclick = function(){

    if(password.type === "password"){
        password.type = "text";
        toggle.innerHTML = "🙈";
    }else{
        password.type = "password";
        toggle.innerHTML = "👁";
    }

};


// ورود با Enter
password.addEventListener("keydown",function(e){

    if(e.key === "Enter"){
        login();
    }

});


// دکمه ورود
loginBtn.onclick = login;



function login(){

    if(locked) return;


    if(password.value === PASSWORD){

        message.style.color="#00ff66";
        message.innerHTML="در حال ورود...";


        loginBtn.disabled=true;


        setTimeout(function(){

            loginScreen.style.display="none";
            site.style.display="block";

        },1200);



    }else{

        attempts++;

        message.style.color="red";
        message.innerHTML="رمز اشتباه است";

        password.value="";


        if(attempts>=3){
            lockLogin();
        }

    }

}




function lockLogin(){

    locked=true;

    loginBtn.disabled=true;
    password.disabled=true;


    let sec=30;


    countdown.innerHTML="تلاش دوباره: "+sec;


    let timer=setInterval(function(){

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




// رفتن به صفحه اعضا

membersBtn.onclick=function(){

    membersBtn.innerHTML="در حال ورود...";

    membersBtn.disabled=true;


    setTimeout(function(){

        site.style.display="none";

        membersPage.style.display="block";

        membersBtn.innerHTML="اعضا تیم";

        membersBtn.disabled=false;


    },1200);

};



// برگشت

backBtn.onclick=function(){

    membersPage.style.display="none";

    site.style.display="block";

};



// جلوگیری از راست کلیک

document.addEventListener("contextmenu",function(e){

    e.preventDefault();

});
