
import {storageRef} from './app.js'

// files.addEventListener("click", async() =>{

    
//     alert("This function is working!");

//         const file = document.getElementById("upload").files[0];
//             console.log(file);

//         const name = new Date() + '-' + file.name ;
//             console.log(name);

//         const metadata = {
//             contentType:file.type
//         }
//         const storage = getStorage(app); //Created a const to store
//         const StorageRef = ref(storage);

//         //  = ref('img/'+file.name); //The problem is in this line...

//          const imageUpload = StorageRef.uploadBytes('img/'+file.name).then((snapshot)=>{
//             console.log("File Uploaded!");
//           });

//         const task = imageUpload.put(file,metadata);
//         console.log(task);
//         task
//         .then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => {
//             console.log(url);
//             alert("Image is uploaded successfully!");
//         })
            
// });


//For Authentication (not used now!)
//   var auth = firebase.auth();
//To create a storage reference
//   var storageRef = firebase.storage().ref();

//To Handle files
  
    document.getElementById('files').addEventListener('onclick', () => {
        // e.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    };

    // Push to child path.
    storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
    //  To check the size of the file
    //   console.log('Uploaded', snapshot.totalBytes, 'bytes.');
         console.log('File metadata:', snapshot.metadata);
    // To get a download URL for the file.
      snapshot.ref.getDownloadURL().then(function(url) {
        console.log('File is available at : ', url);
    });
    }).catch(function(error) {
      console.error('Upload failed:', error);
    });
  
    })
    


//For Validating users-------


//   window.onload = function() {

//     document.getElementById('files').addEventListener('change', handleFileSelect, false);
//     //Disabled for un-authorized users to upload images
//     document.getElementById('file').disabled = true;
//     auth.onAuthStateChanged(function(user) {
//       if (user) {
//         console.log('Anonymous user signed-in.', user);
//     //Enabled Authorized users to upload images    
//         document.getElementById('file').disabled = false;
//       } else {
//         console.log('There was no anonymous session. Creating a new anonymous user.');
//         //To Sign the user in anonymously since accessing Storage requires the user to be authorized.
//         auth.signInAnonymously().catch(function(error) {
//           if (error.code === 'auth/operation-not-allowed') {
//             window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
//                 'sign-in on your Firebase project.');
//           }
//         });
//       }
//     });
//   }

// --------------Ignore the below lines----------------
// evt.stopPropagation();

//To include the image URL as a link on HTML page (We can do this only if needed!!) -- ignore for now!!
// document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';




