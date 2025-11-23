<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases with typed constants
const PHASE_NAVIGATE_TO_TRUSS = 0;
const PHASE_COLLECT_PIXEL = 1;
const PHASE_NAVIGATE_TO_BACKDROP = 2;
const PHASE_PLACE_PIXEL = 3;
const PHASE_RETURN = 4;
const PHASE_PAUSE = 5;

onMounted(() => {
  if (!canvasContainer.value) return;

  const sketch = (p: p5) => {
    let phase = PHASE_NAVIGATE_TO_TRUSS;
    let phaseStartTime = 0;
    let robotX = 0;
    let robotY = 0;
    let robotAngle = 0;
    let hasPixel = false;
    let pixelsPlaced = 0;
    let cycleCount = 0;

    const CANVAS_SIZE = 600;
    const MARGIN = 80;
    const FIELD_SIZE = CANVAS_SIZE - 2 * MARGIN;
    const TILE_SIZE = FIELD_SIZE / 6; // 12ft field = 6 tiles of 2ft each
    const ROBOT_SIZE = TILE_SIZE * 0.75; // 18" = 1.5ft = 0.75 tiles
    
    // Key positions on field (in tiles)
    const START_POS = { x: 4.5, y: 5.5 }; // Wing area
    const TRUSS_POS = { x: 3, y: 3 }; // Through truss/stage door
    const PIXEL_STACK = { x: 4.5, y: 2.5 }; // Pixel stack location
    const BACKDROP_POS = { x: 1.2, y: 1.5 }; // Backdrop target

    // Convert tile coordinates to canvas pixels
    const tileToCanvas = (tileX: number, tileY: number) => ({
      x: MARGIN + tileX * TILE_SIZE,
      y: MARGIN + tileY * TILE_SIZE
    });

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE + 100);
      p.frameRate(30);
      resetAnimation();
    };

    const resetAnimation = () => {
      phase = PHASE_NAVIGATE_TO_TRUSS;
      phaseStartTime = p.millis();
      const start = tileToCanvas(START_POS.x, START_POS.y);
      robotX = start.x;
      robotY = start.y;
      robotAngle = -Math.PI / 4; // Facing toward truss
      hasPixel = false;
      pixelsPlaced = 0;
      cycleCount = 0;
    };

    const easeInOut = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    p.draw = () => {
      p.background(26, 26, 36); // Dark background
      
      const elapsed = (p.millis() - phaseStartTime) / 1000;

      // Draw field
      drawField();
      
      // Update robot position based on phase
      updateRobotPosition(elapsed);
      
      // Draw robot
      drawRobot();
      
      // Draw status
      drawStatus();
      
      // Check phase transitions
      checkPhaseTransitions(elapsed);
    };

    const drawField = () => {
      // Field border
      p.stroke(0, 255, 100);
      p.strokeWeight(3);
      p.noFill();
      p.rect(MARGIN, MARGIN, FIELD_SIZE, FIELD_SIZE);
      
      // Field dimensions label
      p.fill(0, 255, 100);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(14);
      p.text('12ft × 12ft', CANVAS_SIZE / 2, MARGIN - 30);
      
      // Draw 2ft grid
      p.stroke(60, 60, 80);
      p.strokeWeight(1);
      for (let i = 1; i < 6; i++) {
        const pos = MARGIN + i * TILE_SIZE;
        p.line(MARGIN, pos, MARGIN + FIELD_SIZE, pos);
        p.line(pos, MARGIN, pos, MARGIN + FIELD_SIZE);
      }
      
      // Truss/Stage Door (mid-field)
      p.fill(100, 100, 120);
      p.noStroke();
      p.rect(MARGIN + TILE_SIZE * 2.5, MARGIN + TILE_SIZE * 2.8, TILE_SIZE, TILE_SIZE * 0.4);
      p.fill(180, 180, 200);
      p.textSize(10);
      p.text('Truss', MARGIN + TILE_SIZE * 3, MARGIN + TILE_SIZE * 3);
      
      // Backdrop zone
      p.fill(100, 100, 255, 50);
      p.rect(MARGIN, MARGIN, TILE_SIZE * 2, TILE_SIZE * 2);
      p.fill(100, 150, 255);
      p.textSize(11);
      p.text('Backdrop', MARGIN + TILE_SIZE, MARGIN + TILE_SIZE * 0.5);
      p.text('2ft × 4ft', MARGIN + TILE_SIZE, MARGIN + TILE_SIZE * 0.8);
      
      // Backstage zone
      p.fill(255, 200, 100, 50);
      p.rect(MARGIN, MARGIN, TILE_SIZE, TILE_SIZE * 4);
      p.fill(255, 200, 100);
      p.textSize(10);
      p.text('Backstage', MARGIN + TILE_SIZE * 0.5, MARGIN + TILE_SIZE * 5.5);
      
      // Wing area
      p.fill(150, 255, 150, 30);
      const wingSize = TILE_SIZE * 2;
      p.rect(MARGIN + FIELD_SIZE - wingSize, MARGIN + FIELD_SIZE - wingSize, wingSize, wingSize);
      p.fill(150, 255, 150);
      p.textSize(10);
      p.text('Wing', MARGIN + FIELD_SIZE - TILE_SIZE, MARGIN + FIELD_SIZE - TILE_SIZE * 0.5);
      
      // Pixel stack location
      const stackPos = tileToCanvas(PIXEL_STACK.x, PIXEL_STACK.y);
      p.fill(255, 215, 0);
      p.noStroke();
      for (let i = 0; i < 3 - Math.floor(cycleCount / 2); i++) {
        drawHexagon(stackPos.x, stackPos.y + i * 8, 12);
      }
      p.fill(255, 215, 0);
      p.textSize(9);
      p.text('Pixels', stackPos.x, stackPos.y + 25);
      
      // Placed pixels on backdrop
      const backdropPos = tileToCanvas(BACKDROP_POS.x, BACKDROP_POS.y);
      for (let i = 0; i < pixelsPlaced; i++) {
        p.fill(100, 255, 150);
        const offsetX = (i % 3) * 20 - 20;
        const offsetY = Math.floor(i / 3) * 20;
        drawHexagon(backdropPos.x + offsetX, backdropPos.y + offsetY, 10);
      }
    };

    const drawHexagon = (x: number, y: number, size: number) => {
      p.push();
      p.translate(x, y);
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = size * Math.cos(angle);
        const hy = size * Math.sin(angle);
        p.vertex(hx, hy);
      }
      p.endShape(p.CLOSE);
      p.pop();
    };

    const drawRobot = () => {
      p.push();
      p.translate(robotX, robotY);
      p.rotate(robotAngle);
      
      // Robot body
      p.fill(0, 200, 100);
      p.stroke(0, 255, 100);
      p.strokeWeight(2);
      p.rectMode(p.CENTER);
      p.rect(0, 0, ROBOT_SIZE, ROBOT_SIZE);
      
      // Direction indicator
      p.fill(255, 255, 0);
      p.noStroke();
      p.triangle(
        ROBOT_SIZE * 0.4, 0,
        -ROBOT_SIZE * 0.2, -ROBOT_SIZE * 0.25,
        -ROBOT_SIZE * 0.2, ROBOT_SIZE * 0.25
      );
      
      // Mecanum wheels
      p.fill(80, 80, 100);
      p.stroke(120, 120, 140);
      p.strokeWeight(1);
      const wheelSize = ROBOT_SIZE * 0.3;
      p.ellipse(-ROBOT_SIZE * 0.35, -ROBOT_SIZE * 0.35, wheelSize, wheelSize);
      p.ellipse(ROBOT_SIZE * 0.35, -ROBOT_SIZE * 0.35, wheelSize, wheelSize);
      p.ellipse(-ROBOT_SIZE * 0.35, ROBOT_SIZE * 0.35, wheelSize, wheelSize);
      p.ellipse(ROBOT_SIZE * 0.35, ROBOT_SIZE * 0.35, wheelSize, wheelSize);
      
      // Pixel in claw if collected
      if (hasPixel) {
        p.fill(255, 215, 0);
        p.noStroke();
        drawHexagon(0, -ROBOT_SIZE * 0.5, 8);
      }
      
      // Motion indicator when moving
      if (phase !== PHASE_COLLECT_PIXEL && phase !== PHASE_PLACE_PIXEL && phase !== PHASE_PAUSE) {
        p.stroke(0, 255, 150, 150);
        p.strokeWeight(2);
        p.noFill();
        for (let i = 1; i <= 3; i++) {
          p.line(-ROBOT_SIZE * 0.5 - i * 5, 0, -ROBOT_SIZE * 0.5 - i * 5 - 8, 0);
        }
      }
      
      p.pop();
    };

    const drawStatus = () => {
      // Status box
      p.fill(20, 20, 30);
      p.stroke(0, 255, 100);
      p.strokeWeight(2);
      p.rect(MARGIN, CANVAS_SIZE - 50, CANVAS_SIZE - 2 * MARGIN, 40);
      
      // Status text
      p.fill(0, 255, 100);
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(14);
      const statusText = getPhaseText();
      p.text(statusText, MARGIN + 15, CANVAS_SIZE - 35);
      
      // Cycle counter
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(`Cycle: ${cycleCount + 1}/3`, CANVAS_SIZE - MARGIN - 15, CANVAS_SIZE - 35);
      
      // Progress bar
      const phaseProgress = getPhaseProgress();
      p.fill(0, 100, 50);
      p.noStroke();
      p.rect(MARGIN + 10, CANVAS_SIZE - 20, CANVAS_SIZE - 2 * MARGIN - 20, 8);
      p.fill(0, 255, 100);
      p.rect(MARGIN + 10, CANVAS_SIZE - 20, (CANVAS_SIZE - 2 * MARGIN - 20) * phaseProgress, 8);
      
      // Pixels placed counter
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(255, 215, 0);
      p.textSize(12);
      p.text(`Pixels on backdrop: ${pixelsPlaced}`, CANVAS_SIZE / 2, CANVAS_SIZE + 70);
      p.textSize(10);
      p.fill(150, 150, 170);
      p.text('3 pts per pixel', CANVAS_SIZE / 2, CANVAS_SIZE + 85);
    };

    const getPhaseText = () => {
      switch (phase) {
        case PHASE_NAVIGATE_TO_TRUSS:
          return 'Navigating through truss/stage door (~1.5s)';
        case PHASE_COLLECT_PIXEL:
          return 'Collecting pixel from stack (~0.5s)';
        case PHASE_NAVIGATE_TO_BACKDROP:
          return 'Navigating to backdrop (~1.0s)';
        case PHASE_PLACE_PIXEL:
          return 'Placing pixel on backdrop (~0.5s)';
        case PHASE_RETURN:
          return 'Returning for next pixel (~1.5s)';
        case PHASE_PAUSE:
          return 'Cycle complete - Starting next...';
        default:
          return '';
      }
    };

    const getPhaseProgress = () => {
      const elapsed = (p.millis() - phaseStartTime) / 1000;
      switch (phase) {
        case PHASE_NAVIGATE_TO_TRUSS:
          return Math.min(elapsed / 1.5, 1);
        case PHASE_COLLECT_PIXEL:
          return Math.min(elapsed / 0.5, 1);
        case PHASE_NAVIGATE_TO_BACKDROP:
          return Math.min(elapsed / 1.0, 1);
        case PHASE_PLACE_PIXEL:
          return Math.min(elapsed / 0.5, 1);
        case PHASE_RETURN:
          return Math.min(elapsed / 1.5, 1);
        case PHASE_PAUSE:
          return Math.min(elapsed / 0.5, 1);
        default:
          return 0;
      }
    };

    const updateRobotPosition = (elapsed: number) => {
      const start = tileToCanvas(START_POS.x, START_POS.y);
      const truss = tileToCanvas(TRUSS_POS.x, TRUSS_POS.y);
      const pixelStack = tileToCanvas(PIXEL_STACK.x, PIXEL_STACK.y);
      const backdrop = tileToCanvas(BACKDROP_POS.x, BACKDROP_POS.y);

      switch (phase) {
        case PHASE_NAVIGATE_TO_TRUSS: {
          const t = easeInOut(Math.min(elapsed / 1.5, 1));
          robotX = start.x + (truss.x - start.x) * t;
          robotY = start.y + (truss.y - start.y) * t;
          robotAngle = Math.atan2(truss.y - start.y, truss.x - start.x);
          break;
        }
        case PHASE_COLLECT_PIXEL: {
          const t = Math.min(elapsed / 0.5, 1);
          robotX = truss.x + (pixelStack.x - truss.x) * t;
          robotY = truss.y + (pixelStack.y - truss.y) * t;
          robotAngle = Math.atan2(pixelStack.y - truss.y, pixelStack.x - truss.x);
          if (t > 0.8) hasPixel = true;
          break;
        }
        case PHASE_NAVIGATE_TO_BACKDROP: {
          const t = easeInOut(Math.min(elapsed / 1.0, 1));
          robotX = pixelStack.x + (backdrop.x - pixelStack.x) * t;
          robotY = pixelStack.y + (backdrop.y - pixelStack.y) * t;
          robotAngle = Math.atan2(backdrop.y - pixelStack.y, backdrop.x - pixelStack.x);
          break;
        }
        case PHASE_PLACE_PIXEL: {
          const t = Math.min(elapsed / 0.5, 1);
          if (t > 0.7 && hasPixel) {
            hasPixel = false;
            pixelsPlaced++;
          }
          break;
        }
        case PHASE_RETURN: {
          const t = easeInOut(Math.min(elapsed / 1.5, 1));
          robotX = backdrop.x + (start.x - backdrop.x) * t;
          robotY = backdrop.y + (start.y - backdrop.y) * t;
          robotAngle = Math.atan2(start.y - backdrop.y, start.x - backdrop.x);
          break;
        }
      }
    };

    const checkPhaseTransitions = (elapsed: number) => {
      let phaseDuration = 0;
      
      switch (phase) {
        case PHASE_NAVIGATE_TO_TRUSS:
          phaseDuration = 1.5;
          break;
        case PHASE_COLLECT_PIXEL:
          phaseDuration = 0.5;
          break;
        case PHASE_NAVIGATE_TO_BACKDROP:
          phaseDuration = 1.0;
          break;
        case PHASE_PLACE_PIXEL:
          phaseDuration = 0.5;
          break;
        case PHASE_RETURN:
          phaseDuration = 1.5;
          break;
        case PHASE_PAUSE:
          phaseDuration = 0.5;
          break;
      }
      
      if (elapsed >= phaseDuration) {
        phase++;
        phaseStartTime = p.millis();
        
        if (phase > PHASE_PAUSE) {
          cycleCount++;
          if (cycleCount >= 3) {
            // Reset after 3 cycles
            setTimeout(() => resetAnimation(), 1000);
          } else {
            phase = PHASE_NAVIGATE_TO_TRUSS;
          }
        }
      }
    };
  };

  p5Instance = new p5(sketch, canvasContainer.value);
});

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<template>
  <div class="animation-container">
    <div ref="canvasContainer" class="canvas-wrapper"></div>
    <p class="animation-caption">
      <strong>Teleop Strategy Animation:</strong> Robot navigates through truss/stage door, collects pixels one at a time, and places them on the backdrop. Each cycle takes approximately 5 seconds. Strategy focuses on consistent scoring (3 pts per pixel) with potential for mosaics (+10 pts bonus).
    </p>
  </div>
</template>

<style scoped>
.animation-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
}

.canvas-wrapper {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
}

.animation-caption {
  margin-top: 1rem;
  text-align: center;
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 600px;
}

@media (max-width: 768px) {
  .canvas-wrapper {
    max-width: 100%;
  }
  
  .animation-caption {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
}
</style>
