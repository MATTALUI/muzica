$(document).ready(function(){
  $.get('projects', function(response){
      makeCards(response);
      makeDropdown(response);
    $.get('permissions/me', function(resp){
      makeOtherCards(resp);
      makeDropdownWithCollabs(resp);
      $.get('projects/masters', function(res){
        addIframe(res);
      });
    });
  });
  $.get('/users/me', function(res){
    var name = ""+ res.first_name + ' '+ res.last_name +'';
    $('.title').html('Welcome, '+name+'. ');
  });
});

function makeDropdownWithCollabs(array){
  var dropdown1 = document.getElementById('dropdown1')
  var dropdown3 = document.getElementById('dropdown3')
  array.map((ele,index,arr)=>{
    var li = document.createElement('li')
    var divider = document.createElement('li')
    var anchor = document.createElement('a')
    divider.setAttribute('class','divider')
    anchor.setAttribute('href',('/production.html?id='+ele.id))
    anchor.innerHTML = ele.project_title
    $(dropdown1).append(divider);
    $(li).append(anchor);
    $(dropdown1).append(li);
    })
    return array.map((ele,index,arr)=>{
      var li = document.createElement('li')
      var divider = document.createElement('li')
      var anchor = document.createElement('a')
      divider.setAttribute('class','divider')
      anchor.setAttribute('href',('/production.html?id='+ele.id))
      anchor.innerHTML = ele.project_title
      $(dropdown3).append(divider);
      $(li).append(anchor);
      $(dropdown3).append(li);
      })
}

function makeDropdown(array){
  $('#dropdown1').empty();
  $('#dropdown3').empty();
  var dropdown1 = document.getElementById('dropdown1')
  var dropdown3 = document.getElementById('dropdown3')
  array.map((ele,index,arr)=>{
    var li = document.createElement('li')
    var divider = document.createElement('li')
    var anchor = document.createElement('a')
    divider.setAttribute('class','divider')
    anchor.setAttribute('href',('/production.html?id='+ele.id))
    anchor.innerHTML = ele.project_title
    $(dropdown1).append(divider);
    $(li).append(anchor);
    $(dropdown1).append(li);
    })
    return array.map((ele,index,arr)=>{
      var li = document.createElement('li')
      var divider = document.createElement('li')
      var anchor = document.createElement('a')
      divider.setAttribute('class','divider')
      anchor.setAttribute('href',('/production.html?id='+ele.id))
      anchor.innerHTML = ele.project_title
      $(dropdown3).append(divider);
      $(li).append(anchor);
      $(dropdown3).append(li);
      })
}

function addIframe(array){
  for (var i = 0; i < array.length; i++){
    var projectId = array[i].project_id;
    var widgeturl = array[i].widget_url;
    var $iframe = $(`#${projectId}`).find('iframe');
    var $img = $(`#${projectId}`).find('img');
    $img.addClass('hidden');
    $iframe.removeClass('hidden');
    $iframe.attr('src', `${widgeturl}`);
  }
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
    $('.project-container').append(html);
  }
}

function makeOtherCards(array){
  for (var i = 0; i < array.length; i++){
    var projectId = array[i].id;
    var projectTitle = array[i].project_title;
    var comments = array[i].project_description;
    var source = $("#other-Project").html();
    var template = Handlebars.compile(source);
    var context = {title: projectTitle, id: projectId, comment: comments};
    var html= template(context);
    $('.project-container').append(html);
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
      $.get('permissions/me', function(response){
        makeOtherCards(response);
        makeDropdown(res);
        makeDropdownWithCollabs(response);
        $.get('projects/masters', function(resp){
          addIframe(resp);
        });
      });
    }
  });
});

$('.logout_button').on('click', () => {
  $.ajax({
    type: "GET",
    url: "/users/logout",
    success: function(res){
      if (res){
        window.location.replace('/')
      } else{
        console.log('error');
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
      makeCards(res);
      $.get('permissions/me', function(response){
        makeOtherCards(response);
        makeDropdown(res);
        makeDropdownWithCollabs(response);
        $.get('projects/masters', function(response){
          addIframe(response);
        });
      });
    }
  });
});


$('#save_project_button').on('click', () => {
  let title = $("#new_project_title").val();
  $("#new_project_title").val('');
  let description = $("#new_project_description").val();
  $("#new_project_description").val('');
  $.ajax({
    type: "POST",
    url: "/projects",
    data: {
      projectTitle: title,
      projectDescription: description
    },
    success: function(res){
      location.reload();
    }
  })
});
