import * as dbf from "./app.js"
// import * as mapf from "./tomtom.js"
import {query, collection, doc, getDocs,getDoc,where} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
// import tt from "@tomtom-international/web-sdk-maps";


let currentUser = dbf.auth.currentUser;


if(currentUser){
    // load the page

    // let oopsie;
    // function reverseGeo(l){
    //     tt.services.reverseGeocode({
    //         key: tomtomApiKey,
    //         position: l
    //     })
    //     .then(result=>{
    //         console.log(result.addresses[0].address.freeformAddress);
    //     });
    // }

    let currentUserEmail = currentUser.email;
    let q = query(collection(dbf.db, "users"), where("email", "==", currentUserEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentUserId = doc.id;
    });
    // console.log(currentUserId);
    let e = query(collection(dbf.db, "events"), where("hostId", "==", currentUserId));
    const starSnapshot = await getDocs(e);
    starSnapshot.forEach((doc)=>{
        console.log(doc.id);
        // oopsie = doc.id
        // clone the hidden dummy event
        let eventBlock = document.querySelector(".event-block");
        let clonedEvent = eventBlock.cloneNode(true);
        clonedEvent.removeAttribute("hidden");
        eventBlock.parentNode.insertBefore(clonedEvent, eventBlock.nextSibling);

        // set cloned event's image (as example)
        clonedEvent.querySelector("img").setAttribute("src", doc.data().coverImage);
        clonedEvent.querySelector("h3.event-name").innerHTML = doc.data().name;
    
        // let reverse = tt.services.reverseGeocode({
        //     key:tomtomApiKey,
        //     position:doc.data().location
        // }).then(r=>{
        //     clonedEvent.querySelector(".location").innerHTML = r.addresses[0].address.freeformAddress);
        // })
        // .catch(err=>{
        //     console.log(err);
        // });
    
        function reverseGeo(l){
            tt.services.reverseGeocode({
            key: tomtomApiKey,
            position: l
        })
        .then(result=>{
            clonedEvent.querySelector(".location-xyz").innerHTML = result.addresses[0].address.freeformAddress
            // console.log(result.addresses[0].address.freeformAddress);
        });
        }
        reverseGeo(doc.data().location)
        // date-published
        // clonedEvent.querySelector(".location").innerHTML = 
        clonedEvent.querySelector(".date-published").innerHTML = doc.data().dateCreated.toDate().toDateString().slice(4)
        // console.log(doc.data().dateCreated.toDate().toDateString());
        clonedEvent.querySelector(".delete-event").addEventListener("click", () => {
            dbf.deleteEvent(doc.id)
        })

    })

    


    $(document).ready(function(){
        /*------ EVENTS ------*/
        // $(".event-block:first").attr("event-id",oopsie)

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
            let whichPanel = Number($(".events-grid").attr("panel-view"));
    
            // CURRENT EVENT - zoom out
            $(that).parents(".event-block .block-inner").addClass("zoom-out");
    
            setTimeout(() => {
                // after zoom out animation, move remaining blocks left
                $(that).parents(".event-block").nextAll(".event-block").addClass("block-move-left");
    
                setTimeout(() => {        
                    // put remaining blocks back where they were
                    $(that).parents(".event-block").nextAll(".event-block").removeClass("block-move-left");
    
                    // remove DELETED EVENT
                    $(that).parents(".event-block").remove();
    
                    // reinitialize values
                    eventsCount = $(".event-block").length;
                    slidesNeeded = Math.ceil(eventsCount/eventsPerRow);
    
                    $(".events-grid").attr("slides-needed",slidesNeeded);
                    $(".events-grid").attr("style","--Events-Per-Row:" + eventsCount);
    
                    if(slidesNeeded == 1){
                        $(".prev-events, .next-events").css("visibility","hidden");
                        $(".events-grid").css("margin-left","0");
                        $(".events-grid").attr("panel-view","1")
                    } else {
                        $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");
                    }
                },rmEVspeed)            
            },rmEVspeed)        
        })
    })//end ready
}else{
    alert("you are not logged in")
    setTimeout(()=>{
        window.location.href="./login.html";
    },1000)
}





