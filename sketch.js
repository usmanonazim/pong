//simple pong game
//I would like to add random speed for y
//add AI
//better animations
//add trail to pong ball
//add win condition(score to win?)
let font,
  fontsize = 40;

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

var speedX = 0;
var speedY = 0;
let width = 600;
let height = 600;
var posX = width / 2;
var posY = height / 2;
var player1 = 0;
var player2 = 0;
function setup() {
  createCanvas(width, height);
  textFont();
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  //map y pos of ball to red
  r = map(posY, 0, height, 0, 255);
  //map x pos of ball to green
  b = map(posX, 0, width, 255, 0);
  background(r, 30, b);

  push();
  textAlign(RIGHT);
  drawWords(width / 2 + 25);
  pop();

  rectMode(CENTER);
  noStroke();
  rect(paddle1.x, paddle1.y, paddle1.w, paddle1.h, paddle1.r);
  rect(paddle2.x, paddle2.y, paddle2.w, paddle2.h, paddle2.r);

  //pong ball
  push();
  var col = map(posX, 0, width, 255, 0);
  fill(col);
  ellipse(posX, posY, 20);

  pop();

  //if ball touches paddle, reverse direction
  if (
    posX >= paddle2.x - 19 &&
    posY >= paddle2.y - 55 &&
    posY <= paddle2.y + 55
  ) {
    speedX = speedX * -1.05;
  }
  if (
    posX <= paddle1.x + 18.5 &&
    posY >= paddle1.y - 55 &&
    posY <= paddle1.y + 55
  ) {
    speedX = speedX * -1.05;
  }
  //if ball touches top or bottom of canvas
  if (posY > height || posY <= 0) {
    speedY = speedY * -1;
  }
  if (posX > width || posX < 0) {
    //if ball goes over right side
    if (posX > width) {
      player1++;
    }
    //if ball goes over left side
    if (posX < 0) {
      player2++;
    }
    posX = width / 2;
    posY = height / 2;
    speedX = 0;
    speedY = 0;
  }

  posX = posX + speedX;
  posY = posY + speedY;

  if (keyIsDown(DOWN_ARROW) && paddle1.y < height - 50) {
    paddle1.y += 6;
  } else if (keyIsDown(UP_ARROW) && paddle1.y > 50) {
    paddle1.y -= 6;
  }
  //key 's'
  if (keyIsDown(83) && paddle2.y < height - 50) {
    paddle2.y += 6;
  }
  //key 'w'
  else if (keyIsDown(87) && paddle2.y > 50) {
    paddle2.y -= 6;
  }
}

//press return to start once resets
function keyPressed() {
  if (keyCode === RETURN && speedX == 0) {
    let dir = random(-1, 1);
    if (dir > 0) {
      speedX = 4;
    } else {
      speedX = -4;
    }
    speedY = random(-4, 4);
  }
  if (keyCode == BACKSPACE && speedX == 0) {
    player1 = 0;
    player2 = 0;
  }
}

function drawWords(x) {
  fill(20);
  text(player1 + " : " + player2, x, 80);
}
