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
    displayResult(doc.data());
    allSearch.push(doc.data())

})






function displayResult(doc){

    let eventBlock = document.querySelector(".event-container");
    let clonedEvent = eventBlock.cloneNode(true);

    clonedEvent.removeAttribute("hidden");

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

        if(textSearch == "" && tagSearch == "category"){
            alert("please fill up at lease one field");
            for(let i=0;i<allSearch.length;i++){
                displayResult(allSearch[i])
            }

            break;
        }else{

            // text search
            if(textSearch != ""){
                if(allSearch[i].name.toUpperCase().includes(textSearch.toUpperCase())){
                    console.log(allSearch[i].name.toUpperCase());
                    if(!searchResult.includes(allSearch[i])){
                        console.log(allSearch[i]);
                        searchResult.push(allSearch[i])
                    }
                }
            }

            // tag search
            if(tagSearch != "category"){
                if(searchResult.length!=0){
                    if(!searchResult.includes(allSearch[i])){
                        searchResult.push(allSearch[i])
                    }
                    for(let j=0;j<searchResult.length;j++){
                        if(!searchResult[j].tags.includes(tagSearch)){
                            searchResult.splice(j,1)
                        }
                    }

                }else{

                    if(allSearch[i].tags.includes(tagSearch)){
                        if(!searchResult.includes(allSearch[i])){
                            searchResult.push(allSearch[i])
                        }
                    }
                }
            }



            if(userCoord != []){
                
            }
        }
        
        // TODO: location search and date/time search


    }
    // console.log(searchResult);
    for(let i=0;i<searchResult.length;i++){
        displayResult(searchResult[i])
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

async function searchBox(){
    var ttSearchBox = await new tt.plugins.SearchBox(tt.services, options);
    var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    // searchBoxPlugin.appendChild(searchBoxHTML)
    document.getElementsByClassName("popup-msg")[0].prepend(searchBoxHTML)

    ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
        console.log(data);
        userCoord = [data.data.result.position.lng,data.data.result.position.lat]
    });
}


console.log(document.getElementsByClassName("popup-msg"));

searchBox()



/********************************************************************** */
/******* Tomtom Map  ************************************************** */
/********************************************************************** */
let location = [ -123.1207,49.2827];

function map(){
    let map = tt.map({
        key: tomtomApiKey,
        container: "map",
        zoom: "10",
        center: location
    });
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