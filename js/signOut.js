import{logout} from "./app.js";
// import * as dbf from "./app.js"

//Check lins from 795 in app.js
//Created a function to perform singout operation using Firebase's singOut() method
document.getElementById("signout").addEventListener('onclick', (e)=>{
    e.preventDefault();
    console("Button is clicked!");
    logout();
    });