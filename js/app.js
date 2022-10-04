// Import the functions you need from the SDKs you need
// import { initializeApp } from "/firebase/app";
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
// import { getAnalytics } from "/firebase/analytics";
import { getAnalytics} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js'
import {getDatabase, set, get, update, remove, ref, child} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js'




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
const db = getDatabase();

const dbref = ref(db);

// reference DB structure:
// https://media.discordapp.net/attachments/1019654199077773322/1026680643595276408/unknown.png

// temporary test events/id: 1664847154304

get(child(dbref, "events/1664847154304/description")) 
.then((snapshot)=>{
  safsdf.innerHTML = snapshot.val();
})

function writeUserData(userName, name, email,badge) {
  const db = getDatabase();
  set(ref(db, "users/"+ userName), {
    username: name,
    email: email,
    badge: badge,
  });
}

writeUserData("testUser1","test","test@test.com","1")
writeUserData("testUser2","test2","test2@test.com","1,2")


const getTimeEpoch = () => {
  return new Date().getTime().toString();                             
}


// dont know how to do date and time / location / photo yet
function writeEventData(eId,name,number,price,description,userName){
  const db = getDatabase();
  set(ref(db, "events/"+eId),{
    eventName: name,
    number: number,
    price: price,
    description: description,
    timeOfCreation: new Date(),
    userName: userName,
  })
}

// writeEventData(getTimeEpoch(),"testEvent",1,0,"hi this is test event","test");

function writeMessageData(mId,user1,user2,direction,text){
  const db = getDatabase();
  set(ref(db,"message/"+mId),{
    user1:user1,
    user2:user2,
    direction:direction,
    text:text,
    time:new Date(),
  })
}

// writeMessageData(getTimeEpoch(),"test","test2",">","hi this is test1")

function writeBadgeData(bId,image,name,point){
  const db = getDatabase();
  set(ref(db,"badges/"+bId),{
    image: image,
    name: name,
    point: point,
  })
};

writeBadgeData(1,"badge.com","badge1",1)
writeBadgeData(2,"badge2.com","badge2",2)