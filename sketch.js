//simple pong game
//add random speed for y **
//add AI**
//better animations
//add trail to pong ball - TODO
//add win condition(score to win?) **

let font,
  fontsize = 35;

var paddle1 = {
  x: 10,
  y: 300,
  w: 20,
  h: 100,
  r: 20
};

var paddle2 = {
  x: 589,
  y: 300,
  w: 20,
  h: 100,
  r: 20
};

let width = 600;
let height = 600;

var player1 = 0;
var player2 = 0;
var ball;

function setup() {
  createCanvas(width, height);

  textFont();
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  ball = new Ball(300, 300);
  this.ball.xspeed = 0;
  this.ball.yspeed = 0;
}

function draw() {
  background(0);
  push();
  fill(255);
  rectMode(CORNER);
  rect(width / 2, 0, width / 2, height);
  pop();
  ball.show();
  ball.update();

  push();
  textAlign(CENTER);
  drawWords(150);
  pop();

  rectMode(CENTER);
  noStroke();
  push();
  fill(255);
  rect(paddle1.x, paddle1.y, paddle1.w, paddle1.h, paddle1.r);
  pop();
  push();
  fill(0);
  rect(paddle2.x, paddle2.y, paddle2.w, paddle2.h, paddle2.r);
  pop();

  //pong ball

  //if ball touches paddle, reverse direction

  if (
    this.ball.x <= paddle1.x + 15 &&
    this.ball.y >= paddle1.y - 55 &&
    this.ball.y <= paddle1.y + 55
  ) {
    if (this.ball.x < paddle1.x + 15) {
      this.ball.x += 5;
    }
    this.ball.xspeed *= -1.03;
  }
  if (
    this.ball.x > paddle2.x - 15 &&
    this.ball.y >= paddle2.y - 55 &&
    this.ball.y <= paddle2.y + 55
  ) {
    if (this.ball.x > paddle2.x - 15) {
      this.ball.x -= 5;
    }
    this.ball.xspeed *= -1.03;
  }
  if (this.ball.y > height || this.ball.y < 0) {
    this.ball.yspeed *= -1;
  }
  //if ball touches top or bottom of canvas

  if (this.ball.x > width || this.ball.x < 0) {
    //if ball goes over right side
    if (this.ball.x > width) {
      player1++;
    }
    //if ball goes over left side
    if (this.ball.x < 0) {
      player2++;
    }
    this.ball.x = width / 2;
    this.ball.y = height / 2;
    this.ball.xspeed = 0;
    this.ball.yspeed = 0;
    //reset paddle positions
    paddle1.y = this.ball.y;
    paddle2.y = this.ball.y;
  }

  if (keyIsDown(DOWN_ARROW) && paddle2.y < height - 50) {
    paddle2.y += 6;
  } else if (keyIsDown(UP_ARROW) && paddle2.y > 50) {
    paddle2.y -= 6;
  }
  // paddle2.y = posY;
  //key 's'
  if (keyIsDown(83) && paddle1.y < height - 50) {
    paddle1.y += 6;
  }
  //key 'w'
  else if (keyIsDown(87) && paddle1.y > 50) {
    paddle1.y -= 6;
  }
}

//press space to start once resets
function keyPressed() {
  if (keyCode === 32 && this.ball.xspeed == 0 && player1 < 7 && player2 < 7) {
    let dirX = random(-1, 1);
    if (dirX > 0) {
      this.ball.xspeed = 5;
    } else {
      this.ball.xspeed = -5;
    }
    let dirY = random(-1, 1);
    if (dirY > 0) {
      this.ball.yspeed = random(1, 4);
    } else {
      this.ball.yspeed = random(-4, -1);
    }
  }
  if (keyCode == BACKSPACE) {
    this.ball.x = width / 2;
    this.ball.y = height / 2;
    this.ball.xspeed = 0;
    this.ball.yspeed = 0;
    player1 = 0;
    player2 = 0;
  }
}

function drawWords(x) {
  if (player1 < 7 && player2 < 7) {
    fill(255);
    text(player1, x, 80);
    fill(0);
    text(player2, x + width / 2, 70);
  } else {
    if (player1 == 7) {
      fill(255);
      text("Winner!", x, 80);
    } else {
      fill(0);
      text("Winner!", width / 2 + x, 80);
    }
    fill(255, 0, 0);
    text('Press "Backspace" to restart', width / 2 + 1, 120);
  }
}
//make left side black,
//ball fade to white
//right side white,
//ball fade to black
