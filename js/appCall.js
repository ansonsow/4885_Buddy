// import * as dbf from "./app.js"

import {Firestore, query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();

// example of reading info from db

// all documents in a collection


// let q = query(collection(db, "events"), where("hostId", "==", "testHostId (str, 20)"), where("name","==","testEventname1 (str, 20)"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id);
// });

// single document
// const querySnapshot2 = await getDoc(doc(db, "events","uGfj5SGWqdBIdFsM7Lie"));
// console.log(querySnapshot2.data());

// single field
// const querySnapshot2 = await getDoc(doc(db, "events","uGfj5SGWqdBIdFsM7Lie"));
// console.log(querySnapshot2.data().price);

// example of call the db function outside of appjs
// document.getElementById("btnsignup").onclick=async ()=>{
//     dbf.createAccount(email.value,psw.value)
// };


// console.log(new Date());