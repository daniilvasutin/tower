var canvas, context, toggle;



var images = {};

function monster(){

    var x;
    var y;

    var currentFrame;

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

        if(this.x < coordinates[1][0]+1 && this.y == coordinates[0][1])   { this.x += 1; }
        if(this.x == coordinates[1][0] && this.y > coordinates[1][1])     { this.y -= 1; }
        if(this.x < coordinates[2][0]+1 && this.y == coordinates[1][1])   { this.x += 1; }
        if(this.x == coordinates[2][0] && this.y < coordinates[2][1])     { this.y += 1; }
        if(this.x < coordinates[3][0]+1 && this.y == coordinates[2][1])   { this.x += 1; }
        if(this.x == coordinates[3][0] && this.y > coordinates[3][1])     { this.y -= 1; }
        if(this.x < coordinates[4][0] && this.y == coordinates[3][1] && this.x >= coordinates[3][0]){ this.x += 1; }
    }

    this.nextFrame = function(){

        this.currentFrame++;
    }

    this.getFrameNumber = function(){

        return this.currentFrame;
    }

    this.setFrameNumber = function(aFrameNumber) {

        this.currentFrame = aFrameNumber;
    }

}

var monsterArray = new Array();
function createMonsters(){

    var firstDelay= 40;
    for(var i=0; i<10; i++){
        monsterArray.push(new monster());

        firstDelay += 40;

        monsterArray[i].setFrameNumber(0);
        monsterArray[i].setX(-firstDelay);
        monsterArray[i].setY(170);

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

var numberOfFrames=3,xOffset;
var frameWidth;
var frameHeight;
var coutInWave=10;
var next=0;

function drawSprite(monster){

    monster.nextFrame();
    if (monster.getFrameNumber()>=numberOfFrames)
        monster.setFrameNumber(0);
    var frameWidth=images.newMonster.width/numberOfFrames;
    var frameHeight=images.newMonster.height;
    if(next==5*coutInWave){
        xOffset=frameWidth*monster.getFrameNumber();
        next=0;
    }
    next++;

    context.drawImage(images.newMonster, xOffset, 0,
        frameWidth, frameHeight,
        monster.getX(), monster.getY(), frameWidth, frameHeight);
}

function render(){

    context.drawImage(images.bg, 0, 0);
    for(var i=0; i<monsterArray.length; i++){
        drawSprite(monsterArray[i]);
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
                showImages();
            }
        };
        images[src].src = sources[src];
    }
    frameWidth=images.newMonster.width/numberOfFrames;
    frameHeight=images.newMonster.height;
}

var sources = {
    bg: "../images/levelbg1.png",
    monster: "../images/monster.png",
    newMonster: "../images/enemy.png"
};

function showImages(){
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
render();
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
