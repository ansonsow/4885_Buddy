// import {tt} from "@tomtom-international/web-sdk-maps";

// import tt = require("@tomtom-international/web-sdk-maps");

// import tt = require("@tomtom-international/web-sdk-maps");

// import { map } from "@tomtom-international/web-sdk-maps"


// var map = tt.map({
//     key: 'xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc',
//     container: 'map'
// });
let tomtomApiKey = "xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc"
//default to vancouver 
let location = [ -123.1207,49.2827] 
let zoom = "10"
// let test = GET{https://api.tomtom.com/search/2/geocode/pizza.json?key={xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc}
// search ???
// let url = "https://api.tomtom.com/search/2/geocode/pizza.js?key={xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc}"
// async function funcName(url){
//     const response = await fetch(url);
//     console.log(response);
//     // var data = await response.json();
//     // console.log(data);
// }
// funcName(url)

let map = tt.map({
    key: tomtomApiKey,
    container: "map",
    zoom: zoom,
    center: location
});



let popup = new tt.Popup({
    closeButton: false,
}).setText("testEventname1 (str, 20)")
let marker = new tt.Marker().setLngLat(location).setPopup(popup)
marker.addTo(map)