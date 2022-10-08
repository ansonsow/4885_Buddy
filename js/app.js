// Import the functions you need from the SDKs you need
// import { initializeApp } from "/firebase/app";
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
// import { getAnalytics } from "/firebase/analytics";
import { getAnalytics} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js'
// import {getDatabase, set, get, update, remove, ref, child} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js'
import {getFirestore, collection, doc, updateDoc, getDocs, addDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'



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


// reference DB structure:
// https://media.discordapp.net/attachments/1019654199077773322/1026680643595276408/unknown.png

// temporary test events/id: uGfj5SGWqdBIdFsM7Lie

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
// test user id: hPJQxUZYKQLKVWqkHxou

async function updateUserLastName(id,lname){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    lastName: lname,
  });
}

updateUserLastName("hPJQxUZYKQLKVWqkHxou","updateL")

async function updateUserFirstName(id,fname){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    firstName: fname
  });
}

updateUserFirstName("hPJQxUZYKQLKVWqkHxou","updateF")


async function updateUserEmail(id,email){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    email: email
  });
}

updateUserEmail("hPJQxUZYKQLKVWqkHxou","update Email")


async function updateUserPicture(id,pfpURL){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    pfpURL: pfpURL
  });
}

updateUserPicture("hPJQxUZYKQLKVWqkHxou","update URL")

// updateUserevent("40V6aBT5jmbc2N3nkQ03", "Basket_Ball")

// add or remove event
// await updateDoc(userRef, {
//   event: arrayUnion(union)
// });

// await updateDoc(userRef, {
//   event: arrayRemove(union)
// });

async function addUserEvent(id,event){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    event: arrayUnion(event)
  });
}

// addUserEvent("hPJQxUZYKQLKVWqkHxou","new event")
// addUserEvent("hPJQxUZYKQLKVWqkHxou","new event2")

async function removeUserEvent(id,event){
  const db = getFirestore();
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    event: arrayRemove(event)
  });
}


removeUserEvent("hPJQxUZYKQLKVWqkHxou","new event")


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
// writeEventData(getTimeEpoch(),"testEvent",1,0,"hi this is test event","test");

// function writeMessageData(mId,user1,user2,direction,text){
//   const db = getDatabase();
//   set(ref(db,"message/"+mId),{
//     user1:user1,
//     user2:user2,
//     direction:direction,
//     text:text,
//     time:new Date(),
//   })
// }

// writeMessageData(getTimeEpoch(),"test","test2",">","hi this is test1")

function writeBadgeData(bId,image,name,point){
  const db = getDatabase();
  set(ref(db,"badges/"+bId),{
    image: image,
    name: name,
    point: point,
  })
};

// writeBadgeData(1,"badge.com","badge1",1)
// writeBadgeData(2,"badge2.com","badge2",2)