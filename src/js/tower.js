/** ----------------------------Game var--------------------------------*/
var images = {};
var sources = {
    bg_sprite: "../images/sprite_bg1.png",
    monsterImg: "../images/monster.png",
    flameTowerIco: "../images/flame_tower_ico.png",
    frostTowerIco: "../images/frost_tower_ico.png",
    flameTower: "../images/flame_tower.png",
    frostTower: "../images/frost_tower.png"
};
for(var src in sources) {
    images[src] = new Image();
    images[src].src = sources[src];
}
/* -----------------------------------------------------------------------*/

/** ----------------------------Map var------------------------------------*/
var backgroundImageArray = new Array(); //background by tiles
var cellSize = 32; //size of tile in background
var widthCellCount = 15; //canvas width in cells
var heightCellCount = 10; //canvas height in cells
var busyCells = new Array(); //busy cells in map
var pathCells = new Array()  //path cells in map

var map1 = //Map by two-dimensional array
    [
        [{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1}], // 1ый ряд
        [{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1}], // 2ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 3ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1}], // 4ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 5ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1}], // 6ый ряд
        [{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 7ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}],  // 8ый ряд
        [{x:1,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // row 9
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}] // row 10
    ];
/* ------------------------------------------------------------------------*/

/** ----------------------------Monster var--------------------------------*/
var monsterArray = new Array();
var monsterTweenArray = new Array();
var direction = new Array();
var animations = {
    goRight: [{x:0,y:130,width:47,height:60},{x:47,y:130,width:47,height:60},{x:96,y:130,width:44,height:60},{x:143,y:130,width:48,height:60}],
    goTop:   [{x:0,y:195,width:45,height:60},{x:45,y:195,width:47,height:60},{x:95,y:195,width:47,height:60},{x:145,y:195,width:46,height:60}],
    goBottom:[{x:0,y:0,width:45,height:60},{x:45,y:0,width:47,height:60},{x:95,y:0,width:47,height:60},{x:145,y:0,width:46,height: 60}],
    goLeft:  [{x:0,y:65,width:50,height:60},{x:50,y:65,width:50,height:60},{x:100,y:65,width:47,height:60},{x:147,y:65,width:50,height:60}]
};
/* ------------------------------------------------------------------------*/

/** ----------------------------Towers var--------------------------------*/
var towerType; //stores the type of tower build
var towersArray = new Array(); //tower objects array
var isBuildingNow = false; //is the tower now under construction?


var beingConstructedTower = new Kinetic.Image({ //building tower image
    x: 0,
    y: 0,
    image: images.flameTower,
    width: 20,
    height: 60,
    visible: false
});
/* ------------------------------------------------------------------------*/

/** ----------------------------Need for run the game----------------------*/
var stage = new Kinetic.Stage({
    container: 'container',
    width: widthCellCount*cellSize,
    height: heightCellCount*cellSize
});

var bgLayer = new Kinetic.Layer();

function startGame(){
    buildBackground(map1);
    afterBgCreating();
    createMonsters();
}
startGame();
/* ------------------------------------------------------------------------*/


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Tower processing---------------------------*/
function afterBgCreating() { //run, after background is creating
    buildTowersMenu();
    bgLayer.add(beingConstructedRect);
    stage.add(bgLayer);
}

function buildTowersMenu() { //draw menu with towers
    var frostTowerButton = new Kinetic.Image({
        x: 12*cellSize,
        y: 9*cellSize,
        image: images.frostTowerIco,
        width: cellSize,
        height: cellSize
    });
    var flameTowerButton = new Kinetic.Image({
        x: 13*cellSize,
        y: 9*cellSize,
        image: images.flameTowerIco,
        width: cellSize,
        height: cellSize
    });

    bgLayer.add(frostTowerButton);
    bgLayer.add(flameTowerButton);

    /* Towers menu events */
    frostTowerButton.on('mousedown',  function() {
        isBuildingNow = true;
    });
    frostTowerButton.on('mouseover',  function() {

    });
    flameTowerButton.on('mousedown',  function() {
        isBuildingNow = true;
    });
}


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Monster processing-------------------------*/
function createMonsters(){
    for (var i=0; i < 10; i++) {
        var monster = new Kinetic.Sprite({
            x: pathCells[0].j * cellSize,
            y: (pathCells[0].i-1) * cellSize,
            image: images.monsterImg,
            animation: 'goRight',
            animations: animations,
            frameRate: 6,
            index: 0,
            visible: false
        });
        monsterArray.push(monster);
        bgLayer.add(monster);
        monster.start();
    }
}




/***************************************************************************/
/***************************************************************************/
/** ----------------------------Map processing-----------------------------*/
function buildBackground(map) {
    for (var i = 0; i < heightCellCount; i++) {
        for (var j = 0; j < widthCellCount; j++) {
            var tile = new Kinetic.Image({
                x: j*cellSize,
                y: i*cellSize,
                image: images.bg_sprite,
                width: cellSize,
                height: cellSize,
                crop: [(map[i][j].x-1)*cellSize, (map[i][j].y-1)*cellSize, cellSize, cellSize]
            });
            backgroundImageArray.push(tile);

            if (map[i][j].x-1 == 2 || map[i][j].x-1 == 3 || map[i][j].x-1 == 4) { //define the occupied space
                busyCells.push({x: j, y: i});
            }
        }
    }
    // add tiles to the layer
    for (var i=0; i < backgroundImageArray.length; i++) {
        bgLayer.add(backgroundImageArray[i]);
    }
    stage.add(bgLayer);
}

/* Events */
bgLayer.on('mousemove', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x/cellSize);
    var mouseY = parseInt(mousePos.y/cellSize);
    if (isBuildingNow) {
        for (var i = 0; i < busyCells.length; i++) {
            if ((busyCells[i].x != mouseX) || (busyCells[i].y != mouseY)) {
                beingConstructedRect.setAttrs({
                    x: mouseX * cellSize,
                    y: mouseY * cellSize,
                    fill: "green",
                    visible: true
                });
                beingConstructedTower.setAttrs({
                    x: mouseX * cellSize + 5,
                    y: (mouseY-1) * cellSize,
                    visible: true
                });
            } else {
                beingConstructedRect.setAttrs({
                    x: mouseX * cellSize,
                    y: mouseY * cellSize,
                    fill: "red"
                });
                break;
            }
        }
    }
    bgLayer.draw();
});

