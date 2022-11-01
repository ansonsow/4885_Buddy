
files.addEventListener("click", async() =>{

    const module1 = await import("./app.js");
    // here access anything exported in module1
    alert("This function is working!");

        

        const file = document.getElementById("upload").files[0];
            console.log(file);

        const name = new Date() + '-' + file.name ;

        const metadata = {
            contentType:file.type
        }

        const ref = module1.storage.ref(); //The problem is in this line...

        const task = ref.child(name).put(file,metadata);
        console.log(task);
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            alert("Image is uploaded successfully!");
        })
            
});

















