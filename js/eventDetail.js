// let temporary_image = "//source.unsplash.com/random/?party";
let temporary_image = "https://cdn.discordapp.com/attachments/382037367940448256/1037544194497052672/unsplash_fireworks_c5_eQi4rrjA.jpeg";

document.querySelector(".event-image").setAttribute("style",`background-image:url("${temporary_image}")`);


/* basic bookmark click */
let bookmarkIcon = document.querySelector(".event-bookmark");
let bookmarkStatus = bookmarkIcon.getAttribute("bookmark-status");

bookmarkIcon.addEventListener("click", () => {
    if(bookmarkStatus == "inactive"){
        bookmarkIcon.setAttribute("bookmark-status","active");
        bookmarkStatus = "active";
    } else {
        bookmarkIcon.setAttribute("bookmark-status","inactive");
        bookmarkStatus = "inactive";
    }
})