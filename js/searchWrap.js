function jQueryActions(){
    detectSearchEvents();
}

function detectSearchEvents(){
    let spDateNow = Date.now();
    let spStop = 2500;
    
    let checkSearchEvents = setInterval(() => {
        if(Date.now() - spDateNow > spStop){
            clearInterval(checkSearchEvents);
        } else {
            // check if CLONED search events exist
            // then proceed with jQuery tasks for that
            if($(".event-container:not([hidden])").length){
                clearInterval(checkSearchEvents);
                wrapSearchEvents();
            }	
        }
    },0);
}//end wrapSearchEvents()

function wrapSearchEvents(){
    let eachEvent = ".event-container:not([hidden])";

    $(eachEvent).each(function(){
        $(this).not(eachEvent +"+"+ eachEvent).each(function(){
            $(this).nextUntil(":not(" + eachEvent + ")").andSelf().wrapAll("<div class='cloned-events-container'></div>");
        })
    })
}
