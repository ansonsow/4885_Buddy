// This file is only for function that calls the database

// Import the functions you need from the SDKs
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
import { getAnalytics} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js'
import {Firestore, getFirestore, collection, doc, updateDoc, getDocs,getDoc, addDoc, deleteDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator, signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {getStorage,ref, uploadBytes} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js' //importaed firebase storage 





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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const storage = getStorage(); //Created a const to store
// export const storageRef = ref(storage, 'some-child');
// export const toUpload =  uploadBytes(storageRef, ).then((snapshot)=>{
//   console.log("File Uploaded!");
// }); //Reference to storage
export const db = getFirestore();
export const auth = getAuth(app);

// reference DB structure – USERS:
// https://cdn.discordapp.com/attachments/1014951045820072017/1028394035066437724/unknown.png

// reference DB structure – EVENTS:
// https://cdn.discordapp.com/attachments/1014951045820072017/1028394130700779530/unknown.png

// test EVENTS id: uGfj5SGWqdBIdFsM7Lie

// retriving data from event collection and id uGfj5SGWqdBIdFsM7Lie document's description field
const querySnapshot = await getDoc(doc(db, "events","uGfj5SGWqdBIdFsM7Lie"));
// safsdf.innerHTML = querySnapshot.data().description;

// ============================================== add new user ==============================================
export async function writeUserData(userName, fname, lname, email, eventId, pfpURL, favEvent){

  try {
    const docRef = await addDoc(collection(db, "users"), {
    username: userName,
    firstName: fname,
    lastName: lname,
    email: email,
    events: eventId,
    pfpURL: pfpURL,
    favouriteEvents: favEvent
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



// writeUserData("testUsername1 (str,20)","testFirstName (str, 20)", "testLastName (str, 20)","testEmail@aaa.aaa (str, 100))","([str], 20)","url (str, 2048)");
// writeUserData("coolGuyRyan","Ryan", "Cool","ryaniscool@gmail.com",["eventRyanIsGoing"],"https://github.com/ansonsow/4885_Buddy/blob/main/images/unsplash_ryan_3JmfENcL24M.png?raw=true",["eventsRyanFavourite"]);


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
      events: arrayUnion(event)
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
      events: arrayRemove(event)
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



export async function addUserFavEvent(id,event){

  const docSnap = await getDoc(doc(db, "events", event));
  if(docSnap.exists()){
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      favouriteEvents: arrayUnion(event)
    });
  }else{
    console.log("event do not exist");
  }
}



// addUserEvent("K8OjYqy2PVL3yF94OavC", "wat da fak")
// addUserEvent("K8OjYqy2PVL3yF94OavC", "([str], 20)")

// --------------------------------------------


export async function removeUserFavEvent(id,event){
  
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "users", id));
  if(snapShot.data().event.includes(event)){
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      favouriteEvents: arrayRemove(event)
    });
  }
  else{
    console.log("event do not exist in the user's list");
  }
}

// removeUserEvent("hPJQxUZYKQLKVWqkHxou","new event2")




// --------------------------------------------

const getTimeEpoch = () => {
  return new Date().getTime().toString();                             
}

// console.log(getTimeEpoch());
// console.log(new Date().getDate());





// ============================================== add new Event ==============================================
// dont know how to do date and / photo yet
export async function writeEventData(name, hostId, price, coverImage ,pfpURL, location, dateCreated, dateOfEvent, description, numOfPeople, maxCapacity, eventStatus, tag, review){
  try {
    const docRef = await addDoc(collection(db, "events"), {
    name: name,
    hostId: hostId,
    price: price,
    coverImage: coverImage,
    images: pfpURL,
    location: location,
    dateCreated: new Date(),
    dateOfEvent: dateOfEvent,
    description: description,
    numOfPeople: numOfPeople,
    maxCapacity: maxCapacity,
    eventStatus: eventStatus,
    tags: tag,
    reviews: review,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


// YOATT4NtjFXekPYOC0Ng
// writeEventData("Ryan cool event 4","YOATT4NtjFXekPYOC0Ng",
// "0","https://github.com/ansonsow/4885_Buddy/blob/main/images/unsplash_concert_hTv8aaPziOQ.jpeg?raw=true",
// [""], [ -123.1207,49.2827] ,"20221009 (num)","20221109 (num)",
// "Ryan's fourth cool event","2","3",
// "1",["D8AvNmWcrgD0oPPdtOgv"],["music","performing"]);


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


export async function updateEventCoverImage(id,eventImage){
  // if(!isImage(eventImage)){
  //   console.log("url not valid or not an image");
  // }else{
    const db = getFirestore();
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, {
      coverImage: eventImage,
    });
  // }
}





export async function addEventImage(id,image){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    images: arrayUnion(image)
  });
}

// addEventTag("B3FW82VcBNZrwwl0py0w","tag1")

// addEventTag("B3FW82VcBNZrwwl0py0w","tag2")


export async function removeEventImage(id,image){
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "events", id));
  if(snapShot.data().images.includes(image)){
    const userRef = doc(db, "events", id);
    await updateDoc(userRef, {
      images: arrayRemove(image)
    });
  }else{
    console.log("tag do not exist");
  }
  // const db = getFirestore();

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

// updateEventLocation("B3FW82VcBNZrwwl0py0w",[90,90])


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

// removeEventTag("92RaEQhxmyG3xJLl82KM","tag1")
// removeEventTag("92RaEQhxmyG3xJLl82KM","tag2")




export async function addEventReview(id,review){
  const db = getFirestore();
  const userRef = doc(db, "events", id);
  await updateDoc(userRef, {
    reviews: arrayUnion(review)
  });
}

// addEventTag("B3FW82VcBNZrwwl0py0w","tag1")

// addEventTag("B3FW82VcBNZrwwl0py0w","tag2")


export async function removeEventReview(id,review){
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "events", id));
  if(snapShot.data().reviews.includes(review)){
    const userRef = doc(db, "events", id);
    await updateDoc(userRef, {
      reviews: arrayRemove(review)
    });
  }else{
    console.log("tag do not exist");
  }
  // const db = getFirestore();

}


export async function deleteEvent(id){
  const docSnap = await getDoc(doc(db, "events", id));
  if(docSnap.exists()){
    await deleteDoc(doc(db, "events", id));
  }else{
    console.log("event do not exist");
  }

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

// writeBadgeData(["U22dg94nYP5XOMdMGMSV"],"https://github.com/ansonsow/4885_Buddy/blob/main/images/badges_03.png?raw=true","highlyPraised",20)





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




// ============================================== add new review ==============================================
export async function writeReviewData(uId, image, point,description){
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
    authorId: uId,
    // targetEventId: eId,
    point: point,
    images: image,
    description: description,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// writeReviewData("ryan",["imageA","imageB"],"5","cool event")

// ============================================== update review info ==============================================


export async function updateReviewPoint(id, point){
  const db = getFirestore();
  const userRef = doc(db, "reviews", id);
  await updateDoc(userRef, {
    point: point,
  });
}

// updateReviewPoint("D8AvNmWcrgD0oPPdtOgv","4")

export async function updateReviewDesc(id, desc){
  const db = getFirestore();
  const userRef = doc(db, "reviews", id);
  await updateDoc(userRef, {
    description: desc,
  });
}



// updateReviewDesc("D8AvNmWcrgD0oPPdtOgv","aaa")

export async function addReviewImage(id,image){
  const db = getFirestore();
  const userRef = doc(db, "reviews", id);
  await updateDoc(userRef, {
    images: arrayUnion(image)
  });
}


export async function removeReviewImage(id,image){
  const db = getFirestore();

  const snapShot = await getDoc(doc(db, "reviews", id));
  if(snapShot.data().images.includes(image)){
    const userRef = doc(db, "reviews", id);
    await updateDoc(userRef, {
      images: arrayRemove(image)
    });
  }else{
    console.log("tag do not exist");
  }
}

// addReviewImage("D8AvNmWcrgD0oPPdtOgv","picture1")
// removeReviewImage("D8AvNmWcrgD0oPPdtOgv","picture1")


// export async function updateReviewImage(id, image){
//     const db = getFirestore();
//     const userRef = doc(db, "reviews", id);
//     await updateDoc(userRef, {
//       image: image,
//     });
// }

// updateReviewImage("D8AvNmWcrgD0oPPdtOgv","")

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
    return true
    }
    catch(error){
      return(error.message);
    }
}

// const auth = getAuth();
// export async function login (email,password){
//   try{  
//     // await signInWithEmailAndPassword(auth, email, password)
    
//     // signInWithEmailAndPassword(auth, email, password)
//     // .then((userCredential) => {
//     //   const user = userCredential.user;
//     // })
//     // .catch((error) => {
//     //   console.log(error.message);
//     //   return error.message
//     //   const errorCode = error.code;
//     //   const errorMessage = error.message;
//     // });
//   }
//   catch(error){
//     console.log(error);
//   }

// }




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
//---------------------------------------------------------------------------------
