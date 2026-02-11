<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_START = 0;
const PHASE_MOVE_TO_SUBMERSIBLE = 1;
const PHASE_COLLECT_SAMPLE = 2;
const PHASE_MOVE_TO_NET = 3;
const PHASE_COMPLETE = 4;

onMounted(() => {
  if (!canvasContainer.value) return;

  const sketch = (p: p5) => {
    let phase = PHASE_START;
    let phaseTimer = 0;
    const PHASE_DURATION = 90; // frames per phase

    // Robot position and state
    let robotX = 0;
    let robotY = 0;
    let robotAngle = 0;
    let sampleCollected = false;

    // Field constants
    const FIELD_SIZE = 400;
    const TILE_SIZE = FIELD_SIZE / 6; // 6x6 tiles
    const ROBOT_SIZE = 60; // 18" robot in visualization

    // Positions (in tiles, 1 tile = 2 feet)
    const START_POS = { x: 0.5, y: 0.5 }; // Bottom left corner
    const SUBMERSIBLE_POS = { x: 3, y: 3 }; // Center
    const NET_ZONE_POS = { x: 5.5, y: 0.5 }; // Bottom right corner

    p.setup = () => {
      const canvas = p.createCanvas(600, 550);
      canvas.parent(canvasContainer.value!);
      p.frameRate(30);
      resetAnimation();
    };

    function resetAnimation() {
      phase = PHASE_START;
      phaseTimer = 0;
      robotX = START_POS.x * TILE_SIZE;
      robotY = FIELD_SIZE - START_POS.y * TILE_SIZE;
      robotAngle = 0;
      sampleCollected = false;
    }

    p.draw = () => {
      p.background(26, 26, 36);

      const offsetX = (p.width - FIELD_SIZE) / 2;
      const offsetY = 50;

      p.push();
      p.translate(offsetX, offsetY);

      drawField(p);
      drawZones(p);
      drawSubmersible(p);
      drawRobot(p);
      drawLabels(p);

      p.pop();

      drawStatusIndicator(p);
      drawDimensionLabels(p, offsetX, offsetY);

      updatePhase(p);
      phaseTimer++;
    };

    function drawField(p: p5) {
      // Field border
      p.stroke(0, 255, 0);
      p.strokeWeight(3);
      p.noFill();
      p.rect(0, 0, FIELD_SIZE, FIELD_SIZE);

      // Grid lines (2ft tiles)
      p.stroke(0, 255, 0, 80);
      p.strokeWeight(1);
      for (let i = 1; i < 6; i++) {
        // Vertical lines
        p.line(i * TILE_SIZE, 0, i * TILE_SIZE, FIELD_SIZE);
        // Horizontal lines
        p.line(0, i * TILE_SIZE, FIELD_SIZE, i * TILE_SIZE);
      }
    }

    function drawZones(p: p5) {
      // Net Zone (bottom right, 2ft × 2ft)
      p.fill(0, 100, 255, 30);
      p.noStroke();
      p.rect(
        FIELD_SIZE - TILE_SIZE,
        FIELD_SIZE - TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
      );

      // Net Zone label
      p.fill(0, 180, 255);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);
      p.text(
        "Net Zone",
        FIELD_SIZE - TILE_SIZE / 2,
        FIELD_SIZE - TILE_SIZE / 2,
      );
      p.textSize(10);
      p.text(
        "2 pts",
        FIELD_SIZE - TILE_SIZE / 2,
        FIELD_SIZE - TILE_SIZE / 2 + 15,
      );
    }

    function drawSubmersible(p: p5) {
      const centerX = FIELD_SIZE / 2;
      const centerY = FIELD_SIZE / 2;
      const size = TILE_SIZE * 2.5; // 4ft × 4ft submersible

      // Submersible base
      p.fill(100, 100, 120);
      p.stroke(0, 255, 0);
      p.strokeWeight(2);
      p.rect(centerX - size / 2, centerY - size / 2, size, size, 5);

      // Ladder rungs
      p.stroke(255, 215, 0);
      p.strokeWeight(3);
      for (let i = 0; i < 4; i++) {
        const y = centerY - size / 2 + size * 0.2 + i * (size * 0.2);
        p.line(centerX - size * 0.3, y, centerX + size * 0.3, y);
      }

      // Sample holders (colored circles)
      const sampleColors = [
        [255, 0, 0],
        [255, 255, 0],
        [0, 100, 255],
      ];
      for (let i = 0; i < 3; i++) {
        p.fill(sampleColors[i][0], sampleColors[i][1], sampleColors[i][2]);
        p.noStroke();
        p.circle(centerX - 30 + i * 30, centerY + size * 0.35, 20);
      }

      // Label
      p.fill(255, 215, 0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(14);
      p.text("Submersible", centerX, centerY - size / 2 - 15);
      p.textSize(10);
      p.text("4ft × 4ft", centerX, centerY - size / 2 - 3);
    }

    function drawRobot(p: p5) {
      p.push();
      p.translate(robotX, robotY);
      p.rotate(robotAngle);

      // Robot body
      p.fill(80, 80, 90);
      p.stroke(0, 255, 0);
      p.strokeWeight(2);
      p.rect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE, 3);

      // Mechabyte logo color
      p.fill(0, 255, 0);
      p.noStroke();
      p.rect(
        -ROBOT_SIZE / 4,
        -ROBOT_SIZE / 4,
        ROBOT_SIZE / 2,
        ROBOT_SIZE / 2,
        2,
      );

      // Direction indicator
      p.fill(255, 215, 0);
      p.triangle(
        -ROBOT_SIZE * 0.2,
        0,
        ROBOT_SIZE * 0.3,
        -ROBOT_SIZE * 0.15,
        ROBOT_SIZE * 0.3,
        ROBOT_SIZE * 0.15,
      );

      // Sample if collected
      if (sampleCollected) {
        p.fill(255, 255, 0);
        p.noStroke();
        p.circle(0, -ROBOT_SIZE * 0.4, 15);
      }

      // Motion lines when moving
      if (phase === PHASE_MOVE_TO_SUBMERSIBLE || phase === PHASE_MOVE_TO_NET) {
        p.stroke(0, 255, 0, 150);
        p.strokeWeight(2);
        for (let i = 1; i <= 3; i++) {
          p.line(-ROBOT_SIZE * 0.4 - i * 8, -10, -ROBOT_SIZE * 0.4 - i * 8, 10);
        }
      }

      p.pop();
    }

    function drawLabels(p: p5) {
      p.fill(0, 255, 0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);

      // Start position
      p.textSize(11);
      p.text(
        "Start",
        START_POS.x * TILE_SIZE,
        FIELD_SIZE - START_POS.y * TILE_SIZE + 40,
      );

      // Coordinate labels
      p.textSize(10);
      p.fill(0, 255, 0, 150);

      // Column labels (A-F)
      for (let i = 0; i < 6; i++) {
        const letter = String.fromCharCode(65 + i); // A-F
        p.text(letter, i * TILE_SIZE + TILE_SIZE / 2, FIELD_SIZE + 15);
      }

      // Row labels (1-6)
      for (let i = 0; i < 6; i++) {
        const number = 6 - i; // 6-1 (top to bottom)
        p.text(number, -15, i * TILE_SIZE + TILE_SIZE / 2);
      }
    }

    function drawStatusIndicator(p: p5) {
      const x = p.width / 2;
      const y = 510;

      p.fill(26, 26, 36);
      p.stroke(0, 255, 0);
      p.strokeWeight(2);
      p.rect(x - 200, y, 400, 30, 5);

      p.fill(0, 255, 0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);

      let status = "";
      switch (phase) {
        case PHASE_START:
          status = "Autonomous Phase: Ready";
          break;
        case PHASE_MOVE_TO_SUBMERSIBLE:
          status = `Moving to Submersible (~1.5s)`;
          break;
        case PHASE_COLLECT_SAMPLE:
          status = "Collecting Sample from Submersible";
          break;
        case PHASE_MOVE_TO_NET:
          status = `Delivering to Net Zone (~2.0s)`;
          break;
        case PHASE_COMPLETE:
          status = "Autonomous Complete - 2 pts scored";
          break;
      }

      p.text(status, x, y + 15);

      // Progress bar
      const progressWidth = 380;
      const progress = phaseTimer / PHASE_DURATION;
      p.stroke(0, 255, 0, 50);
      p.strokeWeight(1);
      p.noFill();
      p.rect(x - progressWidth / 2, y + 25, progressWidth, 3);
      p.fill(0, 255, 0);
      p.noStroke();
      p.rect(x - progressWidth / 2, y + 25, progressWidth * progress, 3);
    }

    function drawDimensionLabels(p: p5, offsetX: number, offsetY: number) {
      p.fill(0, 255, 0);
      p.noStroke();
      p.textSize(11);
      p.textAlign(p.CENTER, p.CENTER);

      // Field dimensions
      p.text("12 ft", offsetX + FIELD_SIZE / 2, offsetY - 20);
      p.push();
      p.translate(offsetX - 20, offsetY + FIELD_SIZE / 2);
      p.rotate(-p.HALF_PI);
      p.text("12 ft", 0, 0);
      p.pop();

      // Tile size label
      p.textSize(9);
      p.fill(0, 255, 0, 150);
      p.text("2 ft per tile", offsetX + FIELD_SIZE + 40, offsetY + 20);
    }

    function updatePhase(p: p5) {
      if (phaseTimer > PHASE_DURATION) {
        phaseTimer = 0;
        phase++;

        if (phase > PHASE_COMPLETE) {
          resetAnimation();
          return;
        }
      }

      const t = p.constrain(phaseTimer / PHASE_DURATION, 0, 1);
      const easeT = easeInOutCubic(t);

      switch (phase) {
        case PHASE_START:
          // Stay at start
          break;

        case PHASE_MOVE_TO_SUBMERSIBLE:
          // Move from start to submersible
          robotX = p.lerp(
            START_POS.x * TILE_SIZE,
            SUBMERSIBLE_POS.x * TILE_SIZE,
            easeT,
          );
          robotY = p.lerp(
            FIELD_SIZE - START_POS.y * TILE_SIZE,
            FIELD_SIZE - SUBMERSIBLE_POS.y * TILE_SIZE,
            easeT,
          );
          robotAngle = p.lerp(0, -p.HALF_PI, easeT);
          break;

        case PHASE_COLLECT_SAMPLE:
          // Simulate sample collection
          if (t > 0.5 && !sampleCollected) {
            sampleCollected = true;
          }
          break;

        case PHASE_MOVE_TO_NET:
          // Move from submersible to net zone
          robotX = p.lerp(
            SUBMERSIBLE_POS.x * TILE_SIZE,
            NET_ZONE_POS.x * TILE_SIZE,
            easeT,
          );
          robotY = p.lerp(
            FIELD_SIZE - SUBMERSIBLE_POS.y * TILE_SIZE,
            FIELD_SIZE - NET_ZONE_POS.y * TILE_SIZE,
            easeT,
          );
          robotAngle = p.lerp(-p.HALF_PI, 0, easeT);
          break;

        case PHASE_COMPLETE:
          // Stay in net zone
          sampleCollected = false;
          break;
      }
    }

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  };

  p5Instance = new p5(sketch);
});

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
});
</script>

<template>
  <div class="animation-container">
    <div ref="canvasContainer" class="canvas-wrapper"></div>
    <p class="animation-caption">
      Into the Deep autonomous: Robot starts from observation zone, moves to
      submersible to collect sample (~1.5s), then delivers to net zone for
      scoring (~2.0s). Total autonomous time: ~3.5s, earning 2 points.
    </p>
  </div>
</template>

<style scoped>
.animation-container {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.animation-caption {
  text-align: center;
  font-size: 0.95rem;
  color: #a0a0a0;
  max-width: 600px;
  line-height: 1.5;
}
</style>
