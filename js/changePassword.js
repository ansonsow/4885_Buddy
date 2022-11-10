//Created a function to route the current page to forgot password page
document.getElementById("changepass").addEventListener('click', ()=>{
    // e.preventDefault();
    console.log("button is clicked!");
    setTimeout(()=>{
        window.location.href="../forgotpassword.html";
    },1000)

});