$(document).ready(function(){
    /*------ LEFT PANEL ------*/
    let panelStatus = $.trim($(".left-panel").attr("status"));

    contentLoaded(checkColor);

    function checkColor(){
        // if panel is ALREADY OPEN
        if(panelStatus == "open"){
            $("nav").attr("status","open");
            $(".left-panel [arrow='left'] i").show();
        }

        // if panel is ALREADY CLOSED
        else if(panelStatus == "closed"){
            $("nav").attr("status","closed");
            $(".left-panel [arrow='right'] i").show();
        }
    }

    $(".left-panel [arrow]").click(function(){
        if(!$("nav").is("[status-change]")){
            $("nav").attr("status-change","proc");
        }

        if(!$(".left-panel").is("[status-change]")){
            $(".left-panel").attr("status-change","proc");
        }
        
        // open --> closed
        if($(".left-panel").attr("status") == "open"){
            $(".left-panel [arrow='left'] i").hide();
            $(".left-panel [arrow='right'] i").show();
            
            $("nav").attr("status","closed");

            $(".left-panel").attr("status","closed")
        }

        // closed --> open
        else if($(".left-panel").attr("status") == "closed"){
            $(".left-panel [arrow='left'] i").show();
            $(".left-panel [arrow='right'] i").hide();

            $("nav").attr("status","open");
            
            $(".left-panel").attr("status","open")
        }
    })

    /*------ EVENTS ------*/
    let eventsCount = $(".event-block").length;
    $(".events-grid").attr("style","--Events-Per-Row:" + eventsCount);

    $(".next-events").click(function(){
        $(".events-grid").css("margin-left","calc(0px - var(--Events-Grid-Width))")
    })

    $(".prev-events").click(function(){
        $(".events-grid").css("margin-left","0")
    })
})//end ready