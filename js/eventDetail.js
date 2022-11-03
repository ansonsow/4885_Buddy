import {db} from "./app.js";
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'

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

/*----------- INSERT ACTUAL EVENT DETAILS -----------*/
let allEvents = [];

let q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    let eventOBJ = {};
    
    eventOBJ.id = doc.id;
    eventOBJ.name = doc.data().name;
    eventOBJ.images = doc.data().images;
    eventOBJ.tags = doc.data().tags;
    eventOBJ.date = doc.data().dateOfEvent;
    eventOBJ.desc = doc.data().description;
    eventOBJ.currentPPL = doc.data().numOfPeople;
    eventOBJ.maxPPL = doc.data().maxCapacity;
    eventOBJ.location = doc.data().location;

    allEvents.push(eventOBJ);
});

// show a random event just to see if the details are working/correct
let randomEvent = Math.floor(Math.random()*allEvents.length);
let chosenEvent = allEvents[randomEvent];

// set event image
// (it's an array, but set the first item [0] as "the" cover image for now)
document.querySelector(".event-image").setAttribute("style",`background-image:url("${chosenEvent.images[0]}")`);

// set event name
document.querySelector(".event-name").textContent = chosenEvent.name;

// set event tags
document.querySelector(".event-tags").replaceChildren();

for(let i=0; i<chosenEvent.tags.length; i++){
    let addTag = document.createElement("a");
    addTag.setAttribute("href",chosenEvent.tags[i]); //  tag's url, may need to change later
    addTag.textContent = "#" + chosenEvent.tags[i];
    document.querySelector(".event-tags").append(addTag)
}

// set event date