<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let rotationAngle = 0;
  let showProblem = true;
  let animationTimer = 0;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    animationTimer++;

    // Switch between problem and solution
    if (animationTimer > 240) {
      showProblem = !showProblem;
      animationTimer = 0;
      rotationAngle = 0;
    }

    // Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("3D-Printed Disc Stabilization", p.width / 2, 30);

    if (showProblem) {
      drawProblem(p, rotationAngle);
      rotationAngle += 0.02;
    } else {
      drawSolution(p);
    }
  };

  const drawProblem = (p: p5, angle: number) => {
    p.textSize(14);
    p.fill(255, 100, 100);
    p.noStroke();
    p.text("PROBLEM: Blades Rotate and Align Parallel", p.width / 2, 60);

    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Shaft
    p.fill(100);
    p.stroke(150);
    p.strokeWeight(3);
    p.rect(centerX - 5, centerY - 100, 10, 200);

    // Rotating blades (from butcher shop material)
    p.push();
    p.translate(centerX, centerY);

    // Two blades that rotate and become parallel (problem)
    for (let i = 0; i < 2; i++) {
      p.push();
      p.rotate(angle + i * p.PI);

      // Blade
      p.fill(200, 150, 100);
      p.stroke(150);
      p.strokeWeight(2);
      p.rect(-40, -8, 80, 16);

      // Show rotation with arrow
      if (i === 0) {
        p.stroke(255, 100, 100);
        p.strokeWeight(2);
        p.noFill();
        p.arc(0, 0, 60, 60, -p.QUARTER_PI, p.QUARTER_PI);

        // Arrow head
        p.push();
        p.rotate(p.QUARTER_PI);
        p.fill(255, 100, 100);
        p.triangle(30, 0, 25, -5, 25, 5);
        p.pop();
      }

      p.pop();
    }

    p.pop();

    // Problem labels
    p.textSize(10);
    p.fill(255, 100, 100);
    p.noStroke();
    p.text("Blades rotate freely", centerX, centerY + 120);
    p.text("Fail to grab samples when parallel", centerX, centerY + 140);

    // Team who identified issue
    p.textSize(8);
    p.fill(150);
    p.text("Issue identified during testing", centerX, p.height - 20);
  };

  const drawSolution = (p: p5) => {
    p.textSize(14);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("SOLUTION: 3D-Printed Locking Discs", p.width / 2, 60);

    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Shaft
    p.fill(100);
    p.stroke(150);
    p.strokeWeight(3);
    p.rect(centerX - 5, centerY - 100, 10, 200);

    // 3D-printed discs with hexagonal centers
    for (let y of [centerY - 60, centerY + 60]) {
      // Disc
      p.fill(0, 200, 255);
      p.stroke(0, 255, 255);
      p.strokeWeight(2);
      p.circle(centerX, y, 50);

      // Hexagonal center
      p.fill(30, 30, 40);
      p.stroke(0, 255, 255);
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        const angle = (p.TWO_PI / 6) * i;
        const x = centerX + 15 * p.cos(angle);
        const y2 = y + 15 * p.sin(angle);
        p.vertex(x, y2);
      }
      p.endShape(p.CLOSE);

      // Label
      p.textSize(7);
      p.fill(0, 255, 255);
      p.noStroke();
      p.text("3D Disc", centerX + 35, y);
    }

    // Fixed blades between discs
    p.push();
    p.translate(centerX, centerY);

    // Two blades locked at 90 degrees
    for (let i = 0; i < 2; i++) {
      p.push();
      p.rotate(i * p.HALF_PI);

      // Blade
      p.fill(200, 150, 100);
      p.stroke(150);
      p.strokeWeight(2);
      p.rect(-40, -8, 80, 16);

      // Screw indicators
      p.fill(200);
      p.noStroke();
      for (let x of [-30, -10, 10, 30]) {
        p.circle(x, 0, 4);
      }

      p.pop();
    }

    p.pop();

    // Stoppers
    p.fill(255, 200, 0);
    p.stroke(200);
    p.strokeWeight(2);
    for (let angle of [
      p.QUARTER_PI,
      -p.QUARTER_PI,
      p.PI - p.QUARTER_PI,
      p.PI + p.QUARTER_PI,
    ]) {
      const x = centerX + 55 * Math.cos(angle);
      const y = centerY + 55 * Math.sin(angle);
      p.rect(x - 5, y - 3, 10, 6);
    }

    // Solution labels
    p.textSize(10);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("Blades locked at 90° with screws", centerX, centerY + 120);
    p.text("Stoppers prevent parallel alignment", centerX, centerY + 140);

    // Team attribution
    p.textSize(8);
    p.fill(150);
    p.text(
      "Solution designed and 3D-printed by: Ianis Cotoc, Teodor Matricală",
      centerX,
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
      Problem: Rotating blades align parallel and fail. Solution: 3D-printed
      hexagonal discs lock blades at 90°
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
