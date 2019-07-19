// Base64 encoding of your credentials
let clientID = '682807078fb44299b03f7e6fff89dd51'
let clientSecret = 'e01ed44c071e4215836590971ac65341'
let cred = clientID + ':' + clientSecret
let credEncoded = Data.fromString(cred).toBase64String()
let auth = 'Basic ' + credEncoded

// Get token
let tokenURL = 'https://accounts.spotify.com/api/token'
var reqToken = new Request(tokenURL)
reqToken.method = 'POST'
reqToken.body = 'grant_type=client_credentials&undefined='
reqToken.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': auth
}

let res = await reqToken.loadJSON()
let token = res['access_token']
let auth2 = 'Bearer ' + token

// Params
let uri = "https://open.scriptable.app/run?scriptName=SirifyAuth2"
var endpoint = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&response_type=code&redirect_uri=' + uri
let scopes = ["user-library-modify", 
    "user-library-read", 
    "playlist-read-private",
    "playlist-modify-private",
    "user-read-playback-state",
    "streaming"]
endpoint += '&scope=' + encodeURI(scopes.join(" "))
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

// Open the authorization page
let json = await req.loadJSON()
Safari.open(req.response.url)