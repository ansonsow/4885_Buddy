import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


document.getElementById("logIn").onclick=async (e)=>{
    e.preventDefault;
    
    signInWithEmailAndPassword(dbf.auth, email.value, password.value)
    .then((userCredential) => {
        noteToUser.innerHTML = "SUCCESS"
        const user = userCredential.user;
        let q = query(collection(db, "users"), where("email", "==", email.value));
        const querySnapshot = getDocs(q);
        querySnapshot.then(value=>{
            value.forEach(element => {
                localStorage.setItem("currentUserId",element.id)
            });
        })
        alert("successfully logged in")
        setTimeout(()=>{
            window.location.href="./main.html";
        },1000)
    })
    .catch((error) => {
        console.log(error.message.substring(' ' + 10));
        noteToUser.innerHTML = error.message.substring(' ' + 10);
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    
};

