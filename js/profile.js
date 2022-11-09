import * as dbf from "./app.js";
import $ from "./jquery.module.js";
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

// loader fade-out speed
let loaderFadeSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Profile-Page-Fade-In-Speed"));

// get current user
let currentUser = dbf.auth.currentUser;
let currentUserEmail;

// let targetUser = localStorage.getItem(targetUserId)

// console.log("localStorage "+targetUser);
// console.log("haha");

if (currentUser) {
    // const currentUser = dbf.auth.currentUser.email;
    // TODO change to targetUser in the future
    // const user = "ryaniscool@gmail.com"

    currentUserEmail = currentUser.email;
    
    let q = query(collection(dbf.db, "users"), where("email", "==", currentUser.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentUserId = doc.id;
        console.log("currentUser "+doc.id);
    });
    targetUserId = localStorage.getItem(targetUserId)
    console.log("targetUser "+targetUserId);
    const userDb = await getDoc(doc(dbf.db, "users",targetUserId));

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
        let e = query(collection(dbf.db, "events"), where("hostId", "==", targetUserId));
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

    let badges = [];
    //  badge color
    let b = query(collection(dbf.db, "badges"));
    const badgeQuerySnapshot = await getDocs(b);
    badgeQuerySnapshot.forEach((doc) => {
        badges.push(doc)
    });
    let events = []
    let e = query(collection(dbf.db,"events"));
    const eventQuerySnapshot = await getDocs(e);
    eventQuerySnapshot.forEach((doc)=>{
        events.push(doc)
    })

    let firstHostFlag = false;
    for(let i=0;i<events.length;i++){
        // console.log(events[i].data().hostId);
        if(events[i].data().hostId==currentUserId){
            firstHostFlag = true;
        }
    }

    if(firstHostFlag == true){
        for(let i=0;i<badges.length;i++){
            if(badges[i].data().name=="firstHosting"){
                if(!badges[i].data().userId.includes(currentUserId)){
                    dbf.addBadgeUser(badges[i].id, currentUserId);
                    // popUp()
                    popUp("https://github.com/ansonsow/4885_Buddy/blob/main/images/badges_01.png?raw=true", "first hosting")

                }
            }
        }
    }

    function giveBadge(){
        badgeQuerySnapshot.forEach((doc) => {
            if(!doc.data().userId.includes(targetUserId)){
                let badgeName = doc.data().name.toString()
                document.getElementById(badgeName).style.filter = "grayscale(100%)";
            }else{

            }
        })
    }

    giveBadge();



    // for(let i=0;i<badges.length;i++){
    //     if(badges[i].data().name="firstHosting"){
            
    //     }
    // }

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



function popUp(img, text){
    $(document).ready(function(){
        // let someButton = $(".oddly_specific_class"); // change this to whatever you're binding your popup trigger to
    

            // remove existing <h3> text
            $(".del-popup h3").empty();
            $(".popup-msg").append("<img />");
            $(".popup-msg").append("<br>");
            $(".popup-msg").append("<br>");

            // <span class="popup-event-name">${trashEventName}</span>

            $(" #popup_action_2").each(function(){
                $(this).appendTo($(this).parents(".popup-msg"));
            })
        
            // customize your <h3> text
            $(".del-popup h3").html(`You have obtain the <span class="popup-event-name">${text}</span> badge!!`);
            // $(".popup-msg img").src(img)
            $(".popup-msg img").attr("src",img)

            // var image = $("<img />", { 
                
            //     src: img,
            //     alt: "badgeimg"
            // });
            // image.appendTo($(".del-popup"));

            // customize your button 1 text
            $("#popup_action_1").attr("hidden",true)
    
            // customize your button 2 text
            $("#popup_action_2").text("close");
    
            // fade in the pop-up
            $(".del-popup").fadeIn(popupFadeSpeed);

        
        /********************************************************************** */
        /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
        /********************************************************************** */
    
        $(document).on("click", "#popup_action_1", function(){
            let that = this; // don't touch this line
    
            // do stuff
        });
    
        /********************************************************************** */
        /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
        /********************************************************************** */
        $(document).on("click", "#popup_action_2", function(){
            let that = this; // don't touch this line
            giveBadge();
            location.reload();
            // fade out the pop-up
            $(".del-popup").fadeOut(popupFadeSpeed);
        });
    })//end ready
}