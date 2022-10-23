$(document).ready(function(){
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

    /*------ TRASH: CLICK ------*/
    let rmEVspeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Remove-Event-Speed"));

    $(document).on("click", ".delete-event", function(){
        let that = this;

        $(that).parents(".event-block").addClass("zoom-out");

        setTimeout(() => {
            $(that).parents(".event-block").remove();
            eventsCount = $(".event-block").length;
            slidesNeeded = Math.ceil(eventsCount/eventsPerRow);

            $(".events-grid").attr("slides-needed",slidesNeeded);
            $(".events-grid").attr("style","--Events-Per-Row:" + eventsCount);

            if(slidesNeeded == 1){
                $(".prev-events, .next-events").css("visibility","hidden")
            }
        },rmEVspeed)
        
    })
})//end ready