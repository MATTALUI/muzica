$('#login').on ('click', ()=>{
  // console.log('clicked');
  SC.connect().then(()=>{
    console.log('logged in.');
  })
});
