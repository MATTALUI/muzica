$(document).ready(function(){
  $.get('projects', function(response){
      makeCards(response);
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

function makeCards(array){
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

$('.logout_button').on('click', () => {
  console.log("start");
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
