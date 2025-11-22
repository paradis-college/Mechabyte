<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phase constants
const AnimationPhase = {
  COLLECT_SAMPLES: 0,
  SCORE_IN_BASKET: 1,
  CLIMB_SUBMERSIBLE: 2
} as const;

type AnimationPhaseType = typeof AnimationPhase[keyof typeof AnimationPhase];

const sketch = (p: p5) => {
  let robot = { x: 0, y: 0, angle: 0, arm: { extended: false, height: 0 } };
  let samples: Array<{ x: number; y: number; color: string; collected: boolean }> = [];
  let animationPhase: AnimationPhaseType = AnimationPhase.COLLECT_SAMPLES;
  let phaseTimer = 0;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
    
    // Initialize robot position
    robot.x = 100;
    robot.y = p.height - 80;
    robot.angle = 0;
    robot.arm.extended = false;
    robot.arm.height = 0;
    
    // Initialize colored samples
    const colors = ['#ff0000', '#0000ff', '#ffff00'];
    for (let i = 0; i < 3; i++) {
      samples.push({
        x: p.width / 2 - 30 + i * 30,
        y: p.height / 2,
        color: colors[i],
        collected: false
      });
    }
  };

  p.draw = () => {
    p.background(30, 30, 40);
    
    // Draw field elements
    drawField(p);
    
    // Update animation
    phaseTimer++;
    
    if (animationPhase === AnimationPhase.COLLECT_SAMPLES) {
      collectSamples(p);
    } else if (animationPhase === AnimationPhase.SCORE_IN_BASKET) {
      scoreInBasket(p);
    } else if (animationPhase === AnimationPhase.CLIMB_SUBMERSIBLE) {
      climbSubmersible(p);
    }
    
    // Draw samples
    for (const sample of samples) {
      if (!sample.collected) {
        drawSample(p, sample.x, sample.y, sample.color);
      }
    }
    
    // Draw robot
    drawRobot(p, robot.x, robot.y, robot.angle, robot.arm);
    
    // Reset animation
    if (phaseTimer > 700) {
      resetAnimation();
    }
  };

  const drawField = (p: p5) => {
    // Draw field border
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.noFill();
    p.rect(20, 20, p.width - 40, p.height - 40);
    
    // Draw central submersible structure
    p.fill(60, 60, 70);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.rect(p.width / 2 - 60, p.height / 2 - 100, 120, 200);
    p.textSize(10);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Submersible', p.width / 2 - 35, p.height / 2 - 80);
    
    // Draw rungs (ladder)
    p.stroke(200);
    p.strokeWeight(3);
    for (let i = 0; i < 4; i++) {
      const y = p.height / 2 - 60 + i * 40;
      p.line(p.width / 2 - 50, y, p.width / 2 + 50, y);
    }
    
    // Draw high basket (top right corner)
    p.fill(80, 40, 40);
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.rect(p.width - 100, 40, 60, 60);
    p.textSize(10);
    p.fill(255, 100, 100);
    p.noStroke();
    p.text('High', p.width - 85, 65);
    p.text('Basket', p.width - 90, 80);
    
    // Draw net zone
    p.fill(40, 80, 40, 100);
    p.stroke(100, 255, 100);
    p.strokeWeight(1);
    p.rect(p.width - 100, 110, 60, 40);
    p.textSize(8);
    p.fill(100, 255, 100);
    p.noStroke();
    p.text('Net Zone', p.width - 90, 133);
  };

  const drawRobot = (p: p5, x: number, y: number, angle: number, arm: { extended: boolean; height: number }) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    
    // Robot body
    p.fill(0, 255, 0);
    p.stroke(0, 200, 0);
    p.strokeWeight(2);
    p.rect(-20, -20, 40, 40);
    
    // Draw vertical slider/arm if extended
    if (arm.extended && arm.height > 0) {
      p.stroke(0, 255, 0);
      p.strokeWeight(4);
      p.line(0, -20, 0, -20 - arm.height);
      
      // Intake at end of arm
      p.fill(255, 0, 255);
      p.rect(-10, -25 - arm.height, 20, 10);
    } else {
      // Intake when retracted
      p.fill(255, 0, 255);
      p.rect(-15, -25, 30, 5);
    }
    
    p.pop();
  };

  const drawSample = (p: p5, x: number, y: number, color: string) => {
    p.push();
    p.fill(color);
    p.stroke(200);
    p.strokeWeight(2);
    p.circle(x, y, 20);
    p.pop();
  };

  const collectSamples = (p: p5) => {
    const targetSample = samples.find(s => !s.collected);
    if (targetSample) {
      // Move towards sample
      const dx = targetSample.x - robot.x;
      const dy = targetSample.y - robot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        robot.x += (dx / distance) * 2;
        robot.y += (dy / distance) * 2;
        robot.angle = Math.atan2(dy, dx);
      } else {
        targetSample.collected = true;
      }
    } else {
      // All samples collected, move to scoring phase
      animationPhase = AnimationPhase.SCORE_IN_BASKET;
      phaseTimer = 0;
    }
  };

  const scoreInBasket = (p: p5) => {
    // Move robot to basket position
    const targetX = p.width - 100;
    const targetY = 150;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      robot.x += (dx / distance) * 2;
      robot.y += (dy / distance) * 2;
      robot.angle = Math.atan2(dy, dx);
      robot.arm.extended = true;
      robot.arm.height = Math.min(robot.arm.height + 1, 80);
    } else if (phaseTimer > 150) {
      // Scored in basket, move to climbing phase
      animationPhase = AnimationPhase.CLIMB_SUBMERSIBLE;
      phaseTimer = 0;
      robot.arm.extended = false;
      robot.arm.height = 0;
    }
  };

  const climbSubmersible = (p: p5) => {
    // Move robot to submersible and climb
    const targetX = p.width / 2 - 80;
    const targetY = p.height / 2 + 50;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      robot.x += (dx / distance) * 2;
      robot.y += (dy / distance) * 2;
      robot.angle = Math.atan2(dy, dx);
    } else {
      // Start climbing (move up)
      if (robot.y > p.height / 2 - 60) {
        robot.y -= 1;
      }
    }
  };

  const resetAnimation = () => {
    animationPhase = AnimationPhase.COLLECT_SAMPLES;
    phaseTimer = 0;
    robot.x = 100;
    robot.y = p.height - 80;
    robot.angle = 0;
    robot.arm.extended = false;
    robot.arm.height = 0;
    
    samples = [];
    const colors = ['#ff0000', '#0000ff', '#ffff00'];
    for (let i = 0; i < 3; i++) {
      samples.push({
        x: p.width / 2 - 30 + i * 30,
        y: p.height / 2,
        color: colors[i],
        collected: false
      });
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
    <p class="animation-caption">Into the Deep: Robot collecting colored samples, scoring in high basket, and climbing the submersible</p>
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
  background: #1a1a20;
}

.animation-caption {
  font-size: 0.9vw;
  color: var(--mechabyte-green);
  text-align: center;
  font-style: italic;
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
