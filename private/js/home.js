$(document).ready(function() {
  $.get('http://localhost:8000/projects', function(response) {
    makeCards(response);
  });
});

function makeCards(array) {
  for (var i = 0; i < array.length; i++) {
    var projectId = array[i].id;
    var projectTittle = array[i].project_title;
    var source = $("#Project").html();
    var template = Handlebars.compile(source);
    var context = {
      title: projectTittle,
      id: projectId
    };
    var html = template(context);
    $('.project-container').prepend(html);
  }
}

$('#logout_button').on('click', () => {
  $.ajax({
    type: "GET",
    url: "/users/logout",
    success: function(res){
        // console.log(res);
        if (res){
          console.log(res);
          window.location.replace('../')
        } else{
          console.log('Error');
        }
    }
  })
});
