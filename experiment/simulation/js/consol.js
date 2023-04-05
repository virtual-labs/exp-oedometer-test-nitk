//Elapsed time  (min), √t, Dial gauge reading (div)
const dataset=[
			[0.00, 0, 430],
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
			[81.00, 9, 363]];

// degreeDataset and speedTimingDataset created by me for calcution purpose in coding
const degreeDataset=[30,22,8,92,81,73,69,66,65,64,63,63,63,63,63];
const speedTimingDataset=[0,15,45,75,105,135,165,195,225,255,285,660,780,900,1020];

// $(function()
// {
	// $('input').on('input', function() {
		// this.value = this.value.match(/\correctAnswer*(\.\correctAnswer*)?/)[0];
	// });
// });

var questions=["Filter paper is used in the consolidation test so that it restrains the soil particles to get inside the porous stone.",
			   "Consolidation is a process to ________.",
			   "Porous stones are submerged in distilled water for ____ hours."];

var options2=[["True","False"],//True
			  ["Expel air voids","Expel water voids","Compress the soil particle","None of the above"],//Expel water voids
			  ["3-6","10-12","4-8","1-2"]];//4-8

function validateFormativeQA(qn,ans,left,top)
{
	$("#answer").empty();
	document.getElementById("a").innerHTML="";
	document.getElementById("questDiv").style="position:absolute; font-size:14px; background-color:grey; color:white; padding:7.5px; border-radius:5px; visibility:visible; left:"+left+";top:"+top+";";
	document.getElementById("q").innerHTML=questions[qn];
	el = document.createElement("option");
	el.textContent = " ";
	el.value = " ";
	answer.appendChild(el);

	for(j=0;j<options2[qn].length;j++)
	{
		opt = options2[qn][j];

		el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		answer.appendChild(el);
		$("#answer").change(function()
		{
			ca=$(this).children("option:selected").val();
			if(options2[qn][ans]==ca)
			{
				document.getElementById("a").innerHTML="Correct Answer!";
			}
			else
			{
				document.getElementById("a").innerHTML="Wrong! Answer is "+options2[qn][ans];
			}
			setTimeout(function()
			{
				document.getElementById("questDiv").style.visibility="hidden";
				document.getElementById("nextButton").style.visibility="visible";
			},1500);
		});
	}
}

function create_totalTable(time,tabId)
{
	let j=1;
    let table = document.getElementById(tabId);
    for(let i=dataset.length-1;i>0;i--)
    {
		$("#"+tabId).delay(time)
		.queue(function (create_totalTable)
		{
			$(this).append("<tr><td style=\"border:1px solid black; padding:5px;\">" + dataset[j][0]  + "</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset[j][1] +"</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset[j][2]  +"</td></tr>");
			j++;
			// time=dataset[j][0]*60*1000;
			create_totalTable(time);
        });
	}
}

function navNext()
{
	for(temp=0;temp<17;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

function animatearrow()
{
    if (document.getElementById('arrow1').style.visibility=="hidden")
        document.getElementById('arrow1').style.visibility="visible";
    else
        document.getElementById('arrow1').style.visibility="hidden";
}

function myStopFunction()
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

function blinkArrow(l,t,correctAnswer,h)
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+l+"px; top:"+t+"px; height:"+h+"px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+correctAnswer+"deg)";
	document.getElementById("arrow1").style.msTransform = "rotate("+correctAnswer+"deg)";
	document.getElementById("arrow1").style.transform = "rotate("+correctAnswer+"deg)";
}

function commonStmtsInEvaluateCalculationAnswers(inputBoxId, checkBtnId, resultBtnId, RgtWrngMarkId)
{
	document.querySelector(RgtWrngMarkId).classList.remove("showWrongMark");
	document.querySelector(inputBoxId).disabled=true;
	document.querySelector(inputBoxId).style.color="black";
	document.querySelector(resultBtnId).style.visibility="hidden";
	document.querySelector(checkBtnId).style.visibility="hidden";
	if(simsubscreennum!==17)
		document.querySelector('#nextButton').style.visibility="visible";
	if(simsubscreennum===17)
		document.querySelector("#inference").style.visibility="visible";
}

function evaluateCalculationAnswers(inputBoxId,rightAnswer,checkBtnId,resultBtnId,RgtWrngMarkId)
{
	document.querySelector(resultBtnId).disabled=true;
	document.querySelector(checkBtnId).addEventListener("click",function(){
		if(document.querySelector(inputBoxId).value || document.querySelector(inputBoxId).value!==null)
		{
			if(+(document.querySelector(inputBoxId).value) === rightAnswer)
			{
				document.querySelector(RgtWrngMarkId).classList.remove("markHidden");
				document.querySelector(RgtWrngMarkId).innerHTML="&#10004;";
				document.querySelector(RgtWrngMarkId).classList.add("showRightMark");
				commonStmtsInEvaluateCalculationAnswers(inputBoxId, checkBtnId, resultBtnId, RgtWrngMarkId);
			}
			else
			{
				document.querySelector(RgtWrngMarkId).classList.remove("markHidden");
				document.querySelector(RgtWrngMarkId).innerHTML="&#10008;";
				document.querySelector(RgtWrngMarkId).classList.add("showWrongMark");
				document.querySelector(RgtWrngMarkId).classList.remove("showRightMark");
				document.querySelector(resultBtnId).disabled=false;
			}
		}
	});
	document.querySelector(resultBtnId).addEventListener("click",function()
	{
		document.querySelector(inputBoxId).value=rightAnswer;
		document.querySelector(RgtWrngMarkId).classList.add("markHidden");
		commonStmtsInEvaluateCalculationAnswers(inputBoxId, checkBtnId, resultBtnId, RgtWrngMarkId)
	});
}

let degree=0, m=0, stop=false, x=0,counter=0, swDegree, n=0, runOnce=true, dialGuageStopped=false, looper1, looper2;

// function updateTableOnDialGuageReading()
// {
	// $("#tab12").delay(0)
	// .queue(function (updateTableOnDialGuageReading)
	// {
		// console.log(dataset[x][2]);
		// $(this).append("<tr><td style=\"border:1px solid black; padding:5px;\">" + dataset[x][0]  + "</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset[x][1] +"</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset[x][2]  +"</td></tr>");
	// });
// }

function showTableReading()
{
	counter++;
	const table = document.querySelector('#tab12');
	const row=table.insertRow(x+1);
	const cell1=row.insertCell(0);
	const cell2=row.insertCell(1);
	const cell3=row.insertCell(2);
	cell1.style="border:1px solid black; padding:5px;";
	cell2.style="border:1px solid black; padding:5px;";
	cell3.style="border:1px solid black; padding:5px;";
	cell1.innerHTML=dataset[x][0];
	cell2.innerHTML=dataset[x][1];
	cell3.innerHTML=dataset[x][2];
	x++;
}

function rotateStopwatchNeedle(el)
{
	// console.log(swDegree);
	const stopWatchSpeed = (x==0) ? 15 : (speedTimingDataset[x] - speedTimingDataset[x-1])/10;
	const elem = document.getElementById(el);

	if(navigator.userAgent.match("Chrome"))
	{
		elem.style.WebkitTransform = "rotate("+swDegree+"deg)";
	}
	else if(navigator.userAgent.match("Firefox"))
	{
		elem.style.MozTransform = "rotate("+swDegree+"deg)";
	}
	else if(navigator.userAgent.match("MSIE"))
	{
		elem.style.msTransform = "rotate("+swDegree+"deg)";
	}
	else if(navigator.userAgent.match("Opera"))
	{
		elem.style.OTransform = "rotate("+swDegree+"deg)";
	}
	else
	{
		elem.style.transform = "rotate("+swDegree+"deg)";
	}

	if(counter < speedTimingDataset.length-1)
	{
		swDegree=n++;
		looper2 = setTimeout('rotateStopwatchNeedle(\''+el+'\','+stopWatchSpeed+')',stopWatchSpeed);
		setTimeout(function()
		{
			if(dialGuageStopped)
			{
				if(x<=speedTimingDataset.length-1)
				{
					showTableReading();
				}
				else
				{
					for(i=4;i<=8;i++)
					{
						document.getElementById("12-"+i).style.visibility="hidden";
					}
					document.querySelector("#p12-1").style.visibility="hidden";
					document.querySelector("#p12-2").style.visibility="hidden";
					document.querySelector("#nextButton").style.visibility="visible";
				}
			}
		},1000);

	}
	// console.log(degree,swDegree);
}

function rotateAnimation(el)
{
	const speed= (x==0) ? speedTimingDataset[x] : (speedTimingDataset[x] - speedTimingDataset[x-1])/10;
	const elem = document.getElementById(el);
	if(navigator.userAgent.match("Chrome"))
	{
		elem.style.WebkitTransform = "rotate("+degree+"deg)";
	}
	else if(navigator.userAgent.match("Firefox"))
	{
		elem.style.MozTransform = "rotate("+degree+"deg)";
	}
	else if(navigator.userAgent.match("MSIE"))
	{
		elem.style.msTransform = "rotate("+degree+"deg)";
	}
	else if(navigator.userAgent.match("Opera"))
	{
		elem.style.OTransform = "rotate("+degree+"deg)";
	}
	else
	{
		elem.style.transform = "rotate("+degree+"deg)";
	}

	if(degree===360) m=0;

	if(counter===3) document.getElementById("12-5").style.transform="rotate(-105deg)";

	if(counter<=10)
	{
		m++;
		degree=m;
		looper1 = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
		// console.log(speed,m, speedTimingDataset[x]);
	}
	else dialGuageStopped=true;

	if(degree === Math.round(degreeDataset[x]*3.5))
	{
		showTableReading();
		if(runOnce)	rotateStopwatchNeedle("12-8");
		runOnce=false;
		console.log(degree, swDegree);
	}
}

function magic()
{
	if(simsubscreennum==1)
	{
		blinkArrow(520,270,360,40);
		document.getElementById('1-5').onclick=function()
		{
			myStopFunction();
			document.getElementById('1-5').onclick="";
			document.getElementById('1-5').style.transformOrigin="100% 80%";
			document.getElementById('1-5').style.animation = "valveturn-2 1s forwards ";
			setTimeout(function(){
				document.getElementById('1-5').style.visibility="hidden";
				document.getElementById('1-6').style.visibility="visible";
				setTimeout(function()
				{
					document.getElementById('1-9').style.visibility="visible";
					document.getElementById('1-10').style.visibility="visible";
					document.getElementById('1-10').style.transformOrigin="100% 80%";
					document.getElementById('1-10').style.animation = "water-4 2.5s forwards ";
					setTimeout(function()
					{
						document.getElementById('1-9').style.visibility="hidden";
						document.getElementById('1-6').style.visibility="hidden";
						setTimeout(function()
						{
							document.getElementById("1-12").style.visibility="visible";
							blinkArrow(300,335,360,40);
							document.getElementById('1-12').onclick=function()
							{
								myStopFunction();
								document.getElementById('1-12').onclick="";
								document.getElementById('1-12').style.visibility="hidden";
								document.getElementById('1-13').style.visibility="visible";
								document.getElementById('1-13').style.animation = "mixSoil 1.5s 2 forwards ";
								setTimeout(function()
								{
									document.getElementById('1-14').style.visibility="visible";
									document.getElementById('1-7').style.visibility="hidden";
									document.getElementById('1-10').style.visibility="hidden";
									document.getElementById('1-11').style.visibility="hidden";
									document.getElementById('1-13').style.visibility="hidden";
									setTimeout(function()
									{
										document.getElementById("nextButton").style.visibility="visible";
									},500);
								},3000);
							}
						},500);
					},2500);
				},250);
			},1000);
		}
	}

	else if(simsubscreennum == 2)
	{
		document.getElementById("1-8").style.visibility="hidden";
		document.getElementById("1-14").style.visibility="hidden";
		setTimeout(function()
		{
			blinkArrow(70,420,180,30);
			document.getElementById("2-4").addEventListener('click',function(){
				myStopFunction();
				document.getElementById("2-4").style.visibility="hidden";
				document.getElementById("2-6").style.visibility="visible";
				document.getElementById("2-6").style.animation="placePorousStone 1.5s forwards";
				setTimeout(function(){
					document.getElementById("2-6").style.animation="";
					document.getElementById("2-6").style.visibility="hidden";
					document.getElementById("2-1").style.visibility="hidden";
					document.getElementById("2-2").style.visibility="visible";
					setTimeout(function(){
						document.getElementById("2-5").style.visibility="visible";
						blinkArrow(70,420,180,30);
						document.getElementById("2-5").addEventListener('click',function(){
							myStopFunction();
							document.getElementById("2-5").style.visibility="hidden";
							document.getElementById("2-6").style.visibility="visible";
							document.getElementById("2-6").style.animation="placePorousStone 1.5s forwards";
							setTimeout(function(){
								document.getElementById("2-6").style.visibility="hidden";
								document.getElementById("2-2").style.visibility="hidden";
								document.getElementById("2-3").style.visibility="visible";
								setTimeout(function(){
								document.getElementById("nextButton").style.visibility="visible";
								},200);
							},1450);
						});
					},250);
				},1450);
			});

		},350);
	}
	else if(simsubscreennum == 3)
	{
		document.getElementById("2-3").style.visibility="hidden";
		setTimeout(function()
		{
			blinkArrow(380,490,90,30);
			document.getElementById("3-0on").onclick=function()
			{
				myStopFunction();
				document.getElementById("3-0on").onclick="";
				document.getElementById("3-0on").style.visibility="hidden";
				weightOfContainer(3);
			}
		},300);
	}

	else if(simsubscreennum == 4)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		setTimeout(function()
		{
			document.getElementById("4-3").style.visibility="visible";
			blinkArrow(265,320,270,30);
			document.getElementById("4-3").onclick=function()
			{
				myStopFunction();
				document.getElementById("4-3").onclick="";
				document.getElementById("4-3").style.animation="moveSpatula1 0.4s forwards";
				setTimeout(function()
				{
					document.getElementById("4-3").style.animation="";
					document.getElementById("4-3").style.visibility="hidden";
					document.getElementById("4-0").style="position:absolute; left:210px; top:394px; width:79px; height:23px; background-color:#BB834C; border-radius: 100px / 30px; ";
					document.getElementById("4-4").style.visibility="visible";
					document.getElementById("4-4").style.animation="moveSpatula2 1.5s forwards";
					setTimeout(function()
					{
						document.getElementById("4-4").style="position:absolute; left:395px; top:305px;";
						document.getElementById("4-4").style.animation="rotateSpatula 0.5s forwards";
						setTimeout(function()
						{
							document.getElementById("4-4").style.visibility="hidden";
							document.getElementById("4-3").style.visibility="visible";
							document.getElementById("4-5").style="position:absolute; left: 485px; top: 401.5px; width: 50px; height: 15px; background-color: rgb(187, 131, 76); border-radius: 50%; visibility: visible;";
							setTimeout(function()
							{
								document.getElementById("4-3").style.visibility="hidden";
								document.getElementById("4-0").style="position:absolute; left:210px; top:398px; width:79px; height:23px; background-color:#BB834C; border-radius: 100px / 30px; ";
								document.getElementById("4-4").style.visibility="visible";
								document.getElementById("4-4").style="position:absolute; left:145px; top:355px;";
								document.getElementById("4-4").style.animation="moveSpatula2 1.5s forwards";
								setTimeout(function()
								{
									document.getElementById("4-4").style="position:absolute; left:395px; top:305px;";
									document.getElementById("4-4").style.animation="rotateSpatula 0.5s forwards";
									setTimeout(function()
									{
										document.getElementById("4-4").style.visibility="hidden";
										document.getElementById("4-3").style.visibility="visible";
										document.getElementById("4-5").style="position:absolute; left: 475px; top: 397.5px; width: 70px; height: 22px; background-color: rgb(187, 131, 76); border-radius: 50%; visibility: visible;";
										setTimeout(function()
										{
											document.getElementById("4-3").style.visibility="hidden";
											document.getElementById("4-0").style="position:absolute; left:211.5px; top:402px; width:75.5px; *-:23px; background-color:#BB834C; border-radius: 100px / 30px; ";
											document.getElementById("4-4").style.visibility="visible";
											document.getElementById("4-4").style="position:absolute; left:145px; top:355px;";
											document.getElementById("4-4").style.animation="moveSpatula2 1.5s forwards";
											setTimeout(function()
											{
												document.getElementById("4-4").style="position:absolute; left:390px; top:308px;";
												document.getElementById("4-4").style.animation="rotateSpatula 0.5s forwards";
												setTimeout(function()
												{
													document.getElementById("4-5").style.visibility="visible";
													document.getElementById("4-4").style.visibility="hidden";
													document.getElementById("4-5").style="position:absolute; left: 465px; top: 395px; width: 90px; height: 25px; background-color: rgb(187, 131, 76); border-radius: 50%; visibility: visible;";
													setTimeout(function()
													{
														document.getElementById("4-3").style.visibility="hidden";
														document.getElementById("4-0").style="position:absolute; left:211.5px; top:402px; width:71.5px; height:23px; background-color:#BB834C; border-radius: 100px / 30px; ";
														document.getElementById("4-4").style.visibility="visible";
														document.getElementById("4-4").style="position:absolute; left:145px; top:355px;";
														document.getElementById("4-4").style.animation="moveSpatula2 1.5s forwards";
														setTimeout(function()
														{
															document.getElementById("4-4").style="position:absolute; left:390px; top:308px;";
															document.getElementById("4-4").style.animation="rotateSpatula 0.5s forwards";
															setTimeout(function()
															{
																document.getElementById("4-5").style.visibility="visible";
																document.getElementById("4-4").style.visibility="hidden";
																document.getElementById("4-5").style="position:absolute; left: 450px; top: 392px; width: 117px; height: 25px; background-color: rgb(187, 131, 76); border-radius: 50%; visibility: visible;";
																setTimeout(function()
																{
																	document.getElementById("nextButton").style.visibility="visible";
																},500);
															},500);//
														},1500);
													},500);
												},500);//
											},1500);
										},500);
									},500);//
								},1500);
							},500);
						},500);//
					},1500);
				},400);
			}
		},500);
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById("4-5").style.visibility = "hidden";
		weightOfContainer(5);
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById("6-2P1").onclick=function()
		{
			document.getElementById("6-2P1").onclick="";
			placeApparatusInOrder("6-1S","6-1F","6-1P",120,"Porous stone is placed at the bottom");
			document.getElementById("6-2F1").onclick=function()
			{
				document.getElementById("6-2F1").onclick="";
				placeApparatusInOrder("6-1S","6-1P","6-1F",240,"Filter paper is placed on top of poruos stone");
				document.getElementById("6-2S").onclick=function()
				{
					document.getElementById("6-2S").onclick="";
					placeApparatusInOrder("6-1P","6-1F","6-1S",360,"Specimen ring is placed on top of filter paper");
					document.getElementById("6-2F2").onclick=function()
					{
						document.getElementById("6-2F2").onclick="";
						placeApparatusInOrder("6-1S","6-1P","6-1F",480,"Filter paper is placed on top of specimen ring");
						document.getElementById("6-2P2").onclick=function()
						{
							document.getElementById("p6-1").style.visibility="hidden";
							document.getElementById("6-2P2").onclick="";
							placeApparatusInOrder("6-1S","6-1F","6-1P",600,"Porous stone is placed on top of filter paper <br>Consolidometer is assembled correctly");
							setTimeout(function()
							{
								document.getElementById("nextButton").style.visibility="visible";
							},2700);
						}
					}
				}
			}
		}
	}
	else if(simsubscreennum == 7)
	{
		document.getElementById("6-1P").style.visibility="hidden";
		setTimeout(function()
		{
			blinkArrow(450,170,180,30);
			document.getElementById("7-2").onclick=function()
			{
				myStopFunction();
				document.getElementById("7-2").onclick="";
				document.getElementById("7-2").style.animation="moveLid 0.75s forwards";
				setTimeout(function()
				{
					document.getElementById("7-3").style.visibility="visible";
					document.getElementById("p7-2").style.visibility="visible";
					setTimeout(function()
					{
						validateFormativeQA(1,1,"150px","100px");
						// document.getElementById("nextButton").style.visibility="visible";
					},1250);
				},750);
			}
		},500);
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById("7-3").style.visibility="hidden";
		document.getElementById("p7-2").style.visibility="hidden";
		setTimeout(function()
		{
			blinkArrow(500,290,180,30);
			document.getElementById("8-2").onclick=function()
			{
				myStopFunction();
				document.getElementById("8-2").onclick="";
				document.getElementById("8-2").style.animation="movePPad 0.75s forwards";
				setTimeout(function()
				{
					document.getElementById("p8-1").innerHTML="Pressure pad is fixed properly";
					setTimeout(function()
					{
						document.getElementById("nextButton").style.visibility="visible";
					},200);
				},750);
			}
		},500);
	}
	else if(simsubscreennum===9)
	{
		blinkArrow(615,390,0,30);
		document.getElementById("9-2").onclick=function()
		{
			myStopFunction();
			document.getElementById("9-2").style.animation="moveMould 0.8s forwards";
			setTimeout(function(){
				document.getElementById("nextButton").style.visibility="visible";
			},1100);
		}
	}
	else if(simsubscreennum===10)
	{
		setTimeout(function()
		{
			blinkArrow(360,410,310,30);
			document.querySelector('#connect').addEventListener("click",function()
			{
				myStopFunction();
				document.getElementById("10-2").style.visibility="visible";
				document.getElementById("10-2").style.animation="connect 0.35s forwards";
				setTimeout(function(){
					document.getElementById("10-2").style.visibility="hidden";
					document.getElementById("10-3").style.visibility="visible";
					setTimeout(function(){
						// document.getElementById("nextButton").style.visibility="visible";
						validateFormativeQA(0,0,"370px","120px");
					},400);
				},250);
			});
		},500);
	}
	else if(simsubscreennum==11){
		document.getElementById("10-3").style.visibility="hidden";
		setTimeout(function()
		{
			blinkArrow(120,205,180,35);
			document.getElementById("11-2").addEventListener("click",function()
			{
				myStopFunction();
				document.getElementById("11-2").onclick="";
				document.getElementById("11-2").style.animation="placeDialGuage 1s forwards";
				setTimeout(function(){
					document.querySelector("#nextButton").style.visibility="visible";
				},1250);
			});
		},500);
	}
	else if(simsubscreennum==12){
		const loadDiv=document.getElementById('12-3');
		let topVal=470.5;
		document.getElementById('12-2').style.visibility="visible";
		blinkArrow(505,480,270,35);
		document.getElementById("12-2").addEventListener("click",function()
		{
			myStopFunction();
			document.getElementById("12-2").onclick="";
			document.getElementById('12-2').style.visibility="hidden";
			// topVal=topVal-5;
			const loadImg=document.createElement('img');
			loadImg.src="images/weight.png";
			loadImg.style.position="absolute";
			loadImg.style.left="112.5px";
			// loadImg.style.top=topVal+"px";
			loadImg.style.top=topVal-5+"px";
			loadDiv.append(loadImg);
			setTimeout(function(){
				document.getElementById("12-4").style.visibility="visible";
				document.getElementById("12-5").style.visibility="visible";
				document.getElementById("12-6").style.visibility="visible";
				document.getElementById("12-7").style.visibility="visible";
				document.getElementById("12-8").style.visibility="visible";
				document.getElementById("p12-1").style.visibility="visible";
				document.getElementById("p12-2").style.visibility="visible";
				document.getElementById("12-5").style.transformOrigin="50% 100%";
				document.getElementById("12-5").style.transform="rotate(-135deg)";
				document.getElementById("12-6").style.transformOrigin="50% 100%";
				document.getElementById("12-6").style.transform="rotate(0deg)";
				document.getElementById("tabDiv12").style.visibility="visible";
				document.getElementById("12-8").style.transformOrigin="50% 100%";
				document.getElementById("12-6").style.transformOrigin="50% 90%";
				rotateAnimation("12-6");
				// setTimeout(function(){
					// document.querySelector("#nextButton").style.visibility="visible";
				// },750);
			},500);
		});
	}
	else if(simsubscreennum==13)
	{
		document.getElementById("tabDiv12").style.visibility="hidden";
		document.getElementById("12-4").style.visibility="hidden";
		document.getElementById("12-5").style.visibility="hidden";
		document.getElementById("12-6").style.visibility="hidden";
		document.getElementById("12-7").style.visibility="hidden";
		document.getElementById("p12-1").style.visibility="hidden";
		document.getElementById("p12-2").style.visibility="hidden";
		document.getElementById("12-8").style.visibility="hidden";
		const H=2;
		const deltaH=((dataset[0][2]-dataset[14][2])*0.001);
		const correctAnswer=(H-(deltaH/2))/2;
		create_totalTable(0,"tab13");
		evaluateCalculationAnswers('#dp',correctAnswer,'#check13','#result13','#mark13');
	}
	else if(simsubscreennum===14)
	{
		document.querySelector("#mark13").style.visibility="hidden";
		displayLogTMethodGraph();
		setTimeout(function(){
			document.querySelector("#nextButton").style.visibility="visible";
		},750);
		// $("#chartContainer").ejChart(
        // {
		    // primaryXAxis:
            // {
			   	// labelFormat: "{value}",
                // title: { text: 'Elapsed time, t (min)' },
                // range: { min:-5, max: 85, interval:5}
            // },
			// primaryYAxis:
            // {
				// labelFormat: "{value}",
                // title: { text: 'Dial gauge reading (div)' },
                // range: { min: 340, max: 450, interval: 20}
            // },
			// series:
			// [
			    // {
                // points: [
					// {x: dataset[0][0], y: dataset[0][2]},
					// {x: dataset[1][0], y: dataset[1][2]},
					// {x: dataset[2][0], y: dataset[2][2]},
					// {x: dataset[3][0], y: dataset[3][2]},
					// {x: dataset[4][0], y: dataset[4][2]},
					// {x: dataset[5][0], y: dataset[5][2]},
					// {x: dataset[6][0], y: dataset[6][2]},
					// {x: dataset[7][0], y: dataset[7][2]},
					// {x: dataset[8][0], y: dataset[8][2]},
					// {x: dataset[9][0], y: dataset[9][2]},
					// {x: dataset[10][0], y: dataset[10][2]},
					// {x: dataset[11][0], y: dataset[11][2]},
					// {x: dataset[12][0], y: dataset[12][2]},
					// {x: dataset[13][0], y: dataset[13][2]},
					// {x: dataset[14][0], y: dataset[14][2]}
				// ],
				// type: 'line',
				// fill: "#0066FF",
				// name : 'Elapsed time, t (min) v/s Dial gauge reading (div)',
				// border :{width:5},
				// tooltip:{visible:true},
				// marker:{
					// shape: 'circle',
					// size:
					// {
						// height: 5, width: 5
					// },
					// visible: true
				// },
				// enableAnimation :false
                // },
				// {
					// points: [

					// { x: -0.85, y: 430 , text : ''},
					// { x: 1.5, y: 400 , text : ' '},
					// { x: 4.8, y: 362, text : 'A'}

					// ],
					// type: 'line',
					// // dashArray : '10,4',
					// // name: '',
					// fill: "#FF1493",
					// // border :{width:1},
					// tooltip:{visible:false},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'FF1493', size: '10px' }
						// },
                        // visible: false
                    // },
					// enableAnimation :false
                // },
				// {
					// points: [

					// { x: -5, y: 400, text : 'd50'},
					// { x: 1.5, y: 400 , text : 'F' },
					// { x: 1.5, y: 340, text : 't50'}

					// ],
					// type: 'line',
					// dashArray : '10,4',
					// name: 't50 = 1.5min',
					// fill: "#00FF99",
					// border :{width:5},
					// tooltip:{visible:true},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'black', size: '12px' }
						// },
                        // visible: true
                    // },
					// enableAnimation :false
                // },
				// {
					// points: [

					// { x: -5, y: 362, text : 'd100'},
					// { x: 81, y: 362, text: ' '},

					// ],


					// type: 'line',
					// dashArray : '12,4',
					// name: 'd100',
					// fill: "#800080",
					// border :{width:5},
					// tooltip:{visible:true},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'black', size: '12px' }
						// },
                        // visible: true
                    // },
					// enableAnimation :false
                // },
				// {
					// points: [

					// { x: -5, y: 436, text : 'd0'},
					// { x: 8, y: 436, text: ' '},
					// { x: 8, y: 430, text: 'z0'},
					// { x: 0.25, y: 430, text: 'B'},
					// ],


					// type: 'line',
					// dashArray : '12,4',
					// name: 'd0',
					// fill: "orange",
					// border :{width:5},
					// tooltip:{visible:true},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'orange', size: '12px' }
						// },
                        // visible: true
                    // },
					// enableAnimation :false
                // },
				// {
					// points: [
					// { x: 8, y: 430, text: ' '},
					// { x: 8, y: 422, text: 'z0'},
					// { x: 0.25, y: 422, text: 'C'},
					// ],


					// type: 'line',
					// dashArray : '12,4',
					// name: 'C',
					// fill: "yellow",
					// border :{width:5},
					// tooltip:{visible:true},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'yellow', size: '12px' }
						// },
                        // visible: true
                    // },
					// enableAnimation :false
                // },
				// {
					// points: [

					// { x: 0.25, y: 430, text: ''},
					// { x: 0.25, y: 340, text: 't1'},
					// ],


					// type: 'line',
					// dashArray : '12,4',
					// name: 't1',
					// fill: "lightgreen",
					// border :{width:5},
					// tooltip:{visible:true},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'lightgreen', size: '12px' }
						// },
                        // visible: true
                    // },
					// enableAnimation :false
                // },
				// {
					// points: [

					// { x: 1, y: 422, text: ''},
					// { x: 1, y: 340, text: 't2'},
					// ],


					// type: 'line',
					// dashArray : '12,4',
					// name: 't2',
					// fill: "grey",
					// border :{width:5},
					// tooltip:{visible:true},
					// marker:{
                        // shape: 'circle',
						// size:
                        // {
                            // height: 5, width: 5
                        // },
						// dataLabel:
						// {
                          // visible:true,
                          // font: { color: 'grey', size: '12px' }
						// },
                        // visible: true
                    // },
					// enableAnimation :false
                // }
			// ],
			// commonSeriesOptions :{ enableSmartLabels : true},
            // load:"loadTheme",
			// isResponsive: true,

			// // title:{
				// // text: 'Water content v/s Number of drops',
				// // font: { color: 'black', size: '18px' }
				// // },
			// legend:{visible:true}
        // });

	}
	else if(simsubscreennum===15)
	{
		const correctAnswer=0.126;
		evaluateCalculationAnswers('#cv',correctAnswer,'#check15','#result15','#mark15');
	}
	else if(simsubscreennum===16)
	{
		document.querySelector("#mark15").style.visibility="hidden";
		displayRootTMethodGraph();
		setTimeout(function(){
			document.querySelector("#nextButton").style.visibility="visible";
		},750);
	}
	else if(simsubscreennum===17)
	{
		const correctAnswer=0.00256;
		evaluateCalculationAnswers('#rootTcv',correctAnswer,'#check17','#result17','#mark17');
	}
}

function weightOfContainer(id)
{
	document.getElementById(id+"-1").style.visibility="visible";
	document.getElementById("p"+id+"-1").innerHTML="000.01";
	document.getElementById(id+"-0").style.backgroundColor="lightgrey";
	setTimeout(function()
	{
		blinkArrow(488.5,490,90,30);
		document.getElementById(id+"-1").onclick=function()
		{
			myStopFunction();
			document.getElementById(id+"-1").onclick="";
			document.getElementById(id+"-1").style.visibility="hidden";
			document.getElementById("p"+id+"-1").innerHTML="000.00";
			setTimeout(function()
			{
				blinkArrow(65,435,180,35);
				document.getElementById(id+"-2").onclick=function()
				{
					myStopFunction();
					document.getElementById(id+"-2").onclick="";
					document.getElementById(id+"-2").style.animation="placeEmptyContainer8 1.25s forwards";
					if(id==5)
					{
						document.getElementById(id+"-5").style.animation="placeEmptyContainerWithSoil8 1.25s forwards";
					}
					setTimeout(function()
					{
						//IsInt(dataset[p][1]);
						if(id==3)
						{
							document.getElementById("p"+id+"-1").innerHTML="200.00";
							// document.getElementById("p"+id+"-2").innerHTML="Weight of empty metal tube = "+dataset[p][0]+" g";
							document.getElementById("p"+id+"-2").innerHTML="Weight of empty specimen ring = 200 g";
						}
						if(id==5)
						{
							document.getElementById("p"+id+"-1").innerHTML="350.00";
							document.getElementById("p"+id+"-2").innerHTML="Weight of specimen ring + wet soil, W<sub>2</sub> = 350 g";
						}
						setTimeout(function()
						{
							if(id==3)
							{
								validateFormativeQA(2,2,"150px","100px");
							}
							else document.getElementById("nextButton").style.visibility="visible";
						},500);
					},1300);
				}
			},750);
		}
	},500);
}

function placeApparatusInOrder(id1,id2,id3,wid,stat)
{
	document.getElementById("p6-4").style.visibility="visible";
	document.getElementById(id1).style.visibility="hidden";
	document.getElementById(id2).style.visibility="hidden";
	document.getElementById(id3).style.visibility="visible";
	document.getElementById("6-3").style.width=wid+"px";
	document.getElementById("p6-4").innerHTML=stat;
	setTimeout(function()
	{
		document.getElementById("p6-4").style.visibility="hidden";
	},2700);
}
