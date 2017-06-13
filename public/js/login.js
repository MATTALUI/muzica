$('#login').on ('click', ()=>{
  console.log("123");
  var email = $("#email").val();
  var pass = $("#pass").val();
  // console.log(email,pass)
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/users/login",
    data: {
      email: email,
      password: pass
    },
    success: function(res){
      console.log(res);
    }
  })
});
