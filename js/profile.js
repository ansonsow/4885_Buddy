import * as dbf from "./app.js";
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

// loader fade-out speed
let loaderFadeSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Profile-Page-Fade-In-Speed"));

// get current user
let currentUser = dbf.auth.currentUser;
let currentUserEmail;

if (currentUser) {
    // const currentUser = dbf.auth.currentUser.email;
    // TODO change to targetUser in the future
    const user = "ryaniscool@gmail.com"

    currentUserEmail = currentUser.email;
    
    let q = query(collection(dbf.db, "users"), where("email", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentUserId = doc.id;
        console.log(doc.id);
    });

    const userDb = await getDoc(doc(dbf.db, "users",currentUserId));

    document.getElementById("profile-picture").src= userDb.data().pfpURL;
    document.getElementById("username").innerHTML = userDb.data().username;

    // when profile image loads, show the profile
    showProfile();


    // stars dont know yet
    async function getAvgStar(){
        let boo = false
        let avgStar=0;
        let eventNumber=0;
        let reviews = [];
        let eventStar = 0;
        // find all the events the currentUser hosted
        let e = query(collection(dbf.db, "events"), where("hostId", "==", currentUserId));
        const starSnapshot = await getDocs(e);
        starSnapshot.forEach((doc)=>{
            // find all the reviews of events
            if(doc.data().reviews.length>0){
                eventNumber = eventNumber+1;

                reviews=doc.data().reviews;
                reviews.forEach((review)=>{
                    let r = getReview(review)
                    .then(r=>{
                        // get all the points from all the reviews
                        eventStar = eventStar+r.data().point;
                        console.log(eventStar);
                        boo = true;
                    })
                    .catch(error=>{
                        eventStar = eventStar
                        console.log(error);
                    });
                    
                })
            }

        })

        let timeSt_ = Date.now();
        let timeStop_ = 1000;

        //   getting the average stars
        let avgInt = setInterval(() => {
            if(Date.now() - timeSt_ > timeStop_){
                clearInterval(avgInt);
            } else {
                if(boo == true){
                    clearInterval(avgInt);
                    avgStar = eventStar / eventNumber;
                    star.innerHTML = avgStar;
                    numbersToStars();
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

} else {
    alert("you are not logged in")
    setTimeout(()=>{
        window.location.href="./login.html";
    },1000)
}

// document.querySelector(".right-inner").style.height = "0px";

// when profile image loads, show the profile
function showProfile(){
    let pfpimg = new Image();
    pfpimg.src = document.getElementById("profile-picture").getAttribute("src");
    pfpimg.onload = function(){
        let backupSpeed = 420;
        if(backupSpeed >= loaderFadeSpeed){
            loaderFadeSpeed = loaderFadeSpeed
        } else {
            loaderFadeSpeed = backupSpeed
        }

        document.querySelector(".loader").classList.add("remove-loader");

        setTimeout(() => {
            document.querySelector(".loader").style.visibility = "collapse";
            document.querySelector(".loader").remove();

            document.querySelector(".right-inner").classList.add("flex-it");
            document.querySelector("footer").style.visibility = "visible";

            setTimeout(() => {
                document.querySelector(".right-inner").classList.add("reveal");                
                document.querySelector("footer").classList.add("reveal");
            },100)
        },loaderFadeSpeed)
    }    
}

// when a user's star rating has loaded, convert number to how many stars
function numbersToStars(){
    let starCont = document.querySelector(".star-rating");

    let howManyStars = Number(starCont.textContent.trim());
    let maxStars = 5;
    let emptyStars = Math.floor(maxStars - howManyStars);

    starCont.replaceChildren();

    for(let i=0; i<howManyStars; i++){
        let createFillStar = document.createElement("i");
        createFillStar.setAttribute("class", "fa-solid fa-star fill");
        starCont.prepend(createFillStar);
    }

    for(let i=0; i<emptyStars; i++){
        let createEmptyStar = document.createElement("i");
        createEmptyStar.setAttribute("class", "fa-solid fa-star empty");
        starCont.append(createEmptyStar);
    }
}

