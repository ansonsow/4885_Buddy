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
🌸 1. [line 28] change someButton to your popup's trigger (e.g. a button)
🌸 2. [line 29] set your popup_id
🌸 3. [line 43] customize the <h3> text
🌸 4. [line 46] customize BUTTON 1 text
🌸 5. [line 49] customize BUTTON 2 text
🌸 6. [line 62] what actions you want BUTTON 1 to do when it's clicked
🌸 7. [line 71] what actions you want BUTTON 2 to do when it's clicked
**********************************************************************************/

$(document).ready(function(){
    let someButton = $(".oddly_specific_class"); // popup trigger 🌸
    let popup_id = "YOUR-POPUP-NAME"; // change this to a unique name/identifier 🌸

    // don't touch the next 4 lines
    // (but still copy them!)
    let clone_popup = $(".del-popup:first").clone();
    clone_popup.removeAttr("popup-type");
    clone_popup.attr("popup-type",popup_id);
    $("body").prepend(clone_popup);

    someButton.click(function(){
        // remove existing <h3> text
        $(`[popup-type='${popup_id}'] h3`).empty();

        // customize your <h3> text
        $(`[popup-type='${popup_id}'] h3`).text("Hello :)"); // 🌸

        // customize your button 1 text
        $(`[popup-type='${popup_id}'] #popup_action_1`).text("I'm button 1"); // 🌸

        // customize your button 2 text
        $(`[popup-type='${popup_id}'] #popup_action_2`).text("I'm button 2"); // 🌸

        // fade in the pop-up
        $(`[popup-type='${popup_id}']`).fadeIn(popupFadeSpeed);
    })
    
    /********************************************************************** */
    /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
    /********************************************************************** */

    $(document).on("click", `[popup-type='${popup_id}'] #popup_action_1`, function(){
        let that = this; // don't touch this line

        // do stuff 🌸
    });

    /********************************************************************** */
    /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
    /********************************************************************** */
    $(document).on("click", `[popup-type='${popup_id}'] #popup_action_2`, function(){
        let that = this; // don't touch this line

        // do stuff 🌸

        // fade out the pop-up (if you want)
        // $(`[popup-type='${popup_id}']`).fadeOut(popupFadeSpeed);
    });
})//end ready