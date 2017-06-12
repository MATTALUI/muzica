
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
