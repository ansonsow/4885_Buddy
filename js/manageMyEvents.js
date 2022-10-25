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

        /*------ EVENTS ------*/

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

        /*------------------------------------*/

        // $(".event-block:first").attr("event-id",oopsie)

        let originalEventsNum = $(".event-block").length;

        let eventsCount = $(".event-block").length;
        let eventsPerRow = Number(getComputedStyle(document.documentElement).getPropertyValue("--Events-Per-Row"));
        let slidesNeeded = Math.ceil(eventsCount/eventsPerRow);
        let panelSpan = "(var(--Events-Grid-Width) + var(--Events-Spacing))";

        // label each column with its number
        // column 1,
        // column 2,
        // column 3.
        for(let i=0; i<=eventsPerRow; i++){
            $(`.events-grid .event-block:nth-of-type(${eventsPerRow}n+${i})`).attr("column",i);
        }

        let eventBlockJQ = $(".events-grid > .event-block");

        for(let i=0; i<eventBlockJQ.length; i+=eventsPerRow){
            eventBlockJQ.slice(i, i+eventsPerRow).attr("slide",i) // gives 0, 3, 6, 9
            // eventBlockJQ.slice(i, i+eventsPerRow).attr("slide",Math.random().toString(36).slice(2,7))
        }

        // revamp the slide numbers
        $(".event-block[slide]").each(function(){
            let numAttr = Number($(this).attr("slide"));

            // if it's 0, make it 1 since it's gonna be the 1st slide
            if(numAttr == 0){
                $(this).attr("slide","1");
            }
            
            // if it's anything larger than 1, divide it by eventsPerRow,
            // then +1 because there's already a "slide 1" (created from "0")
            else if(numAttr > 0){
                let newnum = (numAttr/3)+1;
                $(this).attr("slide",newnum)
            }
        })

        /*--------------------*/
    
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

                    // next line works
                    // alert(`ORIGINAL ITEMS: ${originalEventsNum} || CURRENT ITEMS: ${eventsCount} || SLIDES NEEDED: ${slidesNeeded}`);

                    //
    
                    // IF THERE IS ONLY 1 SLIDE LEFT (aka 3 events)
                    if(slidesNeeded == 1){
                        whichPanel = slidesNeeded;
                        $(".prev-events, .next-events").css("visibility","hidden");
                        $(".events-grid").css("margin-left","0");
                        $(".events-grid").attr("panel-view","1");
                        
                        // $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");
                    }
                    
                    // IF THERE ARE *MORE* THAN 1 SLIDE(S) LEFT
                    else if(slidesNeeded > 1){

                        // condition A: YOU ARE ON THE LAST POSSIBLE SLIDE
                        // condition B: you click 🗑️ on one of the last items
                        if(slidesNeeded == whichPanel){
                            // alert(`you are STILL on slide ${whichPanel}`)
                            // alert("you are on the LAST SLIDE, which is ALSO WHERE YOU PRESSED THE DELETE");

                            $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");
                        }
                        
                        // if you are:
                        // NOT on the last possible slide, e.g. slide 2 of 3
                        // you click one of those 🗑️
                        else {
                            // whichPanel -= 1;

                            // alert(whichPanel)

                            // next 2 lines are correct
                            $(".events-grid").attr("panel-view",whichPanel);
                            $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")")



                            // $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");
                        }
                        

                        // whichPanel = slidesNeeded;

                        // $(".events-grid").attr("panel-view",slidesNeeded);
                        // alert(whichPanel)

                        // $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");
                    } else if(slidesNeeded == 3){
                        // $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(whichPanel-1) + ")");
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





