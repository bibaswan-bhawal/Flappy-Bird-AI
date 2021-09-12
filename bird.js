function Bird(brain) {
  this.x = width / 2;
  this.y = height / 2;
  this.velocity = 10;
  this.acceleration = 1;

  this.score = 0;
  this.fitness = 0;

  if (brain) {
    this.brain = brain.copy();
  } else {
    this.brain = new NeuralNetwork(4, 4, 1);
  }

  this.getScore = function () {
    return this.score;
  }

  this.mutate = function () {
    this.brain.mutate(0.1);
  }

  this.jump = function (force) {
    this.acceleration = -force;
  }

  this.think = function (pipes) {
    let pipe = null
    let distance = Infinity

    for (let j = 0; j < pipes.length; j++) {
      if ((pipes[j].x - this.x) < distance) {
        pipe = pipes[j];
        pipes[j].color = color(0, 255, 0);

        distance = pipes[j].x - this.x;
      }
    }

    let inputs = [this.y / height, pipe.pointToDrawUP / height, pipe.pointToDrawDOWN / height, pipe.x / height];
    let output = this.brain.feedforward(inputs);

    if (output.getValue(0, 0) > 0.5) {
      this.jump(1.10);
    }
  }

  this.update = function () {
    this.score++;
    var force = this.velocity * this.acceleration;
    this.y = this.y + force;

    if (this.acceleration != 1) {
      this.acceleration = this.acceleration + 0.06;
    }

    if (this.y > height) {
      this.y = height;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }

  this.show = function () {

    stroke(255);
    fill(255);
    ellipse(this.x, this.y, 20, 20);
  }
}
