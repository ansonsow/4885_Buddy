import * as dbf from "./app.js"

let defaultIcon = "https://firebasestorage.googleapis.com/v0/b/buddy-a478e.appspot.com/o/defaultIcon.png?alt=media&token=2d9e8a49-c653-46b0-9f26-d1fd3ef3d286";

contentLoaded(awaitjQ)

function awaitjQ(){
    let oiavz = Date.now();
    let anygx = 2500;
    
    let elymd = setInterval(() => {
        if(Date.now() - oiavz > anygx){
            clearInterval(elymd);
        } else {
            if(typeof jQuery !== undefined){
                if($(".del-popup").length){
                    clearInterval(elymd);
                    signup_popup();
                }                
            }	
        }
    },0);
}

function signup_popup(){
    $(document).ready(function(){
        document.getElementById("btnsignup").onclick=async ()=>{
            $(".popup-msg h3").empty();
            $("#popup_action_1").text("OK");
            $("#popup_action_2").hide();
            $("#btnsignup").text("Processing...");
            $("#btnsignup").addClass("push-hovered");

            // if password =/= confirmed password
            if(psw.value != pswRepeat.value) {
                // noteToUser.innerHTML="Password and Confirmed password not the same"
                $(".popup-msg h3").text("Passwords do not match.");
                $(".del-popup").fadeIn(popupFadeSpeed);

                $(document).on("click", "#popup_action_1", function(){
                    $(".del-popup").fadeOut(popupFadeSpeed);
                    $("#btnsignup").text("Sign Up");
                    $("#btnsignup").removeClass("push-hovered");
                });
            } else {
                try {
                    await dbf.createAccount(email.value,psw.value)
                    .then(value=>{
                        console.log("value: " + value);
                        let valStr = value.toString();

                        if(value == true){
                            // sign up successful!!!!!!!!!
                            // the user should be kicked to the login page
                            // noteToUser.innerHTML = "SUCCESS"
                            dbf.writeUserData(username.value, fName.value, lName.value, email.value, [], defaultIcon,[])
                            // alert("successfully signed up")

                            // account successfully created
                            $(".popup-msg h3").html(`Account created.<br>Thank you for joining us, <span>${username.value}</span>!`);
                            $("#popup_action_1").text("Log In");
                            $(".del-popup").fadeIn(popupFadeSpeed);

                            $(document).on("click", "#popup_action_1", function(){
                                window.location.href="./login.html";
                            });
                            
                        } else {
                            // if email already exists
                            if(valStr.indexOf("email-already-in-use") > -1){
                                $(".popup-msg h3").html("Seems like you've already registered with us.<br>Please log in to continue!");
                                $("#popup_action_1").text("Log In");
                                $(".del-popup").fadeIn(popupFadeSpeed)

                                $(document).on("click", "#popup_action_1", function(){
                                    window.location.href="./login.html";
                                });
                            }

                            // if password is less than 6 characters
                            else if(valStr.indexOf("weak-password") > -1){
                                $(".popup-msg h3").text("Your password must be at last 6 characters long.");
                                $("#popup_action_1").text("OK");
                                $(".del-popup").fadeIn(popupFadeSpeed);

                                $(document).on("click", "#popup_action_1", function(){
                                    $(".del-popup").fadeOut(popupFadeSpeed);
                                    $("#btnsignup").text("Sign Up");
                                    $("#btnsignup").removeClass("push-hovered");
                                });
                            }

                            // other
                            else if(valStr.indexOf("invalid-email") > -1){
                                // noteToUser.innerHTML = value.substring(' ' + 10);
                                $(".popup-msg h3").text("Please check your information and try again!");
                                $("#popup_action_1").text("OK");
                                $(".del-popup").fadeIn(popupFadeSpeed);

                                $(document).on("click", "#popup_action_1", function(){
                                    $(".del-popup").fadeOut(popupFadeSpeed);
                                    $("#btnsignup").text("Sign Up");
                                    $("#btnsignup").removeClass("push-hovered");
                                });
                            }
                        }
                    })

                    // console.log(userMessage);
                } catch (error) {
                    console.log("error: " + error)                    
                    
                    // other error catching
                    $(".popup-msg h3").text("We're sorry, please try again!");
                    $("#popup_action_1").text("OK");
                    $(".del-popup").fadeIn(popupFadeSpeed);

                    $(document).on("click", "#popup_action_1", function(){
                        $(".del-popup").fadeOut(popupFadeSpeed);
                        $("#btnsignup").text("Sign Up");
                        $("#btnsignup").removeClass("push-hovered");
                    });
                }
            }
        };//end signup click
    })//end docready
}//end signup_popup()