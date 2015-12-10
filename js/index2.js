var w = 200;
var h = 100;
var padding = 2;
var dataset = [5,10,15,20,25];
var svg  = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
		.attr("x",function(d,i){ return i * (w / dataset.length); })
		.attr("y",0)
		.attr("width", w / dataset.length - padding)
		.attr("height",100);			
