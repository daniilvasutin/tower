var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var drp=false;          // true - если перетаскиваем
var pozx=0; var pozy=0; // координаты начала отображения изображения
var smx=0;   var smy=0;   // координаты мыши - нажали на кнопку
var emx=0;   var emy=0;   // координаты мыши - опустили на кнопку


function drawTower(x, y, w, h) {
	ctx.strokeStyle = "black";
	ctx.strokeRect(x, y, w, h);
	ctx.fillStyle = "blue";
	ctx.fillRect(x, y, w, h);
}

// Событие на нажатие кнопки мыши
canvas.onmousedown= function(e){
    smx=e.clientX;
    smy=e.clientY;
	if (smx > 540 && smx < 590 && smy > 340 && smy < 390) {
		drp=true;
	}
};    
// Событие на опускание кнопки мыши
canvas.onmouseup= function(e){
    drp=false; 
};
 
canvas.onmousemove= function(e){
    if (drp==true){
        emx=e.clientX;
        emy=e.clientY;
        pozx=emx;pozy=emy;
		draw();
        drawTower(pozx,pozy, 50, 50);
    };
    smx=e.clientX;
    smy=e.clientY;    
     
};

function draw() // рисуем на холсте
{
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawTower(540, 340, 50, 50);
	drawTower(485, 340, 50, 50);
}
draw();


