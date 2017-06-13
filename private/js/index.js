
(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space

function setIframe(username, track){
  var widgetapi = "https://w.soundcloud.com/player/?url=";
  return ""+ widgetapi + "https://soundcloud.com/"+ username + "/" + track + "";
}

function addCommit(){
  var $newCom = $('.example-master').clone();
  $newCom.prependTo('.card-container');
}


$(document).ready(function(){
  $('.example-master').children('iframe').attr('src',""+ setIframe('jahseh-onfroy', 'garettes-revenge-produced')+"");
  $('.add-commit').on('click', function(){
    var trackName = ($('#track').val());
    var comment = ($('#soundNotes').val());
    addCommit();
  });
});

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
