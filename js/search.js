import * as dbf from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'


// console.log("aaa");
let e = query(collection(dbf.db, "events"));
const starSnapshot = await getDocs(e);
starSnapshot.forEach((doc)=>{
    console.log(doc.data().coverImage);
    let eventBlock = document.querySelector(".event-container");
    let clonedEvent = eventBlock.cloneNode(true);
    clonedEvent.removeAttribute("hidden");
    eventBlock.parentNode.insertBefore(clonedEvent, eventBlock.nextSibling);
    clonedEvent.querySelector(".card-content.image.search-page").src = doc.data().coverImage;
    clonedEvent.querySelector(".card-content.event-name").innerHTML = doc.data().name;
    // clonedEvent.querySelector(".card-content.location").innerHTML = doc.data().name;

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
    reverseGeo(doc.data().location)

    // card-content location
    clonedEvent.querySelector(".card-content.price").innerHTML = doc.data().price;
})