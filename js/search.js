import {db} from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import '../node_modules/regenerator-runtime/runtime.js'
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/

let createAlertPopup, alertPopup, fadeOut, fadeIn, checkDuplicateEvents, locationEnabled;
let createMapPopup, mapPopup;
let userCoord = [];
let radius = 5000;
const circumference = 40075017;
let location = [ -123.1207,49.2827];





const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    userCoord = [crd.longitude,crd.latitude]
    console.log(userCoord);
    locationEnabled()
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);






let loadFadeSpeed = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue("--Loading-Fade-Speed"));

let cancelLoadDelay = parseInt(getComputedStyle(document.documentElement)
                     .getPropertyValue("--Loading-Dismiss-Delay"));

/*----- add/remove cover on button click(s) -----*/
// just for smoother UX
fadeOut = function(){
    document.querySelector(".cloned-events-container").classList.add("fade-out")
}

fadeIn = function(){
    document.querySelector(".cloned-events-container").classList.remove("fade-out")
}

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





function displayResult(doc,id){

    let eventBlock = document.querySelector(".event-container");
    let clonedEvent = eventBlock.cloneNode(true);

    clonedEvent.removeAttribute("hidden");
    clonedEvent.style.visibility = "hidden";
    
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








setTimeout(() => {
    document.querySelectorAll(".cloned-events-container .event-container").forEach(www => {
        www.style.visibility = "visible";
    })

    document.querySelector(".cover-up").classList.add("fade-out");

    setTimeout(() => {
        document.querySelector(".cover-up").style.display = "none";
        document.querySelector(".cover-up i").remove();
        document.querySelector("footer").style.display = "block";

        setTimeout(() => {
            window.removeEventListener("wheel", blockScroll);
            document.querySelector(".cover-up").style.height = "100%";
        },loadFadeSpeed)
        
    },loadFadeSpeed)
},cancelLoadDelay)


// ======================== reset button on click ========================================================
// reset click
document.querySelector(".reset-search").addEventListener("click",async()=>{
    searchResult = [];
    userCoord = [];
    radius = 5000;
    window.scrollTo(0,0);

    // reset search query
    search_text.value = "";

    // reset address field
    // search_address.value = "";

    // reset tomtom map search field
    locationButton.value = "";
    document.querySelector(".iffm-search-by-location").textContent = "Search by location";
    document.querySelector(".iffm-hover-text").style.display = "inline";

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

    /***********************************************/

    fadeOut();

    document.querySelector(".all-events").classList.add("mobile-events-v-stretch");

    setTimeout(() => {
        document.querySelectorAll(".cloned-events-container").forEach(event => {
            event.replaceChildren();
        });

        querySnapshot.forEach((doc) => {
            // console.log(doc.id);
            // allSearch.push(doc)
            displayResult(doc.data(),doc.id)
        });

        setTimeout(() => {
            fadeIn();
            document.querySelector(".all-events").classList.remove("mobile-events-v-stretch");
            document.querySelectorAll(".cloned-events-container .event-container").forEach(www => {
                www.style.visibility = "visible";
            })
        },10)
    },loadFadeSpeed)    
    
})//end reset click


// ======================== searchButton on click ========================================================
// search click
let searchResult = [];


document.querySelector(".search-button").addEventListener("click",async()=>{
    // document.querySelectorAll(".cloned-events-container").forEach(event => {
    //     event.replaceChildren();
    // });

    window.scrollTo(0,0);

    document.querySelector(".all-events").classList.add("mobile-events-v-stretch")

    fadeOut();

    setTimeout(() => {

        // document.querySelectorAll(".cloned-events-container").forEach(event => {
        //     event.replaceChildren();
        // });
    
        let searchResults = [];
        searchResult = [];


        // "search for anything"
        let textSearch = search_text.value;

        // "postal code / address"
        // let addressSearch = search_address.value;

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

        searchResults.push(textSearch, /*addressSearch,*/ dateSearch, timeStart, timeEnd, tagSearch);
        console.log(searchResults)
        if(dateSearch==""){
            
        }else{
            dateSearch = dateSearch + timeStart + timeEnd; 
        }
        // console.log(getFullDate(dateSearch));


        for(let i=0;i<allSearch.length;i++){
            /*-------------- IF NO FIELDS HAVE BEEN FILLED --------------*/
            // if search IS empty
            if(textSearch == "" && tagSearch.length == 0 && dateSearch == "" && userCoord.length == 0){
                alertPopup(); // alert("please fill up at lease one field");

                document.querySelector(".all-events").classList.add("fade-out");

                break;
            }
            
            /*-------------- IF SEARCH *CAN* GO ON --------------*/
            // if search ISN'T empty
            else {

                document.querySelectorAll(".cloned-events-container").forEach(event => {
                    event.replaceChildren();
                });
                
                if(textSearch != ""){
                    if(allSearch[i].data().name.toUpperCase().includes(textSearch.toUpperCase())){
                        if(!searchResult.includes(allSearch[i])){
                            // console.log(allSearch[i].name);
                            console.log("pushing " +allSearch[i].data().name +" because contain name");
                            searchResult.push(allSearch[i])
                        }else{
                            console.log("already has "+ allSearch[i].data().name);
                        }
                    }
                }

                if(dateSearch!=""){

                    if(formatDateSearch(dateSearch, allSearch[i].data().dateOfEvent , allSearch[i].data().name)){
        
                        if(!searchResult.includes(allSearch[i])){
                            console.log("pushing "+ allSearch[i].data().name + " beacause the event date is bigger");
                            searchResult.push(allSearch[i])
                        }
        
                    }
                }
        
                if(tagSearch.length != 0){
        
                    // only one tag
                    if(allSearch[i].data().tags.includes(tagSearch.toString())){
                        if(!searchResult.includes(allSearch[i])){

                            console.log("push "+allSearch[i].data().name+" because has tag");
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

                if(userCoord.length!=0){
                    if(calculateDistance(userCoord,allSearch[i].data().location)<radius){
                        if(!searchResult.includes(allSearch[i])){
                            console.log(radius);
                            console.log(userCoord);
                            console.log(calculateDistance(userCoord,allSearch[i].data().location)<radius);
                            console.log("pushing " + allSearch[i].data().name + " because within the raidus");
                            searchResult.push(allSearch[i])
                        }
                    }
                }


                if(searchResult!=0){
                    if(textSearch!=""){
                        for(let j=0;j<searchResult.length;j++){
                            if(!searchResult[j].data().name.toUpperCase().includes(textSearch.toUpperCase())){
                                console.log("slicing " + searchResult[j].data().name +" because doesn't contain name");
                                searchResult.splice(j,1)
                            }
                        }

                    }
                    if(dateSearch!=""){

                            
                        for(let j =0;j<searchResult.length;j++){
                            if(!formatDateSearch(dateSearch, searchResult[j].data().dateOfEvent , searchResult[j].data().name)){

                                console.log("slicing " + searchResult[j].data().name +" because the date of event is bigger");
                                searchResult.splice(j,1)
                            }
                        }

                    }
                    if(tagSearch!=""){


                        for(let j=0;j<searchResult.length;j++){
                            if(!searchResult[j].data().tags.includes(tagSearch.toString())){
                                console.log("slice "+searchResult[j].name+ " because doesn't have tag");
                                searchResult.splice(j,1)
                            }
                        }


                    }

                    if(userCoord.length!=0){
                        for(let j=0;j<searchResult.length;j++){
                            if(calculateDistance(userCoord,searchResult[j].data().location)>radius){
                                console.log(searchResult[j].data());
                                console.log("slice "+searchResult[j]+" because not within radius");
                                searchResult.splice(j,1)
                            }
                        }
                    }
                }
                
            }//end if:search query isn't blank (aka successful search)

            
        }
        
        // console.log(searchResult);
        console.log(searchResult);

        setTimeout(() => {
            // console.log(searchResult);
            for(let i=0;i<searchResult.length;i++){
                displayResult(searchResult[i].data(),searchResult[i].id)
            }

            // checkDuplicateEvents();

            setTimeout(() => {
                document.querySelector(".all-events").classList.remove("mobile-events-v-stretch");

                document.querySelectorAll(".cloned-events-container .event-container").forEach(www => {
                    www.style.visibility = "visible";
                })
            },10)

            fadeIn();
        },loadFadeSpeed/2)

    },loadFadeSpeed)
})//end search click

/**************************************************************************/
/**************************************************************************/
/**************************************************************************/

let mapo;
let zoom = 10;



$(document).ready(function(){
    
    /*-------- ALERT POPUP - create --------*/
    createAlertPopup = function(){
        let puppet = $(".del-popup:first").clone();
        puppet.attr("popup-type","alert");
        $(".del-popup h3, .del-popup button", puppet).empty();
        $("#popup_action_2", puppet).remove();
        $("body").prepend(puppet);

        // customize your <h3> text
        $("h3",puppet).text("Please fill in at least one field!");

        // customize your button 1 text
        $("#popup_action_1",puppet).text("OK");
    }

    createAlertPopup()

    /*-------- ALERT POPUP - run --------*/
    alertPopup = function(){
        // fade in the pop-up
        $("[popup-type='alert']").fadeIn(popupFadeSpeed);

        $(document).on("click", "[popup-type='alert'] #popup_action_1", function(){
            // fade out the pop-up
            $("[popup-type='alert']").fadeOut(popupFadeSpeed);

            // fade out overlays
            fadeIn();
            $(".cloned-events-container .event-container").css("visibility","visible");
            $(".all-events").removeClass("fade-out")
        });
    }

    /*-------- MAP POPUP - create --------*/
    // add map
    // $(".popup-msg").append("<div id='map'></div>");
    // map();

    createMapPopup = function(){
        let backMap = $(".del-popup:first").clone();
        backMap.attr("popup-type","map");
        $(".del-popup h3, .del-popup button", backMap).empty();
        $("#popup_action_2", backMap).remove();
        $("body").prepend(backMap);

        // customize your <h3> text
        $("h3",backMap).remove();

        // customize your button 1 text
        $("#popup_action_1",backMap).text("Confirm");
        
        function moveMap(lng,lat){
            location = [lng,lat]
            mapo.flyTo({
                center: location,
                zoom: zoom
            })
        }


    


        function mapo(){
            
            mapo = tt.map({
                key: tomtomApiKey,
                container: "map",
                zoom: zoom,
                center: location
            });
        }
        


        var options = {
            searchOptions: {
                key: tomtomApiKey,
                language: 'en-GB',
                limit: 5
            },
            autocompleteOptions: {
                key: tomtomApiKey,
                language: 'en-GB'
            }
        };        

        // searchBoxPlugin.appendChild(searchBoxHTML)
        // searchbox is the one in popup
        async function searchBox(){
            var ttSearchBox = await new tt.plugins.SearchBox(tt.services, options);
            var searchBoxHTML = ttSearchBox.getSearchBoxHTML();

            $("#searchbox").prepend(searchBoxHTML);
            $(".tt-search-box-input").attr("placeholder","Enter your location...")
            
            ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
                console.log(data);
                moveMap(data.data.result.position.lng,data.data.result.position.lat);
                userCoord = [data.data.result.position.lng,data.data.result.position.lat];
                document.getElementById("locationButton").value=data.data.result.address.freeformAddress;
            });
        }
        
        let map = document.createElement("div");
        map.setAttribute("id","map");
        $("[popup-type='map'] .popup-msg").prepend(map);


        let searchBoxDiv = document.createElement("div");
        searchBoxDiv.setAttribute("id","searchbox");
        $("[popup-type='map'] .popup-msg").prepend(searchBoxDiv);


        // let radiusInput = document.createElement("input");
        // radiusInput.setAttribute("id","radiusInput");
        $("[popup-type='map'] #popup_action_1").before("<div class='radiusInputWrap'><input id='radiusInput' type='number' min='0' value='5'><span class='radius-units'>km</span></div>");

        // custom radius input
        document.getElementById("radiusInput").addEventListener("keyup",()=>{
            console.log(radius);
            radius = document.getElementById("radiusInput").value*1000;
            if(radius >= 0 ){
                zoom = Math.log2(circumference/(radius*4))
            }
            // zoom = Math.log2(circumference/radius*2)

            console.log(zoom);
            if(userCoord.length==0){
                moveMap(location[0],location[1])
            }else{
                moveMap(userCoord[0],userCoord[1])
            }
        })//end custom radius

        searchBox()
        mapo();
        // $(document).on("click", "#popup_action_1", function(){
        //     let that = this; // don't touch this line
        //     $("#map").remove()
        //     $("#searchbox").remove()
        //     $("#radiusInput").remove()

        //     $("[popup-type='alert']").fadeOut(popupFadeSpeed);
        // });

        locationEnabled = function(){

            document.getElementById("locationButton").value='aaa'
            console.log(userCoord);
            if(userCoord.length!=0){
                location = userCoord;
    
                async function reverseGeo(l){
                    await tt.services.reverseGeocode({
                    key: tomtomApiKey,
                    position: l
                })
                .then(result=>{
    
                    let address = result.addresses[0].address.freeformAddress;

                    console.log(address);
                    const locationfield = document.querySelector('.iffm-search-by-location');
                    locationfield.innerHTML = address;
                    // locationfield.innerHTML = address;


                    // $('#locationButton').val(address)

                    console.log(locationfield);
    
    
                });
            }
    
                reverseGeo(userCoord)
                moveMap(userCoord[0],userCoord[1])
            }
        }


    }//end function createMapPopup()
    setTimeout(() => {
        createMapPopup()
      }, "1000")


    // createMapPopup()

    /*-------- MAP POPUP - RUN --------*/

    mapPopup = function(){
        // fade in the pop-up
        $("[popup-type='map']").fadeIn(popupFadeSpeed);

        $(document).on("click", "[popup-type='map'] #popup_action_1", function(){
            // fade out the pop-up

            $("[popup-type='map']").fadeOut(popupFadeSpeed);
            

            locationButton.value = $(".tt-search-box-input").val();

            if($(".tt-search-box-input").val()==''){

            }else{
            $(".iffm-search-by-location").text($(".tt-search-box-input").val());

            }
            $(".iffm-hover-text").hide();

            // fade out overlays
            // fadeIn();
            // $(".cloned-events-container .event-container").css("visibility","visible");
            // $(".all-events").removeClass("fade-out")
        });
    }

    document.getElementById("locationButton").addEventListener("click",()=>{
        mapPopup()
    })

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