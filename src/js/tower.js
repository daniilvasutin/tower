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

/** ----------------------------Towers var--------------------------------*/

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
}
startGame();
/* ------------------------------------------------------------------------*/


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Tower processing---------------------------*/
function afterBgCreating() { //run, after background is creating
    stage.add(bgLayer);
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



