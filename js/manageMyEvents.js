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
    function formatDate(d){
        let eventDateNum = d.replace(/[^\d\.]*/g,"");
        let eventYear = eventDateNum.slice(0,4);
        let eventMonth = eventDateNum.substring(eventDateNum.length-12).slice(0,2);
        let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);
    
        // if first number of eventDay is a 0, remove that
        let dayFirstChara = eventDay.slice(0,1);
        if(dayFirstChara == "0"){
            eventDay = eventDay.slice(1,2);
        }
    
        let suffixes = ["st", "nd", "rd"];
        let numExceptions = [11, 12, 13];
        let nth = suffixes[(eventDay % 10) - 1] == undefined || numExceptions.includes(eventDay % 100) ? "th" : suffixes[(eventDay % 10) - 1];
    
        let daySuffix = nth;
    
        // format eventMonth
        eventMonth =
            eventMonth == "01" ? "Jan" :
            eventMonth == "02" ? "Feb" :
            eventMonth == "03" ? "Mar" :
            eventMonth == "04" ? "Apr" :
            eventMonth == "05" ? "May" :
            eventMonth == "06" ? "Jun" :
            eventMonth == "07" ? "Jul" :
            eventMonth == "08" ? "Aug" :
            eventMonth == "09" ? "Sept" :
            eventMonth == "10" ? "Oct" :
            eventMonth == "11" ? "Nov" :
            eventMonth == "12" ? "Dec" :
            eventMonth;
    
        return(`${eventDay}${daySuffix} ${eventMonth} ${eventYear}`);
        
        // document.querySelector(".event-date").textContent = `${eventDay}${daySuffix} ${eventMonth} ${eventYear}`;
    }
    
    
    
    
    function formatTime(d){
        let eventDateNum = d.replace(/[^\d\.]*/g,"");
        let eventTimeStart_Hour = eventDateNum.substring(eventDateNum.length-8).slice(0,2);
        let eventTimeStart_Minutes = eventDateNum.substring(eventDateNum.length-6).slice(0,2);
        let eventTimeEnd_Hour = eventDateNum.substring(eventDateNum.length-4).slice(0,2);
        let eventTimeEnd_Minutes = eventDateNum.substring(eventDateNum.length-2);
        return(`${eventTimeStart_Hour}:${eventTimeStart_Minutes} &ndash; ${eventTimeEnd_Hour}:${eventTimeEnd_Minutes}`);
    }
    
    
    function getDate(d){
        let eventDateNum = d.replace(/[^\d\.]*/g,"");
        let eventYear = eventDateNum.slice(0,4);
        let eventMonth = eventDateNum.substring(eventDateNum.length - 12).slice(0,2);
        let eventDay = eventDateNum.substring(eventDateNum.length-10).slice(0,2);
        return (`${eventYear}${eventMonth}${eventDay}`);
    }
    

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
    console.log(doc.data());

        console.log(doc.id);
        // oopsie = doc.id
        // clone the hidden dummy event
        let eventBlock = document.querySelector(".event-block");
        let clonedEvent = eventBlock.cloneNode(true);
        clonedEvent.removeAttribute("hidden");
        clonedEvent.setAttribute("event-id",doc.id);
        eventBlock.parentNode.insertBefore(clonedEvent, eventBlock.nextSibling);

        // set cloned event's image (as example)
        clonedEvent.querySelector("img").setAttribute("src", doc.data().images[0]);
        clonedEvent.querySelector("h3.event-name").innerHTML = doc.data().name;

        clonedEvent.querySelector("img").addEventListener("click",()=>{
            localStorage.setItem(targetEventId, doc.id);
            // console.log(id);
            console.log(localStorage.getItem(targetEventId));
            window.location = "../html/eventDetail.html#" + localStorage.getItem(targetEventId);
        })
    

        let clonedStatus = document.querySelector(".event-block:not([hidden])");
        if(typeof(clonedStatus) != "undefined" && clonedStatus != null){
            document.querySelector("footer").classList.add("show-footer")
        }
    
    
        function reverseGeo(l){
            tt.services.reverseGeocode({
            key: tomtomApiKey,
            position: l
        })
        .then(result=>{
            clonedEvent.querySelector(".location-xyz").innerHTML = result.addresses[0].address.freeformAddress
        });
        }
        reverseGeo(doc.data().location)
        clonedEvent.querySelector(".date-published").innerHTML = doc.data().dateCreated.toDate().toDateString().slice(4)
        clonedEvent.querySelector(".date-xyz").innerHTML = formatDate(doc.data().dateOfEvent)
        clonedEvent.querySelector(".time-xyz").innerHTML = formatTime(doc.data().dateOfEvent)


        clonedEvent.querySelector(".fa-regular.fa-pen-to-square").addEventListener("click",()=>{
            localStorage.setItem(targetEventId, doc.id)
            window.location = "../html/editMyEvent.html#"+localStorage.getItem(targetEventId);
            
        })


        
        /*---- 🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️ ----*/
        popup_action_1.addEventListener("click", () => {
            let trashEventID = popup_action_1.getAttribute("event-id");
            // comment this to NOT delete the event from the database
            dbf.deleteEvent(trashEventID)
        })

    })

    


    $(document).ready(function(){

        $("a[href='#']").removeAttr("href").css("cursor","pointer");

        /********************************************************************** */
        /******* TEST: RANDOM UNSPLASH TEST IMAGES **************************** */
        /********************************************************************** */

        function generateUnsplash(){
            $(".event-block[hidden]").before("<div dummy-area></div>")

            let howManyPics = 3;

            let categories = ["food", "drinks", "travel", "sports", "music", "performing", "business", "festival", "halloween", "exhibit", "museum", "gallery", "wine", "meeting", "party", "fun", "fair", "circus", "dance", "club", "camp", "camping", "night", "concert", "class", "collaboration", "friday", "climb", "sail", "climing", "sailing", "tent", "friends", "fishing", "surfing", "cycling", "explore", "exploring", "adventure", "forest", "plane", "airline", "airplane", "restaurant"];

            /*------ RANDOM UNSPLASH IMAGES ------*/
            // delete later, just for cloning purposes
            for(let i=0; i<howManyPics; i++){
                let jqc = $(".event-block:first").clone();
                jqc.removeAttr("hidden");
                jqc.attr("event-id",Math.random().toString(36).slice(2,7));

                let randomCategory = Math.floor(Math.random()*categories.length);
                let chosenCategory = categories[randomCategory];

                jqc.find("img").attr("src","//source.unsplash.com/random/?" + chosenCategory);
                jqc.find(".event-name").text("Test Event " + Math.floor(i+1));
                jqc.find(".date-published").text("MM DD YYYY");

                // ---- uncomment for designated unsplash test images
                // if(i == "0"){
                //     jqc.find(".event-name").text("Test Event A");
                //     jqc.find("img").attr("src","https://images.unsplash.com/photo-1606494231076-fee23d48e4ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
                // } else if(i == "1"){
                //     jqc.find(".event-name").text("Test Event B");
                //     jqc.find("img").attr("src","https://images.unsplash.com/photo-1601118964938-228a89955311?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80");
                // } else if(i == "2"){
                //     jqc.find(".event-name").text("Test Event C");
                //     jqc.find("img").attr("src","https://cdn.discordapp.com/attachments/382037367940448256/1035484549263675392/unknown.png");
                // }
                
                jqc.find(".location-xyz, .date-xyz, .time-xyz").text("Lorem ipsum")
                $("[dummy-area]").append(jqc)
            }

            $("[dummy-area]").children().unwrap();
        }

        generateUnsplash();

        /********************************************************************** */
        /******* TEST: ADD CATS AS EVENTS ************************************* */
        /********************************************************************** */

        function generateCats(){
            $(".event-block[hidden]").before("<div dummy-area></div>")

            let howManyCats = 3;

            /*------ RANDOM CAT IMAGES ------*/
            // delete later, just for cloning purposes
            for(let i=0; i<howManyCats; i++){
                let jqc = $(".event-block:first").clone();
                jqc.removeAttr("hidden");
                jqc.attr("event-id",Math.random().toString(36).slice(2,7));
                let randnumA = Math.ceil(Math.random() * 2500) + 250;
                let randnumB = Math.ceil(Math.random() * 2500) + 250;
                jqc.find("img").attr("src",`https://placekitten.com/${randnumA}/${randnumB}`);
                jqc.find(".event-name").text("Cat " + Math.floor(i+1));
                jqc.find(".date-published").text("MM DD YYYY");
                
                jqc.find(".location-xyz, .date-xyz, .time-xyz").text("Lorem ipsum")
                $("[dummy-area]").append(jqc)
            }

            $("[dummy-area]").children().unwrap();
        }

        // generateCats();

        $(".event-block[hidden]").remove();

        /********************************************************************** */
        /******* IMPORTANT REUSABLE VARIABLES ********************************* */
        /********************************************************************** */

        let eventsCount = $(".event-block").length;
        let eventsPerRow = Number(getComputedStyle(document.documentElement).getPropertyValue("--Events-Per-Row"));
        let slidesNeeded = Math.ceil(eventsCount/eventsPerRow);
        let panelSpan = "(var(--Events-Grid-Width) + var(--Events-Spacing))";

        /********************************************************************** */
        /******* FUNCTION: GENERATE COLUMN#S & SLIDE#S ************************ */
        /********************************************************************** */
        // ideally used for after the trash icon is pressed

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

            eventsCount = $(".event-block").length;
            slidesNeeded = Math.ceil(eventsCount/eventsPerRow);

            $(".events-grid").attr("slides-needed",slidesNeeded);
            $(".events-grid").attr("style","--Events-Per-Row:" + eventsCount);

            if($(".events-grid").is("[panel-view]")){
                let pv = Number($(".events-grid").attr("panel-view"));

                // imitate prev-click
                if(pv > slidesNeeded){
                    let panelView = Number($(".events-grid").attr("panel-view"));

                    panelView -= 1;
                    $(".events-grid").attr("panel-view",panelView);
                    $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(panelView-1) + ")");
                    $(".prev-events").css("visibility","");
                    $(".next-events").css("visibility","hidden")
                }
            }
        }//end reInitEvents()

        reInitEvents();
    
        /********************************************************************** */
        /******* 1ST PANEL || INITIAL VIEW ************************************ */
        /********************************************************************** */
        
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

                let panelView = Number($(".events-grid").attr("panel-view"));
                
                $(".prev-events").css("visibility","");

                // if there are only 2 panels
                if(slidesNeeded == 2){
                    $(".prev-events").css("visibility","");
                    $(".next-events").css("visibility","hidden");

                    // condition: if there are only 2 panels
                    // and user is on the 1st one
                    // when next is clicked, change view from 1 -> 2
                    if(panelView == 1){
                        panelView += 1;
                        $(".events-grid").attr("panel-view",panelView);
                        $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(panelView-1) + ")");
                    }
                }

                // if there are MORE than 2 panels
                // MOVE TO NEXT PANEL
                else if(slidesNeeded > 2){
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
                    let panelView = Number($(".events-grid").attr("panel-view"));

                    panelView -= 1;
                    $(".events-grid").attr("panel-view",panelView);
                    $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(panelView-1) + ")");

                    // condition: only 2 slides remaining
                    // 2nd last slide --> 1st slide
                    if(panelView == 1 && slidesNeeded > 1){
                        $(".prev-events").css("visibility","hidden")
                        $(".next-events").css("visibility","");
                    }

                    // if user CAN keep pressing prev
                    else if(panelView > 1){
                        $(".prev-events").css("visibility","");

                        if(panelView < slidesNeeded){
                            $(".next-events").css("visibility","")
                        }
                    }
                    
                    // if user CAN'T keep pressing prev
                    else {
                        $(".prev-events").css("visibility","hidden");
                    }
                    
                }
            }
        })//end arrows click

        /********************************************************************** */
        /******* TRASH BUTTON CLICK ******************************************* */
        /********************************************************************** */
        let popupFadeSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Popup-Fade-Speed"));

        $(document).on("click", ".delete-event", function(){
            let that = this;
            // get TBD event's ID
            let trashEventID = $(that).parents(".event-block").attr("event-id");

            // get TBD event's name
            let trashEventName = $(that).parents(".event-block").find(".event-name").text();

            $(".del-popup").fadeIn(popupFadeSpeed);

            $(".del-popup h3").empty();
            $(".del-popup h3").html(`Are you sure you want to delete <span class="popup-event-name">${trashEventName}</span>?`);
            $(".del-popup #popup_action_1").attr("event-id",trashEventID);
        });

        /********************************************************************** */
        /******* CANCEL BUTTON CLICK ****************************************** */
        /********************************************************************** */
        $(document).on("click", "#popup_action_2", function(){
            let that = this;
            $(".del-popup").fadeOut(popupFadeSpeed);
        });
    
        /********************************************************************** */
        /******* CONFIRM DELETION ********************************************* */
        /********************************************************************** */
        let removeCardSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Remove-Event-Speed"));
    
        $(document).on("click", "#popup_action_1", function(){

            let that = this;

            $(".del-popup").fadeOut(popupFadeSpeed);

            let trashEventID = $(that).attr("event-id");

            let parentBlock = $(`.event-block[event-id="${trashEventID}"]`);
            
            let focusCol = Number(parentBlock.attr("column"));
            let focusPanel = Number(parentBlock.attr("slide"));
    
            // CURRENT EVENT - zoom out
            parentBlock.find(".block-inner").addClass("zoom-out");

            setTimeout(() => {
                parentBlock.nextAll(".event-block").addClass("block-move-left");

                setTimeout(() => {

                    parentBlock.nextAll(".event-block").removeClass("block-move-left");

                    parentBlock.remove();
                    reInitEvents();

                    $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(focusPanel-1) + ")");

                    // if there is only 1 slide left
                    // hide both arrows
                    if(slidesNeeded == 1){
                        $(".prev-events, .next-events").css("visibility","hidden")
                    }
                    // if the user is already on the last slide
                    // hide the next arrow
                    if(focusPanel == slidesNeeded){
                        $(".next-events").css("visibility","hidden")
                    }

                    // force the user to go back to the prev slide
                    // if there is nothing left on THAT slide
                    else if(focusPanel > slidesNeeded){
                        $(".events-grid").css("margin-left","calc(" + panelSpan + " * -" + Math.floor(focusPanel-2) + ")");
                    }
                },removeCardSpeed)
            },removeCardSpeed)
        })//end trash click
    })//end ready
} else {
    alert("you are not logged in")
    setTimeout(()=>{
        window.location.href="./login.html";
    },1000)
}





