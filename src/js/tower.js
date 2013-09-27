var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

var images = {};
var monster = {};
monster.x = 0;
monster.y = 200;

function monsterMove(){

    if(monster.x < 65 && monster.y > 72){
        monster.x = monster.x + 32;
    }
    if(monster.x > 64 && monster.y > 71)
    {
        monster.y = monster.y - 32;
    }
    if(monster.y < 72 )
    {
        monster.x = monster.x + 32;
    }
    render();
}

function render(){
    ctx.drawImage(images.bg, 0, 0);
    ctx.drawImage(images.monster, monster.x, monster.y);
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
    ctx.drawImage(images.bg, 0, 0);
}

window.addEventListener("DOMContentLoaded", function()
{
    loadImages(sources);
    setInterval(monsterMove, 300);
});



