import {auth,db} from "./app.js"
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'


let currentUser = auth.currentUser;
let currentUserEmail = currentUser.email;
console.log("haha");
console.log(currentUserEmail);

// let currentUserId;
// let allUser = [];
// let q = query(collection(db, "users"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   allUser.push(doc)
// });
// for(let i=0;i<allUser.length;i++){
//   if(allUser[i].data().email == currentUser.email){
//     currentUserId = allUser[i].id;
//   }
// }
// console.log(currentUserId);
// localStorage.setItem(targetUserId, currentUserId);
// console.log(localStorage.getItem(targetUserId));

document.querySelector(".fa-regular.fa-circle-user").addEventListener("click", async ()=>{
    let currentUserId;
    let allUser = [];
    let q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allUser.push(doc)
    });
    for(let i=0;i<allUser.length;i++){
      if(allUser[i].data().email == currentUser.email){
        currentUserId = allUser[i].id;
      }
    }
    console.log(currentUserId);
    localStorage.setItem(targetUserId, currentUserId);
    window.location = "../html/profile.html";

})