import {db} from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'

/**************************************************************************/
/**************************************************************************/
/**************************************************************************/

// ======================== searchButton on click ========================================================
document.querySelector(".search-button").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });

    // searchResult=[];

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

    // end time of event
    // i.e. if 6pm: 1800
    let timeEnd = time_end.getAttribute("data-timepicki-tim") + time_end.getAttribute("data-timepicki-mini");    

    let tagSearch = [];
    let tags = document.getElementsByName("categoryList");
    for (let i=0; i < tags.length; i++) {
        if (tags[i].checked) {
            tagSearch.push(tags[i].value)
        }
    }

    searchResult.push(textSearch, addressSearch, dateSearch, timeStart, timeEnd, tagSearch);

    console.log(searchResult)
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

    addEvents(4)
    
    /*-------- OTHER --------*/
    $(window).load(function(){
        $(".dont-show").remove();
    })
})//end docready