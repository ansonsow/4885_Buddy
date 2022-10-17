import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";



// console.log(currentUserId);


// querySnapshot.forEach((doc) => {
//     currentUserId = doc.id;
// });
// var currentUserId;

document.getElementById("logIn").onclick=async (e)=>{
    e.preventDefault;
    // let userMessage;
    
    signInWithEmailAndPassword(dbf.auth, email.value, password.value)
    .then((userCredential) => {
        // console.log(userCredential.user);
        noteToUser.innerHTML = "SUCCESS"
        const user = userCredential.user;
        let q = query(collection(db, "users"), where("email", "==", email.value));
        const querySnapshot = getDocs(q);
        // console.log(querySnapshot);
        querySnapshot.then(value=>{
            value.forEach(element => {
                // console.log(element.id);
                localStorage.setItem("currentUserId",element.id)
                // currentUserId = element.id
                // console.log("aaa");
            });
        })
        // console.log(localStorage.getItem("currentUserId"));
    })
    .catch((error) => {
        console.log(error.message.substring(' ' + 10));
        noteToUser.innerHTML = error.message.substring(' ' + 10);
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    
};

