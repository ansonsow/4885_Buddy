import{logout } from "./app.js";
// import $ from "./jquery.module.js";
import * as dbf from "./app.js";
import {storage, auth, db, writeEventData, writeUserData} from './app.js';
import {sendPasswordResetEmail, deleteUser,verifyPasswordResetCode, confirmPasswordReset, updateProfile, updateEmail} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

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

var uploaded_image = "";

document.getElementById("imageupload").addEventListener('click', () =>{
    
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        uploaded_image = reader.result;
        document.getElementById('picture').innerHTML = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
})

//=============To Update User Profile===============================================================

document.getElementById('update').addEventListener('click', (e)=>{
    e.preventDefault();
    const user = auth.currentUser;
    const newUsername = document.getElementById('username').value;
    const newEmail = document.getElementById('email').value;
    console.log("These are user given values!");
    console.log("New Username is : " + newUsername);
    console.log("New Email is : " + newEmail);

    if (user !== null){
        user.providerData.forEach((profile) => {
            console.log("These are fetched from firebase!");
            console.log("Sign-in provider : " + profile.providerId);
            console.log("Provider-specific UID: " + profile.uid);
            console.log("Old email is : "+ profile.email);
            console.log("old username is : " + profile.displayName);

        })
    }
    updateEmail(user, newEmail).then(() => {
        console.log("New email updated to databse: " + newEmail);
      }).catch((error) => {
        console.log(error);
      });
    updateProfile(user, {
        displayName: newUsername,
        email : newEmail,
    }).then(()=>{
        alert("Profile updated with recent changes!");
        console.log('Profile Updated!');
        console.log('New Display Name is:' + displayName);
        console.log('New Email address is:' + email);
    }).catch((error)=>{
        console.log(error);
    });
});

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
// //--------------------------------------------------------------------------------------------------------------



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