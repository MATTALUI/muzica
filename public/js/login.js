$('#login').on ('click', ()=>{
  // console.log("123");
  let email = $("#email").val();
  let pass = $("#pass").val();
  if(email==''||pass==''){
    return
  }
  console.log(email,pass)
  $.ajax({
    type: "POST",
    url: "/users/login",
    data: {
      email: email,
      password: pass
    },
    success: function(res){
        // console.log(res);
        if (res==true){
          console.log(res);
          window.location.replace('../home.html')
        } else{
          console.log('Incorrect email or password');
        }
    }
  })
});
