import {auth,db} from "./app.js"
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import $ from "./jquery.module.js";
import { signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";




/************ TOP BAR DROPDOWN ************/
let topBarProfileIcon = document.querySelector("header .account-icon");
let topBarDropdown = document.querySelector("header .acc-dropdown-wrap");

let dropdownFadeSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Dropdown-Fade-Speed"));

topBarProfileIcon.addEventListener("click",()=>{
	// fade in the dropdown
	if(!topBarProfileIcon.classList.contains("dropdown-click")){
		topBarProfileIcon.classList.add("dropdown-click");
		topBarDropdown.classList.remove("toggle-acc-menu");
		topBarDropdown.style.opacity = "0";

		// for some reason this needs a setTimeout of 0s for the first click-in to work
		setTimeout(() => {
			topBarDropdown.style.opacity = "1";
		},0)
	}
	
	// fade out the dropdown
	else {
		topBarProfileIcon.classList.remove("dropdown-click");
		topBarDropdown.style.opacity = "0";

		setTimeout(() => {
			topBarDropdown.classList.add("toggle-acc-menu");
		},dropdownFadeSpeed)
	}	
});

/******** TOP BAR "ACCOUNT" BUTTON GOES TO USER'S PROFILE PAGE ********/
let currentUser = auth.currentUser;

let dropdownProfileLink = document.querySelector(".account-link");
let signOutLink = document.querySelector(".sign-out-link");

// if user is not logged in,
// don't show PROFILE or SIGN OUT buttons
if(!currentUser){
	dropdownProfileLink.style.display = "none";
	signOutLink.style.display = "none";
	console.log("not login");
}

// if user *IS* logged in, make PROFILE link functional
else {
	let currentUserEmail = currentUser.email;


	signOutLink.addEventListener("click", ()=>{
		// console.log("hah");
	})

	dropdownProfileLink.addEventListener("click", async ()=>{
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
		console.log(localStorage.getItem(targetUserId));
		console.log(targetUserId);
		// console.log(document.URL);

		if(document.URL.includes("profile.html")){
			window.location.reload();
		} else { 
			window.location = "../html/profile.html#"+targetUserId;
		}

	})//end click












	$(document).ready(function(){
		 // change this to whatever you're binding your popup trigger to
	
		$(".sign-out-link").click(function(){
			console.log("haha");
			// remove existing <h3> text
			$(".del-popup h3").empty();
	
			// customize your <h3> text
			$(".del-popup h3").text("Are you sure you want to Log out");
	
			// customize your button 1 text
			$("#popup_action_1").text("Log out");
	
			// customize your button 2 text
			$("#popup_action_2").text("Cancel");
	
			// fade in the pop-up
			$(".del-popup").fadeIn(popupFadeSpeed);
		})
		
		/********************************************************************** */
		/******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
		/********************************************************************** */
	
		$(document).on("click", "#popup_action_1", function(){
			let that = this; // don't touch this line
			signOut(auth);
			window.location.href="../html/main.html";

			// do stuff
		});
	
		/********************************************************************** */
		/******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
		/********************************************************************** */
		$(document).on("click", "#popup_action_2", function(){
			let that = this; // don't touch this line
	
			// fade out the pop-up
			$(".del-popup").fadeOut(popupFadeSpeed);
		});
	})//end ready
}