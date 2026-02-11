<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_BACKSTAGE = 0;
const PHASE_AUDIENCE = 1;

const sketch = (p: p5) => {
  let currentPhase = PHASE_BACKSTAGE;
  let phaseProgress = 0;
  let phaseTimer = 0;
  const phaseDuration = 250; // Frames per trajectory
  const fieldSize = 440;
  const tileSize = fieldSize / 6;
  const fieldX = 80;
  const fieldY = 80;

  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(600, 620);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(26, 26, 36);

    phaseTimer++;
    phaseProgress = Math.min(phaseTimer / phaseDuration, 1);

    // Switch phases
    if (phaseTimer > phaseDuration) {
      currentPhase = (currentPhase + 1) % 2;
      phaseTimer = 0;
      phaseProgress = 0;
    }

    // Draw field with grid and dimensions
    drawField(p);

    // Draw trajectory based on current phase
    if (currentPhase === PHASE_BACKSTAGE) {
      drawBackstageTrajectory(p, phaseProgress);
    } else {
      drawAudienceTrajectory(p, phaseProgress);
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
    p.text("Autonomous Trajectories", p.width / 2, 35);

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

    // Tile coordinate labels (A-F, 1-6)
    p.textSize(11);
    p.fill(120);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    for (let i = 0; i < 6; i++) {
      // Column labels (A-F)
      p.text(
        String.fromCharCode(65 + i),
        fieldX + i * tileSize + tileSize / 2,
        fieldY - 12,
      );
      // Row labels (1-6)
      p.text(
        (i + 1).toString(),
        fieldX - 12,
        fieldY + i * tileSize + tileSize / 2,
      );
    }

    // Backstage zone
    p.fill(80, 80, 120, 100);
    p.noStroke();
    p.rect(fieldX, fieldY, fieldSize, tileSize);
    p.textSize(13);
    p.fill(150, 200, 255);
    p.text("Backstage", fieldX + fieldSize / 2, fieldY + tileSize / 2);

    // Truss (horizontal bar at mid-field)
    p.stroke(180);
    p.strokeWeight(5);
    p.line(
      fieldX + 20,
      fieldY + fieldSize / 2,
      fieldX + fieldSize - 20,
      fieldY + fieldSize / 2,
    );
    p.textSize(11);
    p.fill(180);
    p.noStroke();
    p.text("Truss", fieldX + fieldSize / 2, fieldY + fieldSize / 2 - 12);

    // Alliance markers
    p.textSize(12);
    p.fill(255, 100, 100);
    p.text("Red Alliance", fieldX + tileSize * 1.5, fieldY + fieldSize + 20);
    p.fill(100, 150, 255);
    p.text("Blue Alliance", fieldX + tileSize * 4.5, fieldY + fieldSize + 20);
  };

  const drawBackstageTrajectory = (p: p5, progress: number) => {
    // Starting position (A6 - bottom left, facing backstage)
    const startX = fieldX + tileSize * 0.5;
    const startY = fieldY + tileSize * 5.5;

    // End position (A1 - backstage)
    const endX = fieldX + tileSize * 0.5;
    const endY = fieldY + tileSize * 0.5;

    // Draw path line
    p.stroke(0, 255, 100, 150);
    p.strokeWeight(4);
    p.line(startX, startY, endX, endY);

    // Draw distance annotation
    const distance = 10; // 5 tiles × 2ft = 10ft
    p.textSize(12);
    p.fill(255, 200, 0);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Distance: ${distance}ft`, startX + 15, (startY + endY) / 2);

    // Estimated time (1.5s at 30in/s = ~6.5ft/s)
    p.text("Time: ~1.5s", startX + 15, (startY + endY) / 2 + 20);
    p.text("Speed: ~30in/s", startX + 15, (startY + endY) / 2 + 40);

    // Starting position marker
    p.fill(100, 150, 255);
    p.noStroke();
    p.circle(startX, startY, 20);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.fill(255);
    p.text("A6", startX, startY);

    // End position marker
    p.fill(0, 255, 100);
    p.circle(endX, endY, 20);
    p.fill(30);
    p.text("A1", endX, endY);

    // Direction arrow
    drawDirectionArrow(p, startX, startY, endX, endY);

    // Animate robot
    const robotX = startX;
    const robotY = p.lerp(startY, endY, easeInOut(progress));
    drawRobot(p, robotX, robotY, -p.HALF_PI, progress);

    // Trajectory description
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(14);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Starting Position: Backstage-Facing", p.width / 2, 545);
    p.textSize(12);
    p.fill(200);
    p.text(
      "Robot faces backstage - drives straight forward to parking zone",
      p.width / 2,
      568,
    );
    p.text("Simple trajectory with pre-loaded pixel drop", p.width / 2, 590);
  };

  const drawAudienceTrajectory = (p: p5, progress: number) => {
    // Starting position (B6 - facing audience/red alliance)
    const startX = fieldX + tileSize * 1.5;
    const startY = fieldY + tileSize * 5.5;

    // Waypoint (C2)
    const waypointX = fieldX + tileSize * 2.5;
    const waypointY = fieldY + tileSize * 1.5;

    // End position (A1 - backstage)
    const endX = fieldX + tileSize * 0.5;
    const endY = fieldY + tileSize * 0.5;

    // Draw path lines
    p.stroke(0, 255, 100, 150);
    p.strokeWeight(4);
    p.line(startX, startY, waypointX, waypointY);
    p.line(waypointX, waypointY, endX, endY);

    // Starting position marker
    p.fill(255, 100, 100);
    p.noStroke();
    p.circle(startX, startY, 20);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.fill(255);
    p.text("B6", startX, startY);

    // Waypoint marker (C2)
    p.fill(255, 200, 0);
    p.circle(waypointX, waypointY, 24);
    p.fill(30);
    p.textSize(11);
    p.text("C2", waypointX, waypointY);

    // End position marker
    p.fill(0, 255, 100);
    p.circle(endX, endY, 20);
    p.fill(30);
    p.textSize(10);
    p.text("A1", endX, endY);

    // Distance and timing annotations
    p.textSize(11);
    p.fill(255, 200, 0);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);

    // First segment (B6 → C2)
    const dist1 =
      Math.sqrt(
        Math.pow((waypointX - startX) / tileSize, 2) +
          Math.pow((waypointY - startY) / tileSize, 2),
      ) * 2;
    p.text(
      `Seg 1: ${dist1.toFixed(1)}ft`,
      (startX + waypointX) / 2 + 10,
      (startY + waypointY) / 2,
    );
    p.text(
      "~3.0s",
      (startX + waypointX) / 2 + 10,
      (startY + waypointY) / 2 + 18,
    );

    // Second segment (C2 → A1)
    const dist2 =
      Math.sqrt(
        Math.pow((endX - waypointX) / tileSize, 2) +
          Math.pow((endY - waypointY) / tileSize, 2),
      ) * 2;
    p.text(
      `Seg 2: ${dist2.toFixed(1)}ft`,
      (waypointX + endX) / 2 + 10,
      (waypointY + endY) / 2,
    );
    p.text("~1.5s", (waypointX + endX) / 2 + 10, (waypointY + endY) / 2 + 18);

    // Direction arrows
    drawDirectionArrow(p, startX, startY, waypointX, waypointY);
    drawDirectionArrow(p, waypointX, waypointY, endX, endY);

    // Animate robot through two segments
    let robotX, robotY, robotAngle;

    if (progress < 0.6) {
      // First segment (B6 → C2): 60% of animation time
      const t = easeInOut(progress / 0.6);
      robotX = p.lerp(startX, waypointX, t);
      robotY = p.lerp(startY, waypointY, t);
      robotAngle =
        Math.atan2(waypointY - startY, waypointX - startX) - p.HALF_PI;
    } else {
      // Second segment (C2 → A1): 40% of animation time
      const t = easeInOut((progress - 0.6) / 0.4);
      robotX = p.lerp(waypointX, endX, t);
      robotY = p.lerp(waypointY, endY, t);
      robotAngle = Math.atan2(endY - waypointY, endX - waypointX) - p.HALF_PI;
    }

    drawRobot(p, robotX, robotY, robotAngle, progress);

    // Trajectory description
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(14);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Starting Position: Audience-Facing", p.width / 2, 545);
    p.textSize(12);
    p.fill(200);
    p.text(
      "Robot faces audience - drives forward to C2, then strafes left to backstage",
      p.width / 2,
      568,
    );
    p.text(
      "Total time: ~4.5s (uses waypoint for navigation)",
      p.width / 2,
      590,
    );
  };

  const drawRobot = (
    p: p5,
    x: number,
    y: number,
    angle: number,
    progress: number,
  ) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);

    // Robot chassis (18" cube scaled)
    p.fill(40, 40, 50);
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    const robotSize = 25;
    p.rect(-robotSize / 2, -robotSize / 2, robotSize, robotSize);

    // Mechabyte logo/indicator
    p.fill(0, 255, 100);
    p.noStroke();
    p.circle(0, 0, 10);

    // Direction arrow
    p.fill(255, 200, 0);
    p.triangle(
      0,
      -robotSize / 2 - 3,
      -6,
      -robotSize / 2 - 12,
      6,
      -robotSize / 2 - 12,
    );

    // Motion indicator (speed lines when moving)
    if (progress > 0.05 && progress < 0.95) {
      p.stroke(0, 255, 100, 150);
      p.strokeWeight(2);
      for (let i = 0; i < 3; i++) {
        p.line(
          -robotSize / 2 - 5 - i * 4,
          -robotSize / 4 + i * 6,
          -robotSize / 2 - 10 - i * 4,
          -robotSize / 4 + i * 6,
        );
      }
    }

    p.pop();
  };

  const drawDirectionArrow = (
    p: p5,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    p.push();
    p.translate(midX, midY);
    p.rotate(angle);

    // Arrow head
    p.fill(0, 255, 100);
    p.noStroke();
    p.triangle(12, 0, 0, -7, 0, 7);

    p.pop();
  };

  const drawStatusIndicator = (p: p5) => {
    const boxX = 20;
    const boxY = 545;
    const boxW = 140;
    const boxH = 60;

    // Background box
    p.fill(40, 40, 50);
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.rect(boxX, boxY, boxW, boxH, 5);

    // Status text
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    p.fill(150, 200, 255);
    p.noStroke();
    p.text("Current Trajectory:", boxX + 8, boxY + 8);

    p.textSize(13);
    p.fill(0, 255, 100);
    if (currentPhase === PHASE_BACKSTAGE) {
      p.text("Backstage-Facing", boxX + 8, boxY + 26);
    } else {
      p.text("Audience-Facing", boxX + 8, boxY + 26);
    }

    // Progress bar
    p.fill(60, 60, 70);
    p.noStroke();
    p.rect(boxX + 8, boxY + 45, boxW - 16, 8, 4);

    p.fill(0, 255, 100);
    p.rect(boxX + 8, boxY + 45, (boxW - 16) * phaseProgress, 8, 4);
  };

  const easeInOut = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
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
    <p class="animation-caption">
      Autonomous trajectories with timing and velocity annotations:
      backstage-facing (1.5s) vs audience-facing (4.5s via C2 waypoint)
    </p>
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
  background: #1a1a24;
}

.animation-caption {
  font-size: 0.9vw;
  color: var(--mechabyte-green);
  text-align: center;
  font-style: italic;
  max-width: 600px;
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
