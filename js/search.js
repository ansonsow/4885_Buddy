import * as dbf from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'


// console.log("aaa");
let e = query(collection(dbf.db, "events"));
const starSnapshot = await getDocs(e);
starSnapshot.forEach((doc)=>{
    displayResult(doc.data());
    // console.log(doc.data().coverImage);
    // let eventBlock = document.querySelector(".event-container");
    // let clonedEvent = eventBlock.cloneNode(true);
    // clonedEvent.removeAttribute("hidden");
    // // document.getElementById("result").appendChild(eventBlock)
    // eventBlock.parentNode.insertBefore(clonedEvent, eventBlock.nextSibling);
    // clonedEvent.querySelector(".card-content.image.search-page").src = doc.data().coverImage;
    // clonedEvent.querySelector(".card-content.event-name").innerHTML = doc.data().name;
    // // clonedEvent.querySelector(".card-content.location").innerHTML = doc.data().name;

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
    // reverseGeo(doc.data().location)

    // // card-content location
    // clonedEvent.querySelector(".card-content.time").innerHTML = "not sure yet";
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


document.getElementById("searchButton").addEventListener("click",async()=>{
    let allSearch = [];
    let searchResult = [];
    document.querySelectorAll(".cloned-events-container").forEach(event => {
        event.replaceChildren();
    });

    const searchSnapshot = await getDocs(e);
    searchSnapshot.forEach((doc)=>{
        // console.log(doc.data());
        allSearch.push(doc.data())
    })
    console.log(allSearch);
    let textSearch = document.getElementById("textSearch").value;
    let tagSearch = document.getElementById("tagSearch").value;

    console.log(tagSearch);
    for(let i=0;i<allSearch.length;i++){
        if(textSearch != ""){
            if(allSearch[i].name.includes(textSearch)){
                console.log("textsearhc");
                searchResult.push(allSearch[i])
                // console.log(searchResult[i]);
            }
        }

        if(tagSearch != ""){
            if(allSearch[i].tags.includes(tagSearch)){
                searchResult.push(allSearch[i])
            }
        }

    }
    console.log(searchResult);
    for(let i=0;i<searchResult.length;i++){
        displayResult(searchResult[i])
    }
})
// 	document.querySelectorAll(".cloned-events-container").forEach(event => {
// 		event.replaceChildren();
// 	});
//     const searchSnapshot = await getDocs(e);
//     searchSnapshot.forEach((doc)=>{
//         console.log(doc.data());
//         searchResult.push(doc.data())
//     }
// })



    // e = query(collection(dbf.db, "events"),where("name", ">=", textSearch.value.toString())
    //                                       ,where("name", "<=", textSearch.value.toString()+'\uf8ff'))

    // console.log(doc.data().coverImage);
    // let eventBlock = document.querySelector(".event-container");
    // let clonedEvent = eventBlock.cloneNode(true);
    // clonedEvent.removeAttribute("hidden");
    // eventBlock.parentNode.insertBefore(clonedEvent, eventBlock.nextSibling);
    // clonedEvent.querySelector(".card-content.image.search-page").src = doc.data().coverImage;
    // clonedEvent.querySelector(".card-content.event-name").innerHTML = doc.data().name;
    // // clonedEvent.querySelector(".card-content.location").innerHTML = doc.data().name;

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
    // reverseGeo(doc.data().location)

    // // card-content location
    // clonedEvent.querySelector(".card-content.time").innerHTML = "not sure yet";
    // })
// })