// Base64 encoding of your credentials
let clientID = '682807078fb44299b03f7e6fff89dd51'
let clientSecret = 'e01ed44c071e4215836590971ac65341'
let cred = clientID + ':' + clientSecret
let credEncoded = Data.fromString(cred).toBase64String()
let auth = 'Basic ' + credEncoded

// Receive the code
let code = URLScheme.parameter('code')
let uri = "https://www.cnn.com"

// Get refresh and access tokens
let tokenURL = 'https://accounts.spotify.com/api/token'
var reqToken = new Request(tokenURL)
reqToken.method = 'POST'
reqToken.body = 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + uri
reqToken.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': auth
}

// Getthe refresh token
let res = await reqToken.loadJSON()
let token = res['refresh_token']

// Save the refresh token to a contact
let contact = new Contact()
contact.givenName = "Sirify"
contact.note = token
Contact.add(contact)
Contact.persistChanges()

// Go back to sirify
Safari.open("https://www.cnn.com")

/*
// Params
let uri = "scriptable:///run?scriptName=SirifyAuth2"
let endpoint = 'https://accounts.spotify.com/authorize?client_id=' + clientID + '&response_type=code&redirect_uri=' + uri
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

// Get the redirect URL
let json = await req.loadJSON()

// console.log(req)
console.log(req.response.url)

Safari.open(req.response.url)
*/