//all financial dealings tracked and computed here

budget=0;
fixedExp=0;//weekly fixed expenditure
currCash=0;
account=[];//keeps track of financial transactions
dayThroughput=0;
weekThroughput=0;
totalThroughput=0;
rmSpending=0;
totSpending=0;
//frontend
xCoordFinance=25;
yCoordFinance =150;
repairMode = 0;
globalFinanceObj={
	cashDescriber: new Konva.Text({
		x: xCoordFinance,
	   	y: yCoordFinance,
	    text:"Cash:",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'cashDescriber'
	}),
	currCash: new Konva.Text({
		x: xCoordFinance,
	   	y: yCoordFinance+20,
	    text:""+currCash,
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 100,
	    //padding: 20,
	    align: 'left',
	    id:'currCash'
	}),
	fixedExpDescriber: new Konva.Text({
		x: xCoordFinance,
	   	y: yCoordFinance+20+30,
	    text:"Fixed Exp:",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    id:'fixedExpDescriber'
	}),
	fixedExp: new Konva.Text({
		x: xCoordFinance,
	   	y: yCoordFinance+20+30+20+20,
	    text:""+fixedExp,
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 100,
	    //padding: 20,
	    align: 'left',
	    id:'fixedExp'
	}),
	paceDisplay: new Konva.Text({
		x: xCoordFinance,
	   	y: yCoordFinance+20+30+20+20+30,
	    text:"Pace: 1",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 100,
	    //padding: 20,
	    align: 'left',
	    id:'paceDisplay'
	})
}

repairDisplay = new Konva.Text({
	x: xCoordFinance,
	   y: yCoordFinance+20+30+20+20+30+30,
	text:"Repair Mode: Preemptive repair",
	fontSize: 12,
	fill: 'grey',
	fontFamily: 'Arial',
	width: 100,
	//padding: 20,
	align: 'left',
	id:'repairDisplay'
})
function changeRepairMode(num = 0){
	let txt = "Repair Mode: Preemptive repair";
	if(num == 2) txt = "Repair Mode: Non-preemptive with new process time";
	if(num == 1) txt = "Repair Mode: Non-preemptive repair";
	repairDisplay.setAttr('text',txt);
	//layer.draw();
}

updateCurrCashDisplay = function(){
	var text = layer.find('#currCash')[0];
	text.setAttr('text',''+currCash);
	layer.draw();
}

updatePaceDisplay = function() {
	var text = layer.find('#paceDisplay')[0];
	text.setAttr('text',"Pace: "+(1+currPace));
	layer.draw();
}

triggerEndOfWeekFinancialsDialog = function(){
		totSpending+=rmSpending;
		totSpending+=fixedExp;
		currCash=currCash-fixedExp;
		updateCurrCashDisplay();
		var endOfWeekCash=currCash;
		var thisWeekThroughput=weekThroughput;
		var RMinventoryValue=0;
		for(var i=0;i<len1;i++){
			if(processGraph[i][0].isDummy==false) RMinventoryValue+=(processGraph[i][0].cost*processGraph[i][0].units);
		}
		var netProfit=(totalThroughput-totSpending);
		var ROI = 100.0*netProfit/totSpending;
		document.getElementById("netProfit").innerHTML=""+netProfit;
		document.getElementById("eowCash").innerHTML=""+currCash;
		document.getElementById("sales").innerHTML=""+totalThroughput;
		document.getElementById("RMinventoryValue").innerHTML=""+RMinventoryValue;
		document.getElementById("OpEx").innerHTML=""+fixedExp;
		document.getElementById("ROI").innerHTML=""+ROI.toFixed(2)+"%";

		//resource utilization compute:
		var totalTimeElapsed=(globalTimeKeeper.week-1)*5*8*60
		var tempTimeElapsed;
		var temp='<table class=\"disptable\"><tr><th>Resource</th><th>Setup</th><th>Prod</th><th>Repair</th></tr>';
		for(var i=0;i<resourceUtilization.length;i++){
			tempTimeElapsed=(masterJSON.resourceInfo[i].num/1)*totalTimeElapsed;
			temp+='<tr><td>'+resourceColourList[i]+"</td><td>"+(100.0*resourceUtilization[i].setup/tempTimeElapsed).toFixed(2)+"%</td><td>"+(100.0*resourceUtilization[i].prod/tempTimeElapsed).toFixed(2)+"%</td><td>"+(100.0*resourceUtilization[i].repair/tempTimeElapsed).toFixed(2)+"%</td></tr>";
		}
		document.getElementById('ResourceUtilizationDiv').innerHTML=temp+'</table>';
		EOWFinancialsModal.style.display="block";

		//demand vs units sold:

		var temp2='<table class=\"disptable\"><tr><th>Product</th><th>Demand</th><th>Units sold</th></tr>';
		for(var i=0;i<len1;i++){
			if(processGraph[i][len2-1].isDummy==false)
			temp2+='<tr><td>'+String.fromCharCode(i+65)+"</td><td>"+processGraph[i][len2-1].original_units+"</td><td>"+(processGraph[i][len2-1].original_units-processGraph[i][len2-1].units)+"</td></tr>";
		}
		document.getElementById('ResourceUtilizationDiv').innerHTML=temp+'</table><br><h3>Demand-Supply</h3><hr/>'+temp2+'</table>';
	}