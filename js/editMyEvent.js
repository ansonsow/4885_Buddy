import $ from "./jquery.module.js";
import {db, addEventTag, removeEventTag} from "./app.js";
import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc,doc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
// const db = getFirestore();



let testEventId = "mvSF9RKBBnOPY0kcuQ8R";
//this page's event id 
let targetEventId = testEventId;
let currentUser = dbf.auth.currentUser;
let currentUserEmail;
let eventData;


if (currentUser) {
    // const currentUser = dbf.auth.currentUser.email;
    // TODO change to targetUser in the future

    currentUserEmail = currentUser.email;
    
    let q = query(collection(dbf.db, "users"), where("email", "==", currentUserEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentUserId = doc.id;
        console.log(doc.id);
    });


    const userJson = await getDoc(doc(dbf.db, "users", currentUserId));
    const userData = userJson.data()


    const eventJson = await getDoc(doc(dbf.db, "events", targetEventId));
    eventData = eventJson.data()
    console.log(eventData);

    /*************************** EVENT DATE ******************************* */

    let eventDateNum = eventData.dateOfEvent;
    let eventYear = eventDateNum.slice(0,4);
    let eventMonth = eventDateNum.substring(eventDateNum.length-12).slice(0,2);
    let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);

    // if first number of eventDay is a 0, remove that
    let dayFirstChara = eventDay.slice(0,1);
    if(dayFirstChara == "0"){
        eventDay = eventDay.slice(1,2);
    }

    /*************************** EVENT TIME ******************************* */

    let eventTimeStart_Hour = eventDateNum.substring(eventDateNum.length-8).slice(0,2);
    let eventTimeStart_Minutes = eventDateNum.substring(eventDateNum.length-6).slice(0,2);

    let eventTimeEnd_Hour = eventDateNum.substring(eventDateNum.length-4).slice(0,2);
    let eventTimeEnd_Minutes = eventDateNum.substring(eventDateNum.length-2);


    if(eventData.hostId != currentUserId){
        alert("u shall not pass")
    }else{
        console.log("hi "+ userData.firstName);
        document.getElementById("eventName").placeholder=eventData.name
        // location need tomtom

        document.querySelector("#eventStartDateTime").setAttribute("placeholder", `${eventDay}-${eventMonth}-${eventYear} , ${eventTimeStart_Hour} : ${eventTimeStart_Minutes}`);
        document.querySelector("#eventEndTime").setAttribute("placeholder", `${eventTimeEnd_Hour} : ${eventTimeEnd_Minutes}`);
        document.getElementById("eventPrice").placeholder=eventData.price
        document.getElementById("eventNumOfPeople").placeholder=eventData.maxCapacity
        // category ??
        document.getElementById("eventDesc").placeholder=eventData.description


    }

}


/*---------- GET ALL EVENTS ----------*/
let allEvents = [];
let theEventID;

let q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
    let eventOBJ = {};
    
    eventOBJ.id = doc.id;
    eventOBJ.tags = doc.data().tags;

    theEventID = doc.id;

    allEvents.push(eventOBJ);
});

/*---------- "SAVE/SUBMIT" BUTTON CLICK ----------*/
const submitBtn = document.getElementById('submit')

$(document).ready(function(){
    $("#popup_action_2").remove();

    $("#submit").click(function(){
        let currentEventTags;
        for(let i=0; i<allEvents.length; i++){
            // temporary event ID
            if(allEvents[i].id == "mvSF9RKBBnOPY0kcuQ8R"){
                currentEventTags = allEvents[i].tags;
            }
        }

        // ---------------------- CATEGORY ------------------------

        let tagValues = [];
        let checkboxes = document.getElementsByName("categoryList");
        
        for (let i=0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                tagValues.push(checkboxes[i].value)
            }
        }
        // ----------------------------------------------------

        // get "checked" box values
        const eventName = document.getElementById('eventName').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const numberOfParticipants = document.getElementById('eventNumOfPeople').value;
        const eventPrice = document.getElementById('eventPrice').value;
        const eventDesc = document.getElementById('eventDesc').value;
        const category = tagValues;
        const date = document.getElementById('eventStartDateTime').value.split("T")[0];
        const startTime = document.getElementById('eventStartDateTime').value.split("T")[1];
        const endTime = document.getElementById('eventEndTime').value;
        

        for(let i=0; i<category.length; i++){
            let checkExistingTag = currentEventTags.findIndex(scanTag => {
                return scanTag === category[i]
            })

            // if tag doesn't exist,
            // add the tag to the event
            if(checkExistingTag > -1){
                // alert(theEventID + " :" + category[i])
                removeEventTag(theEventID,category[i].toString())
            }
            
            // if tag ALREADY exists,
            // REMOVE the tag from the event
            else if(checkExistingTag == -1){      
                // alert(theEventID + " :" + category[i])      
                addEventTag(theEventID,category[i].toString())
            }
        }
        
        // console.log({
        // eventName,
        // eventLocation,
        // numberOfParticipants,
        // eventPrice,
        // eventDesc,
        // category,
        // date,
        // startTime,
        // endTime
        // })

        // remove existing <h3> text
        $(".del-popup h3").empty();

        // customize your <h3> text
        $(".del-popup h3").text("Changes applied successfully!");

        // customize your button 1 text
        $("#popup_action_1").text("OK");

        // fade in the pop-up
        $(".del-popup").fadeIn(popupFadeSpeed);
    })//end "save/submit" click
    
    /********************************************************************** */
    /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
    /********************************************************************** */

    $(document).on("click", "#popup_action_1", function(){
        let that = this; // don't touch this line

        setTimeout(() => {
            location.reload(true)
        },100)

        // do stuff
    });
})//end ready