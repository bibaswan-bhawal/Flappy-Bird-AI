const TOTAL = 500;
var current_generation = 0;
var birds = [];
var savedBirds = []
let counter = 0;
let cycles = 100;
var player;
let slider;
var pipes = [];

var scores = 0;

var touched = false;
var scored = false;

function setup() {
  createCanvas(600, 700);
  slider = createSlider(1, 100, 1);

  background(0);

  for (let i = 0; i < TOTAL; i++) {
    birds.push(new Bird());
  }

  generation();
  score();
}


function draw() {

  for (let n = 0; n < slider.value(); n++) {

    if (counter % 300 == 0) {
      pipes.push(new Pipe());
    }

    counter++;

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length == 0) {
      counter = 0;
      for (let bird of savedBirds) {
        if (scores < bird.score) {
          scores = bird.score;
          score();
        }
      }
      newGeneration();
      current_generation++;
      generation();
      pipes = []
    }


    for (var i = 0; i < pipes.length; i++) {
      if (pipes[i].x < pipes[i]) {
        pipes.splice(i, 1);
      } else {
        if (pipes[i].x > width / 2 - pipes[i].w / 2 && pipes[i].x < width / 2 + pipes[i].w / 2) {
          for (let j = 0; j < birds.length; j++) {
            if (birds[j].y < (pipes[i].gap - pipes[i].height / 2)) {
              pipes[i].color = color(255, 0, 0);
              savedBirds.push(birds.splice(j, 1)[0]);
            } else if (birds[j].y > pipes[i].gap + pipes[i].height / 2) {
              pipes[i].color = color(255, 0, 0);
              savedBirds.push(birds.splice(j, 1)[0]);
            }
          }
        } else {
          pipes[i].color = color(255, 255, 255);
        }

        pipes[i].update();
      }
    }
  }

  background(0);

  for (bird of birds) {
    bird.show()
  }

  for (pipe of pipes) {
    pipe.show()
  }

}

// function keyPressed() {
//   if (key == ' ') {
//     player.jump(1.10);
//   }
// }

function generation() {
  document.getElementById("generation").innerHTML = current_generation;
}

function score() {
  document.getElementById("score").innerHTML = scores;
}