import * as dbf from "./app.js"
// import * as mapf from "./tomtom.js"
import $ from "./jquery.module.js";
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import '../node_modules/regenerator-runtime/runtime.js'




// console.log("aaa");
let allSearch = [];

let e = query(collection(dbf.db, "events"));
const starSnapshot = await getDocs(e);
starSnapshot.forEach((doc)=>{
    displayResult(doc.data(),doc.id);
    allSearch.push(doc)

})





// TODO add onclick to change target event so that event detail can know what event the user clicked
function displayResult(doc,id){

    let eventBlock = document.querySelector(".event-container");
    let clonedEvent = eventBlock.cloneNode(true);

    clonedEvent.removeAttribute("hidden");
    
    clonedEvent.addEventListener("click",()=>{
        localStorage.setItem(targetEventId, id);
        console.log(id);
        console.log(localStorage.getItem(targetEventId));
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

    clonedEvent.querySelector(".card-content.image.search-page").src = doc.coverImage;
    clonedEvent.querySelector(".card-content.event-name").innerHTML = doc.name;

    function reverseGeo(l){
        tt.services.reverseGeocode({
        key: tomtomApiKey,
        position: l
    })
    .then(result=>{
        clonedEvent.querySelector(".card-content.location").innerHTML = result.addresses[0].address.freeformAddress
        // console.log(result.addresses[0].address.freeformAddress);
    });
    }
    reverseGeo(doc.location)

    // card-content location
    clonedEvent.querySelector(".card-content.time").innerHTML = "not sure yet";

}


// movable-type.co.uk/scripts/latlong.html
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


document.getElementById("searchButton").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });
    searchResult=[];


    const searchSnapshot = await getDocs(e);
    searchSnapshot.forEach((doc)=>{
        // console.log(doc.data());
    })

    let textSearch = document.getElementById("textSearch").value;
    let tagSearch = document.getElementById("tagSearch").value;


    console.log(tagSearch);
    for(let i=0;i<allSearch.length;i++){

        if(textSearch == "" && tagSearch == "category" && userCoord.length == 0){
            alert("please fill up at lease one field");
            for(let i=0;i<allSearch.length;i++){
                displayResult(allSearch[i].data())
            }

            break;
        }else{

            // if(textSearch!=""&&tagSearch!="category"&&userCoord.length!=0){
            //     let search = allSearch.filter(element =>{
            //         // if(element.name.toUpperCase().includes(textSearch.toUpperCase()) &&
            //         //    element.tags.includes(tagSearch)&&
            //         //    calculateDistance(userCoord,element.location)>radius)
            //         //    {
            //         //     searchResult.push(element)
            //         //    }
            //         console.log(element);
            //         return element.name.toUpperCase().includes(textSearch.toUpperCase()) && element.tags.includes(tagSearch)&&calculateDistance(userCoord,element.location)>radius
            //     })
            //     console.log(search);
            // }else{
            // text search
            if(textSearch != ""){
                if(searchResult.length!=0){
                    for(let j=0;j<searchResult.length;j++){
                        if(!searchResult[j].data().name.toUpperCase().includes(textSearch.toUpperCase())){
                            // console.log("slice "+searchResult[j].name);
                            searchResult.splice(j,1)
                        }
                    }
                }
                if(allSearch[i].data().name.toUpperCase().includes(textSearch.toUpperCase())){
                    if(!searchResult.includes(allSearch[i])){
                        // console.log(allSearch[i].name);
                        searchResult.push(allSearch[i])
                    }
                }
            }

            if(userCoord.length!=0){
                if(searchResult.lenth!=0){                    
                        // if(!searchResult.includes(allSearch[i])){
                        //     searchResult.push(allSearch[i])
                        // }
                        
                        for(let j=0;j<searchResult.length;j++){
                            if(calculateDistance(userCoord,allSearch[i].data().location)>radius){
                            console.log("slice "+searchResult[j].name);

                                searchResult.splice(j,1)
                            }
                        }
                        
                    }
                        
                        if(calculateDistance(userCoord,allSearch[i].data().location)<radius){
                            if(!searchResult.includes(allSearch[i])){
                                console.log("push "+allSearch[i].data().name);
                                searchResult.push(allSearch[i])
                            }
                        }
                    
            }

            // tag search
            if(tagSearch != "category"){
                if(searchResult.length!=0){
                    // if(!searchResult.includes(allSearch[i])){
                    //     searchResult.push(allSearch[i])
                    // }
                    for(let j=0;j<searchResult.length;j++){
                        if(!searchResult[j].data().tags.includes(tagSearch)){
                            console.log("slice "+searchResult[j].name);
                            searchResult.splice(j,1)
                        }
                    }

                }

                    if(allSearch[i].data().tags.includes(tagSearch)){
                        if(!searchResult.includes(allSearch[i])){
                            console.log("push "+allSearch[i].data().name);
                            searchResult.push(allSearch[i])
                        }
                    }
                
            }




            

            

        }
        
        // TODO: location search and date/time search
    }
    // console.log(searchResult);
    for(let i=0;i<searchResult.length;i++){
        displayResult(searchResult[i].data())
    }
})




    /********************************************************************** */
    /******* Tomtom Searchbox plugin  ************************************* */
    /********************************************************************** */
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


// searchbox is the one in popup
async function searchBox(){
    var ttSearchBox = await new tt.plugins.SearchBox(tt.services, options);
    var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    // searchBoxPlugin.appendChild(searchBoxHTML)
    document.getElementsByClassName("popup-msg")[0].prepend(searchBoxHTML)

    ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
        moveMap(data.data.result.position.lng,data.data.result.position.lat)
        userCoord = [data.data.result.position.lng,data.data.result.position.lat]
    });
}

// searchbox2 is the one in the search.js
async function searchBox2(){
    var ttSearchBox = await new tt.plugins.SearchBox(tt.services, options);
    var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    searchBoxPlugin.appendChild(searchBoxHTML)
    // document.getElementsByClassName("popup-msg")[0].prepend(searchBoxHTML)

    ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
        moveMap(data.data.result.position.lng,data.data.result.position.lat)
        userCoord = [data.data.result.position.lng,data.data.result.position.lat]
    });
}
searchBox2()


console.log(document.getElementsByClassName("popup-msg"));

searchBox()



/********************************************************************** */
/******* Tomtom Map  ************************************************** */
/********************************************************************** */
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


// reset button
document.getElementById("resetButton").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });
    for(let i=0;i<allSearch.length;i++){
        displayResult(allSearch[i])
    }
})







$(document).ready(function(){
    let someButton = $("#locationButton"); // change this to whatever you're binding your popup trigger to

    // add map
    $(".popup-msg").append("<div id='map'></div>");
    map();

    $(".popup-msg").append("<input id='radiusInput'type='number'>");


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
    zoom = Math.log2(circumference/(radius*2))
    // zoom = Math.log2(circumference/radius*2)

    console.log(zoom);
    if(userCoord.length==0){
        moveMap(location[0],location[1])
    }else{
        moveMap(userCoord[0],userCoord[1])
    }
})







