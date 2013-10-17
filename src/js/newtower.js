var images = {};
var sources = {
    bg: "../images/levelbg1.png",
    monsterImg: "../images/monster.png",
    flameTowerIco: "../images/flame_tower_ico.png",
    frostTowerIco: "../images/frost_tower_ico.png",
    flameTower: "../images/flame_tower.png",
    frostTower: "../images/frost_tower.png",
    buildClosed: "../images/closed.png",
    flameTowerRed: "../images/flame_tower_red.png",
    frostTowerRed:  "../images/frost_tower_red.png"
};

for(var src in sources) {
    images[src] = new Image();
    images[src].src = sources[src];
}

var animations = {
    goRight: [{
        x: 0,
        y: 130,
        width: 47,
        height: 60
    }, {
        x: 47,
        y: 130,
        width: 47,
        height: 60
    }, {
        x: 96,
        y: 130,
        width: 44,
        height: 60
    }, {
        x: 143,
        y: 130,
        width: 48,
        height: 60
    }],
    goTop: [{
        x: 2,
        y: 138,
        width: 74,
        height: 122
    }, {
        x: 76,
        y: 138,
        width: 84,
        height: 122
    }, {
        x: 346,
        y: 138,
        width: 120,
        height: 122
    }]
};

var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 400
});
var layer = new Kinetic.Layer();

var kBg = new Kinetic.Image({x: 0 , y: 0, image: images.bg, width: images.bg.width, height: images.bg.height});

var monster = new Kinetic.Sprite({
    x: 0,
    y: 170,
    image: images.monsterImg,
    animation: 'goRight',
    animations: animations,
    frameRate: 6,
    index: 0
});

var pathCoordinates = [ // path coordinates, way for monsters
    [80, 170],  //0
    [80,50],    //1
    [200,50],   //2
    [200,215],  //3
    [360,215],  //4
    [360,130],  //5
    [550,130]   //6
];

gameStart();

function gameStart(){
    layer.add(kBg);
    layer.add(monster);

    stage.add(layer);
    monster.start();

    monsterMove(0);
}

function monsterMove(ii){

    var i = ii;

    new Kinetic.Tween({
        node: monster,
        duration: 1,
        x: pathCoordinates[i][0],
        y: pathCoordinates[i][1],
        onFinish: function(){
            console.log(this.node.attrs['x'], this.node.attrs['y']);

            if(i<pathCoordinates.length-1)  {
                i++;
                monsterMove(i);
            }
        }
    }).play();
}

/*

//function Monster(){
//
//    this.x = 30;
//    this.y = 170;
//    this.monsterImage =  new Kinetic.Sprite({
//        x: this.x,
//        y: this.y,
//        image: images.monsterImg,
//        animation: 'goRight',
//        animations: animations,
//        frameRate: 6,
//        index: 0
//    });
//}


//var monster1 = new Monster();
//    TweenLite.to(monster, 2, {kinetic:{x:200}});

//    kinetic:{rotationDeg:

//    new Kinetic.Tween({
//        node: monster,
//        duration: 1,
//        y: 200,
//        onFinish: function(){
//            console.log(this.node.attrs['x']);
//
//            new Kinetic.Tween({
//                node: monster,
//                duration: 5,
//                x: 500
//            }).play();
//
////            this.node.attrs['x'] = 300;
////            this.play();
//
//        }
//    }).play();

//    new Kinetic.Tween({
//        node: monster,
//        duration: 1,
//        y: 200,
//        onFinish: function(){
//            console.log(this.node.attrs['x']);
//            myfoo(0);
//        }
//    }).play();

//            console.log(this.x);
//            new Kinetic.Tween({
//                node: monster,
//                duration: 5,
//                x: 500
//            }).play();
//            this.x = 500;
//            this.play();
//                console.log(tween.attr('x'));


//    new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: 500
//    }).play();



//    var tween0 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: 200
//    });

//    tween0.play();
//    var tween1 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: 300
//    });
//
//    var tween2 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: 500
//    });
//    tween0.attrs.x =300;
//    tween0.play();




//    monster.transitionTo({
//
//    });

//    TweenLite.to(monster1, 2, {x: 200} );

//    monster.move({
//        x: 400,
//        y: 100,
//        opacity: 1,
//        duration: 4
//    });
//    var amplitude = 150;
//    var period = 2000;
//    var centerX = stage.getWidth() / 2;
//    var anim = new Kinetic.Animation(function(frame) {
//        monster.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
//    }, layer);
//
//    anim.start();

//    var tweens = [];
//    var tweenCounter=1;
//    var pathCount= newPath.length;
//
//    for (var i = 0; i < newPath.length; i++) {
//        var tween = new Kinetic.Tween({
//            node: monster,
//            duration: 5,
//            x: newPath[i],
//            onFinish: function (i) {
//                console.log(newPath[i]);
//                if(tweenCounter !== pathCount){
////                    tweens[tweenCounter].play();
//                    tweenCounter++;
//                }
//            }(i)
//        });
//        tweens.push(tween);
//    }
//    tweens[0].play();

//    var tweens = [];
//    var tweenCounter=1;
//    var pathCount= newPath.length;
//
//    for (var i = 0; i < newPath.length; i++) {
//        var tween = new Kinetic.Tween({
//            node: monster,
//            duration: 5,
//            x: newPath[i],
//            onFinish: function() {
//                console.log(newPath[0]);
//                if(tweenCounter !== pathCount){
//                    tweens[tweenCounter].play();
//                    tweenCounter++;
//                }
//            }
//        });
//        tweens.push(tween);
//    }
//    tweens[0].play();


//    var tweens = [];
//
//    var tween0 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: newPath[0]
//    });
//    var tween1 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: newPath[1]
//    });
//    var tween2 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: newPath[2]
//    });
//    var tween3 = new Kinetic.Tween({
//        node: monster,
//        duration: 5,
//        x: newPath[3]
//    });
//
//    tweens.push(tween0);
//    tweens.push(tween1);
//    tweens.push(tween2);
//    tweens.push(tween3);
//
//    tweens[3].play();






//    var tween = new Kinetic.Tween({
//            node: monster,
//            duration: 5,
//            x: 200,
//            y: 100
//    });
//
//    tween.play();
//
//    for (var i = 0; i < pathCount; i++) {
//        var tween = new Kinetic.Tween({
//            node: monster,
//            duration: 5,
//            x: newPath[i],
//            onFinish: function() {
////                alert("finish");
//                if (tweenCounter !== pathCount) { //Prevent an undefined tween from being played at the
//                    tweens[tweenCounter].play();
//                    tweenCounter++;
//                }
//            }
//        });
//        tweens.push(tween);
//    }
//
//    tweens[0].play();
//
//    var anim = new Kinetic.Animation(function(frame) {
//        monster.move(frame.time / 10000, 50);
//    }, layer);
//
//    anim.start();














//Kinetic.Image({image: src, width: src.width, height: src.height}

//alert("after");
//
//function drawBg(){
//
//}



//
//layer.add(new Kinetic.Image({
//    x: 0,
//    y: 0,
//    image: images.bg,
//    width: 600,
//    height: 400
//}));
//stage.add(layer);

//var imageObj = new Image();
//imageObj.onload = function() {
//    var yoda = new Kinetic.Image({
//        x: 0,
//        y: 0,
//        image: imageObj,
//        width: 600,
//        height: 400
//    });
//
//    // add the shape to the layer
//    layer.add(yoda);
//
//    // add the layer to the stage
//    stage.add(layer);
//};
//imageObj.src = sources.bg;





*/
