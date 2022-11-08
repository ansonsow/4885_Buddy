import * as dbf from "./app.js"
import {sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// console.log(email);

document.getElementById("reset").onclick=async (e)=>{
    e.preventDefault
    let email = document.getElementById("email").value

    console.log(email);
    sendPasswordResetEmail(dbf.auth, email)
    .then(() => {
        document.getElementById("noteToUser").innerHTML = "password reset email sent"
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("noteToUser").innerHTML = error.message.substring(' ' + 10);
    });
}

//Created a function to route the current page to forgot password page
document.getElementById("changepass").addEventListener('onclick', (e)=>{
    e.preventDefault();
    console.log("button is clicked!");
    setTimeout(()=>{
        window.location.href="./forgotpassword.html";
    },1000)

});
