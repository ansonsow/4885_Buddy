import{logout } from "./app.js";
// import $ from "./jquery.module.js";
import * as dbf from "./app.js";
import {storage, auth, db, writeEventData, writeUserData} from './app.js';
import {sendPasswordResetEmail, deleteUser,verifyPasswordResetCode, confirmPasswordReset} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

//------------------ To Delete User Account --------------------------

document.getElementById("delete").addEventListener('click', e=>{
        e.preventDefault();
    const user = auth.currentUser;

deleteUser(user).then(() => {
  alert("Your account is deleted, See you again later!");
  console.log("See you again later!");
  setTimeout(()=>{
    window.location.href="./signUp.html";
},1000)

}).catch((error) => {
    console.log(error);
});

});
//-------------------------------------------


// function handleResetPassword(auth, actionCode, continueUrl, lang) {
//     // Localize the UI to the selected language as determined by the lang
//     // parameter.
  
//     // Verify the password reset code is valid.
//     verifyPasswordResetCode(auth, actionCode).then((email) => {
//       const accountEmail = email;
  
//       // TODO: Show the reset screen with the user's email and ask the user for
//       // the new password.
//       const newPassword = "...";
  
//       // Save the new password.
//       confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
//         // Password reset has been confirmed and new password updated.
  
//         // TODO: Display a link back to the app, or sign-in the user directly
//         // if the page belongs to the same domain as the app:
//         // auth.signInWithEmailAndPassword(accountEmail, newPassword);
  
//         // TODO: If a continue URL is available, display a button which on
//         // click redirects the user back to the app via continueUrl with
//         // additional state determined from that URL's parameters.
//       }).catch((error) => {
//         // Error occurred during confirmation. The code might have expired or the
//         // password is too weak.
//       });
//     }).catch((error) => {
//       // Invalid or expired action code. Ask user to try to reset the password
//       // again.
//     });
//   }




//--------------------------------------------

//Create a function to perform singout operation using Firebase's singOut() method
document.getElementById("signout").addEventListener('click', (e)=>{
    e.preventDefault();
    logout();
    setTimeout(()=>{
                window.location.href="./login.html";
            },1000)
    });

//To send a password reset email to user
document.getElementById('changepass').addEventListener('click', (e)=>{
    e.preventDefault();
    resetPassword();
    // handleResetPassword('./login.html');
    setTimeout(()=>{
        window.location.href="./login.html";
    },1000)
});

function resetPassword(){
    
        if (auth.currentUser) {
          alert("Password reset link is sent to  : " + auth.currentUser.email);
          let emailaddress = auth.currentUser.email;
          sendPasswordResetEmail(auth, emailaddress) 
          .then(() =>{
              console.log("Password reset link is sent to  : " + auth.currentUser.email);

          })
          .catch(error => {
              console.log(error);
          })
        } else {
          // User is signed out
          console.log("User is signed out!");
        }
}

//-----------For Uploading image------------------------------------

// var uploaded_image = "";

// document.getElementById("imageupload").addEventListener('click', () =>{
    
//     const reader = new FileReader();
//     reader.addEventListener('load', ()=>{
//         // uploaded_image = reader.result;
//         document.getElementById('picture').innerHTML = reader.result;
//     });
//     reader.readAsDataURL(this.files[0]);
// })


// //------------------------------------------------------------------

// var files = [];
// var reader =  new FileReader();

// var input = document.getElementById("imageupload");
// input.type = 'file';

// input.onchange = e => {
//     files = e.target.files;

//     var extension = GetExtName(files[0]);
//     var name = GetFileName(files[0]);

//     namebox.value = name;
//     extlab.innerHTML = extension;
// }
//----------------







//--------------------------------------------------------------------------------------------------------------
//The below code is to provide the user the ability to go back to the app after the action is completed.


// var actionCodeSettings = {
//     url: 'https://www.example.com/?email=' + auth.currentUser.email,
//     handleCodeInApp: true,
//     // When multiple custom dynamic link domains are defined, specify which
//     // one to use.
//     dynamicLinkDomain: "http://localhost/4885_Buddy/html/login.html"
//   };
//   auth.currentUser.sendEmailVerification(actionCodeSettings)
//     .then(function() {
//       // Verification email sent.
//     })
//     .catch(function(error) {
//       // Error occurred. Inspect error.code.
//     });
//--------------------------------------------------------------------------------------------------------------



// To allow user to capture image or upload an image


// $('input[type=file]').change(async function () {
//     console.log(this.files[0].mozFullPath);
//     let file = document.getElementById("upload").files;

//     let storageRef = ref(storage, currentUserId+Date.now()+file[0].name);
//     console.log(storageRef);

//     const metadata = {
//       contentType: file[0].type,
//     };


    
//     await uploadBytes(storageRef,file[0],metadata)
//     .then((snapshot)=>{
//       console.log(snapshot);
//       getDownloadURL(storageRef)
//       .then((url)=>{
//         img.push(url);
//         console.log(img);
//         let position = img.length;
//         console.log(position);


//         let eventBlock = document.querySelector(".image-wrap");
//         let clonedEvent = eventBlock.cloneNode(true);
//         clonedEvent.removeAttribute("hidden");
//         clonedEvent.querySelector(".image").src = url;
//         clonedEvent.querySelector(".delete-upload-img").addEventListener('click',()=>{
//           deleteObject(storageRef).then(() => {
//             const index = img.indexOf(url);
//             if (index > -1) { 
//               img.splice(index, 1); 
//             }
//             clonedEvent.remove()
//             console.log(img);
//           }).catch((error) => {
            
//           });
//         })
//         document.querySelector(".images-container").append(clonedEvent);




//       })
//       .catch((error=>{
//         console.log(error);
//       }))
//     })
//     .catch((error)=>{
//       console.log(error);
//     });
//   });

  
// }else{
//   console.log("not login");
// }