var xspeed = 0;
var yspeed = 0;

var framecount = 0;

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.history = [];
  this.max_hist = 25;

  this.update = function() {
    // console.log(this.x)
    this.x += this.xspeed;
    this.y += this.yspeed;

    framecount++;
    var v = createVector(this.x, this.y);
    this.history.push(v);

    if (this.history.length > this.max_hist) {
      this.history.splice(0, 1);
    }
  };
  this.show = function() {
    var col = map(this.x, 0, width, 255, 0);
    fill(col);

    ellipse(this.x, this.y, 20);

    for (var i = this.history.length - 1; i > 0; i--) {
      var pos = this.history[i];

      fill(col, i * 5);

      if (framecount % 10 == 0) {
        if (i % 3 == 0) {
          ellipse(pos.x, pos.y, i * 0.8);
        }
      } else {
        if (i % 2 == 0) {
          ellipse(pos.x, pos.y, i * 0.8);
        }
      }
    }
  };
}
