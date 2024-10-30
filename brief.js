//generates a brief describing the simulation to the user
generateInfoSnippet= function(){
var rawMaterialTable="<table><tr><th>Raw Material</th><th>Cost</th></tr>";
for (var i=0;i<processGraph.length;i++){
	if(processGraph[i][0].isDummy==false){
		rawMaterialTable+="<tr><td>"+String.fromCharCode(i+65)+"</td><td>"+processGraph[i][0].cost+"</td></tr>"
	}
}
rawMaterialTable+="</table>";

var demandTable="<table><tr><th>Product</th><th>Units demanded</th><th>Selling price</th></tr>";
for (var i=0;i<processGraph.length;i++){
	if(processGraph[i][len2-1].isDummy==false){
		demandTable+="<tr><td>"+String.fromCharCode(i+65)+"</td><td>"+processGraph[i][len2-1].original_units+"</td><td>"+processGraph[i][len2-1].sellingPrice+"</td></tr>"
	}
}
demandTable+="</table>";

var resourceTable="<table><tr><th>Resource</th><th>Setup time distribution</th><th>Setup time</th><th>MTBF</th><th>MTTR</th></tr>";
for (var i=0;i<masterJSON.resourceInfo.length;i++){
	var distrib='',temp2='';
	if(masterJSON.resourceInfo[i].setupTimeConfig.code==0){
		distrib="Deterministic";
		temp2=""+masterJSON.resourceInfo[i].setupTimeConfig.time;
	} else if (masterJSON.resourceInfo[i].setupTimeConfig.code==2){
		distrib="Exponential";
		temp2=""+masterJSON.resourceInfo[i].setupTimeConfig.mean+"(avg.)";
	} else {
		distrib="Normal";
		temp2=""+masterJSON.resourceInfo[i].setupTimeConfig.mean+"(avg.), &sigma; ="+masterJSON.resourceInfo[i].setupTimeConfig.sd;
	}
	resourceTable+="<tr><td>"+masterJSON.resourceInfo[i].colour+"</td><td>"+distrib+"<td>"+temp2+"</td><td>"+masterJSON.resourceInfo[i].setupTimeConfig.mf+"</td><td>"+masterJSON.resourceInfo[i].setupTimeConfig.mr+"</td></tr>"
}
resourceTable+="</table>";

var taskTable="<table><tr><th>Task</th><th>Resource type</th><th>Process time distribution</th><th>Process time</th></tr>";
for (var i=0;i<processGraph.length;i++){
	for(var j=1;j<processGraph[i].length-1;j++){
		if(processGraph[i][j].isDummy==true){continue;}
		var distrib='',temp2='';
		if(processGraph[i][j].procConfig.code==0){
			distrib="Deterministic";
			temp2=""+processGraph[i][j].procConfig.time;
		} else if (processGraph[i][j].procConfig.code==2){
			distrib="Exponential";
			temp2=""+processGraph[i][j].procConfig.mean+"(avg.)";
		} else {
			distrib="Normal";
			temp2=""+processGraph[i][j].procConfig.mean+"(avg.), &sigma; ="+processGraph[i][j].procConfig.sd;
		}
		taskTable+="<tr><td>"+String.fromCharCode(65+i)+j+"</td><td>"+resourceColourList[processGraph[i][j].type]+"<td>"+distrib+"</td><td>"+temp2+"</td></tr>"
	}
}
taskTable+="</table>";
var initCSS="<html><head><style>tr:nth-child(even) {background-color: #f2f2f2;} th, td {  border-bottom: 1px solid #ddd;}th, td {  padding: 5px;  text-align: left;	}</style></head><body>";
return initCSS+rawMaterialTable+demandTable+resourceTable+taskTable+"</body></html>";
}

