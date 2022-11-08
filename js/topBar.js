import {auth,db} from "./app.js"
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'


let currentUser = auth.currentUser;
let currentUserEmail = currentUser.email;




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

    localStorage.setItem(targetUserId, currentUserId);
    targetUserId = localStorage.getItem(targetUserId);
    console.log(currentUserId);
    console.log(targetUserId);
    // console.log(document.URL);
    if(document.URL.includes("profile.html")){
      window.location.reload();
    }else{
      window.location = "../html/profile.html#"+targetUserId;
    }
})