import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc,doc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
// const db = getFirestore();



// ***** If use date input *****
// eventDate.addEventListener('change', function (){
//     console.log(new Date(eventDate.value));
// })

// ***** If use time input *****


let testEventId = "GM7n7SlsJTYiUZecZsUX";
//this page's event id 
let targetEventId = testEventId;
let currentUser = dbf.auth.currentUser;
let currentUserEmail;

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
    const eventData = eventJson.data()
    console.log(eventData);

    if(eventData.hostId != currentUserId){
        alert("u shall not pass")
    }else{
        console.log("hi "+ userData.firstName);
        document.getElementById("eventName").placeholder=eventData.name
        // location need tomtom
        // datetime not sure yet
        document.getElementById("eventPrice").placeholder=eventData.price
        document.getElementById("eventNumOfPeople").placeholder=eventData.maxCapacity
        // category needs overhall
        document.getElementById("eventDesc").placeholder=eventData.description


    }

}





eventDate.addEventListener('change', function (){
    const datetime = eventDate.value;
    const date= datetime.split("T")[0];
    const time = datetime.split("T")[1];

    console.log(datetime)
    console.log(`Date_${date}, Time_${time}`)
})

eventEndTime.addEventListener('change', function (){
    const time = eventEndTime.value;
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];

    console.log(time)
    console.log(`Hour_${hours}, Minutes_${minutes}`)
})

// ---------------------------------------------------
const submitBtn = document.getElementById('submit')

submitBtn.addEventListener('click', () => {
    const eventName = document.getElementById('eventName').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const numberOfParticipants = document.getElementById('eventNumOfPeople').value;
    const eventPrice = document.getElementById('eventPrice').value;
    const eventDesc = document.getElementById('eventDesc').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('eventDate').value.split("T")[0];
    const startTime = document.getElementById('eventDate').value.split("T")[1];
    const endTime = document.getElementById('eventEndTime').value;
     
    
    console.log({
    eventName,
    eventLocation,
    numberOfParticipants,
    eventPrice,
    eventDesc,
    category,
    date,
    startTime,
    endTime
    })
})