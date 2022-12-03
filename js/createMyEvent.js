
import {storage, auth, db, writeEventData} from './app.js'
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import {ref, uploadBytes,getDownloadURL,deleteObject} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'
import $ from "./jquery.module.js";
import '../node_modules/regenerator-runtime/runtime.js';

let successPopup;

$(document).ready(function(){
	successPopup = $(".del-popup:first").clone();
	successPopup.removeAttr("popup-type");
	successPopup.attr("popup-type","success");
	$("body").prepend(successPopup)
})

// const geoOptions = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   const crd = pos.coords;

//   userCoord = [crd.longitude,crd.latitude]
//   console.log(userCoord);
//   // locationEnabled()
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, geoOptions);



function createEvent(name, currentUserId, price, img , location, formattedDate, desc , number ,capacity, eventStatus , category, [],[]){
  writeEventData(name, currentUserId, price, img , location, formattedDate, desc, number , capacity, eventStatus , category, [],[])
}

// if(bool == true){
// }
let img = [];

let currentUser = auth.currentUser;
if (currentUser) {

  // logged in
  let currentUserId;
  let allUser = [];
  let q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allUser.push(doc)
  });
  for(let i=0;i<allUser.length;i++){
    if(allUser[i].data().email == currentUser.email){
      currentUserId = allUser[i].id;
    }
  }
  allUser = [];
  console.log(currentUserId);
  let file = document.getElementById("upload").files;

  class EVENT {
    constructor(name, location, date, endTime,price,number,category,desc) {  // Constructor
      this.name = name;
      this.location = location;
      this.date = date;
      this.endTime = endTime;
      this.price = price;
      this.number = number;
      this.category = category;
      this.desc = desc;
    }
  }

  let newEvent = new EVENT;
  
  // no location yet



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
    searchBoxHTML.style.borderWidth = "0px";

    searchBoxHTML.style.borderBottom = "#CCCCCC solid 1px";

    let span = document.createElement("span");
    span.append("Location");
    searchPlugIn.appendChild(span);
    searchPlugIn.appendChild(searchBoxHTML)
    ttSearchBox.on('tomtom.searchbox.resultselected', function(data) {
        console.log(data);
        console.log(data.data.result);
        newEvent.location = [data.data.result.position.lng, data.data.result.position.lat];
    });
}


searchBox()


 




  document.getElementById("submit").addEventListener("click", async() =>{
    newEvent.name = document.getElementById("name").value;
    newEvent.date = document.getElementById("datetime").value;
    newEvent.endTime = document.getElementById("endTime").value;
    newEvent.price = document.getElementById("price").value;
    newEvent.number = document.getElementById("number").value;

    let tagValues = [];
    let checkboxes = document.getElementsByName("categoryList");
    
    for (let i=0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            tagValues.push(checkboxes[i].value)
        }
    }
    newEvent.category = tagValues;
    newEvent.desc = document.getElementById("desc").value;

  // check if any un enter required field
    if(!newEvent.name){
      focus(document.getElementById('name'));
      document.getElementById('name').style.borderBottom = 'red solid 0.5px'
    }else if(!newEvent.date){
      focus(document.getElementById('datetime'));
      document.getElementById('datetime').style.borderBottom = 'red solid 0.5px'
    }else if(!newEvent.endTime){
      focus(document.getElementById('endTime'));
      document.getElementById('endTime').style.borderBottom = 'red solid 0.5px'
    }else if(!newEvent.price){
      focus(document.getElementById('price'));
      document.getElementById('price').style.borderBottom = 'red solid 0.5px'
    }else if(!newEvent.number){
      focus(document.getElementById('number'));
      document.getElementById('number').style.borderBottom = 'red solid 0.5px'
    }else if(!newEvent.location){
      document.querySelector('.tt-search-box-input').focus();
      document.querySelector('.tt-search-box-input-container').style.borderBottom = 'red solid 0.5px'
      // document.getElementById('location').style.borderBottom = 'red solid 0.5px'
    }else{



      let formattedDate = (String(newEvent.date)+ String(newEvent.endTime))
      formattedDate =formattedDate.replaceAll(':','').replace('T', '').replace(',', '').replaceAll('-', '')

      let jqDateNow = Date.now();
      let jqStop = 1000;
      
      let load_jQuery = setInterval(() => {
          if(Date.now() - jqDateNow > jqStop){
              clearInterval(load_jQuery);
          } else {
              if(typeof jQuery !== "undefined"){
                  clearInterval(load_jQuery);

                  // remove existing <h3> text
                  $("[popup-type='success'] h3").empty();

                  // customize your <h3> text
                  $("[popup-type='success'] h3").text("Event successfully created!");

                  // customize your button 1 text
                  $("[popup-type='success'] #popup_action_1").text("Back to home");

                  // customize your button 2 text
                  $("[popup-type='success'] #popup_action_2").text("Check it!");

                  // fade in the pop-up
                  $("[popup-type='success']").fadeIn(popupFadeSpeed);
                  
                  /********************************************************************** */
                  /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
                  /********************************************************************** */

                  $(document).on("click", "[popup-type='success'] #popup_action_1", function(){
                      let that = this; // don't touch this line

                      location.href = '../html/main.html'
                  });

                  /********************************************************************** */
                  /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
                  /********************************************************************** */
                  $(document).on("click", "[popup-type='success'] #popup_action_2", function(){
                      let that = this; // don't touch this line

                      location.href = '../html/manageMyEvents.html'
                  });
              }		
          }
      },0);



      // setTimeout(() => {
        createEvent(newEvent.name, currentUserId, newEvent.price, img , newEvent.location, formattedDate, newEvent.desc, 0, newEvent.number, 1 , newEvent.category, [],[]) 
      // }, 500);

    }

  });

  // upload image
  $('input[type=file]').change(async function () {
    // console.log(this.files[0].mozFullPath);
    let file = document.getElementById("upload").files;

    let storageRef = ref(storage, currentUserId+Date.now()+file[0].name);
    console.log(storageRef);

    const metadata = {
      contentType: file[0].type,
    };


    
    await uploadBytes(storageRef,file[0],metadata)
    .then((snapshot)=>{
      console.log(snapshot);
      getDownloadURL(storageRef)
      .then((url)=>{
        img.push(url);
        console.log(img);
        let position = img.length;
        console.log(position);


        let eventBlock = document.querySelector(".image-wrap");
        let clonedEvent = eventBlock.cloneNode(true);
        clonedEvent.removeAttribute("hidden");
        clonedEvent.querySelector(".image").src = url;
        clonedEvent.querySelector(".delete-upload-img").addEventListener('click',()=>{
          deleteObject(storageRef).then(() => {
            const index = img.indexOf(url);
            if (index > -1) { 
              img.splice(index, 1); 
            }
            clonedEvent.remove()
            console.log(img);
          }).catch((error) => {
            
          });
        })
        document.querySelector(".images-container").append(clonedEvent);




      })
      .catch((error=>{
        console.log(error);
      }))
    })
    .catch((error)=>{
      console.log(error);
    });
  });

  
}else{
  console.log("not login");
}


