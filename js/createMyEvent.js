import {storage} from "./app.js";
//  toUpload
files.addEventListener("click", async() =>{

    // const module1 = await import("./app.js");
    // console.log(module1.storageRef);
    // here access anything exported in module1
    alert("This function is working!");

        const file = document.getElementById("upload").files[0];
            console.log(file);

        const name = new Date() + '-' + file.name ;
            console.log(name);

        const metadata = {
            contentType:file.type
        }

        const storageref = storage().ref('img/'+file.name); //The problem is in this line...
        // console.log(ref);

        const task = storageref.put(file,metadata);
        console.log(task);
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            alert("Image is uploaded successfully!");
        })
            
});







