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

$(document).ready(function(){
    /*------ HOME SLICK CAROUSEL ------*/
    $(".home-carousel").slick({
        slidesToShow: 1,
        dots:true
    });
});

// check when the reusable site parts have been loaded
// via jsIncludeHTML()
// when loaded, proceed with vanilla JS functions
let timeSt = Date.now();
let timeStop = 1000;

let filesReadyCheck = setInterval(() => {
	if(Date.now() - timeSt > timeStop){
		clearInterval(filesReadyCheck);
	} else {
		if(filesReady == "yes"){
            clearInterval(filesReadyCheck);
            vanillaJS_functions();
        }
	}
},0);

/* ---------- Hamburger Menu ----------*/

function vanillaJS_functions(){
    
    const topHamburger = document.querySelector(".top-hamburger i");
    const navMenu = document.querySelector(".top-navlinks");

    topHamburger.addEventListener("click", () => {
        topHamburger.classList.toggle("fa-bars");
        topHamburger.classList.toggle("fa-xmark");
        topHamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
    })

}//end vanillaJS_functions()
