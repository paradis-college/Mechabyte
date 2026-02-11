<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_SCORING = 0;
const PHASE_PARKING = 1;

const sketch = (p: p5) => {
  let currentPhase = PHASE_SCORING;
  let phaseProgress = 0;
  let phaseTimer = 0;
  const scoringDuration = 180; // Frames for scoring phase (15-20 seconds simulated)
  const parkingDuration = 90; // Parking phase
  const fieldSize = 440;
  const tileSize = fieldSize / 6;
  const fieldX = 80;
  const fieldY = 80;

  // Robot position
  let robotX = 0;
  let robotY = 0;
  let sliderHeight = 0;
  let samplesScored = 0;

  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(600, 620);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(26, 26, 36);

    phaseTimer++;

    // Phase management
    if (currentPhase === PHASE_SCORING) {
      phaseProgress = Math.min(phaseTimer / scoringDuration, 1);
      robotX = fieldX + tileSize * 4.5;
      robotY = fieldY + tileSize * 4;

      // Animate slider up and down
      const scoringCycle = (phaseTimer % 40) / 40;
      sliderHeight =
        scoringCycle < 0.5 ? scoringCycle * 2 : (1 - scoringCycle) * 2;

      samplesScored = Math.floor(phaseProgress * 5); // Simulate scoring 5 samples

      if (phaseTimer > scoringDuration) {
        currentPhase = PHASE_PARKING;
        phaseTimer = 0;
        sliderHeight = 0;
      }
    } else if (currentPhase === PHASE_PARKING) {
      phaseProgress = Math.min(phaseTimer / parkingDuration, 1);

      // Move robot to net zone (observation area)
      const startX = fieldX + tileSize * 4.5;
      const startY = fieldY + tileSize * 4;
      const endX = fieldX + tileSize * 5;
      const endY = fieldY + tileSize * 5;

      robotX = p.lerp(startX, endX, phaseProgress);
      robotY = p.lerp(startY, endY, phaseProgress);

      if (phaseTimer > parkingDuration) {
        // Reset animation
        currentPhase = PHASE_SCORING;
        phaseTimer = 0;
        samplesScored = 0;
      }
    }

    // Draw field with zones
    drawField(p);

    // Draw robot with slider
    drawRobot(p, robotX, robotY, sliderHeight);

    // Draw status indicator
    drawStatusIndicator(p);
  };

  const drawField = (p: p5) => {
    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(20);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Endgame Strategy", p.width / 2, 35);

    // Field dimensions label
    p.textSize(14);
    p.fill(150, 200, 255);
    p.text("12ft × 12ft Field", p.width / 2, 60);

    // Draw field border
    p.stroke(0, 255, 100);
    p.strokeWeight(3);
    p.noFill();
    p.rect(fieldX, fieldY, fieldSize, fieldSize);

    // Draw grid (2ft tiles)
    p.stroke(0, 255, 100, 80);
    p.strokeWeight(1);
    for (let i = 1; i < 6; i++) {
      p.line(
        fieldX + i * tileSize,
        fieldY,
        fieldX + i * tileSize,
        fieldY + fieldSize,
      );
      p.line(
        fieldX,
        fieldY + i * tileSize,
        fieldX + fieldSize,
        fieldY + i * tileSize,
      );
    }

    // Submersible zone (center 4x4 tiles)
    p.fill(60, 100, 150, 100);
    p.noStroke();
    p.rect(fieldX + tileSize, fieldY + tileSize, tileSize * 4, tileSize * 4);
    p.textSize(13);
    p.fill(150, 200, 255);
    p.text("Submersible", fieldX + tileSize * 3, fieldY + tileSize * 3);

    // Net zones (corners)
    p.fill(100, 150, 80, 100);
    p.noStroke();

    // Bottom right net zone (observation area)
    p.rect(fieldX + tileSize * 5, fieldY + tileSize * 5, tileSize, tileSize);
    p.fill(150, 255, 150);
    p.textSize(10);
    p.text("Net Zone", fieldX + tileSize * 5.5, fieldY + tileSize * 5.3);
    p.text("(Observation)", fieldX + tileSize * 5.5, fieldY + tileSize * 5.6);

    // High basket
    p.fill(255, 150, 50, 150);
    p.stroke(255, 100, 0);
    p.strokeWeight(2);
    p.rect(
      fieldX + tileSize * 4.7,
      fieldY + tileSize * 4.7,
      tileSize * 0.6,
      tileSize * 0.6,
    );
    p.noStroke();
    p.fill(255, 200, 100);
    p.textSize(9);
    p.text("Basket", fieldX + tileSize * 5, fieldY + tileSize * 5);
  };

  const drawRobot = (p: p5, x: number, y: number, sliderExt: number) => {
    // Slider (vertical line extending up)
    const maxSliderHeight = 80;
    const currentSliderHeight = sliderExt * maxSliderHeight;

    p.stroke(200, 200, 220);
    p.strokeWeight(3);
    p.line(x, y - 20, x, y - 20 - currentSliderHeight);

    // Arm/intake at top of slider
    if (currentSliderHeight > 0) {
      p.fill(150, 150, 200);
      p.noStroke();
      p.rect(x - 12, y - 25 - currentSliderHeight, 24, 10);
    }

    // Robot body
    p.fill(0, 200, 255);
    p.stroke(0, 255, 255);
    p.strokeWeight(2);
    p.rect(x - 20, y - 20, 40, 40);

    // Robot center
    p.fill(255);
    p.noStroke();
    p.circle(x, y, 8);
  };

  const drawStatusIndicator = (p: p5) => {
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(13);
    p.fill(255, 255, 255);
    p.noStroke();

    let phaseText = "";
    let actionText = "";

    if (currentPhase === PHASE_SCORING) {
      phaseText = "Phase: Continue Scoring (15-20s)";
      actionText = `Samples scored in high basket: ${samplesScored}`;
    } else if (currentPhase === PHASE_PARKING) {
      phaseText = "Phase: Park in Net Zone";
      actionText = "Moving to observation area (+3 pts)";
    }

    p.text(phaseText, 60, 560);
    p.text(actionText, 60, 580);

    // Progress bar
    p.fill(50, 50, 60);
    p.rect(60, 590, 480, 15);
    p.fill(0, 255, 100);
    p.noStroke();

    let totalProgress = 0;
    if (currentPhase === PHASE_SCORING) {
      totalProgress = phaseProgress / 2;
    } else {
      totalProgress = (1 + phaseProgress) / 2;
    }

    p.rect(60, 590, 480 * totalProgress, 15);
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
  </div>
</template>

<style scoped>
.animation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vw 0;
  padding: 1vw;
  background: rgba(0, 0, 0, 0.2);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1000px) {
  .animation-wrapper {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 5px;
  }
}
</style>
