function Pipe() {
  this.x = width;
  this.w = 50;

  this.velocity = 2;
  this.color = color(255, 255, 255);
  this.height = 200;
  this.gap = random(20 + this.height / 2, (height - (20 + this.height / 2)));
  this.pointToDrawUP = this.gap - this.height / 2;
  this.pointToDrawDOWN = height - (20 + this.height / 2);

  this.update = function () {
    this.x = this.x - this.velocity;
  }

  this.show = function () {
    fill(this.color);
    stroke(this.color);
    this.pointToDrawUP = this.gap - this.height / 2;
    this.pointToDrawDOWN = height - (20 + this.height / 2);

    rect(this.x, 0, this.w, this.pointToDrawUP);
    rect(this.x, this.gap + this.height / 2, this.w, this.pointToDrawDOWN);
  }
}
