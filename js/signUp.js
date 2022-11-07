import * as dbf from "./app.js"

let defaultIcon = "https://firebasestorage.googleapis.com/v0/b/buddy-a478e.appspot.com/o/defaultIcon.png?alt=media&token=2d9e8a49-c653-46b0-9f26-d1fd3ef3d286"


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
                    dbf.writeUserData(username.value, fName.value, lName.value, email.value, [], defaultIcon,[])
                    alert("successfully sign up")
                    setTimeout(()=>{
                        window.location.href="./login.html";
                    },1000)
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