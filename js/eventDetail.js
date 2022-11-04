import {db, addUserEvent, addUserFavEvent, removeUserFavEvent} from "./app.js";
import * as dbf from "./app.js"; // used to get current user
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'

let temporary_image = "https://cdn.discordapp.com/attachments/382037367940448256/1037544194497052672/unsplash_fireworks_c5_eQi4rrjA.jpeg";

document.querySelector(".event-image").setAttribute("style",`background-image:url("${temporary_image}")`);

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
    eventOBJ.price = doc.data().price;
    eventOBJ.host = doc.data().hostId;

    allEvents.push(eventOBJ);
});

// show a random event just to see if the details are working/correct
let randomEvent = Math.floor(Math.random()*allEvents.length);
let chosenEvent = allEvents[randomEvent];

/********************************************************************** */
/**************************** EVENT ID ******************************** */
/********************************************************************** */
document.querySelector(".main-event-cont").setAttribute("event-id",chosenEvent.id);

/********************************************************************** */
/*************************** EVENT IMAGE ****************************** */
/********************************************************************** */
// (it's an array, but set the first item [0] as "the" cover image for now)
document.querySelector(".event-image").setAttribute("style",`background-image:url("${chosenEvent.images[0]}")`);

/********************************************************************** */
/*************************** EVENT NAME ******************************* */
/********************************************************************** */
document.querySelector(".event-name").textContent = chosenEvent.name;

/********************************************************************** */
/*************************** EVENT TAGS ******************************* */
/********************************************************************** */
document.querySelector(".event-tags").replaceChildren();

for(let i=0; i<chosenEvent.tags.length; i++){
    let addTag = document.createElement("a");
    addTag.setAttribute("href",chosenEvent.tags[i]); //  tag's url, may need to change later
    addTag.textContent = "#" + chosenEvent.tags[i];
    document.querySelector(".event-tags").append(addTag)
}

/********************************************************************** */
/*************************** EVENT DATE ******************************* */
/********************************************************************** */
let eventDateNum = chosenEvent.date.replace(/[^\d\.]*/g,"");

let eventYear = eventDateNum.slice(0,4);
let eventMonth = eventDateNum.substring(eventDateNum.length-12).slice(0,2);
let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);

// if first number of eventDay is a 0, remove that
let dayFirstChara = eventDay.slice(0,1);
if(dayFirstChara == "0"){
    eventDay = eventDay.slice(1,2);
}

// add eventDate suffix
// credit: stackoverflow.com/a/65805333/8144506
let suffixes = ["st", "nd", "rd"];
let numExceptions = [11, 12, 13];
let nth = suffixes[(eventDay % 10) - 1] == undefined || numExceptions.includes(eventDay % 100) ? "th" : suffixes[(eventDay % 10) - 1];

let daySuffix = nth;

// format eventMonth
eventMonth =
    eventMonth == "01" ? "Jan" :
    eventMonth == "02" ? "Feb" :
    eventMonth == "03" ? "Mar" :
    eventMonth == "04" ? "Apr" :
    eventMonth == "05" ? "May" :
    eventMonth == "06" ? "Jun" :
    eventMonth == "07" ? "Jul" :
    eventMonth == "08" ? "Aug" :
    eventMonth == "09" ? "Sept" :
    eventMonth == "10" ? "Oct" :
    eventMonth == "11" ? "Nov" :
    eventMonth == "12" ? "Dec" :
    eventMonth;

document.querySelector(".event-date").textContent = `${eventDay}${daySuffix} ${eventMonth} ${eventYear}`;

/********************************************************************** */
/*************************** EVENT TIME ******************************* */
/********************************************************************** */
let eventTimeStart_Hour = eventDateNum.substring(eventDateNum.length-8).slice(0,2);
let eventTimeStart_Minutes = eventDateNum.substring(eventDateNum.length-6).slice(0,2);

let eventTimeEnd_Hour = eventDateNum.substring(eventDateNum.length-4).slice(0,2);
let eventTimeEnd_Minutes = eventDateNum.substring(eventDateNum.length-2);

document.querySelector(".event-time").innerHTML = `${eventTimeStart_Hour}:${eventTimeStart_Minutes} &ndash; ${eventTimeEnd_Hour}:${eventTimeEnd_Minutes}`;

/********************************************************************** */
/*********************** EVENT PARTICIPANTS *************************** */
/********************************************************************** */
document.querySelector(".event-participants").textContent = `${chosenEvent.currentPPL} of ${chosenEvent.maxPPL}`;

/********************************************************************** */
/*************************** EVENT PRICE ****************************** */
/********************************************************************** */
if(chosenEvent.price == "0"){
    document.querySelector(".event-price").textContent = "Free";
} else {
    document.querySelector(".event-price").textContent = `$ ${chosenEvent.price}`;
}


/********************************************************************** */
/*************************** EVENT HOST ******************************* */
/********************************************************************** */
// keep track of host ID
document.querySelector(".host-profile-link").setAttribute("host-id",chosenEvent.host);

// convert host ID into host name
// (find host ID in the USERS, then find their username)
let getUsers = query(collection(db, "users"));
const userData = await getDocs(getUsers);
userData.forEach((yoozah) => {
    if(yoozah.id == chosenEvent.host){
        let yoozaName = yoozah.data().username;
        document.querySelector(".host-profile-link").textContent = yoozaName;
    }
});

/********************************************************************** */
/************************ EVENT DESCRIPTION *************************** */
/********************************************************************** */
document.querySelector(".event-desc-area").innerHTML = chosenEvent.desc;

/********************************************************************** */
/************************* EVENT LOCATION ***************************** */
/********************************************************************** */
document.querySelector(".location-address").innerHTML = "";

for(let i=0; i<chosenEvent.location.length; i++){
    // 1st item of LOCATION: longitude
    if(i == 0){
        document.querySelector(".location-address").setAttribute("longitude",chosenEvent.location[i])
    }
    
    // 2nd item of LOCATION: latitude
    else {
         document.querySelector(".location-address").setAttribute("latitude",chosenEvent.location[i])
    }
}

function reverseGeo(l){
    tt.services.reverseGeocode({
    key: tomtomApiKey,
    position: l
})
.then(result=>{
    document.querySelector(".location-address").textContent = result.addresses[0].address.freeformAddress
});
}

reverseGeo(chosenEvent.location)

/********************************************************************** */
/************************** CURRENT USER ****************************** */
/********************************************************************** */
let currentUser = dbf.auth.currentUser;

// get email from user authentication
let currentUserEmail = currentUser.email;

// if user IS logged in
if(currentUser){

    let qw = query(collection(dbf.db, "users"), where("email", "==", currentUserEmail));
    let qsz = await getDocs(qw);

    /*-------------- JOIN EVENT --------------*/
    let bothJoinButtons = document.querySelectorAll(".join-event");

    qsz.forEach((thisUser) => {
        let existingEvents = thisUser.data().events;

        let checkExisting = existingEvents.findIndex(uwu => {
            return uwu === chosenEvent.id
        })

        // join new event
        if(checkExisting == -1){

            document.querySelectorAll(".join-event").forEach(joinEventButton => {
                joinEventButton.addEventListener("click", () => {
                    addUserEvent(thisUser.id,chosenEvent.id);

                    bothJoinButtons.forEach(v => {
                        v.classList.add("joined");
                        v.innerHTML = `Event Joined <i class="fa-solid fa-check"></i>`;
                    });
                })//end click
            });//end each
        }
        
        // if user tries to join an event that they've already joined
        else if(checkExisting > -1){
            bothJoinButtons.forEach(v => {
                v.classList.add("joined");
                v.innerHTML = `Already Joined <i class="fa-regular fa-face-smile-beam"></i>`;
            });
        }
    });
    
    /*-------------- FAV EVENT --------------*/
    let bookmarkIcon = document.querySelector(".event-bookmark");
    let bookmarkStatus = bookmarkIcon.getAttribute("bookmark-status");

    qsz.forEach((thisUser) => {
        let existingFavs = thisUser.data().favouriteEvents;

        let checkExisting = existingFavs.findIndex(uwu => {
            return uwu === chosenEvent.id
        })

        /*---- on page load ----*/
        // if event IS already in favorites
        if(checkExisting > -1){
            bookmarkStatus = "active";
            bookmarkIcon.setAttribute("bookmark-status","active");
        }
        
        // if event is NOT in favorites
        else if(checkExisting == -1){
            bookmarkStatus = "inactive";
            bookmarkIcon.setAttribute("bookmark-status","inactive");
        }

        /*---- on bookmark click ----*/
        bookmarkIcon.addEventListener("click", () => {
            // favorite it
            if(bookmarkStatus == "active"){
                removeUserFavEvent(thisUser.id,chosenEvent.id);
                bookmarkStatus = "inactive";
                bookmarkIcon.setAttribute("bookmark-status","inactive");
            }

            // unfavorite it
            else if(bookmarkStatus == "inactive"){
                addUserFavEvent(thisUser.id,chosenEvent.id);
                bookmarkStatus = "active";
                bookmarkIcon.setAttribute("bookmark-status","active");
            }
        });
    });
}//end if(currentUser)

