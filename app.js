birdData = []
$.getJSON('birdData.json', function (data) {
    w = 960;
    h = 600;
    var source = new proj4.Proj("EPSG:3857");
    var dest = new proj4.Proj("EPSG:4326");
    birdData = data;
    temp = birdData;
    drawMap();
    for (i = 0; i < birdData.features.length; i++) {
        // for (i = 0; i < 2; i++) {
        for (j = 0; j < birdData.features[i].geometry.coordinates[0][0].length; j++) {
            temp.features[i].geometry.coordinates[0][0][j] = proj4(
                source,
                dest,
                birdData.features[i].geometry.coordinates[0][0][j]
            );
            // console.log(temp.features[i].geometry.coordinates[0][0][j])
        }
    }

    var projection = d3.geoAlbersUsa().translate([w/2,h/2]);
    // var projection = d3.geoAlbersUsa().translate();
    // var projection = d3.geoMercator().translate([w / 2, h / 2]);

    var path = d3.geoPath().projection(projection);

    //Define path generator
    // var path = d3.geoPath();
    svg = d3.select("#usa");
    months = []
    // for (i = 0; i < temp.features.length; i++) {
    //     for (j = 0; j < 12; j++) {
    //         months[j] = temp.features[i].properties["m0" + (j + 1)]
    //         svg.selectAll("path")
    //             .data(temp.features[i])
    //             .enter()
    //             .attr("d", path)
    //             .style("fill", function (d, i) {
    //                 var color = d3.rgba(10,10,55,months[j])
    //                 return color
    //             })
    //     }
    // }
    svg.selectAll("path")
        .data(temp.features)
        .enter()
        .append("path")
        .attr('d', path)
        .style("fill", function (d, i) {
            return "ffff11";
        });
    console.log(data);
});

function drawMap() {
    // var projection = d3.geoAlbersUsa().translate([w / 2, h / 2]);
    var projection = d3.geoAlbersUsa().translate();

    var path = d3.geoPath().projection(projection);

    var svg = d3.select("svg");

    var path = d3.geoPath();

    d3.json("allamerica.json", function (error, us) {
        if (error) throw error;

        // svg.append("path")
        //     .attr("stroke", "#aaa")
        //     .attr("stroke-width", 0.5)
        //     .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); })));

        svg.append("path")
            .attr("stroke-width", 0.5)
            .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            })));

        svg.append("path").attr("d", path(topojson.feature(us, us.objects.nation)));
    });
    // var map = L.map('map')
}