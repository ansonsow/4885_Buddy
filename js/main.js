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
