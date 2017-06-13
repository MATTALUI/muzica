$(document).ready(function(){
  $.get('projects', function(response){
      makeCards(response);
  });
});

function makeCards(array){
  for (var i = 0; i < array.length; i++){
    var projectId = array[i].id;
    var projectTitle = array[i].project_title;
    var source = $("#Project").html();
    var template = Handlebars.compile(source);
    var context = {title: projectTitle, id: projectId};
    var html= template(context);
    $('.project-container').prepend(html);
  }
}
