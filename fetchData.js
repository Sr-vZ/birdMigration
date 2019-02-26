const request = require('request')
const fs = require('fs')

birdUrl = 'https://ebird.org/geoserver/clo/ows?service=WFS&version=1.0.0&request=GetFeature&typename=clo:Acadian_Flycatcher_100_1_270_grid&outputFormat=json&bbox=-15216056.825996146,-4790854.375244899,-3416625.6436700565,11372213.877825333'

request(birdUrl, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  temp = JSON.parse(body)
  fs.writeFileSync('birdData.json',JSON.stringify(temp,null,2))
});

mapUrl = 'https://unpkg.com/us-atlas@1/us/10m.json'

request(mapUrl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    temp = JSON.parse(body)
    fs.writeFileSync('usa.json',JSON.stringify(temp,null,2))
  });