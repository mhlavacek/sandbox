  var 
    geometry = require('./geometry.js'),
    Map = geometry.Map,
    Vector = geometry.Vector,
    SAT = require('sat'),
    augment = require('augment');
  
  var Unit = augment(Object, function() {
    this.constructor = function(position, vector) {      
      this.position = position;
      this.angle = vector.angle;
      this.heading = vector.heading;
      this.speed = 2;
    };
    
    this.move = function(overrideSpeed) {
      var moveSpeed = overrideSpeed || this.speed;
      
      var x = this.position.x - (this.heading.x * moveSpeed);
      var y = this.position.y - (this.heading.y * moveSpeed);
      this.position = {x: x, y: y };
    }
    
    this.rectangle = function(width, height) {        
      this.drawOffset = { x: width / 2, y: height / 2 };
    }
    
    this.update = function() {
      return {
        angle: this.angle,
        drawOffset: this.drawOffset,
        position: this.position,
        speed: this.speed
      };
    }
    
    this.rectangleHitBox = function() {
      var polygon = new SAT.Polygon(
        new SAT.Vector(this.position.x, this.position.y), [
        new SAT.Vector(-this.drawOffset.x, this.drawOffset.y),
        new SAT.Vector(-this.drawOffset.x, -this.drawOffset.y),
        new SAT.Vector(this.drawOffset.x, -this.drawOffset.y),
        new SAT.Vector(this.drawOffset.x, this.drawOffset.y)]
      );
      polygon.rotate(this.angle * (Math.PI / 180));
      return polygon;
    }
  });
  
  module.exports = Unit;