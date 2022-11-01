// Method 1 : 

    //     var uploader   = document.getElementById('upload');
    //     document.getElementById('filebutton').addEventListener('onclick', function(e){
    //         alert("Page linked!");
    //     var file = e.target.files[0];
    //     var storageRef = firebase.storage().ref('img/'+file.name);
    //     var task = storageRef.put(file);
    //     task.on('state_changed', function progress(snapshot) {
    //       var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    //       uploader.value = percentage;
      
    //     }, function error(err) {
      
      
    //     },function complete() {
      
    //     });
    //   }); 

// ------------------------------------------

// Method 2 : 
// import {storageRef} from "../app.js";

      //function to save file
    function uploadFile(){
      
        // Created a Storage Reference with root dir
        var storageRef = firebase.storage().ref();
        // Get the file from DOM
        var file = document.getElementById("files").files[0];
        console.log(file);
        
        //dynamically set reference to the file name
        var thisRef = storageRef.child(file.name);
  
        //put request upload file to firebase storage
        thisRef.put(file).then(function(snapshot) {
           alert("File Uploaded")
           
        });
      }

















