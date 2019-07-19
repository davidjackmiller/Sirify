// Base64 encoding of your credentials
let clientID = '682807078fb44299b03f7e6fff89dd51'
let clientSecret = 'e01ed44c071e4215836590971ac65341'
let cred = clientID + ':' + clientSecret
let credEncoded = Data.fromString(cred).toBase64String()
let auth = 'Basic ' + credEncoded

// Receive the code
let code = URLScheme.parameter('code')
let uri = "https://open.scriptable.app/run?scriptName=SirifyAuth2"

// Get refresh and access tokens
let tokenURL = 'https://accounts.spotify.com/api/token'
var reqToken = new Request(tokenURL)
reqToken.method = 'POST'
reqToken.body = 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + uri
reqToken.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': auth
}

// Get the refresh token
let res = await reqToken.loadJSON()
let token = res['refresh_token']

// Write the refresh token to memory
let filePath = "/SirifyRefreshToken.txt"
FileManager.writeString(filePath, token)

// Load a confirmation page
// Safari.open("https://www.cnn.com")