import {db,auth} from "./app.js"
// import * as mapf from "./tomtom.js"
import $ from "./jquery.module.js";
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import '../node_modules/regenerator-runtime/runtime.js'


let currentUser = auth.currentUser;
let currentUserEmail = currentUser.email

if(currentUser){
    currentUserEmail = currentUser.email;
    
    let q = query(collection(db, "users"), where("email", "==", currentUser.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentUserId = doc.id;
        console.log("currentUser "+doc.id);
    });

    let allSearch = [];

    // let e = query(collection(db, "events"), where("hostId", "==", currentUserId));
    // const starSnapshot = await getDocs(e);
    // starSnapshot.forEach((doc)=>{
    //     displayResult(doc.data(),doc.id);
    //     allSearch.push(doc)
    
    // })
    // let u = query(collection(db, "users", currentUserId))
    const querySnapshot2 = await getDoc(doc(db, "users", currentUserId));
    let eventId = querySnapshot2.data().events;
    console.log(eventId);
    for(let i=0;i<eventId.length;i++){
        const querySnapshotEvents = await getDoc(doc(db,"events",eventId[i]));
        displayResult(querySnapshotEvents.data(),querySnapshotEvents.id);
        allSearch.push(querySnapshotEvents);
    }



// ================= functions to format time and date from eventDetail ==============================
function formatDate(d){
    let eventDateNum = d.replace(/[^\d\.]*/g,"");
    let eventYear = eventDateNum.slice(0,4);
    let eventMonth = eventDateNum.substring(eventDateNum.length-12).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);

    // if first number of eventDay is a 0, remove that
    let dayFirstChara = eventDay.slice(0,1);
    if(dayFirstChara == "0"){
        eventDay = eventDay.slice(1,2);
    }

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

    return(`${eventDay}${daySuffix} ${eventMonth} ${eventYear}`);
    
    // document.querySelector(".event-date").textContent = `${eventDay}${daySuffix} ${eventMonth} ${eventYear}`;
}




function formatTime(d){
    let eventDateNum = d.replace(/[^\d\.]*/g,"");

    let eventTimeStart_Hour = eventDateNum.substring(eventDateNum.length-8).slice(0,2);
    let eventTimeStart_Minutes = eventDateNum.substring(eventDateNum.length-6).slice(0,2);

    let eventTimeEnd_Hour = eventDateNum.substring(eventDateNum.length-4).slice(0,2);
    let eventTimeEnd_Minutes = eventDateNum.substring(eventDateNum.length-2);

    return(`${eventTimeStart_Hour}:${eventTimeStart_Minutes} &ndash; ${eventTimeEnd_Hour}:${eventTimeEnd_Minutes}`);
}


function getDate(d){
    let eventDateNum = d.replace(/[^\d\.]*/g,"");
    // console.log(eventDateNum);
    let eventYear = eventDateNum.slice(0,4);
    // 8 6
    let eventMonth = eventDateNum.substring(eventDateNum.length - 12).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);
    // console.log(eventYear);
    // console.log(eventMonth);
    // console.log(eventDay);
    return (`${eventYear}${eventMonth}${eventDay}`);
}

function getDateShort(d){
    let eventDateNum = d.replace(/[^\d\.]*/g,"");
    // console.log(eventDateNum);
    let eventYear = eventDateNum.slice(0,4);
    // 8 6
    let eventMonth = eventDateNum.substring(eventDateNum.length - 8).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-6).slice(0,2);
    // console.log(eventYear);
    // console.log(eventMonth);
    // console.log(eventDay);
    return (`${eventYear}${eventMonth}${eventDay}`);
}

function formatDateSearch(searchDate, docDate , n){
    console.log(n);
    if(getDateShort(searchDate)<getDate(docDate)){
        return true;
    }else{
        return false;
    }
}


// =========================== function to clear out the last result and display new results (takes the data and id as para)=========================
function displayResult(doc,id){

    let eventBlock = document.querySelector(".event-container");
    let clonedEvent = eventBlock.cloneNode(true);

    clonedEvent.removeAttribute("hidden");
    
    clonedEvent.querySelector(".card-content.image.search-page").addEventListener("click",()=>{
        localStorage.setItem(targetEventId, id);
        // console.log(id);
        console.log(localStorage.getItem(targetEventId));
        window.location = "../html/eventDetail.html#" + localStorage.getItem(targetEventId);
    })


    eventBlock.after(clonedEvent)

    let jqDateNow = Date.now();
    let jqStop = 1000;
    
    let load_jQuery = setInterval(() => {
        if(Date.now() - jqDateNow > jqStop){
            clearInterval(load_jQuery);
        } else {
            if(typeof jQuery !== "undefined"){
                clearInterval(load_jQuery);

                document.querySelector(".web-cloned-events-container").append(clonedEvent);
                document.querySelector(".web-cloned-events-container").removeAttribute("hidden");

                $(document).ready(function(){
                    $(".web-cloned-events-container").each(function(){
                        let haachoo = $(this).children(".event-container").clone();
                        haachoo.appendTo($(".mobile-cloned-events-container"));
                        $(".mobile-cloned-events-container").removeAttr("hidden")
                    })
                })
            }		
        }
    },0);

    clonedEvent.querySelector(".card-content.image.search-page").src = doc.images[0];
    clonedEvent.querySelector(".card-content.event-name").innerHTML = doc.name;

    // function reverseGeo(l){
    //     tt.services.reverseGeocode({
    //     key: tomtomApiKey,
    //     position: l
    // })
    // .then(result=>{
    //     clonedEvent.querySelector(".card-content.location").innerHTML = result.addresses[0].address.freeformAddress
    //     // console.log(result.addresses[0].address.freeformAddress);
    // });
    // }
    // setTimeout(() => {
    //     reverseGeo(doc.location)
    // }, 500);

    // card-content location
    clonedEvent.querySelector(".card-content.date").innerHTML =  formatDate(doc.dateOfEvent);
    clonedEvent.querySelector(".card-content.time").innerHTML =  formatTime(doc.dateOfEvent);



}


// movable-type.co.uk/scripts/latlong.html
// ========================== function to calculate distance between two coordinate =========================
function calculateDistance(locationA, locationB){
    let lon1 = locationA[0]
    let lat1 = locationA[1]
    let lon2 = locationB[0]
    let lat2 = locationB[1]
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}




let searchResult = [];
let userCoord = [];

// ======================== searchButton on click ========================================================
document.getElementById("searchButton").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });
    searchResult=[];

    let dateSearch = document.getElementById("dateTime").value;
    // console.log(dateSearch);




    let textSearch = document.getElementById("textSearch").value;
    let tagSearch = [];
    let tags = document.getElementsByName("categoryList");
    for (let i=0; i < tags.length; i++) {
        if (tags[i].checked) {
            tagSearch.push(tags[i].value)
        }
    }



    for(let i=0;i<allSearch.length;i++){
        console.log(getDate(allSearch[i].data().dateOfEvent));
        if(textSearch == "" && tagSearch.length == 0 && userCoord.length == 0 && dateSearch == ""){
            alert("please fill up at lease one field");
            for(let i=0;i<allSearch.length;i++){
                displayResult(allSearch[i].data(), allSearch[i].data)
            }

            break;
        }else{
            // text search
            if(textSearch != ""){
                if(searchResult.length!=0){
                    for(let j=0;j<searchResult.length;j++){
                        if(!searchResult[j].data().name.toUpperCase().includes(textSearch.toUpperCase())){
                            console.log("slicing " + searchResult[j].data().name +" because doesn't contain name");
                            searchResult.splice(j,1)
                        }
                    }
                }
                if(allSearch[i].data().name.toUpperCase().includes(textSearch.toUpperCase())){
                    if(!searchResult.includes(allSearch[i])){
                        // console.log(allSearch[i].name);
                        console.log("pushing " +allSearch[i].data().name +" because contain name");

                        searchResult.push(allSearch[i])
                    }
                }
            }



            // location search
            if(userCoord.length!=0){
                if(searchResult.lenth!=0){                    

                        for(let j=0;j<searchResult.length;j++){
                            if(calculateDistance(userCoord,allSearch[i].data().location)>radius){
                                
                                searchResult.splice(j,1)
                            }
                        }
                        
                    }
                        
                        if(calculateDistance(userCoord,allSearch[i].data().location)<radius){
                            if(!searchResult.includes(allSearch[i])){

                                searchResult.push(allSearch[i])
                            }
                        }
                    
            }
            // function formatDateSearch(searchDate, docDate){

            // date search
            // if(dateSearch!=""){
            //     if(searchResult.length!=0){                    
            //         for(let j=0;j<searchResult.length;j++){
            //             if(!formatDateSearch(dateSearch, allSearch[i].data().dateOfEvent , allSearch[i].data().name)){
            //                 console.log("slice "+searchResult[j].name);
            //                 searchResult.splice(j,1)
            //             }
            //         }
            //     }
                        
            //     if(formatDateSearch(dateSearch, allSearch[i].data().dateOfEvent, allSearch[i].data().name)){
            //         if(!searchResult.includes(allSearch[i])){
            //             console.log("push "+allSearch[i].data().name);
            //             searchResult.push(allSearch[i])
            //         }
            //     }
                    
            // }
            if(dateSearch!=""){
                if(searchResult.length!=0){
                    console.log("something in the search");
                    for(let j =0;j<searchResult.length;j++){
                        if(!formatDateSearch(dateSearch, searchResult[j].data().dateOfEvent , searchResult[j].data().name)){

                            console.log("slicing " + searchResult[j].data().name +" because the date of event is bigger");
                            searchResult.splice(j,1)
                        }
                    }
                }
                if(formatDateSearch(dateSearch, allSearch[i].data().dateOfEvent , allSearch[i].data().name)){
                    if(!searchResult.includes(allSearch[i])){
                        console.log("pushing "+ allSearch[i].data().name + " beacause the event date is bigger");
                        searchResult.push(allSearch[i])
                    }

                }
            }

            // tag search
            if(tagSearch.length != 0){
                if(searchResult.length!=0){
                    // if(!searchResult.includes(allSearch[i])){
                    //     searchResult.push(allSearch[i])
                    // }
                    for(let j=0;j<searchResult.length;j++){
                        if(!searchResult[j].data().tags.includes(tagSearch.toString())){
                            console.log("slice "+searchResult[j].name);
                            searchResult.splice(j,1)
                        }
                    }

                }

                    if(allSearch[i].data().tags.includes(tagSearch.toString())){
                        if(!searchResult.includes(allSearch[i])){
                            console.log("push "+allSearch[i].data().name);
                            searchResult.push(allSearch[i])
                        }
                    }
                
            }



            console.log(searchResult);
            

            

        }
        
        // TODO: date/time search
    }

    for(let i=0;i<searchResult.length;i++){
        displayResult(searchResult[i].data(),searchResult[i].id)
    }
})




    /********************************************************************** */
    /******* Tomtom Searchbox plugin  ************************************* */
    /********************************************************************** */
// var options = {
//     searchOptions: {
//         key: tomtomApiKey,
//         language: 'en-GB',
//         limit: 5
//     },
//     autocompleteOptions: {
//         key: tomtomApiKey,
//         language: 'en-GB'
//     }
// };


// // searchbox is the one in popup
// async function searchBox(){
//     var ttSearchBox = await new tt.plugins.SearchBox(tt.services, options);
//     var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
//     searchBoxPlugin.appendChild(searchBoxHTML)
//     document.getElementsByClassName("popup-msg")[0].prepend(searchBoxHTML)

//     ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
//         moveMap(data.data.result.position.lng,data.data.result.position.lat)
//         userCoord = [data.data.result.position.lng,data.data.result.position.lat]
//     });
// }

// searchbox2 is the one in the search.js
// async function searchBox2(){
//     var ttSearchBox = await new tt.plugins.SearchBox(tt.services, options);
//     var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
//     searchBoxPlugin.appendChild(searchBoxHTML)
//     // document.getElementsByClassName("popup-msg")[0].prepend(searchBoxHTML)

//     ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
//         moveMap(data.data.result.position.lng,data.data.result.position.lat)
//         userCoord = [data.data.result.position.lng,data.data.result.position.lat]
//     });
// }
// searchBox2()


console.log(document.getElementsByClassName("popup-msg"));

// searchBox()



/********************************************************************** */
/******* Tomtom Map  ************************************************** */
/********************************************************************** */
// let location = [ -123.1207,49.2827];
// let mapo;
// let zoom = 10;

// function map(){
//     mapo = tt.map({
//         key: tomtomApiKey,
//         container: "map",
//         zoom: zoom,
//         center: location
//     });
// }

// function moveMap(lng,lat){
//     location = [lng,lat]
//     mapo.flyTo({
//         center: location,
//         zoom: zoom
//     })
// }


// reset button
document.getElementById("resetButton").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });
    for(let i=0;i<allSearch.length;i++){
        displayResult(allSearch[i].data(),allSearch[i].id)
    }
})







$(document).ready(function(){
    let someButton = $("#locationButton"); // change this to whatever you're binding your popup trigger to

    // add map
    $(".popup-msg").append("<div id='map'></div>");
    // map();

    $(".popup-msg").append("<div id='customRadiusSection'><label for='radiusInput'>Search radius:</label><input id='radiusInput' name='radiusInput' type='number'></div>");


    // push buttons under the map
    $("#popup_action_1, #popup_action_2").each(function(){
        $(this).appendTo($(this).parents(".popup-msg"));
    })

    

    someButton.click(function(){
        // remove existing <h3> text
        $(".del-popup h3").empty();

        // customize your <h3> text
        // $(".del-popup h3").text("Hello :)");

        // customize your button 1 text
        $("#popup_action_1").text("I'm button 1");

        // customize your button 2 text
        $("#popup_action_2").text("I'm button 2");

        // fade in the pop-up
        $(".del-popup").fadeIn(popupFadeSpeed);
    })
    
    /********************************************************************** */
    /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
    /********************************************************************** */

    $(document).on("click", "#popup_action_1", function(){
        let that = this; // don't touch this line

        // do stuff
    });

    /********************************************************************** */
    /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
    /********************************************************************** */
    $(document).on("click", "#popup_action_2", function(e){
        let that = this; // don't touch this line

        e.preventDefault();

        // fade out the pop-up
        $(".del-popup").fadeOut(popupFadeSpeed);
    });
})//end ready


let radius = 1000;
const circumference = 40075017
document.getElementById("radiusInput").addEventListener("keyup",()=>{
    radius = radiusInput.value*1000;
    console.log(radius);
    // zoom = Math.log2(circumference/(radius*2))
    // // zoom = Math.log2(circumference/radius*2)

    // console.log(zoom);
    // if(userCoord.length==0){
    //     moveMap(location[0],location[1])
    // }else{
    //     moveMap(userCoord[0],userCoord[1])
    // }
})
}

// console.log("aaa");



$(document).ready(function(){
    let leaveReview = $(".leave-review"); // change this to whatever you're binding your popup trigger to

    leaveReview.click(function(){
        $(".popup-msg").css({"background-color": "#F0F0F0"});
        // remove existing <h3> text
        $(".del-popup h3").empty();
        // customize your <h3> text
        $(".del-popup h3").text("Leave a Review");
        $(".del-popup h3").addClass("popup-title");
        $(".popup-title").css({"margin-bottom": "0"});
        
        $(".popup-title").after("<div class='popup-content'></div>");
    
        $(".popup-content").append("<p class='greeting'>How was your experience? We'd love to hear from you.</p>");
        $(".popup-content").append("<h4 class='rate-title'>Rate the Overview for This Event</h4>");
        // Star Rating
        $(".popup-content").append("<div class='star-rating'></div>")
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star empty'></i>")  
        // Descriptions
        $(".popup-content").append("<h4 class='desc-title'>Descriptions</h4>");
        $(".popup-content").append("<textarea class='desc-box' placeholder='Message...'></textarea>");

        // customize your button 1 text
        $("#popup_action_1").text("Send");

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

        // setTimeout(() => {
        //     location.reload(true)
        // },100)

        // do stuff
    });

    /********************************************************************** */
    /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
    /********************************************************************** */
    $(document).on("click", "#popup_action_2", function(){
        let that = this; // don't touch this line

        // fade out the pop-up
        $(".del-popup").fadeOut(popupFadeSpeed);

        // setTimeout(() => {
        //     location.reload(true)
        // },100)
        
    });
})//end ready