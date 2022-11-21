import * as dbf from "./app.js"
import {getFirestore, query,collection,where,getDocs,getDoc} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
const db = getFirestore();
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

contentLoaded(awaitjQ)

let yoozaName;

function awaitjQ(){
    let logDateNow = Date.now();
    let logStop = 2500;
    
    let syyhg = setInterval(() => {
        if(Date.now() - logDateNow > logStop){
            clearInterval(syyhg);
        } else {
            if(typeof jQuery !== undefined){
                if($(".del-popup").length){
                    clearInterval(syyhg);
                    login_success_popup();
                }                
            }	
        }
    },0);
}

function login_success_popup(){
    $(document).ready(function(){
        let prophet = $(".del-popup:first").clone();
        prophet.removeAttr("popup-type");
        prophet.attr("popup-type","login-message");
        $("body").prepend(prophet);

        $("h3", prophet).empty();
        $("#popup_action_1", prophet).text("OK");
        $("#popup_action_2", prophet).hide();

        document.getElementById("logIn").onclick=async (e)=>{
            e.preventDefault;

            document.getElementById("logIn").textContent = "Processing...";
            document.getElementById("logIn").classList.add("push-hovered")
            
            signInWithEmailAndPassword(dbf.auth, email.value, password.value)
            .then((userCredential) => {
                // noteToUser.innerHTML = "SUCCESS";

                // $(".del-popup").fadeIn(popupFadeSpeed)

                const user = userCredential.user;
                let q = query(collection(db, "users"), where("email", "==", email.value));
                const querySnapshot = getDocs(q);
                querySnapshot.then(value=>{
                    value.forEach(element => {
                        localStorage.setItem("currentUserId",element.id)
                        yoozaName = element.data().username
                    });
                })

                let ubibn = Date.now();
                let nswlq = 1000;
                
                let glihp = setInterval(() => {
                    if(Date.now() - ubibn > nswlq){
                        clearInterval(glihp);
                    } else {
                        if(typeof yoozaName !== "undefined"){
                            clearInterval(glihp);
                            $("h3", prophet).html(`Login successful.<br>Hello, <span>${yoozaName}</span>!`);
                            prophet.fadeIn(popupFadeSpeed)
                        }
                    }
                },0);

                // alert("successfully logged in")
                
                $(document).on("click", "[popup-type='login-message'] #popup_action_1", function(){
                    window.location.href="../html/main.html";
                });
            })
            .catch((error) => {
                console.log(error.message.substring(' ' + 10));
                // noteToUser.innerHTML = error.message.substring(' ' + 10);

                $("h3", prophet).empty();
                $("h3", prophet).html("Account not found.<br>Please try again.");

                $("#popup_action_1", prophet).text("OK");
                
                setTimeout(() => {
                    prophet.fadeIn(popupFadeSpeed);
                },699)

                $(document).on("click", "[popup-type='login-message'] #popup_action_1", function(){
                    prophet.fadeOut(popupFadeSpeed);
                    $("#logIn").removeClass("push-hovered");
                    $("#logIn").text("Log In");
                });

                const errorCode = error.code;
                const errorMessage = error.message;
            });    
        };//end logIn button click
    });//end docready
}//end login_success_popup()


// $(document).ready(function(){
// });