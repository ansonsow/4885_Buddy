import * as dbf from "./app.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'


const user = dbf.auth.currentUser.email;


let q = query(collection(dbf.db, "users"), where("email", "==", user));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    currentUserId = doc.id;
});

const userDb = await getDoc(doc(dbf.db, "users",currentUserId));
// console.log();

document.getElementById("profile-picture").src= userDb.data().pfpURL;