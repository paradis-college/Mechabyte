<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phase constants
const AnimationPhase = {
  COLLECT_PIXELS: 0,
  NAVIGATE_TO_BACKDROP: 1,
  PLACE_PIXELS: 2,
  LAUNCH_DRONE: 3,
  RESET: 4,
} as const;

type AnimationPhaseType = (typeof AnimationPhase)[keyof typeof AnimationPhase];

const sketch = (p: p5) => {
  // Field dimensions (12ft × 12ft represented as 576px × 576px, 1ft = 48px)
  const FIELD_SIZE = 576;
  const TILE_SIZE = 48; // 1 foot
  const ROBOT_SIZE = TILE_SIZE * 0.375; // 18 inch robot (0.375ft = 4.5 inches scaled)

  let robot = { x: 0, y: 0, targetX: 0, targetY: 0, angle: 0, speed: 2.5 };
  let pixels: Array<{
    x: number;
    y: number;
    collected: boolean;
    placedOnBackdrop: boolean;
  }> = [];
  let drone = { x: 0, y: 0, launched: false, velocity: { x: 0, y: 0 } };
  let animationPhase: AnimationPhaseType = AnimationPhase.COLLECT_PIXELS;
  let phaseTimer = 0;
  let currentPixelIndex = 0;

  p.setup = () => {
    const canvas = p.createCanvas(FIELD_SIZE, FIELD_SIZE);
    if (canvasContainer.value) {
      canvas.parent(canvasContainer.value);
    }

    // Initialize robot position (starting near wing)
    robot.x = TILE_SIZE * 2;
    robot.y = FIELD_SIZE - TILE_SIZE * 2;
    robot.targetX = robot.x;
    robot.targetY = robot.y;
    robot.angle = 0;

    // Initialize hexagonal pixels (3 on spike marks)
    for (let i = 0; i < 3; i++) {
      pixels.push({
        x: FIELD_SIZE / 2 - TILE_SIZE + i * TILE_SIZE,
        y: FIELD_SIZE / 2 + TILE_SIZE,
        collected: false,
        placedOnBackdrop: false,
      });
    }

    // Initialize drone (paper airplane)
    drone.x = robot.x;
    drone.y = robot.y;
    drone.launched = false;
  };

  p.draw = () => {
    p.background(40, 40, 50);

    // Draw field with measurements
    drawField(p);

    // Update animation
    phaseTimer++;

    // Animation state machine
    switch (animationPhase) {
      case AnimationPhase.COLLECT_PIXELS:
        handleCollectPixels(p);
        break;
      case AnimationPhase.NAVIGATE_TO_BACKDROP:
        handleNavigateToBackdrop(p);
        break;
      case AnimationPhase.PLACE_PIXELS:
        handlePlacePixels(p);
        break;
      case AnimationPhase.LAUNCH_DRONE:
        handleLaunchDrone(p);
        break;
      case AnimationPhase.RESET:
        handleReset();
        break;
    }

    // Draw game elements
    drawPixels(p);
    drawRobot(p);
    if (drone.launched || animationPhase === AnimationPhase.LAUNCH_DRONE) {
      drawDrone(p);
    }

    // Status indicator
    drawStatusIndicator(p);
  };

  const drawField = (p: p5) => {
    // Field border with dimension labels
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.noFill();
    p.rect(0, 0, FIELD_SIZE, FIELD_SIZE);

    // Field dimension labels (12ft × 12ft) - NO STROKE ON TEXT
    p.noStroke();
    p.fill(0, 255, 0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    p.text("12 ft", FIELD_SIZE / 2, -15);
    p.text("12 ft", -15, FIELD_SIZE / 2);

    // Grid lines (1ft tiles)
    p.stroke(60, 60, 70);
    p.strokeWeight(1);
    for (let i = 1; i < 12; i++) {
      p.line(i * TILE_SIZE, 0, i * TILE_SIZE, FIELD_SIZE);
      p.line(0, i * TILE_SIZE, FIELD_SIZE, i * TILE_SIZE);
    }

    // Truss (horizontal bar spanning mid-field at 6ft height)
    p.stroke(120, 120, 130);
    p.strokeWeight(8);
    p.line(0, FIELD_SIZE / 2, FIELD_SIZE, FIELD_SIZE / 2);
    p.noStroke();
    p.fill(180, 180, 190);
    p.textSize(12);
    p.text("Truss", FIELD_SIZE / 2, FIELD_SIZE / 2 - 15);

    // Backdrop area (right side, 2ft × 4ft)
    p.fill(50, 50, 70);
    p.stroke(0, 200, 255);
    p.strokeWeight(2);
    const backdropWidth = TILE_SIZE * 2;
    const backdropHeight = TILE_SIZE * 4;
    p.rect(
      FIELD_SIZE - backdropWidth,
      FIELD_SIZE / 2 - backdropHeight / 2,
      backdropWidth,
      backdropHeight,
    );
    p.noStroke();
    p.fill(0, 200, 255);
    p.textSize(11);
    p.text(
      "Backdrop",
      FIELD_SIZE - backdropWidth / 2,
      FIELD_SIZE / 2 - backdropHeight / 2 + 15,
    );
    p.text(
      "2ft × 4ft",
      FIELD_SIZE - backdropWidth / 2,
      FIELD_SIZE / 2 - backdropHeight / 2 + 30,
    );

    // Backstage area (behind backdrop)
    p.fill(60, 60, 80);
    p.stroke(0, 200, 255);
    p.strokeWeight(2);
    const backstageY = FIELD_SIZE / 2 + backdropHeight / 2 + 10;
    p.rect(
      FIELD_SIZE - backdropWidth,
      backstageY,
      backdropWidth,
      TILE_SIZE * 1.5,
    );
    p.noStroke();
    p.fill(0, 200, 255);
    p.textSize(10);
    p.text("Backstage", FIELD_SIZE - backdropWidth / 2, backstageY + 20);

    // Wing areas (front corners)
    p.fill(55, 55, 65);
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.rect(0, FIELD_SIZE - TILE_SIZE * 2, TILE_SIZE * 2, TILE_SIZE * 2);
    p.noStroke();
    p.fill(100, 255, 100);
    p.textSize(10);
    p.text("Wing", TILE_SIZE, FIELD_SIZE - TILE_SIZE);

    // Spike marks (pixel starting positions)
    for (let i = 0; i < 3; i++) {
      p.fill(200, 0, 200, 100);
      p.noStroke();
      const x = FIELD_SIZE / 2 - TILE_SIZE + i * TILE_SIZE;
      const y = FIELD_SIZE / 2 + TILE_SIZE;
      p.circle(x, y, 25);
    }
  };

  const drawRobot = (p: p5) => {
    p.push();
    p.translate(robot.x, robot.y);
    p.rotate(robot.angle);

    // Robot body (18" cube shown as square)
    p.fill(0, 220, 0);
    p.stroke(0, 180, 0);
    p.strokeWeight(2);
    p.rect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE);

    // Mecanum wheels indicators
    p.fill(80, 80, 80);
    p.noStroke();
    const wheelSize = ROBOT_SIZE * 0.2;
    p.circle(
      -ROBOT_SIZE / 2 + wheelSize / 2,
      -ROBOT_SIZE / 2 + wheelSize / 2,
      wheelSize,
    );
    p.circle(
      ROBOT_SIZE / 2 - wheelSize / 2,
      -ROBOT_SIZE / 2 + wheelSize / 2,
      wheelSize,
    );
    p.circle(
      -ROBOT_SIZE / 2 + wheelSize / 2,
      ROBOT_SIZE / 2 - wheelSize / 2,
      wheelSize,
    );
    p.circle(
      ROBOT_SIZE / 2 - wheelSize / 2,
      ROBOT_SIZE / 2 - wheelSize / 2,
      wheelSize,
    );

    // Crab claw intake indicator
    p.fill(255, 0, 255);
    p.rect(-ROBOT_SIZE / 2.5, -ROBOT_SIZE / 2 - 5, ROBOT_SIZE / 1.25, 5);

    // Direction indicator
    p.fill(255, 255, 0);
    p.triangle(
      0,
      -ROBOT_SIZE / 2 - 8,
      -5,
      -ROBOT_SIZE / 2 - 3,
      5,
      -ROBOT_SIZE / 2 - 3,
    );

    p.pop();
  };

  const drawPixels = (p: p5) => {
    for (const pixel of pixels) {
      if (!pixel.collected) {
        drawHexagon(p, pixel.x, pixel.y, 12, p.color(255, 0, 255));
      } else if (pixel.placedOnBackdrop) {
        // Show pixels on backdrop
        const backdropWidth = TILE_SIZE * 2;
        const backdropX = FIELD_SIZE - backdropWidth / 2;
        const pixelY = FIELD_SIZE / 2 + (pixels.indexOf(pixel) - 1) * 15;
        drawHexagon(p, backdropX, pixelY, 8, p.color(200, 0, 200));
      }
    }
  };

  const drawHexagon = (
    p: p5,
    x: number,
    y: number,
    size: number,
    color: p5.Color,
  ) => {
    p.push();
    p.translate(x, y);
    p.fill(color);
    p.stroke(220, 220, 220);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.PI / 3) * i;
      const px = size * p.cos(angle);
      const py = size * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
    p.pop();
  };

  const drawDrone = (p: p5) => {
    p.push();
    p.translate(drone.x, drone.y);

    // Paper airplane (triangular)
    p.fill(255, 200, 0);
    p.stroke(200, 160, 0);
    p.strokeWeight(2);
    p.beginShape();
    p.vertex(0, -12);
    p.vertex(-10, 8);
    p.vertex(0, 4);
    p.vertex(10, 8);
    p.endShape(p.CLOSE);

    // Flight trail
    if (drone.launched) {
      p.stroke(255, 200, 0, 100);
      p.strokeWeight(2);
      p.line(0, 0, -drone.velocity.x * 5, -drone.velocity.y * 5);
    }

    p.pop();
  };

  const drawStatusIndicator = (p: p5) => {
    p.noStroke();
    p.fill(255, 255, 255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    let status = "";
    switch (animationPhase) {
      case AnimationPhase.COLLECT_PIXELS:
        status = `Collecting Pixels (${currentPixelIndex + 1}/3)`;
        break;
      case AnimationPhase.NAVIGATE_TO_BACKDROP:
        status = "Navigating to Backdrop";
        break;
      case AnimationPhase.PLACE_PIXELS:
        status = "Placing Pixels on Backdrop";
        break;
      case AnimationPhase.LAUNCH_DRONE:
        status = "Launching Drone";
        break;
    }
    p.text(status, 10, 10);
  };

  const handleCollectPixels = (p: p5) => {
    const targetPixel = pixels[currentPixelIndex];
    if (targetPixel && !targetPixel.collected) {
      // Move towards pixel with smooth motion
      const dx = targetPixel.x - robot.x;
      const dy = targetPixel.y - robot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 3) {
        robot.x += (dx / distance) * robot.speed;
        robot.y += (dy / distance) * robot.speed;
        robot.angle = Math.atan2(dy, dx);
      } else {
        targetPixel.collected = true;
        currentPixelIndex++;
        phaseTimer = 0;
      }
    } else if (currentPixelIndex >= pixels.length) {
      // All pixels collected
      animationPhase = AnimationPhase.NAVIGATE_TO_BACKDROP;
      phaseTimer = 0;
    }
  };

  const handleNavigateToBackdrop = (p: p5) => {
    // Navigate to backdrop area
    const backdropWidth = TILE_SIZE * 2;
    const targetX = FIELD_SIZE - backdropWidth - ROBOT_SIZE;
    const targetY = FIELD_SIZE / 2;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      robot.x += (dx / distance) * robot.speed;
      robot.y += (dy / distance) * robot.speed;
      robot.angle = Math.atan2(dy, dx);
    } else {
      animationPhase = AnimationPhase.PLACE_PIXELS;
      phaseTimer = 0;
    }
  };

  const handlePlacePixels = (p: p5) => {
    // Simulate placing pixels on backdrop
    if (phaseTimer > 60) {
      for (const pixel of pixels) {
        if (pixel.collected) {
          pixel.placedOnBackdrop = true;
        }
      }
      animationPhase = AnimationPhase.LAUNCH_DRONE;
      phaseTimer = 0;
      drone.x = robot.x;
      drone.y = robot.y - ROBOT_SIZE;
    }
  };

  const handleLaunchDrone = (p: p5) => {
    if (!drone.launched && phaseTimer > 30) {
      drone.launched = true;
      // Launch over truss with parabolic trajectory
      drone.velocity.x = 3;
      drone.velocity.y = -6;
    }

    if (drone.launched) {
      // Update drone position with physics
      drone.x += drone.velocity.x;
      drone.y += drone.velocity.y;
      drone.velocity.y += 0.15; // Gravity

      // Check if drone has landed or gone off screen
      if (drone.y > FIELD_SIZE || drone.x > FIELD_SIZE || phaseTimer > 200) {
        animationPhase = AnimationPhase.RESET;
        phaseTimer = 0;
      }
    }
  };

  const handleReset = () => {
    if (phaseTimer > 60) {
      // Reset all state
      animationPhase = AnimationPhase.COLLECT_PIXELS;
      phaseTimer = 0;
      currentPixelIndex = 0;
      robot.x = TILE_SIZE * 2;
      robot.y = FIELD_SIZE - TILE_SIZE * 2;
      robot.angle = 0;

      pixels = [];
      for (let i = 0; i < 3; i++) {
        pixels.push({
          x: FIELD_SIZE / 2 - TILE_SIZE + i * TILE_SIZE,
          y: FIELD_SIZE / 2 + TILE_SIZE,
          collected: false,
          placedOnBackdrop: false,
        });
      }

      drone.x = robot.x;
      drone.y = robot.y;
      drone.launched = false;
      drone.velocity = { x: 0, y: 0 };
    }
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
      CenterStage Game Field (12ft × 12ft): Robot navigates to collect hexagonal
      pixels from spike marks, places them on the backdrop, and launches a paper
      drone over the truss into the backstage landing zone.
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
  max-width: 576px;
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
  max-width: 576px;
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
