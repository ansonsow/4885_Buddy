import {Firestore, query, getFirestore, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();

// var q = query(collection(db, "events"), where("hostId", "==", "testHostId (str, 20)"), where("name","==","testEventname1 (str, 20)"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id);
// });

// var imgArray = [];
var q = query(collection(db, "events"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.data().image);
});