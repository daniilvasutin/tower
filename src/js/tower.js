/** ----------------------------Game var--------------------------------*/
var images = {};
var sources = {
    bg_sprite: "../images/sprite_bg1.png",
    monsterImg: "../images/monster.png",
    flameTowerIco: "../images/flame_tower_ico.png",
    frostTowerIco: "../images/frost_tower_ico.png",
    flameTower: "../images/flame_tower.png",
    frostTower: "../images/frost_tower.png"
};
for(var src in sources) {
    images[src] = new Image();
    images[src].src = sources[src];
}
/* -----------------------------------------------------------------------*/

/** ----------------------------Map var------------------------------------*/
var backgroundImageArray = new Array(); //background by tiles
var cellSize = 32; //size of tile in background
var widthCellCount = 15; //canvas width in cells
var heightCellCount = 10; //canvas height in cells
var busyCells = new Array(); //busy cells in map
var pathCells = new Array()  //path cells in map

var map1 = //Map by two-dimensional array
    [
        [{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1}], // 1ый ряд
        [{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1}], // 2ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 3ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1}], // 4ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 5ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1}], // 6ый ряд
        [{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 7ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}],  // 8ый ряд
        [{x:1,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // row 9
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}] // row 10
    ];

var mapBeginCell1 = {i: 6, j: 0};
var mapEndCell1 = {i: 5, j: 14};

var map2 = //Map by two-dimensional array
    [
        [{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1}], // 1ый ряд
        [{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1}], // 2ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 3ый ряд
        [{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1}], // 4ый ряд
        [{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 5ый ряд
        [{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 6ый ряд
        [{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 7ый ряд
        [{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}],  // 8ый ряд
        [{x:1,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // row 9
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}] // row 10
    ];
var mapBeginCell2 = {i: 3, j: 0};
var mapEndCell2 = {i: 9, j: 5};

var map3 = //Map by two-dimensional array
    [
        [{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1},{x:4,y:1}], // 1ый ряд
        [{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1},{x:5,y:1}], // 2ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1}], // 3ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:2,y:1},{x:1,y:1},{x:1,y:1}], // 4ый ряд
        [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 5ый ряд
        [{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 6ый ряд
        [{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 7ый ряд
        [{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}],  // 8ый ряд
        [{x:1,y:1},{x:3,y:1},{x:2,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // row 9
        [{x:1,y:1},{x:3,y:1},{x:1,y:1},{x:3,y:1},{x:3,y:1},{x:3,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}] // row 10
    ];
var mapBeginCell3 = {i: 9, j: 1};
var mapEndCell3 = {i: 2, j: 14};
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

/** ----------------------------Towers var--------------------------------*/
/** ----------------------------Towers var--------------------------------*/
function Tower(image, x, y, type, damage, cost, width, height) {
    this.type = type;
    this.damage = damage;
    this.level = 1;
    this.radius = 50;
    this.cost = cost;
    this.image = new Kinetic.Image({
        x: x,
        y: y,
        image: image,
        width: width,
        height: height
    });
    this.bullet = new Kinetic.Circle({
        x: x,
        y: y,
        fill: 'black',
        width: 10,
        height: 10,
        visible: false
    });
    towersLayer.add(this.image);
    towersLayer.add(this.bullet);
    towersLayer.draw();

    this.bulletTween = new Kinetic.Tween({
        node: this.bullet,
        x: 420,
        duration: 0.3,
        easing: Kinetic.Easings.Linear,
        onFinish: function() {
            this.reset();
        }
    });
}

var towerType; //stores the type of tower build
var towersArray = new Array(); //tower objects array
var isBuildingNow = false; //is the tower now under construction?


var beingConstructedTower = new Kinetic.Image({ //building tower image
    x: 0,
    y: 0,
    image: images.flameTower,
    width: 20,
    height: 60,
    visible: false
});
var beingConstructedTower = new Kinetic.Image({ //building tower image
    x: 0,
    y: 0,
    image: images.flameTower,
    width: 20,
    height: 60,
    visible: false
});
/* ------------------------------------------------------------------------*/

/** ----------------------------Need for run the game----------------------*/
var stage = new Kinetic.Stage({
    container: 'container',
    width: widthCellCount*cellSize,
    height: heightCellCount*cellSize
});

var bgLayer = new Kinetic.Layer();

function startGame(){
    buildBackground(map1);
    afterBgCreating();
    createMonsters();
    createMonstersTweens();
    monstersMove();
}
startGame();
/* ------------------------------------------------------------------------*/


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Tower processing---------------------------*/
function afterBgCreating() { //run, after background is creating
    buildTowersMenu();
    bgLayer.add(beingConstructedRect);
    stage.add(bgLayer);
}

function shoot() {
    for (var i = 0; i < towersArray.length; i++) {
        towersArray[i].bullet.show();
        towersArray[i].bulletTween.play();
    }
}

function buildTowersMenu() { //draw menu with towers
    var frostTowerButton = new Kinetic.Image({
        x: 12*cellSize,
        y: 9*cellSize,
        image: images.frostTowerIco,
        width: cellSize,
        height: cellSize
    });
    var flameTowerButton = new Kinetic.Image({
        x: 13*cellSize,
        y: 9*cellSize,
        image: images.flameTowerIco,
        width: cellSize,
        height: cellSize
    });

    bgLayer.add(frostTowerButton);
    bgLayer.add(flameTowerButton);

    /* Towers menu events */
    frostTowerButton.on('mousedown',  function() {
        isBuildingNow = true;
    });
    frostTowerButton.on('mouseover',  function() {

    });
    flameTowerButton.on('mousedown',  function() {
        isBuildingNow = true;
    });
}

/***************************************************************************/
/***************************************************************************/
/** ----------------------------Monster processing-------------------------*/
function createMonsters(){
    for (var i=0; i < 10; i++) {
        var monster = new Kinetic.Sprite({
            x: pathCells[0].j * cellSize,
            y: (pathCells[0].i-1) * cellSize,
            image: images.monsterImg,
            animation: 'goRight',
            animations: animations,
            frameRate: 6,
            index: 0,
            visible: false
        });
        monsterArray.push(monster);
        bgLayer.add(monster);
        monster.start();
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
        node: monsterArray[currentMonster],
        duration: 0.5,
        x: pathCells[0].j * cellSize,
        y: (pathCells[0].i-1) * cellSize,
        onFinish: function(){
            monsterArray[currentMonster].setAnimation(direction[0]);
            monsterStepToNextCell(1, currentMonster);
        }
    });
    return tween;
}

function monsterStepToNextCell(currentStep, currentMonster){
    var i = currentStep;
    new Kinetic.Tween({
        node: monsterArray[currentMonster],
        duration: 0.5,
        x: pathCells[i].j * cellSize,
        y: (pathCells[i].i-1) * cellSize,
        onFinish: function(){
            if(i < pathCells.length-1){
                if(direction[i] !== direction[i+1]){
                    monsterArray[currentMonster].setAnimation(direction[i+1]);
                }
                if(direction[i] === "goBottom"){
                    console.log(currentMonster,i, direction[i]);
                    monsterArray[currentMonster].moveUp();
                }

                i++;
                monsterStepToNextCell(i,currentMonster);
            }
        }
    }).play();
}

function monstersMove(currentMonsterTween){
    var currentMonsterTween = currentMonsterTween || 0;
    monsterArray[currentMonsterTween].show();
    monsterTweenArray[currentMonsterTween].play();
    currentMonsterTween++;
    if(currentMonsterTween < monsterArray.length) setTimeout(function(){monstersMove(currentMonsterTween)}, 700);
}


/***************************************************************************/
/***************************************************************************/
/** ----------------------------Map processing-----------------------------*/
function buildBackground(map) {
    for (var i = 0; i < heightCellCount; i++) {
        for (var j = 0; j < widthCellCount; j++) {
            var tile = new Kinetic.Image({
                x: j*cellSize,
                y: i*cellSize,
                image: images.bg_sprite,
                width: cellSize,
                height: cellSize,
                crop: [(map[i][j].x-1)*cellSize, (map[i][j].y-1)*cellSize, cellSize, cellSize]
            });
            backgroundImageArray.push(tile);

            if (map[i][j].x-1 == 2 || map[i][j].x-1 == 3 || map[i][j].x-1 == 4) { //define the occupied space
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

/* Events */
bgLayer.on('mousemove', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x/cellSize);
    var mouseY = parseInt(mousePos.y/cellSize);
    if (isBuildingNow) {
        for (var i = 0; i < busyCells.length; i++) {
            if ((busyCells[i].x != mouseX) || (busyCells[i].y != mouseY)) {
                beingConstructedRect.setAttrs({
                    x: mouseX * cellSize,
                    y: mouseY * cellSize,
                    fill: "green",
                    visible: true
                });
                beingConstructedTower.setAttrs({
                    x: mouseX * cellSize + 5,
                    y: (mouseY-1) * cellSize,
                    visible: true
                });
            } else {
                beingConstructedRect.setAttrs({
                    x: mouseX * cellSize,
                    y: mouseY * cellSize,
                    fill: "red"
                });
                break;
            }
        }
    }
    bgLayer.draw();
});
bgLayer.on('mouseup', function(){
    var mousePos = stage.getMousePosition();
    var mouseX = parseInt(mousePos.x / cellSize);
    var mouseY = parseInt(mousePos.y / cellSize);
    if (isBuildingNow) {
        if (beingConstructedRect.attrs.fill != 'red') {
            switch(towerType) {
                case 'frost':
                    var newTower = new Tower(images.frostTower, mouseX * cellSize + 5, (mouseY-1) * cellSize, 'frost', 15, 100, 20, 60);
                        goldCounter = goldCounter - 10;
                        goldDisplay.setText(goldCounter);
                        bgLayer.draw();
                    break;
                case 'flame':
                    var newTower = new Tower(images.flameTower, mouseX * cellSize + 5, (mouseY-1) * cellSize, 'flame', 15, 100, 20, 60);
                        goldCounter = goldCounter - 15;
                        goldDisplay.setText(goldCounter);
                        bgLayer.draw();
                    break;
            }
            towersArray.push(newTower);
            busyCells.push({x: mouseX, y: mouseY}); //add tower rectangle to busy cells array

            /* test tween (temporary)*/
            towersArray[towersArray.length-1].bullet.show();
            towersArray[towersArray.length-1].bulletTween.play();

            beingConstructedRect.hide();
            beingConstructedTower.hide();
            isBuildingNow = false;
        }
    }
    towersLayer.draw();
});


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

    try{ map[indexI][indexJ+1].x; }catch(e){ stepBefore = { i: ii, j: jj }; indexJ--; }
    if(map[indexI][indexJ+1].x-1 == 2 && indexJ+1 !== stepBefore.j){
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
        try{ map[indexI][indexJ-1].x; }catch(e){ stepBefore = { i: ii, j: jj }; indexJ++; }
        if(map[indexI][indexJ-1].x-1 == 2 && indexJ-1 !== stepBefore.j){
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
            try{ map[indexI+1][indexJ].x; }catch(e){ stepBefore = { i: ii, j: jj }; indexI--; }
            if(map[indexI+1][indexJ].x-1 == 2 && indexI+1 !== stepBefore.i){
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
                try{ map[indexI-1][indexJ].x; }catch(e){ stepBefore = { i: ii, j: jj }; indexI++; }
                if(map[indexI-1][indexJ].x-1 == 2 && indexI-1 !== stepBefore.i){
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


