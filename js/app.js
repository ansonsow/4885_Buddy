// This file is only for function that calls the database

// Import the functions you need from the SDKs you need
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
import { getAnalytics} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js'
import {Firestore, getFirestore, collection, doc, updateDoc, getDocs,getDoc, addDoc, deleteDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator, signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";





// Firebase configuration
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
const auth = getAuth(app);

// reference DB structure – USERS:
// https://cdn.discordapp.com/attachments/1014951045820072017/1028394035066437724/unknown.png

// reference DB structure – EVENTS:
// https://cdn.discordapp.com/attachments/1014951045820072017/1028394130700779530/unknown.png

// test EVENTS id: uGfj5SGWqdBIdFsM7Lie

// retriving data from event collection and id uGfj5SGWqdBIdFsM7Lie document's description field
const querySnapshot = await getDoc(doc(db, "events","uGfj5SGWqdBIdFsM7Lie"));
// safsdf.innerHTML = querySnapshot.data().description;

// ============================================== add new user ==============================================
export async function writeUserData(userName, fname, lname, email, eventId, pfpURL){

  try {
    const docRef = await addDoc(collection(db, "users"), {
    username: userName,
    firstName: fname,
    lastName: lname,
    email: email,
    event: eventId,
    pfpURL: pfpURL
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



// writeUserData("testUsername1 (str,20)","testFirstName (str, 20)", "testLastName (str, 20)","testEmail@aaa.aaa (str, 100))","([str], 20)","url (str, 2048)");


// ============================================== update user info ==============================================
// test USER id: hPJQxUZYKQLKVWqkHxou

export async function updateUserUsername(id,uname){
  if(uname.length>20){
    console.log(uname+" exceed the 20 word count");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      username: uname,
    });
  }

}

// updateUserUsername("hPJQxUZYKQLKVWqkHxou","update unameaaa")


// --------------------------------------------

export async function updateUserLastName(id,lname){
  if(lname.length>20){
    console.log(lname+" exceed the 20 words count");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      lastName: lname,
    });
  }

}

// updateUserLastName("hPJQxUZYKQLKVWqkHxou","updateL")

// --------------------------------------------

export async function updateUserFirstName(id,fname){
  if(fname.length>20){
    console.log(fname+" exceed the 20 words count");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      firstName: fname
    });
  }

}

// updateUserFirstName("hPJQxUZYKQLKVWqkHxou","updateF")

// --------------------------------------------

export async function updateUserEmail(id,email){
  if(email.length>100){
    console.log(email=" exceed the 100 words count");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      email: email
    });
  }

}

// updateUserEmail("hPJQxUZYKQLKVWqkHxou","update Email")

// --------------------------------------------

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)&&(url.length<1024);
}


export async function updateUserPicture(id,pfpURL){
  // if(!isImage(pfpURL)){
  //   console.log("url not valid or not an image");
  // }else{
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      pfpURL: pfpURL
    });
  // }

}

// updateUserPicture("hPJQxUZYKQLKVWqkHxou","update URL")

// --------------------------------------------




export async function addUserEvent(id,event){

  const docSnap = await getDoc(doc(db, "events", event));
  if(docSnap.exists()){
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      event: arrayUnion(event)
    });
  }else{
    console.log("event do not exist");
  }
}



// addUserEvent("K8OjYqy2PVL3yF94OavC", "wat da fak")
// addUserEvent("K8OjYqy2PVL3yF94OavC", "([str], 20)")

// --------------------------------------------


export async function removeUserEvent(id,event){
  
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "users", id));
  if(snapShot.data().event.includes(event)){
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      event: arrayRemove(event)
    });
  }
  else{
    console.log("event do not exist in the user's list");
  }
}

// removeUserEvent("hPJQxUZYKQLKVWqkHxou","new event2")

// --------------------------------------------

export async function deleteUser(id){
  const docSnap = await getDoc(doc(db, "users", id));
  if(docSnap.exists()){
    await deleteDoc(doc(db, "users", id));
  }else{
    console.log("user do not exist");
  }

}

// deleteUser("aaa")

// --------------------------------------------

const getTimeEpoch = () => {
  return new Date().getTime().toString();                             
}

// console.log(getTimeEpoch());
// console.log(new Date().getDate());


// ============================================== add new Event ==============================================
// dont know how to do date and location / photo yet
export async function writeEventData(name, hostId, price, pfpURL, location, dateCreated, dateOfEvent, description, numOfPeople, maxCapacity, eventStatus, tag){
  try {
    const docRef = await addDoc(collection(db, "events"), {
    name: name,
    hostId: hostId,
    price: price,
    image: pfpURL,
    location: location,
    dateCreated: new Date(),
    dateOfEvent: dateOfEvent,
    description: description,
    numOfPeople: numOfPeople,
    maxCapacity: maxCapacity,
    eventStatus: eventStatus,
    tags: tag,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// writeEventData("testEventname1 (str, 20)","testHostId (str, 20)",
// "0 (num)","imgURL.aaa (str, 2048)","location (num)","20221009 (num)","20221109 (num)","test description (str, 2048)","2 (num)","3 (num)",
// "1 (num)","aaa");



// ============================================== update event info ==============================================
// test EVENTS id: uGfj5SGWqdBIdFsM7Lie

export async function updateEventName(id,eventName){
  if(eventName.length>20){
    console.log("event name excced 20 characters");
  }else{
    const db = getFirestore();
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, {
      name: eventName,
    });
  }
}

// updateEventName("uGfj5SGWqdBIdFsM7Lie","updateEvent")




export async function updateEventPrice(id,eventPrice){
  if(isNaN(eventPrice)){
    console.log("not a number");
  }else{
    const db = getFirestore();
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, {
      price: eventPrice,
    });
  }
}


// updateEventPrice("uGfj5SGWqdBIdFsM7Lie","$6")


export async function updateEventImage(id,eventImage){
  // if(!isImage(eventImage)){
  //   console.log("url not valid or not an image");
  // }else{
    const db = getFirestore();
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, {
      image: eventImage,
    });
  // }
}

// updateEventImage("hkHdS7xIYAVtg1W1OXBZ","https://unsplash.com/photos/E-6M5FExlbk")

// still dont know tomtom yet
export async function updateEventLocation(id,eventLocation){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    location: eventLocation,
  });
}

// updateEventLocation("uGfj5SGWqdBIdFsM7Lie","newLocation")


// not sure what is format is
export async function updateEventDate(id,eventDate){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    dateOfEvent: eventDate,
  });
}

// updateEventDate("uGfj5SGWqdBIdFsM7Lie","newDate")



export async function updateEventDesc(id,eventDesc){
  if(eventDesc.length>2048){
    console.log("description exceed 2048 charater count");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "events", id);
    await updateDoc(userRef, {
      description: eventDesc,
    });
  }
}

// updateEventDesc("uGfj5SGWqdBIdFsM7Lie","new description")


// number of ppl ++
export async function updateEventNum(id){
  const db = getFirestore();
  const userRef = doc(db, "events", id);

  const docSnap = await getDoc(userRef);        
  let numb = (num)(docSnap.data().numOfPeople)+1
  
  await updateDoc(userRef, {
    numOfPeople: numb,
  });
}

// updateEventNum("uGfj5SGWqdBIdFsM7Lie")

export async function updateEventMax(id,eventMax){
  if(isNaN(eventMax)){
    console.log("event max not a number");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "events", id);
    await updateDoc(userRef, {
      maxCapacity: eventMax,
    });
  }

}

// updateEventMax("uGfj5SGWqdBIdFsM7Lie",5)



export async function updateEventStatus(id,eventStat){
  if(isNaN(eventStat)){
    console.log("event stat not a number");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "events", id);
    await updateDoc(userRef, {
      eventStatus: eventStat,
    });
  }

}

// updateEventStatus("uGfj5SGWqdBIdFsM7Lie",2)

export async function addEventTag(id,tag){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    tags: arrayUnion(tag)
  });
}

// addEventTag("B3FW82VcBNZrwwl0py0w","tag1")

// addEventTag("B3FW82VcBNZrwwl0py0w","tag2")


export async function removeEventTag(id,tag){
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "events", id));
  if(snapShot.data().tags.includes(tag)){
    const userRef = doc(db, "events", id);
    await updateDoc(userRef, {
      tags: arrayRemove(tag)
    });
  }else{
    console.log("tag do not exist");
  }
  // const db = getFirestore();

}




// ============================================== add new badge ==============================================
export async function writeBadgeData(uId, image, name, point){
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

// writeBadgeData("","imageURL (str, 2048)","testBadgeName (str, 20)","5 (num)")




// ============================================== update badge info ==============================================
export async function addBadgeUser(id, uId){
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "users", uId));
  if(snapShot.exists()){
    const userRef = doc(db, "badges", id);
    await updateDoc(userRef, {
      userId: arrayUnion(uId)
    });
  }else{
    console.log("user not exist");
  }
  // const db = getFirestore();

}

// addBadgeUser("0Mwwe0xDCBSjWCvkB0Ef","bbbbbbbbbbb")
// addBadgeUser("0Mwwe0xDCBSjWCvkB0Ef","([str], 20)")

export async function updateBadgeImage(id, image){
  // if(!isImage(image)){
  //   console.log("url link is not an image");
  // }else{
    const db = getFirestore();
    const userRef = doc(db, "badges", id);
    await updateDoc(userRef, {
      image: image,
    });
  // }

}

export async function updateBadgeName(id, name){
  if(name.length>20){
    console.log("name exceed 20 word count");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "badges", id);
    await updateDoc(userRef, {
      name: name,
    });
  }

}

export async function updateBadgePoint(id, point){
  if(isNaN(point)){
    console.log(point+ "is not a number");
  }else{
    const db = getFirestore();
    const userRef = doc(db, "badges", id);
    await updateDoc(userRef, {
      point: point,
    });
  }

}

// addBadgeUser("A3kE5jdVFjySfCCN6hjw","badgeUser0069");
// updateBadgeImage("A3kE5jdVFjySfCCN6hjw","https://cdn.discordapp.com/attachments/371018789673893898/1026580881260953680/unknown.png");
// updateBadgeName("A3kE5jdVFjySfCCN6hjw","coolBadge420");
// updateBadgePoint("A3kE5jdVFjySfCCN6hjw",6969);


//============User Authentication=================

//   connectAuthEmulator(auth, "https://localhost:9099");
// const loginEmailPassword = async () => {
//   const loginEmail = email.value;
//   const loginPassword = psw.value;

//   //To show user if worng password is enterted
//   try {
//   const userCredential  = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//   console.log(userCredential.user);
//   }
//   catch(error){
//     console.log(error);
//     //Need to write a funtion to show error message on UI
//   }

// }
// document.getElementById("btnLogin").addEventListener("click", loginEmailPassword);

//To create a new user account

export async function createAccount (email,password){
  try {
    const userCredential  = await createUserWithEmailAndPassword(auth, email, password); 
    // console.log(userCredential.user);
    // return("your account has created")
    return true
    }
    catch(error){
      // return(error);
      // console.log(error.message);
      return false
    }
}

// const auth = getAuth();
export async function login (email,password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // console.log(userCredential.user);
    const user = userCredential.user;
  })
  .catch((error) => {
    console.log(error.message);
    return error.message
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}




//To change UI
// const toMonitorAuthState  = async() => {
//   onAuthStateChanged(auth, user => {
//     if(user){
//       console.log(user);
//       showApp();
//       showLoginState(user);

//       hideLoginError();
//     }
//     else{
//       showLoginForm();
//       noteToUser.innerHTML = "You are not loggin in";
//     }
//   });
// }
// toMonitorAuthState();

//To logout 
// const logout = async()=>{
//   await signOut(auth);

// }
// document.getElementById("btnLogout").addEventListener("click", logout);
