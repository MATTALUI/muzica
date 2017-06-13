$('#login').on ('click', ()=>{
  console.log("123");
  var email = $("#email").val();
  var pass = $("#pass").val();
  // console.log(email,pass)
  $.ajax({
    type: "POST",
    url: "/users/login",
    data: {
      email: email,
      password: pass
    },
    success: function(res){
      console.log(res);
        if (res===true){
          window.location.replace('/home.html')
        } else{
          console.log('Incorrect email or password');
        }
    }
  })
});
