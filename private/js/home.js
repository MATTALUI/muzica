$(document).ready(function(){
  $.get('projects', function(response){
      makeCards(response);
      makeDropdown(response);
  });
});

function makeDropdown(array){
  var dropdown1 = document.getElementById('dropdown1')
  var dropdown3 = document.getElementById('dropdown3')
  array.map((ele,index,arr)=>{
    var li = document.createElement('li')
    var anchor = document.createElement('a')
    anchor.setAttribute('href',('/production.html?id='+ele.id))
    anchor.innerHTML = ele.project_title
    $(dropdown1).append(li);
    $(li).append(anchor);
    })
    return array.map((ele,index,arr)=>{
      var li = document.createElement('li')
      var anchor = document.createElement('a')
      anchor.setAttribute('href',('/production.html?id='+ele.id))
      anchor.innerHTML = ele.project_title
      $(dropdown3).append(li);
      $(li).append(anchor);
      })
}

function makeCards(array){
  $('.project-container').empty();
  for (var i = 0; i < array.length; i++){
    var projectId = array[i].id;
    var projectTitle = array[i].project_title;
    var comments = array[i].project_description;
    var source = $("#Project").html();
    var template = Handlebars.compile(source);
    var context = {title: projectTitle, id: projectId, comment: comments};
    var html= template(context);
    $('.project-container').prepend(html);
  }
}

$('body').on('click', '.delete-project', () => {
  var projectId = ($(event.target).closest('.exmaple-commit').attr('id'));
  $.ajax({
    type: "DELETE",
    url: "projects",
    data: {projectId},
    success: function(res){
      makeCards(res);
    }
  });
});

$('.logout_button').on('click', () => {
  $.ajax({
    type: "GET",
    url: "/users/logout",
    success: function(res){
        if (res){
          console.log("retrun of logout button", res);
          window.location.replace('/')
        } else{
          console.log('Error');
        }
    }
  })
});


$('body').on('click', '.edit', ()=>{
  $(event.target).closest('.exmaple-commit').addClass('projy-proj');
});

$('body').on('click', '.update-project', ()=>{
  var newTitle = $('#title').val();
  $('#title').val('');
  var newDescription = $('#description').val();
  $('#description').val('');
  var project_id = $('.projy-proj').attr('id');
  $('.projy-proj').removeClass('projy-proj');
  var dataObj = {
    projectId: project_id,
    project_title: newTitle,
    project_description: newDescription
  };
  $.ajax({
    type: "PATCH",
    url: "projects",
    data: dataObj,
    success: function(res){
      console.log(res);
      // makeCards(res);
    }
  })
});


$('#save_project_button').on('click', () => {
  let title = $("#new_project_title").val();
  let description = $("#new_project_description").val();
  console.log(title,description);
  $.ajax({
    type: "POST",
    url: "/projects",
    data: {
      projectTitle: title,
      projectDescription: description
    },
    success: function(res){
        console.log("return of new project button button",res);
        // if (res===true){
        //   // console.log(req.cookies.token);
        //   // console.log("retrun of logout button", res);
        //   window.location.replace('/')
        // } else{
        //   console.log('Error');
        // }
    }
  })
});
