import * as dbf from "./app.js"



document.getElementById("btnsignup").onclick=async ()=>{
    if(psw.value != pswRepeat.value) {
        noteToUser.innerHTML="Password and Confirmed password not the same"
    }else{
        let userMessage;
        if(userMessage=dbf.createAccount(email.value,psw.value)){
            //sign up successful!!!!!!!!!
            // the user should be kicked to the login page
            noteToUser.innerHTML = "SUCC"
            // writeUserData(userName, fname, lname, email, eventId, pfpURL)
            // dbf.writeUserData(username.value, fName.value, lName.value, email.value,[],"")
            
        }else{
            userMessage.then(value=>{
                noteToUser.innerHTML = value.substring(' ' + 10);
            }).catch(err=>{
                console.log(err);
            })
        }
    }
};