//Global variables are defined here
var canvas, ctx;

var drp=false;          // true - если перетаскиваем
var pozx=0; var pozy=0; // координаты начала отображения изображения
var smx=0;   var smy=0;   // координаты мыши - нажали на кнопку
var emx=0;   var emy=0;   // координаты мыши - опустили на кнопку


var newTower;
var images = {}; // images object
var towersArray = Array(); // towers array

//All images and path are defined here
var sources = {
    bg: "../images/levelbg1.png",
    monster: "../images/monster.png",
    newMonster: "../images/mo1.png",
	flameTowerIco: "../images/flame_tower_ico.png",
	frostTowerIco: "../images/frost_tower_ico.png",
	flameTower: "../images/flame_tower.png"
};

//Load images from sources to canvas
function loadImages(sources) {
    var loadedImages = 0;
    var numImages = 0;
    // get num of images in sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                //drawBg();
            }
        };    
		images[src].src = sources[src];
    }
}

function initialization() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	loadImages(sources);
}


/** -----------------------------Drow functions here----------------------*/
var iconSize = 64; // Width and height of tower icon

function clear() { // clear canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBg() { // render background of canvas
    ctx.drawImage(images.bg, 0, 0);
}

function drawTowersMenu() { // render towers icons in towers menu
	ctx.drawImage(images.flameTowerIco, canvas.width-(iconSize+5), canvas.height-(iconSize+5));
	ctx.drawImage(images.frostTowerIco, canvas.width-(iconSize+5)*2, canvas.height-(iconSize+5));
}

function drawScene() {
	clear();
	drawBg();
	if (drp == true) { // transparent bg, when new tower is building
		ctx.fillStyle = 'rgba(100, 190, 150, 0.3)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} 
	if (typeof(newTower) != "undefined") { // draw tower that is building now
		ctx.drawImage(newTower.image, newTower.x, newTower.y);
	}
	for (var i = 0; i < towersArray.length; i++) {
		ctx.drawImage(towersArray[i].image, towersArray[i].x, towersArray[i].y);
	}
	drawTowersMenu();
}

/*--------------------------------------------------------------------------*/




/** ----------------------------Objects here--------------------------------*/

function Tower(image, x, y, type, damage,  width, height)
{
	this.type = type;
	this.damage = damage;
	this.level = 1;
	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width || 50;
	this.height = height || 50;
}

/* --------------------------------------------------------------------------*/

initialization();
setInterval(drawScene, 100);

/** -----------------------------Events here--------------------------------*/
canvas.onclick = function(e) { // mouseclick handle
	var x, y;
    x = e.clientX;
    y = e.clientY;
	if (x > 0 && x < canvas.width && y > 0 && y < canvas.height-(iconSize+5)) {
		if (drp == true) {
			drp = false;
			towersArray.push(newTower);
		}
	}
	if (x > canvas.width-(iconSize+5) && x < canvas.width-5 && y > canvas.height-(iconSize+5) && y < canvas.height-5) {
		if (drp == false) {
			newTower = new Tower(images.flameTower, x, y, 'damage', 100);
			drp = true;
		}
	}
};
canvas.onmousemove = function(e) { // mousemove handle
	var x, y;
	x = e.clientX;
	y = e.clientY;
	if (drp == true) {
		newTower.x = x;
		newTower.y = y;
	}
}


/*--------------------------------------------------------------------------*/

