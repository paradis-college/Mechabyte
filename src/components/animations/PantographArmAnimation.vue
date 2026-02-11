<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let armAngle = 0;
  let extending = true;
  let animationTimer = 0;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    animationTimer++;

    // Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("Pantograph Arm Mechanism", p.width / 2, 30);

    p.textSize(11);
    p.fill(200);
    p.text(
      "Keeps intake angle constant while raising/lowering",
      p.width / 2,
      50,
    );

    // Animate arm extension
    if (extending) {
      armAngle += 0.01;
      if (armAngle > p.PI / 3) extending = false;
    } else {
      armAngle -= 0.01;
      if (armAngle < 0) extending = true;
    }

    drawPantograph(p, armAngle);

    // Reset smoothly
    if (animationTimer > 500) {
      animationTimer = 0;
    }
  };

  const drawPantograph = (p: p5, angle: number) => {
    const baseX = p.width / 2 - 100;
    const baseY = p.height - 100;

    // Base mount
    p.fill(100);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(baseX - 20, baseY - 10, 40, 20);

    // Arm segments
    const segmentLength = 80;
    const extension = angle;

    // Calculate parallelogram points
    const p1 = { x: baseX, y: baseY };
    const p2 = {
      x: baseX + segmentLength * Math.cos(extension),
      y: baseY - segmentLength * Math.sin(extension),
    };
    const p3 = {
      x: p2.x + segmentLength * Math.cos(extension),
      y: p2.y - segmentLength * Math.sin(extension),
    };
    const p4 = {
      x: baseX + segmentLength * Math.cos(extension),
      y: baseY - segmentLength * Math.sin(extension),
    };

    // Draw linkages
    p.stroke(0, 255, 0);
    p.strokeWeight(4);

    // Bottom link
    p.line(p1.x, p1.y, p2.x, p2.y);

    // Top link (parallel)
    p.line(p4.x, p4.y, p3.x, p3.y);

    // Vertical links
    p.line(p1.x, p1.y, p4.x, p4.y);
    p.line(p2.x, p2.y, p3.x, p3.y);

    // Joints
    p.fill(0, 255, 0);
    p.noStroke();
    p.circle(p1.x, p1.y, 10);
    p.circle(p2.x, p2.y, 10);
    p.circle(p3.x, p3.y, 10);
    p.circle(p4.x, p4.y, 10);

    // Intake claw at end
    p.fill(255, 0, 255);
    p.stroke(200);
    p.strokeWeight(2);
    p.rect(p3.x - 15, p3.y - 10, 30, 20);
    p.textSize(8);
    p.fill(255);
    p.noStroke();
    p.text("Claw", p3.x, p3.y);

    // Motor indicator
    p.fill(150);
    p.stroke(200);
    p.strokeWeight(2);
    p.circle(baseX, baseY, 25);
    p.textSize(7);
    p.fill(255);
    p.noStroke();
    p.text("Motor", baseX, baseY + 3);

    // Angle indicator
    p.stroke(255, 200, 0);
    p.strokeWeight(1);
    p.noFill();
    p.arc(baseX, baseY, 50, 50, -p.HALF_PI, -p.HALF_PI + extension);

    // Show that claw maintains horizontal orientation
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    p.line(p3.x - 20, p3.y, p3.x + 20, p3.y);

    // Labels
    p.textSize(9);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("Constant angle maintained", p.width / 2, p.height - 40);

    // Evolution note
    p.textSize(8);
    p.fill(200, 200, 100);
    p.text(
      "Evolution: 1 servo → 2 servos → Tetrix 40:1 motor",
      p.width / 2,
      p.height - 20,
    );

    // Team attribution
    p.textSize(8);
    p.fill(150);
    p.text(
      "Designed by: David Grigore, Ștefan Albu",
      p.width / 2 + 150,
      p.height - 20,
    );
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
      Pantograph mechanism keeps claw at constant angle during vertical movement
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
