<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let animationTimer = 0;
  let pixelY = 0;
  let pixelCollected = false;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    animationTimer++;
    
    // Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Naive Solution: Simple Grabber', p.width / 2, 30);
    
    p.textSize(12);
    p.fill(255, 200, 0);
    p.text('Initial Idea: Just grab and lift', p.width / 2, 55);
    
    drawNaiveConcept(p);
    
    // Reset
    if (animationTimer > 300) {
      animationTimer = 0;
      pixelY = 0;
      pixelCollected = false;
    }
  };

  const drawNaiveConcept = (p: p5) => {
    const robotX = p.width / 2;
    const robotY = p.height - 100;
    
    // Ground
    p.stroke(100);
    p.strokeWeight(2);
    p.line(0, robotY + 60, p.width, robotY + 60);
    
    // Robot base
    p.fill(60, 60, 80);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(robotX - 50, robotY, 100, 60);
    
    // Simple grabber arms
    const grabberOpen = animationTimer < 100;
    const armAngle = grabberOpen ? p.PI / 6 : 0;
    
    // Left arm
    p.push();
    p.translate(robotX - 20, robotY);
    p.rotate(-armAngle);
    p.fill(0, 255, 0);
    p.rect(-10, -40, 10, 40);
    p.pop();
    
    // Right arm
    p.push();
    p.translate(robotX + 20, robotY);
    p.rotate(armAngle);
    p.fill(0, 255, 0);
    p.rect(0, -40, 10, 40);
    p.pop();
    
    // Pixel
    if (!pixelCollected && animationTimer >= 100) {
      pixelCollected = true;
    }
    
    if (pixelCollected) {
      pixelY = Math.min(pixelY + 1, 150);
    }
    
    const pixelYPos = robotY + 70 - pixelY;
    drawHexagon(p, robotX, pixelYPos, 15, '#ff00ff');
    
    // Problems annotations
    if (animationTimer > 150) {
      p.textSize(11);
      p.fill(255, 100, 100);
      p.text('❌ No precise alignment', robotX - 150, robotY - 60);
      p.text('❌ Pixel falls easily', robotX + 150, robotY - 40);
      p.text('❌ Can only hold 1', robotX - 150, robotY - 20);
      p.text('❌ Requires perfect timing', robotX + 150, robotY - 80);
    }
    
    // Success rate
    p.textSize(10);
    p.fill(255, 100, 100);
    p.text('Success Rate: ~20%', p.width / 2, p.height - 20);
  };

  const drawHexagon = (p: p5, x: number, y: number, size: number, color: string) => {
    p.fill(color);
    p.stroke(200);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.TWO_PI / 6) * i;
      const hx = x + size * p.cos(angle);
      const hy = y + size * p.sin(angle);
      p.vertex(hx, hy);
    }
    p.endShape(p.CLOSE);
  };
};

onMounted(() => {
  if (canvasContainer.value) {
    p5Instance = new p5(sketch);
  }
});

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
});
</script>

<template>
  <div class="animation-wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>
    <p class="animation-caption">Naive approach: Simple grabber with no precision or retention mechanism</p>
  </div>
</template>

<style scoped>
.animation-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
  margin: 2vw 0;
}

.canvas-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  border: 0.2vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  background: #1a1a20;
}

.animation-caption {
  font-size: 0.9vw;
  color: var(--mechabyte-green);
  text-align: center;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .animation-caption {
    font-size: 12px;
  }
  
  .canvas-container {
    border: 2px solid var(--mechabyte-green);
  }
}
</style>
