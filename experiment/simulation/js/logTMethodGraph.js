
let graphDataset=[[0.00, 0, 430],
			[0.25, 0.5, 422],
			[1.00, 1, 408],
			[2.25, 1.5, 392],
			[4.00, 2, 381],
			[6.25, 2.5, 373],
			[9.00, 3, 369],
			[12.25, 3.5, 366],
			[16.00, 4, 365],
			[20.25, 4.5, 364],
			[25.00, 5, 363],
			[36.00, 6, 363],
			[49.00, 7, 363],
			[64.00, 8, 363],
			[81.00, 9, 363]]; //362

const displayLogTMethodGraph = function () 
{
	let step = Math.pow(10, .05);
	const chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		zoomType: "xy",
		exportEnabled: true,
		title: {
			text: "Dial guage reading v/s elapsed time",
			fontSize: 16,
			fontFamily:"verdana"
		},
		axisX: {
			logarithmic: true,
			title: "Elapsed time, t (min)",
			minimum: 0.01,
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
				dataPoints: type1DataPoints(step)
			},
			{
				type: "line",
				color: "#C0504E",
				name: "A",
				showInLegend: true,
				indexLabelFontColor: "#C0504E",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 0.53, y: 422, markerType:"none", toolTipContent: null }, //tangent
							{ x: 9.3, y: 363, indexLabel: "A", markerType:"none", toolTipContent: null }]
			},
			{
				type: "line",
				color: "#AB0",
				name: "d100",
				showInLegend: true,
				indexLabelFontColor: "#AB0",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 0.01, y: 363, indexLabel: "d100", markerType:"none", toolTipContent: null}, //d100
							{ x: 81, y: 363, markerType:"none", toolTipContent: null }]
			},
			{
				type: "line",
				lineThickness:2.5,
				lineDashType: "dash",
				color: "#FFA500",
				name: "d50",
				showInLegend: true,
				indexLabelFontColor: "#FFA500",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 0.01, y: 400, indexLabel: "d50", markerType:"none", toolTipContent: null}, //d50
							{ x: 1.55, y: 400, indexLabel: "F", markerType:"none", toolTipContent: null},//F
							{ x: 1.55, y: 340, indexLabel: "t50", markerType:"none", toolTipContent: null }]//t50
			},
			{
				type: "line",
				lineThickness:2,
				lineDashType: "dash",
				color: "#FF00FF",
				name: "t1",
				showInLegend: true,
				indexLabelFontColor: "#FF00FF",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 0.25, y: 422, indexLabel: "B", markerType:"none", toolTipContent: null}, //B
							{ x: 0.25, y: 340, indexLabel: "t1", markerType:"none", toolTipContent: null}]//t1
			},
			{
				type: "line",
				lineThickness:2,
				lineDashType: "dash",
				color: "#808000",
				name: "t2",
				showInLegend: true,
				indexLabelFontColor: "#808000",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 1, y: 408, indexLabel: "C", markerType:"none", toolTipContent: null}, //C
							{ x: 1, y: 340, indexLabel: "t2", markerType:"none", toolTipContent: null}]//t2
			},
			{
				type: "line",
				lineThickness:1.5,
				color: "#FF5511",
				name: "Z0",
				showInLegend: true,
				indexLabelFontColor: "#FF5511",
				indexLabelFontSize: 12,
				dataPoints: [{ x: 1, y: 408, markerType:"none", toolTipContent: null}, 
							{ x: 2.25, y: 408, markerType:"none", toolTipContent: null},
							{ x: 2.25, y: 422, indexLabel: "Z0", markerType:"none", toolTipContent: null}, 
							{ x: 0.25, y: 422, markerType:"none", toolTipContent: null}, 
							{ x: 2.25, y: 422, markerType:"none", toolTipContent: null}, 
							{ x: 2.25, y: 434, markerType:"none", toolTipContent: null},
							{ x: 0.01, y: 434, indexLabel: "d0", markerType:"none", toolTipContent: null}]
			}
		]
	});

	chart.render();

	function type1DataPoints(step){
		let dataPoints = [];
		for(let i=1;i<graphDataset.length;i++)
		{
			dataPoints.push({x: graphDataset[i][0], y: graphDataset[i][2]});
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
