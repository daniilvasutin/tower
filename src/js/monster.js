function min(a,b) {
	if(a <+ b)
		return a;
	return b;
}

function max(a,b) {
	if(a >= b)
		return a;
	return b;
}

function Monster(l, ms, mf,target,image,animations,currentWave) {
    var self = this;
    var locat = l;
    var r = 5.0;
    var maxspeed = ms;
    var maxforce = mf;
    var acceleration = new PVector(0, 0);
    var velocity = new PVector(maxspeed, 0);
    var theta = velocity.heading2D() + Math.PI/2;
    var angle_change = false;
    var target_point = target;
    var image = image;
    var frameRate = waveCharacteris[currentWave][0].frameRate;

    this.cost =  waveCharacteris[currentWave][0].cost;
    this.hp = waveCharacteris[currentWave][0].hp;
    this.name = waveCharacteris[currentWave][0].name;

    this.sprite = new Kinetic.Sprite({
        x: 0,
        y: 0,
        image: image,
        animation: currentWave,
        animations: animations,
        frameRate: frameRate,
        index: 0,
        opacity:1
    });

    this.anim = new Kinetic.Animation(function(frame) {
        //damage mobs
        for (var i = 0; i < towersArray.length; i++) {
            var mobPositionRadius = Math.sqrt(Math.pow(towersArray[i].x + cellSize / 2 - self.sprite.attrs.x, 2)
                + Math.pow(towersArray[i].y + cellSize / 2 - self.sprite.attrs.y, 2)); //is mob in tower radius
            if (mobPositionRadius <= towersArray[i].radius) {
                if (towersArray[i].type != 'redCrystal') { //not AOE tower
                    if (towersArray[i].mob == null && self.hp > 0) {
                        towersArray[i].mob = self; //tower sooting in this mob
                        if (towersArray[i].type != 'redCrystal') {
                            towersArray[i].bullet.image.show();
                            towersArray[i].shootingAnim.start();
                        }
                    }
                } else {
                    var isset = false;
                    for (var j = 0; j < towersArray[i].mobsArray.length; j++) {
                        if (towersArray[i].mobsArray[j] == self) {
                            isset = true;
                        }
                    }
                    if (!isset) {
                        towersArray[i].mobsArray.push(self);
                        towersArray[i].aoeDamageAnim.start();
                    }
                }
            } else {
                if (towersArray[i].type != 'redCrystal') {
                    if (towersArray[i].mob == self) { //mob is not in tower radius
                        towersArray[i].mob = null;
                        if (towersArray[i].type != 'redCrystal') {
                            towersArray[i].bullet.restore();
                            towersArray[i].bulletAnim.stop();
                        }
                    }
                } else {
                    for (var j = 0; j < towersArray[i].mobsArray.length; j++) {
                        if (towersArray[i].mobsArray[j] == self) {
                            towersArray[i].mobsArray.splice(j,1);
                        }
                        if (towersArray[i].mobsArray.length == 0) {
                            towersArray[i].aoeDamageAnim.stop();
                        }
                    }
                }
            }
        }
        if (self.hp <= 0) { //if mob is dead, delete it
            self.anim.stop();
            self.sprite.remove();
            goldCounter += self.cost;
            goldDisplay.setText(goldCounter);
            rightPanelLayer.draw();

            for (var i = 0; i < monsterArray.length; i++) {
                if (self.sprite == monsterArray[i].sprite) {
                    monsterArray.splice(i,1);
                    break;
                }
            }
            self = null;
//            currentMonster--; //change number of monster to move
        }
    }, monstersLayer);
    this.anim.start();

    monstersLayer.add(this.sprite);
    this.sprite.start();

/*    this.showAward = function(l, cost) {
        var awardText = new Kinetic.Text({
            x: l.x,
            y: l.y,
            text: '+5',
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'yellow',
            visible: true
        });
        monstersLayer.add(awardText);
        setTimeout(awardText.hide(), 1000);
    }*/

    this.run = function() {
        this.update();
        this.render();
        return this.borders();
    }

    this.update = function() {
        velocity.add(acceleration);
        velocity.limit(maxspeed);

        locat.add(velocity);

        acceleration.mult(0);
    }

    // A function to get the normal point from a point (p) to a line segment (a-b)
    // This function could be optimized to make fewer new Vector objects
    this.getNormalPoint = function(p, a, b) {
        // Vector from a to p
        var ap = PVector.sub(p, a);
        // Vector from a to b
        var ab = PVector.sub(b, a);
        //console.log(p, a, b);
        ab.normalize(); // Normalize the line
        // Project vector "diff" onto line by using the dot product
        ab.mult(ap.dot(ab));
        var normalPoint = PVector.add(a, ab);
        return normalPoint;
    }

    // A function to deal with path following and separation
    this.applyBehaviors = function(vehicles, path) {
        // Follow path force
        var f = this.follow(path);

        // Separate from other boids force
        var s = this.separate(vehicles);
        // Arbitrary weighting
        f.mult(3);
        s.mult(1);
        // Accumulate in acceleration
        this.applyForce(f);
        this.applyForce(s);
    }

    // This function implements Craig Reynolds' path following algorithm
    // http://www.red3d.com/cwr/steer/PathFollow.html
    this.follow = function(p) {

        // Predict location 25 (arbitrary choice) frames ahead
        var predict = velocity.get();
        predict.normalize();
        predict.mult(25);
        var predictLoc = PVector.add(locat, predict);

        var normal = undefined;
        var target = undefined;
        var worldRecord = 1000000;  // Start with a very high record distance that can easily be beaten

        // Loop through all points of the path
        for (var i = 0; i < p.points.length-1; i++) {

            // Look at a line segment
            var a = p.points[i];
            var b = p.points[i+1];

            // Get the normal point to that line
            var normalPoint = this.getNormalPoint(predictLoc, a, b);

            // Check if normal is on line segment
            var dir = PVector.sub(b, a);

            // If it's not within the line segment, consider the normal to just be the end of the line segment (point b)
            //if (da + db > line.mag()+1) {
            if (normalPoint.x < min(a.x,b.x) || normalPoint.x > max(a.x,b.x) || normalPoint.y < min(a.y,b.y) || normalPoint.y > max(a.y,b.y)) {
                normalPoint = b.get();
            }

            // How far away are we from the path?
            var d = PVector.dist(predictLoc, normalPoint);

            // Did we beat the worldRecord and find the closest line segment?
            if (d < worldRecord) {

                worldRecord = d;

                normal = normalPoint;

                // Look at the direction of the line segment so we can seek a little bit ahead of the normal
                dir.normalize();

                // This is an oversimplification
                // Should be based on distance to path & velocity
                dir.mult(25);
                target = normal.get();
                target.add(dir);

            }
        }
        // Draw the debugging stuff
        /*if (debug) {
            // Draw predicted future location
            //ctx.save();
            ctx.beginPath();
            ctx.moveTo(locat.x, locat.y);
            ctx.lineTo(predictLoc.x, predictLoc.y);
            ctx.closePath();
            ctx.stroke();

            /*ctx.beginPath()
            ellipse(predictLoc.x, predictLoc.y, 4, 4);

            // Draw normal location
            ctx.beginPath();
            ctx.arc(normal.x, normal.y, 4, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();


            // Draw actual target (red if steering towards it)
            ctx.beginPath();
            ctx.moveTo(predictLoc.x, predictLoc.y);
            ctx.lineTo(target.x, target.y);
            ctx.closePath();
            ctx.stroke();

            /*if (worldRecord > p.radius) fill(255, 0, 0);
            noStroke();
            ellipse(target.x, target.y, 8, 8);
        }*/

        // Only if the distance is greater than the path's radius do we bother to steer
        if (worldRecord > p.radius - r) {
          return this.seek(target);
        }
        else {
          return new PVector(0, 0);
        }
    }

    this.applyForce = function(force) {
        if(force.x == 0 && force.y == 0) {
            angle_change = true;
            return;
        }
        acceleration.add(force);
    }

    this.separate = function(boids) {
        var desiredseparation = r*2;
        var steer = new PVector(0, 0);
        var count = 0;
        // For every boid in the system, check if it's too close
        for (var i = 0; i < boids.length; i++) {
            var other = boids[i];
            //console.log(locat, other.GetLocation());
            var d = PVector.dist(locat, other.GetLocation());

            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = PVector.sub(locat, other.GetLocation());
                diff.normalize();
                diff.div(d);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(maxspeed);
            steer.sub(velocity);
            steer.limit(maxforce - 0.099);
        }
        return steer;
    }

    this.GetLocation = function() {
        return new PVector(locat.x,locat.y);
    }

    this.seek = function(target) {

        var desired = PVector.sub(target, locat);  // A vector pointing from the location to the target

        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(maxspeed);
        // Steering = Desired minus Velocationity
        var steer = PVector.sub(desired, velocity);
        steer.limit(maxforce);  // Limit to maximum steering force

          return steer;
    }

    this.render = function() {
        this.sprite.setX(locat.x);
        this.sprite.setY(locat.y);
     //   this.awardText.setX(locat.x);
     //   this.awardText.setY(locat.y);
    //    this.poly.setX(locat.x);
    //    this.poly.setY(locat.y);

        if(angle_change) {
            angle_change = false;
            theta = velocity.heading2D() + Math.PI/2;
            this.sprite.setRotation(theta);
        }
    }

    this.borders = function() {
        if ((locat.x > target_point.x * cellSize && locat.x < (target_point.x + 1) * cellSize) && (locat.y > target_point.y * cellSize && locat.y < (target_point.y + 1) * cellSize) )
            return true;
        return false;
        //if (location.y < -r) location.y = height+r;
        //if (locat.x > canvas.width+r) locat.x = -r;
        //if (location.y > height+r) location.y = -r;
    }

}