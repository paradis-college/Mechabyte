<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_COLLECT = 0;
const PHASE_NAVIGATE_TO_BACKDROP = 1;
const PHASE_PLACE_PIXEL = 2;
const PHASE_RETURN = 3;
const PHASE_PAUSE = 4;

onMounted(() => {
  if (!canvasContainer.value) return;

  const sketch = (p: p5) => {
    let phase = PHASE_COLLECT;
    let phaseTime = 0;
    let robotX = 0;
    let robotY = 0;
    let robotAngle = 0;
    let pixelHeld = false;
    let pixelsOnBackdrop: Array<{x: number, y: number, type: string}> = [];
    let mosaicCount = 0;
    let heightLine = 0;

    p.setup = () => {
      p.createCanvas(800, 600);
      p.frameRate(60);
      resetAnimation();
    };

    function resetAnimation() {
      phase = PHASE_COLLECT;
      phaseTime = 0;
      robotX = 100;
      robotY = 500;
      robotAngle = 0;
      pixelHeld = false;
      pixelsOnBackdrop = [];
      mosaicCount = 0;
      heightLine = 0;
    }

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    p.draw = () => {
      p.background(26, 26, 36);
      
      // Draw field with dimensions
      drawField(p);
      
      // Draw robot
      drawRobot(p, robotX, robotY, robotAngle, pixelHeld);
      
      // Draw backdrop with pixels
      drawBackdrop(p, pixelsOnBackdrop, heightLine);
      
      // Draw status indicator
      drawStatusIndicator(p, phase, pixelsOnBackdrop.length, mosaicCount, heightLine);
      
      // Update animation
      updateAnimation(p);
      
      phaseTime += p.deltaTime / 1000;
    };

    function drawField(p: p5) {
      // Field dimensions label
      p.fill(100, 255, 100);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(14);
      p.text('12ft × 12ft Field', 400, 20);
      
      // Grid (1ft tiles)
      p.stroke(50, 50, 60);
      p.strokeWeight(1);
      for (let i = 0; i <= 12; i++) {
        const x = 50 + i * 58.33;
        p.line(x, 50, x, 550);
        const y = 50 + i * 41.67;
        p.line(50, y, 750, y);
      }
      
      // Field border
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      p.noFill();
      p.rect(50, 50, 700, 500);
      
      // Truss (mid-field)
      p.fill(80, 80, 90);
      p.stroke(60, 60, 70);
      p.strokeWeight(2);
      p.rect(350, 250, 100, 50);
      p.fill(200, 200, 210);
      p.noStroke();
      p.textSize(12);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('TRUSS', 400, 275);
      
      // Backdrop zone (back)
      p.stroke(200, 100, 255);
      p.strokeWeight(2);
      p.noFill();
      p.rect(600, 80, 100, 100);
      p.fill(200, 100, 255);
      p.noStroke();
      p.textSize(10);
      p.text('Backdrop', 650, 65);
      p.text('2ft × 4ft', 650, 190);
      
      // Backstage zone
      p.stroke(100, 200, 255);
      p.strokeWeight(2);
      p.noFill();
      p.rect(600, 200, 100, 150);
      p.fill(100, 200, 255);
      p.noStroke();
      p.textSize(10);
      p.text('Backstage', 650, 365);
      
      // Pixel stacks (wing area)
      p.fill(255, 200, 100);
      p.stroke(200, 150, 50);
      p.strokeWeight(2);
      p.rect(100, 80, 40, 40);
      p.fill(255, 255, 255);
      p.noStroke();
      p.textSize(9);
      p.text('Pixel', 120, 95);
      p.text('Stack', 120, 107);
    }

    function drawBackdrop(p: p5, pixels: Array<{x: number, y: number, type: string}>, line: number) {
      // Draw placed pixels on backdrop
      pixels.forEach(pixel => {
        p.fill(pixel.type === 'green' ? p.color(100, 255, 100) : 
               pixel.type === 'purple' ? p.color(200, 100, 255) :
               p.color(255, 200, 100));
        p.noStroke();
        p.push();
        p.translate(pixel.x, pixel.y);
        // Hexagon
        p.beginShape();
        for (let i = 0; i < 6; i++) {
          const angle = p.TWO_PI / 6 * i;
          const px = 8 * Math.cos(angle);
          const py = 8 * Math.sin(angle);
          p.vertex(px, py);
        }
        p.endShape(p.CLOSE);
        p.pop();
      });
      
      // Height line indicator
      if (line > 0) {
        p.stroke(255, 255, 100);
        p.strokeWeight(3);
        const lineY = 180 - (line * 30);
        p.line(605, lineY, 695, lineY);
        p.fill(255, 255, 100);
        p.noStroke();
        p.textSize(10);
        p.text(`Line ${line}`, 710, lineY);
      }
    }

    function drawRobot(p: p5, x: number, y: number, angle: number, holding: boolean) {
      p.push();
      p.translate(x, y);
      p.rotate(angle);
      
      // Robot body (18" cube = ~30px)
      p.fill(100, 255, 100);
      p.stroke(80, 200, 80);
      p.strokeWeight(2);
      p.rect(-15, -15, 30, 30);
      
      // Mecanum wheels
      p.fill(60, 60, 70);
      p.noStroke();
      p.rect(-18, -10, 5, 8);
      p.rect(-18, 2, 5, 8);
      p.rect(13, -10, 5, 8);
      p.rect(13, 2, 5, 8);
      
      // Direction arrow
      p.fill(255, 255, 100);
      p.noStroke();
      p.triangle(0, -20, -5, -12, 5, -12);
      
      // Held pixel
      if (holding) {
        p.fill(255, 200, 100);
        p.stroke(200, 150, 50);
        p.strokeWeight(2);
        p.beginShape();
        for (let i = 0; i < 6; i++) {
          const a = p.TWO_PI / 6 * i;
          const px = 10 * Math.cos(a);
          const py = 10 * Math.sin(a) - 25;
          p.vertex(px, py);
        }
        p.endShape(p.CLOSE);
      }
      
      // Motion lines when moving
      if (phase === PHASE_NAVIGATE_TO_BACKDROP || phase === PHASE_RETURN) {
        p.stroke(100, 255, 100, 100);
        p.strokeWeight(2);
        p.line(-20, 0, -30, 0);
        p.line(-20, -8, -30, -8);
        p.line(-20, 8, -30, 8);
      }
      
      p.pop();
    }

    function drawStatusIndicator(p: p5, currentPhase: number, pixelCount: number, mosaics: number, line: number) {
      // Status box
      p.fill(20, 20, 30, 220);
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      p.rect(50, 560, 700, 35);
      
      // Phase indicator
      p.fill(100, 255, 100);
      p.noStroke();
      p.textSize(14);
      p.textAlign(p.LEFT, p.CENTER);
      let phaseText = '';
      switch(currentPhase) {
        case PHASE_COLLECT: phaseText = 'Collecting pixel from stack'; break;
        case PHASE_NAVIGATE_TO_BACKDROP: phaseText = 'Navigating through truss to backdrop'; break;
        case PHASE_PLACE_PIXEL: phaseText = 'Placing pixel on backdrop'; break;
        case PHASE_RETURN: phaseText = 'Returning for next pixel'; break;
        case PHASE_PAUSE: phaseText = 'Cycle complete - Looping'; break;
      }
      p.text(`Phase: ${phaseText}`, 60, 570);
      
      // Score info
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(`Pixels: ${pixelCount} | Mosaics: ${mosaics} | Height Line: ${line}`, 740, 577);
      p.text(`Score: ${pixelCount * 3 + mosaics * 10 + line * 10} pts`, 740, 588);
    }

    function updateAnimation(p: p5) {
      const duration = 3.0;
      
      switch(phase) {
        case PHASE_COLLECT: // Collect pixel from stack
          if (phaseTime < duration) {
            const progress = easeInOutCubic(phaseTime / duration);
            robotX = 100 + progress * 20;
            robotY = 500 - progress * 400;
            robotAngle = 0;
            if (progress > 0.7) {
              pixelHeld = true;
            }
          } else {
            phase = PHASE_NAVIGATE_TO_BACKDROP;
            phaseTime = 0;
          }
          break;
          
        case PHASE_NAVIGATE_TO_BACKDROP: // Navigate through truss to backdrop
          if (phaseTime < duration * 1.5) {
            const progress = easeInOutCubic(phaseTime / (duration * 1.5));
            // Path through truss
            if (progress < 0.4) {
              // Move to truss
              const subProgress = progress / 0.4;
              robotX = 120 + subProgress * 280;
              robotY = 100;
            } else if (progress < 0.7) {
              // Through truss
              const subProgress = (progress - 0.4) / 0.3;
              robotX = 400 + subProgress * 50;
              robotY = 100 + subProgress * 130;
            } else {
              // To backdrop
              const subProgress = (progress - 0.7) / 0.3;
              robotX = 450 + subProgress * 180;
              robotY = 230 - subProgress * 100;
            }
            robotAngle = 0;
          } else {
            phase = PHASE_PLACE_PIXEL;
            phaseTime = 0;
          }
          break;
          
        case PHASE_PLACE_PIXEL: // Place pixel on backdrop
          if (phaseTime < 1.0) {
            robotX = 630;
            robotY = 130;
            robotAngle = 0;
            if (phaseTime > 0.5) {
              if (pixelHeld) {
                pixelHeld = false;
                // Add pixel to backdrop
                const row = Math.floor(pixelsOnBackdrop.length / 3);
                const col = pixelsOnBackdrop.length % 3;
                pixelsOnBackdrop.push({
                  x: 620 + col * 25,
                  y: 100 + row * 25,
                  type: ['green', 'purple', 'yellow'][pixelsOnBackdrop.length % 3]
                });
                
                // Check for mosaic (3 in a row)
                if ((pixelsOnBackdrop.length % 3) === 0) {
                  mosaicCount++;
                }
                
                // Update height line
                heightLine = Math.min(3, Math.floor(pixelsOnBackdrop.length / 2));
              }
            }
          } else {
            if (pixelsOnBackdrop.length >= 6) {
              phase = PHASE_PAUSE;
              phaseTime = 0;
            } else {
              phase = PHASE_RETURN;
              phaseTime = 0;
            }
          }
          break;
          
        case PHASE_RETURN: // Return for next pixel
          if (phaseTime < duration) {
            const progress = easeInOutCubic(phaseTime / duration);
            robotX = 630 - progress * 530;
            robotY = 130 + progress * 370;
            robotAngle = progress * Math.PI;
          } else {
            phase = PHASE_COLLECT;
            phaseTime = 0;
          }
          break;
          
        case PHASE_PAUSE: // Pause before reset
          if (phaseTime > 2.0) {
            resetAnimation();
          }
          break;
      }
    }
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
      CenterStage TeleOp Strategy: Navigate through truss/stage door → Collect pixels from stacks → 
      Place on backdrop → Create mosaics (10pt bonus) → Cross height lines (10pts/line) → Repeat
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
  max-width: 800px;
  display: flex;
  justify-content: center;
  border: 2px solid var(--mechabyte-green);
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a24;
}

.animation-caption {
  margin-top: 1rem;
  text-align: center;
  color: var(--mechabyte-green);
  font-size: 0.95rem;
  max-width: 700px;
  line-height: 1.5;
}

@media (max-width: 1000px) {
  .canvas-wrapper {
    max-width: 100%;
  }
  
  .animation-caption {
    font-size: 0.85rem;
    padding: 0 1rem;
  }
}
</style>
