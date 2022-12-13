import $ from "./jquery.module.js";
import {db, updateEventName, updateEventDate, updateEventPrice, updateEventMax, addEventTag, removeEventTag, updateEventDesc, addEventImage, removeEventImage, storage} from "./app.js";
import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc,doc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import {ref, uploadBytes,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'
// const db = getFirestore();

let testEventId = "mvSF9RKBBnOPY0kcuQ8R";
//this page's event id 

let targetEventId;

targetEventId = localStorage.getItem(targetEventId);
let currentUser = dbf.auth.currentUser;
let currentUserId;
let currentUserEmail;
let eventData;

let nothingsChanged;
let cantBeEmpty;
let areYouSure;
let saveOK;

let img = [];


if (currentUser) {
    // const currentUser = dbf.auth.currentUser.email;
    // TODO change to targetUser in the future

    currentUserEmail = currentUser.email;
    
    // get user ID
    let q = query(collection(dbf.db, "users"), where("email", "==", currentUserEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentUserId = doc.id;
        console.log(doc.id);
    });

    // gets the user's info (e.g. events, favs)
    const userJson = await getDoc(doc(dbf.db, "users", currentUserId));
    const userData = userJson.data();
    // console.log(userData);

    // get user's EVENTS
    // console.log(userData.events);

    const eventJson = await getDoc(doc(dbf.db, "events", targetEventId));
    eventData = eventJson.data();
    console.log(eventData);

    // get event name
    let eventName = eventData.name;
    console.log(`EVENT NAME: ${eventName}`);

    // get event timestamp
    let eventTimestamp = eventData.dateOfEvent;
    console.log(`EVENT TIMESTAMP: ${eventTimestamp}`);

    // get event price
    let eventPrice = eventData.price;
    console.log(`EVENT PRICE: ${eventPrice}`);

    // get event participants
    let eventParticipants = eventData.maxCapacity;
    console.log(`EVENT MAX PARTICIPANTS: ${eventParticipants}`);

    // get event categories
    let eventTags = eventData.tags;
    console.log(`EVENT TAGS: ${eventTags}`);

    // get event description
    let eventDesc = eventData.description;
    console.log(`EVENT DESC: ${eventDesc}`);

    // get event images
    let eventIMGs = eventData.images;
    console.log(`EVENT IMAGES: ${eventIMGs}`);

    /*************************** EVENT DATE ******************************* */

    let eventDateNum = eventTimestamp;
    let eventYear = eventDateNum.slice(0,4);
    let eventMonth = eventDateNum.substring(eventDateNum.length-12).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);

    /*************************** EVENT TIME ******************************* */

    let eventTimeStart_Hour = eventDateNum.substring(eventDateNum.length-8).slice(0,2);
    let eventTimeStart_Minutes = eventDateNum.substring(eventDateNum.length-6).slice(0,2);

    let eventTimeEnd_Hour = eventDateNum.substring(eventDateNum.length-4).slice(0,2);
    let eventTimeEnd_Minutes = eventDateNum.substring(eventDateNum.length-2);


    if(eventData.hostId != currentUserId){
        alert("u shall not pass")
    } else {
        /**************** DISPLAY EXISTING EVENT INFO ****************/
        console.log("hi "+ userData.firstName);

        document.getElementById("name").value = eventName;

        // location need tomtom

        // display event date & start time
        document.getElementById("datetime").setAttribute("value",`${eventYear}-${eventMonth}-${eventDay}T${eventTimeStart_Hour}:${eventTimeStart_Minutes}`)

        // display event end time
        document.getElementById("endTime").setAttribute("value", `${eventTimeEnd_Hour}:${eventTimeEnd_Minutes}`);

        // display event price
        document.getElementById("price").value = eventPrice;

        // display event max participants
        document.getElementById("number").value = eventParticipants;

        // go through list of event's applied tags (array)
        for(let i=0; i<eventTags.length; i++){
            // go through each checkbox
            // if it matches a tag from the array, check it
            document.getElementsByName("categoryList").forEach(aa => {
                if(aa.getAttribute("value") == eventTags[i]){
                    aa.setAttribute("checked","")
                }
            })
        }

        // display event description
        document.getElementById("desc").value = eventDesc;

        // display event images
        for(let i=0; i<eventIMGs.length; i++){
            let cloneIMG = document.querySelector(".image-wrap").cloneNode(true);
            cloneIMG.querySelector(".image").setAttribute("src",eventIMGs[i]);
            cloneIMG.removeAttribute("hidden");
            document.querySelector(".images-container").append(cloneIMG)
        }

        /*****************************************************************/
        /**************** GET UPDATED EVENT INFO (UI) ********************/
        /*****************************************************************/

        document.getElementById("submit").addEventListener("click", () => {

            //*********** get UPDATED NAME ***********//
            let editedEventName = document.getElementById("name").value;
            if(editedEventName == eventName){
                // nothingsChanged("event name");
            } else if(editedEventName == ""){
                cantBeEmpty("Event name", "empty")
            } else {
                updateEventName(targetEventId,editedEventName);
                saveOK();
            }

            //********* get UPDATED DATE & TIME *********//
            let editedEventDT = document.getElementById("datetime").value;
            editedEventDT = editedEventDT.replaceAll("-","").replaceAll("T","").replaceAll(":","");
            // alert(editedEventDT)

            let editedEventENDT = document.getElementById("endTime").value.replaceAll(":","");
            // alert(editedEventENDT)

            let comboUEventDT = "" + editedEventDT + editedEventENDT;

            if(comboUEventDT == eventTimestamp){
                // nothingsChanged("event date/time");
            } else {
                updateEventDate(targetEventId,comboUEventDT);
                saveOK();
            }

            //********* get UPDATED PRICE *********//
            let editedEventPrice = document.getElementById("price").value;
            if(editedEventPrice == eventPrice){
                // nothingsChanged("event price");
            } else if(editedEventPrice == ""){
                cantBeEmpty("Event price","empty")
            } else {
                updateEventPrice(targetEventId,editedEventPrice);
                saveOK();
            }

            //********* get UPDATED MAX PARTICIPANTS *********//
            let editedEventParticipants = document.getElementById("number").value;
            // not sure why for this field, "check if empty" has to
            // come BEFORE "if maxCapacity hasn't changed"

            if(editedEventParticipants == ""){
                cantBeEmpty("Number of participants","0")
            } else if(editedEventParticipants == "0"){
                cantBeEmpty("Number of participants","0")
            } else if(editedEventParticipants == eventParticipants){
                // nothingsChanged("event max participants");
            } else {
                updateEventMax(targetEventId,editedEventParticipants);
                saveOK();
            }

            //********* get UPDATED CATEGORIES/TAGS *********//

            let tagsToKill = [];
            let tagsToAdd = [];

            //------------ CHECKED ------------//
            let updCHECKED = document.querySelectorAll("input[name='categoryList']:checked");
            let updCHECKED_List = [];

            for(let i=0; i<updCHECKED.length; i++){
                updCHECKED_List.push(updCHECKED[i].value)
            }
            
            for(let z=0; z<updCHECKED_List.length; z++){
                let checkExisting = eventTags.findIndex(uwu => {
                    return uwu === updCHECKED_List[z]
                });

                // ADD THESE TAGS TO DB
                if(checkExisting < 0){
                    tagsToAdd.push(updCHECKED_List[z])
                }
            }

            if(tagsToAdd.length > 0){
                console.log("TO BE ADDED: " + tagsToAdd)
            }

            for(let i=0; i<tagsToAdd.length; i++){
                addEventTag(targetEventId,tagsToAdd[i])
            }

            //------------ UN-CHECKED ------------//
            let updUNCHECKED = document.querySelectorAll("input[name='categoryList']:not(:checked)");
            let updUNCHECKED_List = [];

            for(let i=0; i<updUNCHECKED.length; i++){
                updUNCHECKED_List.push(updUNCHECKED[i].value)
            }

            for(let z=0; z<updUNCHECKED_List.length; z++){
                let checkExisting = eventTags.findIndex(uwu => {
                    return uwu === updUNCHECKED_List[z]
                });

                // REMOVE THESE TAGS FROM DB
                if(checkExisting > -1){
                    tagsToKill.push(updUNCHECKED_List[z])
                }
            }

            if(tagsToKill.length > 0){
                console.log("TO BE KILLED: " + tagsToKill)
            }            

            for(let i=0; i<tagsToKill.length; i++){
                removeEventTag(targetEventId,tagsToKill[i])
            }

            // only save changes [tags] if stuff needs to be added/removed
            if(tagsToAdd.length > 0 || tagsToKill.length > 0){
                saveOK()
            }

            //********* get UPDATED DESCRIPTION *********//
            let editedEventDesc = document.getElementById("desc").value;
            // alert(editedEventDesc)

            if(editedEventDesc == eventDesc){
                // nothingsChanged("event desc");
            } else if(editedEventDesc == ""){
                cantBeEmpty("Event description", "blank")
            } else {
                updateEventDesc(targetEventId,editedEventDesc);
                saveOK();
            }

            //********* ADD AN EVENT IMAGE *********//
            // console.log(img)
            for(let i=0; i<img.length; i++){
                addEventImage(targetEventId,img[i]);
                saveOK();
            }

        })//end SUBMIT click
        
        //********* DELETE AN EVENT IMAGE *********//
        document.querySelectorAll(".delete-upload-img i").forEach(vvv => {
            vvv.addEventListener("click", () => {
                let imgTBD = vvv.parentNode.previousElementSibling.getAttribute("src");
                // alert(imgTBD)

                areYouSure("this image", imgTBD);
            })
        })

        // upload image
        $("input[type='file']").change(async function(){
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

                let eventBlock = document.querySelector(".image-wrap[hidden]");
                let clonedEvent = eventBlock.cloneNode(true);
                clonedEvent.removeAttribute("hidden");
                clonedEvent.querySelector(".image").src = url;
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
    }//end: check if user IS THE HOST
}//end if:currentUser

$(document).ready(function(){
    let editEventPopup = $(".del-popup:first").clone();
    editEventPopup.removeAttr("popup-type");
    editEventPopup.attr("popup-type","editEvent");
    $("body").prepend(editEventPopup);

    nothingsChanged = function(customText){
        $("[popup-type='editEvent'] #popup_action_2").hide();
        $("[popup-type='editEvent'] h3").html(`Your <span>${customText}</span> is the same.`);
        $("[popup-type='editEvent'] #popup_action_1").text("OK");
        $("[popup-type='editEvent']").fadeIn(popupFadeSpeed);

        $(document).on("click", "[popup-type='editEvent'] #popup_action_1", function(){
            $("[popup-type='editEvent']").fadeOut(popupFadeSpeed);
        });
    }

    cantBeEmpty = function(customTextA, customTextB){
        $("[popup-type='editEvent'] #popup_action_2").hide();
        $("[popup-type='editEvent'] h3").html(`<span>${customTextA}</span> cannot be ${customTextB}!`);
        $("[popup-type='editEvent'] #popup_action_1").text("OK");
        $("[popup-type='editEvent']").fadeIn(popupFadeSpeed);

        $(document).on("click", "[popup-type='editEvent'] #popup_action_1", function(){
            $("[popup-type='editEvent']").fadeOut(popupFadeSpeed);
        });
    }

    areYouSure = function(customText, whatURL){
        $("[popup-type='editEvent'] h3").html(`Are you sure you want to delete ${customText}?`);
        $("[popup-type='editEvent'] #popup_action_1").text("Delete");
        $("[popup-type='editEvent'] #popup_action_2").text("Cancel");
        $("[popup-type='editEvent']").fadeIn(popupFadeSpeed);

        $(document).on("click", "#[popup-type='editEvent'] #popup_action_1", function(){
            let that = this;
            removeEventImage(targetEventId,whatURL);

            $(that).text("Please wait...")

            setTimeout(() => {
                location.reload(true)
            },1000)
        });

        $(document).on("click", "[popup-type='editEvent'] #popup_action_2", function(){
            $("[popup-type='editEvent']").fadeOut(popupFadeSpeed);
        });
    }

    saveOK = function(){
        $("[popup-type='editEvent'] #popup_action_2").hide();
        $("[popup-type='editEvent'] h3").text("Changes saved successfully!");
        $("[popup-type='editEvent'] #popup_action_1").text("OK");
        $("[popup-type='editEvent']").fadeIn(popupFadeSpeed);

        $(document).on("click", "[popup-type='editEvent'] #popup_action_1", function(){
            location.reload(true);
        });
    }
})