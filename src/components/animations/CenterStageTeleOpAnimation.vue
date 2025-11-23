<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement>();

onMounted(() => {
  if (!canvasContainer.value) return;

  const sketch = (p: p5) => {
    // Animation phases
    const PHASE_NAVIGATE = 0;
    const PHASE_COLLECT = 1;
    const PHASE_RETURN = 2;
    const PHASE_PLACE = 3;
    const PHASE_PAUSE = 4;

    let phase = PHASE_NAVIGATE;
    let phaseTimer = 0;
    let robot = { x: 0, y: 0, angle: 0 };
    let pixel = { x: 0, y: 0, held: false, placed: false };
    let pixelsPlaced = 0;
    let mosaicCount = 0;

    const FIELD_SIZE = 12; // 12ft field
    const TILE_SIZE = 1; // 1ft tiles

    p.setup = () => {
      const size = Math.min(canvasContainer.value?.clientWidth || 600, 600);
      p.createCanvas(size, size);
      p.frameRate(30);
      reset();
    };

    const reset = () => {
      phase = PHASE_NAVIGATE;
      phaseTimer = 0;
      robot = { x: 2, y: 10, angle: 0 }; // Start near wing
      pixel = { x: 4, y: 9, held: false, placed: false }; // Pixel at human station
      pixelsPlaced = 0;
      mosaicCount = 0;
    };

    p.draw = () => {
      const scale = p.width / FIELD_SIZE;

      // Background
      p.background(26, 26, 36);

      // Draw field grid (1ft tiles)
      p.stroke(60, 60, 80);
      p.strokeWeight(1);
      for (let i = 0; i <= FIELD_SIZE; i++) {
        p.line(i * scale, 0, i * scale, p.height);
        p.line(0, i * scale, p.width, i * scale);
      }

      // Draw zones
      drawZones(p, scale);

      // Draw labels
      drawLabels(p, scale);

      // Draw pixel (if not held and not placed)
      if (!pixel.held && !pixel.placed) {
        drawPixel(p, pixel.x * scale, pixel.y * scale, scale * 0.15);
      }

      // Draw robot
      drawRobot(p, robot.x * scale, robot.y * scale, robot.angle, scale);

      // Draw held pixel
      if (pixel.held) {
        drawPixel(p, robot.x * scale, robot.y * scale, scale * 0.15);
      }

      // Draw backdrop with placed pixels
      drawBackdrop(p, scale);

      // Status indicator
      drawStatus(p);

      // Update animation
      updateAnimation(p);
    };

    const drawZones = (p: p5, scale: number) => {
      // Backstage (top 2ft strip)
      p.fill(80, 120, 200, 30);
      p.noStroke();
      p.rect(0, 0, p.width, 2 * scale);

      // Backdrop (1ft behind backstage)
      p.fill(100, 140, 220, 50);
      p.rect(0, scale * 0.5, p.width, scale);

      // Truss (horizontal bar at middle)
      p.fill(150, 150, 150);
      p.rect(0, 6 * scale - scale * 0.1, p.width, scale * 0.2);

      // Wing (bottom left corner)
      p.fill(100, 200, 100, 40);
      p.rect(0, 9 * scale, 3 * scale, 3 * scale);

      // Human station marker
      p.fill(255, 200, 50);
      p.noStroke();
      p.ellipse(4 * scale, 9 * scale, scale * 0.3, scale * 0.3);
    };

    const drawLabels = (p: p5, scale: number) => {
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(scale * 0.2);
      
      // Clean text rendering - colored fill only, no stroke
      p.noStroke();
      
      // Field dimensions
      p.fill(100, 220, 100);
      p.text('12ft × 12ft', p.width / 2, scale * 0.25);

      // Zone labels
      p.fill(150, 180, 255);
      p.text('Backdrop', p.width / 2, scale);

      p.fill(150, 180, 255);
      p.text('Backstage', p.width / 2, scale * 1.5);

      p.fill(180, 180, 180);
      p.text('Truss', p.width / 2, 6 * scale);

      p.fill(150, 255, 150);
      p.text('Wing', scale * 1.5, 10.5 * scale);

      p.fill(255, 220, 100);
      p.text('Human Station', 4 * scale, 8.5 * scale);
    };

    const drawPixel = (p: p5, x: number, y: number, size: number) => {
      p.push();
      p.translate(x, y);
      
      // Hexagonal pixel
      p.fill(255, 200, 50);
      p.noStroke();
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        const angle = p.TWO_PI / 6 * i;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        p.vertex(px, py);
      }
      p.endShape(p.CLOSE);
      
      p.pop();
    };

    const drawRobot = (p: p5, x: number, y: number, angle: number, scale: number) => {
      p.push();
      p.translate(x, y);
      p.rotate(angle);

      const robotSize = scale * 0.7; // 18" robot in ~1ft space

      // Robot body
      p.fill(100, 220, 100);
      p.noStroke();
      p.rect(-robotSize / 2, -robotSize / 2, robotSize, robotSize, scale * 0.05);

      // Mecanum wheel indicators
      p.fill(80, 100, 80);
      const wheelSize = scale * 0.15;
      p.ellipse(-robotSize / 2 + wheelSize / 2, -robotSize / 2 + wheelSize / 2, wheelSize, wheelSize);
      p.ellipse(robotSize / 2 - wheelSize / 2, -robotSize / 2 + wheelSize / 2, wheelSize, wheelSize);
      p.ellipse(-robotSize / 2 + wheelSize / 2, robotSize / 2 - wheelSize / 2, wheelSize, wheelSize);
      p.ellipse(robotSize / 2 - wheelSize / 2, robotSize / 2 - wheelSize / 2, wheelSize, wheelSize);

      // Direction indicator
      p.fill(255, 255, 100);
      p.triangle(0, -robotSize / 2, -scale * 0.1, -robotSize / 2 + scale * 0.15, scale * 0.1, -robotSize / 2 + scale * 0.15);

      // Motion lines when moving
      if (phase === PHASE_NAVIGATE || phase === PHASE_RETURN) {
        p.stroke(100, 220, 100, 150);
        p.strokeWeight(2);
        for (let i = 0; i < 3; i++) {
          p.line(-robotSize / 2 - scale * 0.1 * (i + 1), 0, -robotSize / 2 - scale * 0.05 * (i + 1), 0);
        }
      }

      p.pop();
    };

    const drawBackdrop = (p: p5, scale: number) => {
      // Backdrop grid showing placed pixels
      const backdropY = scale * 0.5;
      const backdropHeight = scale;
      
      // Draw grid lines on backdrop
      p.stroke(120, 160, 240, 100);
      p.strokeWeight(1);
      const cols = 6;
      const rows = 3;
      for (let i = 0; i <= cols; i++) {
        const x = i * (p.width / cols);
        p.line(x, backdropY, x, backdropY + backdropHeight);
      }
      for (let i = 0; i <= rows; i++) {
        const y = backdropY + i * (backdropHeight / rows);
        p.line(0, y, p.width, y);
      }

      // Draw placed pixels on backdrop
      if (pixelsPlaced > 0) {
        for (let i = 0; i < pixelsPlaced; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = (col + 0.5) * (p.width / cols);
          const y = backdropY + (row + 0.5) * (backdropHeight / rows);
          drawPixel(p, x, y, scale * 0.12);
        }
      }

      // Mosaic indicator
      if (mosaicCount > 0) {
        p.noStroke();
        p.fill(255, 220, 100);
        p.textSize(scale * 0.18);
        p.text(`Mosaics: ${mosaicCount}`, p.width - scale * 1.5, backdropY + backdropHeight + scale * 0.3);
        p.text(`+${mosaicCount * 10} pts`, p.width - scale * 1.5, backdropY + backdropHeight + scale * 0.5);
      }
    };

    const drawStatus = (p: p5) => {
      const statusHeight = 80;
      const statusY = p.height - statusHeight - 10;
      
      p.fill(20, 20, 30, 220);
      p.noStroke();
      p.rect(10, statusY, p.width - 20, statusHeight, 8);

      p.fill(100, 220, 100);
      p.noStroke();
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(14);

      let statusText = '';
      if (phase === PHASE_NAVIGATE) {
        statusText = 'Navigating through truss to human station...';
      } else if (phase === PHASE_COLLECT) {
        statusText = 'Collecting pixel from human station';
      } else if (phase === PHASE_RETURN) {
        statusText = 'Returning to backdrop...';
      } else if (phase === PHASE_PLACE) {
        statusText = 'Placing pixel on backdrop';
      } else if (phase === PHASE_PAUSE) {
        statusText = 'Cycle complete - repeating...';
      }

      p.text(statusText, 20, statusY + 10);

      // Scoring info
      p.textSize(12);
      p.fill(200, 200, 200);
      p.text(`Pixels Placed: ${pixelsPlaced}`, 20, statusY + 35);
      p.text(`Score: ${pixelsPlaced * 3} pts (backdrop)`, 20, statusY + 52);

      // Timing
      p.fill(255, 220, 100);
      const time = (phaseTimer / 30).toFixed(1);
      p.text(`~${time}s`, p.width - 80, statusY + 35);
    };

    const updateAnimation = (p: p5) => {
      phaseTimer++;

      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      if (phase === PHASE_NAVIGATE) {
        // Move from wing (2, 10) through truss to human station (4, 9)
        const duration = 60; // 2 seconds
        const progress = Math.min(phaseTimer / duration, 1);
        const eased = easeInOut(progress);
        
        robot.x = 2 + eased * 2;
        robot.y = 10 - eased * 1;
        robot.angle = 0;

        if (progress >= 1) {
          phase = PHASE_COLLECT;
          phaseTimer = 0;
        }
      } else if (phase === PHASE_COLLECT) {
        // Collect pixel
        const duration = 30; // 1 second
        
        if (phaseTimer >= duration) {
          pixel.held = true;
          phase = PHASE_RETURN;
          phaseTimer = 0;
        }
      } else if (phase === PHASE_RETURN) {
        // Return to backdrop (0.5, 1)
        const duration = 90; // 3 seconds
        const progress = Math.min(phaseTimer / duration, 1);
        const eased = easeInOut(progress);
        
        robot.x = 4 - eased * 3.5;
        robot.y = 9 - eased * 8;
        robot.angle = -p.PI / 2;

        if (progress >= 1) {
          phase = PHASE_PLACE;
          phaseTimer = 0;
        }
      } else if (phase === PHASE_PLACE) {
        // Place pixel on backdrop
        const duration = 30; // 1 second
        
        if (phaseTimer >= duration) {
          pixel.held = false;
          pixel.placed = true;
          pixelsPlaced++;
          
          // Check for mosaic (every 3 pixels)
          if (pixelsPlaced % 3 === 0) {
            mosaicCount++;
          }

          phase = PHASE_PAUSE;
          phaseTimer = 0;
        }
      } else if (phase === PHASE_PAUSE) {
        // Pause before loop
        const duration = 30; // 1 second
        
        if (phaseTimer >= duration) {
          // Reset for next cycle (or full reset after 3 cycles)
          if (pixelsPlaced >= 9) {
            reset();
          } else {
            // Just reset for next pixel
            phase = PHASE_NAVIGATE;
            phaseTimer = 0;
            robot = { x: 2, y: 10, angle: 0 };
            pixel = { x: 4, y: 9, held: false, placed: false };
          }
        }
      }
    };
  };

  const p5Instance = new p5(sketch, canvasContainer.value);

  onUnmounted(() => {
    p5Instance.remove();
  });
});
</script>

<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
}
</style>
