import {Storage} from "./app";
import {useState} from "react";
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

// function uploadImage(){
//     firbase.storage().ref(Storage, `images/${imageUpload.name + v4()}`).put(file).then(function (){
//         console.log("Success");
//     }).catch(error => {
//         console.log("error");
//     })
// }











    


