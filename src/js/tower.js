var canvas, context, toggle;

var images = {};

function monster(){

    var x;
    var y;

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

}

var monsterArray = new Array();
function createMonsters(){

    var firstDelay= 40;
    for(var i=0; i<10; i++){
        monsterArray.push(new monster());

        firstDelay += 40;

        monsterArray[i].setX(-firstDelay);
        monsterArray[i].setY(200);

    }
}

var coordinates = [
    [0, 200], //0
    [80,75],  //1
    [205,235],//2
    [370,165],//3
    [610,165] //4
];

function render(){

    context.drawImage(images.bg, 0, 0);
    for(var i=0; i<monsterArray.length; i++){
        context.drawImage(images.monster, monsterArray[i].getX(), monsterArray[i].getY());
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
}

var sources = {
    bg: "../images/levelbg1.png",
    monster: "../images/monster.png"
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
