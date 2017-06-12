console.log('hello world');


var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
function initClient() {
  gapi.client.init({
      apiKey: 'AIzaSyCLkyxK-2pRusMpOy3ZrDWRnnq9iE1kpGI',
      clientId: '690471580414-98643r3ggmod6p0t3ecvc7jkv2ct5qtg.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.file'
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    document.getElementById('authorize-button').onclick = handleAuthClick;
    document.getElementById('signout-button').onclick = handleSignoutClick;
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    document.getElementById('authorize-button').style.display = 'none';
    document.getElementById('signout-button').style.display = 'block';
    // makeApiCall();
  } else {
    document.getElementById('authorize-button').style.display = 'block';
    document.getElementById('signout-button').style.display = 'none';
  }
}
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.people.people.get({
    'resourceName': 'people/me',
    'requestMask.includeField': 'person.names'
  }).then(function(resp) {
    var p = document.createElement('p');
    var name = resp.result.names[0].givenName;
    p.appendChild(document.createTextNode('Hello, '+name+'!'));
    document.getElementById('content').appendChild(p);
  });
}
