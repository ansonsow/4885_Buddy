import * as dbf from "./app.js"

let tomtomApiKey = "xcVSGa6cCt3p8cdaJHKnUCMSWesW8tzc"
//default to vancouver 
let location = [ -123.1207,49.2827] 
let zoom = "10"
const user = dbf.auth.currentUser.email;

document.getElementById("button").onclick=async ()=>{
    console.log(user);
}

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