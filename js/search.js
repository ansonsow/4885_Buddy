import {db} from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'

/**************************************************************************/
/**************************************************************************/
/**************************************************************************/

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
    let eventYear = eventDateNum.slice(0,4);
    let eventMonth = eventDateNum.substring(eventDateNum.length - 12).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);
    return (`${eventYear}${eventMonth}${eventDay}`);
}

function getEndTime(d){
    let eventDateNum = d.replace(/[^\d\.]*/g,"");

    let eventTimeEnd_Hour = eventDateNum.substring(eventDateNum.length-4).slice(0,2);
    let eventTimeEnd_Minutes = eventDateNum.substring(eventDateNum.length-2);
    return(`${eventTimeEnd_Hour}${eventTimeEnd_Minutes}`)
}

function getFullDate(d){
    let eventDateNum = d.replace(/[^\d\.]*/g,"");
    let eventYear = eventDateNum.slice(0,4);
    let eventMonth = eventDateNum.substring(eventDateNum.length - 12).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);
    let eventTimeStart_Hour = eventDateNum.substring(eventDateNum.length-8).slice(0,2);
    let eventTimeStart_Minutes = eventDateNum.substring(eventDateNum.length-6).slice(0,2);
    return(`${eventYear}${eventMonth}${eventDay}${eventTimeStart_Hour}${eventTimeStart_Minutes}`)
}




function displayResult(doc,id){

    let eventBlock = document.querySelector(".event-container");
    let clonedEvent = eventBlock.cloneNode(true);

    clonedEvent.removeAttribute("hidden");
    
    clonedEvent.addEventListener("click",()=>{
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
                document.querySelector(".cloned-events-container").append(clonedEvent);
            }		
        }
    },0);

    clonedEvent.querySelector(".card-image").src = doc.images[0];
    clonedEvent.querySelector(".event-name").innerHTML = doc.name;

    async function reverseGeo(l){
        await tt.services.reverseGeocode({
        key: tomtomApiKey,
        position: l
    })
    .then(result=>{
        clonedEvent.querySelector(".card-row .location").innerHTML = result.addresses[0].address.freeformAddress
        // console.log(result.addresses[0].address.freeformAddress);
    });
    }
    setTimeout(() => {
    reverseGeo(doc.location)
    }, 1000);

    // card-content location
    clonedEvent.querySelector(".card-row .date").innerHTML =  formatDate(doc.dateOfEvent);
    clonedEvent.querySelector(".card-row .time").innerHTML =  formatTime(doc.dateOfEvent);

}

function formatDateSearch(searchDate, docDate , n){
    console.log("formated date Search "+getFullDate(searchDate));
    console.log("formated fullDate "+ getFullDate(docDate));
    console.log(n, getDate(docDate));
    if(getFullDate(searchDate)<getFullDate(docDate)){
        return true;
    }else if(getFullDate(searchDate)==getFullDate(docDate)){
        if(getEndTime(searchDate)>=getEndTime(docDate)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}


let allSearch = [];

let q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    allSearch.push(doc)
    displayResult(doc.data(),doc.id)
});

/*----- page fade-in -----*/
let loadFadeSpeed = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue("--Loading-Fade-Speed"));

let cancelLoadDelay = parseInt(getComputedStyle(document.documentElement)
                     .getPropertyValue("--Loading-Dismiss-Delay"));

setTimeout(() => {
    document.querySelector(".cover-up").classList.add("fade-out");

    setTimeout(() => {
        document.querySelector(".cover-up").style.display = "none";
        document.querySelector("footer").style.display = "block";

        setTimeout(() => {
            window.removeEventListener("wheel", blockScroll);
        },loadFadeSpeed)
        
    },loadFadeSpeed)
},cancelLoadDelay)


document.querySelector(".reset-search").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });
    querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        allSearch.push(doc)
        displayResult(doc.data(),doc.id)
    });

    // reset search query
    search_text.value = "";

    // reset address field
    search_address.value = "";

    // reset calendar date
    date_picker.value = "";

    // reset start time
    time_start.value = "";
    time_start.setAttribute("data-timepicki-tim","00");
    time_start.setAttribute("data-timepicki-mini","00");

    // reset end time
    time_end.value = "";
    time_end.setAttribute("data-timepicki-tim","00");
    time_end.setAttribute("data-timepicki-mini","00");

    // reset category dropdown
    var radioz = document.getElementsByName("categoryList");
    for(var i=0;i<radioz.length;i++){
        radioz[i].checked = false;
    }
})
// ======================== searchButton on click ========================================================
document.querySelector(".search-button").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });

    // searchResult=[];
    let searchResults = [];
    let searchResult = [];


    // "search for anything"
    let textSearch = search_text.value;

    // "postal code / address"
    let addressSearch = search_address.value;

    // date of event
    let dateSearch = date_picker.value;

    // starting time of event
    // i.e. if 3am: 0300
    let timeStart = time_start.getAttribute("data-timepicki-tim") + time_start.getAttribute("data-timepicki-mini");
    if(timeStart == "0"){
        timeStart = "0000"
    }

    // end time of event
    // i.e. if 6pm: 1800
    let timeEnd = time_end.getAttribute("data-timepicki-tim") + time_end.getAttribute("data-timepicki-mini");
    if(timeEnd == "0"){
        timeEnd = "2359"
    }

    let tagSearch = [];
    let tags = document.getElementsByName("categoryList");
    for (let i=0; i < tags.length; i++) {
        if (tags[i].checked) {
            tagSearch.push(tags[i].value)
        }
    }

    searchResults.push(textSearch, addressSearch, dateSearch, timeStart, timeEnd, tagSearch);
    console.log(searchResults)
    if(dateSearch==""){
        
    }else{
        dateSearch = dateSearch + timeStart + timeEnd; 
    }
    console.log(getFullDate(dateSearch));


    for(let i=0;i<allSearch.length;i++){
        if(textSearch == "" && tagSearch.length == 0  && dateSearch == ""){
            alert("please fill up at lease one field");
            for(let i=0;i<allSearch.length;i++){
                displayResult(allSearch[i].data(), allSearch[i].data)
            }

            break;
        }else{
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
            if(dateSearch!=""){
                console.log("object");
                if(searchResult.length!=0){
                    
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
    
            if(tagSearch.length != 0){
                if(searchResult.length!=0){
    
                    for(let j=0;j<searchResult.length;j++){
                        if(!searchResult[j].data().tags.includes(tagSearch.toString())){
                            console.log("slice "+searchResult[j].name);
                            searchResult.splice(j,1)
                        }
                    }
    
                }
    
                // only one tag
                if(allSearch[i].data().tags.includes(tagSearch.toString())){
                    if(!searchResult.includes(allSearch[i])){
                        console.log("push "+allSearch[i].data().name);
                        searchResult.push(allSearch[i])
                    }
                }
    
    
                // multiple tag search
                // for(let j =0;j<tagSearch.length;j++){
                //     // console.log(object);
                //     if(allSearch[i].data().tags.includes(tagSearch[j])){
                //         if(!searchResult.includes(allSearch[i])){
                //             console.log("push "+allSearch[i].data().name);
                //             searchResult.push(allSearch[i])
                //         }
                //     }   
                // }
    
    
                
            }
        }
        
    }
    // console.log(searchResult);


    for(let i=0;i<searchResult.length;i++){
        displayResult(searchResult[i].data(),searchResult[i].id)

    }
})

/**************************************************************************/
/**************************************************************************/
/**************************************************************************/

let location = [ -123.1207,49.2827];
let mapo;
let zoom = 10;

function map(){
    mapo = tt.map({
        key: tomtomApiKey,
        container: "map",
        zoom: zoom,
        center: location
    });
}

function moveMap(lng,lat){
    location = [lng,lat]
    mapo.flyTo({
        center: location,
        zoom: zoom
    })
}

$(document).ready(function(){
    // add map
    $(".popup-msg").append("<div id='map'></div>");
    // map();

    /*-------- MAP POPUP --------*/
    $("#locationButton").click(function(){
        // remove existing <h3> text
        $(".del-popup h3").empty();

        // customize your <h3> text
        $(".del-popup h3").text("Find your location:");

        // customize your button 1 text
        $("#popup_action_1").text("I'm button 1");

        // customize your button 2 text
        $("#popup_action_2").text("I'm button 2");

        // fade in the pop-up
        $(".del-popup").fadeIn(popupFadeSpeed);
    })

    $(document).on("click", "#popup_action_1", function(){
        let that = this; // don't touch this line

        // do stuff
    });

    $(document).on("click", "#popup_action_2", function(){
        let that = this; // don't touch this line

        // fade out the pop-up
        $(".del-popup").fadeOut(popupFadeSpeed);
    });

    /*-------- CALENDAR POPUP --------*/
    duDatepicker("#date_picker", {format: "yyyy-mm-dd"});

    /*-------- TIMEPICKER POPUP --------*/
    $("#time_start, #time_end").timepicki({
        show_meridian:false,
		min_hour_value:0,
		max_hour_value:23,
		step_size_minutes:15,
        start_time: ["00", "00", "AM"],
		overflow_minutes:true,
        increase_direction:"down",
        reset:true
    });

    $(".reset_time").attr("href","javascript:void(0)");

    /*-------- CATEGORY DROPDOWN --------*/
    let dropdownSpeed = parseInt(getComputedStyle(document.documentElement)
                       .getPropertyValue("--Categories-Dropdown-Speed"));

    $(".category-heading").click(function(){
        // closed -> open
        if(!$(this).hasClass("dd-open")){
            $(this).addClass("dd-open");
            $(".category-list").slideDown(dropdownSpeed);
            setTimeout(() => {
                $(".category-list").addClass("show-list")
            },dropdownSpeed*0.69)
        }

        // open -> closed
        else {           

            $(".category-list").removeClass("show-list");

            setTimeout(() => {
                $(".category-list").slideUp(dropdownSpeed*0.69);
                $(this).removeClass("dd-open");
            },dropdownSpeed)
        }
    })//end click

    /*-------- GENERATE EVENTS --------*/
    function addEvents(num){
        for(let i=0; i<Number(num); i++){
            let eventClone = $(".event-container:first").clone();
            let randUm = Math.floor(Math.random() * (1269 - 420 + 1) + 420);
            $(".all-events").append(eventClone);
            eventClone.find(".card-image").attr("src",`//source.unsplash.com/random/${randUm}x${randUm}`)
        }
    }

    // addEvents(4)
    
    /*-------- OTHER --------*/
    $(window).load(function(){
        $(".dont-show").remove();
    })
})//end docready