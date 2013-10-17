/** ----------------------------Game var--------------------------------*/

var canvas, context;
var images = {};
var sources = {
    bg: "../images/levelbg1.png",
    monsterImg: "../images/monster.png",
    flameTowerIco: "../images/flame_tower_ico.png",
    frostTowerIco: "../images/frost_tower_ico.png",
    flameTower: "../images/flame_tower.png",
    frostTower: "../images/frost_tower.png",
    buildClosed: "../images/closed.png",
    flameTowerRed: "../images/flame_tower_red.png",
    frostTowerRed:  "../images/frost_tower_red.png"
};

/* -----------------------------------------------------------------------*/

/** ----------------------------Towers var--------------------------------*/

var gold_count = 100;
var mobs_count = 20;
var error = false;
var build = false;          //true - if tower is building
var validBuild = true;      //false - if something is standing on coordinates

var newTower;
var towerType = null;
var towersArray = Array();  // towers array
var iconSize = 40;          //Width and height of tower icon

/* ------------------------------------------------------------------------*/

/** ----------------------------Monster var--------------------------------*/

var pathCoordinates = [ // path coordinates, way for monsters
    [0, 170],   //0
    [80,45],    //1
    [205,205],  //2
    [360,135],  //3
    [610,145]   //4
];

var numberOfMonsterFigures=4;                               // count of enemy figures in one side(line in sprite)
var monstersCoutInWave=10, delayForSlowAnimation= 7;        //var for slow animation
var figureOfMonsterFromSpriteX,figureOfMonsterFromSpriteY;  //start position from where it will be cut image from sprite
var flagForNextSpriteImage=0;                               //flag for next sprite image(figure of monster)
var monsterArray = new Array();                             //monster array

/* ------------------------------------------------------------------------*/

/** ----------------------------Need for run and stop the game--------------*/

function init() {                                   //init game
    canvas = document.getElementById("canvas");     //connect to canvas id in game.html
    context = canvas.getContext("2d");              //create 2d context

    loadImages(sources);                            //load all images

    var audio1 = document.getElementById('aTsIwR');
    audio1.volume = 0.3;
    audio1.play();
}

function loadImages(sources) {
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                drawBg();
            }
        };
        images[src].src = sources[src];
    }
}

window.requestAnimFrame = (function(){              //requestAnimFrame - internal function for run main game loop(for start and control game animation)
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelRequestAnimFrame = ( function() {      //cancelRequestAnimFrame - internal function for stop game loop
    return window.cancelAnimationFrame              ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame         ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
})();

/* ------------------------------------------------------------------------*/

/** ----------------------------Run game-----------------------------------*/
init();             //init canvas, context  and images
createMonsters();   //create monsters for first wave
drawScene();        //main function for draw all game process
/* ------------------------------------------------------------------------*/

/** -----------------------------Draw functions here----------------------*/

function clear(){                           //clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBg(){                          //draw background
    context.drawImage(images.bg, 0, 0);
}

function drawTowersMenu(){                  //render towers icons in towers menu
    context.drawImage(images.flameTowerIco, canvas.width-(iconSize+5), canvas.height-(iconSize+5));
    context.drawImage(images.frostTowerIco, canvas.width-(iconSize+5)*2, canvas.height-(iconSize+5));
}

function drawMainCounters(){                //render count of gold etc.
    context.font = '15pt Calibri';
    context.fillStyle = '#FFFF00';
    context.textAlign = 'center';
    context.fillText('Gold: ' + gold_count + ' Mobs: ' + mobs_count, canvas.width/2, 50);
}

function drawErrors() {
    if (error) {
        context.font = '15pt Calibri';
        context.fillStyle = '#FF4500';
        context.textAlign = 'center';
        context.fillText('Not enough gold', canvas.width/2, canvas.height/3);
    }
}

function transparentBg(){
    if (build == true) {                    //transparent bg, when new tower is building
        context.fillStyle = 'rgba(100, 190, 150, 0.3)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawTowers(){
    for (var i = 0; i < towersArray.length; i++) {
        context.drawImage(towersArray[i].image, towersArray[i].x, towersArray[i].y);
    }
}
function drawBuildingNowTower(){
    if (typeof(newTower) != "undefined") { //draw tower that is building now
        context.drawImage(newTower.image, newTower.x, newTower.y);
    }
}

function drawSceneAgain(){
    var req = requestAnimFrame(drawScene);  //make request to internal function which optimizes all animation

    if(monsterArray[0].x == 50){
        playSprite('monsterA');
    }

    if(monsterArray[monsterArray.length-1].x >= canvas.width){  //if all monsters go through the map animation stop
        playSprite("monsterHa");
        cancelRequestAnimFrame(req);
    }
}

function drawScene() {  //main draw function

    drawBg();
    drawMonsters();

    drawTowers();
    transparentBg();
    drawBuildingNowTower();

    drawTowersMenu();
    drawMainCounters();

    drawErrors();

    drawSceneAgain();
}

/*--------------------------------------------------------------------------*/


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Monster processing-------------------------*/

function Monster(image, x, y, currentFrame, direction){

    this.image = image;
    this.x = x;
    this.y = y;
    this.currentFigure = currentFrame;   //current monster figure which draw now(from monster sprite)
    this.direction = direction;          //direction in which monster move

    this.makeStep = function() {         //make next monster step in accordance with the coordinates of the path

        if(this.x < pathCoordinates[1][0]+1 && this.y == pathCoordinates[0][1])   { this.x += 1; this.direction = "right"   }
        if(this.x == pathCoordinates[1][0] && this.y > pathCoordinates[1][1])     { this.y -= 1; this.direction = "top";    }
        if(this.x < pathCoordinates[2][0]+1 && this.y == pathCoordinates[1][1])   { this.x += 1; this.direction = "right";  }
        if(this.x == pathCoordinates[2][0] && this.y < pathCoordinates[2][1])     { this.y += 1; this.direction = "bottom"; }
        if(this.x < pathCoordinates[3][0]+1 && this.y == pathCoordinates[2][1])   { this.x += 1; this.direction = "right";  }
        if(this.x == pathCoordinates[3][0] && this.y > pathCoordinates[3][1])     { this.y -= 1; this.direction = "top";    }
        if(this.x < pathCoordinates[4][0] && this.y == pathCoordinates[3][1] && this.x >= pathCoordinates[3][0]){ this.x += 1; this.direction = "right"; }
    }
}

function createMonsters(){

    var firstDelay= 40;         //delay for monsters move in sequence, first monster start at -40x next -80x next -120x...
    for(var i=0; i<10; i++){

        firstDelay += 40;

        monsterArray.push(new Monster(images.monsterImg, -firstDelay, 170, 0, "right"));
    }
}

function drawMonsters(){

    for(var i=0; i<monsterArray.length; i++){   //make step for all monsters
        monsterArray[i].makeStep();
    }

    renderMonster();                            //redraw monster new position
}

function renderMonster(){

    var countEnemyBottomMove = 0;
    for(var i=0; i<monsterArray.length; i++){       //count how much monsters go bottom to know in what direction redraw monsters(overlay problem)
        if(monsterArray[i].direction === "bottom"){
            countEnemyBottomMove++;
        }
    }

   if(countEnemyBottomMove >= 1){                  //if more then one monster go bottom we will draw monsters in another diraction(overlay problem)
       for(var i = monsterArray.length-1; i >= 0; i--){
            drawMonsterSprite(monsterArray[i]);
       }
    }else{
        for(var i=0; i<monsterArray.length; i++){   //in normal diraction(overlay problem)
            drawMonsterSprite(monsterArray[i]);
        }
    }
}

function drawMonsterSprite(monster){                //draw monster animation from sprite

    monster.currentFigure++;
    if (monster.currentFigure>=numberOfMonsterFigures) { monster.currentFigure = 0; }        //if we draw last figure of monster in sprite line then, go to start of sprite

    var figureOfMonsterFromSpriteWeight=monster.image.width/numberOfMonsterFigures-2;       //weight of one figure of monster in sprite
    var figureOfMonsterFromSpriteHeight=monster.image.height/numberOfMonsterFigures-2;

    if(flagForNextSpriteImage==delayForSlowAnimation*monstersCoutInWave){                   //change figure to next through 70 of render loop
        figureOfMonsterFromSpriteX=figureOfMonsterFromSpriteWeight*monster.currentFigure;
        flagForNextSpriteImage=0;
    }
    flagForNextSpriteImage++;

    if(monster.direction === "right")  { figureOfMonsterFromSpriteY = monster.image.height/numberOfMonsterFigures*2; } //get monster figure looking where he was going: back, face..
    if(monster.direction === "top")    { figureOfMonsterFromSpriteY = monster.image.height/numberOfMonsterFigures*3; }
    if(monster.direction === "bottom") { figureOfMonsterFromSpriteY = monster.image.height/numberOfMonsterFigures*0; }
    if(monster.direction === "left")   { figureOfMonsterFromSpriteY = monster.image.height/numberOfMonsterFigures*1; }


    context.drawImage(monster.image, figureOfMonsterFromSpriteX, figureOfMonsterFromSpriteY, //draw subimage monster.image
        figureOfMonsterFromSpriteWeight, figureOfMonsterFromSpriteHeight,
        monster.x, monster.y, figureOfMonsterFromSpriteWeight, figureOfMonsterFromSpriteHeight);
}

/* -----------------------------Monster processing-------------------------*/


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Tower processing---------------------------*/

function Tower(image, x, y, type, damage, cost, width, height)
{
    this.type = type;
    this.damage = damage;
    this.level = 1;
    this.radius = 25;
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width || 20;
    this.height = height || 60;
    this.cost = cost;
}
/* ------------------------------------------------------------------------*/

/** -----------------------------Events here-------------------------------*/
canvas.onclick = function(e) { //mouseclick handle
    var mouseX, mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height-(iconSize+5)) {
        if (build == true && validBuild != false) { //If tower is built
            build = false;
            towersArray.push(newTower); //Add tower in array
            gold_count -= newTower.cost;
            newTower = undefined;   //noError
            //delete newTower;      //error
        }
    }
    if (mouseX > canvas.width-(iconSize+5) && mouseX < canvas.width-5 && mouseY > canvas.height-(iconSize+5) && mouseY < canvas.height-5)	towerType = 'flame'; //If tower icon clicked
    if (mouseX > canvas.width-(iconSize+5)*2 && mouseX < canvas.width-(iconSize+5) && mouseY > canvas.height-(iconSize+5) && mouseY < canvas.height-5)	towerType = 'frost'; //If tower icon clicked
    if (build == false && towerType != null) {
        switch (towerType) {
            case 'frost':
                newTower = new Tower(images.frostTower, mouseX, mouseY, towerType, 100, 30);
                break;
            case 'flame':
                newTower = new Tower(images.flameTower, mouseX, mouseY, towerType, 150, 10);
                break;
        }
        build = true;
        towerType = null;
    }
};
canvas.onmousemove = function(e) { //mousemove handle
    var mouseX, mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (build == true) {
        for (var i = 0; i < towersArray.length; i++) {
            if (mouseX > towersArray[i].x && mouseX < towersArray[i].x + towersArray[i].width
                && mouseY > towersArray[i].y && mouseY < towersArray[i].y + towersArray[i].height)
            {
                validBuild = false;
                newTower.image = images.buildClosed;
                break;
            }
            else
            {
                validBuild = true;
                switch (newTower.type) {
                    case 'frost':
                        newTower.image = images.frostTower;
                        break;
                    case 'flame':
                        newTower.image = images.flameTower;
                        break;
                }
            }
        }
        newTower.x = mouseX;
        newTower.y = mouseY;
    }
}
/* ----------------------------Tower processing----------------------------*/

/***************************************************************************/
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
