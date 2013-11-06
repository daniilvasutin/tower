/** ----------------------------Game var--------------------------------*/
var images = {};
var sources = {
    bgSprite: "../images/sprite_bg.jpg",
    rightPanel: "../images/panel.jpg",
    monsterImg: "../images/monster.png",
    towerFoundationIco: "../images/tower_foundation_ico.jpg",
    puddleBlueIco: "../images/puddle_blue_ico.jpg",
    puddleGreenIco: "../images/puddle_green_ico.jpg",
    crystalGreenIco: "../images/crystal_green_ico.jpg",
    crystalBlueIco: "../images/crystal_blue_ico.jpg",
    crystalRedIco: "../images/crystal_red_ico.jpg",
    redCrystal: "../images/red_crystal.png",
    blueCrystal: "../images/blue_crystal.png",
    greenCrystal: "../images/green_crystal.png",
    towerFoundation: "../images/tower_foundation.png",
    enemyBase: "../images/enemy_home.png",
    ourBase: "../images/our_home.png"
};

for(var src in sources) {
    images[src] = new Image();
    images[src].src = sources[src];
}
/* -----------------------------------------------------------------------*/

/** ----------------------------Map var------------------------------------*/
var backgroundImageArray = new Array(); //background by tiles
var cellSize = 32; //size of tile in background
var widthCellCount = 21; //canvas width in cells + 4 for panel
var heightCellCount = 15; //canvas height in cells
var busyCells = new Array(); //busy cells in map
var pathCells = new Array();  //path cells in map

var map1 = //Map by two-dimensional array
        [         //0                           1                           2                             3                           4                           5                            6                           7                             8                          9                            10                            11                          12                         13                           14                             15                          16                            17                      18                      19                      20
        [{x:2,y:2,busy:0,TileType:0},{x:7,y:2,busy:1,TileType:2}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:9,y:2,busy:1,TileType:10},{x:7,y:3,busy:1,TileType:5}, {x:7,y:1,busy:1,TileType:9}, {x:7,y:2,busy:1,TileType:2},{x:7,y:1,busy:1,TileType:9},{x:7,y:3,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:10,y:1,busy:1,TileType:5},{x:11,y:1,busy:1,TileType:5},{x:12,y:1,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0}], // 1 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:9,y:4,busy:1,TileType:8}, {x:10,y:4,busy:1,TileType:8},{x:7,y:2,busy:1,TileType:2}, {x:7,y:2,busy:1,TileType:2}, {x:7,y:3,busy:1,TileType:5},{x:7,y:2,busy:1,TileType:2},{x:7,y:2,busy:1,TileType:2},{x:7,y:1,busy:1,TileType:9},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:10,y:2,busy:1,TileType:5},{x:11,y:2,busy:1,TileType:5},{x:12,y:2,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0}], // 2 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:9,y:5,busy:1,TileType:8}, {x:10,y:5,busy:1,TileType:8},{x:2,y:2,busy:0,TileType:0}, {x:7,y:1,busy:1,TileType:9}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:10,y:3,busy:1,TileType:5},{x:11,y:3,busy:1,TileType:5},{x:12,y:3,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0}], //3 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6}, {x:3,y:1,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},  {x:2,y:1,busy:1,TileType:6},  {x:2,y:1,busy:1,TileType:6},{x:3,y:1,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //4 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //5 row
        [{x:2,y:2,busy:0,TileType:0},{x:8,y:3,busy:1,TileType:3}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:8,y:2,busy:1,TileType:12},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:5,y:4,busy:1,TileType:11}, {x:6,y:4,busy:1,TileType:11}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //6 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:8,y:3,busy:1,TileType:3},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:7,y:2,busy:1,TileType:2}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:5,y:5,busy:1,TileType:11}, {x:6,y:5,busy:1,TileType:11}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //7 row
        [{x:1,y:4,busy:1,TileType:1},{x:2,y:4,busy:1,TileType:1}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:8,y:3,busy:1,TileType:3},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //8 row
        [{x:1,y:5,busy:1,TileType:1},{x:2,y:5,busy:1,TileType:1}, {x:2,y:2,busy:0,TileType:0}, {x:1,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6}, {x:3,y:3,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:9,y:2,busy:1,TileType:10},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //9 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:5,y:4,busy:1,TileType:11},{x:6,y:4,busy:1,TileType:11},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:11,y:4,busy:1,TileType:13},{x:12,y:4,busy:1,TileType:13},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //10 row
        [{x:2,y:2,busy:0,TileType:0},{x:8,y:3,busy:1,TileType:3}, {x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:5,y:5,busy:1,TileType:11},{x:6,y:5,busy:1,TileType:11},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:11,y:5,busy:1,TileType:13},{x:12,y:5,busy:1,TileType:13},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //11 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:1,y:3,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6},{x:3,y:3,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //12 row
        [{x:2,y:2,busy:0,TileType:0},{x:10,y:1,busy:1,TileType:4},{x:11,y:1,busy:1,TileType:4},{x:12,y:1,busy:1,TileType:4},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //13 row
        [{x:2,y:2,busy:0,TileType:0},{x:10,y:2,busy:1,TileType:4},{x:11,y:2,busy:1,TileType:4},{x:12,y:2,busy:1,TileType:4},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:7,y:3,busy:1,TileType:5},{x:7,y:1,busy:1,TileType:9}, {x:7,y:2,busy:1,TileType:2}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:7,y:2,busy:1,TileType:2},{x:2,y:2,busy:0,TileType:0},{x:1,y:4,busy:1,TileType:1},{x:2,y:4,busy:1,TileType:1},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //14 row
        [{x:2,y:2,busy:0,TileType:0},{x:10,y:3,busy:1,TileType:4},{x:11,y:3,busy:1,TileType:4},{x:12,y:3,busy:1,TileType:4},{x:7,y:3,busy:1,TileType:5},{x:7,y:2,busy:1,TileType:2},{x:9,y:3,busy:1,TileType:7},{x:9,y:2,busy:1,TileType:10},{x:8,y:2,busy:1,TileType:12},{x:7,y:1,busy:1,TileType:9}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:1,y:5,busy:1,TileType:1},{x:2,y:5,busy:1,TileType:1},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}] //15 row
    ];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  //17F
var mapBeginCell1 = {i: 3, j: 5};
var mapEndCell1 = {i: 11, j: 17};
/* ------------------------------------------------------------------------*/

/** ----------------------------Towers var--------------------------------*/
function Tower(image, x, y, type, damage, cost, radius, width, height) {
    this.type = type;
    this.damage = damage;
    this.level = 1;
    this.radius = radius || 50;
    this.cost = cost;
    this.image = new Kinetic.Image({
        x: x,
        y: y,
        image: image,
        width: width || cellSize,
        height: height || cellSize
    });
    if (type != 'foundation') {
        this.bullet = new Kinetic.Circle({
            x: x+5,
            y: y+3,
            fill: 'black',
            width: 5,
            height: 5,
            visible: false
        });
        towersLayer.add(this.bullet);
    }
    towersLayer.add(this.image);
    towersLayer.draw();
}

var towerType; //stores the type of tower build
var towersArray = new Array(); //tower objects array
var isBuildingFoundation = false; //is the tower foundation now under construction?
var isBuildingCrystal = false; //is the crystal now under construction?
var towerFoundationCost = 10;
var blueCrystalCost = 15; //cost of crystal
var redCrystalCost = 20;
var greenCrystalCost = 25;

var beingConstructedRect = new Kinetic.Rect({ //rectangle of building tower
    x: 0,
    y: 0,
    width: cellSize,
    height: cellSize,
    fill: 'green',
    stroke: 'black',
    opacity: 0.5,
    strokeWidth: 2,
    visible: false
});
var beingConstructedTower = new Kinetic.Image({ //building tower image
    x: 0,
    y: 0,
    image: images.towerFoundation,
    width: cellSize+8,
    height: cellSize+8,
    visible: false
});
var beingConstructedCrystal = new Kinetic.Image({ //building crystal image
    x: 0,
    y: 0,
    image: images.redCrystal,
    width: cellSize,
    height: cellSize,
    visible: false
});
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

/**-----------------------Counters vars-------------------------------------*/
var goldCounter = 100;
var mobsPassedCounter = 0;
/*--------------------------------------------------------------------------*/

/**-----------------------------Text vars-----------------------------*/
var rightPanel = new Kinetic.Image({
    x: 21*cellSize,
    y: 0,
    image: images.rightPanel,
    width: 128,
    height: 480
});
var goldDisplay = new Kinetic.Text({
    x: 23*cellSize-5,
    y: 2*cellSize+10,
    text: '100',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var healthPoints = new Kinetic.Text({
    x: 22*cellSize+12,
    y: cellSize+8,
    text: '20',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var waveNumber = new Kinetic.Text({
    x: 23 * cellSize,
    y: cellSize + 8,
    text: '1/20',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var errorMessage = new Kinetic.Text({
    x: 8 * cellSize,
    y: cellSize + 8,
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'yellow'
});
/*-------------------------------------------------------------------------*/

/** ----------------------------Need for run the game----------------------*/
var stage = new Kinetic.Stage({
    container: 'container',
    width: (widthCellCount+4)*cellSize,
    height: heightCellCount*cellSize
});

var bgLayer = new Kinetic.Layer();
var rightPanelLayer = new Kinetic.Layer();
var towersLayer = new Kinetic.Layer();

function playBackgroundMusic(){
    var audio1 = document.getElementById('aTsIwR');
    audio1.volume = 0.2;
    audio1.play();
}

function startGame(){
   buildBackground(map1);
    findPath(map1,mapBeginCell1,mapEndCell1);

    afterBgCreating();
    createMonsters();
    createMonstersTweens();
    monstersMove();
    setTimeout(afterBgCreating, 50);
    playBackgroundMusic();
    setTimeout(function(){playSprite('monsterA');},3000);
    setTimeout(function(){playSprite('monsterHa');},25000);
}
startGame();
/* ------------------------------------------------------------------------*/



/***************************************************************************/
/** ----------------------------Monster processing-------------------------*/
function Monster (image, x, y, type, hp, name, moveSpeed,frameRate,animations, opacity) {
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.type = type;
    this.hp = hp;
    this.name = name;
    this.image = image;
    this.animations = animations;
    this.frameRate = frameRate;
    this.moveSpeed = moveSpeed;
    this.sprite = new Kinetic.Sprite({
        x: this.x,
        y: this.y,
        image: this.image,
        animation: 'goRight',
        animations: this.animations,
        frameRate: this.frameRate,
        index: 0,
        opacity:this.opacity
    });

    bgLayer.add(this.sprite);
    this.sprite.start();
    bgLayer.draw();
}

function createMonsters(){
    for (var i=0; i < 10; i++) {
        var monster = new Monster(images.monsterImg, pathCells[0].j * cellSize, (pathCells[0].i-1) * cellSize, "notype", 100, "EpicTerribleMouse", 0.5, 6,animations, 0.001);
        monsterArray.push(monster);
//        bgLayer.add(monster);
//        monster.start();
    }
}

function createMonstersTweens(){
    for (var i=0; i < 10; i++) {
        var monsterTween = createMonsterTween(i);
        monsterTweenArray.push(monsterTween);
    }
}

function createMonsterTween(currentMonster){
    var tween = new Kinetic.Tween({
        node: monsterArray[currentMonster].sprite,
        duration: monsterArray[currentMonster].moveSpeed,
        opacity: monsterArray[currentMonster].opacity,
        x: monsterArray[currentMonster].x,
        y: monsterArray[currentMonster].y,
        onFinish: function(){
            monsterArray[currentMonster].sprite.setAnimation(direction[0]);
            monsterStepToNextCell(1, currentMonster, 0);
        }
    });
    return tween;
}

function monsterStepToNextCell(currentStep, currentMonster,aOpacity){
    var i = currentStep;
    new Kinetic.Tween({
        node: monsterArray[currentMonster].sprite,
        duration: monsterArray[currentMonster].moveSpeed,
        opacity: aOpacity,
        x: pathCells[i].j * cellSize,
        y: (pathCells[i].i-1) * cellSize,
        onFinish: function(){
            if(i < pathCells.length-1){
                if(direction[i] !== direction[i+1]){
                    monsterArray[currentMonster].sprite.setAnimation(direction[i+1]);
                }
                if(direction[i] === "goBottom"){
                    console.log(currentMonster,i, direction[i]);
                    monsterArray[currentMonster].sprite.moveUp();
                }
                aOpacity = 1;
                if(i >= pathCells.length-3){
                    aOpacity = 0;
                    if(i == pathCells.length-2){
                        monsterArray[currentMonster].sprite.stop();
                    }
                }

                i++;
                monsterStepToNextCell(i,currentMonster,aOpacity);
            }
        }
    }).play();
}

function monstersMove(currentMonsterTween){
    var currentMonsterTween = currentMonsterTween || 0;
//    monsterArray[currentMonsterTween].show();
    monsterTweenArray[currentMonsterTween].play();
    currentMonsterTween++;
    if(currentMonsterTween < monsterArray.length) setTimeout(function(){monstersMove(currentMonsterTween)}, 1000);
}
/* -----------------------------Monster processing-------------------------*/




/***************************************************************************/
/** ----------------------------Tower processing---------------------------*/
function afterBgCreating() { //run, after background is creating
    bgLayer.add(beingConstructedRect);
    bgLayer.add(beingConstructedTower);
    bgLayer.add(beingConstructedCrystal);
    rightPanelLayer.add(rightPanel); 
    rightPanelLayer.add(goldDisplay);
    rightPanelLayer.add(healthPoints);
    rightPanelLayer.add(waveNumber);
    rightPanelLayer.add(errorMessage);

    buildTowersMenu();
    buildBases();
    
    stage.add(bgLayer);
    stage.add(rightPanelLayer);
    stage.add(towersLayer);
    //setInterval(shoot, 100);
}

/*function shoot() {
    for (var i = 0; i < towersArray.length; i++) {
        towersArray[i].bullet.show();
        towersArray[i].bulletTween.play();
    }
}*/

/**---------------------------Events---------------------------------------*/
bgLayer.on('mousemove', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x/cellSize);
    var mouseY = parseInt(mousePos.y/cellSize);
    if (isBuildingFoundation) {
        for (var i = 0; i < busyCells.length; i++) {
            if ((busyCells[i].x != mouseX) || (busyCells[i].y != mouseY)) {
                beingConstructedRect.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    fill: "green",
                    visible: true
                });
                beingConstructedTower.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    visible: true
                });
            } else {
                beingConstructedRect.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    fill: "red"
                });
                break;
            }
        }
    }
    if (isBuildingCrystal) {
        beingConstructedCrystal.setAttrs({
            x: mouseX*cellSize,
            y: mouseY*cellSize,
            visible: true
        });
    }
    bgLayer.draw();
});
bgLayer.on('mouseup', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x / cellSize);
    var mouseY = parseInt(mousePos.y / cellSize);
    if (isBuildingFoundation) {
        if (beingConstructedRect.attrs.fill != 'red') {
            switch(towerType) {
                case 'foundation':
                    var newTower = new Tower(images.towerFoundation, mouseX*cellSize, mouseY*cellSize, 'foundation', 15, 100, 0, 40, 40);
                        goldCounter = goldCounter - 10;
                        goldDisplay.setText(goldCounter);
                        rightPanelLayer.draw();
                    break;
            }
            towersArray.push(newTower);
            busyCells.push({x: mouseX, y: mouseY}); //add tower rectangle to busy cells array

            beingConstructedRect.hide();
            beingConstructedTower.hide();
            isBuildingFoundation = false;
        } else { //if place is busy
            beingConstructedRect.hide();
            beingConstructedTower.hide();
            isBuildingFoundation = false;
        }
    }
    if (isBuildingCrystal) { //if crystal is not on towerFoundation hide it
        beingConstructedCrystal.hide();
        isBuildingCrystal = false;
    }
    bgLayer.draw();
    towersLayer.draw();
});
towersLayer.on('mouseup', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x / cellSize);
    var mouseY = parseInt(mousePos.y / cellSize);
    if (isBuildingCrystal) {
            switch(towerType) {
                case 'redCrystal':
                    var newTower = new Tower(images.redCrystal, mouseX*cellSize, mouseY*cellSize, 'redCrystal', 15, 100, 60);
                        goldCounter = goldCounter - 20;
                        goldDisplay.setText(goldCounter);
                        rightPanelLayer.draw();
                    break;
                case 'blueCrystal':
                    var newTower = new Tower(images.blueCrystal, mouseX*cellSize, mouseY*cellSize, 'blueCrystal', 15, 100, 50);
                        goldCounter = goldCounter - 15;
                        goldDisplay.setText(goldCounter);
                        rightPanelLayer.draw();
                    break;
                case 'greenCrystal':
                    var newTower = new Tower(images.greenCrystal, mouseX*cellSize, mouseY*cellSize, 'greenCrystal', 15, 100, 70);
                        goldCounter = goldCounter - 25;
                        goldDisplay.setText(goldCounter);
                        rightPanelLayer.draw();
                    break;
                default: break;
            }
            towersArray.push(newTower);

            beingConstructedCrystal.hide();
            isBuildingCrystal = false;
        }
    towersLayer.draw();
});
towersLayer.on('mousemove', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x/cellSize);
    var mouseY = parseInt(mousePos.y/cellSize);
    if (isBuildingCrystal) {
        beingConstructedCrystal.setAttrs({
            x: mouseX*cellSize,
            y: mouseY*cellSize,
            visible: true
        });
    } else {
        beingConstructedCrystal.hide();
        isBuildingCrystal = false;
    }
    towersLayer.draw();
    bgLayer.draw();
});
/* ----------------------------Tower processing----------------------------*/



/***************************************************************************/
/** ----------------------------Map processing-----------------------------*/
function buildBackground(map) { //draw background
    for (var i = 0; i < heightCellCount; i++) {
        for (var j = 0; j < widthCellCount; j++) {
            var tile = new Kinetic.Image({
                x: j*cellSize,
                y: i*cellSize,
                image: images.bgSprite,
                width: cellSize,
                height: cellSize,
                crop: [(map[i][j].x-1)*cellSize, (map[i][j].y-1)*cellSize, cellSize, cellSize]
            });
            backgroundImageArray.push(tile);

            if (map[i][j].busy == 1) { //define the occupied space
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

function buildTowersMenu() { //draw menu with towers
    var towerFoundationIco = new Kinetic.Image({
        x: 22*cellSize,
        y: 6*cellSize,
        image: images.towerFoundationIco,
        width: cellSize,
        height: cellSize
    });
    var puddleBlueIco = new Kinetic.Image({
        x: 22*cellSize,
        y: 7*cellSize,
        image: images.puddleBlueIco,
        width: cellSize,
        height: cellSize
    });
    var puddleGreenIco = new Kinetic.Image({
        x: 22*cellSize,
        y: 8*cellSize,
        image: images.puddleGreenIco,
        width: cellSize,
        height: cellSize
    });
    var crystalGreenIco = new Kinetic.Image({
        x: 23*cellSize,
        y: 6*cellSize,
        image: images.crystalGreenIco,
        width: cellSize,
        height: cellSize
    });
    var crystalBlueIco = new Kinetic.Image({
        x: 23*cellSize,
        y: 7*cellSize,
        image: images.crystalBlueIco,
        width: cellSize,
        height: cellSize
    });
    var crystalRedIco = new Kinetic.Image({
        x: 23*cellSize,
        y: 8*cellSize,
        image: images.crystalRedIco,
        width: cellSize,
        height: cellSize
    });
    rightPanelLayer.add(towerFoundationIco);
    rightPanelLayer.add(puddleBlueIco);
    rightPanelLayer.add(puddleGreenIco);
    rightPanelLayer.add(crystalGreenIco);
    rightPanelLayer.add(crystalBlueIco);
    rightPanelLayer.add(crystalRedIco);

    /* Towers menu events */
    towerFoundationIco.on('mousedown',  function() {
        if (goldCounter >= towerFoundationCost) {
            isBuildingFoundation = true;
            towerType = 'foundation';
            beingConstructedTower.setAttrs({
                image: images.towerFoundation
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    crystalBlueIco.on('mousedown',  function() {
        if (goldCounter >= blueCrystalCost) {
            isBuildingCrystal = true;
            towerType = 'blueCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.blueCrystal
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    crystalGreenIco.on('mousedown',  function() {
        if (goldCounter >= greenCrystalCost) {
            isBuildingCrystal = true;
            towerType = 'greenCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.greenCrystal
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    crystalRedIco.on('mousedown',  function() {
        if (goldCounter >= greenCrystalCost) {
            isBuildingCrystal = true;
            towerType = 'redCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.redCrystal
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
}

function buildBases() { //draw enemy's home and our home
    var enemyBase = new Kinetic.Image({
        x: 3*cellSize,
        y: 2.5*cellSize,
        image: images.enemyBase,
        width: 80,
        height: 80
    });
    var ourBase = new Kinetic.Image({
        x: 16.5*cellSize,
        y: 11*cellSize,
        image: images.ourBase,
        width: 80,
        height: 90
    });
    bgLayer.add(enemyBase);
    bgLayer.add(ourBase);
}

function displayErrors(text) { //display errors
    errorMessage.setText(text);
    setTimeout(cleanErrorMessages, 1000);
    rightPanelLayer.draw();
}

function cleanErrorMessages() { //clean errors
    errorMessage.setText("");
    rightPanelLayer.draw();
}

function findPath(map,mapBeginCell,mapEndCell) {
    var stepBefore = {i: mapBeginCell.i,j: mapBeginCell.j};
    var first = {i: mapBeginCell.i, j: mapBeginCell.j};
    var last = {i: mapEndCell.i, j: mapEndCell.j};
    findNextCell(map,mapBeginCell, mapEndCell,stepBefore,first, last);
}

function findNextCell(map,currentCell, mapEndCell, stepBefore, first, last){
    var ii= currentCell.i;
    var jj= currentCell.j;

    var indexI = ii;
    var indexJ = jj;

    console.log(map[indexI][indexJ-1].TileType, map[indexI][indexJ+1].TileType, map[indexI-1][indexJ].TileType, map[indexI+1][indexJ].TileType);

    try{ map[indexI][indexJ+1].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexJ--; }
    if(map[indexI][indexJ+1].TileType == 6 && indexJ+1 !== stepBefore.j){
        if(first.i == ii && first.j == jj){
            pathCells.push({i: ii, j: jj-2});
            direction.push("goRight");
            pathCells.push({i: ii, j: jj-1});
            direction.push("goRight");
            pathCells.push({i: ii, j: jj});
            direction.push("goRight");
        }
        stepBefore = {i: ii, j: jj};
        jj++;
        pathCells.push({i: ii, j: jj});
        direction.push("goRight");
        if(last.i == ii && last.j == jj){
            pathCells.push({i: ii, j: jj+1});
            direction.push("goRight");
            pathCells.push({i: ii, j: jj+2});
            direction.push("goRight");
        }
    }else{
        try{ map[indexI][indexJ-1].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexJ++; }
        if(map[indexI][indexJ-1].TileType == 6 && indexJ-1 !== stepBefore.j){
            if(first.i == ii && first.j == jj){
                pathCells.push({i: ii, j: jj+2});
                direction.push("goLeft");
                pathCells.push({i: ii, j: jj+1});
                direction.push("goLeft");
                pathCells.push({i: ii, j: jj});
                direction.push("goLeft");
            }
            stepBefore = {i: ii, j: jj};
            jj--;
            pathCells.push({i: ii, j: jj});
            direction.push("goLeft");
            if(last.i == ii && last.j == jj){
                pathCells.push({i: ii, j: jj-1});
                direction.push("goLeft");
                pathCells.push({i: ii, j: jj-2});
                direction.push("goLeft");
            }
        }else{
            try{ map[indexI+1][indexJ].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexI--; }
            if(map[indexI+1][indexJ].TileType == 6 && indexI+1 !== stepBefore.i){
                if(first.i == ii && first.j == jj){
                    pathCells.push({i: ii-2, j: jj});
                    direction.push("goBottom");
                    pathCells.push({i: ii-1, j: jj});
                    direction.push("goBottom");
                    pathCells.push({i: ii, j: jj});
                    direction.push("goBottom");
                }
                stepBefore = {i: ii, j: jj};
                ii++;
                pathCells.push({i: ii, j: jj});
                direction.push("goBottom");
                if(last.i == ii && last.j == jj){
                    pathCells.push({i: ii+1, j: jj});
                    direction.push("goBottom");
                    pathCells.push({i: ii+2, j: jj});
                    direction.push("goBottom");
                }
            }else{
                try{ map[indexI-1][indexJ].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexI++; }
                if(map[indexI-1][indexJ].TileType == 6 && indexI-1 !== stepBefore.i){
                    if(first.i == ii && first.j == jj){
                        pathCells.push({i: ii+2, j: jj});
                        direction.push("goTop");
                        pathCells.push({i: ii+1, j: jj});
                        direction.push("goTop");
                        pathCells.push({i: ii, j: jj});
                        direction.push("goTop");
                    }
                    stepBefore = {i: ii, j: jj};
                    ii--;
                    pathCells.push({i: ii, j: jj});
                    direction.push("goTop");
                    if(last.i == ii && last.j == jj){
                        pathCells.push({i: ii-1, j: jj});
                        direction.push("goTop");
                        pathCells.push({i: ii-2, j: jj});
                        direction.push("goTop");
                    }
                }
            }
        }
    }

    if(ii == mapEndCell.i && jj == mapEndCell.j){

    }else{
        currentCell.i = ii;
        currentCell.j = jj;
        findNextCell(map,currentCell, mapEndCell, stepBefore, first, last);
    }
}
/* -----------------------------Map processing-----------------------------*/


/***************************************************************************/
/** ----------------------------Sound processing---------------------------*/

var audioSprite = document.getElementById('effects');

// sprite data
var spriteData = {
    monsterA: {
        start: 0.1,
        length: 2.4
    },
    arrow: {
        start: 3.0,
        length: 2.0
    },
    monsterHa:{
        start: 8.1,
        length: 9.5
    }
};

// current sprite being played
var currentSprite = {};

// time update handler to ensure we stop when a sprite is complete
var onTimeUpdate = function() {
    if (this.currentTime >= currentSprite.start + currentSprite.length) {
        this.pause();
    }
};
audioSprite.addEventListener('timeupdate', onTimeUpdate, false);

var playSprite = function(id) {          //play sprite according to the id
    if (spriteData[id] && spriteData[id].length) {
        currentSprite = spriteData[id];
        audioSprite.currentTime = currentSprite.start;
        audioSprite.play();
    }
};
/* ----------------------------Sound processing----------------------------*/
