var h = 100;
var w = 400;


function buildLine(ds){
	var xScale = d3.scale.linear()
					.domain([
						d3.min(ds.monthlySales,function(d){return d.month;}),
						d3.max(ds.monthlySales, function(d){ return d.month};)
					])
					.range(0,w);

	var yScale = d3.scale.linear()
					.domain([
						0, d3.max(d3.monthlySales, function(d){return d.sales;})
					])
					.range([h, 0])

	var yAxis = d3.svg.axis().scale(yScale).orient("left");



	var lineFun = d3.svg.line()
					.x(function(d) { return xScale(d.month); })
					.y(function(d) { return yScale(d.sales); })
					.interpolate("linear")

	var svg = d3.select("body").append("svg").attr({width:w, height:h});
	
	var axis = svg.append("g").call(yAxis)
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ", 0)");

	var viz = svg.append("path")
					.attr({
						d:lineFun(ds),
						"stroke": "purple",
						"stroke-width": 2,
						"fill" : "none"
					})

	d3.json()
}