
birdData = []
// var projection = d3.geoAlbersUsa();

var svg = d3.select("svg");
c = []
drawMap();
apiLinks = ['https://ebird.org/geoserver/clo/ows?service=WFS&version=1.0.0&request=GetFeature&typename=clo:Acadian_Flycatcher_100_1_270_grid&outputFormat=json']

$.getJSON('https://crossorigin.me/'+apiLinks[0], function (data) {
    w = 960;
    h = 600;

    birdData = data;
    temp = birdData;
    var projection = d3.geoAlbersUsa();

    Species = "American Robin"
    coordData = []
    coordData2 = []
    dates = []
    lineCoords = []
    projLineCoords =[]
    for (i = 1; i < birdData.length; i++) {
        // if (birdData[i]["COMMON NAME"] === "American Robin") {
        // coordData.push({
        //     longitude:birdData[i]["LONGITUDE"],
        //     latitude: birdData[i]["LATITUDE"]
        // })
        temp = []
        coordData.push([birdData[i]["LONGITUDE"], birdData[i]["LATITUDE"]])
        // coordData.push([birdData[i]["LATITUDE"], birdData[i]["LONGITUDE"]])
        coordData2.push([birdData[i - 1]["LONGITUDE"], birdData[i - 1]["LATITUDE"]])
        dates.push(new Date(birdData[i]["OBSERVATION DATE"] + ' ' + birdData[i]["TIME OBSERVATIONS STARTED"]))
        // temp.push(projection(coordData[i]))
        // temp.concat(projection(coordData2[i]))
        lineCoords.push([birdData[i]["LONGITUDE"], birdData[i]["LATITUDE"], birdData[i - 1]["LONGITUDE"], birdData[i - 1]["LATITUDE"]])
        
        // }
    }

    for(i=0;i<coordData2.length;i++){
        projLineCoords.push(projection(coordData[i]).concat(projection(coordData2[i])))
    }


    function drawCircle() {
        circles = svg.selectAll("circle")
            .data(coordData).enter()
            .append("circle")
            .attr("cx", function (d) {
                // console.log(projection(d));
                return projection(d)[0];
            })
            .attr("cy", function (d) {
                return projection(d)[1];
            })
            .attr("r", "1px")
            .attr("fill", "red")
        return circles
    }


    var lineGenerator = d3.line()
        // .curve(d3.curveBasisClosed);
        .curve(d3.curveBasisClosed);
    var pathData = lineGenerator(projLineCoords);

    svg
        // .selectAll('path')
        .append("path")
        .attr('d', pathData)
        .attr("class", "path-anim")
        .attr("stroke", "grey")
        .attr("stroke-dasharray",100)
        .attr("stroke-width", .7)
        
        // .attr("fill", "none");
    
    // c = drawCircle()
    // drawPaths()
    function drawPaths() {
        svg.selectAll("path")
            .data(lineCoords).enter()
            .append("path")
            .attr("d", d3.line()
                .curve(d3.curveBasis))
            .attr("stroke", "blue")
            .attr("stroke-width", 1)
            .attr("fill", "none");

    }

});

function drawMap() {
    // var projection = d3.geoAlbersUsa().translate([w / 2, h / 2]);


    d3.json("usa.json", function (error, us) {
        if (error) throw error;
        width = 960;
        height = 600;

        // svg.append("path")
        //     .attr("stroke", "#aaa")
        //     .attr("stroke-width", 0.5)
        //     .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); })));
        var projection = d3.geoAlbersUsa().translate();

        var path = d3.geoPath().projection(projection);



        var path = d3.geoPath();
        const zoom = d3.zoom()
            .scaleExtent([1, 40])
            .translateExtent([
                [0, 0],
                [width, height]
            ])
            .extent([
                [0, 0],
                [width, height]
            ])
            .on("zoom", zoomed);

        var svg = d3.select("svg").call(zoom);

        // svg.append("path")
        //     .attr("stroke-width", 0.5)
        //     .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
        //         return a !== b;
        //     })));

        svg.append("path").attr("d", path(topojson.feature(us, us.objects.nation))).attr("class","map-path");
        
        const g = svg.append("g");

        function zoomed() {
            g.attr("transform", d3.event.transform);
        }
    });
    // var map = L.map('map')

}