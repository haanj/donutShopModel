var chart;


function buildGraph(){
	var ctx = document.getElementById("myChart").getContext("2d");

	var data = {
		labels: allShops.map(function(shop){
				return shop.shopName;
		    }),
		datasets: [
			{
				label: "Donut Shops and Sales",
				fillColor: "rgba(226,240,214,0.5)",
				strokeColor: "rgba(226,240,214,0.8)",
				highlightFill: "rgba(246,255,224,0.75)",
				highlightStroke: "rgba(246,255,224,1)",
				data: allShops.map(function(shop){
					return shop.dailySales().toFixed(1);
				})
			}
		]
	};

	var options = {
		scaleFontColor: "#10222B",
		scaleFontFamily: "'Roboto Condensed', sans-serif",
		tooltipFontColor: "#F6FFE0",
		tooltipFontFamily: "'Roboto Condensed', sans-serif",
		tooltipTemplate: function(data){
			return data.value + " donuts sold in the " + data.label + " location.";
		}
	};

	return new Chart(ctx).Bar(data, options);
}

