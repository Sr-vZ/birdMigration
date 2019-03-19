// var myGeoJSONPath = 'custom.geo.json';
var myGeoJSONPath = './new/allamerica.json'
var myCustomStyle = {
    stroke: false,
    fill: true,
    fillColor: '#fff',
    fillOpacity: 1
}
var overlay = {
    stroke: false,
    fill: true,
    fillColor: '#ff0',
    fillOpacity: .2
}
var pointStyle = {
    radius: 1,
    fillColor: "#000000",
    color: "#000000",
    weight: 1,
    fillOpacity: 1
};
birdData = []
var map = L.map('map').setView([39.74739, -105], 4);
var circle = [],
    lines = [],
    animatedMarkers = []
$.getJSON(myGeoJSONPath, function (data) {


            L.geoJSON(data, {
                clickable: false,
                style: myCustomStyle
            }).addTo(map);
            /*$.getJSON('birdDataPoints.json',function(data){
                //map = L.map('map').setView([39.74739, -105], 4);
                birdData = data
                L.circleMarker(data, {
                    clickable: false,
                    style: pointStyle
                }).addTo(map);
                
            })*/
            // $.getJSON('birdDataPoints.json', function (data) {
            $.getJSON('./new/wood_duck.json', function (data) {
                    console.log(data)
                    birdData = data
                    // L.geoJSON(birdData, {
                    //     style: overlay
                    // }).addTo(map);
                    
                    for (i = 0; i < birdData.length; i++) {
                        circle.push(L.circle([birdData[i]["LATITUDE"], birdData[i]["LONGITUDE"]], {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.5,
                            radius: 1
                        }).addTo(map))
                        j = 0
                        if (i > 0) {
                            j = i - 1
                            
                        }
                        lines.push(L.polyline([
                            [birdData[i]["LATITUDE"], birdData[i]["LONGITUDE"]],
                            [birdData[j]["LATITUDE"], birdData[j]["LONGITUDE"]]
                        ]))
                        animatedMarker = L.animatedMarker(lines[i].getLatLngs())
                        }

                map.addLayer(animatedMarker)
                    })


            })