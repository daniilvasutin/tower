//Global variables are defined here
var canvas, ctx;
var gold_count = 100;
var mobs_count = 20;
var error = false;
var build = false;          //true - if tower is building
var validBuild = true;     //false - if something is standing on coordinates

var newTower;
var towerType = null;
var towersArray = Array(); // towers array

var images = {}; //images object


//All images and path are defined here
var sources = {
    bg: "../images/levelbg1.png",
    monster: "../images/monster.png",
    newMonster: "../images/mo1.png",
	flameTowerIco: "../images/flame_tower_ico.png",
	frostTowerIco: "../images/frost_tower_ico.png",
	flameTower: "../images/flame_tower.png",
	frostTower: "../images/frost_tower.png",
	buildClosed: "../images/closed.png",
	flameTowerRed: "../images/flame_tower_red.png",
	frostTowerRed:  "../images/frost_tower_red.png"
};

//Load images from sources to canvas
function loadImages(sources) 
{
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

function initialization() 
{
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	loadImages(sources);
}


/** -----------------------------Drow functions here----------------------*/
var iconSize = 40; //Width and height of tower icon

function clear() //clear canvas 
{ 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBg() //render background of canvas
{ 
    ctx.drawImage(images.bg, 0, 0);
}

function drawTowersMenu() //render towers icons in towers menu
{ 
	ctx.drawImage(images.flameTowerIco, canvas.width-(iconSize+5), canvas.height-(iconSize+5));
	ctx.drawImage(images.frostTowerIco, canvas.width-(iconSize+5)*2, canvas.height-(iconSize+5));
}

function drawMainCounters() //render count of gold etc.
{
	ctx.font = '15pt Calibri';
    ctx.fillStyle = '#FFFF00';
	ctx.textAlign = 'center';
	ctx.fillText('Gold: ' + gold_count + ' Mobs: ' + mobs_count, canvas.width/2, 50);
}

function drawErrors() {
	ctx.font = '15pt Calibri';
    ctx.fillStyle = '#FF4500';
	ctx.textAlign = 'center';
	ctx.fillText('Not enough gold', canvas.width/2, canvas.height/3);
}

function drawScene() 
{
	clear();
	drawBg();
	if (build == true) { //transparent bg, when new tower is building
		ctx.fillStyle = 'rgba(100, 190, 150, 0.3)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} 
	for (var i = 0; i < towersArray.length; i++) {
		ctx.drawImage(towersArray[i].image, towersArray[i].x, towersArray[i].y);
	}
	if (typeof(newTower) != "undefined") { //draw tower that is building now
		ctx.drawImage(newTower.image, newTower.x, newTower.y);
	}
	drawTowersMenu();
	drawMainCounters()
	if (error) {
		drawErrors();
	}
}

/*--------------------------------------------------------------------------*/




/** ----------------------------Objects here--------------------------------*/

function Tower(image, x, y, type, damage, cost, width, height)
{
	this.type = type;
	this.damage = damage;
	this.level = 1;
	this.radius = 50;
	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width || 20;
	this.height = height || 60;
	this.cost = cost;
}

/* --------------------------------------------------------------------------*/

initialization();
setInterval(drawScene, 20);

/** -----------------------------Events here--------------------------------*/
canvas.onclick = function(e) { //mouseclick handle
	var mouseX, mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
	if (mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height-(iconSize+5)) { 
		if (build == true && validBuild != false) { //If tower is built
				build = false;
				towersArray.push(newTower); //Add tower in array
				gold_count -= newTower.cost;
				delete newTower;
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


/*--------------------------------------------------------------------------*/

