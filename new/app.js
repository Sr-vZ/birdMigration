birdData = []
// var projection = d3.geoAlbersUsa();
var svg = d3.select("svg");
$.getJSON('wood_duck.json', function (data) {
    w = 960;
    h = 600;

    birdData = data;
    temp = birdData;
    drawMap();


    var projection = d3.geoAlbersUsa();

    Species = "American Robin"
    coordData = []
    coordData2 = []
    dates = []
    lineCoords = []
    for (i = 1; i < birdData.length; i++) {
        // if (birdData[i]["COMMON NAME"] === "American Robin") {
        // coordData.push({
        //     longitude:birdData[i]["LONGITUDE"],
        //     latitude: birdData[i]["LATITUDE"]
        // })
        temp = []
        coordData.push([birdData[i]["LONGITUDE"], birdData[i]["LATITUDE"]])
        coordData2.push([birdData[i - 1]["LONGITUDE"], birdData[i - 1]["LATITUDE"]])
        dates.push(new Date(birdData[i]["OBSERVATION DATE"] + ' ' + birdData[i]["TIME OBSERVATIONS STARTED"]))
        // temp.push(projection(coordData[i]))
        // temp.concat(projection(coordData2[i]))
        lineCoords.push([birdData[i]["LONGITUDE"], birdData[i]["LATITUDE"], birdData[i - 1]["LONGITUDE"], birdData[i - 1]["LATITUDE"]])
        // }
    }


    svg.selectAll("circle")
        .data(coordData).enter()
        .append("circle")
        .attr("cx", function (d) {
            console.log(projection(d));
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", "1px")
        .attr("fill", "red")
    // .call(lineAnimate)

   var lines = svg.selectAll('line')
        .data(lineCoords).enter()
        .append('line')
        .attr("x1", function(d){return projection(d.slice(0,2))[0]})
        .attr("y1", function(d){return projection(d.slice(0,2))[1]})
        // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
        // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
        .attr("x2", function(d){return projection(d.slice(0,2))[0]})
        .attr("y2", function(d){return projection(d.slice(0,2))[1]})
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        // .style("opacity",0.5)
        // .transition()
        // // .ease('linear')
        // .duration(1000)
        // // .delay(function(d) {return d*10;})
        // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
        // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
        // .style('opacity', 0)
            // .each('end', function () {
            //     d3.select(this).call(repeat)
            // });
        // .call(repeat);
        .style("opacity",0.8)
        .transition()
        // .ease('easeLinear')
        .duration(1500)
        // .delay(function(d) {return d*10;})
        .attr("x2", function(d){return projection(d.slice(2,4))[0]})
        .attr("y2", function(d){return projection(d.slice(2,4))[1]})
        .style('opacity', 0.1)
        
    repeat()

    function repeat(){
        var lines = svg.selectAll('line')
        .data(lineCoords).enter()
        .append('line')
        .attr("x1", function(d){return projection(d.slice(0,2))[0]})
        .attr("y1", function(d){return projection(d.slice(0,2))[1]})
        // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
        // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
        .attr("x2", function(d){return projection(d.slice(0,2))[0]})
        .attr("y2", function(d){return projection(d.slice(0,2))[1]})
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .style("opacity",0.9)
        .transition()
        // .ease('easeLinear')
        .duration(1500)
        // .delay(function(d) {return d*10;})
        .attr("x2", function(d){return projection(d.slice(2,4))[0]})
        .attr("y2", function(d){return projection(d.slice(2,4))[1]})
        .style('opacity', 0.5)
            // .each('end', function () {
            //     d3.select(this).call(lineAnimate)
            // });
        // .on('end',repeat)
        .on('end', repeat);

    }

    // function lineAnimate(selection) {
    //     selection
    //     .attr({x1: 200, x2: 200})
    //     .attr('y1', function(d) {return d;})
    //     .attr('y2', function(d) {return d;})
    //     .style('opacity', 0.5)
    //     .transition()
    //         .ease('linear')
    //         .duration(1000)
    //         .delay(function(d) {return d*10;})
    //         .attr('x2', 500)
    //     .transition()
    //         .duration(1000)
    //         .style('opacity', 0)
    //     .each('end', function() {d3.select(this).call(lineAnimate)});
    // }

    var line = d3.line();
    // var path = svg.append('path').attr('d', line(coordData));
    d3.select('path')
        .attr('d', line(coordData))
        .transition()
        // .ease('linear')
        // .attrTween('d', function () { 
        //     return d3.interpolatePath(line(coordData), line(coordData2)); 
        //   });
        .transition()
        .attr('d', line(coordData2));

    function lineAnimate(selection) {
        selection
            // .attr({
            //     x1: function (d) {
            //         return projection(d)[0]
            //     },
            //     x2: function (d) {
            //         return projection(d)[0]
            //     },
            //     y1: function (d) {
            //         return projection(d)[1]
            //     },
            //     y2: function (d) {
            //         return projection(d)[1]
            //     }
            // })
            // .attr("x1", function(d){return projection(d.slice(0,2))[0]})
            // .attr("y1", function(d){return projection(d.slice(0,2))[1]})
            // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
            // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
            .style('opacity', 0.5)
            .transition()
            // .ease('linear')
            .duration(1000)
            .delay(function (d) {
                return d * 10;
            })
            .attr("x2", function(d){return projection(d.slice(2,4))[0]})
            .attr("y2", function(d){return projection(d.slice(2,4))[1]})
            .transition()
            .duration(1000)
            .style('opacity', 0)
            .each('end', function () {
                d3.select(this).call(lineAnimate)
            });
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

        svg.append("path")
            .attr("stroke-width", 0.5)
            .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            })));

        svg.append("path").attr("d", path(topojson.feature(us, us.objects.nation)));
        const g = svg.append("g");

        function zoomed() {
            g.attr("transform", d3.event.transform);
        }
    });
    // var map = L.map('map')

}