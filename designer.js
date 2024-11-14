//functions in this file


//defineResourceType: this function will be invoked from the "Create new Resource(s)" process flow in the GUI. 
//takes colour (which will be automatically assigned), setupTimeConfig which is a description of the distribution and its parameters for the setup time
// and number of resources (1-5) as inputs

//designerInitiate: this function creates a grid which can be interacted with to define the process flowchart
//takes the following inputs:
//x= number of raw materials (min: 1, max: 10)
//y= number of end products (min: 1, max: 10)
//z= number of rows in the process flow (min: 1, max 10)

designGridObjs=[];
definedFlag=[];

actionStack=[];
//action code
 function KeyPress(e) {
            var evtobj = window.event? event : e


            //test1 if (evtobj.ctrlKey) alert("Ctrl");
            //test2 if (evtobj.keyCode == 122) alert("z");
            //test 1 & 2
            if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            	//undo from actionStack
            	var temp=actionStack.pop();
            	if(temp.code=='ws-add'){
            		definedFlag[temp.x][temp.y]=0;
            		tentativeGraph[temp.x][row+1-temp.y]=new Node(0,0,0,0,[],true,false);
            		removeWS(temp.x,temp.y);
            		removeBuffer(temp.x,temp.y);

            	} else if(temp.code=='rm-add'){
            		definedFlag[temp.x][temp.y]=0;
            		tentativeGraph[temp.x][row+1-temp.y]=new Node(0,0,0,0,[],true,false);
            		removeRM(temp.x,temp.y,temp.id);
            	} else if (temp.code=='dm-add'){
            		definedFlag[temp.x][temp.y]=0;
            		tentativeGraph[temp.x][row+1-temp.y]=new Node(0,0,0,0,[],true,false);
            		removeDemand(temp.x,temp.y,temp.id);
            	} else if (temp.code=='ws-select-1'){
            		oneWSselectedFlag=0;
            		var shape = stage.find('#grid-'+connectX1+'-'+connectY1)[0];
					shape.attrs.fill="white";
					layer.draw();
            	} else if (temp.code=='ws-select-2'){
            		tentativeArrowList.pop();
            		oneWSselectedFlag=1;
            		var shape = stage.find('#grid-'+connectX1+'-'+connectY1)[0];
					shape.attrs.fill="yellow";
					var shape = stage.find('#Arrow'+temp.id)[0];
					shape.remove();
					layer.draw();
            	}
            }
        }

        document.onkeyup = KeyPress;

//for resources
var xCoord2=200;
var yCoord2=50;

//for process
var xCoord1=600;
var yCoord1=50;

var resourceColourList=["blue",	"red", "cyan", "pink", "brown", "green", "grey"];

//resource code
var currResourceTypeCount=0;
defineResourceType = function (setupTimeConfig, numResources) {
	if(currResourceTypeCount==0) {
		var temp3= new Konva.Text({
		x: xCoord2-50,
	    y: yCoord2-30,
	    text:'Setup',
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left'
	});
	layer.add(temp3);
	stage.add(layer);

	}
	//creates new resource type
	if(currResourceTypeCount==7) { alert("can't create more than 7 types of resources!"); return;}
	tentativeResourceList.push({
		type:currResourceTypeCount,
		colour:resourceColourList[currResourceTypeCount],
		setupTimeConfig:setupTimeConfig,
		num:numResources
	});
	var opt = document.createElement('option');
    		opt.value = currResourceTypeCount;
    		opt.innerHTML = resourceColourList[currResourceTypeCount];
			resourcesSelect.appendChild(opt);
	if(setupTimeConfig.code==0) var timeDisplay=setupTimeConfig.time;
	else var timeDisplay=setupTimeConfig.mean;
	currResourceTypeCount+=1; //increment counter
	var temp2= new Konva.Text({
		x: xCoord2-50,
	    y: yCoord2+17.5+100*(currResourceTypeCount-1),
	    text:""+timeDisplay,
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left'
	});
	var temp3= new Konva.Text({
		x: xCoord2-150,
	    y: yCoord2+17.5+100*(currResourceTypeCount-1),
	    text:"",
		//text:"[edit]",
	    fontSize: 15,
	    fontFamily: 'Arial',
	    width: 50,
	    //padding: 20,
	    align: 'left',
	    res_index:currResourceTypeCount
	});
	temp3.on('mouseenter', function () {
        stage.container().style.cursor = 'pointer';
      });
	temp3.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
      });
	temp3.on('mouseup', function(){
		//edit this particular resource
		addResourceModal.style.display = "block";
		editMode=true;
		var res_index=this.attrs.res_index-1;
		currResourceBeingEdited=res_index;
		console.log(tentativeResourceList[res_index],tentativeResourceList[res_index].setupTimeConfig.code/1);
		document.getElementById("numResourceInput").focus();
		document.getElementById("numResourceInput").value=tentativeResourceList[res_index].num/1;
		var code=tentativeResourceList[res_index].setupTimeConfig.code/1;
		if(code==0){
		 document.getElementById("deterministic").checked=true;
		 distributionCheck();
		 console.log(tentativeResourceList[res_index].setupTimeConfig.time);
		 document.getElementById("det-time").value=tentativeResourceList[res_index].setupTimeConfig.time;
		}
		else if (code==1) {
			document.getElementById("normal").checked=true;
			distributionCheck();
			document.getElementById("norm-mean-time").value=tentativeResourceList[res_index].setupTimeConfig.mean;
			document.getElementById("norm-sd").value=tentativeResourceList[res_index].setupTimeConfig.sd;
		}
		else {
			document.getElementById("exponential").checked=true;
			distributionCheck();
			document.getElementById("exp-mean-time").value=tentativeResourceList[res_index].setupTimeConfig.mean;
		}

		document.getElementById("mf").value=tentativeResourceList[res_index].setupTimeConfig.mf;
		document.getElementById("mr").value=tentativeResourceList[res_index].setupTimeConfig.mr;
		
	});
	layer.add(temp2);
	layer.add(temp3);
	stage.add(layer);

	for (var i=0;i<numResources;i++) {
		var temp= new Resource({
			x:xCoord2+60*i,
			y:yCoord2+100*(currResourceTypeCount-1),
			colour:resourceColourList[currResourceTypeCount-1], 
			stroke:'black',
			setupTime:setupTimeConfig, 
			id: ''+currResourceTypeCount+'-'+i
		});
	}
}
currResourceBeingEdited=0;
editResourceType = function(setupTimeConfig, numResources){
	editMode=false;
	if(tentativeResourceList[currResourceBeingEdited].num<numResources){
		//add remaining
		for (var i=tentativeResourceList[currResourceBeingEdited].num-1;i<numResources;i++) {
		var temp= new Resource({
			x:xCoord2+60*i,
			y:yCoord2+100*(currResourceBeingEdited),
			colour:resourceColourList[currResourceBeingEdited], 
			stroke:'black',
			setupTime:setupTimeConfig, 
			id: ''+currResourceBeingEdited+'-'+i
		});
	}
	} else if (tentativeResourceList[currResourceBeingEdited].num>numResources){
		//remove extra
		var delta=tentativeResourceList[currResourceBeingEdited].num-numResources;
		console.log("delta:"+delta);
		while (delta>0){
			//console.log('#'+currResourceBeingEdited+'-'+(numResources+delta-1));
			var objToBeRemoved= layer.find('#'+(currResourceBeingEdited+1)+'-'+(numResources+delta-1))[0];
			var objToBeRemoved2= layer.find('#ResourceText'+(currResourceBeingEdited+1)+'-'+(numResources+delta-1))[0];
			var objToBeRemoved3= layer.find('#ResourceStatusText'+(currResourceBeingEdited+1)+'-'+(numResources+delta-1))[0];
			objToBeRemoved.remove();
			objToBeRemoved2.remove();
			objToBeRemoved3.remove();

			delta-=1;
		}
		layer.draw();
	}
	tentativeResourceList[currResourceBeingEdited].num=numResources;
	tentativeResourceList[currResourceBeingEdited].setupTimeConfig=setupTimeConfig;
}
row=0;
col=0;
//process code
designerInitiate = function (x,y,z) {
	//x= number of raw materials (min: 1, max: 10)
	//y= number of end products (min: 1, max: 10)
	//z= number of rows in the process flow (min: 1, max 10)
	col= Math.max(x,y);
	row=z;
	var height,y;
	for (var i=0;i<col;i++) {
		designGridObjs.push(new Array());
		definedFlag.push(new Array());
		tentativeGraph.push(new Array());
		for (var j=0;j<row+2; j++) {
			//Node: type,createdUnits,setupConfig,procConfig,children, isDummy,isDemand
			tentativeGraph[i].push(new Node(0,0,0,0,[],true,false));
			definedFlag[i].push(0);
			if(j==0||j==row+1){height=30;} else {height=50;}
            if(j==1){y=30;} else if(j==0){y=0;} else {y=30+50*(j-1);}
			designGridObjs[i].push(new Konva.Rect({
                x: xCoord1+80*i,
                y: yCoord1+y,
                width: 80,
                height: height,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2,
                id: 'grid-'+i+'-'+j
            }));
            layer.add(designGridObjs[i][j]);
            stage.add(layer);
            if(j==0){
            
                // designGridObjs[i][j].on('mouseup', function(){
                //     demandTrigger2(this.id());
                // })  ;
            } else if (j==row+1) {
            	
                // designGridObjs[i][j].on('mouseup', function(){
                //     rmTrigger2(this.id());
                // })  ;
            } else {
            	
                // designGridObjs[i][j].on('mouseup', function(){
                //     wsTrigger2(this.id());
                // })  ;
            }
		}
	}
	stage.on('click', function(){
		 var position=stage.getPointerPosition();
		 var yy=0,xx=0;
		 if(position.x>xCoord1&& position.y>yCoord1){
		 	if(position.y<yCoord1+30){ yy = 0;}
		 	else { yy=1+Math.trunc(((position.y-yCoord1-30)/50)/1);}
			xx=Math.trunc(((position.x-xCoord1)/80)/1);
			//console.log(xx,yy);
			if(yy>0&&yy<row+1&&xx<col){
				//user has clicked on a workstation
				wsTrigger2(xx,yy);
			} else if (yy==row+1 && xx<col){
				//user has clicked on an rm
				rmTrigger2(xx,yy);
			} else if (yy==0 && xx<col){
				demandTrigger2(xx,yy);
			}
		}
	});
}
//tooltips
//explain the user what they're adding in the grid:


//define interactivity with the grid:

//wsTrigger

wsAddEnable=0;
rmAddEnable=0;
wsEditEnable=0;
demandAddEnable=0;
wsConnectEnable=0;
oneWSselectedFlag=0;
connectX1=0;
connectY1=0;
connectX2=0;
connectY2=0;

//save info here
tentativeResourceList= [];
tentativeGraph= [];
currWSx=0;
currWSy=0;
wsTrigger2 = function(x,y) {
	if(wsAddEnable==0&&wsConnectEnable==0 && wsEditEnable==0) { return; }
	if(wsEditEnable==1) {
		if(definedFlag[x][y]==1){
			addWorkstationModal.style.display = "block";
			currWSx=x;
			currWSy=y;
			document.getElementById('ws-buffer2').value=tentativeGraph[x][row+1-y].units;
			var code=tentativeGraph[x][row+1-y].procConfig.code;
			if(code==0){
			 document.getElementById("deterministic2").checked=true;
			 distributionCheck2();
			 //console.log(tentativeResourceList[res_index].setupTimeConfig.time);
			 document.getElementById("det-time2").value=tentativeGraph[x][row+1-y].procConfig.time;
			}
			else if (code==1) {
				document.getElementById("normal2").checked=true;
				distributionCheck2();
				document.getElementById("norm-mean-time2").value=tentativeGraph[x][row+1-y].procConfig.mean;
				document.getElementById("norm-sd2").value=tentativeGraph[x][row+1-y].procConfig.sd;
			}
			else {
				document.getElementById("exponential2").checked=true;
				distributionCheck2();
				document.getElementById("exp-mean-time2").value=tentativeGraph[x][row+1-y].procConfig.mean;
			}
		}
		return;
	}
	
	if(wsConnectEnable==1) {
		if(definedFlag[x][y]==0){return;}
		if(oneWSselectedFlag==0) { 
			oneWSselectedFlag=1;
			connectX1=x;
			connectY1=y;
			//console.log("connect 1 coords:"+x+","+y);
			
			var shape = stage.find('#grid-'+x+'-'+y)[0];
			shape.attrs.fill="yellow";
			layer.draw();
			actionStack.push({code:'ws-select-1',x:x,y:y});
			return;
		}
		if(oneWSselectedFlag==1) {
			oneWSselectedFlag=0;
			connectX2=x;
			connectY2=y;
			if(connectY2>=connectY1) {
				actionStack.pop();
				var shape = stage.find('#grid-'+connectX1+'-'+connectY1)[0];
				shape.attrs.fill="white";
				layer.draw();
				oneWSselectedFlag=0;
				return;
			}
			//console.log("connect 2 coords:"+x+","+y);
			connectWorkstations(connectX1,connectY1,connectX2,connectY2);
			var yyy=row+1-connectY1;
			var shape = stage.find('#grid-'+connectX1+'-'+connectY1)[0];
			shape.attrs.fill="white";
			layer.draw();
			
			return;
		}
	}
	if(definedFlag[x][y]==1) { return; }
	currWSx=x;
	currWSy=y;
	promptForWSInput();

}

promptForWSInput = function () {
	addWorkstationModal.style.display = "block";
	document.getElementById("ws-buffer2").value=0;
}

addWorkstation = function (x,y,type,procConfig,buffervalue) {
	definedFlag[x][y]=1;
	if(wsEditEnable==1){
		console.log(x,y);
		removeWS(x,y);
		removeBuffer(x,y);
	}
	var yy;
	if(y==1){yy=30;} else if(y==0){yy=0;} else {yy=30+50*(y-1);}
	var t1= new WS(xCoord1+80*x+40,yy+85,tentativeResourceList[type].colour,0,0,0,x,y,[],[]);
	t1.insertWS();
	if(procConfig.code==0) t1.updateWSText(procConfig.time);
	else t1.updateWSText(procConfig.mean);
	var t2= new Buffer(xCoord1+80*x+20,yy+50,x,y,[],[]);
	t2.insertBuffer();
	t2.updateBufferText(""+buffervalue);
	tentativeGraph[x][row+1-y].isDummy=false;
	tentativeGraph[x][row+1-y].type=type;
	tentativeGraph[x][row+1-y].units=""+buffervalue;
	tentativeGraph[x][row+1-y].displayProcTime=""+getDisplayTime(procConfig);
	if(y==0) tentativeGraph[x][row+1-y].isDemand=true;
	if(definedFlag[x][y+1]==1){tentativeGraph[x][row+1-y].childNodes.push([x,row+1-y-1]);}
	if(definedFlag[x][y-1]==1){tentativeGraph[x][row+1-y+1].childNodes.push([x,row+1-y]);}
	tentativeGraph[x][row+1-y].procConfig=procConfig;
	tentativeGraph[x][row+1-y].setupConfig=tentativeResourceList[type].setupTimeConfig;
	tentativeGraph[x][row+1-y].breakdown=false;
	tentativeGraph[x][row+1-y].timeSinceRepair=0;
	tentativeGraph[x][row+1-y].numBreakdowns=0;
	//console.log(tentativeGraph[x][row+1-y]);
	actionStack.push({code:'ws-add',x:x,y:y});
}
tentativeArrowList=[];
connectWorkstations = function (x1,y1,x2,y2) {
	//connects workstations at x1,y1 and x2,y2
	var yy1,yy2;
	if(y1==1){yy1=80;} else if(y1==0){yy1=30;} else {yy1=80+50*(y1-1);}
	if(y2==1){yy2=80;} else if(y2==0){yy2=30;} else {yy2=80+50*(y2-1);}
	var x1p=xCoord1+80*x1+40;
	var x2p=xCoord1+80*x2+40;
	var t;
	if(x1>x2 ) {
		t=new Arrow(x1p,yy1,x2p+20,yy2+35);
		tentativeArrowList.push([x1p,yy1,x2p+20,yy2+35,x1,y1,x2,y2]);
	}	else if(x1<x2) {
		t=new Arrow(x1p,yy1,x2p-20,yy2+35);
		tentativeArrowList.push([x1p,yy1,x2p-20,yy2+35,x1,y1,x2,y2]);
	}	else {
		t=new Arrow(x1p,yy1,x2p,yy2+50);
		tentativeArrowList.push([x1p,yy1,x2p,yy2+50,x1,y1,x2,y2]);
	}
	t.insertArrow();
	tentativeGraph[x2][row+1-y2].childNodes.push([x1,row+1-y1]);
	actionStack.push({code:'ws-select-2',x:x2,y:y2,id:''+x1+'-'+y1+'-'+x2+'-'+y2+''});
	//console.log(tentativeGraph[x2][row+1-y2]);
}

currRMx=0;
currRMy=0;
rmTrigger2 = function (x,y) {
	if(rmAddEnable==0&&wsConnectEnable==0) { return; }
	if(rmAddEnable==1) {
		if(definedFlag[x][y]==1) { return; }
		currRMx=x;
		currRMy=y;
		promptForRMInput();
		return;
	}
	if(wsConnectEnable==1){
		if(definedFlag[x][y]==0){return;}
		if(oneWSselectedFlag==1){return;}
		oneWSselectedFlag=1;
		connectX1=x;
		connectY1=y;
		//console.log("connect 1 coords:"+x+","+y);
		var shape = stage.find('#grid-'+connectX1+'-'+connectY1)[0];
		shape.attrs.fill="yellow";
		layer.draw();
		return;
	}
}

promptForRMInput = function () {
	addRMModal.style.display = "block";
	document.getElementById("costPerUnit").focus();
}

addRawMaterialNode = function(x,y,props) {
	//props: cost: cost per unit of the raw material
	definedFlag[x][y]=1;
	var yy;
	if(y==1){yy=30;} else if(y==0){yy=0;} else {yy=30+50*(y-1);}
	var t1= new RM(xCoord1+80*x+40,yy+65);
	t1.insertRM();
	t1.updateRMText("0");
	tentativeGraph[x][row+1-y].isDummy=false;
	tentativeGraph[x][row+1-y].cost=props.cost;
	if(definedFlag[x][y+1]==1){tentativeGraph[x][row+1-y].childNodes.push([x,row+1-y-1]);}
	if(definedFlag[x][y-1]==1){tentativeGraph[x][row+1-y+1].childNodes.push([x,row+1-y]);}
	//console.log(tentativeGraph[x][row+1-y]);
	actionStack.push({code:'rm-add',x:x,y:y,id: RMCounter});
}


currDx=0;
currDy=0;

demandTrigger2 = function (x,y) {
	if(demandAddEnable==0&&wsConnectEnable==0) { return; }
	if(demandAddEnable==1) {
		if(definedFlag[x][y]==1) { return; }
		currDx=x;
		currDy=y;
		promptForDemandInput();
	}
	if(wsConnectEnable==1){
		if(definedFlag[x][y]==0){return;}
		if(oneWSselectedFlag==0){return;}
		oneWSselectedFlag=0;
		connectX2=x;
		connectY2=y;
		//console.log("connect 2 coords:"+x+","+y);
		var shape = stage.find('#grid-'+connectX1+'-'+connectY1)[0];
		shape.attrs.fill="white";
		layer.draw();
		connectWorkstations(connectX1,connectY1,connectX2,connectY2);
		return;
	}
}

promptForDemandInput = function () {
	addDemandModal.style.display = "block";
	document.getElementById("unitsDemanded").focus();
}
addDemandNode = function(x,y,props) {
	//props: units: units demanded
	definedFlag[x][y]=1;
	var yy;
	if(y==1){yy=30;} else if(y==0){yy=0;} else {yy=30+50*(y-1);}
	var t1= new Demand(xCoord1+80*x+40,yy+65);
	t1.insertDemand();
	t1.updateDemandText(props.units);
	tentativeGraph[x][row+1-y].isDummy=false;
	tentativeGraph[x][row+1-y].units=props.units;
	tentativeGraph[x][row+1-y].sellingPrice=props.sellingPrice;
	tentativeGraph[x][row+1-y].isDemand=true;
	if(definedFlag[x][y+1]==1){tentativeGraph[x][row+1-y].childNodes.push([x,row+1-y-1]);}
	if(definedFlag[x][y-1]==1){tentativeGraph[x][row+1-y+1].childNodes.push([x,row+1-y]);}
	//console.log(tentativeGraph[x][row+1-y]);
	actionStack.push({code:'dm-add',x:x,y:y,id:DemandCounter});
}


exportProcess = function(fileName) {
	if(check(fileName)) return;
	for(var i=0;i<tentativeGraph.length;i++){
		for(var j=1;j<tentativeGraph[i].length-1;j++){
			if(tentativeGraph[i][j].isDummy==false && tentativeGraph[i][j].childNodes.length==0){
				alert("Incomplete process flow!");
				return;
			}
		}
	}
	//saves the process JSON
	var processJSONObj={
		metadata: {
			fileName: fileName,
			fixedExp: fixedExpValue,
			initCash: initCashValue,
			weeks: noOfWeeks
		},
		resourceInfo: tentativeResourceList,
		processInfo:tentativeGraph,
		connectorInfo:tentativeArrowList
	}
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(processJSONObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", fileName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

loadDesignerExisting = function(existingJSON) {
	//first, set up resources
	var resourcesArray= existingJSON.resourceInfo;
	for(var i=0;i<resourcesArray.length;i++) {
		defineResourceType( resourcesArray[i].setupTimeConfig, resourcesArray[i].num);
	}

	//import metadata
	fixedExpValue=existingJSON.metadata.fixedExp/1;
	initCashValue=existingJSON.metadata.initCash/1;
	noOfWeeks=existingJSON.metadata.weeks;
	//next, create process grid
	var _cols= existingJSON.processInfo.length;
	var _rows = existingJSON.processInfo[0].length-2;
	designerInitiate(_cols,_cols,_rows);


	//next, define workstations, RM nodes, and Demand nodes

	//RM nodes

	for(var i=0;i<existingJSON.processInfo.length;i++){
		if(existingJSON.processInfo[i][0].isDummy==false) {
			addRawMaterialNode(i, _rows+1,{cost:existingJSON.processInfo[i][0].cost});
		}
	}

	//Demand nodes
	for(var i=0;i<existingJSON.processInfo.length;i++){
		if(existingJSON.processInfo[i][_rows+1].isDummy==false) {
			addDemandNode(i, 0,{units:existingJSON.processInfo[i][_rows+1].units,sellingPrice:existingJSON.processInfo[i][_rows+1].sellingPrice});
		}
	}

	//workstations
	for(var i=0;i<existingJSON.processInfo.length;i++){
		for (var j=1;j<_rows+1;j++){
			if(existingJSON.processInfo[i][j].isDummy==false) {
				addWorkstation(i,_rows+1-j,existingJSON.processInfo[i][j].type,existingJSON.processInfo[i][j].procConfig,existingJSON.processInfo[i][j].units);
			}
		}
	}

	//connect stuff!
	for(var i=0;i<existingJSON.connectorInfo.length;i++){
		connectWorkstations(existingJSON.connectorInfo[i][4],existingJSON.connectorInfo[i][5],existingJSON.connectorInfo[i][6],existingJSON.connectorInfo[i][7]);
	}

}

function loadCanvas(resultData){
	resXCount = 0;
	resYCount = resultData?.resourceInfo?.length || 0;
	procXCount = resultData?.processInfo?.length || 0;
	procYCount = resultData?.processInfo?.[0]?.length || 0;
	for(let res of resultData?.resourceInfo) resXCount= max2(resXCount, res?.num);
	setStage(max2(resXCount,5)*60 + max2(procXCount,6)*80 + 300,max2(max2(resYCount,5)*100+75,max2(procYCount,6)*50+75));
	xCoord1 = 300+60*max2(resXCount,5);
}
function loadCanvas1(resXCount,resYCount,procXCount,procYCount){
	setStage1(max2(resXCount,5)*60 + max2(procXCount,6)*80 + 300,max2(max2(resYCount,5)*100+75,max2(procYCount,6)*50+75));
	xCoord1 = 300+60*max2(resXCount,5);
}
function setStage1(widthInput,heightInput){
	let stage1; if(stage) stage1 = stage;
	stage = new Konva.Stage({
	container: 'container',
	width: widthInput,
	height: heightInput
	});
	//layer = new Konva.Layer();

	// add the layer to the stage
	stage.add(layer);
	stage1?.destroy;
}

function max2(a,b){ if (a> b) return a; return b;}
function min2(a,b){ if (a< b) return a; return b;}
var stage,layer;
function setStage(widthInput,heightInput){
	if(stage) stage?.destroy();
	stage = new Konva.Stage({
	container: 'container',
	width: widthInput,
	height: heightInput
	});
	layer = new Konva.Layer();

	// add the layer to the stage
	stage.add(layer);
}
