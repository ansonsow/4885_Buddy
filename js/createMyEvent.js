
import {storage} from './app.js'
import {getStorage,ref, uploadBytes} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

files.addEventListener("click", async() =>{

    
    alert("This function is working!");

        const file = document.getElementById("upload").files[0];
            console.log(file);

        const name = new Date() + '-' + file.name ;
            console.log(name);

        const storageRef = ref(storage, name);

        uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
        });
            
});

