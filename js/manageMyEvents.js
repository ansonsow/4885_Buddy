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
        
        /*---- 🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️ ----*/
        // comment this to NOT delete the event from the database
        clonedEvent.querySelector(".delete-event").addEventListener("click", () => {
            // dbf.deleteEvent(doc.id)
        })

    })

    


    $(document).ready(function(){
        $(".event-block[hidden]").before("<div dummy-area></div>")

        /*------ RANDOM CAT IMAGES ------*/
        // delete later, just for cloning purposes
        for(let i=0; i<6; i++){
            let jqc = $(".event-block:first").clone();
            jqc.removeAttr("hidden");
            let randnumA = Math.ceil(Math.random() * 2500) + 250;
            let randnumB = Math.ceil(Math.random() * 2500) + 250;
            jqc.find("img").attr("src",`https://placekitten.com/${randnumA}/${randnumB}`);
            jqc.find(".event-name").text("Cat " + Math.floor(i+1))
            $("[dummy-area]").append(jqc)
        }

        $("[dummy-area]").children().unwrap();

        $(".event-block[hidden]").remove();

        /********************************************************************** */
        /******* IMPORTANT REUSABLE VARIABLES ********************************* */
        /********************************************************************** */

        // $(".event-block:first").attr("event-id",oopsie)

        let originalEventsNum = $(".event-block").length;

        let eventsCount = $(".event-block").length;
        let eventsPerRow = Number(getComputedStyle(document.documentElement).getPropertyValue("--Events-Per-Row"));
        let slidesNeeded = Math.ceil(eventsCount/eventsPerRow);
        let panelSpan = "(var(--Events-Grid-Width) + var(--Events-Spacing))";

        /********************************************************************** */
        /******* FUNCTION: GENERATE COLUMN#S & SLIDE#S ************************ */
        /********************************************************************** */
        // ideally used for afte the trash icon is pressed

        function reInitEvents(){
            // label each column with its number
            // column 1,
            // column 2,
            // column 3.
            for(let i=0; i<=eventsPerRow; i++){
                $(`.events-grid .event-block:nth-of-type(${eventsPerRow}n+${i})`).attr("column",i);
            }

            let eventBlockJQ = $(".events-grid > .event-block");

            for(let i=0; i<eventBlockJQ.length; i+=eventsPerRow){
                eventBlockJQ.slice(i, i+eventsPerRow).attr("slide",i) // gives 0, 3, 6, 9 (assuming 3 cols)
            }

            // revamp the slide numbers
            // from e.g. slide 0, 3, 6, 9 --> slide 1, 2, 3, 4
            $(".event-block[slide]").each(function(){
                let numAttr = Number($(this).attr("slide"));

                // if it's 0, make it 1 since it's gonna be the 1st slide
                if(numAttr == 0){
                    $(this).attr("slide","1");
                }
                
                // if it's anything larger than 1, divide it by eventsPerRow,
                // then +1 because there's already a "slide 1" (created from "0")
                else if(numAttr > 0){
                    let newnum = (numAttr/eventsPerRow)+1;
                    $(this).attr("slide",newnum)
                }
            })
        }//end reInitEvents()

        reInitEvents();        

        /*--------------------*/
    
        $(".events-grid").attr("slides-needed",slidesNeeded);
        $(".events-grid").attr("style","--Events-Per-Row:" + eventsCount);
    
        /********************************************************************** */
        /******* 1ST PANEL || INITIAL VIEW ************************************ */
        /********************************************************************** */

        let panelView = 1;
        $(".events-grid").attr("panel-view","1");
        $(".prev-events").css("visibility","hidden");
    
        if(slidesNeeded == 1){
            $(".prev-events, .next-events").css("visibility","hidden");
        }
    
        /********************************************************************** */
        /******* SLIDESHOW ARROW CLICK **************************************** */
        /********************************************************************** */
        $(".events-arrow").click(function(){
    
            /****************************************************************** */
            /******* NEXT ARROW CLICK ***************************************** */
            /****************************************************************** */
            if($(this).hasClass("next-events")){
                
                $(".prev-events").css("visibility","");

                // if there are only 2 panels
                if(slidesNeeded == 2){
                    $(".prev-events").css("visibility","");
                }

                // if there are MORE than 2 panels
                // MOVE TO NEXT PANEL
                else {
                    panelView += 1;

                    // if user is at the END, can't click right
                    if(panelView >= slidesNeeded){
                        panelView = slidesNeeded;
                        $(".events-grid").attr("panel-view",panelView);
                        $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(panelView-1) + ")");
                        $(".next-events").css("visibility","hidden");
                    }
                    
                    // if user CAN keep clicking right
                    else {
                        $(".events-grid").attr("panel-view",panelView);
                        $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(panelView-1) + ")")
                    }
                    
                }
            }
    
            /****************************************************************** */
            /******* PREV ARROW CLICK ***************************************** */
            /****************************************************************** */
            else if($(this).hasClass("prev-events")){
                // if there's only 1 slide, remove prev arrow
                if(slidesNeeded <= 1){
                    panelView = 1;
                    $(".events-grid").attr("panel-view","1");
                    $(".prev-events").css("visibility","hidden");
                    $(".events-grid").css("margin-left","");
                }

                // if there's more than 1 slide, show the prev arrow
                else if(slidesNeeded > 1){
                    panelView -= 1;
                    $(".events-grid").attr("panel-view",panelView);
                    $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(panelView-1) + ")");

                    // if user CAN keep pressing prev
                    if(panelView > 1){
                        $(".prev-events").css("visibility","");
                    }
                    
                    // if user CAN'T keep pressing prev
                    else {
                        $(".prev-events").css("visibility","hidden");
                    }
                    
                }
            }
        })//end arrows click
    
        /********************************************************************** */
        /******* TRASH ICON CLICK ********************************************* */
        /********************************************************************** */
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





