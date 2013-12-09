/** ----------------------------Game var--------------------------------*/
var images = {};
var sources = {
    bgSprite: "images/sprite_bg.jpg",
    rightPanel: "images/panel.jpg",
    monsterImg: "images/monster.png",
    towerFoundationIco: "images/tower_foundation_ico.jpg",
    crystalsIcons: "images/crystals_icons.jpg",
    crystals: "images/crystals.png",
    towerFoundation: "images/tower_foundation.png",
    enemyBase: "images/enemy_home.png",
    ourBase: "images/our_home.png",
    aura: "images/aura.png",
    saleTower: "images/sale.png",
    upTower: "images/up.png",
    bullets: "images/bullets.png"
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
var pathCells = new Array();  //path cells in map

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
    ];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  //17F
var mapBeginCell1 = {i: 3, j: 5};
var mapEndCell1 = {i: 11, j: 17};
/* ------------------------------------------------------------------------*/

/** ----------------------------Towers var--------------------------------*/
var towerType; //stores the type of tower build
var towersArray = new Array(); //tower objects array
var foundationsArray = new Array(); //tower objects array
var isBuildingFoundation = false; //is the tower foundation now under construction?
var isBuildingCrystal = false; //is the crystal now under construction?
var towerFoundationCost = 10;
var blueCrystalCost = 15; //cost of crystal
var redCrystalCost = 20;
var greenCrystalCost = 25;
var auraAnimation = {lighting: [{x: 0, y: 0, width: 160, height: 168}, {x: 165, y: 0, width: 160, height: 168}, {x: 330, y: 0, width: 160, height: 168}]};

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

function Crystal(x, y, type, damage, cost, radius, crystCropX, bulletCropX, width, height) {
    var self = this;
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
    this.bullet = new Kinetic.Image({
        x: x * cellSize + 16,
        y: y * cellSize + 5,
        image: images.bullets,
        crop: [bulletCropX, 0, 15, 15],
        width: 10,
        height: 10,
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
    this.mob = 0;
    this.destroy = function() {
        self.bulletAnim.stop();
        self.image.remove();
        self.bullet.remove();
        self.sale.remove();
        self.up.remove();
        self.circle.remove();
        self = null;
        towersLayer.draw();
        bgLayer.draw();
    }
    this.bulletAnim = new Kinetic.Animation(function(frame) {
        if (self.mob != 0 && self.bullet.getX() - (self.mob.sprite.attrs.x + 20) < 0) {
            self.bullet.setX(self.bullet.getX() + 2);
        } else if (self.mob != 0 && self.bullet.getX() - (self.mob.sprite.attrs.x + 20) > 3) {
            self.bullet.setX(self.bullet.getX() - 2);
        }
        if (self.mob != 0 && self.bullet.getY() - (self.mob.sprite.attrs.y + 20) < 0) {
            self.bullet.setY(self.bullet.getY() + 2);
        } else if (self.mob != 0 && self.bullet.getY() - (self.mob.sprite.attrs.y + 20) > 3) {
            self.bullet.setY(self.bullet.getY() - 2);
        }
        if (self.mob != 0 && self.bullet.getX() - (self.mob.sprite.attrs.x + 20) >= 0
                             && self.bullet.getX() - (self.mob.sprite.attrs.x + 20) <= 3
                             && self.bullet.getY() - (self.mob.sprite.attrs.y + 20) >= 0
                             && self.bullet.getY() - (self.mob.sprite.attrs.y + 20) <= 3) {
            self.mob.hp -= self.damage; //damage mob
            if (self.mob.hp <= 0) self.mob = 0; //if mob is dead free tower
            this.stop();
            self.bullet.hide();
            self.bullet.setAttrs({x: self.x + 16, y: self.y + 5});
        }
    }, towersLayer);
    towersLayer.add(this.bullet);
    towersLayer.add(this.circle);
    towersLayer.add(this.image);
    towersLayer.add(this.up);
    towersLayer.add(this.sale);
    towersLayer.draw();

    this.image.on('click', function() { //event for click to crystal
        for (var i = 0; i < towersArray.length; i++) {
            towersArray[i].up.hide();
            towersArray[i].sale.hide();
            towersArray[i].circle.hide();
        }
        self.circle.show();
        self.up.show();
        self.sale.show();
        towersLayer.draw();
    });
    this.sale.on('click', function() { //event for click to sale crystal image
        goldCounter = goldCounter + Math.round(self.cost/2);
        goldDisplay.setText(goldCounter);
        for (var i = 0; i < towersArray.length; i++) {
            if (self.x == towersArray[i].x) {
                towersArray.splice(i,1);
                break;
            }
        }
        self.destroy();
        rightPanelLayer.draw();
    });
    this.up.on('click', function() { //event for click to up crystal lvl image
        var lvlCost = self.level * 15;
        if (goldCounter >= lvlCost) {
            goldCounter = goldCounter - lvlCost;
            self.level++;
            self.radius = self.radius + 5;
            self.circle.setAttrs({radius: self.radius});
            goldDisplay.setText(goldCounter);
            rightPanelLayer.draw();
            towersLayer.draw();
        } else {
            displayErrors('Недостаточно золота!');
        }
    });
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
var monsterTweenArray = new Array();
var direction = new Array();
var currentMonster = 0;
var animations = {
    goRight: [{x:0,y:130,width:47,height:60},{x:47,y:130,width:47,height:60},{x:96,y:130,width:44,height:60},{x:143,y:130,width:48,height:60}],
    goTop:   [{x:0,y:195,width:45,height:60},{x:45,y:195,width:47,height:60},{x:95,y:195,width:47,height:60},{x:145,y:195,width:46,height:60}],
    goBottom:[{x:0,y:0,width:45,height:60},{x:45,y:0,width:47,height:60},{x:95,y:0,width:47,height:60},{x:145,y:0,width:46,height: 60}],
    goLeft:  [{x:0,y:65,width:50,height:60},{x:50,y:65,width:50,height:60},{x:100,y:65,width:47,height:60},{x:147,y:65,width:50,height:60}]
};
/* ------------------------------------------------------------------------*/

/**-----------------------Counters vars-------------------------------------*/
var goldCounter = 100;
var hpCounter = 5;
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
    text: '5',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'white'
});
var waveNumber = new Kinetic.Text({
    x: 24 * cellSize,
    y: cellSize + 8,
    text: '1/20',
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
var towersLayer = new Kinetic.Layer();
var rightPanelLayer = new Kinetic.Layer();

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
    stage.add(towersLayer);
}

function playBackgroundMusic(){
    var audio1 = document.getElementById('aTsIwR');
    audio1.volume = 0.2;
    audio1.play();
}

function startGame(){
    buildBackground(map1);
    findPath(map1,mapBeginCell1,mapEndCell1);

    setTimeout(afterBgCreating, 100);
    createMonsters();
    newMonstersMove();

    //playBackgroundMusic();
    //setTimeout(function(){playSprite('monsterA');},3000);
    //setTimeout(function(){playSprite('monsterHa');},25000);

}
/* ------------------------------------------------------------------------*/



/***************************************************************************/
/** ----------------------------Monster processing-------------------------*/

    //v 1.6
function Monster (index,image, x, y, type, hp, name, moveSpeed,frameRate,animations, opacity) {
    var self = this;
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.type = type;
    this.hp = hp;
    this.name = name;
    this.image = image;
    this.animations = animations;
    this.frameRate = frameRate;
    this.moveSpeed = moveSpeed;
    this.sprite = new Kinetic.Sprite({
        x: this.x,
        y: this.y,
        image: this.image,
        animation: 'goRight',
        animations: this.animations,
        frameRate: this.frameRate,
        index: 0,
        opacity:self.opacity
    });
    this.currentStep = 0;
    this.index = index;
    this.anim = new Kinetic.Animation(function(frame) {
        var step = self.moveSpeed * frame.timeDiff / 1000;
        var eps = step+5;
        var nextStep = self.currentStep+1;
        if(self.currentStep < pathCells.length-1){
            if(frame.time < 2000) {
                var op = self.sprite.getOpacity() + 0.02;
                self.sprite.setOpacity(op);
            }
            if(direction[self.currentStep] !== direction[nextStep]){
                self.sprite.setAnimation(direction[nextStep]);
            }
            if(direction[self.currentStep] === "goRight"){
                self.sprite.move(step, 0);
                if(Math.abs(self.sprite.getX() - pathCells[nextStep].j*cellSize) <= eps){
                    self.currentStep++;
                }
            }else if(direction[self.currentStep] === "goBottom"){
                self.sprite.moveUp();
                self.sprite.move(0, step);
                if(Math.abs(self.sprite.getY() - (pathCells[nextStep].i-1)*cellSize) <= eps){
                    self.currentStep++;
                }
            }else if(direction[self.currentStep] === "goLeft" ){
                self.sprite.move((-1)*step, 0);
                if(Math.abs(self.sprite.getX() - pathCells[nextStep].j*cellSize) <= eps){
                    self.currentStep++;
                }
            }else if(direction[self.currentStep] === "goTop" ){
                self.sprite.move(0, (-1)*step);
                if(Math.abs(self.sprite.getY() - (pathCells[nextStep].i-1)*cellSize) <= eps){
                    self.currentStep++;
                }
            }
        }
        //damage mobs
        for (var i = 0; i < towersArray.length; i++) {
            var mobPositionRadius = Math.sqrt(Math.pow(towersArray[i].x + cellSize / 2 - self.sprite.attrs.x, 2)
                                              + Math.pow(towersArray[i].y + cellSize / 2  - self.sprite.attrs.y, 2)); //is mob in tower radius
            if (mobPositionRadius <= towersArray[i].radius) {
                if (towersArray[i].mob == 0) {
                    towersArray[i].mob = self; //tower sooting in this mob
                }
                towersArray[i].bullet.show();
                towersArray[i].bulletAnim.start();
            } else if (towersArray[i].mob == self) { //mob is not in tower radius
                towersArray[i].mob = 0;
                towersArray[i].bullet.hide();
                towersArray[i].bullet.setAttrs({x: towersArray[i].x + 16, y: towersArray[i].y + 5});
            }
        }
        if (self.hp <= 0) { //if mob is dead, delete it
            self.anim.stop();
            self.sprite.remove();
            for (var i = 0; i < monsterArray.length; i++) {
                if (self.sprite == monsterArray[i].sprite) {
                    monsterArray.splice(i,1);
                    break;
                }
            }
            self = null;
            currentMonster--; //change number of monster to move
        } else if (self.currentStep == pathCells.length-3) { //if mob come to our base
            self.anim.stop();
            self.sprite.remove();
            for (var i = 0; i < monsterArray.length; i++) {
                if (self.sprite == monsterArray[i].sprite) {
                    monsterArray.splice(i,1);
                    break;
                }
            }
            self = null;
            currentMonster--; //change number of monster to move
            hpCounter--; //deduct health points
            healthPoints.setText(hpCounter);
            rightPanelLayer.draw();
            if (hpCounter <= 0) { //CHANGE THEM!!!!
                if (confirm("You loose!!! Ahahhaha!!!")) {
                    window.location.reload();
                }
            }
/*                new Kinetic.Tween({
                node: self.sprite,
                duration: 1,
                opacity: 0,
                onFinish: function(){
                    self.sprite.moveToBottom();
                    self.sprite.stop();
                    self.anim.stop();
                    this.destroy();
                }
            }).play();*/
        }
    }, bgLayer);

    bgLayer.add(this.sprite);
    this.sprite.start();
    bgLayer.draw();
}


    //v1.5


function newMonstersMove(){
//    monsterArray[currentMonsterTween].show();
    monsterArray[currentMonster].anim.start();
    currentMonster++;
    if(currentMonster < monsterArray.length) setTimeout(function(){newMonstersMove()}, 2000);
}

function createMonsters(){
    for (var i=0; i < 10; i++) {
        var monster = new Monster(i,images.monsterImg, pathCells[0].j * cellSize, (pathCells[0].i-1) * cellSize, "notype", 100, "EpicTerribleMouse", 35, 6,animations, 1);
        monsterArray.push(monster);
    }
}


function monstersMove(currentMonsterTween){
    var currentMonsterTween = currentMonsterTween || 0;
//    monsterArray[currentMonsterTween].show();
    monsterTweenArray[currentMonsterTween].play();
    currentMonsterTween++;
    if(currentMonsterTween < monsterArray.length) setTimeout(function(){monstersMove(currentMonsterTween)}, 1000);
}
/* -----------------------------Monster processing-------------------------*/




/***************************************************************************/
/**---------------------------Events---------------------------------------*/
bgLayer.on('mousemove', function(){
    var mousePos = stage.getMousePosition();
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
    bgLayer.draw();
});
bgLayer.on('mouseup', function(){
    var mousePos = stage.getMousePosition();
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
    if (isBuildingCrystal) { //if crystal is not on towerFoundation hide it
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
beingConstructedCrystal.on('mouseup', function(){ //event for crystal put to foundation
        var mousePos = stage.getMousePosition();
        var mouseX = parseInt(mousePos.x / cellSize);
        var mouseY = parseInt(mousePos.y / cellSize);
        if (isBuildingCrystal) {
            for (var i = 0; i < foundationsArray.length; i++) {
                if (foundationsArray[i].x == mouseX && foundationsArray[i].y == mouseY && !foundationsArray[i].complete) {
                    switch(towerType) {
                        case 'redCrystal':
                            var newTower = new Crystal(mouseX, mouseY, 'redCrystal', 30, redCrystalCost, 60, 64, 30);
                                goldCounter = goldCounter - redCrystalCost;
                                goldDisplay.setText(goldCounter);
                                rightPanelLayer.draw();
                            break;
                        case 'blueCrystal':
                            var newTower = new Crystal(mouseX, mouseY, 'blueCrystal', 35, blueCrystalCost, 50, 32, 15);
                                goldCounter = goldCounter - blueCrystalCost;
                                goldDisplay.setText(goldCounter);
                                rightPanelLayer.draw();
                            break;
                        case 'greenCrystal':
                            var newTower = new Crystal(mouseX, mouseY, 'greenCrystal', 30, greenCrystalCost, 70, 0, 0);
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
                busyCells.push({x: j, y: i});
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
    towerFoundationIco.on('mousedown',  function() {
        if (goldCounter >= towerFoundationCost) {
            isBuildingFoundation = true;
            towerType = 'foundation';
            beingConstructedTower.setAttrs({
                image: images.towerFoundation
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    crystalBlueIco.on('mousedown',  function() {
        if (goldCounter >= blueCrystalCost) {
            isBuildingCrystal = true;
            towerType = 'blueCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.crystals,
                cropX: 32
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    crystalGreenIco.on('mousedown',  function() {
        if (goldCounter >= greenCrystalCost) {
            isBuildingCrystal = true;
            towerType = 'greenCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.crystals,
                cropX: 0
            });
        } else {
            displayErrors("Недостаточно золота!");
        }
    });
    crystalRedIco.on('mousedown',  function() {
        if (goldCounter >= greenCrystalCost) {
            isBuildingCrystal = true;
            towerType = 'redCrystal';
            beingConstructedCrystal.setAttrs({
                image: images.crystals,
                cropX: 64
            });
        } else {
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
    bgLayer.add(enemyBase);
    bgLayer.add(ourBase);
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

//    console.log(map[indexI][indexJ-1].TileType, map[indexI][indexJ+1].TileType, map[indexI-1][indexJ].TileType, map[indexI+1][indexJ].TileType);

    try{ map[indexI][indexJ+1].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexJ--; }
    if(map[indexI][indexJ+1].TileType == 6 && indexJ+1 !== stepBefore.j){
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
        try{ map[indexI][indexJ-1].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexJ++; }
        if(map[indexI][indexJ-1].TileType == 6 && indexJ-1 !== stepBefore.j){
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
            try{ map[indexI+1][indexJ].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexI--; }
            if(map[indexI+1][indexJ].TileType == 6 && indexI+1 !== stepBefore.i){
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
                try{ map[indexI-1][indexJ].TileType; }catch(e){ stepBefore = { i: ii, j: jj }; indexI++; }
                if(map[indexI-1][indexJ].TileType == 6 && indexI-1 !== stepBefore.i){
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
    delete map1; //!!!!!
    map1 = null;
}
/* -----------------------------Map processing-----------------------------*/


/***************************************************************************/
/** ----------------------------Sound processing---------------------------*/

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
        start: 8.1,
        length: 9.5
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

var playSprite = function(id) {          //play sprite according to the id
    if (spriteData[id] && spriteData[id].length) {
        currentSprite = spriteData[id];
        audioSprite.currentTime = currentSprite.start;
        audioSprite.play();
    }
};
/* ----------------------------Sound processing----------------------------*/
