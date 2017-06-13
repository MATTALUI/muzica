$('#create_user').on ('click', ()=>{
  var email = $("#create_email").val();
  var pass = $("#password").val();
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var sc_username = $("#sc_username").val();

  // console.log(email,pass)
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/create/createuser",
    data: {
      email: email,
      password: pass,
      first_name: first_name,
      last_name: last_name,
      sc_username: sc_username
    },
    success: function(res){
      console.log(res);
    }
  })
});
