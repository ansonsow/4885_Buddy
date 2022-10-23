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


