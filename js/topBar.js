import {auth,db, logout} from "./app.js"
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import $ from "./jquery.module.js";
import { signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

let poppet;
let popupFadeSpeed_;

$(document).ready(function(){
	// searchbar - when user clicks it, redirect them to the search page
	// (instead of letting them type anything)
	$("form.searchbar").click(function(){
		window.location = "../html/search.html"
	})

	// if there isn't an existing popup, add it
	if(!$(".del-popup").length){
		$("head").append(`<link href='../css/popupBox.css' rel='stylesheet'>`);
		$("body").prepend(`<div js-include-html="../html/popupBox.html"></div>`);
		jsIncludeHTML();		

		function await_poppet(){			
			setTimeout(() => {
				poppet = $(".del-popup:first");
				poppet_signout();
				popupFadeSpeed_ = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Popup-Fade-Speed"));
			},100)
		}

		contentLoaded(await_poppet);
	}

	// if there *ALREADY IS* a popup, clone the first one
	else {
		poppet = $(".del-popup:first").clone();
		poppet_signout();
		$("body").prepend(poppet)
	}

	function poppet_signout(){
		poppet.removeAttr("popup-type");
		poppet.attr("popup-type","signout");
		$("h3",poppet).text("Are you sure you want to sign out?");
		$("#popup_action_1",poppet).text("Yes");
		$("#popup_action_2",poppet).text("No");
	}	
})//end jquery

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

let dropdownProfileLink = document.querySelectorAll(".account-link");
let signInLink = document.querySelectorAll(".sign-in-link");
let signOutLink = document.querySelectorAll(".sign-out-link");

// if user is not logged in,
// don't show PROFILE or SIGN OUT buttons
if(!currentUser){
	// let
	dropdownProfileLink.forEach(aaa => {
		aaa.style.display = "none";
	})
	// dropdownProfileLink.style.display = "none";

	signOutLink.forEach(aaa => {
		aaa.style.display = "none";
	})
	// signOutLink.style.display = "none";

	console.log("not logged in");
}

// if user *IS* logged in, make PROFILE link functional
else {
	let currentUserEmail = currentUser.email;
	

	$(document).ready(function(){
		signOutLink.forEach(aaa => {
			aaa.addEventListener("click", ()=>{
				// console.log("hah");		
				$("[popup-type='signout']").fadeIn(popupFadeSpeed_);

				$(document).on("click", "[popup-type='signout'] #popup_action_1", function(){
					signOut(auth);
					window.location.href="../html/main.html";
				});

				$(document).on("click", "[popup-type='signout'] #popup_action_2", function(){
					$("[popup-type='signout']").fadeOut(popupFadeSpeed_);
				});
			});//end click
		});//end foreach
	})//end ready


	dropdownProfileLink.forEach(aaa => {
		aaa.addEventListener("click", async ()=>{
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
	});//end foreach

	signInLink.forEach(aaa => {
		aaa.style.display = "none"
	});
}