import * as dbf from "./app.js"

document.getElementById("btnsignup").onclick=async ()=>{
    dbf.createAccount(email.value,psw.value)
};