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
        let shacoPopup = $(".del-popup:first").clone();
        shacoPopup.removeAttr("popup-type");
        shacoPopup.attr("popup-type","forgot-password");
        $("body").prepend(shacoPopup);

        $("#popup_action_2", shacoPopup).hide();
        
        document.getElementById("reset").onclick=async (e)=>{
            e.preventDefault();
            document.getElementById("reset").textContent = "Processing...";
            document.getElementById("reset").classList.add("push-hovered")

            $("h3", shacoPopup).empty();

            let email = document.getElementById("email").value;
            // console.log(email);

            sendPasswordResetEmail(dbf.auth, email)
            .then(() => {
                console.log("Email exists, password reset sent to that email.");
                $("h3", shacoPopup).text("Password reset email sent!");
                $("#popup_action_1", shacoPopup).text("Log In");
                shacoPopup.fadeIn(popupFadeSpeed);
                // document.getElementById("noteToUser").innerHTML = "password reset email sent"

                $(document).on("click", "[popup-type='forgot-password'] #popup_action_1", function(){
                    window.location.href="./login.html";
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message.substring(' ' + 10));

                if(email.indexOf("@") < 0){
                    $("h3", shacoPopup).html("Please enter a valid email address.");
                } else {
                    $("h3", shacoPopup).html("Email not found.<br>Please try again.");
                }

                $("#popup_action_1", shacoPopup).text("OK");
                shacoPopup.fadeIn(popupFadeSpeed)
                // document.getElementById("noteToUser").innerHTML = error.message.substring(' ' + 10);

                $(document).on("click", "[popup-type='forgot-password'] #popup_action_1", function(){
                    $(".del-popup").fadeOut(popupFadeSpeed);
                    $("#reset").text("Send");
                    $("#reset").removeClass("push-hovered")
                });
            });
        }//end button click
    });//end docready
}//end func

/**********************************************************/

//Created a function to route the current page to forgot password page
// document.getElementById("changepass").addEventListener('onclick', (e)=>{
//     e.preventDefault();
//     console.log("button is clicked!");
//     setTimeout(()=>{
//         window.location.href="./forgotpassword.html";
//     },1000)

// });
