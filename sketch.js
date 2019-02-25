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
  //r = map(posY, 0, height,  0, 255);
  //map x pos of ball to green
  //b = map(posX, 0, width, 255, 0);
  background(0);
  push();
  fill(255);
  rectMode(CORNER);
  rect(width / 2, 0, width / 2, height);
  pop();

  push();
  textAlign(CENTER);
  drawWords(150);
  pop();

  rectMode(CENTER);
  noStroke();
  rect(paddle1.x, paddle1.y, paddle1.w, paddle1.h, paddle1.r);
  push();
  fill(0);
  rect(paddle2.x, paddle2.y, paddle2.w, paddle2.h, paddle2.r);
  pop();
  stroke(255, 100);
  line(width / 2, 0, width / 2, height);

  //pong ball
  push();
  var col = map(posX, 0, width, 255, 0);
  fill(col);
  noStroke();
  ellipse(posX, posY, 20);
  pop();

  //if ball touches paddle, reverse direction
  if (
    posX >= paddle2.x - 20 &&
    posY >= paddle2.y - 55 &&
    posY <= paddle2.y + 55
  ) {
    speedX = speedX * -1.01;
  }
  if (
    posX <= paddle1.x + 20 &&
    posY >= paddle1.y - 55 &&
    posY <= paddle1.y + 55
  ) {
    speedX = speedX * -1.01;
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
    //reset paddle positions
    paddle1.y = posX;
    paddle2.y = posY;
  }

  posX = posX + speedX;
  posY = posY + speedY;

  if (keyIsDown(DOWN_ARROW) && paddle1.y < height - 50) {
    paddle1.y += 6;
  } else if (keyIsDown(UP_ARROW) && paddle1.y > 50) {
    paddle1.y -= 6;
  }
  //paddle2.y = posY;
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
  if (keyCode === RETURN && speedX == 0 && player1 < 7 && player2 < 7) {
    //paddle1.y = posY;
    let dirX = random(-1, 1);
    if (dirX > 0) {
      speedX = 5;
    } else {
      speedX = -5;
    }
    let dirY = random(-1, 1);
    if (dirY > 0) {
      speedY = random(1, 4);
    } else {
      speedY = random(-4, -1);
    }
  }
  if (keyCode == BACKSPACE) {
    posX = width / 2;
    posY = height / 2;
    speedX = 0;
    speedY = 0;
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
    fill(50);
    text('Press "Backspace" to restart', width / 2, 120);
  }
}
//make left side black,
//ball fade to white
//right side white,
//ball fade to black
