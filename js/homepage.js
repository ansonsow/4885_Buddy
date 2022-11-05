$(document).ready(function(){
    /*------ SLICK CAROUSEL (homepage only) ------*/
    $(".home-carousel").slick({
        slidesToShow: 1,
        dots:true
    });
});

document.getElementById("findButton").addEventListener("click",()=>{
    window.location="../html/search.html"
})