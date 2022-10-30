import * as dbf from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'


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
                if(allSearch[i].name.includes(textSearch)){
                    if(!searchResult.includes(allSearch[i])){
                        console.log(allSearch[i]);
                        searchResult.push(allSearch[i])
                    }
                }
            }

            // tag search
            if(tagSearch != "category"){

                // console.log(searchResult.length);
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
        }
        // TODO: location search and date/time search


    }
    // console.log(searchResult);
    for(let i=0;i<searchResult.length;i++){
        displayResult(searchResult[i])
    }
})


document.getElementById("resetButton").addEventListener("click",async()=>{
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });
    for(let i=0;i<allSearch.length;i++){
        displayResult(allSearch[i])
    }
})
