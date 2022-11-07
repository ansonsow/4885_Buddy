
$(document).ready(function(){
    let leaveReview = $(".leave-review"); // change this to whatever you're binding your popup trigger to

    leaveReview.click(function(){
        $(".popup-msg").css({"background-color": "#F0F0F0"});
        // remove existing <h3> text
        $(".del-popup h3").empty();
        // customize your <h3> text
        $(".del-popup h3").text("Leave a Review");
        $(".del-popup h3").addClass("popup-title");
        $(".popup-title").css({"margin-bottom": "0"});
        
        $(".popup-title").after("<div class='popup-content'></div>");
    
        $(".popup-content").append("<p class='greeting'>How was your experience? We'd love to hear from you.</p>");
        $(".popup-content").append("<h4 class='rate-title'>Rate the Overview for This Event</h4>");
        // Star Rating
        $(".popup-content").append("<div class='star-rating'></div>")
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star fill'></i>") 
        $(".star-rating").append("<i class='fa-solid fa-star empty'></i>")  
        // Descriptions
        $(".popup-content").append("<h4 class='desc-title'>Descriptions</h4>");
        $(".popup-content").append("<textarea class='desc-box' placeholder='Message...'></textarea>");

        // customize your button 1 text
        $("#popup_action_1").text("Send");

        // customize your button 2 text
        $("#popup_action_2").text("Cancel");

        // fade in the pop-up
        $(".del-popup").fadeIn(popupFadeSpeed);
    })
    
    /********************************************************************** */
    /******* 1ST BUTTON CLICK [e.g. "OK"] ********************************* */
    /********************************************************************** */

    $(document).on("click", "#popup_action_1", function(){
        let that = this; // don't touch this line

        setTimeout(() => {
            location.reload(true)
        },100)

        // do stuff
    });

    /********************************************************************** */
    /******* 2ND BUTTON CLICK [e.g. "CANCEL"] ***************************** */
    /********************************************************************** */
    $(document).on("click", "#popup_action_2", function(){
        let that = this; // don't touch this line

        // fade out the pop-up
        $(".del-popup").fadeOut(popupFadeSpeed);

        setTimeout(() => {
            location.reload(true)
        },100)
        
    });
})//end ready