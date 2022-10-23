function jQueryActions(){
    detectLeftPanel();
}

function detectLeftPanel(){
    let lpDateNow = Date.now();
    let lpStop = 2500;
    
    let checkLeftPanel = setInterval(() => {
        if(Date.now() - lpDateNow > lpStop){
            clearInterval(checkLeftPanel);
        } else {
            // check if .left-panel exists
            // then proceed with jQuery tasks for that
            if($(".left-panel").length){
                clearInterval(checkLeftPanel);
                leftPanel();
            }	
        }
    },0);
}//end detectLeftPanel()

function leftPanel(){

    $(document).ready(function(){
        /*------ LEFT PANEL ------*/
        let panelStatus = $.trim($(".left-panel").attr("status"));
        
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
    })//end ready
}//end leftPanel()