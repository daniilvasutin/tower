//Global variables are defined here
var canvas, ctx;

var build = false;          //true - if tower is building

var newTower;
var towerType = null;
var images = {}; //images object
var towersArray = Array(); // towers array

//All images and path are defined here
var sources = {
    bg: "../images/levelbg1.png",
    monster: "../images/monster.png",
    newMonster: "../images/mo1.png",
	flameTowerIco: "../images/flame_tower_ico.png",
	frostTowerIco: "../images/frost_tower_ico.png",
	flameTower: "../images/flame_tower.png",
	frostTower: "../images/frost_tower.png"
};

//Load images from sources to canvas
function loadImages(sources) {
    var loadedImages = 0;
    var numImages = 0;
    //get num of images in sources
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
var iconSize = 40; //Width and height of tower icon

function clear() { //clear canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBg() { //render background of canvas
    ctx.drawImage(images.bg, 0, 0);
}

function drawTowersMenu() { //render towers icons in towers menu
	ctx.drawImage(images.flameTowerIco, canvas.width-(iconSize+5), canvas.height-(iconSize+5));
	ctx.drawImage(images.frostTowerIco, canvas.width-(iconSize+5)*2, canvas.height-(iconSize+5));
}

function drawScene() {
	clear();
	drawBg();
	if (build == true) { //transparent bg, when new tower is building
		ctx.fillStyle = 'rgba(100, 190, 150, 0.3)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} 
	if (typeof(newTower) != "undefined") { //draw tower that is building now
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
	this.radius = 50;
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
canvas.onclick = function(e) { //mouseclick handle
	var mouseX, mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
	if (mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height-(iconSize+5)) { 
		if (build == true) { //If tower is built
			build = false;
			towersArray.push(newTower); //Add tower in array
			delete newTower;
		}
	}
	if (mouseX > canvas.width-(iconSize+5) && mouseX < canvas.width-5 && mouseY > canvas.height-(iconSize+5) && mouseY < canvas.height-5)	towerType = 'flame'; //If tower icon clicked
	if (mouseX > canvas.width-(iconSize+5)*2 && mouseX < canvas.width-(iconSize+5) && mouseY > canvas.height-(iconSize+5) && mouseY < canvas.height-5)	towerType = 'frost'; //If tower icon clicked
	if (build == false && towerType != null) {
		switch (towerType) {
			case 'frost':
				newTower = new Tower(images.frostTower, mouseX, mouseY, towerType, 100);
				break;
			case 'flame':
				newTower = new Tower(images.flameTower, mouseX, mouseY, towerType, 150);
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
		newTower.x = mouseX;
		newTower.y = mouseY;
	}
}


/*--------------------------------------------------------------------------*/

