//enable scheduling resources and RM purchases
globalTimeKeeper={hr:0,min:0, day:1,week:1}

scheduleCheck= function(){
	if(scheduleList[1]){
		if(scheduleList[1][1]){
			scheduleDefinedForTodayFlag=true;
			if(scheduleList[1][1][0]){
				thisHourScheduleList=scheduleList[1][1][0];
			} else {
				thisHourScheduleList=false;
			}
		} else {
			thisHourScheduleList=false;
			scheduleDefinedForTodayFlag=false;
		}
	} else {
		thisHourScheduleList=false;
		scheduleDefinedForTodayFlag=false;
	}
}
scheduleList={
	
};

scheduleDefinedForTodayFlag=false;

//scheduleList[week][day][hr]: contains task object for hr on day of week
//in scheduleList[week][day][hr] we can have a list of objects
//every object will contain data about what operation is being scheduled as well as the timestamp upon which said action should be executed
//schema:

//type: indicates the type of action scheduled
//1: resource allocation
//0: RM purchase


//min: indicates tasks at a particular minute


//for type 0 (resource allocation):
//resType: resource type
//resNum: nth resource of resType
//taskX: x of task to which resource is being allocated
//taskY: y of task to which resource is being allocated

//for type 1:
//RMx
//RMy
//quantity

checkScheduleList = function() {
	if(scheduleList[globalTimeKeeper.week][globalTimeKeeper.day][globalTimeKeeper.hr]){
		if(scheduleList[globalTimeKeeper.week][globalTimeKeeper.day][globalTimeKeeper.hr][globalTimeKeeper.min]){
			return scheduleList[globalTimeKeeper.week][globalTimeKeeper.day][globalTimeKeeper.hr][globalTimeKeeper.min];
		}
	}
}


executeTask = function(task) {
	if(task.type==1) {
		//resource allocation
		//assumed the data is valid here!
		console.log(task.resType/1,task.resNum/1);
		var temp=resourceAuras[task.resType/1][task.resNum/1].ResourceComp;
		assignResourceToTask(temp,temp.attrs.assignedToX,temp.attrs.assignedToY,task.taskX,task.taskY);
	} else {
		var unitsToBePurchased= task.quantity/1;
		var RMx=task.RMx,RMy=task.RMy;
		var purchaseCost=(unitsToBePurchased*processGraph[RMx][RMy].cost);
		if(purchaseCost>currCash) { alert("You don't have enough cash."); return;}
		processGraph[RMx][RMy].units+=unitsToBePurchased;
		processFEObjs[RMx][RMy].updateRMText(processGraph[RMx][RMy].units);
		currCash-=purchaseCost;
		rmSpending+=purchaseCost;
		updateCurrCashDisplay();
	}
}

