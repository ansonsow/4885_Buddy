import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


let currentUserId;
console.log(currentUserId);


document.getElementById("logIn").onclick=async (e)=>{
    e.preventDefault;
    let userMessage;
    // console.log(await dbf.login(email.value,password.value));

    // if(userMessage=dbf.login(email.value,password.value)){
    //     noteToUser.innerHTML = "SUCC"
    //     // writeUserData(userName, fname, lname, email, eventId, pfpURL)
    //     let q = query(collection(db, "users"), where("email", "==", email.value));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         currentUserId = doc.id;
    //     });
            
    //     }else{
    //         userMessage.then(value=>{
    //         noteToUser.innerHTML = value.substring(' ' + 10);
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // }

    // dbf.login(email.value,password.value)
    // .then(user =>{
    //     logInSuccess();
    // })
    // .catch(error =>{
    //     console.log("login fail");
    // })

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // console.log(userCredential.user);
    //   noteToUser.innerHTML = "SUCC"
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.message);
      return error.message
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

