const PASSWORD = "_mamad_13900_";

// عناصر
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

// شروع
site.style.display = "none";
membersPage.style.display = "none";

let attempts = 0;
let locked = false;

// نمایش و مخفی کردن رمز
toggle.onclick = function () {

    if (password.type === "password") {
        password.type = "text";
        toggle.innerHTML = "🙈";
    } else {
        password.type = "password";
        toggle.innerHTML = "👁";
    }

};

// ورود با Enter
password.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        login();
    }

});

// دکمه ورود
loginBtn.onclick = login;

// تابع ورود
function login() {

    if (locked) return;

    if (password.value === PASSWORD) {

        message.style.color = "#00ff66";
        message.innerHTML = "ACCESS GRANTED";

        setTimeout(function () {

            loginScreen.style.display = "none";
            site.style.display = "block";

        }, 1000);

    } else {

        attempts++;

        message.style.color = "red";
        message.innerHTML = "ACCESS DENIED";

        password.value = "";

        if (attempts >= 3) {
            lockLogin();
        }

    }

}

// قفل شدن
function lockLogin() {

    locked = true;

    loginBtn.disabled = true;
    password.disabled = true;

    let sec = 30;

    countdown.innerHTML = "Locked : " + sec + " s";

    const timer = setInterval(function () {

        sec--;

        countdown.innerHTML = "Locked : " + sec + " s";

        if (sec <= 0) {

            clearInterval(timer);

            attempts = 0;
            locked = false;

            loginBtn.disabled = false;
            password.disabled = false;

            countdown.innerHTML = "";
            message.innerHTML = "";

        }

    }, 1000);

}

// صفحه اعضای تیم
membersBtn.onclick = function () {

    site.style.display = "none";
    membersPage.style.display = "block";

};

// بازگشت
backBtn.onclick = function () {

    membersPage.style.display = "none";
    site.style.display = "block";

};

// جلوگیری از راست کلیک
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
