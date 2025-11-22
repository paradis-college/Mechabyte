<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let showTrajectory = 0; // 0: backstage, 1: audience
  let robotPos = { x: 0, y: 0 };
  let pathProgress = 0;
  let animationTimer = 0;
  const trajectoryTime = 200;

  p.setup = () => {
    const canvas = p.createCanvas(600, 500);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    
    animationTimer++;
    
    // Switch trajectories
    if (animationTimer > trajectoryTime) {
      showTrajectory = (showTrajectory + 1) % 2;
      animationTimer = 0;
      pathProgress = 0;
    }
    
    // Draw field
    drawField(p);
    
    // Animate trajectory
    if (showTrajectory === 0) {
      drawBackstageTrajectory(p);
    } else {
      drawAudienceTrajectory(p);
    }
  };

  const drawField = (p: p5) => {
    // Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Autonomous Trajectories', p.width / 2, 30);
    
    // Field border
    const fieldX = 80;
    const fieldY = 70;
    const fieldSize = 440;
    const tileSize = fieldSize / 6;
    
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.noFill();
    p.rect(fieldX, fieldY, fieldSize, fieldSize);
    
    // Grid lines (6x6 tiles)
    p.stroke(0, 255, 0, 100);
    p.strokeWeight(1);
    for (let i = 1; i < 6; i++) {
      // Vertical lines
      p.line(fieldX + i * tileSize, fieldY, fieldX + i * tileSize, fieldY + fieldSize);
      // Horizontal lines
      p.line(fieldX, fieldY + i * tileSize, fieldX + fieldSize, fieldY + i * tileSize);
    }
    
    // Tile labels
    p.textSize(10);
    p.fill(150);
    p.noStroke();
    for (let i = 0; i < 6; i++) {
      p.text(String.fromCharCode(65 + i), fieldX + i * tileSize + tileSize / 2, fieldY - 5);
      p.text(i + 1, fieldX - 10, fieldY + i * tileSize + tileSize / 2 + 5);
    }
    
    // Backstage area (top)
    p.fill(60, 60, 80, 150);
    p.noStroke();
    p.rect(fieldX, fieldY, fieldSize, tileSize);
    p.textSize(12);
    p.fill(0, 255, 0);
    p.text('Backstage', fieldX + fieldSize / 2, fieldY + tileSize / 2);
    
    // Red/Blue alliance markers
    p.textSize(10);
    p.fill(255, 100, 100);
    p.text('Red', fieldX + tileSize, fieldY + fieldSize + 15);
    p.fill(100, 100, 255);
    p.text('Blue', fieldX + fieldSize - tileSize, fieldY + fieldSize + 15);
    
    // Truss indicator (horizontal line at mid-field)
    p.stroke(150);
    p.strokeWeight(4);
    p.line(fieldX, fieldY + fieldSize / 2, fieldX + fieldSize, fieldY + fieldSize / 2);
  };

  const drawBackstageTrajectory = (p: p5) => {
    const fieldX = 80;
    const fieldY = 70;
    const tileSize = 440 / 6;
    
    // Starting position (facing backstage)
    const startX = fieldX + tileSize * 0.5;
    const startY = fieldY + tileSize * 5.5;
    
    // End position (backstage)
    const endX = fieldX + tileSize * 0.5;
    const endY = fieldY + tileSize * 0.5;
    
    // Draw path
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.noFill();
    p.beginShape();
    p.vertex(startX, startY);
    p.vertex(startX, endY);
    p.endShape();
    
    // Arrow
    drawArrow(p, startX, startY, startX, endY, 0, 255, 0);
    
    // Animate robot
    pathProgress = Math.min(pathProgress + 0.01, 1);
    const robotX = startX;
    const robotY = p.lerp(startY, endY, pathProgress);
    drawRobot(p, robotX, robotY, -p.HALF_PI);
    
    // Labels
    p.textSize(11);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('First starting position (backstage)', p.width / 2, 60);
    
    p.textSize(10);
    p.fill(200);
    p.text('Robot faces backstage - drives straight forward', p.width / 2, p.height - 20);
  };

  const drawAudienceTrajectory = (p: p5) => {
    const fieldX = 80;
    const fieldY = 70;
    const tileSize = 440 / 6;
    
    // Starting position (facing audience)
    const startX = fieldX + tileSize * 1.5;
    const startY = fieldY + tileSize * 5.5;
    
    // Waypoint (tile C2)
    const waypointX = fieldX + tileSize * 1.5;
    const waypointY = fieldY + tileSize * 1.5;
    
    // End position (backstage)
    const endX = fieldX + tileSize * 0.5;
    const endY = fieldY + tileSize * 0.5;
    
    // Draw path
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.noFill();
    p.beginShape();
    p.vertex(startX, startY);
    p.vertex(waypointX, waypointY);
    p.vertex(endX, endY);
    p.endShape();
    
    // Arrows
    drawArrow(p, startX, startY, waypointX, waypointY, 0, 255, 0);
    drawArrow(p, waypointX, waypointY, endX, endY, 0, 255, 0);
    
    // Waypoint marker
    p.fill(255, 200, 0);
    p.noStroke();
    p.circle(waypointX, waypointY, 15);
    p.textSize(9);
    p.fill(30);
    p.text('C2', waypointX, waypointY + 3);
    
    // Animate robot
    pathProgress = Math.min(pathProgress + 0.008, 1);
    let robotX, robotY, robotAngle;
    
    if (pathProgress < 0.5) {
      // First segment
      const t = pathProgress * 2;
      robotX = startX;
      robotY = p.lerp(startY, waypointY, t);
      robotAngle = -p.HALF_PI;
    } else {
      // Second segment
      const t = (pathProgress - 0.5) * 2;
      robotX = p.lerp(waypointX, endX, t);
      robotY = p.lerp(waypointY, endY, t);
      robotAngle = -p.HALF_PI - p.QUARTER_PI;
    }
    
    drawRobot(p, robotX, robotY, robotAngle);
    
    // Labels
    p.textSize(11);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Second starting position (audience)', p.width / 2, 60);
    
    p.textSize(10);
    p.fill(200);
    p.text('Robot faces audience - drives to C2 then sideways to backstage', p.width / 2, p.height - 20);
  };

  const drawRobot = (p: p5, x: number, y: number, angle: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    
    // Robot body
    p.fill(0, 255, 0);
    p.stroke(0, 200, 0);
    p.strokeWeight(2);
    p.rect(-15, -15, 30, 30);
    
    // Direction indicator
    p.fill(255, 200, 0);
    p.triangle(0, -15, -8, -25, 8, -25);
    
    p.pop();
  };

  const drawArrow = (p: p5, x1: number, y1: number, x2: number, y2: number, r: number, g: number, b: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    p.push();
    p.translate(midX, midY);
    p.rotate(angle);
    
    // Arrow head
    p.fill(r, g, b);
    p.noStroke();
    p.triangle(10, 0, 0, -8, 0, 8);
    
    p.pop();
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
    <p class="animation-caption">Autonomous trajectories: backstage-facing (straight) vs audience-facing (C2 waypoint)</p>
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
