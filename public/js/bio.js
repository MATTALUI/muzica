$(document).ready(function () {

    // prepend overlay to DOM
    $('.team-item', this).prepend($("<div class='overlay'></div>"));

    $(".team-item").hover(function () {
        $('.overlay', this).fadeToggle(400);
        $('.team-info', this).fadeToggle(400);
    });
    $.get('projects', function(response){
        makeDropdown(response)
    });
});

function makeDropdown(array){
  var dropdown1 = document.getElementById('dropdown1')
  var dropdown3 = document.getElementById('dropdown3')
  array.map((ele,index,arr)=>{
    console.log(ele);
    var li = document.createElement('li')
    var anchor = document.createElement('a')
    anchor.setAttribute('href',('/production.html?id='+ele.id))
    anchor.innerHTML = ele.project_title
    $(dropdown1).append(li);
    $(li).append(anchor);
    })
    return array.map((ele,index,arr)=>{
      console.log(ele);
      var li = document.createElement('li')
      var anchor = document.createElement('a')
      anchor.setAttribute('href',('/production.html?id='+ele.id))
      anchor.innerHTML = ele.project_title
      $(dropdown3).append(li);
      $(li).append(anchor);
      })
}


(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.modal').modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space
