// Import the functions you need from the SDKs you need
// import { initializeApp } from "/firebase/app";
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
// import { getAnalytics } from "/firebase/analytics";
import { getAnalytics} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js'
// import {getDatabase, set, get, update, remove, ref, child} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js'
import {getFirestore, collection, doc, updateDoc, getDocs, addDoc, deleteDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA35aDry2OtC2rifEFrkxWAyxBame5LPEw",
  authDomain: "buddy-a478e.firebaseapp.com",
  databaseURL: "https://buddy-a478e-default-rtdb.firebaseio.com",
  projectId: "buddy-a478e",
  storageBucket: "buddy-a478e.appspot.com",
  messagingSenderId: "787425029798",
  appId: "1:787425029798:web:8204439383fb651f954e67",
  measurementId: "G-1MB486TXQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();


// reference DB structure – USERS:
// https://cdn.discordapp.com/attachments/1014951045820072017/1028394035066437724/unknown.png

// reference DB structure – EVENTS:
// https://cdn.discordapp.com/attachments/1014951045820072017/1028394130700779530/unknown.png

// test EVENTS id: uGfj5SGWqdBIdFsM7Lie

// get(child(dbref, "events/1664847154304/description")) 
// .then((snapshot)=>{
//   safsdf.innerHTML = snapshot.val();
// })

const querySnapshot = await getDocs(collection(db, "events"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if(doc.id=="uGfj5SGWqdBIdFsM7Lie"){
    safsdf.innerHTML = doc.val;
  }
  
});


// ============================================== add new user ==============================================
async function writeUserData(userName, fname, lname, email, event, pfpURL){

  try {
    const docRef = await addDoc(collection(db, "users"), {
    username: userName,
    firstName: fname,
    lastName: lname,
    email: email,
    event: event,
    pfpURL: pfpURL
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



// writeUserData("testUsername1 String[50]","testFirstName String[50]",
// "testLastName String[50]","testEmail@aaa.aaa String[50]","1,2 Array[Number]","url");


// ============================================== update user info ==============================================
// test USER id: hPJQxUZYKQLKVWqkHxou

async function updateUserUsername(id,uname){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    username: uname,
  });
}

updateUserUsername("hPJQxUZYKQLKVWqkHxou","update uname")


// --------------------------------------------

async function updateUserLastName(id,lname){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    lastName: lname,
  });
}

updateUserLastName("hPJQxUZYKQLKVWqkHxou","updateL")

// --------------------------------------------

async function updateUserFirstName(id,fname){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    firstName: fname
  });
}

updateUserFirstName("hPJQxUZYKQLKVWqkHxou","updateF")

// --------------------------------------------

async function updateUserEmail(id,email){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    email: email
  });
}

updateUserEmail("hPJQxUZYKQLKVWqkHxou","update Email")

// --------------------------------------------

async function updateUserPicture(id,pfpURL){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    pfpURL: pfpURL
  });
}

updateUserPicture("hPJQxUZYKQLKVWqkHxou","update URL")

// --------------------------------------------

async function addUserEvent(id,event){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    event: arrayUnion(event)
  });
}

// addUserEvent("hPJQxUZYKQLKVWqkHxou","new event")
// addUserEvent("hPJQxUZYKQLKVWqkHxou","new event2")

// --------------------------------------------

async function removeUserEvent(id,event){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    event: arrayRemove(event)
  });
}

// removeUserEvent("hPJQxUZYKQLKVWqkHxou","new event")

// --------------------------------------------

async function deleteUser(id){
  await deleteDoc(doc(db, "users", id));
}

// deleteUser("ThE4mHCcIIGys1AeVCNu")

// --------------------------------------------

const getTimeEpoch = () => {
  return new Date().getTime().toString();                             
}


// dont know how to do date and time / location / photo yet
async function writeEventData(name, hostId, price, pfpURL, location, dateCreated, dateOfEvent, description, numOfPeople, maxCapacity, eventStatus){
  try {
    const docRef = await addDoc(collection(db, "events"), {
    name: name,
    hostId: hostId,
    price: price,
    image: pfpURL,
    location: location,
    dateCreated: dateCreated,
    dateOfEvent: dateOfEvent,
    description: description,
    numOfPeople: numOfPeople,
    maxCapacity: maxCapacity,
    eventStatus: eventStatus,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// writeEventData("test event","1","0","testPic.aaa","111","10/07/2022","06/09/2023","this is a test event","1","2","1")
// test EVENTS id: uGfj5SGWqdBIdFsM7Lie

async function updateEventName(id,eventName){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    name: eventName,
  });
}

updateEventName("uGfj5SGWqdBIdFsM7Lie","updateEvent")




async function updateEventPrice(id,eventPrice){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    price: eventPrice,
  });
}

updateEventPrice("uGfj5SGWqdBIdFsM7Lie","$6")


async function updateEventImage(id,eventImage){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    image: eventImage,
  });
}

updateEventImage("uGfj5SGWqdBIdFsM7Lie","newImageURL.aaa")


async function updateEventLocation(id,eventLocation){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    location: eventLocation,
  });
}

updateEventLocation("uGfj5SGWqdBIdFsM7Lie","newLocation")



async function updateEventDate(id,eventDate){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    dateOfEvent: eventDate,
  });
}

updateEventDate("uGfj5SGWqdBIdFsM7Lie","newDate")



async function updateEventDesc(id,eventDesc){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    description: eventDesc,
  });
}

updateEventDesc("uGfj5SGWqdBIdFsM7Lie","new description")

async function writeBadgeData(uId, image, name, point){
  try {
    const docRef = await addDoc(collection(db, "badges"), {
    name: name,
    userId: uId,
    point: point,
    image: image,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// writeBadgeData("hPJQxUZYKQLKVWqkHxou","imgurl.com","testBadgeName","5")
// writeBadgeData(1,"badge.com","badge1",1)
// writeBadgeData(2,"badge2.com","badge2",2)