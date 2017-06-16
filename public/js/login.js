$('#login').on ('click', ()=>{
  let email = $("#email").val();
  let pass = $("#pass").val();
  if(email==''||pass==''){
    return
  }
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
          alert('Incorrect email or password')
          console.log('Incorrect email or password');
        }
    }
  })
});
