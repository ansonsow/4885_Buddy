$(document).ready(function(){
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
            
            $("nav .logo").attr("status","closed");

            $(".left-panel").attr("status","closed")
        }

        // closed --> open
        else if($(".left-panel").attr("status") == "closed"){
            $(".left-panel [arrow='left'] i").show();
            $(".left-panel [arrow='right'] i").hide();

            $("nav .logo").attr("status","open");
            
            $(".left-panel").attr("status","open")
        }
    })
})//end ready