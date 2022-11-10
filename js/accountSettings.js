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

//Created a function to route the current page to forgot password page
document.getElementById('changepass').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Re-directed to forgot passwords page!");
    // alert("Button is clicked");
    setTimeout(()=>{
        window.location.href= "./forgotPassword.html";
    },1000)

});