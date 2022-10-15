import {Firestore, query, getFirestore, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();

// let q = query(collection(db, "events"), where("hostId", "==", "testHostId (str, 20)"), where("name","==","testEventname1 (str, 20)"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id);
// });

let slideshowIMGArray = [];

let q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.data().image);
    slideshowIMGArray.push(doc.data().image);
});

/* ---------- Add Images from DB to Carousel ----------*/
// add image from each event array into homepage carousel
// https://console.firebase.google.com/u/2/project/buddy-a478e/firestore/data/~2Fevents

document.querySelectorAll(".home-carousel img, .slick-cloned img").forEach(function(sliderIMGEach, imgOrder){
    sliderIMGEach.setAttribute("src",slideshowIMGArray[imgOrder-1]);
});

// get FINAL slider image
document.querySelector(".slick-track > .slick-cloned[data-slick-index='-1'] img").setAttribute("src",slideshowIMGArray[slideshowIMGArray.length-1]);

// add ALL slider images
document.querySelectorAll(".slick-slide ~ .slick-cloned img").forEach(function(sliderIMGEach, imgOrder){
    sliderIMGEach.setAttribute("src",slideshowIMGArray[imgOrder]);
});