<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let robot = { x: 0, y: 0, angle: 0 };
  let pixels: Array<{ x: number; y: number; collected: boolean }> = [];
  let drone = { x: 0, y: 0, launched: false, velocity: { x: 0, y: 0 } };
  let animationPhase = 0; // 0: collect pixels, 1: place on backdrop, 2: launch drone
  let phaseTimer = 0;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
    
    // Initialize robot position (starting position)
    robot.x = 100;
    robot.y = p.height - 80;
    robot.angle = 0;
    
    // Initialize hexagonal pixels
    for (let i = 0; i < 3; i++) {
      pixels.push({
        x: 200 + i * 60,
        y: p.height - 100,
        collected: false
      });
    }
    
    // Initialize drone
    drone.x = robot.x;
    drone.y = robot.y - 30;
  };

  p.draw = () => {
    p.background(30, 30, 40);
    
    // Draw field elements
    drawField(p);
    
    // Update animation
    phaseTimer++;
    
    if (animationPhase === 0) {
      // Phase 0: Collect pixels
      collectPixels(p);
    } else if (animationPhase === 1) {
      // Phase 1: Move to backdrop and place pixels
      placePixels(p);
    } else if (animationPhase === 2) {
      // Phase 2: Launch drone
      launchDrone(p);
    }
    
    // Draw pixels
    for (const pixel of pixels) {
      if (!pixel.collected) {
        drawHexagon(p, pixel.x, pixel.y, 15, '#ff00ff');
      }
    }
    
    // Draw robot
    drawRobot(p, robot.x, robot.y, robot.angle);
    
    // Draw drone
    if (drone.launched || animationPhase === 2) {
      drawDrone(p, drone.x, drone.y);
    }
    
    // Reset animation
    if (phaseTimer > 600) {
      resetAnimation();
    }
  };

  const drawField = (p: p5) => {
    // Draw field border
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.noFill();
    p.rect(20, 20, p.width - 40, p.height - 40);
    
    // Draw truss (horizontal bar across mid-field)
    p.stroke(150);
    p.strokeWeight(6);
    p.line(20, p.height / 2, p.width - 20, p.height / 2);
    p.textSize(12);
    p.fill(200);
    p.noStroke();
    p.text('Truss', p.width / 2 - 20, p.height / 2 - 10);
    
    // Draw backdrop area
    p.fill(40, 40, 50);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.rect(p.width - 100, 20, 80, 150);
    p.textSize(10);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Backdrop', p.width - 90, 100);
    
    // Draw backstage
    p.fill(50, 50, 60);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.rect(p.width - 100, 180, 80, 60);
    p.textSize(10);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Backstage', p.width - 95, 215);
  };

  const drawRobot = (p: p5, x: number, y: number, angle: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    
    // Robot body
    p.fill(0, 255, 0);
    p.stroke(0, 200, 0);
    p.strokeWeight(2);
    p.rect(-20, -20, 40, 40);
    
    // Intake claw indicator
    p.fill(255, 0, 255);
    p.rect(-15, -25, 30, 5);
    
    p.pop();
  };

  const drawHexagon = (p: p5, x: number, y: number, size: number, color: string) => {
    p.push();
    p.translate(x, y);
    p.fill(color);
    p.stroke(200);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.PI / 3) * i;
      const px = size * p.cos(angle);
      const py = size * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
    p.pop();
  };

  const drawDrone = (p: p5, x: number, y: number) => {
    p.push();
    p.fill(255, 200, 0);
    p.stroke(200);
    p.strokeWeight(1);
    // Paper drone (triangular shape)
    p.triangle(x, y - 10, x - 8, y + 5, x + 8, y + 5);
    p.pop();
  };

  const collectPixels = (p: p5) => {
    // Move robot to collect pixels
    const targetPixel = pixels.find(px => !px.collected);
    if (targetPixel) {
      // Move towards pixel
      const dx = targetPixel.x - robot.x;
      const dy = targetPixel.y - robot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        robot.x += (dx / distance) * 2;
        robot.y += (dy / distance) * 2;
        robot.angle = Math.atan2(dy, dx);
      } else {
        targetPixel.collected = true;
      }
    } else {
      // All pixels collected, move to next phase
      animationPhase = 1;
      phaseTimer = 0;
    }
  };

  const placePixels = (p: p5) => {
    // Move robot to backdrop
    const targetX = p.width - 120;
    const targetY = 100;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      robot.x += (dx / distance) * 2;
      robot.y += (dy / distance) * 2;
      robot.angle = Math.atan2(dy, dx);
    } else if (phaseTimer > 100) {
      // Placed pixels, move to drone launch
      animationPhase = 2;
      phaseTimer = 0;
      drone.x = robot.x;
      drone.y = robot.y - 30;
    }
  };

  const launchDrone = (p: p5) => {
    if (!drone.launched) {
      drone.launched = true;
      drone.velocity.x = 2;
      drone.velocity.y = -4;
    }
    
    // Update drone position
    drone.x += drone.velocity.x;
    drone.y += drone.velocity.y;
    drone.velocity.y += 0.1; // Gravity
  };

  const resetAnimation = () => {
    animationPhase = 0;
    phaseTimer = 0;
    robot.x = 100;
    robot.y = p.height - 80;
    robot.angle = 0;
    
    pixels = [];
    for (let i = 0; i < 3; i++) {
      pixels.push({
        x: 200 + i * 60,
        y: p.height - 100,
        collected: false
      });
    }
    
    drone.x = robot.x;
    drone.y = robot.y - 30;
    drone.launched = false;
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
    <p class="animation-caption">CenterStage: Robot collecting hexagonal pixels and launching a drone over the truss</p>
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
