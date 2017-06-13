$('#create_user').on ('click', ()=>{
  console.log('456');
  var email = $("#create_email").val();
  var pass = $("#password").val();
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var sc_username = $("#sc_username").val();
  var confirm_pass = $('#confirm_password')

  // if (pass!==confirm_pass) {
  //   console.log('passwords do not match');
  //   return res.send('passwords do not match')
  // }
  // console.log(email,pass)
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/users/createuser",
    data: {
      email: email,
      password: pass,
      first_name: first_name,
      last_name: last_name,
      sc_username: sc_username
    },
    success: function(res){
      if(res){
        window.location.replace('/home.html')
      }
      console.log(res);
    }
  })
});
