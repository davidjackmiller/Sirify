// Base64 encoding of your credentials
let clientID = '682807078fb44299b03f7e6fff89dd51'
let clientSecret = 'e01ed44c071e4215836590971ac65341'
let cred = clientID + ':' + clientSecret
let credEncoded = Data.fromString(cred).toBase64String()
let auth = 'Basic ' + credEncoded

// Find the refresh token
var ref_token = ""
Contact.all(ContactsContainer.all()).then(function(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].givenName == "Sirify") {
            ref_token = contacts[i].note
            break
        }
    }
   
    // Get a new access token
    let tokenURL = 'https://accounts.spotify.com/api/token'
    var reqToken = new Request(tokenURL)
    reqToken.method = 'POST'
    reqToken.body = 'grant_type=refresh_token&refresh_token=' + ref_token
    reqToken.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': auth
    }

    let res = await reqToken.loadJSON()
    let token = res['access_token']
    let auth2 = 'Bearer ' + token

    // Fetch the user's tracks
    let endpoint = 'https://api.spotify.com/v1/me/tracks'
    let method = 'GET'
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth2
    }

    // Make the request
    let req = new Request(endpoint)
    req.method = method
    req.headers = headers

    // Get the track URL
    let json = await req.loadJSON()
    console.log(json)

    // Open the track on Spotify
    //Safari.open(finalURL)
})