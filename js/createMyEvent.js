
import {storage, auth, db, writeEventData} from './app.js'
import {query,collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import {getStorage,ref, uploadBytes} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'
import '../node_modules/regenerator-runtime/runtime.js'


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
        newEvent.location = [data.result.lng, data.result.lat];
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
      focus(document.getElementById('date'));
      document.getElementById('date').style.borderBottom = 'red solid 0.5px'
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

      // writeEventData(name, hostId, price,pfpURL, location, dateOfEvent, description, numOfPeople, maxCapacity, eventStatus, tag, review){
      console.log(newEvent.date);

      let formattedDate = (String(newEvent.date)+ String(newEvent.endTime))
      formattedDate =formattedDate.replaceAll(':','').replace('T', '').replace(',', '').replaceAll('-', '')
      // writeEventData(newEvent.name, currentUserId, newEvent.price,[], newEvent.location, formattedDate, newEvent.desc, 0, newEvent.number, 1 , newEvent.category, [])
      file = document.getElementById("upload").files;


    }




    // let file = document.getElementById("upload").files;
    // console.log(file[0].name);
    // console.log(file[0].name);
    // let storageRef = ref(storage, file[0].name);
    // uploadBytes(storageRef,file)
    // .then((snapshot)=>{
    //   console.log(snapshot);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // });
  });
  
}else{
  console.log("not login");
}