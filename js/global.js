var currentUserId = localStorage.getItem("currentUserId");
var targetEventId;
var targetUserId;
const tomtomApiKey = "xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc"
var guideFlag;
localStorage.setItem('guideFlag', false)

/*------ LEFT PANEL ------*/
// if it exists, set the initial state
// either open or closed
let leftPanelExists = document.querySelector("[js-include-html*='leftPanel.html'][status]");
let panel_status;

if(typeof(leftPanelExists) != "undefined" && leftPanelExists != null){
  panel_status = leftPanelExists.getAttribute("status");
}

/*------ INCLUDE HTML ------*/
/* credit: www.w3schools.com/howto/tryit.asp?filename=tryhow_html_include_2 */

let filesReady;

function jsIncludeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("js-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("js-include-html");
          elmnt.replaceWith(...elmnt.childNodes); // unwrap
          jsIncludeHTML();
          filesReady = "yes";
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

jsIncludeHTML();

// check when the reusable site parts have been loaded
// via jsIncludeHTML()
// when loaded, proceed with any further functions
// *CAN* be called in another js files!
let timeSt = Date.now();
let timeStop = 2500;

function contentLoaded(actionFunc){
  let filesReadyCheck = setInterval(() => {
    if(Date.now() - timeSt > timeStop){
      clearInterval(filesReadyCheck);
    } else {
      if(filesReady == "yes"){
        clearInterval(filesReadyCheck);
        actionFunc();
      }
    }
  },0);
}

/*------ WAIT FOR JQUERY TO LOAD ------*/
function loadjQuery(){
  let jqDateNow = Date.now();
  let jqStop = 2500;
  
  let load_jQuery = setInterval(() => {
    if(Date.now() - jqDateNow > jqStop){
      clearInterval(load_jQuery);
    } else {
      if(typeof jQuery !== "undefined"){
          clearInterval(load_jQuery);
          jQueryActions();
      }		
    }
  },0);
}//end loadjQuery

contentLoaded(loadjQuery)

// ---------------------------------------------------
/* ------------------ Hamburger Menu ----------------*/
// ---------------------------------------------------
contentLoaded(hamburgerToggle);

function hamburgerToggle(){
	let quoi = Date.now();
	let quoiStop = 2000;

    let waitForTopBar = setInterval(() => {
		if(Date.now() - quoi > quoiStop){
			clearInterval(waitForTopBar)
		} else {
			const topHamburger = document.querySelector(".top-hamburger i");
			const navCont = document.querySelector(".top-nav-container");
			const navMenu = document.querySelector(".top-navlinks.mobile-links");

			if(typeof(topHamburger) != "undefined" && topHamburger != null){
				clearInterval(waitForTopBar);

				topHamburger.addEventListener("click", () => {
					if(!navCont.classList.contains("active")){
						navCont.classList.add("active");
					} else {            
						setTimeout(() => {
							navCont.classList.remove("active");
						},300)
					}

					topHamburger.classList.toggle("fa-bars");
					topHamburger.classList.toggle("fa-xmark");
					topHamburger.classList.toggle("active")
					navMenu.classList.toggle("active")
				})
			}
		}
	},0);
}//end hamburgerToggle()

// get pop-up fade speed from variables.css
let popupFadeSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Popup-Fade-Speed"));


// ---------------------------------------------------
// --------------- Category Dropdown -----------------
// ---------------------------------------------------

let categoryLabel = document.querySelector(".category-label");

if(typeof(categoryLabel) != "undefined" && categoryLabel != null){
  document.querySelector(".category-label").addEventListener("click", () => {
    document.querySelector(".category-list").classList.toggle("show");
  });
}