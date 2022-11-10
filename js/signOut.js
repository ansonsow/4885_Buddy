import{logout} from "./app.js";
// import * as dbf from "./app.js"

//Check lins from 795 in app.js
//Created a function to perform singout operation using Firebase's singOut() method
document.getElementById("signout").addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Button is clicked!");
    logout();
    });

document.getElementById("update").addEventListener('click', ()=>{
    alert("This button is working!");
    console.log("Profile is updated!");
});