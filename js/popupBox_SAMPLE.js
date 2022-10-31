/**********************************************************************************
⭐⭐⭐ REQUIREMENTS ⭐⭐⭐

jQuery:
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>

HTML:
<div js-include-html="../html/popupBox.html"></div> 

CSS:
<link href="../css/popupBox.css" rel="stylesheet">

⭐⭐⭐ INSTRUCTIONS ⭐⭐⭐
🌸 this file is only a TEMPLATE
🌸 copy everything here (obviously without the comments)
   and paste it into your page's .js file
🌸 the variable popupFadeSpeed has already been declared in global.js
🌸 1. change someButton to your popup's trigger (e.g. a button)
🌸 2. customize the <h3> text
🌸 3. customize BUTTON 1 text, and further actions
🌸 4. customize BUTTON 2 text, and further actions
**********************************************************************************/

$(document).ready(function(){
    let someButton = $(".oddly_specific_class"); // change this to whatever you're binding your popup trigger to

    someButton.click(function(){
        // remove existing <h3> text
        $(".del-popup h3").empty();

        // customize your <h3> text
        $(".del-popup h3").text("Hello :)");

        // customize your button 1 text
        $("#popup_action_1").text("I'm button 1");

        // customize your button 2 text
        $("#popup_action_2").text("I'm button 2");

        // fade in the pop-up
        $(".del-popup").fadeIn(popupFadeSpeed);
    })
    
    /********************************************************************** */
    /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
    /********************************************************************** */

    $(document).on("click", "#popup_action_1", function(){
        let that = this; // don't touch this line

        // do stuff
    });

    /********************************************************************** */
    /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
    /********************************************************************** */
    $(document).on("click", "#popup_action_2", function(){
        let that = this; // don't touch this line

        // fade out the pop-up
        $(".del-popup").fadeOut(popupFadeSpeed);
    });
})//end ready