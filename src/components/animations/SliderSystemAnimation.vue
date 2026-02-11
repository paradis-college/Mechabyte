<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Animation phases
const PHASE_RETRACTED = 0;
const PHASE_EXTENDING = 1;
const PHASE_EXTENDED = 2;
const PHASE_RETRACTING = 3;

const sketch = (p: p5) => {
  let currentPhase = PHASE_RETRACTED;
  let phaseProgress = 0;
  let phaseTimer = 0;
  const phaseDuration = 90; // Frames per phase

  // Slider properties
  let sliderExtension = 0; // 0 to 1
  let targetExtension = 0;

  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(600, 500);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(26, 26, 36);

    phaseTimer++;
    phaseProgress = Math.min(phaseTimer / phaseDuration, 1);

    // Phase management
    if (currentPhase === PHASE_RETRACTED && phaseTimer > phaseDuration) {
      currentPhase = PHASE_EXTENDING;
      targetExtension = 1;
      phaseTimer = 0;
    } else if (currentPhase === PHASE_EXTENDING && phaseTimer > phaseDuration) {
      currentPhase = PHASE_EXTENDED;
      phaseTimer = 0;
    } else if (currentPhase === PHASE_EXTENDED && phaseTimer > phaseDuration) {
      currentPhase = PHASE_RETRACTING;
      targetExtension = 0;
      phaseTimer = 0;
    } else if (
      currentPhase === PHASE_RETRACTING &&
      phaseTimer > phaseDuration
    ) {
      currentPhase = PHASE_RETRACTED;
      phaseTimer = 0;
    }

    // Smooth slider movement
    if (currentPhase === PHASE_EXTENDING || currentPhase === PHASE_RETRACTING) {
      sliderExtension = p.lerp(sliderExtension, targetExtension, 0.05);
    }

    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(20);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Vertical Slider System", p.width / 2, 35);

    p.textSize(13);
    p.fill(150, 200, 255);
    p.text("Single vertical slider with integrated arm", p.width / 2, 60);

    // Draw the system
    drawSliderSystem(p, sliderExtension);

    // Draw status indicator
    drawStatusIndicator(p);
  };

  const drawSliderSystem = (p: p5, extension: number) => {
    const baseX = p.width / 2;
    const baseY = p.height - 100;
    const maxSliderHeight = 250;
    const currentSliderHeight = extension * maxSliderHeight;

    // Robot base
    p.fill(60, 60, 80);
    p.stroke(0, 200, 255);
    p.strokeWeight(3);
    p.rect(baseX - 60, baseY - 30, 120, 60);

    // Base label
    p.noStroke();
    p.fill(200);
    p.textSize(11);
    p.text("Robot Base", baseX, baseY);

    // Slider tracks (vertical guides)
    p.stroke(100, 100, 120);
    p.strokeWeight(4);
    p.line(
      baseX - 30,
      baseY - 30,
      baseX - 30,
      baseY - 30 - maxSliderHeight - 20,
    );
    p.line(
      baseX + 30,
      baseY - 30,
      baseX + 30,
      baseY - 30 - maxSliderHeight - 20,
    );

    // Slider carriage
    const carriageY = baseY - 30 - currentSliderHeight;
    p.fill(80, 120, 160);
    p.stroke(0, 255, 255);
    p.strokeWeight(2);
    p.rect(baseX - 40, carriageY - 20, 80, 40);

    // Slider mechanism detail
    p.fill(120, 120, 140);
    p.noStroke();
    p.rect(baseX - 35, carriageY - 15, 15, 30);
    p.rect(baseX + 20, carriageY - 15, 15, 30);

    // Integrated arm extending from slider
    const armLength = 70;
    const armY = carriageY;

    // Arm base
    p.fill(100, 150, 100);
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.rect(baseX - 10, armY - 10, 20, 20);

    // Arm extension
    p.stroke(0, 255, 100);
    p.strokeWeight(4);
    p.line(baseX, armY, baseX + armLength, armY);

    // Intake/gripper at end of arm
    p.fill(150, 100, 200);
    p.stroke(200, 100, 255);
    p.strokeWeight(2);

    // Gripper jaws
    const gripperX = baseX + armLength;
    const gripperOpen = extension > 0.8 ? 15 : 8;
    p.line(
      gripperX,
      armY - gripperOpen,
      gripperX + 15,
      armY - gripperOpen - 10,
    );
    p.line(
      gripperX,
      armY + gripperOpen,
      gripperX + 15,
      armY + gripperOpen + 10,
    );

    // Sample being held (when extended)
    if (extension > 0.3) {
      p.fill(255, 200, 50);
      p.noStroke();
      p.circle(gripperX + 5, armY, 12);

      // Label
      p.fill(255, 200, 50);
      p.textSize(9);
      p.text("Sample", gripperX + 5, armY + 25);
    }

    // High basket (target)
    const basketX = baseX + armLength + 80;
    const basketY = baseY - 30 - maxSliderHeight - 20;

    p.fill(255, 150, 50, 100);
    p.stroke(255, 100, 0);
    p.strokeWeight(2);
    p.rect(basketX - 30, basketY - 30, 60, 40);

    p.noStroke();
    p.fill(255, 150, 50);
    p.textSize(10);
    p.text("High Basket", basketX, basketY - 45);
    p.text("(8 pts)", basketX, basketY - 33);

    // Extension measurement
    p.stroke(0, 255, 100);
    p.strokeWeight(1);
    p.line(baseX - 70, baseY - 30, baseX - 70, carriageY);

    // Arrow markers
    drawArrow(p, baseX - 70, baseY - 30, baseX - 70, baseY - 35, 5);
    drawArrow(p, baseX - 70, carriageY, baseX - 70, carriageY + 5, 5);

    p.noStroke();
    p.fill(0, 255, 100);
    p.textSize(11);
    p.text(
      `${Math.round(extension * 100)}%`,
      baseX - 70,
      (baseY - 30 + carriageY) / 2,
    );
    p.textSize(9);
    p.text("Extended", baseX - 70, (baseY - 30 + carriageY) / 2 + 15);
  };

  const drawArrow = (
    p: p5,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    size: number,
  ) => {
    p.stroke(0, 255, 100);
    p.strokeWeight(1);
    p.line(x1, y1, x2, y2);

    const angle = Math.atan2(y2 - y1, x2 - x1);
    p.noStroke();
    p.fill(0, 255, 100);
    p.triangle(
      x2,
      y2,
      x2 - size * Math.cos(angle - Math.PI / 6),
      y2 - size * Math.sin(angle - Math.PI / 6),
      x2 - size * Math.cos(angle + Math.PI / 6),
      y2 - size * Math.sin(angle + Math.PI / 6),
    );
  };

  const drawStatusIndicator = (p: p5) => {
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(13);
    p.fill(255, 255, 255);
    p.noStroke();

    let phaseText = "";
    let actionText = "";

    if (currentPhase === PHASE_RETRACTED) {
      phaseText = "Phase: Retracted";
      actionText = "Ready to collect sample";
    } else if (currentPhase === PHASE_EXTENDING) {
      phaseText = "Phase: Extending";
      actionText = "Lifting sample to high basket";
    } else if (currentPhase === PHASE_EXTENDED) {
      phaseText = "Phase: Extended";
      actionText = "Scoring in high basket (8 pts)";
    } else if (currentPhase === PHASE_RETRACTING) {
      phaseText = "Phase: Retracting";
      actionText = "Returning to collect next sample";
    }

    p.text(phaseText, 40, p.height - 50);
    p.text(actionText, 40, p.height - 30);

    // Progress bar
    p.fill(50, 50, 60);
    p.rect(40, p.height - 15, p.width - 80, 10);
    p.fill(0, 255, 100);
    p.noStroke();

    let totalProgress = 0;
    if (currentPhase === PHASE_RETRACTED) {
      totalProgress = phaseProgress / 4;
    } else if (currentPhase === PHASE_EXTENDING) {
      totalProgress = (1 + phaseProgress) / 4;
    } else if (currentPhase === PHASE_EXTENDED) {
      totalProgress = (2 + phaseProgress) / 4;
    } else {
      totalProgress = (3 + phaseProgress) / 4;
    }

    p.rect(40, p.height - 15, (p.width - 80) * totalProgress, 10);
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
