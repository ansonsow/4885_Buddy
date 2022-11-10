//Created a function to route the current page to forgot password page
document.getElementById('changepass').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Re-directed to forgot passwords page!");
    // alert("Button is clicked");
    setTimeout(()=>{
        window.location.href= "./forgotPassword.html";
    },1000)

});