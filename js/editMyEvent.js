import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
// const db = getFirestore();



// ***** If use date input *****
// eventDate.addEventListener('change', function (){
//     console.log(new Date(eventDate.value));
// })

// ***** If use time input *****
// eventEndTime.addEventListener('change', function (){
//     const time = eventEndTime.value;
//     const hours = time.split(":")[0];
//     const minutes = time.split(":")[1];

//     console.log(`End Time: ${hours}:${minutes}`)
// })

// ---------------------------------------------------

const submitBtn = document.getElementById('submit')

submitBtn.addEventListener('click', () => {
    const eventName = document.getElementById('eventName').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const numberOfParticipants = document.getElementById('eventNumOfPeople').value;
    const eventPrice = document.getElementById('eventPrice').value;
    const eventDesc = document.getElementById('eventDesc').value;
    const date = document.getElementById('eventDate').value.split("T")[0];
    const startTime = document.getElementById('eventDate').value.split("T")[1];
    const endTime = document.getElementById('eventEndTime').value;
     
    
    console.log({
    eventName,
    eventLocation,
    numberOfParticipants,
    eventPrice,
    eventDesc,
    date,
    startTime,
    endTime
    })
})