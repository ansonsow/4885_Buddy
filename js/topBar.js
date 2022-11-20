import {auth,db, logout} from "./app.js"
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import $ from "./jquery.module.js";
import { signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";




/************ TOP BAR DROPDOWN ************/
let topBarProfileIcon = document.querySelector("header .account-icon");
let topBarDropdown = document.querySelector("header .acc-dropdown-wrap");
let logOutPopup;

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
		logOutPopup();
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
		 let createLogoutPopup = function(){
            let puppet = $(".del-popup:first").clone();
            puppet.attr("popup-type","logout");
            $(".del-popup h3, .del-popup button", puppet).empty();
            $("body").prepend(puppet);
    
            // customize your <h3> text
            $("h3",puppet).text("Are you sure you want to log out");
    
            // customize your button 1 text
            $("#popup_action_1",puppet).text("Yes");
            $("#popup_action_2",puppet).text("No");

        }
		createLogoutPopup()


		logOutPopup = function(){
            // fade in the pop-up
            $("[popup-type='logout']").fadeIn(popupFadeSpeed);
    
            $(document).on("click", "[popup-type='logout'] #popup_action_1", function(){
                // fade out the pop-up
				signOut(auth);
                // $("[popup-type='logout']").fadeOut(popupFadeSpeed);
				window.location.href="../html/main.html";
                // fade out overlays
                fadeIn();
                $(".cloned-events-container .event-container").css("visibility","visible");
                $(".all-events").removeClass("fade-out")
            });
            $(document).on("click", "[popup-type='logout'] #popup_action_2", function(){
                $("[popup-type='logout']").fadeOut(popupFadeSpeed);
				
			})
        }
	})//end ready
}