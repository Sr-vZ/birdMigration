const request = require('request')
const fs = require('fs')
const proj4 = require('proj4')

birdUrl = 'https://ebird.org/geoserver/clo/ows?service=WFS&version=1.0.0&request=GetFeature&typename=clo:Acadian_Flycatcher_100_1_270_grid&outputFormat=json&bbox=-15216056.825996146,-4790854.375244899,-3416625.6436700565,11372213.877825333'
// birdUrl ='https://ebird.org/geoserver/clo/ows?service=WFS&version=1.0.0&request=GetFeature&typename=clo:Wood_Thrush_100_1_270_grid&outputFormat=json&bbox=-13182088.13967533,-90747.31197734526,-5697374.329990871,7990786.81455777'

request(birdUrl, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  temp = JSON.parse(body)
  birdData = temp;
  var source = new proj4.Proj("EPSG:3857");
  var dest = new proj4.Proj("EPSG:4326");

  fs.writeFileSync('birdData.json', JSON.stringify(temp, null, 2))
  for (i = 0; i < birdData.features.length; i++) {
    // for (i = 0; i < 2; i++) {
    for (j = 0; j < birdData.features[i].geometry.coordinates[0][0].length; j++) {
      birdData.features[i].geometry.coordinates[0][0][j] = proj4(
        source,
        dest,
        temp.features[i].geometry.coordinates[0][0][j]
      );
      // console.log(temp.features[i].geometry.coordinates[0][0][j])
    }
  }
  fs.writeFileSync('birdDataConverted.json', JSON.stringify(birdData, null, 2))
  //point data
  for (i = 0; i < birdData.features.length; i++) {
    // for (i = 0; i < 2; i++) {
    // for (j = 0; j < birdData.features[i].geometry.coordinates[0][0].length; j++) {
    birdData.features[i].geometry.type = 'Point'
    // birdData.features[i].geometry.coordinates
    point = birdData.features[i].geometry.coordinates[0][0][0]
    birdData.features[i].geometry.coordinates = point
    // birdData.features[i].geometry.coordinates = proj4(
    //   source,
    //   dest,
    //   temp.features[i].geometry.coordinates[0][0][0]
    // );
    // console.log(temp.features[i].geometry.coordinates[0][0][j])
    // }
  }
  fs.writeFileSync('birdDataPoints.json', JSON.stringify(birdData, null, 2))
});

mapUrl = 'https://unpkg.com/us-atlas@1/us/10m.json'

// request(mapUrl, function (error, response, body) {
//     // console.log('error:', error); // Print the error if one occurred
//     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     // console.log('body:', body); // Print the HTML for the Google homepage.
//     temp = JSON.parse(body)
//     fs.writeFileSync('usa.json',JSON.stringify(temp,null,2))
//   });