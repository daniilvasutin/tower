﻿/** ----------------------------Game var--------------------------------*/
var images = {};
var sources = {
    bgSprite: "images/sprite_bg.jpg",
    rightPanel: "images/panel.jpg",
    monsterImg: "images/mobs_sprite.png",
    towerFoundationIco: "images/tower_foundation_ico.jpg",
    crystalsIcons: "images/crystals_icons.jpg",
    crystals: "images/crystals.png",
    towerFoundation: "images/tower_foundation.png",
    enemyBase: "images/enemy_home.png",
    ourBase: "images/our_home.png",
    aura: "images/aura.png",
    saleTower: "images/sale.png",
    upTower: "images/up.png",
    bullets: "images/bullets.png",
    puddle_blue: "images/puddle_blue.png",
    puddle_green: "images/puddle_green.png"
};

function loadImages(sources, callback) {
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback();
            }
        };
        images[src].src = sources[src];
    }
}

/* -----------------------------------------------------------------------*/

/** ----------------------------Map var------------------------------------*/
var backgroundImageArray = new Array(); //background by tiles
var cellSize = 32; //size of tile in background
var widthCellCount = 22; //canvas width in cells + 4 for panel
var heightCellCount = 15; //canvas height in cells
var busyCells = new Array(); //busy cells in map

var map1 = //Map by two-dimensional array
        [         //0                           1                           2                             3                           4                           5                            6                           7                             8                          9                            10                            11                          12                         13                           14                             15                          16                            17                      18                      19                      20
        [{x:2,y:2,busy:0,TileType:0},{x:7,y:2,busy:1,TileType:2}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:9,y:2,busy:1,TileType:10},{x:7,y:3,busy:1,TileType:5}, {x:7,y:1,busy:1,TileType:9}, {x:7,y:2,busy:1,TileType:2},{x:7,y:1,busy:1,TileType:9},{x:7,y:3,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:10,y:1,busy:1,TileType:5},{x:11,y:1,busy:1,TileType:5},{x:12,y:1,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], // 1 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:9,y:4,busy:1,TileType:8}, {x:10,y:4,busy:1,TileType:8},{x:7,y:2,busy:1,TileType:2}, {x:7,y:2,busy:1,TileType:2}, {x:7,y:3,busy:1,TileType:5},{x:7,y:2,busy:1,TileType:2},{x:7,y:2,busy:1,TileType:2},{x:7,y:1,busy:1,TileType:9},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:10,y:2,busy:1,TileType:5},{x:11,y:2,busy:1,TileType:5},{x:12,y:2,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], // 2 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:9,y:5,busy:1,TileType:8}, {x:10,y:5,busy:1,TileType:8},{x:2,y:2,busy:0,TileType:0}, {x:7,y:1,busy:1,TileType:9}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:10,y:3,busy:1,TileType:5},{x:11,y:3,busy:1,TileType:5},{x:12,y:3,busy:1,TileType:5},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //3 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6}, {x:3,y:1,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},  {x:2,y:1,busy:1,TileType:6},  {x:2,y:1,busy:1,TileType:6},{x:3,y:1,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //4 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //5 row
        [{x:2,y:2,busy:0,TileType:0},{x:8,y:3,busy:1,TileType:3}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:8,y:2,busy:1,TileType:12},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:5,y:4,busy:1,TileType:11}, {x:6,y:4,busy:1,TileType:11}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //6 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:8,y:3,busy:1,TileType:3},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:7,y:2,busy:1,TileType:2}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:5,y:5,busy:1,TileType:11}, {x:6,y:5,busy:1,TileType:11}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //7 row
        [{x:1,y:4,busy:1,TileType:1},{x:2,y:4,busy:1,TileType:1}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:8,y:3,busy:1,TileType:3},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //8 row
        [{x:1,y:5,busy:1,TileType:1},{x:2,y:5,busy:1,TileType:1}, {x:2,y:2,busy:0,TileType:0}, {x:1,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6}, {x:3,y:3,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0}, {x:9,y:2,busy:1,TileType:10},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //9 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:5,y:4,busy:1,TileType:11},{x:6,y:4,busy:1,TileType:11},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:11,y:4,busy:1,TileType:13},{x:12,y:4,busy:1,TileType:13},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //10 row
        [{x:2,y:2,busy:0,TileType:0},{x:8,y:3,busy:1,TileType:3}, {x:2,y:2,busy:0,TileType:0}, {x:3,y:2,busy:1,TileType:6}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:5,y:5,busy:1,TileType:11},{x:6,y:5,busy:1,TileType:11},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:11,y:5,busy:1,TileType:13},{x:12,y:5,busy:1,TileType:13},{x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //11 row
        [{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:1,y:3,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6},{x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6}, {x:2,y:1,busy:1,TileType:6},{x:3,y:3,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:1,y:2,busy:1,TileType:6},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //12 row
        [{x:2,y:2,busy:0,TileType:0},{x:10,y:1,busy:1,TileType:4},{x:11,y:1,busy:1,TileType:4},{x:12,y:1,busy:1,TileType:4},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //13 row
        [{x:2,y:2,busy:0,TileType:0},{x:10,y:2,busy:1,TileType:4},{x:11,y:2,busy:1,TileType:4},{x:12,y:2,busy:1,TileType:4},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:7,y:3,busy:1,TileType:5},{x:7,y:1,busy:1,TileType:9}, {x:7,y:2,busy:1,TileType:2}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0}, {x:7,y:2,busy:1,TileType:2},{x:2,y:2,busy:0,TileType:0},{x:1,y:4,busy:1,TileType:1},{x:2,y:4,busy:1,TileType:1},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}], //14 row
        [{x:2,y:2,busy:0,TileType:0},{x:10,y:3,busy:1,TileType:4},{x:11,y:3,busy:1,TileType:4},{x:12,y:3,busy:1,TileType:4},{x:7,y:3,busy:1,TileType:5},{x:7,y:2,busy:1,TileType:2},{x:9,y:3,busy:1,TileType:7},{x:9,y:2,busy:1,TileType:10},{x:8,y:2,busy:1,TileType:12},{x:7,y:1,busy:1,TileType:9}, {x:2,y:2,busy:0,TileType:0}, {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:1,y:5,busy:1,TileType:1},{x:2,y:5,busy:1,TileType:1},  {x:2,y:2,busy:0,TileType:0},  {x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0},{x:2,y:2,busy:0,TileType:0}] //15 row
    ];
//var monsters = new Array();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            //17F
var path;
var pathCells = [{x:4,y:3},{x:8,y:3},{x:8,y:8},{x:3,y:8},{x:3,y:11},{x:12,y:11},{x:12,y:3},{x:17,y:3},{x:17,y:12}];
/* ------------------------------------------------------------------------*/

/** ----------------------------Towers var--------------------------------*/
var towerType; //stores the type of tower build
var towersArray = new Array(); //tower objects array
var foundationsArray = new Array(); //tower objects array
var isBuildingFoundation = false; //is the tower foundation now under construction?
var isBuildingCrystal = false; //is the crystal now under construction?
var isBuildingPuddle = false; //is the puddle now under construction?
var towerFoundationCost = 10;
var blueCrystalCost = 30; //cost of crystal
var redCrystalCost = 50;
var greenCrystalCost = 20;
var bluePuddleCost = 50;
var greenPuddleCost = 50;
var auraAnimation = {lighting: [{x: 0, y: 0, width: 122, height: 125}, {x: 122, y: 0, width: 122, height: 126}, {x: 244, y: 0, width: 122, height: 126}, {x: 366, y: 0, width: 122, height: 126}]};

function Foundation(image, x, y, width, height) {
    var self = this;
    this.complete = false;
    this.x = x;
    this.y = y;
    this.image = new Kinetic.Image({
        x: x * cellSize,
        y: y * cellSize,
        image: image,
        width: width || cellSize,
        height: height || cellSize
    });

    bgLayer.add(this.image);
    bgLayer.draw();
}

function Bullet(x, y, bulletCropX) {
    this.x = x;
    this.y = y;
    this.locat = new PVector(x,y);
    
    var velocity = new PVector(0,-2);
    var acceleration = new PVector(0,0);
    var maxspeed = 2;
    var maxforce = 0.3;

    this.image = new Kinetic.Image({
        x: x + 10,
        y: y + 10,
        image: images.bullets,
        crop: [bulletCropX, 0, 15, 15],
        width: 10,
        height: 10,
        visible: false
    });
    towersLayer.add(this.image);

    this.remove = function() {
        this.image.remove();
    }
    this.update = function() {
        velocity.add(acceleration);
        velocity.limit(maxspeed);

        this.locat.add(velocity);
        acceleration.mult(0);
    }

    this.applyForce = function(force) {
        acceleration.add(force);
    }

    this.seek = function(target) {

        var desired = PVector.sub(target,this.locat);
        desired.normalize();
        desired.mult(maxspeed);

        var steer = PVector.sub(desired,velocity);
        steer.limit(maxforce);

        this.applyForce(steer);
    }

    this.display = function() {
        var theta = velocity.heading2D() + Math.PI/2;
        this.image.setX(this.locat.x);
        this.image.setY(this.locat.y);
    }
    
    this.restore = function() {
        this.image.hide();
        this.image.setAttrs({x: this.x + 10, y: this.y + 10});
        this.locat.x = this.x;
        this.locat.y = this.y;
    }
}

function Crystal(x, y, type, damage, cost, radius, crystCropX, bulletCropX, damageInterval, width, height) {
    var self = this;
    var lastTime = 0;

    this.damageInterval = damageInterval;
    this.x = x * cellSize;
    this.y = y * cellSize;
    this.type = type;
    this.damage = damage;
    this.level = 1;
    this.radius = radius || 50;
    this.cost = cost;
    this.image = new Kinetic.Image({
        x: x * cellSize,
        y: y * cellSize,
        image: images.crystals,
        crop: [crystCropX, 0, 32, 32],
        width: width || cellSize,
        height: height || cellSize
    });
    this.up = new Kinetic.Image({
        x: x * cellSize - 20,
        y: y * cellSize + 5,
        image: images.upTower,
        width: 20,
        height: 19,
        visible: false
    });
    this.sale = new Kinetic.Image({
        x: x * cellSize + 35,
        y: y * cellSize + 5,
        image: images.saleTower,
        width: 20,
        height: 19,
        visible: false
    });

    this.circle = new Kinetic.Circle({
        x: x * cellSize + cellSize / 2,
        y: y * cellSize + cellSize / 2,
        radius: this.radius,
        stroke: 'white',
        strokeWidth: 2,
        visible: false
    });

    if (type == 'redCrystal') {
        this.aura = new Kinetic.Sprite({
          x: x * cellSize - 45,
          y: y * cellSize - 40,
          image: images.aura,
          animation: 'lighting',
          animations: auraAnimation,
          frameRate: 6,
          index: 0
        });
        towersAuraLayer.add(this.aura);
        this.aura.start();
    } else {
        this.bullet = new Bullet(x * cellSize, y * cellSize, bulletCropX);
        
    }
    
    this.mob = null;
    this.mobsArray = [];

    this.destroy = function() {
        self.aoeDamageAnim.stop();
        self.shootingAnim.stop();
        self.bulletAnim.stop();
        self.image.remove();
        if (self.bullet != null) self.bullet.remove();
        self.sale.remove();
        self.up.remove();
        self.circle.remove();
        if (self.aura != null) self.aura.remove();
        self = null;
        towersLayer.draw();
        towersAuraLayer.draw();
        bgLayer.draw();
    }
    
    this.shootingAnim = new Kinetic.Animation(function(frame) {
        if (frame.time >= (lastTime + self.damageInterval)) {
            self.bulletAnim.start();
            self.bullet.image.show();
            lastTime = frame.time;
        }
    }, towersLayer);

    this.aoeDamageAnim = new Kinetic.Animation(function(frame) {
        if (frame.time >= (lastTime + self.damageInterval)) {
            for (var i = 0; i < self.mobsArray.length; i++) {
                self.mobsArray[i].hp -= self.damage;
                if (self.mobsArray[i].hp <= 0) {
                    self.mobsArray.splice(i,1);
                }
            }
            if (self.mobsArray.length == 0) {
                self.aoeDamageAnim.stop();
            }
            lastTime = frame.time;
        }
    }, towersLayer);

    this.bulletAnim = new Kinetic.Animation(function(frame) {
        if (self.mob != null) {
            var target = new PVector(self.mob.sprite.attrs.x, self.mob.sprite.attrs.y);
            self.bullet.seek(target);
            self.bullet.update();
            self.bullet.display();
            if (self.bullet.image.getX() - self.mob.sprite.getX() >= -5 &&
                self.bullet.image.getX() - self.mob.sprite.getX() <= 5 &&
                self.bullet.image.getY() - self.mob.sprite.getY() >= -5 &&
                self.bullet.image.getY() - self.mob.sprite.getY() <= 5) {
                    self.mob.hp -= self.damage; //damage mob
                    if (self.mob.hp <= 0) {
                        self.mob = null;
                        self.shootingAnim.stop();
                    } //if mob is dead free tower
                    self.bullet.restore();
                    self.bulletAnim.stop();
            }
        }
    }, towersLayer);
    
    towersLayer.add(this.circle);
    towersLayer.add(this.image);
    towersLayer.add(this.up);
    towersLayer.add(this.sale);
    towersLayer.draw();

    this.image.on('click tap', function() { //event for click to crystal
        for (var i = 0; i < towersArray.length; i++) {
            towersArray[i].up.hide();
            towersArray[i].sale.hide();
            towersArray[i].circle.hide();
        }

        playSprite('towerBuild',30);
        self.circle.show();
        self.up.show();
        self.sale.show();
        towersLayer.draw();
    });
    this.sale.on('click tap', function() { //event for click to sale crystal image
        goldCounter = goldCounter + Math.round(self.cost * self.level/2);
        goldDisplay.setText(goldCounter);
        for (var i = 0; i < towersArray.length; i++) {
            if (self.x == towersArray[i].x) {
                towersArray.splice(i,1);
                break;
            }
        }
        playSprite('moneyLong');
        self.destroy();
        rightPanelLayer.draw();
    });
    this.up.on('click tap', function() { //event for click to up crystal lvl image
        var lvlCost = self.level * self.cost * 0.8;
        if (goldCounter >= lvlCost) {
            goldCounter = goldCounter - lvlCost;
            self.level++;
            if (self.type == 'redCrystal') {
                self.damageInterval *= 0.9;
                self.damage = self.damage * 1.1;
            } else {
                self.damage = self.damage * 1.3;
            }
            goldDisplay.setText(goldCounter);
            displayErrors('Кристал улучшен до ' + self.level + ' уровня!');
            rightPanelLayer.draw();
            towersLayer.draw();
            playSprite('upTowerLevel');
        } else {
            playSprite('note');
            displayErrors('Недостаточно золота!');
        }
    });
}

function Puddle(x, y, image, type, damage, cost, radius) {
    var self = this;
    var lastTime = 0;

    this.x = x * cellSize;
    this.y = y * cellSize;
    this.type = type;
    this.damage = damage;
    this.radius = radius || 32;
    this.cost = cost;
    this.image = new Kinetic.Image({
        x: x * cellSize,
        y: y * cellSize,
        image: image,
        width: 30,
        height: 30
    });
    towersLayer.add(this.image);
}

var beingConstructedRect = new Kinetic.Rect({ //rectangle of building tower
    x: 0,
    y: 0,
    width: cellSize,
    height: cellSize,
    fill: 'green',
    stroke: 'black',
    opacity: 0.7,
    strokeWidth: 2,
    visible: false
});
var beingConstructedTower = new Kinetic.Image({ //building tower image
    x: 0,
    y: 0,
    image: images.towerFoundation,
    width: cellSize+8,
    height: cellSize+8,
    visible: false
});
var beingConstructedCrystal = new Kinetic.Image({ //building crystal image
    x: 0,
    y: 0,
    image: images.crystals,
    crop: [0, 0, 32, 32],
    width: cellSize,
    height: cellSize,
    visible: false
});

/* ------------------------------------------------------------------------*/


/** ----------------------------Monster var--------------------------------*/
var monsterArray = new Array();
var waveCharacteris = [

    [{name: "wave1", hp: 60, frameRate: 4, cost: 5, type: 'ground'}],
    [{name: "wave2", hp: 90, frameRate: 4, cost: 6, type: 'ground'}],
    [{name: "wave3", hp: 130, frameRate: 4, cost: 8, type: 'ground'}],
    [{name: "wave4", hp: 155, frameRate: 4, cost: 8, type: 'fly'}],
    [{name: "wave5", hp: 200, frameRate: 4, cost: 9, type: 'ground'}],
    [{name: "wave6", hp: 230, frameRate: 4, cost: 10, type: 'ground'}],
    [{name: "wave7", hp: 270, frameRate: 4, cost: 10, type: 'ground'}],
    [{name: "wave8", hp: 320, frameRate: 4, cost: 13, type: 'ground'}],
    [{name: "wave9", hp: 400, frameRate: 4, cost: 14, type: 'fly'}],
    [{name: "wave10", hp: 510, frameRate: 4, cost: 15, type: 'ground'}]
];
var currentMonster = 0;
var currentMobWave = 1;
var wavesCount = 10;
var aminationMob = [
    [{x: 0,y: 0, width: 17, height: 26},{x: 0,y: 28, width: 17, height: 26}],
    [{x: 62,y: 0, width: 15, height: 25},{x: 62,y: 28, width: 15, height: 25}],
    [{x: 79,y: 0, width: 17, height: 26},{x: 79,y: 28, width: 17, height: 25}],
    [{x: 20,y: 0, width: 21, height: 13},{x: 20,y: 28, width: 21, height: 13}],
    [{x: 41,y: 0, width: 19, height: 26},{x: 41,y: 28, width: 15, height: 26}],
    [{x: 0,y: 0, width: 17, height: 26},{x: 0,y: 28, width: 17, height: 26}],
    [{x: 62,y: 0, width: 15, height: 25},{x: 62,y: 28, width: 15, height: 25}],
    [{x: 79,y: 0, width: 17, height: 26},{x: 79,y: 28, width: 17, height: 25}],
    [{x: 20,y: 0, width: 21, height: 13},{x: 20,y: 28, width: 21, height: 13}],
    [{x: 41,y: 0, width: 19, height: 26},{x: 41,y: 28, width: 15, height: 26}]
];
/* ------------------------------------------------------------------------*/

/**-----------------------Counters vars-------------------------------------*/
var goldCounter = 100;
var hpCounter = 10;
/*--------------------------------------------------------------------------*/

/**-----------------------------Text vars-----------------------------*/
var goldDisplay = new Kinetic.Text({
    x: 24*cellSize-5,
    y: 2*cellSize+10,
    text: '100',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var healthPoints = new Kinetic.Text({
    x: 23*cellSize+12,
    y: cellSize+8,
    text: '10',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var waveNumber = new Kinetic.Text({
    x: 24 * cellSize,
    y: cellSize + 8,
    text: '1/10',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var errorMessage = new Kinetic.Text({
    x: 8 * cellSize,
    y: cellSize + 8,
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'yellow'
});

/*-------------------------------------------------------------------------*/

/** ----------------------------Need for run the game----------------------*/
var stage = new Kinetic.Stage({
    container: 'game',
    width: (widthCellCount+4)*cellSize,
    height: heightCellCount*cellSize
});

var bgLayer = new Kinetic.Layer();
var towersAuraLayer = new Kinetic.Layer();
var towersLayer = new Kinetic.Layer();
var rightPanelLayer = new Kinetic.Layer();
var monstersLayer = new Kinetic.Layer();
var basesLayer = new Kinetic.Layer();
var popupLayer = new Kinetic.Layer();

function afterBgCreating() { //run, after background is creating
    var rightPanel = new Kinetic.Image({
        x: 22*cellSize,
        y: 0,
        image: images.rightPanel,
        width: 128,
        height: 480
    });
    bgLayer.add(beingConstructedRect);
    bgLayer.add(beingConstructedTower);
    bgLayer.add(beingConstructedCrystal);
    rightPanelLayer.add(rightPanel);
    rightPanelLayer.add(goldDisplay);
    rightPanelLayer.add(healthPoints);
    rightPanelLayer.add(waveNumber);
    rightPanelLayer.add(errorMessage);

    buildTowersMenu();
    buildBases();

    stage.add(bgLayer);
    stage.add(rightPanelLayer);
    stage.add(towersAuraLayer);
    stage.add(towersLayer);
    stage.add(monstersLayer);
    stage.add(basesLayer);
    stage.add(popupLayer);

}

function gameOver() {
    mobAnim.stop();
    stopMusic('gameMusic');
    var mainBlock = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 840,
        height: 480,
        stroke: 'white',
        strokeWidth: 10,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, 480],
        fillLinearGradientColorStops: [0, 'white', 1, 'black']
      });
    var restartBlock = new Kinetic.Rect({
        x: stage.getWidth() / 2 - 60,
        y: stage.getHeight() / 2 + 50,
        width: 120,
        height: 30,
        fill: 'white',
        stroke: 'gray',
        strokeWidth: 4
      });
    var mainText = new Kinetic.Text({
        x: stage.getWidth() / 2 - 130,
        y: stage.getHeight() / 2 - 60,
        text: 'Game Over',
        fontSize: 60,
        fontFamily: 'Calibri',
        fill: 'white'
      });
    var restartText = new Kinetic.Text({
        x: stage.getWidth() / 2 - 30,
        y: stage.getHeight() / 2 + 53,
        text: 'Рестарт',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black'
      });
    popupLayer.add(mainBlock);
    popupLayer.add(restartBlock);
    popupLayer.add(mainText);
    popupLayer.add(restartText);
    popupLayer.draw();
    restartBlock.on('click tap', function() {
        location = '';
    });
    restartText.on('click tap', function() {
        location = '';
    });
}

function gameVictory() {
    mobAnim.stop();
    stopMusic('gameMusic');
    var victoryMainBlock = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 840,
        height: 480,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, 480],
        fillLinearGradientColorStops: [0, 'white', 1, 'green'],
        stroke: 'white',
        strokeWidth: 10
      });
    var nextLevelBlock = new Kinetic.Rect({
        x: stage.getWidth() / 2 - 110,
        y: stage.getHeight() / 2 + 50,
        width: 210,
        height: 30,
        fill: 'white',
        stroke: 'gray',
        strokeWidth: 4
      });
    var victoryMainText = new Kinetic.Text({
        x: stage.getWidth() / 2 - 110,
        y: stage.getHeight() / 2 - 60,
        text: 'Победа!',
        fontSize: 60,
        fontFamily: 'Calibri',
        fill: 'black'
      });
    var nextLevelText = new Kinetic.Text({
        x: stage.getWidth() / 2 - 85,
        y: stage.getHeight() / 2 + 53,
        text: 'Следующая карта',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black'
      });
    popupLayer.add(victoryMainBlock);
    popupLayer.add(nextLevelBlock);
    popupLayer.add(victoryMainText);
    popupLayer.add(nextLevelText);
    popupLayer.draw();
}

// Wave info before mobs are run
var waveText = new Kinetic.Text({
    x: 0,
    y: stage.getHeight()/2 - 35,
    text: '',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'White',
    fillLinearGradientStartPoint: [1, 100],
    shadowColor: 'yellow',
    shadowBlur: 5,
    shadowOffset: [5, 5],
    shadowOpacity: 0.8,
    visible: false
});
basesLayer.add(waveText);
var waveTween = new Kinetic.Tween({
    x: stage.getWidth()/2 - 150,
    y: stage.getHeight()/2 - 35,
    node: waveText,
    duration: 4,
    easing: Kinetic.Easings.BackEaseOut,
    onFinish: function() {
        waveText.hide();
        this.reset();
    }
});
function runWaveInfo() { // run string animation with wave info
    waveText.setText('Волна ' + currentMobWave  + ' приближается...');
    waveText.show();
    waveTween.play();
}

function startGame(){
    buildBackground(map1);

    buidPath();

    setTimeout(afterBgCreating, 100);
    setTimeout(runWaveInfo, 2000);
    setTimeout(function() {spawnMonster(0)}, 4000);
    mobAnim.start();
	
    setVolume('gameMusic', 50);
    playBackgroundMusic('gameMusic');
}
/* ------------------------------------------------------------------------*/


/***************************************************************************/
/** ----------------------------Monster processing-------------------------*/

var mobAnim = new Kinetic.Animation(function(frame) {
    for(var i = 0; i < monsterArray.length; i++) {
        monsterArray[i].applyBehaviors(monsterArray,path);
        if(monsterArray[i].run())
        {
            monsterArray[i].sprite.remove();
            monsterArray.splice(i,1);
            hpCounter--;
            healthPoints.setText(hpCounter);
            rightPanelLayer.draw();
            if (hpCounter <= 0) {
                gameOver();
            }
        }
    }
    if (currentMobWave >= wavesCount && monsterArray.length == 0) {
        gameVictory();
    }
}, monstersLayer);

function spawnMonster(currentWave){
    currentMonster++;
    var maxspeed = 0.5/*Math.random()*0.5 + 0.1*/;
    var maxforce = 0.02;
    var x = pathCells[0].x * cellSize + cellSize/2 + (Math.random()*cellSize - cellSize/2);
    var y = pathCells[0].y * cellSize + cellSize/2 + (Math.random()*cellSize - cellSize/2);
    monsterArray.push(new Monster(new PVector(x,y),maxspeed,maxforce,pathCells[pathCells.length-1],images.monsterImg, aminationMob,currentWave));
    if(currentMonster < 20) {
        setTimeout(function(){
            spawnMonster(currentWave)
        }, Math.random()*1000 + 1000);
    }else {
        if(currentWave < 10){
            currentMonster=0;
            currentWave++;
            setTimeout(runWaveInfo, 19000);
            currentMobWave++;
            setTimeout(function(){
                playSprite('newWave');
                if(waveCharacteris[currentWave][0].type === "fly"){
                    setTimeout(function(){playSprite("flyMonster");},2500);
                }
                spawnMonster(currentWave);
                waveNumber.setText(currentMobWave + '/' + wavesCount);
                rightPanelLayer.draw();
            },23000);
        }
    }

}
/* -----------------------------Monster processing-------------------------*/




/***************************************************************************/
/**---------------------------Events---------------------------------------*/
bgLayer.on('mousemove touchmove', function(){
    var mousePos = stage.getPointerPosition()? stage.getPointerPosition() : stage.getMousePosition();
    var mouseX = parseInt(mousePos.x/cellSize);
    var mouseY = parseInt(mousePos.y/cellSize);
    if (isBuildingFoundation) {
        for (var i = 0; i < busyCells.length; i++) {
            if ((busyCells[i].x != mouseX) || (busyCells[i].y != mouseY)) {
                beingConstructedRect.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    fill: "green",
                    visible: true
                });
                beingConstructedTower.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    visible: true
                });
            } else {
                beingConstructedRect.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    fill: "red"
                });
                beingConstructedTower.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize
                });
                break;
            }
        }
    }
    if (isBuildingCrystal) {
        beingConstructedCrystal.setAttrs({
            x: mouseX*cellSize,
            y: mouseY*cellSize,
            visible: true
        });
    }
    if (isBuildingPuddle) {
            beingConstructedCrystal.setAttrs({
                x: mouseX*cellSize,
                y: mouseY*cellSize,
                visible: true
            });
    }
    bgLayer.draw();
});
towersAuraLayer.on('mousemove touchmove', function(){
    var mousePos = stage.getPointerPosition()? stage.getPointerPosition() : stage.getMousePosition();
    var mouseX = parseInt(mousePos.x/cellSize);
    var mouseY = parseInt(mousePos.y/cellSize);
    if (isBuildingFoundation) {
        for (var i = 0; i < busyCells.length; i++) {
            if ((busyCells[i].x != mouseX) || (busyCells[i].y != mouseY)) {
                beingConstructedRect.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    fill: "green",
                    visible: true
                });
                beingConstructedTower.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    visible: true
                });
            } else {
                beingConstructedRect.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize,
                    fill: "red"
                });
                beingConstructedTower.setAttrs({
                    x: mouseX*cellSize,
                    y: mouseY*cellSize
                });
                break;
            }
        }
    }
    if (isBuildingCrystal) {
        beingConstructedCrystal.setAttrs({
            x: mouseX*cellSize,
            y: mouseY*cellSize,
            visible: true
        });
    }
    towersAuraLayer.draw();
    bgLayer.draw();
});
bgLayer.on('mouseup touchend', function(){
    var mousePos = stage.getPointerPosition()? stage.getPointerPosition() : stage.getMousePosition();
    var mouseX = parseInt(mousePos.x / cellSize);
    var mouseY = parseInt(mousePos.y / cellSize);
    if (isBuildingFoundation) {
        if (beingConstructedRect.attrs.fill != 'red') {
            if (towerType == 'foundation') {
                var newFoundationTower = new Foundation(images.towerFoundation, mouseX, mouseY, 40, 40);
                    goldCounter = goldCounter - 10;
                    goldDisplay.setText(goldCounter);
                    rightPanelLayer.draw();
                foundationsArray.push(newFoundationTower);
                busyCells.push({x: mouseX, y: mouseY}); //add tower rectangle to busy cells array

                beingConstructedRect.hide();
                beingConstructedTower.hide();
                isBuildingFoundation = false;
                beingConstructedCrystal.moveToTop(); //draw being constructed crystal over foundation
                playSprite('towerBuild',60);
            }
        } else { //if place is busy
            playSprite('note');
            beingConstructedRect.hide();
            beingConstructedTower.hide();
            isBuildingFoundation = false;
        }
    }
    if (isBuildingCrystal) { //if crystal is not on towerFoundation hide it
        playSprite('note');
        beingConstructedCrystal.hide();
        isBuildingCrystal = false;
    }
    for (var i = 0; i < towersArray.length; i++) {
        towersArray[i].up.hide();
        towersArray[i].sale.hide();
        towersArray[i].circle.hide();
    }
    bgLayer.draw();
    towersLayer.draw();
});
towersAuraLayer.on('mouseup touchend', function(){
    var mousePos = stage.getPointerPosition()? stage.getPointerPosition() : stage.getMousePosition();
    var mouseX = parseInt(mousePos.x / cellSize);
    var mouseY = parseInt(mousePos.y / cellSize);
    if (isBuildingFoundation) {
        if (beingConstructedRect.attrs.fill != 'red') {
            if (towerType == 'foundation') {
                var newFoundationTower = new Foundation(images.towerFoundation, mouseX, mouseY, 40, 40);
                    goldCounter = goldCounter - 10;
                    goldDisplay.setText(goldCounter);
                    rightPanelLayer.draw();
                foundationsArray.push(newFoundationTower);
                busyCells.push({x: mouseX, y: mouseY}); //add tower rectangle to busy cells array

                beingConstructedRect.hide();
                beingConstructedTower.hide();
                isBuildingFoundation = false;
                beingConstructedCrystal.moveToTop(); //draw being constructed crystal over foundation
            }
        } else { //if place is busy
            beingConstructedRect.hide();
            beingConstructedTower.hide();
            isBuildingFoundation = false;
        }
    }
    if (isBuildingCrystal) {
        for (var i = 0; i < foundationsArray.length; i++) {
            if (foundationsArray[i].x == mouseX && foundationsArray[i].y == mouseY && !foundationsArray[i].complete) {
                switch(towerType) {
                    case 'redCrystal':
                        var newTower = new Crystal(mouseX, mouseY, 'redCrystal', 15, redCrystalCost, 60, 64, 30, 1500);
                            goldCounter = goldCounter - redCrystalCost;
                            goldDisplay.setText(goldCounter);
                            rightPanelLayer.draw();
                        break;
                    case 'blueCrystal':
                        var newTower = new Crystal(mouseX, mouseY, 'blueCrystal', 20, blueCrystalCost, 65, 32, 15, 1000);
                            goldCounter = goldCounter - blueCrystalCost;
                            goldDisplay.setText(goldCounter);
                            rightPanelLayer.draw();
                        break;
                    case 'greenCrystal':
                        var newTower = new Crystal(mouseX, mouseY, 'greenCrystal', 10, greenCrystalCost, 80, 0, 0, 500);
                            goldCounter = goldCounter - greenCrystalCost;
                            goldDisplay.setText(goldCounter);
                            rightPanelLayer.draw();
                        break;
                    default: break;
                }
                towersArray.push(newTower);

                beingConstructedCrystal.hide();
                isBuildingCrystal = false;
                break;
            }
        }
        beingConstructedCrystal.hide();
        isBuildingCrystal = false;
    }
    towersAuraLayer.draw();
    towersLayer.draw();
    bgLayer.draw();
});
beingConstructedCrystal.on('mouseup touchend', function(){ //event for crystal put to foundation
        var mousePos = stage.getPointerPosition()? stage.getPointerPosition() : stage.getMousePosition();
        var mouseX = parseInt(mousePos.x / cellSize);
        var mouseY = parseInt(mousePos.y / cellSize);
        if (isBuildingCrystal) {
            for (var i = 0; i < foundationsArray.length; i++) {
                if (foundationsArray[i].x == mouseX && foundationsArray[i].y == mouseY && !foundationsArray[i].complete) {
                    switch(towerType) {
                        case 'redCrystal':
                            var newTower = new Crystal(mouseX, mouseY, 'redCrystal', 10, redCrystalCost, 60, 64, 30, 1500);
                                goldCounter = goldCounter - redCrystalCost;
                                goldDisplay.setText(goldCounter);
                                rightPanelLayer.draw();

                            break;
                        case 'blueCrystal':
                            var newTower = new Crystal(mouseX, mouseY, 'blueCrystal', 20, blueCrystalCost, 65, 32, 15, 1200);
                                goldCounter = goldCounter - blueCrystalCost;
                                goldDisplay.setText(goldCounter);
                                rightPanelLayer.draw();
                            break;
                        case 'greenCrystal':
                            var newTower = new Crystal(mouseX, mouseY, 'greenCrystal', 10, greenCrystalCost, 80, 0, 0, 500);
                                goldCounter = goldCounter - greenCrystalCost;
                                goldDisplay.setText(goldCounter);
                                rightPanelLayer.draw();
                            break;
                        default: break;
                    }
                    playSprite('crystalDing');
                    towersArray.push(newTower);

                    beingConstructedCrystal.hide();
                    isBuildingCrystal = false;
                    break;
                }
            }
            beingConstructedCrystal.hide();
            isBuildingCrystal = false;
        }
        if (isBuildingPuddle) {
            for (var i = 0; i < busyCells.length; i++) {
                if ((busyCells[i].x == mouseX && busyCells[i].type == 6) && (busyCells[i].y == mouseY && busyCells[i].type == 6)) {
                    switch (towerType) {
                        case 'bluePuddle':
                            var newTower = new Puddle(mouseX, mouseY, images.puddle_blue, 'bluePuddle', 0, bluePuddleCost, 32);
                            goldCounter = goldCounter - bluePuddleCost;
                            goldDisplay.setText(goldCounter);
                            rightPanelLayer.draw();
                            break;
                        case 'greenPuddle':
                            var newTower = new Puddle(mouseX, mouseY, images.puddle_green, 'greenPuddle', 10, greenPuddleCost, 32);
                            goldCounter = goldCounter - greenPuddleCost;
                            goldDisplay.setText(goldCounter);
                            rightPanelLayer.draw();
                            break;
                    }
                    beingConstructedCrystal.hide();
                    isBuildingPuddle = false;
                }
            }
            beingConstructedCrystal.hide();
            isBuildingPuddle = false;
        }
        towersLayer.draw();
});

/* ----------------------------Tower processing----------------------------*/



/***************************************************************************/
/** ----------------------------Map processing-----------------------------*/
function buildBackground(map) { //draw background
    for (var i = 0; i < heightCellCount; i++) {
        for (var j = 0; j < widthCellCount; j++) {
            var tile = new Kinetic.Image({
                x: j*cellSize,
                y: i*cellSize,
                image: images.bgSprite,
                width: cellSize,
                height: cellSize,
                crop: [(map[i][j].x-1)*cellSize, (map[i][j].y-1)*cellSize, cellSize, cellSize]
            });
            backgroundImageArray.push(tile);

            if (map[i][j].busy == 1) { //define the occupied space
                busyCells.push({x: j, y: i, type: map[i][j].TileType});
            }
        }
    }
    // add tiles to the layer
    for (var i=0; i < backgroundImageArray.length; i++) {
        bgLayer.add(backgroundImageArray[i]);
        delete backgroundImageArray[i]; //clean bgImage array
    }
    stage.add(bgLayer);
}

function buildTowersMenu() { //draw menu with towers
    var towerFoundationIco = new Kinetic.Image({
        x: 23*cellSize,
        y: 6*cellSize,
        image: images.crystalsIcons,
        crop: [0, 0, cellSize, cellSize],
        width: cellSize,
        height: cellSize
    });
    var puddleBlueIco = new Kinetic.Image({
        x: 23*cellSize,
        y: 7*cellSize,
        image: images.crystalsIcons,
        crop: [32, 0, cellSize, cellSize],
        width: cellSize,
        height: cellSize
    });
    var puddleGreenIco = new Kinetic.Image({
        x: 23*cellSize,
        y: 8*cellSize,
        image: images.crystalsIcons,
        crop: [64, 0, cellSize, cellSize],
        width: cellSize,
        height: cellSize
    });
    var crystalGreenIco = new Kinetic.Image({
        x: 24*cellSize,
        y: 6*cellSize,
        image: images.crystalsIcons,
        crop: [96, 0, cellSize, cellSize],
        width: cellSize,
        height: cellSize
    });
    var crystalBlueIco = new Kinetic.Image({
        x: 24*cellSize,
        y: 7*cellSize,
        image: images.crystalsIcons,
        crop: [128, 0, cellSize, cellSize],
        width: cellSize,
        height: cellSize
    });
    var crystalRedIco = new Kinetic.Image({
        x: 24*cellSize,
        y: 8*cellSize,
        image: images.crystalsIcons,
        crop: [160, 0, cellSize, cellSize],
        width: cellSize,
        height: cellSize
    });
    rightPanelLayer.add(towerFoundationIco);
    rightPanelLayer.add(puddleBlueIco);
    rightPanelLayer.add(puddleGreenIco);
    rightPanelLayer.add(crystalGreenIco);
    rightPanelLayer.add(crystalBlueIco);
    rightPanelLayer.add(crystalRedIco);

    /* Towers menu events */
    towerFoundationIco.on('mousedown touchstart',  function() {
        if (goldCounter >= towerFoundationCost) {
            playSprite('towerClicked',10);
            isBuildingFoundation = true;
            towerType = 'foundation';
            beingConstructedTower.setAttrs({
                image: images.towerFoundation
            });
        } else {
            playSprite('moneyLong');
            displayErrors("Недостаточно золота!");
        }
    });
    crystalBlueIco.on('mousedown touchstart',  function() {
        if (goldCounter >= blueCrystalCost) {
            playSprite('crystalDing');
            isBuildingCrystal = true;
            towerType = 'blueCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.crystals
            });
            beingConstructedCrystal.setCrop([32, 0, 32, 32]);
        } else {
            playSprite('moneyLong');
            displayErrors("Недостаточно золота!");
        }
    });
    crystalGreenIco.on('mousedown touchstart',  function() {
        if (goldCounter >= greenCrystalCost) {
            playSprite('crystalDing');
            isBuildingCrystal = true;
            towerType = 'greenCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.crystals
            });
            beingConstructedCrystal.setCrop([0, 0, 32, 32]);
        } else {
            playSprite('moneyLong');
            displayErrors("Недостаточно золота!");
        }
    });
    crystalRedIco.on('mousedown touchstart',  function() {
        if (goldCounter >= greenCrystalCost) {
            playSprite('crystalDing');
            isBuildingCrystal = true;
            towerType = 'redCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.crystals
            });
            beingConstructedCrystal.setCrop([64, 0, 32, 32]);
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    puddleBlueIco.on('mousedown touchstart',  function() {
        if (goldCounter >= bluePuddleCost) {
            isBuildingPuddle = true;
            playSprite('crystalDing');
            towerType = 'bluePuddle';
            beingConstructedCrystal.setAttrs({
                image: images.puddle_blue
            });
        } else {
            playSprite('moneyLong');
            displayErrors("Недостаточно золота!");
        }
    });
    puddleGreenIco.on('mousedown touchstart',  function() {
        if (goldCounter >= greenCrystalCost) {
            isBuildingPuddle = true;
            playSprite('crystalDing');
            towerType = 'greenPuddle';
            beingConstructedCrystal.setAttrs({
                image: images.puddle_green
            });
        } else {
            playSprite('moneyLong');
            displayErrors("Недостаточно золота!");
        }
    });
}

function buildBases() { //draw enemy's home and our home
    var enemyBase = new Kinetic.Image({
        x: 3*cellSize,
        y: 2.5*cellSize,
        image: images.enemyBase,
        width: 80,
        height: 80
    });
    var ourBase = new Kinetic.Image({
        x: 16.5*cellSize,
        y: 11*cellSize,
        image: images.ourBase,
        width: 80,
        height: 90
    });
    basesLayer.add(enemyBase);
    basesLayer.add(ourBase);
}

function displayErrors(text) { //display errors
    errorMessage.setText(text);
    setTimeout(cleanErrorMessages, 1000);
    rightPanelLayer.draw();
}

function cleanErrorMessages() { //clean errors
    errorMessage.setText("");
    rightPanelLayer.draw();
}



function buidPath() {

    path = new Path();

    for(var i = 0; i < pathCells.length; i++) {
        path.addPoint(pathCells[i].x*cellSize + cellSize/2,pathCells[i].y*cellSize + cellSize/2);
    }

    path.createLine();

    /*path.addPoint(offset,offset);
     path.addPoint(width-offset,offset);
     path.addPoint(width-offset,height-offset);
     path.addPoint(width/2,height-offset*3);
     path.addPoint(offset,height-offset);*/

}
/* -----------------------------Map processing-----------------------------*/

/***************************************************************************/
/** ----------------------------Sound processing---------------------------*/
function playBackgroundMusic(audioId){
    playLoop(audioId);
}

function setVolume(audioId, volume){
    var audio = document.getElementById(audioId);
    audio.volume = volume/100;
}

function playLoop(audioId){
    var myAudio = document.getElementById(audioId);
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();
}

function stopMusic(audioId){
    var myAudio = document.getElementById(audioId);
    myAudio.pause();
    myAudio.currentTime = 0;
}

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
        start: 8.5,
        length: 1.5
    },
    buttonHover: {
        start: 10.8,
        length: 0.2
    },
    buttonClick: {
        start: 11.0,
        length: 2.0
    },
    newWave: {
        start: 14.0,
        length: 2.5
    },
    flyMonster: {
        start: 16.8,
        length: 1.0
    },
    towerClicked: {
        start: 18.6,
        length: 0.4
    },
    towerBuild: {
        start: 19.6,
        length: 0.5
    },
    moneyLong: {
        start: 20.5,
        length: 0.8
    },
    moneyShot: {
        start: 21.7,
        length: 0.7
    },
    note: {
        start: 22.7,
        length: 0.8
    },
    crystalDing: {
        start: 24.1,
        length: 0.5
    },
    upTowerLevel: {
        start: 24.9,
        length: 0.8
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

var playSprite = function(id,volume) {          //play sprite according to the id
    if (spriteData[id] && spriteData[id].length) {
        currentSprite = spriteData[id];
        audioSprite.currentTime = currentSprite.start;
        var volume = volume || 100;
        setVolume('effects',volume);
        audioSprite.play();
    }
};
