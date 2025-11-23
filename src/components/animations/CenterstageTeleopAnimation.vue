<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_NAVIGATE_TO_PIXEL = 0;
const PHASE_COLLECT_PIXEL = 1;
const PHASE_NAVIGATE_TO_BACKDROP = 2;
const PHASE_PLACE_PIXEL = 3;
const PHASE_NAVIGATE_BACK = 4;
const PHASE_PAUSE = 5;

onMounted(() => {
  if (!canvasContainer.value) return;

  const sketch = (p: p5) => {
    let phase = PHASE_NAVIGATE_TO_PIXEL;
    let phaseStartTime = 0;
    let robotX = 0;
    let robotY = 0;
    let robotAngle = 0;
    let hasPixel = false;
    let pixelsOnBackdrop = 0;
    let cycleCount = 0;

    const TILE_SIZE = 24; // 12ft field = 6 tiles, so 24 pixels per tile
    const FIELD_SIZE = TILE_SIZE * 6; // 144 pixels = 12ft
    const ROBOT_SIZE = 18; // 18" robot = 1.5ft = 0.25 of field
    
    // Positions
    const START_X = TILE_SIZE * 2.5;
    const START_Y = TILE_SIZE * 5;
    const PIXEL_STACK_X = TILE_SIZE * 4.5;
    const PIXEL_STACK_Y = TILE_SIZE * 3;
    const BACKDROP_X = TILE_SIZE * 1;
    const BACKDROP_Y = TILE_SIZE * 1.5;

    p.setup = () => {
      p.createCanvas(FIELD_SIZE + 100, FIELD_SIZE + 180);
      p.frameRate(30);
      resetAnimation();
    };

    const resetAnimation = () => {
      phase = PHASE_NAVIGATE_TO_PIXEL;
      phaseStartTime = p.millis();
      robotX = START_X;
      robotY = START_Y;
      robotAngle = 0;
      hasPixel = false;
      pixelsOnBackdrop = 0;
      cycleCount = 0;
    };

    p.draw = () => {
      p.background(26, 26, 36);
      
      const currentTime = p.millis();
      const phaseTime = (currentTime - phaseStartTime) / 1000;

      // Draw field
      drawField(p);
      
      // Update and draw robot based on phase
      updatePhase(p, phaseTime);
      drawRobot(p);
      
      // Draw status indicator
      drawStatusIndicator(p);
    };

    const drawField = (p: p5) => {
      const offsetX = 50;
      const offsetY = 80;

      // Field background
      p.push();
      p.translate(offsetX, offsetY);
      p.fill(30, 35, 45);
      p.noStroke();
      p.rect(0, 0, FIELD_SIZE, FIELD_SIZE);

      // Grid lines (1ft tiles)
      p.stroke(50, 60, 70);
      p.strokeWeight(1);
      for (let i = 0; i <= 6; i++) {
        // Vertical lines
        p.line(i * TILE_SIZE, 0, i * TILE_SIZE, FIELD_SIZE);
        // Horizontal lines
        p.line(0, i * TILE_SIZE, FIELD_SIZE, i * TILE_SIZE);
      }

      // Field dimensions
      p.fill(100, 255, 150);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);
      p.text('12ft', FIELD_SIZE / 2, -10);
      p.text('12ft', -25, FIELD_SIZE / 2);

      // Truss/Stage Door (spanning mid-field)
      p.fill(80, 80, 100, 150);
      p.rect(0, TILE_SIZE * 2.5, FIELD_SIZE, TILE_SIZE * 0.5);
      p.fill(180, 180, 200);
      p.textSize(10);
      p.text('Truss / Stage Door', FIELD_SIZE / 2, TILE_SIZE * 2.75);

      // Backdrop area
      p.fill(120, 80, 150, 100);
      p.rect(0, 0, FIELD_SIZE, TILE_SIZE * 2);
      p.fill(200, 150, 255);
      p.textSize(11);
      p.text('Backdrop (3 pts/pixel)', FIELD_SIZE / 2, TILE_SIZE * 0.5);
      p.fill(180, 140, 220);
      p.textSize(9);
      p.text('Mosaics: +10 pts', FIELD_SIZE / 2, TILE_SIZE * 1);
      p.text('Height Lines: +10 pts/line', FIELD_SIZE / 2, TILE_SIZE * 1.5);

      // Backstage area
      p.fill(80, 120, 80, 100);
      p.rect(0, 0, TILE_SIZE * 1.5, TILE_SIZE * 2);
      p.fill(150, 255, 150);
      p.textSize(9);
      p.text('Backstage', TILE_SIZE * 0.75, TILE_SIZE * 0.5);
      p.text('1 pt/pixel', TILE_SIZE * 0.75, TILE_SIZE * 1);

      // Pixel stack location (wing area)
      p.fill(255, 200, 100, 150);
      p.ellipse(PIXEL_STACK_X, PIXEL_STACK_Y, TILE_SIZE * 0.8);
      p.fill(255, 220, 120);
      p.textSize(9);
      p.text('Pixel', PIXEL_STACK_X, PIXEL_STACK_Y - 15);
      p.text('Stack', PIXEL_STACK_X, PIXEL_STACK_Y + 15);

      // Draw pixel stack
      const remainingPixels = Math.max(0, 5 - pixelsOnBackdrop);
      for (let i = 0; i < remainingPixels; i++) {
        drawHexagon(p, PIXEL_STACK_X, PIXEL_STACK_Y - i * 4, 8, 255, 180, 0);
      }

      // Draw pixels on backdrop
      for (let i = 0; i < pixelsOnBackdrop; i++) {
        const backdropX = TILE_SIZE * 0.5 + (i % 3) * TILE_SIZE * 0.4;
        const backdropY = TILE_SIZE * 0.3 + Math.floor(i / 3) * TILE_SIZE * 0.4;
        drawHexagon(p, backdropX, backdropY, 8, 150, 100, 255);
      }

      p.pop();
    };

    const drawHexagon = (p: p5, x: number, y: number, size: number, r: number, g: number, b: number) => {
      p.push();
      p.translate(x, y);
      p.fill(r, g, b);
      p.stroke(Math.max(0, r - 50), Math.max(0, g - 50), Math.max(0, b - 50));
      p.strokeWeight(1);
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

    const updatePhase = (p: p5, phaseTime: number) => {
      const offsetX = 50;
      const offsetY = 80;

      switch (phase) {
        case PHASE_NAVIGATE_TO_PIXEL:
          // Navigate from start to pixel stack (~2.5 seconds)
          if (phaseTime < 2.5) {
            const progress = phaseTime / 2.5;
            const easedProgress = easeInOutQuad(progress);
            robotX = p.lerp(START_X, PIXEL_STACK_X, easedProgress);
            robotY = p.lerp(START_Y, PIXEL_STACK_Y, easedProgress);
            robotAngle = Math.atan2(PIXEL_STACK_Y - START_Y, PIXEL_STACK_X - START_X);
          } else {
            robotX = PIXEL_STACK_X;
            robotY = PIXEL_STACK_Y;
            phase = PHASE_COLLECT_PIXEL;
            phaseStartTime = p.millis();
          }
          break;

        case PHASE_COLLECT_PIXEL:
          // Collect pixel (~0.5 seconds)
          robotX = PIXEL_STACK_X;
          robotY = PIXEL_STACK_Y;
          if (phaseTime >= 0.5) {
            hasPixel = true;
            phase = PHASE_NAVIGATE_TO_BACKDROP;
            phaseStartTime = p.millis();
          }
          break;

        case PHASE_NAVIGATE_TO_BACKDROP:
          // Navigate to backdrop (~2.0 seconds)
          if (phaseTime < 2.0) {
            const progress = phaseTime / 2.0;
            const easedProgress = easeInOutQuad(progress);
            robotX = p.lerp(PIXEL_STACK_X, BACKDROP_X, easedProgress);
            robotY = p.lerp(PIXEL_STACK_Y, BACKDROP_Y, easedProgress);
            robotAngle = Math.atan2(BACKDROP_Y - PIXEL_STACK_Y, BACKDROP_X - PIXEL_STACK_X);
          } else {
            robotX = BACKDROP_X;
            robotY = BACKDROP_Y;
            phase = PHASE_PLACE_PIXEL;
            phaseStartTime = p.millis();
          }
          break;

        case PHASE_PLACE_PIXEL:
          // Place pixel on backdrop (~0.5 seconds)
          robotX = BACKDROP_X;
          robotY = BACKDROP_Y;
          if (phaseTime >= 0.5) {
            hasPixel = false;
            pixelsOnBackdrop++;
            cycleCount++;
            
            if (cycleCount < 3) {
              phase = PHASE_NAVIGATE_BACK;
              phaseStartTime = p.millis();
            } else {
              phase = PHASE_PAUSE;
              phaseStartTime = p.millis();
            }
          }
          break;

        case PHASE_NAVIGATE_BACK:
          // Navigate back to start (~2.0 seconds)
          if (phaseTime < 2.0) {
            const progress = phaseTime / 2.0;
            const easedProgress = easeInOutQuad(progress);
            robotX = p.lerp(BACKDROP_X, START_X, easedProgress);
            robotY = p.lerp(BACKDROP_Y, START_Y, easedProgress);
            robotAngle = Math.atan2(START_Y - BACKDROP_Y, START_X - BACKDROP_X);
          } else {
            robotX = START_X;
            robotY = START_Y;
            phase = PHASE_NAVIGATE_TO_PIXEL;
            phaseStartTime = p.millis();
          }
          break;

        case PHASE_PAUSE:
          // Pause before restarting (~2.0 seconds)
          if (phaseTime >= 2.0) {
            resetAnimation();
          }
          break;
      }
    };

    const drawRobot = (p: p5) => {
      const offsetX = 50;
      const offsetY = 80;

      p.push();
      p.translate(offsetX + robotX, offsetY + robotY);
      p.rotate(robotAngle);

      // Robot body
      p.fill(100, 255, 150);
      p.stroke(80, 200, 120);
      p.strokeWeight(2);
      p.rect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE);

      // Mecanum wheel indicators
      p.fill(60, 80, 60);
      p.noStroke();
      const wheelSize = 4;
      p.rect(-ROBOT_SIZE / 2 - 2, -ROBOT_SIZE / 2 + 2, wheelSize, wheelSize);
      p.rect(ROBOT_SIZE / 2 - 2, -ROBOT_SIZE / 2 + 2, wheelSize, wheelSize);
      p.rect(-ROBOT_SIZE / 2 - 2, ROBOT_SIZE / 2 - 6, wheelSize, wheelSize);
      p.rect(ROBOT_SIZE / 2 - 2, ROBOT_SIZE / 2 - 6, wheelSize, wheelSize);

      // Direction indicator
      p.fill(255, 255, 100);
      p.noStroke();
      p.triangle(
        ROBOT_SIZE / 2, 0,
        ROBOT_SIZE / 2 - 6, -4,
        ROBOT_SIZE / 2 - 6, 4
      );

      // Pixel being carried
      if (hasPixel) {
        drawHexagon(p, 0, 0, 6, 255, 180, 0);
      }

      // Motion indicators (speed lines)
      if (phase === PHASE_NAVIGATE_TO_PIXEL || phase === PHASE_NAVIGATE_TO_BACKDROP || phase === PHASE_NAVIGATE_BACK) {
        p.stroke(100, 255, 150, 100);
        p.strokeWeight(2);
        for (let i = 1; i <= 3; i++) {
          p.line(-ROBOT_SIZE / 2 - i * 4, 0, -ROBOT_SIZE / 2 - i * 4 - 4, 0);
        }
      }

      p.pop();
    };

    const drawStatusIndicator = (p: p5) => {
      p.fill(40, 45, 55);
      p.stroke(100, 255, 150);
      p.strokeWeight(2);
      p.rect(50, 10, FIELD_SIZE, 55);

      // Title
      p.fill(100, 255, 150);
      p.noStroke();
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(14);
      p.text('CenterStage Teleop Strategy', 60, 18);

      // Phase description
      p.textSize(11);
      p.fill(200, 220, 255);
      let phaseText = '';
      switch (phase) {
        case PHASE_NAVIGATE_TO_PIXEL:
          phaseText = 'Navigate through truss to pixel stack (~2.5s)';
          break;
        case PHASE_COLLECT_PIXEL:
          phaseText = 'Collect pixel with claw (~0.5s)';
          break;
        case PHASE_NAVIGATE_TO_BACKDROP:
          phaseText = 'Navigate to backdrop (~2.0s)';
          break;
        case PHASE_PLACE_PIXEL:
          phaseText = 'Place pixel on backdrop - 3 pts (~0.5s)';
          break;
        case PHASE_NAVIGATE_BACK:
          phaseText = 'Return to collection area (~2.0s)';
          break;
        case PHASE_PAUSE:
          phaseText = 'Cycle complete - Total: ~7.5s per pixel';
          break;
      }
      p.text(phaseText, 60, 36);

      // Stats
      p.textSize(10);
      p.fill(255, 220, 120);
      p.text(`Pixels scored: ${pixelsOnBackdrop} | Cycle: ${cycleCount + 1}/3`, 60, 52);

      // Timing info
      p.fill(180, 180, 200);
      p.textAlign(p.RIGHT, p.TOP);
      p.textSize(9);
      p.text('Alliance variation: Navigate via stage door or truss', FIELD_SIZE + 40, 52);
    };

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };
  };

  p5Instance = new p5(sketch, canvasContainer.value);
});

onUnmounted(() => {
  p5Instance?.remove();
});
</script>

<template>
  <div class="animation-wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="animation-caption">
      <strong>Teleop Strategy:</strong> Drivers navigate through truss or stage door to collect pixels one at a time from stacks or human station. 
      After loading, carefully navigate to backstage and place pixels on backdrop (3 pts each). 
      Strategy varies by alliance: focus on creating mosaics (3 identical or different pixels for 10 pt bonus) 
      and crossing height lines on backdrop (10 pts per line). Cycle time: ~7.5 seconds per pixel.
    </div>
  </div>
</template>

<style scoped>
.animation-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;
}

.animation-caption {
  max-width: 600px;
  text-align: center;
  color: #b0c4de;
  font-size: 0.95rem;
  line-height: 1.6;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .animation-caption {
    font-size: 0.85rem;
  }
}
</style>
