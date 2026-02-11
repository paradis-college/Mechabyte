<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_SCORING = 0;
const PHASE_LAUNCH_DRONE = 1;
const PHASE_PARKING = 2;

const sketch = (p: p5) => {
  let currentPhase = PHASE_SCORING;
  let phaseProgress = 0;
  let phaseTimer = 0;
  const scoringDuration = 180; // Frames for scoring phase (15-20 seconds simulated)
  const launchDuration = 60; // Drone launch
  const parkingDuration = 90; // Parking phase
  const fieldSize = 440;
  const tileSize = fieldSize / 6;
  const fieldX = 80;
  const fieldY = 80;

  // Robot position
  let robotX = 0;
  let robotY = 0;
  let droneY = 0;
  let droneVelocityY = 0;
  let droneLaunched = false;
  let pixelsScored = 0;

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
      robotX = fieldX + tileSize * 4;
      robotY = fieldY + tileSize * 0.5;
      pixelsScored = Math.floor(phaseProgress * 5); // Simulate scoring 5 pixels

      if (phaseTimer > scoringDuration) {
        currentPhase = PHASE_LAUNCH_DRONE;
        phaseTimer = 0;
      }
    } else if (currentPhase === PHASE_LAUNCH_DRONE) {
      phaseProgress = Math.min(phaseTimer / launchDuration, 1);

      if (phaseTimer === 30) {
        droneLaunched = true;
        droneVelocityY = -8;
      }

      if (droneLaunched) {
        droneY += droneVelocityY;
        droneVelocityY += 0.15; // Gravity
      }

      if (phaseTimer > launchDuration) {
        currentPhase = PHASE_PARKING;
        phaseTimer = 0;
      }
    } else if (currentPhase === PHASE_PARKING) {
      phaseProgress = Math.min(phaseTimer / parkingDuration, 1);

      // Move robot to backstage
      const startX = fieldX + tileSize * 4;
      const endX = fieldX + tileSize * 0.5;
      robotX = p.lerp(startX, endX, phaseProgress);

      if (phaseTimer > parkingDuration) {
        // Reset animation
        currentPhase = PHASE_SCORING;
        phaseTimer = 0;
        droneLaunched = false;
        droneY = 0;
        droneVelocityY = 0;
        pixelsScored = 0;
      }
    }

    // Draw field with grid
    drawField(p);

    // Draw robot
    drawRobot(p, robotX, robotY);

    // Draw drone if launched
    if (droneLaunched && droneY < 200) {
      drawDrone(p, robotX, robotY + droneY);
    }

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

    // Backstage zone
    p.fill(80, 80, 120, 100);
    p.noStroke();
    p.rect(fieldX, fieldY, fieldSize, tileSize);
    p.textSize(13);
    p.fill(150, 200, 255);
    p.text("Backstage", fieldX + fieldSize / 2, fieldY + tileSize / 2);

    // Backdrop
    p.fill(120, 60, 150, 150);
    p.rect(fieldX, fieldY + tileSize * 0.2, fieldSize, tileSize * 0.3);
    p.fill(200);
    p.textSize(11);
    p.text("Backdrop", fieldX + fieldSize / 2, fieldY + tileSize * 0.35);

    // Truss indicator
    p.stroke(180, 180, 200);
    p.strokeWeight(2);
    p.line(
      fieldX,
      fieldY + tileSize * 2.5,
      fieldX + fieldSize,
      fieldY + tileSize * 2.5,
    );
    p.noStroke();
    p.fill(180, 180, 200);
    p.textSize(10);
    p.text("Truss", fieldX - 40, fieldY + tileSize * 2.5);
  };

  const drawRobot = (p: p5, x: number, y: number) => {
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

  const drawDrone = (p: p5, x: number, y: number) => {
    // Drone paper airplane
    p.fill(255, 255, 100);
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    p.triangle(x - 8, y + 5, x + 8, y + 5, x, y - 10);
  };

  const drawStatusIndicator = (p: p5) => {
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(13);
    p.fill(255, 255, 255);
    p.noStroke();

    let phaseText = "";
    let actionText = "";

    if (currentPhase === PHASE_SCORING) {
      phaseText = "Phase: Scoring Pixels (15-20s)";
      actionText = `Pixels scored: ${pixelsScored}`;
    } else if (currentPhase === PHASE_LAUNCH_DRONE) {
      phaseText = "Phase: Launch Drone";
      actionText = droneLaunched ? "Drone launched!" : "Preparing launch...";
    } else if (currentPhase === PHASE_PARKING) {
      phaseText = "Phase: Park in Backstage";
      actionText = "Moving to backstage...";
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
      totalProgress = phaseProgress / 3;
    } else if (currentPhase === PHASE_LAUNCH_DRONE) {
      totalProgress = (1 + phaseProgress) / 3;
    } else {
      totalProgress = (2 + phaseProgress) / 3;
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
