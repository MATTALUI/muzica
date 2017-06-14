
(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space


// get the elements
const modal = document.getElementById('myModal');
const button = document.getElementById("modal-button");
const close = document.querySelectorAll(".close")[0];
const clickable = document.querySelectorAll('.clickable');

const openModal = function() {
	modal.style.display = "block"
}
const closeModal = function() {
		modal.style.display = "none"
	}
	//event listeners
button.addEventListener('click', openModal, false)
close.addEventListener('click', closeModal, false)
for (let i = 0; i < clickable.length; i++) {
	clickable[i].addEventListener('click', openModal, false)
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none"
	}
}

// bio page functions
$(document).ready(function () {

    // prepend overlay to DOM
    $('.team-item', this).prepend($("<div class='overlay'></div>"));

    $(".team-item").hover(function () {
        $('.overlay', this).fadeToggle(400);
        $('.team-info', this).fadeToggle(400);
    });
});
