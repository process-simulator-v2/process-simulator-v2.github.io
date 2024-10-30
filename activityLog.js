activityLog=[];

exportActivityLog = function() {
	//saves the process JSON
	var activityLogString="";
	for(var i=0;i<activityLog.length;i++){
		activityLogString+=activityLog[i]+"\n\n";
	}
    var dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(activityLogString);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "activityLog.txt");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}