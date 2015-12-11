var w = 500;
var h = 300;

var projection = d3.geo.albersUsa()
					.translate([w/2,h/2])
					.scale(500);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg").attr({width:w,height:h});

var color = d3.scale.linear()
				.range(['#fef0d9','#fdd49e','#fdbb84','#fc8d59','#e34a33','#b30000']);

d3.csv("state-sales.csv", function(data){
	
	color.domain([
			0,d3.max(data,function(d){ return d.sales; })
		]);

	d3.json("us.json", function(json){
		
		for(var i = 0; i < data.length; i++){

			var salesState = data[i].state;

			var salesVal = parseFloat(data[i].sales);

			for (var j = 0; j < json.features.length; j++){

				var usState = json.features[j].properties.NAME;

				if(salesState == usState){
					
					json.features[j].properties.value = salesVal;

					break;

				}

			}

		}

		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("fill", "#666666")
			.style("fill", function(d){
				var value = d.properties.value;

				if(value){
					return color(value);
				}else{
					return '#666666';
				}
			})

	})
})


