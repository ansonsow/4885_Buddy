import * as ldb from "./app.js"

import {Firestore, query, getFirestore, collection, doc, updateDoc, getDocs,getDoc, addDoc, deleteDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();

// example of reading info from db
const q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.data());
});

// single document
// const querySnapshot2 = await getDoc(doc(db, "events","uGfj5SGWqdBIdFsM7Lie"));
// console.log(querySnapshot2.data());

// single field
// const querySnapshot2 = await getDoc(doc(db, "events","uGfj5SGWqdBIdFsM7Lie"));
// console.log(querySnapshot2.data().price);

// example of call the db function outside of appjs
// ldb.writeUserData("a","fa","la","amail","[1,2]","aaa.aa");

$(document).ready(function(){
    /*------ HOME SLICK CAROUSEL ------*/
    $(".home-carousel").slick({
        slidesToShow: 1,
        dots:true
    });
});


/* ---------- Hamburger Menu ----------*/
const changeIcon = function(icon){
    icon.classList.toggle("fa-xmark")
}

const topHamburger = document.querySelector(".top-hamburger");
const navMenu = document.querySelector(".top-navlinks");

topHamburger.addEventListener("click", ()=>{
   topHamburger.classList.toggle("active")
   navMenu.classList.toggle("active")
})
