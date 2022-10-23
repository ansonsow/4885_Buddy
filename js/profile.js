import * as dbf from "./app.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'



// get current user
let currentUser = dbf.auth.currentUser;
let currentUserEmail;

if (currentUser) {
  currentUserEmail = currentUser.email;
} else {
  alert("you are not logged in")
  setTimeout(()=>{
    window.location.href="sample.html";

  },2000)
}
// const currentUser = dbf.auth.currentUser.email;
const user = "ryaniscool@gmail.com"


let q = query(collection(dbf.db, "users"), where("email", "==", user));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    currentUserId = doc.id;
});

const userDb = await getDoc(doc(dbf.db, "users",currentUserId));


document.getElementById("profile-picture").src= userDb.data().pfpURL;
document.getElementById("username").innerHTML = userDb.data().username;


// stars dont know yet
async function getAvgStar(){
    let boo = false
    let avgStar=0;
    let eventNumber=0;
    let reviews = [];
    let eventStar = 0;
    let e = query(collection(dbf.db, "events"), where("hostId", "==", currentUserId));
    const starSnapshot = await getDocs(e);
    starSnapshot.forEach((doc)=>{
        eventNumber= eventNumber+1;
        reviews=doc.data().reviews;
        reviews.forEach((review)=>{
            let r = getReview(review)
            .then(r=>{
                eventStar = eventStar+r.data().point;
                boo = true;
            })
            .catch(error=>{
                console.log(error);
            });
            
        })
    })

    let timeSt_ = Date.now();
    let timeStop_ = 1000;

    let avgInt = setInterval(() => {
        if(Date.now() - timeSt_ > timeStop_){
            clearInterval(avgInt);
        } else {
            if(boo == true){
                clearInterval(avgInt);
                avgStar = eventStar / eventNumber;
                star.innerHTML = avgStar
            }
        }
    },0);
    
}
getAvgStar()



async function getReview(id){
    const r = await getDoc(doc(dbf.db, "reviews",id));
    return r;
}

//  badge color
let b = query(collection(dbf.db, "badges"));
const badgeQuerySnapshot = await getDocs(b);
badgeQuerySnapshot.forEach((doc) => {
    if(!doc.data().userId.includes(currentUserId)){
        // console.log(doc.data().name);
        let badgeName = doc.data().name.toString()
        document.getElementById(badgeName).style.filter = "grayscale(100%)";
    }else{
        // console.log("dont have "+doc.data().name);

    }
});