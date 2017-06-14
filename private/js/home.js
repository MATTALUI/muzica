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

$('#logout_button').on('click', () => {
  console.log("start");
  $.ajax({
    type: "GET",
    url: "/users/logout",
    success: function(res){
        console.log("return of logout button",res);
        if (res===true){
          // console.log(req.cookies.token);
          // console.log("retrun of logout button", res);
          window.location.replace('/')
        } else{
          console.log('Error');
        }
    }
  })
});
