
(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  var testPlayer = new AudioPlayer({
      element: "#playerContainer",
      file: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/616095/drumsolo.mp3",
      width: 500,
      amplify: 1,
      scaleFactor: 60
    });

    var player1 = new AudioPlayer({
        element: "#playerContainer1",
        file: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/616095/drumsolo.mp3",
        width: 500,
        amplify: 1,
        scaleFactor: 60
      });

});

// get the elements
const modal = document.getElementById('myModal')
const button = document.getElementById("modal-button")
const close = document.querySelectorAll(".close")[0]
const clickable = document.querySelectorAll('.clickable')

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
