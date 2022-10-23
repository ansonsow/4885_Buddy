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
    let eventsPerRow = Number(getComputedStyle(document.documentElement).getPropertyValue("--Events-Per-Row"));
    let slidesNeeded = Math.ceil(eventsCount/eventsPerRow);
    let panelSpan = "(var(--Events-Grid-Width) + var(--Events-Spacing))";

    $(".events-grid").attr("slides-needed",slidesNeeded);
    $(".events-grid").attr("style","--Events-Per-Row:" + eventsCount);

    // first PANEL
    $(".events-grid").attr("panel-view","1");
    $(".prev-events").css("visibility","hidden");

    if(slidesNeeded == 1){
        $(".next-events").css("visibility","hidden");
    }

    $(".events-arrow").click(function(){
        // keep track of which panel user is currently viewing
        let whichPanel = Number($(".events-grid").attr("panel-view"));

        /*------ CLICK NEXT ------*/
        if($(this).hasClass("next-events")){
            // if there are only 2 panels
            if(slidesNeeded == 2){
                $(".prev-events").css("visibility","");
            }

            // press-next: if user CAN click next
            if(whichPanel < slidesNeeded-1){
                whichPanel += 1;
                $(".prev-events").css("visibility","");
                $(".events-grid").attr("panel-view",whichPanel);

                $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")")
            }

            // press-next: if user can't go any further
            else {
                whichPanel += 1;
                $(".events-grid").attr("panel-view",whichPanel);
                $(".next-events").css("visibility","hidden");
                $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")")
            }
        }

        /*------ CLICK PREV ------*/
        else if($(this).hasClass("prev-events")){
            // press-prev: if user can't go left any further
            if(whichPanel == 2){
                whichPanel == 1;
                $(".events-grid").attr("panel-view","1");
                $(".prev-events").css("visibility","hidden");
                $(".events-grid").css("margin-left","0");
                $(".next-events").css("visibility","");
            }

            // press-prev: if user CAN go prev
            else if(whichPanel > 2){
                whichPanel -= 1;
                $(".events-grid").attr("panel-view",whichPanel);
                $(".prev-events").css("visibility","");
                $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");

                // second-last slide
                if(whichPanel < slidesNeeded){
                    $(".next-events").css("visibility","");
                }
            }
        }
    })//end arrows click
})//end ready