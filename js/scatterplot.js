if (!d3.chart) d3.chart = {}; 

d3.chart.scatter = function(){
	var g;
	var data;
	var width = 400;
	var height = 400;

	function chart(container){
		g = container;

		var maxScore = d3.max(data, function(d){ return d.data.score})
		var yScale = d3.scale.linear()
		.domain([0, maxScore])
		.range([0, height])

		var xScale = d3.scale.ordinal()
		.domain(d3.range(data.length))
		.rangeBands([1,611],0.34)	
		var xScale = d3.time.scale()
		.domain(d3.extent(data, function(d){ return d.data.created}))
		.range([0, width])

		var g = g.append("g")
		.attr("transform", "translate(27,50)")

		var circles = g.selectAll("circle")
			.data(data)
		
		circles.enter()
		.append("circle")

		circles.attr({
			cx: function(d,i) { return  xScale(d.data.created)},
			cy: function(d,i) { return  yScale(d.data.score)},
			r: 10
		})

		circles.exit().remove();
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





