var canvas, context, toggle;

var images = {};

function monster(){

    var x;
    var y;

    var currentFrame;

    var direction;

    this.getX = function() {
        return this.x;
    }

    this.getY = function() {
        return this.y;
    }

    this.setX = function(x) {
        this.x = x;
    }

    this.setY = function(y) {
        this.y = y;
    }

    this.makeStep = function() {

        if(this.x < coordinates[1][0]+1 && this.y == coordinates[0][1])   { this.x += 1; this.setDirection("right"); }
        if(this.x == coordinates[1][0] && this.y > coordinates[1][1])     { this.y -= 1; this.setDirection("top");   }
        if(this.x < coordinates[2][0]+1 && this.y == coordinates[1][1])   { this.x += 1; this.setDirection("right"); }
        if(this.x == coordinates[2][0] && this.y < coordinates[2][1])     { this.y += 1; this.setDirection("bottom");}
        if(this.x < coordinates[3][0]+1 && this.y == coordinates[2][1])   { this.x += 1; this.setDirection("right"); }
        if(this.x == coordinates[3][0] && this.y > coordinates[3][1])     { this.y -= 1; this.setDirection("top"); }
        if(this.x < coordinates[4][0] && this.y == coordinates[3][1] && this.x >= coordinates[3][0]){ this.x += 1; this.setDirection("right"); }
    }

    this.nextFigure = function(){

        this.currentFrame++;
    }

    this.getCurrentFigure = function(){

        return this.currentFrame;
    }

    this.setCurrentFrame = function(aFrameNumber) {

        this.currentFrame = aFrameNumber;
    }

    this.setDirection = function(aDirection) {

       this.direction = aDirection;
    }

    this.getDirection = function() {

        return this.direction;
    }

}

var monsterArray = new Array();
function createMonsters(){

    var firstDelay= 40;
    for(var i=0; i<10; i++){
        monsterArray.push(new monster());

        firstDelay += 40;

        monsterArray[i].setCurrentFrame(0);
        monsterArray[i].setX(-firstDelay);
        monsterArray[i].setY(170);
        monsterArray[i].setDirection("right");
    }
}

//var coordinates = [
//    [0, 200], //0
//    [80,75],  //1
//    [205,235],//2
//    [370,165],//3
//    [610,165] //4
//];

var coordinates = [
    [0, 170], //0
    [80,45],  //1
    [205,205],//2
    [360,135],//3
    [610,145] //4
];

var numberOfEnemyFigures=4;
var enemyCoutInWave=10, delayForSlowAnimation= 7;
var figureOfEnemyFromSpriteX,figureOfEnemyFromSpriteY;
var next=0;

function drawSprite(monster){

    monster.nextFigure();
    if (monster.getCurrentFigure()>=numberOfEnemyFigures) { monster.setCurrentFrame(0); }

    var figureOfEnemyFromSpriteWeight=images.newMonster.width/numberOfEnemyFigures-2;//2 - погрешность ширины изображения
    var figureOfEnemyFromSpriteHeight=images.newMonster.height/numberOfEnemyFigures-2;


    if(next==delayForSlowAnimation*enemyCoutInWave){
        figureOfEnemyFromSpriteX=figureOfEnemyFromSpriteWeight*monster.getCurrentFigure();
        next=0;
    }
    next++;

    if(monster.getDirection() === "right")  { figureOfEnemyFromSpriteY = images.newMonster.height/numberOfEnemyFigures*2; }
    if(monster.getDirection() === "top")    { figureOfEnemyFromSpriteY = images.newMonster.height/numberOfEnemyFigures*3; }
    if(monster.getDirection() === "bottom") { figureOfEnemyFromSpriteY = images.newMonster.height/numberOfEnemyFigures*0; }
    if(monster.getDirection() === "left")   { figureOfEnemyFromSpriteY = images.newMonster.height/numberOfEnemyFigures*1; }


    context.drawImage(images.newMonster, figureOfEnemyFromSpriteX, figureOfEnemyFromSpriteY,
        figureOfEnemyFromSpriteWeight, figureOfEnemyFromSpriteHeight,
        monster.getX(), monster.getY(), figureOfEnemyFromSpriteWeight, figureOfEnemyFromSpriteHeight);
}

function render(){

    context.drawImage(images.bg, 0, 0);

    var countEnemyBottomMove = 0;
    for(var i=0; i<monsterArray.length; i++){
        if(monsterArray[i].getDirection() === "bottom"){
            countEnemyBottomMove++;
        }
    }

    if(countEnemyBottomMove >= 1){
        for(var i = monsterArray.length-1; i >= 0; i--){
            drawSprite(monsterArray[i]);
        }
    }else{
        for(var i=0; i<monsterArray.length; i++){
            drawSprite(monsterArray[i]);
        }
    }
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
                showBg();
            }
        };
        images[src].src = sources[src];
    }
}

var sources = {
    bg: "../images/levelbg1.png",
    monster: "../images/monster.png",
    newMonster: "../images/mo1.png"
};

function showBg(){
    context.drawImage(images.bg, 0, 0);
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame              ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame         ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
})();

init();
showBg();
createMonsters();
setTimeout(animate, 1000);

function animate() {

    monsterMove();

    var req = requestAnimFrame(animate);

    if(monsterArray[9].getX() >= canvas.width){
        cancelRequestAnimFrame(req);
    }
}

function monsterMove(){


    for(var i=0; i<monsterArray.length; i++){
        monsterArray[i].makeStep();
        console.log(monsterArray[i].getX() + " : " + monsterArray[i].getY());
    }

    render();
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    document.body.appendChild(canvas);

    loadImages(sources);
}
