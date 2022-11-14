import * as dbf from "./app.js"
import {sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// console.log(email);

contentLoaded(awaitjQ)

function awaitjQ(){
    let adqua = Date.now();
    let qjzym = 2500;
    
    let fkfcx = setInterval(() => {
        if(Date.now() - adqua > qjzym){
            clearInterval(fkfcx);
        } else {
            if(typeof jQuery !== undefined){
                if($(".del-popup").length){
                    clearInterval(fkfcx);
                    result_popup(); 
                }   
            }	
        }
    },0);
}

function result_popup(){
    $(document).ready(function(){
        $("#popup_action_1").text("OK");
        $("#popup_action_2").hide();
        
        document.getElementById("reset").onclick=async (e)=>{
            e.preventDefault();
            document.getElementById("reset").textContent = "Processing...";
            document.getElementById("reset").classList.add("push-hovered")

            $(".popup-msg h3").empty();

            let email = document.getElementById("email").value;
            // console.log(email);

            sendPasswordResetEmail(dbf.auth, email)
            .then(() => {
                console.log("Email exists, password reset sent to that email.");
                $(".popup-msg h3").text("Password reset email sent!");
                $(".del-popup").fadeIn(popupFadeSpeed)
                // document.getElementById("noteToUser").innerHTML = "password reset email sent"
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message.substring(' ' + 10));

                if(email.indexOf("@") < 0){
                    $(".popup-msg h3").html("Please enter a valid email address.");
                } else {
                    $(".popup-msg h3").html("Email not found.<br>Please try again.");
                }

                $(".del-popup").fadeIn(popupFadeSpeed)
                // document.getElementById("noteToUser").innerHTML = error.message.substring(' ' + 10);
            });

            $(document).on("click", "#popup_action_1", function(){
                $(".del-popup").fadeOut(popupFadeSpeed);
                $("#reset").text("Send");
                $("#reset").removeClass("push-hovered")
            });
        }//end button click
    });//end docready
}//end func

/**********************************************************/

//Created a function to route the current page to forgot password page
document.getElementById("changepass").addEventListener('onclick', (e)=>{
    e.preventDefault();
    console.log("button is clicked!");
    setTimeout(()=>{
        window.location.href="./forgotpassword.html";
    },1000)

});
