function $(x) {return document.getElementById(x);} // Defines $()
function $c(x) {return document.getElementsByClassName(x);} // Defines $c()

let editMode = false;

//Cached element referances
const modal = $("modal"); 
const modalBtn = $("modalBtn"); 

const navLis = $c("navLi");

const editModeEleOn = $("editModeOn");
const editModeEleOff = $("editModeOff");
const editModeEleOnDiv = $("editModeOnDiv");
const editModeEleOffDiv = $("editModeOffDiv");

//Event listener functions

// Items Show Page Toggle Edit Mode
if (editModeEleOnDiv || editModeEleOffDiv){
    editModeEleOnDiv.style.display = "none";
    editModeEleOffDiv.style.display = "flex";
    editModeEleOn.addEventListener("click", editModeToggle);
    editModeEleOff.addEventListener("click", editModeToggle);
    function editModeToggle () {
        if (editMode){
            editModeEleOnDiv.style.display = "none";
            editModeEleOffDiv.style.display = "flex";
        } else {
            editModeEleOnDiv.style.display = "flex";
            editModeEleOffDiv.style.display = "none";
        }
        editMode = !editMode;
    }
} 

//Modal-----------------------------------------
if (modalBtn !== null) {
    modalBtn.onclick = function() { // modal on
        modal.style.display = "block";
        document.body.style.overflowY = "hidden";
    }
    window.onclick = function(event) { // modal off
        if (event.target !== modalBtn) {    
            modal.style.display = "none";
            document.body.style.overflowY = "visible";
        }
    }
    window.onscroll = function (){ //Keep modal still in a relative position (CSS position: fixed should be doing this but isn't)
        modal.style.top = `${(window.scrollY/10)-55}px`;
    }
}


//other functions

// sets active link in navbar
function setActivePage () {
	for (i=0; i < navLis.length; i++){
		if(navLis[i].id === location.pathname){
			navLis[i].classList.add('active');
		}
	}
}

function preloadImages(){
    let images = Array.from(arguments);
    for (let image of images) {
        let img = new Image();
        img.src = image;
    }
}

function init () {
	setActivePage();
	preloadImages(
    "/images/aro.png", 
    "/images/bg.jpeg", 
    "/images/displayImg.jpeg", 
    "/images/emailIcon.png", 
    "/images/favicon.png", 
    "/images/fb.png", 
    "/images/fp1.jpeg",
    "/images/logo.png",
    "/images/logotrans.png",
    "/images/phoneIcon.png",
    "/images/twit.png"
	);
}

init();