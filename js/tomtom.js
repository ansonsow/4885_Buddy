
import * as dbf from "./app.js"
// import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import '../node_modules/regenerator-runtime/runtime.js'


let tomtomApiKey = "xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc"
//default to vancouver 
let location = [ -123.1207,49.2827] 
let zoom = "10"
const user = dbf.auth.currentUser.email;

// document.getElementById("button").onclick=async ()=>{
//     console.log(user);
// }

let map = tt.map({
    key: tomtomApiKey,
    container: "map",
    zoom: zoom,
    center: location
});

// let search = 


// calculate distance for two location
// Point2D p1 = new Point2D(lattitude1, longitude2);
// Point2D p2 = new Point2D(lattitude2, longitude2);

// double distanceBetweenTwoPoints = (double)Math.sqrt((double)Math.pow((p1.x - p2.x), 2.0) + (double)Math.pow((p1.y - p2.y), 2.0));

function moveMap(lng,lat){
    location = [lng,lat]
    map.flyTo({
        center: location,
        zoom: 15
    })
}

function addMarker(lng, lat){
    let location = [lng,lat];
    let marker = new tt.Marker().setLngLat(location).addTo(map)
}

let handleResults = function(result){
    console.log(result);
    if(result.results){
        console.log(result.results[0].position.lat);
        for(let i =0; i<result.results.length;i++){

            let newDiv = document.createElement("div")
            let newContent = document.createTextNode(result.results[i].address.freeformAddress)
            let newB = document.createElement("b")
            newDiv.appendChild(newContent);
            newDiv.appendChild(newB);
            newDiv.addEventListener("click",()=>{

            })
            newDiv.onclick = moveMap(result.results[i].position.lng,result.results[i].position.lat)

            document.getElementById("searchResultContainer").appendChild(newDiv);


        }
        // location = [result.results[0].position.lat,result.results[0].position.lng]
        // moveMap(result.results[0].position.lng,result.results[0].position.lat)
        // addMarker(result.results[0].position.lng,result.results[0].position.lat)
        
    }
}

let search = function(){
    tt.services.fuzzySearch({
        key: tomtomApiKey,
        query: document.getElementById("query").value
        // query: "vancouver"
    }).then(handleResults)
}


// document.getElementById("query").addEventListener("keyup",async()=>{
//     await search()
// })
// search.addEventListener("click",()=>{
//     search
// })

// function reverseGeo(l){
//     tt.services.reverseGeocode({
//         key: tomtomApiKey,
//         position: l
//     })
//     .then(result=>{
//         console.log(result);
//     });
// }

// reverseGeo()

document.getElementById("search").addEventListener("click", () => {
    // alert("aaaa");
    search()
})

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        if(document.getElementById("query").value!=""){
            search()
        }else{
            console.log("nothing entered");
        }
        
    }
});

let popup = new tt.Popup({
    closeButton: false,
}).setText("testEventname1 (str, 20)")
let marker = new tt.Marker().setLngLat(location).setPopup(popup)
marker.addTo(map)




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
    searchPlugIn.appendChild(searchBoxHTML)
    ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
        console.log(data);
        moveMap(data.data.result.position.lng,data.data.result.position.lat)
    });
}


searchBox()



// changeFlag
console.log(localStorage.getItem('guideFlag'));
document.getElementById("changeFlag").addEventListener("click",()=>{

    localStorage.setItem('guideFlag', true)

    // guideFlag = true
    console.log(localStorage.getItem('guideFlag'));

})


if(localStorage.getItem('guideFlag')=="false"){
    alert("hihi")
    // popup
}else{
    
}