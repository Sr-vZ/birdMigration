var myGeoJSONPath = 'custom.geo.json';
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
    radius: 2,
    fillColor: "#000000",
    color: "#000000",
    weight: 1,
    fillOpacity: 1
};
birdData = []
var map = L.map('map').setView([39.74739, -105], 4);
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
    $.getJSON('birdDataPoints.json', function (data) {
        console.log(data)
        birdData = data
        // L.geoJSON(birdData, {
        //     style: overlay
        // }).addTo(map);
        var circle = []
        for(i=0;i<birdData.features.length;i++){
            circle.push(L.circle(birdData.features[i].geometry.coordinates, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map))
        }
        
    })


})