import {Storage} from "./app";

import {ref, uploadBytes} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';
import {v4} from 'uuid';



    function imageToUpload(){
        alert("This is working!!");
        const [imageUpload, setImageUpload] = useState (null);
            const uploadImage = () => {
                if (imageUpload == null) return;
                const imageReference = ref(Storage, `images/${imageUpload.name + v4()}`);
                uploadBytes(imageReference, imageUpload).then (()=>{
                    alert("Image Uploaded Successfully");
                });
            }
    
    };

// let image = document.getElementById("upload");

let file = {};

function chooseFile(e) {
    file = e.target.files[0];
}












    


