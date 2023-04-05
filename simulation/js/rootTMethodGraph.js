
// let graphDataset=[[0.00, 0, 430],
			// [0.25, 0.5, 422],
			// [1.00, 1, 408],
			// [2.25, 1.5, 392],
			// [4.00, 2, 381],
			// [6.25, 2.5, 373],
			// [9.00, 3, 369],
			// [12.25, 3.5, 366],
			// [16.00, 4, 365],
			// [20.25, 4.5, 364],
			// [25.00, 5, 363],
			// [36.00, 6, 363],
			// [49.00, 7, 363],
			// [64.00, 8, 363],
			// [81.00, 9, 363]]; //362

const displayRootTMethodGraph = function () 
{
	const chart = new CanvasJS.Chart("chartContainer16", {
		zoomEnabled: true,
		zoomType: "xy",
		exportEnabled: true,
		title: {
			text: "Dial guage reading v/s √t",
			fontSize: 16,
			fontFamily:"verdana"
		},
		axisX: {
			interval: 2,
			logarithmic: false,
			title: "√t (min)",
			minimum: 0,
			titleFontSize:14,
			labelFontSize:14,
		},
		axisY: {
			interval: 20,
			title: "Dial guage reading (div)",
			minimum: 340, //initial value
			titleFontSize: 14, //axis title
			labelFontSize:14, //axis numbers
			titleFontColor: "#000000",
			labelFontColor: "#000000",
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			itemclick: toogleDataSeries,
			fontSize:12
		},
		data: [
			{
				type: "spline",
				name: "Dial guage reading",
				fontSize:14,
				showInLegend: true,
				xValueFormatString: "Elapsed time = ##0.00 #min",
				yValueFormatString: "#,##0 div",
				dataPoints: type1DataPoints()
			},
			{
				type: "line",
				lineDashType: "dash",
				color: "#C0504E",
				name: "√t90",
				showInLegend: true,
				indexLabelFontColor: "#C0504E",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 0, y: 371.5, markerType:"none", toolTipContent: null },
							 { x: 2.66, y: 371.5, indexLabel: "D", markerType:"none", toolTipContent: null }, //√t90
							 { x: 2.66, y: 340, indexLabel: "√t90", toolTipContent: "√t90 = 2.66min" }]
			},
			{
				type: "line",
				color: "#AB0",
				name: "A,B",
				showInLegend: true,
				indexLabelFontColor: "#AB0",
				indexLabelFontSize: 12,
				dataPoints: [{ x:graphDataset[0][1], y: graphDataset[0][2], indexLabel: "A", markerType:"none", toolTipContent: null}, //A
							{ x: 3.55, y: 340, indexLabel: "B", markerType:"none", toolTipContent: null }]//B
			},
			{
				type: "line",
				lineThickness:2,
				color: "#FFA500",
				name: "A, C",
				showInLegend: true,
				indexLabelFontColor: "#FFA500",
				indexLabelFontSize: 12,
				dataPoints: [{  x:graphDataset[0][1], y: graphDataset[0][2], markerType:"none", toolTipContent: null}, //A
							{ x: 3.55*1.15, y: 340, indexLabel: "C", markerType:"none", toolTipContent: null}]//C
			},
		]
	});

	chart.render();

	function type1DataPoints(){
		let dataPoints = [];
		for(let i=0;i<graphDataset.length;i++)
		{
			dataPoints.push({x: graphDataset[i][1], y: graphDataset[i][2]});
		}
		return dataPoints
	}

	function toogleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else{
			e.dataSeries.visible = true;
		}
		chart.render();
	}
}
