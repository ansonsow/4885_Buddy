import{logout} from "./app.js";
import $ from "./jquery.module.js";
import * as dbf from "./app.js";
import {storage, auth, db, writeEventData, writeUserData} from './app.js';
import {sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

//To send a password reset email to user
document.getElementById('changepass').addEventListener('click', (e)=>{
    e.preventDefault();
    resetPassword();
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

//Create a function to perform singout operation using Firebase's singOut() method
document.getElementById("signout").addEventListener('click', (e)=>{
    e.preventDefault();
    logout();
    });

//Create a funtion to remove user's profile from database (when user wants to delete his account)
// document.getElementsByName('delete').addEventListener('click', (e)=>{
//     e.preventDefault();
//     alert("Your account is deleated, Thank you!");
//     console.log("User's accout is removed from Databse");
// });



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