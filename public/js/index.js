
(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space

function setIframe(username, track){
  var widgetapi = "https://w.soundcloud.com/player/?url=";
  $('iframe').attr('src', widgetapi + 'https://soundcloud.com/'+ username + '/' + track + '');
}

function addCommit(){
  var $newCom = $('.example-master').clone();
  console.log($newCom);
  $newCom.prependTo('.card-container');
}

$(document).ready(function(){
  setIframe('jahseh-onfroy', 'garettes-revenge-produced');

  $('.add-commit').on('click', function(){
    addCommit();
  });
});
