var canvas;
var particleList = [];
const lc = '#505268';


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  //p = new Particle();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', -1);

  const particleCon = Math.floor(this.width / 15);

  for(i = 0; i < particleCon; i++){
    particleList.push(new Particle());
  }
}

class Particle{
  constructor(){
    this.pos = createVector(random(width*1.2) -.1, random(height*1.2)-.1);
    this.vel = createVector(random(-1.3, 1.3), random(-1.3, 1.3));

    this.size = 10;
  }

  update(){
    this.pos.add(this.vel);
    this.edge();
  }
  
  edge(){
    if(this.pos.x > (width * 1.1) || this.pos.x < (width - (width * 1.1))){
      this.vel.x *= -1;
    }
    if(this.pos.y > (height * 1.1) || this.pos.y < (height - (height* 1.1))){
      this.vel.y *= -1;
    }
  }

  draw(){
    noStroke();
    fill(lc);
    circle(this.pos.x, this.pos.y, this.size);
  }

  connectParticles(particleIn){
    particleIn.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if(d < 150){
        stroke(lc);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    })
  }

}

function draw() {
  background('#2B2D42');
  particleList.forEach((p, index) => {
    p.update();
    p.draw();
    p.connectParticles(particleList.slice(index));
  })
}