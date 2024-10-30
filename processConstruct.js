var gridObjs=[];
var gridObjs2=[];
var processTempObjs=[];
var flags=[];
var flags2=[];
var xCoord1=100;
var yCoord1=50;
grid = function () {
    var i=0,j=0;
    var gridComp;
    var height,y;
    for(i=0;i<8;i++){
        gridObjs.push(new Array());
        processTempObjs.push(new Array());
        flags.push(new Array());
        for(j=0;j<11;j++){
            if(j==0||j==10){height=40;} else {height=65;}
            if(j==1){y=40;} else if(j==0){y=0;} else {y=40+65*(j-1);}
            gridObjs[i].push(new Array());
            processTempObjs[i].push(new Array());
            flags[i].push(0);
            gridObjs[i][j]=new Konva.Rect({
                x: xCoord1+100*i,
                y: yCoord1+y,
                width: 100,
                height: height,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2,
                id: 'grid-'+i+'-'+j
            });
            layer.add(gridObjs[i][j]);
            stage.add(layer);
            if(j==0){
                gridObjs[i][j].on('mouseup', function(){
                    demandTrigger(this.id());
                })  ;
            } else if (j==10) {
                gridObjs[i][j].on('mouseup', function(){
                    rmTrigger(this.id());
                })  ;
            } else {
                gridObjs[i][j].on('mouseup', function(){
                    wsTrigger(this.id());
                })  ;
            }
        }
    }
}

grid2 = function () {
    var i=0,j=0;
    var gridComp;
    var height,y;
    for(i=0;i<8;i++){
        gridObjs2.push(new Array());
        flags2.push(new Array());
        for(j=0;j<11;j++){
            if(j==0||j==10){height=40;} else {height=65;}
            if(j==1){y=40;} else if(j==0){y=0;} else {y=40+65*(j-1);}
            gridObjs2[i].push(new Array());
            flags2[i].push(0);
            gridObjs2[i][j]=new Konva.Rect({
                x: xCoord1+100*i,
                y: yCoord1+y,
                width: 100,
                height: height,
                fill: 'rgba(0,0,0,0)',
                stroke: 'black',
                strokeWidth: 2,
                id: 'grid2-'+i+'-'+j
            });
            layer.add(gridObjs2[i][j]);
            stage.add(layer);
            if(j==0){
                gridObjs2[i][j].on('mouseup', function(){
                    demandTrigger2(this.id());
                })  ;
            } else if (j==10) {
                gridObjs2[i][j].on('mouseup', function(){
                    rmTrigger2(this.id());
                })  ;
            } else {
                gridObjs2[i][j].on('mouseup', function(){
                    wsTrigger2(this.id());
                })  ;
            }
        }
    }
}

var demandEnable=0;
var rmEnable=0;
var wsEnable=0;
demandTrigger = function(id) {
    var idSplit=id.split("-");
    var row=idSplit[1]/1;
    var col=idSplit[2]/1;
    if(demandEnable==1&&flags[row][col]==0){
        flags[row][col]=1;
        processTempObjs[row][col].push(new Demand(xCoord1+100*row+30+20,yCoord1+65*(col-1)+20+65),0);
        processTempObjs[row][col][0].insertDemand();
    }
}

rmTrigger = function(id) {
    var idSplit=id.split("-");
    var row=idSplit[1]/1;
    var col=idSplit[2]/1;
    if(rmEnable==1&&flags[row][col]==0){
        flags[row][col]=1;
        processTempObjs[row][col].push(new RM(xCoord1+100*row+30+20,yCoord1+40+65*(col-1)+20));
        processTempObjs[row][col][0].insertRM();
    }
}

wsTrigger = function(id) {
    var idSplit=id.split("-");
    var row=idSplit[1]/1;
    var col=idSplit[2]/1;
    if(wsEnable==1&&flags[row][col]==0){
        flags[row][col]=1;
        processTempObjs[row][col].push(new WS(xCoord1+100*row+30+20,yCoord1+40+65*(col-1)+20+25,'blue'));
        processTempObjs[row][col].push(new Buffer(xCoord1+100*row+20,yCoord1+40+65*(col-1)));
        console.log(processTempObjs[row][col]);
        processTempObjs[row][col][0].insertWS();
        processTempObjs[row][col][1].insertBuffer();
    }
}

demandTrigger2 = function(id) {
    var idSplit=id.split("-");
    var row=idSplit[1]/1;
    var col=idSplit[2]/1;
    console.log('triggered');
}

rmTrigger2 = function(id) {
    var idSplit=id.split("-");
    var row=idSplit[1]/1;
    var col=idSplit[2]/1;
    console.log('triggered');
}

var WS1;
var WS1row=0;WS1col=0;
var oneSelectedFlag=0;
// wsTrigger2 = function(id) {
//     var idSplit=id.split("-");
//     var row=idSplit[1]/1;
//     var col=idSplit[2]/1;
//     WS1=id;
//     if(oneSelectedFlag==0){
//         oneSelectedFlag=1;
//         WS1row=row;
//         WS1col=col;
//         console.log(WS1row,WS1col);
//     } else {
//         if(WS1row!=row&&WS1col>col) {
//             oneSelectedFlag=0;
//             if(row>WS1row){
//                 processTempObjs[WS1row][WS1col].push(new Arrow(xCoord1+100*WS1row+20+30,yCoord1+40+65*(WS1col-1),xCoord1+100*row+20,yCoord1+40+65*(col-1)+45));
//             } else {
//                 processTempObjs[WS1row][WS1col].push(new Arrow(xCoord1+100*WS1row+20+30,yCoord1+40+65*(WS1col-1),xCoord1+100*row+20+60,yCoord1+40+65*(col-1)+45));
//             }
//             processTempObjs[WS1row][WS1col][2].insertArrow();
//         }
//     }
//     console.log('triggered');

// }