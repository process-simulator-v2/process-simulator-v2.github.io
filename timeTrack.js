globalTimeKeeper={hr:0,min:0, day:1,week:1}
xCoordTimer=25;
yCoordTimer=50;
thisHourScheduleList=false;
globalTimeKeeperObj={
	hr: new Konva.Text({
		x: xCoordTimer,
	   	y: yCoordTimer+50,
	    text:"00",
	    fontSize: 20,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjHr'
	}),
	min: new Konva.Text({
		x: xCoordTimer+30,
	   	y: yCoordTimer+50,
	    text:"00",
	    fontSize: 20,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjMin'
	}),
	colon: new Konva.Text({
		x: xCoordTimer+23,
	   	y: yCoordTimer+49,
	    text:":",
	    fontSize: 20,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjColon'
	}),

	DayDescriber: new Konva.Text({
		x: xCoordTimer,
	   	y: yCoordTimer+25,
	    text:"Day ",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjDayDescriber'
	}),

	DayCounter: new Konva.Text({
		x: xCoordTimer+35,
	   	y: yCoordTimer+25,
	    text:"1",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjDay'
	}),
	
	WeekDescriber: new Konva.Text({
		x: xCoordTimer,
	   	y: yCoordTimer,
	    text:"Week ",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjDayDescriber'
	}),

	WeekCounter: new Konva.Text({
		x: xCoordTimer+45,
	   	y: yCoordTimer,
	    text:"1",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'globalTimeKeeperObjWeek'
	}),
};

incrementGlobalTimeKeeperMinutes = function(){
	if(globalTimeKeeper.min==60) {incrementGlobalTimeKeeperHours(); globalTimeKeeper.min=0;}
	
}
incrementGlobalTimeKeeperMinutesFE = function () {
	var text = layer.find('#globalTimeKeeperObjMin')[0];
	if(globalTimeKeeper.min<10) text.setAttr('text','0'+globalTimeKeeper.min);
	else text.setAttr('text',''+globalTimeKeeper.min);
	layer.draw();
}

incrementGlobalTimeKeeperHours = function(){
	++globalTimeKeeper.hr;
	if(globalTimeKeeper.hr==8) {globalTimeKeeper.hr=0; incrementDayCounter();} 
	else {
		if(scheduleDefinedForTodayFlag){ 
			if(scheduleList[globalTimeKeeper.week][globalTimeKeeper.day][globalTimeKeeper.hr]){
			thisHourScheduleList=scheduleList[globalTimeKeeper.week][globalTimeKeeper.day][globalTimeKeeper.hr];
		} else thisHourScheduleList=false;
	}
	}
	var text = layer.find('#globalTimeKeeperObjHr')[0];
	text.setAttr('text','0'+globalTimeKeeper.hr);
	layer.draw();
}

incrementDayCounter = function() {
	++globalTimeKeeper.day;
	alert('Day over! Throughput:'+dayThroughput);
	weekThroughput+=dayThroughput;
	totalThroughput+=dayThroughput;
	dayThroughput=0;
	if(globalTimeKeeper.day==6) {globalTimeKeeper.day=1; incrementWeekCounter();}
	if(scheduleList[globalTimeKeeper.week]){
		if(scheduleList[globalTimeKeeper.week][globalTimeKeeper.day]){
			scheduleDefinedForTodayFlag=true;
		} else {scheduleDefinedForTodayFlag=false;}
	} else {scheduleDefinedForTodayFlag=false;}
	var text = layer.find('#globalTimeKeeperObjDay')[0];
	text.setAttr('text',''+globalTimeKeeper.day);
	layer.draw();
}

incrementWeekCounter = function() {
	++globalTimeKeeper.week;
	clearInterval(simulationInterval);
	simulationInterval =0;
	changeButtons(1);
	
	if(globalTimeKeeper.week==noOfWeeks+1) {
		alert("simulation over!");
		document.getElementById("runSimulation").disabled=true; 
		clearInterval(simulationInterval);
		simulationInterval = 0;
		triggerEndOfWeekFinancialsDialog(); return;} else {
			triggerEndOfWeekFinancialsDialog();
			if(currCash<0){
				alert("You are bankrupt! Simulation over.");
				document.getElementById("runSimulation").disabled=true; 
			}
		} 
	var text = layer.find('#globalTimeKeeperObjWeek')[0];
	text.setAttr('text',''+globalTimeKeeper.week);
	layer.draw();
}


resourceUtilization=[];