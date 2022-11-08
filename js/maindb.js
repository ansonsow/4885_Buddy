import {query, collection,getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import {auth, db} from "./app.js"


let currentUser = auth.currentUser;


let slideshowIMGArray = [];
let eventArray = [];
// if(currentUserId==""){
//     let q = query(collection(db, "events"));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         slideshowIMGArray.push(doc.data().image);
//     }
//     );
// }else{
//     console.log("blahblahblah");
// }

let q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // slideshowIMGArray.push(doc.data().images[0]);
    eventArray.push(doc);
});
let selectedDoc = []
let randomNumber = []

if(currentUser){
    // do something about the user's previous history and blah blah blah
}else{
    // random select 4
}

while(randomNumber.length<4){
    let j = Math.floor(Math.random() * eventArray.length);
    if(!randomNumber.includes(j)){
        randomNumber.push(j)
    }
}

for(let i=0;i<randomNumber.length;i++){
    // console.log(i);
    selectedDoc.push(eventArray[randomNumber[i]])
    slideshowIMGArray.push(selectedDoc[i].data().images[0])
}
console.log(selectedDoc);

/* ---------- Add Images from DB to Carousel ----------*/
// add image from each event array into homepage carousel
// https://console.firebase.google.com/u/2/project/buddy-a478e/firestore/data/~2Fevents

document.querySelectorAll(".home-carousel img, .slick-cloned img").forEach(function(sliderIMGEach,i){
    // if(i<4){
    //     console.log(selectedDoc[i].data().name);
    //     sliderIMGEach.setAttribute("src",selectedDoc[i].data().images[0]);
    //     sliderIMGEach.addEventListener("click",()=>{
    //         localStorage.setItem(targetEventId,selectedDoc[i].id)
    //     })
    // }
    if(i < 5&&i>=1){
        // sliderIMGEach.setAttribute("src",slideshowIMGArray[imgOrder-1]);
        console.log(selectedDoc[i-1].data().name);
        sliderIMGEach.setAttribute("src",selectedDoc[i-1].data().images[0]);
        sliderIMGEach.addEventListener("click",()=>{
            localStorage.setItem(targetEventId,selectedDoc[i-1].id)
            window.location = "../html/eventDetail.html#" + localStorage.getItem(targetEventId);
        })

    }

});

// get FINAL slider image
document.querySelector(".slick-track > .slick-cloned[data-slick-index='-1'] img").setAttribute("src",slideshowIMGArray[slideshowIMGArray.length-1]);

// add ALL slider images
document.querySelectorAll(".slick-slide ~ .slick-cloned img").forEach(function(sliderIMGEach, i){
    sliderIMGEach.setAttribute("src",slideshowIMGArray[i]);
});