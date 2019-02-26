const fs = require('fs')


temp = JSON.parse(fs.readFileSync('birdData.json'))
fs.writeFileSync('birdData.json', JSON.stringify(temp, null, 2))
data = []
for (i = 0; i < temp.features.length; i++) {
    console.log(temp.features[i].properties)
    // for (j = 0; j < temp.features[i].geometry.properties.length; j++) {
    //     console.log(temp.features[i].geometry.properties)
    // }
    data.push(temp.features[i].properties)
}
fs.writeFileSync('properties.json',JSON.stringify(data,null,2))