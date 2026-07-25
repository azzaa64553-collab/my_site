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

// نمایش / مخفی کردن رمز
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

    if(e.key==="Enter"){

        login();

    }

});

loginBtn.onclick = login;

function login(){

    if(locked) return;

    if(password.value===PASSWORD){

        message.style.color="#00ff66";
        message.innerHTML="ACCESS GRANTED";

        setTimeout(function(){

            loginScreen.style.display="none";
            site.style.display="block";
            membersPage.style.display="none";

            startMatrix();

        },1000);

    }else{

        attempts++;

        message.style.color="red";
        message.innerHTML="ACCESS DENIED";

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

    countdown.innerHTML="Locked : "+sec+" s";

    const timer=setInterval(function(){

        sec--;

        countdown.innerHTML="Locked : "+sec+" s";

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
// صفحه اعضای تیم

membersBtn.onclick = function(){

    site.style.display = "none";
    membersPage.style.display = "block";

};

backBtn.onclick = function(){

    membersPage.style.display = "none";
    site.style.display = "block";

};

// جلوگیری از راست کلیک

document.addEventListener("contextmenu",function(e){

    e.preventDefault();

});

// ===== Matrix =====

function startMatrix(){

const canvas=document.getElementById("c");

if(!canvas) return;

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

}

resize();

window.onresize=resize;

const letters="アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const size=16;

const columns=Math.floor(canvas.width/size);

const drops=[];

for(let i=0;i<columns;i++){

drops[i]=1;

}

function draw(){

ctx.fillStyle="rgba(0,0,0,.08)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ff66";
ctx.font=size+"px monospace";

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)];

ctx.fillText(text,i*size,drops[i]*size);

if(drops[i]*size>canvas.height && Math.random()>0.98){

drops[i]=0;

}

drops[i]++;

}

requestAnimationFrame(draw);

}

draw();

            }
}
// فعال سازی صفحه اعضا

document.getElementById("membersBtn").onclick = function(){

    document.getElementById("site").style.display = "none";
    document.getElementById("membersPage").style.display = "block";

};


document.getElementById("backBtn").onclick = function(){

    document.getElementById("membersPage").style.display = "none";
    document.getElementById("site").style.display = "block";

};
