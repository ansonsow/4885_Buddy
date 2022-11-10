import{logout} from "./app.js";
// import $ from "./jquery.module.js";
import * as dbf from "./app.js";
import {storage, auth, db, writeEventData, writeUserData} from './app.js';

//To send a password reset email to user
document.getElementById('changepass').addEventListener('click', (e)=>{
    e.preventDefault();
    // console.log("Re-directed to forgot passwords page!");
    // alert("Button is clicked");
    resetPassword();

});

function resetPassword(){
    // console.log("resetPassword Function is called!");

    
        if (auth.currentUser) {
          console.log(auth.currentUser.email);
          alert("Password reset link is sent to  : " + auth.currentUser.email);
          let emailaddress = auth.currentUser.email;
          auth.sendPasswordResetEmail(emailaddress) 
          .then(() =>{
              console.log("Password reset email has been sent!");
          })
          .catch(error => {
              console.log(error);
          })
        } else {
          // User is signed out
          console.log("User is signed out!");
        }
}







//Create a function to perform singout operation using Firebase's singOut() method
document.getElementById("signout").addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Button is clicked!");
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