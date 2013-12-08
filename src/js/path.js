function Path() {

// A Path is line between two points (PVector objects)
this.points = [];
//this.start = new PVector(0,canvas.height/3);
//this.end = new PVector(canvas.width,2*canvas.height/3);
// A path has a radius, i.e how far is it ok for the boid to wander off
this.radius = 15;

this.addPoint = function(x, y) {
	var point = new PVector(x,y);
	this.points.push(point);
}

this.createLine = function() {
	var pointArr = [];
	for(var i = 0; i < this.points.length; i++)
	{
		pointArr.push(this.points[i].x);
		pointArr.push(this.points[i].y);
	}
	
	var line = new Kinetic.Line({
	points: pointArr,
	stroke: 'black',
	strokeWidth: 1,
	lineCap: 'round',
	lineJoin: 'round'
	});
	
	bgLayer.add(line);
}
// Draw the path
this.display = function() {



	/*ctx.save();

		ctx.lineWidth=this.radius*2;
		ctx.strokeStyle="#aaaaaa";
		ctx.beginPath();
		ctx.moveTo(this.points[0].x,this.points[0].y);
		for(var i = 1; i < this.points.length; i ++)
			ctx.lineTo(this.points[i].x,this.points[i].y);
		ctx.stroke();

		ctx.lineWidth = 1;
		ctx.strokeStyle="#000000";
		ctx.moveTo(0,0);
		ctx.beginPath();
		ctx.moveTo(this.points[0].x,this.points[0].y);
		for(var i = 1; i < this.points.length; i ++)
			ctx.lineTo(this.points[i].x,this.points[i].y);
		ctx.stroke();

	ctx.restore();
	*/
}

}