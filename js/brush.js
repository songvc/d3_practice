if (!d3.chart) d3.chart = {}; 

d3.chart.brush = function(){
	var g;
	var data;
	var width = 600;
	var height = 30;

	function chart(container){
		g = container;

		var extent = d3.extent(data, function(d){
			return d.data.created
		})

		var scale = d3.time.scale()
			.domain(extent)
			.range([0,width])


		var brush = d3.svg.brush()
		.x(scale)

		brush(g)
		g.selectAll('rect').attr("height", height)
		g.selectAll(".background")
			.style({fill: "#4B9E9E", visibility: "visible"})
		g.selectAll(".extent")
			.style({fill: "#78C5C5", visibility: "visible"})
		g.selectAll(".resize rect")
			.style({fill: "#276C86", visibility: "visible"})

		var rects = g.selectAll("rect.events")
		.data(data)
		rects.enter()
		.append("rect").classed("events", true)
		rects.attr({
			x: function(d) { return scale(d.data.created);},
			y: 0,
			width: 1,
			height: height
		}).style("pointer-events", "none")

		rects.exit().remove()

		brush.on("brushend", function(){
			var ext = brush.extent()
			var filtered = data.filter(function(d) {
				return (d.data.created > ext[0] && d.data.created < ext[1])
			})
			g.selectAll("rect.events")
			.classed("selected", false)

			g.selectAll("rect.events")
			.data(filtered, function(d) { return d.data.id})
			.style({
				stroke: "#fff"
			})
		})

	}

	chart.data = function(value){
		if(!arguments.length) return data;
		data = value;
		return chart;
	}

	chart.width = function(value){
		if(!arguments.length) return width;
		width = value;
		return chart;
	}

	chart.height = function(value){
		if(!arguments.length) return height;
		height = value;
		return chart;
	}

	return chart;
}





