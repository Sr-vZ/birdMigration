birdData = []
// var projection = d3.geoAlbersUsa();

var svg = d3.select("svg");
c = []
drawMap();
$.getJSON('wood_duck.json', function (data) {
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





    // c.each(function transition(d) {
    //     d3.select(this).transition()
    //         .duration(function (d) {
    //             return 1000;
    //         })
    //         .ease(d3.easeLinear)
    //         // .attrTween("transform", translateAlong(circlePath.node()))

    //         .on("end", transition);
    // })

    // timer = setInterval(test(c),500) 
    // test(c)
    // d3.interval(function (elapsed) {
    //         c
    //         .data(coordData2).enter()
    //         .append("circle")
    //         .transition()
    //         .attr("cx", function (d) {
    //             // console.log(projection(d));
    //             return 100
    //             // return projection(d)[0];
    //         })
    //         .attr("cy", function (d) {
    //             return 100
    //             // return projection(d)[1];
    //         })
    //         .attr("r", "1px")
    //         .attr("fill", "red")
    // }, 1000);
    // timer = setInterval(test(c), 500) 
    function test(shapes) {
        shapes
            .data(coordData2).enter()
            .append("circle")
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                // console.log(projection(d));
                return projection(d)[0];
            })
            .attr("cy", function (d) {
                return projection(d)[1];
            })
            .attr("r", "1px")
            .attr("fill", "red")
        // .on('end',test(c))
    }
    // .call(lineAnimate)

    // var lines = svg.selectAll('line')

    // svg.selectAll('line')
    //     .data(lineCoords).enter()
    //     .append('line')
    //     .attr("x1", function (d) {
    //         return projection(d.slice(0, 2))[0]
    //     })
    //     .attr("y1", function (d) {
    //         return projection(d.slice(0, 2))[1]
    //     })
    //     // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
    //     // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
    //     .attr("x2", function (d) {
    //         return projection(d.slice(0, 2))[0]
    //     })
    //     .attr("y2", function (d) {
    //         return projection(d.slice(0, 2))[1]
    //     })
    //     .attr("stroke-width", 1)
    //     .attr("stroke", "black")
    //     // .style("opacity",0.5)
    //     // .transition()
    //     // // .ease('linear')
    //     // .duration(1000)
    //     // // .delay(function(d) {return d*10;})
    //     // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
    //     // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
    //     // .style('opacity', 0)
    //     // .each('end', function () {
    //     //     d3.select(this).call(repeat)
    //     // });
    //     // .call(repeat);
    //     .style("opacity", 0.8)
    //     .transition()
    //     // .ease('easeLinear')
    //     .duration(1500)
    //     // .delay(function(d) {return d*10;})
    //     .attr("x2", function (d) {
    //         return projection(d.slice(2, 4))[0]
    //     })
    //     .attr("y2", function (d) {
    //         return projection(d.slice(2, 4))[1]
    //     })
    //     .style('opacity', 0.1)
    //     .on("end",repeat)

    // repeat()

    function repeat() {
        svg.selectAll('line')
            .data(lineCoords).enter()
            .append('line')
            // .each(
            //     function () {
            //         var elt = d3.select(this);
            //         elt.classed(elt.attr("path-anim"), true);
            //     }
            // )
            .attr("class", "path-anim")
            .attr("x1", function (d) {
                return projection(d.slice(0, 2))[0]
            })
            .attr("y1", function (d) {
                return projection(d.slice(0, 2))[1]
            })
            // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
            // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
            .attr("x2", function (d) {
                return projection(d.slice(0, 2))[0]
            })
            .attr("y2", function (d) {
                return projection(d.slice(0, 2))[1]
            })
            .attr("stroke-width", .3)
            // .attr("stroke-dasharray", 20, 20)
            .attr("stroke", "black")
            .style("opacity", .9)
            // .transition()
            // .ease(d3.easeLinear)
            // .duration(5000)
            // .delay(function(d) {return d*10;})
            .attr("x2", function (d) {
                return projection(d.slice(2, 4))[0]
            })
            .attr("y2", function (d) {
                return projection(d.slice(2, 4))[1]
            })
        // .style("opacity", 0.5)
        // .transition()
        // .duration(500)
        // .style('opacity', 0)
        // .each('end', function () {
        //     d3.select(this).call(lineAnimate)
        // });
        // .on('end',repeat)
        // .on("start", repeat);

    }

    // repeat()
    function drawCircles2() {
        svg.selectAll("circle")
            .data(lineCoords).enter()
            .append("circle")
            .attr("cx", function (d) {
                // console.log(projection(d));
                return projection(d.slice(0, 2))[0]
            })
            .attr("cy", function (d) {
                return projection(d.slice(0, 2))[1]
            })
            .attr("r", "1px")
            .attr("fill", "red")
            .transition()
            .ease(d3.easeLinear)
            .delay(10)
            .duration(1000)
            .attr("cx", function (d) {
                return projection(d.slice(2, 4))[0]
            })
            .attr("cy", function (d) {
                return projection(d.slice(2, 4))[1]
            })
            .on("end", function () {
                circlesMove()
            })
    }



    function circlesMove(selection) {
        // svg.selectAll("circle")
        selection
            .data(lineCoords).enter()
            .append("circle")
            .attr("cx", function (d) {
                // console.log(projection(d));
                return projection(d.slice(0, 2))[0]
            })
            .attr("cy", function (d) {
                return projection(d.slice(0, 2))[1]
            })
            .attr("r", "1px")
            .attr("fill", "red")
            .transition()
            .ease(d3.easeLinear)
            .delay(10)
            .duration(1000)
            .attr("cx", function (d) {
                return projection(d.slice(2, 4))[0]
            })
            .attr("cy", function (d) {
                return projection(d.slice(2, 4))[1]
            })
            // .transition()
            // .ease(d3.easeLinear)
            // .duration(1000)
            // .attr("cx", function (d) {
            //     return projection(d.slice(0, 2))[0]
            // })
            // .attr("cy", function (d) {
            //     return projection(d.slice(0, 2))[1]
            // })
            // .style("opacity", 0.5)
            .on("end", circlesMove)
        // .delay(function (d) { return d * 40; })
        // .on("start", function repeat() {
        //     d3.active(this)
        //         .attr("cx", width)
        //         .transition()
        //         .attr("cx", 0)
        //         .transition()
        //         .on("start", repeat);
        // });

    }




    function movePoints() {
        svg.select('circle')
            .data(lineCoords.slice(0, 10)).enter()
            .append('circle')
            .attr("cx", function (d) {
                // console.log(d.slice(2, 4));
                return projection(d.slice(0, 2))[0]
            })
            .attr("cy", function (d) {
                return projection(d.slice(0, 2))[1]
            })
            .attr("r", "1px")
            .transition()
            .ease(d3.easeLinear)
            .delay(10)
            .duration(1000)
            .attr("cx", function (d) {
                return projection(d.slice(2, 4))[0]
            })
            .attr("cy", function (d) {
                return projection(d.slice(2, 4))[1]
            })
    }


    // movePoints()
    // circlesMove()
    // var timer = setInterval(circlesMove, 2000);
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

    // var line = d3.line();
    // // var path = svg.append('path').attr('d', line(coordData));
    // d3.select('path')
    //     .attr('d', line(coordData))
    //     .transition()
    //     // .ease('linear')
    //     // .attrTween('d', function () { 
    //     //     return d3.interpolatePath(line(coordData), line(coordData2)); 
    //     //   });
    //     .transition()
    //     .attr('d', line(coordData2));

    // function lineAnimate(selection) {
    //     selection
    //         // .attr({
    //         //     x1: function (d) {
    //         //         return projection(d)[0]
    //         //     },
    //         //     x2: function (d) {
    //         //         return projection(d)[0]
    //         //     },
    //         //     y1: function (d) {
    //         //         return projection(d)[1]
    //         //     },
    //         //     y2: function (d) {
    //         //         return projection(d)[1]
    //         //     }
    //         // })
    //         // .attr("x1", function(d){return projection(d.slice(0,2))[0]})
    //         // .attr("y1", function(d){return projection(d.slice(0,2))[1]})
    //         // .attr("x2", function(d){return projection(d.slice(2,4))[0]})
    //         // .attr("y2", function(d){return projection(d.slice(2,4))[1]})
    //         .style('opacity', 0.5)
    //         .transition()
    //         // .ease('linear')
    //         .duration(1000)
    //         .delay(function (d) {
    //             return d * 10;
    //         })
    //         .attr("x2", function (d) {
    //             return projection(d.slice(2, 4))[0]
    //         })
    //         .attr("y2", function (d) {
    //             return projection(d.slice(2, 4))[1]
    //         })
    //         .transition()
    //         .duration(1000)
    //         .style('opacity', 0)
    //         .each('end', function () {
    //             d3.select(this).call(lineAnimate)
    //         });
    // }


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