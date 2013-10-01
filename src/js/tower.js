var canvas, context, toggle;

var images = {};
var monster = {
     x: 0,
     y: 200
};

var coordinates = [
    [0, 200], //0
    [80,75],  //1
    [205,235],//2
    [370,165],//3
    [570,165] //4
];

function render(){
    context.drawImage(images.bg, 0, 0);
    context.drawImage(images.monster, monster.x, monster.y);
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
setTimeout(animate, 1000);

function animate() {

    monsterMove();

    // request new frame
    var req = requestAnimFrame(animate);

    if(monster.x+32 >= canvas.width){
        cancelRequestAnimFrame(req);
    }
}

function monsterMove(){

    if(monster.x < coordinates[1][0]+1 && monster.y == coordinates[0][1]){
        monster.x += 1;
    }
    if(monster.x == coordinates[1][0] && monster.y > coordinates[1][1]){
        monster.y -= 1;
    }
    if(monster.x < coordinates[2][0]+1 && monster.y == coordinates[1][1]){
        monster.x += 1;
    }
    if(monster.x == coordinates[2][0] && monster.y < coordinates[2][1]){
        monster.y += 1;
    }
    if(monster.x < coordinates[3][0]+1 && monster.y == coordinates[2][1]){
        monster.x += 1;
    }
    if(monster.x == coordinates[3][0] && monster.y > coordinates[3][1]){
        monster.y -= 1;
    }
    if(monster.x < coordinates[4][0] && monster.y == coordinates[3][1] && monster.x >= coordinates[3][0]){
        monster.x += 1;
    }

    console.log(monster.x + " : " + monster.y);

    render();
}

function init() {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    document.body.appendChild(canvas);

    loadImages(sources);
}