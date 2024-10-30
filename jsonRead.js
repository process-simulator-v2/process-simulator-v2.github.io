//script to read JSON Simulation file
    	//{} of size 8 and each has [] array of size max 9
    	//each array element is an array with following params:
    	//0: WSfillColor
    	//blue,red,cyan,pink,brown,green
    	//  0   1   2    3     4     5
    	
        //[color,processingTime,distribution,[distribparams], bufferSize,nextArray,prevArray,rmSize/demandSize]
        //distribution schema:
        //0:deterministic
        //1:normal
        //2:exponential
    	var demoJSON=
    	{"file":[
    		[
    		[5,4,0,[0,0],0,[2,3],[-1,-1],0],
    		[],
    		[],
    		[],
    		[5,15,0,[0,0],0,[1,6],[2,3]],
    		[2,15,0,[0,0],0,[1,7],[1,5]],
    		[3,20,0,[0,0],0,[1,9],[1,6]],
    		[],
    		[2,18,0,[0,0],0,[-1,-1],[1,7],40]
    		]
    		,
    		[
    		[],
    		[],
    		[4,25,0,[0,0],0,[1,5,3,5],[1,1,3,1]],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[]
    		],
    		[
    		[5,5,0,[0,0],0,[2,3],[-1,-1],0],
    		[],
    		[],
    		[],
    		[0,6,0,[0,0],0,[4,7],[2,3]],
    		[],
    		[],
    		[],
    		[]
    		],
    		[
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[4,9,0,[0,0],0,[4,9],[3,5,5,5]],
    		[],
    		[2,6,0,[0,0],0,[-1,-1],[4,7],50]
    		],
    		[
    		[2,9,0,[0,0],0,[5,2],[-1,-1],0],
    		[3,18,0,[0,0],15,[5,5],[5,1]],
    		[],
    		[],
    		[0,28,0,[0,0],0,[4,7],[5,2]],
    		[],
    		[],
    		[],
    		[]
    		],
    		[
    		[5,15,0,[0,0],0,[6,2],[-1,-1],0],
    		[2,12,0,[0,0],0,[6,3],[6,1]],
    		[3,20,0,[0,0],10,[6,5],[6,2]],
    		[],
    		[0,14,0,[0,0],0,[6,7],[6,3]],
    		[],
    		[3,7,0,[0,0],0,[6,9],[6,5]],
    		[],
    		[2,10,0,[0,0],0,[-1,-1],[6,7],40]
    		],
    		[
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[]
    		],
    		[
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[],
    		[]
    		]
    		]
    	};
    	
    	var colorMap=['blue','red','cyan','pink','brown','green']
    	var processObjs=[];
    	var JSONParser = function (jsonFile){
    		var i=0,j=0,k=0;
    		var t1,t2,t3;
    		var temp;
    		var temp2;
    		var temp3;
    		var temp4;
    		var temp5;
    		for(i=0;i<8;i++){
    			t1= new Array();
    			processObjs.push(t1);
    			for(j=0;j<9;j++){
    				t2=new Array();
    				processObjs[i].push(t2);
    				//[
    				//[[],[],[]],
    				//[[],[],[]]
    				//]
    				if(typeof jsonFile['file'][i][j]!=='undefined' && jsonFile['file'][i][j].length>0) {
	    				processObjs[i][j].push(new WS(xCoord+100+100*i,yCoord-(100+65*j),colorMap[jsonFile['file'][i][j][0]],jsonFile['file'][i][j][2],jsonFile['file'][i][j][3][0],jsonFile['file'][i][j][3][1],i,j,jsonFile['file'][i][j][6],jsonFile['file'][i][j][5]));
	    				processObjs[i][j].push(new Buffer(xCoord+70+100*i,yCoord-(145+65*j),i,j,jsonFile['file'][i][j][6],jsonFile['file'][i][j][5]));
	    				processObjs[i][j][1].insertBuffer();
	    				processObjs[i][j][0].insertWS();
	    				processObjs[i][j][1].updateBufferText(''+jsonFile['file'][i][j][4]);
	    				processObjs[i][j][0].updateWSText(jsonFile['file'][i][j][1]);
	    				processObjs[i][j].push(new Array());
	    				
	    				console.log(processObjs[i][j]);
	    				temp3=jsonFile['file'][i][j][5];
	    				if(typeof temp3!=='undefined' && temp3.length>0 && temp3[0]!=-1){
	    					t3=0;
	    					for(k=0;k<temp3.length;k+=2){
	    						if(temp3[k]!=i+1||temp3[k+1]!=j+2){
	    							t3+=1;
	    							processObjs[i][j][2].push(new Arrow(xCoord+100+100*i,yCoord-(145+65*j),xCoord+100+100*(temp3[k]-1),yCoord-(80+65*(temp3[k+1]-1))));
	    							processObjs[i][j][2][t3-1].insertArrow();
	    							
	    						}
	    					}
	    				}
	    				if(j==8) {
	    					processObjs[i][j].push(new Demand(xCoord+100+100*i,yCoord-(165+65*j)));
	    					processObjs[i][j][3].insertDemand();
	    					processObjs[i][j][3].updateDemandText(jsonFile['file'][i][j][7]);
	    				}
	    				if(j==0) {
	    					processObjs[i][j].push(new RM(xCoord+100+100*i,yCoord-(60+65*j)));
	    					processObjs[i][j][3].insertRM();
	    				}
    				}
    				
    			}
	    	}
    	}
    	