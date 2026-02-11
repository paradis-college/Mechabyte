<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phase constants
const AnimationPhase = {
  COLLECT_SAMPLES: 0,
  NAVIGATE_TO_BASKET: 1,
  SCORE_IN_BASKET: 2,
  NAVIGATE_TO_SUBMERSIBLE: 3,
  CLIMB_SUBMERSIBLE: 4,
  RESET: 5,
} as const;

type AnimationPhaseType = (typeof AnimationPhase)[keyof typeof AnimationPhase];

const sketch = (p: p5) => {
  // Field dimensions (12ft × 12ft represented as 576px × 576px, 1ft = 48px)
  const FIELD_SIZE = 576;
  const TILE_SIZE = 48; // 1 foot
  const ROBOT_SIZE = TILE_SIZE * 0.375; // 18 inch robot

  let robot = {
    x: 0,
    y: 0,
    angle: 0,
    speed: 2.5,
    arm: { extended: false, height: 0, targetHeight: 0 },
  };
  let samples: Array<{
    x: number;
    y: number;
    color: p5.Color;
    collected: boolean;
  }> = [];
  let animationPhase: AnimationPhaseType = AnimationPhase.COLLECT_SAMPLES;
  let phaseTimer = 0;
  let currentSampleIndex = 0;
  let climbProgress = 0;

  p.setup = () => {
    const canvas = p.createCanvas(FIELD_SIZE, FIELD_SIZE);
    if (canvasContainer.value) {
      canvas.parent(canvasContainer.value);
    }

    // Initialize robot position (starting position)
    robot.x = TILE_SIZE * 2;
    robot.y = FIELD_SIZE - TILE_SIZE * 2;
    robot.angle = 0;
    robot.arm.extended = false;
    robot.arm.height = 0;

    // Initialize colored samples around submersible
    const colors = [
      p.color(255, 50, 50), // Red
      p.color(50, 50, 255), // Blue
      p.color(255, 255, 50), // Yellow
    ];
    for (let i = 0; i < 3; i++) {
      samples.push({
        x: FIELD_SIZE / 2 - TILE_SIZE + i * TILE_SIZE,
        y: FIELD_SIZE / 2 + TILE_SIZE * 1.5,
        color: colors[i],
        collected: false,
      });
    }
  };

  p.draw = () => {
    p.background(40, 40, 50);

    // Draw field with measurements
    drawField(p);

    // Update animation
    phaseTimer++;

    // Update arm extension animation
    if (robot.arm.extended) {
      robot.arm.height += (robot.arm.targetHeight - robot.arm.height) * 0.1;
    } else {
      robot.arm.height *= 0.9;
    }

    // Animation state machine
    switch (animationPhase) {
      case AnimationPhase.COLLECT_SAMPLES:
        handleCollectSamples(p);
        break;
      case AnimationPhase.NAVIGATE_TO_BASKET:
        handleNavigateToBasket(p);
        break;
      case AnimationPhase.SCORE_IN_BASKET:
        handleScoreInBasket(p);
        break;
      case AnimationPhase.NAVIGATE_TO_SUBMERSIBLE:
        handleNavigateToSubmersible(p);
        break;
      case AnimationPhase.CLIMB_SUBMERSIBLE:
        handleClimbSubmersible(p);
        break;
      case AnimationPhase.RESET:
        handleReset();
        break;
    }

    // Draw game elements
    drawSamples(p);
    drawRobot(p);

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

    // Central submersible structure (4ft × 4ft)
    const submersibleSize = TILE_SIZE * 4;
    const submersibleX = FIELD_SIZE / 2 - submersibleSize / 2;
    const submersibleY = FIELD_SIZE / 2 - submersibleSize / 2;

    p.fill(70, 70, 90);
    p.stroke(0, 200, 255);
    p.strokeWeight(3);
    p.rect(submersibleX, submersibleY, submersibleSize, submersibleSize);
    p.noStroke();
    p.fill(0, 200, 255);
    p.textSize(12);
    p.text("Submersible", FIELD_SIZE / 2, submersibleY + 20);
    p.text("4ft × 4ft", FIELD_SIZE / 2, submersibleY + 35);

    // Submersible rungs (ladder for climbing)
    p.stroke(180, 180, 200);
    p.strokeWeight(4);
    const rungCount = 4;
    for (let i = 0; i < rungCount; i++) {
      const rungY = submersibleY + 60 + i * 35;
      p.line(
        submersibleX + 40,
        rungY,
        submersibleX + submersibleSize - 40,
        rungY,
      );
    }
    p.noStroke();
    p.fill(180, 180, 200);
    p.textSize(9);
    p.text("Ladder Rungs", FIELD_SIZE / 2, submersibleY + 55);

    // High basket (top right corner, 2ft × 2ft)
    const basketSize = TILE_SIZE * 2;
    p.fill(100, 50, 50);
    p.stroke(255, 100, 100);
    p.strokeWeight(3);
    p.rect(
      FIELD_SIZE - basketSize - TILE_SIZE / 2,
      TILE_SIZE / 2,
      basketSize,
      basketSize,
    );
    p.noStroke();
    p.fill(255, 100, 100);
    p.textSize(11);
    p.text("High Basket", FIELD_SIZE - TILE_SIZE * 1.5, TILE_SIZE);
    p.text("8 pts", FIELD_SIZE - TILE_SIZE * 1.5, TILE_SIZE + 15);

    // Net zone (below basket)
    p.fill(50, 100, 50, 120);
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.rect(
      FIELD_SIZE - basketSize - TILE_SIZE / 2,
      TILE_SIZE / 2 + basketSize,
      basketSize,
      TILE_SIZE,
    );
    p.noStroke();
    p.fill(100, 255, 100);
    p.textSize(9);
    p.text(
      "Net Zone (2 pts)",
      FIELD_SIZE - TILE_SIZE * 1.5,
      TILE_SIZE / 2 + basketSize + TILE_SIZE / 2,
    );

    // Low basket (bottom right, opposite corner)
    p.fill(80, 50, 50);
    p.stroke(200, 80, 80);
    p.strokeWeight(2);
    p.rect(
      FIELD_SIZE - basketSize - TILE_SIZE / 2,
      FIELD_SIZE - basketSize - TILE_SIZE / 2,
      basketSize,
      basketSize * 0.6,
    );
    p.noStroke();
    p.fill(200, 80, 80);
    p.textSize(10);
    p.text(
      "Low Basket",
      FIELD_SIZE - TILE_SIZE * 1.5,
      FIELD_SIZE - TILE_SIZE * 1.2,
    );
    p.text("4 pts", FIELD_SIZE - TILE_SIZE * 1.5, FIELD_SIZE - TILE_SIZE);

    // Observation zone (bottom left corner)
    p.fill(60, 60, 100, 120);
    p.stroke(150, 150, 255);
    p.strokeWeight(2);
    p.rect(
      TILE_SIZE / 2,
      FIELD_SIZE - basketSize - TILE_SIZE / 2,
      basketSize,
      basketSize,
    );
    p.noStroke();
    p.fill(150, 150, 255);
    p.textSize(10);
    p.text("Observation", TILE_SIZE * 1.5, FIELD_SIZE - TILE_SIZE * 1.5);
    p.text("Zone", TILE_SIZE * 1.5, FIELD_SIZE - TILE_SIZE * 1.2);
  };

  const drawRobot = (p: p5) => {
    p.push();
    p.translate(robot.x, robot.y);
    p.rotate(robot.angle);

    // Robot body (18" cube)
    p.fill(0, 220, 0);
    p.stroke(0, 180, 0);
    p.strokeWeight(2);
    p.rect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE);

    // Mecanum wheels
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

    // Vertical slider/arm (Viper slide)
    if (robot.arm.height > 1) {
      p.stroke(0, 255, 0);
      p.strokeWeight(4);
      p.line(0, -ROBOT_SIZE / 2, 0, -ROBOT_SIZE / 2 - robot.arm.height);

      // Intake claw at end of arm
      p.fill(255, 0, 255);
      p.noStroke();
      p.rect(
        -ROBOT_SIZE / 3,
        -ROBOT_SIZE / 2 - robot.arm.height - 8,
        ROBOT_SIZE * 0.65,
        8,
      );

      // Arm extension indicator
      p.fill(255, 255, 0);
      p.textSize(8);
      p.push();
      p.rotate(-robot.angle); // Keep text upright
      p.text(
        `${Math.floor((robot.arm.height / TILE_SIZE) * 12)}"`,
        15,
        -ROBOT_SIZE / 2 - robot.arm.height / 2,
      );
      p.pop();
    } else {
      // Retracted intake
      p.fill(255, 0, 255);
      p.noStroke();
      p.rect(-ROBOT_SIZE / 2.5, -ROBOT_SIZE / 2 - 5, ROBOT_SIZE / 1.25, 5);
    }

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

  const drawSamples = (p: p5) => {
    for (const sample of samples) {
      if (!sample.collected) {
        p.push();
        p.fill(sample.color);
        p.stroke(220, 220, 220);
        p.strokeWeight(2);
        p.circle(sample.x, sample.y, 20);
        p.pop();
      }
    }
  };

  const drawStatusIndicator = (p: p5) => {
    p.noStroke();
    p.fill(255, 255, 255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    let status = "";
    switch (animationPhase) {
      case AnimationPhase.COLLECT_SAMPLES:
        status = `Collecting Samples (${currentSampleIndex + 1}/3)`;
        break;
      case AnimationPhase.NAVIGATE_TO_BASKET:
        status = "Navigating to High Basket";
        break;
      case AnimationPhase.SCORE_IN_BASKET:
        status = "Scoring in High Basket";
        break;
      case AnimationPhase.NAVIGATE_TO_SUBMERSIBLE:
        status = "Returning to Submersible";
        break;
      case AnimationPhase.CLIMB_SUBMERSIBLE:
        status = `Climbing Submersible (${Math.floor(climbProgress)}%)`;
        break;
    }
    p.text(status, 10, 10);
  };

  const handleCollectSamples = (p: p5) => {
    const targetSample = samples[currentSampleIndex];
    if (targetSample && !targetSample.collected) {
      const dx = targetSample.x - robot.x;
      const dy = targetSample.y - robot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 3) {
        robot.x += (dx / distance) * robot.speed;
        robot.y += (dy / distance) * robot.speed;
        robot.angle = Math.atan2(dy, dx);
      } else {
        targetSample.collected = true;
        currentSampleIndex++;
        phaseTimer = 0;
      }
    } else if (currentSampleIndex >= samples.length) {
      animationPhase = AnimationPhase.NAVIGATE_TO_BASKET;
      phaseTimer = 0;
    }
  };

  const handleNavigateToBasket = (p: p5) => {
    const basketSize = TILE_SIZE * 2;
    const targetX = FIELD_SIZE - basketSize - ROBOT_SIZE;
    const targetY = TILE_SIZE + basketSize / 2;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      robot.x += (dx / distance) * robot.speed;
      robot.y += (dy / distance) * robot.speed;
      robot.angle = Math.atan2(dy, dx);
    } else {
      animationPhase = AnimationPhase.SCORE_IN_BASKET;
      phaseTimer = 0;
      robot.arm.extended = true;
      robot.arm.targetHeight = TILE_SIZE * 1.5;
    }
  };

  const handleScoreInBasket = (p: p5) => {
    // Extend arm to score
    if (phaseTimer > 80) {
      // Scored! Retract arm and move to next phase
      robot.arm.extended = false;
      robot.arm.targetHeight = 0;
      animationPhase = AnimationPhase.NAVIGATE_TO_SUBMERSIBLE;
      phaseTimer = 0;
    }
  };

  const handleNavigateToSubmersible = (p: p5) => {
    // Navigate back to submersible (FIX FOR BUG: proper target coordinates)
    const submersibleSize = TILE_SIZE * 4;
    const targetX = FIELD_SIZE / 2 - submersibleSize / 2 - ROBOT_SIZE;
    const targetY = FIELD_SIZE / 2 + submersibleSize / 2 + ROBOT_SIZE;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      robot.x += (dx / distance) * robot.speed;
      robot.y += (dy / distance) * robot.speed;
      robot.angle = Math.atan2(dy, dx);
    } else {
      // Arrived at submersible
      animationPhase = AnimationPhase.CLIMB_SUBMERSIBLE;
      phaseTimer = 0;
      climbProgress = 0;
    }
  };

  const handleClimbSubmersible = (p: p5) => {
    // Climb up the submersible ladder
    const submersibleSize = TILE_SIZE * 4;
    const targetY = FIELD_SIZE / 2 - submersibleSize / 2 + TILE_SIZE;

    if (robot.y > targetY) {
      robot.y -= 1.5;
      climbProgress =
        ((FIELD_SIZE / 2 + submersibleSize / 2 + ROBOT_SIZE - robot.y) /
          (submersibleSize - TILE_SIZE)) *
        100;
    } else {
      // Climbing complete
      if (phaseTimer > 60) {
        animationPhase = AnimationPhase.RESET;
        phaseTimer = 0;
      }
    }
  };

  const handleReset = () => {
    if (phaseTimer > 60) {
      // Reset all state
      animationPhase = AnimationPhase.COLLECT_SAMPLES;
      phaseTimer = 0;
      currentSampleIndex = 0;
      climbProgress = 0;
      robot.x = TILE_SIZE * 2;
      robot.y = FIELD_SIZE - TILE_SIZE * 2;
      robot.angle = 0;
      robot.arm.extended = false;
      robot.arm.height = 0;
      robot.arm.targetHeight = 0;

      samples = [];
      const colors = [
        p.color(255, 50, 50),
        p.color(50, 50, 255),
        p.color(255, 255, 50),
      ];
      for (let i = 0; i < 3; i++) {
        samples.push({
          x: FIELD_SIZE / 2 - TILE_SIZE + i * TILE_SIZE,
          y: FIELD_SIZE / 2 + TILE_SIZE * 1.5,
          color: colors[i],
          collected: false,
        });
      }
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
      Into the Deep Game Field (12ft × 12ft): Robot collects colored samples
      from the submersible, navigates to score in the high basket (8 pts), then
      returns to climb the submersible ladder for endgame points.
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
