<template>
  <div ref="canvasContainer" class="animation-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASES = {
  COLLECT: "collect",
  NAVIGATE_TO_BASKET: "navigate_to_basket",
  SCORE: "score",
  RETURN: "return",
  PAUSE: "pause",
} as const;

type Phase = (typeof PHASES)[keyof typeof PHASES];

onMounted(() => {
  if (!canvasContainer.value) return;

  const sketch = (p: p5) => {
    let currentPhase: Phase = PHASES.COLLECT;
    let phaseStartTime = 0;
    let robotX = 0;
    let robotY = 0;
    let targetX = 0;
    let targetY = 0;
    let sampleHeld = false;
    let samplesScored = 0;
    let sliderHeight = 0;
    let targetSliderHeight = 0;

    // Field dimensions
    const FIELD_SIZE = 144; // 12ft = 144 inches
    const TILE_SIZE = 24; // 2ft tiles
    const FIELD_SCALE = 4.5; // pixels per inch
    const FIELD_PIXEL_SIZE = FIELD_SIZE * FIELD_SCALE;
    const ROBOT_SIZE = 18 * FIELD_SCALE; // 18" robot

    // Zone dimensions
    const SUBMERSIBLE_SIZE = 48 * FIELD_SCALE; // 4ft × 4ft
    const BASKET_SIZE = 24 * FIELD_SCALE; // 2ft × 2ft
    const NET_ZONE_SIZE = 24 * FIELD_SCALE;

    p.setup = () => {
      const canvas = p.createCanvas(
        FIELD_PIXEL_SIZE + 100,
        FIELD_PIXEL_SIZE + 200,
      );
      canvas.parent(canvasContainer.value!);
      p.frameRate(60);

      // Initialize robot position at submersible
      robotX = FIELD_PIXEL_SIZE / 2;
      robotY = FIELD_PIXEL_SIZE - SUBMERSIBLE_SIZE / 2;
      phaseStartTime = p.millis();
    };

    p.draw = () => {
      p.background(26, 26, 36);

      // Draw field
      drawField();

      // Update and draw robot
      updateRobot();
      drawRobot();

      // Draw status
      drawStatus();
    };

    function drawField() {
      // Field border
      p.stroke(0, 255, 100);
      p.strokeWeight(3);
      p.noFill();
      p.rect(0, 0, FIELD_PIXEL_SIZE, FIELD_PIXEL_SIZE);

      // Grid lines (2ft tiles)
      p.stroke(0, 255, 100, 50);
      p.strokeWeight(1);
      for (let i = 1; i < 6; i++) {
        const pos = i * TILE_SIZE * FIELD_SCALE;
        p.line(pos, 0, pos, FIELD_PIXEL_SIZE);
        p.line(0, pos, FIELD_PIXEL_SIZE, pos);
      }

      // Field dimensions
      p.noStroke();
      p.fill(0, 255, 100);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(14);
      p.text("12ft", FIELD_PIXEL_SIZE / 2, -15);
      p.text("12ft", FIELD_PIXEL_SIZE / 2, FIELD_PIXEL_SIZE + 15);

      p.push();
      p.translate(-15, FIELD_PIXEL_SIZE / 2);
      p.rotate(-p.PI / 2);
      p.text("12ft", 0, 0);
      p.pop();

      p.push();
      p.translate(FIELD_PIXEL_SIZE + 15, FIELD_PIXEL_SIZE / 2);
      p.rotate(-p.PI / 2);
      p.text("12ft", 0, 0);
      p.pop();

      // Submersible (bottom center)
      p.stroke(100, 150, 255);
      p.strokeWeight(2);
      p.fill(100, 150, 255, 30);
      const submersibleX = FIELD_PIXEL_SIZE / 2 - SUBMERSIBLE_SIZE / 2;
      const submersibleY = FIELD_PIXEL_SIZE - SUBMERSIBLE_SIZE;
      p.rect(submersibleX, submersibleY, SUBMERSIBLE_SIZE, SUBMERSIBLE_SIZE);

      // Submersible ladder rungs
      p.stroke(150, 200, 255);
      p.strokeWeight(2);
      for (let i = 1; i < 4; i++) {
        const rungY = submersibleY + (SUBMERSIBLE_SIZE / 4) * i;
        p.line(
          submersibleX + 10,
          rungY,
          submersibleX + SUBMERSIBLE_SIZE - 10,
          rungY,
        );
      }

      p.noStroke();
      p.fill(100, 150, 255);
      p.textSize(12);
      p.text("Submersible", FIELD_PIXEL_SIZE / 2, submersibleY - 10);
      p.text(
        "4ft × 4ft",
        FIELD_PIXEL_SIZE / 2,
        submersibleY + SUBMERSIBLE_SIZE + 15,
      );

      // Sample stack (inside submersible)
      for (let i = 0; i < 3; i++) {
        p.fill(255, 200, 50);
        p.stroke(200, 150, 0);
        p.strokeWeight(2);
        p.circle(
          FIELD_PIXEL_SIZE / 2,
          submersibleY + SUBMERSIBLE_SIZE - 30 - i * 15,
          12,
        );
      }

      // High Basket (top right)
      p.stroke(255, 150, 0);
      p.strokeWeight(2);
      p.fill(255, 150, 0, 30);
      const basketX = FIELD_PIXEL_SIZE - BASKET_SIZE - 10;
      const basketY = 10;
      p.rect(basketX, basketY, BASKET_SIZE, BASKET_SIZE);

      p.noStroke();
      p.fill(255, 150, 0);
      p.textSize(12);
      p.text("High Basket", basketX + BASKET_SIZE / 2, basketY - 10);
      p.text("8 pts", basketX + BASKET_SIZE / 2, basketY + BASKET_SIZE + 15);
      p.text(
        "2ft × 2ft",
        basketX + BASKET_SIZE / 2,
        basketY + BASKET_SIZE + 30,
      );

      // Net Zone (bottom left)
      p.stroke(0, 255, 100);
      p.strokeWeight(2);
      p.fill(0, 255, 100, 30);
      p.rect(
        10,
        FIELD_PIXEL_SIZE - NET_ZONE_SIZE - 10,
        NET_ZONE_SIZE,
        NET_ZONE_SIZE,
      );

      p.noStroke();
      p.fill(0, 255, 100);
      p.textSize(12);
      p.text("Net Zone", 10 + NET_ZONE_SIZE / 2, FIELD_PIXEL_SIZE - 10);
      p.text(
        "2 pts",
        10 + NET_ZONE_SIZE / 2,
        FIELD_PIXEL_SIZE - NET_ZONE_SIZE - 15,
      );

      // Observation Zone (top left)
      p.stroke(150, 150, 255);
      p.strokeWeight(2);
      p.fill(150, 150, 255, 30);
      p.rect(10, 10, NET_ZONE_SIZE, NET_ZONE_SIZE);

      p.noStroke();
      p.fill(150, 150, 255);
      p.textSize(12);
      p.text("Observation", 10 + NET_ZONE_SIZE / 2, 10 + NET_ZONE_SIZE + 15);
      p.text("Zone", 10 + NET_ZONE_SIZE / 2, 10 + NET_ZONE_SIZE + 30);
    }

    function updateRobot() {
      const elapsed = p.millis() - phaseStartTime;
      const easeProgress = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      switch (currentPhase) {
        case PHASES.COLLECT:
          // Robot collects sample from submersible
          if (elapsed < 2000) {
            // Wait at submersible
            sampleHeld = false;
          } else if (elapsed < 3000) {
            // Pick up sample
            sampleHeld = true;
          } else {
            // Move to next phase
            currentPhase = PHASES.NAVIGATE_TO_BASKET;
            phaseStartTime = p.millis();
            targetX = FIELD_PIXEL_SIZE - BASKET_SIZE - 10 + BASKET_SIZE / 2;
            targetY = 10 + BASKET_SIZE / 2;
            targetSliderHeight = 40; // Extend slider
          }
          break;

        case PHASES.NAVIGATE_TO_BASKET:
          // Navigate to high basket
          if (elapsed < 4000) {
            const t = easeProgress(elapsed / 4000);
            robotX = p.lerp(FIELD_PIXEL_SIZE / 2, targetX, t);
            robotY = p.lerp(
              FIELD_PIXEL_SIZE - SUBMERSIBLE_SIZE / 2,
              targetY,
              t,
            );
            sliderHeight = p.lerp(0, targetSliderHeight, t);
          } else {
            robotX = targetX;
            robotY = targetY;
            sliderHeight = targetSliderHeight;
            currentPhase = PHASES.SCORE;
            phaseStartTime = p.millis();
          }
          break;

        case PHASES.SCORE:
          // Score sample in basket
          if (elapsed < 1500) {
            // Wait at basket
          } else if (elapsed < 2000) {
            // Release sample
            sampleHeld = false;
          } else {
            // Scored!
            samplesScored++;
            currentPhase = PHASES.RETURN;
            phaseStartTime = p.millis();
            targetX = FIELD_PIXEL_SIZE / 2;
            targetY = FIELD_PIXEL_SIZE - SUBMERSIBLE_SIZE / 2;
            targetSliderHeight = 0;
          }
          break;

        case PHASES.RETURN:
          // Return to submersible
          if (elapsed < 4000) {
            const t = easeProgress(elapsed / 4000);
            robotX = p.lerp(
              FIELD_PIXEL_SIZE - BASKET_SIZE - 10 + BASKET_SIZE / 2,
              targetX,
              t,
            );
            robotY = p.lerp(10 + BASKET_SIZE / 2, targetY, t);
            sliderHeight = p.lerp(40, 0, t);
          } else {
            robotX = targetX;
            robotY = targetY;
            sliderHeight = 0;
            currentPhase = PHASES.PAUSE;
            phaseStartTime = p.millis();
          }
          break;

        case PHASES.PAUSE:
          if (elapsed > 1000) {
            currentPhase = PHASES.COLLECT;
            phaseStartTime = p.millis();
          }
          break;
      }
    }

    function drawRobot() {
      p.push();
      p.translate(robotX, robotY);

      // Robot body
      p.fill(0, 255, 100);
      p.stroke(0, 200, 80);
      p.strokeWeight(2);
      p.rectMode(p.CENTER);
      p.rect(0, 0, ROBOT_SIZE, ROBOT_SIZE);

      // Vertical slider (if extended)
      if (sliderHeight > 0) {
        p.stroke(255, 200, 50);
        p.strokeWeight(4);
        p.line(0, -ROBOT_SIZE / 2, 0, -ROBOT_SIZE / 2 - sliderHeight);

        // Slider height annotation
        p.noStroke();
        p.fill(255, 200, 50);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(10);
        p.text(
          `${Math.round(sliderHeight / FIELD_SCALE)}"`,
          15,
          -ROBOT_SIZE / 2 - sliderHeight / 2,
        );
      }

      // Sample (if held)
      if (sampleHeld) {
        p.fill(255, 200, 50);
        p.stroke(200, 150, 0);
        p.strokeWeight(2);
        p.circle(0, -ROBOT_SIZE / 2 - sliderHeight - 10, 12);
      }

      // Direction indicator
      p.fill(255);
      p.noStroke();
      p.triangle(
        0,
        -ROBOT_SIZE / 3,
        -5,
        -ROBOT_SIZE / 3 + 8,
        5,
        -ROBOT_SIZE / 3 + 8,
      );

      // Robot label
      p.fill(255);
      p.textSize(10);
      p.text('18"', 0, 0);

      p.pop();

      // Motion lines when moving
      if (
        currentPhase === PHASES.NAVIGATE_TO_BASKET ||
        currentPhase === PHASES.RETURN
      ) {
        p.stroke(0, 255, 100, 100);
        p.strokeWeight(2);
        for (let i = 1; i <= 3; i++) {
          p.line(robotX - i * 5, robotY, robotX - i * 5 + 3, robotY);
        }
      }
    }

    function drawStatus() {
      // Status box
      const boxY = FIELD_PIXEL_SIZE + 20;
      p.fill(40, 40, 50);
      p.stroke(0, 255, 100);
      p.strokeWeight(2);
      p.rect(10, boxY, FIELD_PIXEL_SIZE - 20, 150);

      // Phase indicator
      p.noStroke();
      p.fill(0, 255, 100);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(16);

      let phaseText = "";
      let phaseColor = [0, 255, 100];

      switch (currentPhase) {
        case PHASES.COLLECT:
          phaseText = "Phase: Collecting Sample";
          break;
        case PHASES.NAVIGATE_TO_BASKET:
          phaseText = "Phase: Navigate to High Basket";
          phaseColor = [255, 200, 50];
          break;
        case PHASES.SCORE:
          phaseText = "Phase: Scoring in Basket";
          phaseColor = [255, 150, 0];
          break;
        case PHASES.RETURN:
          phaseText = "Phase: Return to Submersible";
          break;
        case PHASES.PAUSE:
          phaseText = "Phase: Ready for Next Cycle";
          break;
      }

      p.fill(phaseColor[0], phaseColor[1], phaseColor[2]);
      p.text(phaseText, 20, boxY + 15);

      // Progress bar
      const elapsed = p.millis() - phaseStartTime;
      let phaseDuration = 3000;

      switch (currentPhase) {
        case PHASES.COLLECT:
          phaseDuration = 3000;
          break;
        case PHASES.NAVIGATE_TO_BASKET:
        case PHASES.RETURN:
          phaseDuration = 4000;
          break;
        case PHASES.SCORE:
          phaseDuration = 2000;
          break;
        case PHASES.PAUSE:
          phaseDuration = 1000;
          break;
      }

      const progress = Math.min(elapsed / phaseDuration, 1);

      p.fill(60, 60, 70);
      p.noStroke();
      p.rect(20, boxY + 45, FIELD_PIXEL_SIZE - 60, 20);

      p.fill(phaseColor[0], phaseColor[1], phaseColor[2]);
      p.rect(20, boxY + 45, (FIELD_PIXEL_SIZE - 60) * progress, 20);

      // Samples scored counter
      p.fill(255, 150, 0);
      p.textSize(14);
      p.text(`Samples Scored: ${samplesScored}`, 20, boxY + 75);

      // Cycle time
      p.fill(255, 200, 50);
      p.text("Cycle Time: ~10-12 seconds", 20, boxY + 95);

      // Scoring info
      p.fill(150, 150, 255);
      p.textSize(12);
      p.text(
        "High Basket: 8 pts/sample  •  Net Zone: 2 pts/sample",
        20,
        boxY + 120,
      );
    }
  };

  p5Instance = new p5(sketch);
});

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
});
</script>

<style scoped>
.animation-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a24;
  padding: 20px;
  border-radius: 8px;
}
</style>
