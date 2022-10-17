import * as dbf from "./app.js"



document.getElementById("btnsignup").onclick=async ()=>{
    if(psw.value != pswRepeat.value) {
        noteToUser.innerHTML="Password and Confirmed password not the same"
    }else{
        try {
            await dbf.createAccount(email.value,psw.value)
            .then(value=>{
                console.log(value);
                if(value == true){
                    // sign up successful!!!!!!!!!
                    // the user should be kicked to the login page
                    noteToUser.innerHTML = "SUCCESS"
                    dbf.writeUserData(username.value, fName.value, lName.value, email.value, [], "")
                }else{
                    noteToUser.innerHTML = value.substring(' ' + 10);
                }
            })

            // console.log(userMessage);
        } catch (error) {
            console.log(error)
        }
    }
};