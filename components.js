var globalClock = 0; //in seconds
var speed = 10;
var clockOn = false;
var globalInterval;
wsEditable = true;
counter1 = 0;
var clockSwitch = function () {
    if (clockOn == false) {
        clockOn = true;
        globalInterval = setInterval(runSimulation, 200);
    } else {
        clearInterval(globalInterval);
        clockOn = false;
    }
}

var runSimulation = function () {
    globalClock += (speed / 5);

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 9; j++) {
            if (j == 8) {
                //do demand stuff
            }
            else if (j == 0) {
                //do RM stuff
            } else {
                if (processObjs[i][j].length > 0)
                    processObjs[i][j][0].WSStatusRefresh();
            }
        }
    }
}

var colorTextMap = {
    "blue": "white",
    "red": "white",
    "cyan": "black",
    "pink": "black",
    "brown": "black",
    "green": "black",
    "grey": "black"
};

var colourTextMap = {
    "blue": "white",
    "red": "white",
    "cyan": "black",
    "pink": "black",
    "brown": "black",
    "green": "black",
    "grey": "black"
};

var DemandCounter = 0;
var ArrowCounter = 0;
var RMCounter = 0;
var WSCounter = 0;
var BufferCounter = 0;
var WSSidebarCounter = 0;


Demand = function (x, y, Count) {

    DemandCounter += 1;
    var Demandid = DemandCounter;
    //inserts RM module at position x,y
    var DemandComp = new Konva.Ellipse({
        x: x,
        y: y,
        radiusX: 20,
        radiusY: 15,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
        id: 'Demand' + Demandid
    });
    this.insertDemand = function () {
        layer.add(DemandComp);
        layer.add(DemandText);
        stage.add(layer);
    }

    // DemandComp.on('mouseup', function(){
    // 	alert("insert Demand props");
    // })  ;  		
    var DemandText = new Konva.Text({
        x: x - 30,
        y: y - 5,
        text:
            "0",
        fontSize: 12,
        fontFamily: 'Arial',
        width: 60,
        //padding: 20,
        align: 'center',
        id: 'DemandText' + Demandid
    });
    this.updateDemandText = function (newText) {
        var text = layer.find('#DemandText' + Demandid)[0];
        text.setAttr('text', newText);
        layer.draw();
    }
}

RM = function (x, y) {

    RMCounter += 1;
    var RMid = RMCounter;
    //inserts RM module at position x,y
    var RMComp = new Konva.Ellipse({
        x: x,
        y: y,
        radiusX: 20,
        radiusY: 15,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
        id: 'RM' + RMid
    });
    this.insertRM = function () {
        layer.add(RMComp);
        layer.add(RMText);
        stage.add(layer);
    }
    // RMComp.on('mouseup', function(){
    // 	alert("insert RM props");
    // })  ;  		
    var RMText = new Konva.Text({
        x: x - 30,
        y: y - 5,
        text:
            "0",
        fontSize: 12,
        fontFamily: 'Arial',
        width: 60,
        //padding: 20,
        align: 'center',
        id: 'RMText' + RMid
    });
    this.updateRMText = function (newText) {
        var text = layer.find('#RMText' + RMid)[0];
        text.setAttr('text', newText);
        layer.draw();
    }
}

Arrow = function (x1, y1, x2, y2) {
    //insert arrow module between position x1,y1 and x2,y2
    ArrowCounter += 1;
    var Arrowid = ArrowCounter;
    var ArrowComp = new Konva.Arrow({
        points: [x1, y1, x2, y2],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
        id: 'Arrow' + x1 + '-' + y1 + '-' + x2 + '-' + y2 + ''
    });
    this.insertArrow = function () {
        layer.add(ArrowComp);
        stage.add(layer);
    }
    // ArrowComp.on('mouseup', function(){
    // 	alert("insert Arrow props");
    // })  ;
    this.updateArrow = function (x1, y1, x2, y2) {
        var temp = layer.find('#Arrow' + x1 + '-' + y1 + '-' + x2 + '-' + y2 + '')[0];
        var temp2 = [x1, y1, x2, y2];
        temp.setAttr('points', temp2);
        layer.draw();

    }
}
altColourList = { 'blue': 'rgba(0,0,255,0.5)', 'red': 'rgba(255,0,0,0.5)', 'cyan': 'rgba(0,255,255,0.5)', 'pink': 'rgba(255,192,203,0.5)', 'brown': 'rgba(165,42,42,0.5)', 'green': 'rgba(0,255,0,0.5)', 'gray': 'rgba(127,127,127,0.5)' };

currWSBeingEditedx = 0;
currWSBeingEditedy = 0;
WS = function (x, y, fillColor, distrib, mean, sd, pos_x, pos_y, prevArray, nextArray) {
    //properties
    this.active = true;
    var processingTime = 0;
    this.machineCount = 0;
    this.distrib = distrib;
    this.mean = mean;
    this.sd = sd;
    this.internalClock = 0; // in seconds
    this.currentProcessingTime = 0;
    this.nextIDs = [];
    this.fillColor = fillColor;
    this.colour = fillColor;
    this.prevIDs = [];
    this.overlayArr = [];
    this.running = function () {
        
        var text = layer.find('#WSText' + WSid)[0];
        var tempRunning = layer.find('#WS' + WSid)[0];
        for (ol of this.overlayArr) layer.find('#ol' + ol)?.[0]?.remove();
        let imgObj = imageObjbrown;
        if (this.colour == 'blue') imgObj = imageObjeblue;
        if (this.colour == 'brown') imgObj = imageObjebrown;
        if (this.colour == 'cyan') imgObj = imageObjecyan;
        if (this.colour == 'green') imgObj = imageObjegreen;
        if (this.colour == 'pink') imgObj = imageObjepink;
        if (this.colour == 'red') imgObj = imageObjered;
        if (this.colour == 'grey') imgObj = imageObjegrey;
        let kimg = new Konva.Image({
            x: tempRunning?.x()-26,
            y: tempRunning?.y()-15,
            image: imgObj,
            width: tempRunning?.width()*1.32,
            height: tempRunning?.height()*1.76,
            id: 'ol' + counter1
        });
        tempRunning.setAttr('fill', 'rgba(0,0,0,0)');
        layer.add(kimg);
        text.setAttr('fill', 'black');
        kimg.moveToBottom();
        this.overlayArr = [counter1];
        counter1++;
    }
    this.notRunning = function () {
        var text = layer.find('#WSText' + WSid)[0];
        for (ol of this.overlayArr) layer.find('#ol' + ol)?.[0]?.remove();
        this.overlayArr = [];
        layer.find('#WS' + WSid)[0]?.setAttr('fill',this.colour);
        text.setAttr('fill', colourTextMap[this.colour]);
    }
    this.assign = function () {
        this.machineCount++;
        var text = layer.find('#WSText' + WSid)[0];
        let txt = this.processingTime;
        if (this.machineCount) txt = "+" + txt;
        text.setAttr('text', txt);
        layer.draw();
    }

    this.deassign = function () {
        this.machineCount--;
        var text = layer.find('#WSText' + WSid)[0];
        let txt = this.processingTime;
        if (this.machineCount) txt = "+" + txt;
        text.setAttr('text', txt);
        layer.draw();
    }

    var ctr1 = 0;
    for (ctr1 = 0; ctr1 < nextArray.length; ctr1++) {
        this.nextIDs.push(nextArray[ctr1]);
    }
    for (ctr1 = 0; ctr1 < prevArray.length; ctr1++) {
        this.prevIDs.push(prevArray[ctr1]);
    }
    var returnProcessingTime = function () {
        if (distrib == 0) {
            return processingTime;
        } else if (distrib == 1) {
            return processingTime;
        } else {
            return processingTime;
        }
    }
    this.resetClock = function () {
        this.internalClock = 0;
        this.currentProcessingTime = returnProcessingTime();
    }
    this.WSStatusRefresh = function () {
        if (this.active) {
            this.internalClock += (0.2 / 60);
            if (this.internalClock >= this.currentProcessingTime) {
                this.resetClock();
                if (this.prevIDs.length == 2 && this.prevIDs[0] != -1) {
                    if (processObjs[this.prevIDs[0] - 1][this.prevIDs[1] - 1][1].bufferCurrLength > 0) {
                        processObjs[this.prevIDs[0] - 1][this.prevIDs[1] - 1][1].decrement();
                    }
                }
            }
        }
    }
    //inserts Workstation (WS) module of color fillColor at position x,y
    WSCounter += 1;
    var WSid = '' + pos_x + '-' + pos_y;
    this.WSComp = new Konva.Ellipse({
        i: pos_x,
        j: pos_y,
        x: x,
        y: y,
        radiusX: 20,
        radiusY: 15,
        fill: fillColor,
        stroke: 'black',
        strokeWidth: 2,
        id: 'WS' + WSid,
        fillColor: fillColor,
        resourceX: -1,
        resourceY: -1
    });
    this.insertWS = function () {
        layer.add(this.WSComp);
        layer.add(WSText);
        stage.add(layer);
    }
    // this.WSComp.on('mouseup', function(){

    // })  ;  	
    var WSText = new Konva.Text({
        x: x - 30,
        y: y - 5,
        text:
            "0",
        fontSize: 12,
        fontFamily: 'Arial',
        width: 60,
        //padding: 20,
        align: 'center',
        fill: colorTextMap[fillColor],
        id: 'WSText' + WSid
    });
    this.updateWSText = function (newText) {
        this.processingTime = newText / 1;
        var text = layer.find('#WSText' + WSid)[0];
        text.setAttr('text', newText);
        layer.draw();
    }
}

removeWS = function (x, y) {
    var shape = stage.find('#WS' + x + '-' + y)[0];
    var text = stage.find('#WSText' + x + '-' + y)[0];
    shape.remove();
    text.remove();
    layer.draw();
}

removeBuffer = function (x, y) {
    var shape = stage.find('#Buffer' + x + '-' + y)[0];
    var text = stage.find('#BufferText' + x + '-' + y)[0];
    shape.remove();
    text.remove();
    layer.draw();
}

removeRM = function (x, y, id) {
    var shape = stage.find('#RM' + id)[0];
    var text = stage.find('#RMText' + id)[0];
    shape.remove();
    text.remove();
    layer.draw();
}

removeDemand = function (x, y, id) {
    var shape = stage.find('#Demand' + id)[0];
    var text = stage.find('#DemandText' + id)[0];
    shape.remove();
    text.remove();
    layer.draw();
}

Buffer = function (x, y, pos_x, pos_y, prevArray, nextArray) {
    //properties
    this.bufferCurrLength = 0;
    this.id_x = pos_x;
    this.id_y = pos_y;
    //inserts Buffer module at position x,y
    BufferCounter += 1;
    var Bufferid = '' + pos_x + '-' + pos_y;
    var BufferComp = new Konva.Rect({
        x: x,
        y: y,
        width: 40,
        height: 20,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2,
        id: 'Buffer' + Bufferid
    });
    this.insertBuffer = function () {
        layer.add(BufferComp);
        layer.add(BufferText);
        stage.add(layer);
    }
    // BufferComp.on('mouseup', function(){
    // 	alert("insert Buffer props");
    // })  ;  	
    var BufferText = new Konva.Text({
        x: x,
        y: y + 5,
        text:
            "0",
        fontSize: 12,
        fontFamily: 'Arial',
        width: 40,
        //padding: 20,
        align: 'center',
        id: 'BufferText' + Bufferid
    });
    this.updateBufferText = function (newText) {
        var text = layer.find('#BufferText' + Bufferid)[0];
        text.setAttr('text', newText);
        layer.draw();
        this.bufferCurrLength = newText / 1;
    }
    this.decrement = function () {
        this.bufferCurrLength -= 1;
        this.updateBufferText(this.bufferCurrLength);
    }
}

WSSidebar = function (x, y, fillColor) {
    //inserts WS in the sidebar at position x,y
    WSSidebarCounter += 1;
    var WSSidebarid = WSSidebarCounter;
    var WSSidebarComp = new Konva.Rect({
        x: x,
        y: y,
        width: 60,
        height: 60,
        fill: fillColor,
        stroke: 'black',
        strokeWidth: 2
    });
    this.insertWSSidebar = function () {
        layer.add(WSSidebarComp);
        layer.add(WSSidebarText);
        stage.add(layer);
    }
    // WSSidebarComp.on('mouseup', function(){
    // 	alert("insert WSSidebar props");
    // })  ;  	
    var WSSidebarText = new Konva.Text({
        x: x,
        y: y + 40,
        text:
            "idle",
        fontSize: 15,
        fontFamily: 'Arial',
        width: 60,
        //padding: 20,
        align: 'center',
        fill: colorTextMap[fillColor],
        id: 'WSSidebarText' + WSSidebarid
    });
    this.updateWSSidebarText = function (newText) {
        var text = layer.find('#WSSidebarText' + WSSidebarid)[0];
        text.setAttr('text', newText);
        layer.draw();
    }
}


Resource = function (setupConfiguration) {
    this.status = 0;
    //status can be 0: idle, 1: setup, 2: prod
    this.ResourceComp = new Konva.Rect({
        x: setupConfiguration.x,
        y: setupConfiguration.y,
        width: 50,
        height: 50,
        fill: setupConfiguration.colour,
        stroke: setupConfiguration.stroke,
        strokeWidth: 2,
        id: setupConfiguration.id
    });
    this.overlayArr = [];
    this.colour = setupConfiguration.colour;
    var ResourceCompText = new Konva.Text({
        x: setupConfiguration.x,
        y: setupConfiguration.y + 10,
        text:
            "--",
        fontSize: 15,
        fontFamily: 'Arial',
        width: 50,
        //padding: 20,
        align: 'center',
        fill: colorTextMap[setupConfiguration.colour],
        id: 'ResourceText' + setupConfiguration.id
    });

    var ResourceCompStatusText = new Konva.Text({
        x: setupConfiguration.x,
        y: setupConfiguration.y + 30,
        text:
            "idle",
        fontSize: 12,
        fontFamily: 'Arial',
        width: 50,
        //padding: 20,
        align: 'center',
        fill: colorTextMap[setupConfiguration.colour],
        id: 'ResourceStatusText' + setupConfiguration.id
    });

    layer.add(this.ResourceComp);
    layer.add(ResourceCompText);
    layer.add(ResourceCompStatusText);
    stage.add(layer);
    this.updateResourceText = function (newText) {
        var text = layer.find('#ResourceText' + setupConfiguration.id)[0];
        text.setAttr('text', newText);
        layer.draw();
    }
    this.updateResourceStatusText = function (newText, resComp, x = 0, y = 0, w = 0, h = 0) {
        var text = layer.find('#ResourceStatusText' + setupConfiguration.id)[0];
        var positionText = layer.find('#ResourceText' + setupConfiguration.id)[0];
        if (newText == 'prod') {
            for (ol of this.overlayArr) layer.find('#ol' + ol)?.[0]?.remove();
            let imgObj = imageObjbrown;
            if (this.colour == 'blue') imgObj = imageObjblue;
            if (this.colour == 'brown') imgObj = imageObjbrown;
            if (this.colour == 'cyan') imgObj = imageObjcyan;
            if (this.colour == 'green') imgObj = imageObjgreen;
            if (this.colour == 'pink') imgObj = imageObjpink;
            if (this.colour == 'red') imgObj = imageObjred;
            if (this.colour == 'grey') imgObj = imageObjgrey;
            let kimg = new Konva.Image({
                x: x + 1,
                y: y + 1,
                image: imgObj,
                width: w - 2,
                height: h - 2,
                id: 'ol' + counter1
            });
            resComp?.fill('rgba(0,0,0,0)');
            layer.add(kimg);
            text.setAttr('fill', 'black');
            positionText.setAttr('fill', 'black');
            kimg.moveToBottom();
            this.overlayArr = [counter1];
            counter1++;
        }
        else {
            for (ol of this.overlayArr) layer.find('#ol' + ol)?.[0]?.remove();
            this.overlayArr = [];
            resComp?.fill(this.colour);
            text.setAttr('fill', colourTextMap[this.colour]);
            positionText.setAttr('fill', colourTextMap[this.colour]);
        }
        text.setAttr('text', newText);
        layer.draw();
    }
}



ResourceAura = function (setupConfiguration) {
    this.status = 0;
    //status can be 0: idle, 1: setup, 2: prod
    this.ResourceComp = new Konva.Rect({
        i: setupConfiguration.i,
        j: setupConfiguration.j,
        original_x: setupConfiguration.x,
        original_y: setupConfiguration.y,
        assignedToX: -1,
        assignedToY: -1,
        x: setupConfiguration.x,
        y: setupConfiguration.y,
        width: 50,
        height: 50,
        fill: 'black',
        strokeWidth: 2,
        opacity: 0,
        id: 'aura' + setupConfiguration.id,
        draggable: true,
        type: setupConfiguration.type
    });
    this.type = setupConfiguration.type;
    this.ResourceComp.on('dragstart', function () {
        wsEditable = false;
        var temp = layer.find('#aura' + setupConfiguration.id)[0];
        temp.setAttr('opacity', 0.5);
        temp.setAttr('width', 20);
        temp.setAttr('height', 20);
        var x = stage.getPointerPosition();
        temp.setAttr('x', x.x);
        temp.setAttr('y', x.y);
        layer.draw();
    })
    this.ResourceComp.on('dragmove', function () {
        var cursor = stage.getPointerPosition();
        var temp = layer.find('#aura' + setupConfiguration.id)[0];
        temp.setAttr('x', cursor.x);
        temp.setAttr('y', cursor.y);
    })
    this.ResourceComp.on('dragend', function () {
        var cursor = stage.getPointerPosition();
        checkWhichBox(cursor, this);
    })

    layer.add(this.ResourceComp);

    stage.add(layer);

}