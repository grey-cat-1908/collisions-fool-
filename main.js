let block1, block2;
let block1Img, block2Img;
let count = 0;

let m2 = Number(localStorage.getItem("m2")) || 10000;
let v2 = Number(localStorage.getItem("v2")) || -1;
let m1 = Number(localStorage.getItem("m1")) || 1;
let v1 = Number(localStorage.getItem("v1")) || 0;

const opt = 10 ** 6;

function preload() {
    document.getElementById("m1").value = Number(localStorage.getItem("m1")) || 1;
    document.getElementById("m2").value = Number(localStorage.getItem("m2")) || 10000;
    document.getElementById("v1").value = Number(localStorage.getItem("v1")) || 0;
    document.getElementById("v2").value = Number(localStorage.getItem("v2")) || -1;

    block1Img = loadImage('block1.png');
    block2Img = loadImage('block2.png');
}

function setup() {
    createCanvas(windowWidth, 200, document.getElementById('preview'));

    block1 = new Block(100, 50, m1, v1 / opt, 0, block1Img);
    block2 = new Block(300, 100, m2, v2 / opt, 50, block2Img);

    countDiv = createDiv("Collisions: " + count);
    countDiv.class('count')

    v1Div = createDiv("Velocity (Blue): " + block1.velocity * opt);
    v1Div.class('v1Div')

    v2Div = createDiv("Velocity (Red): " + block2.velocity * opt);
    v2Div.class('v2Div')
}

function draw() {
    background(230);
  
    for (let i = 0; i < opt; i++) {
      if (block1.isCollide(block2)) {
        v1 = block1.recalcVelocity(block2);
        v2 = block2.recalcVelocity(block1);

        block1.velocity = v1;
        block2.velocity = v2;
        
        count++;
      }
  
      if (block1.isWall()) {
        block1.reverse();
        count++;
      }
  
      block1.update();
      block2.update();

      block1.move();
      block2.move();
    }
  
    block1.build();
    block2.build();
  
    countDiv.html("Collisions: " + count);
    v1Div.html("Velocity (Blue): " + (block1.velocity * opt).toFixed(2));
    v2Div.html("Velocity (Red): " + (block2.velocity * opt).toFixed(2));
}


addEventListener("input", (event) => {
    let inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        localStorage.setItem(input.id, Number(input.value));
    }
});
