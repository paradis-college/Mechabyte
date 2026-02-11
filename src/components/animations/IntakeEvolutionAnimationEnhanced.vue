<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let currentVersion = 0; // 0: Brush, 1: Claw V2, 2: Claw V3
  let transitionTimer = 0;
  const transitionTime = 420; // 7 seconds at 60fps
  let brushRotation = 0;
  let clawAngle = 0;
  let pixelY = 0;
  let pixelsCaptured = 0;

  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(800, 600);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(18, 20, 28);

    transitionTimer++;
    brushRotation += 0.15;

    if (transitionTimer > transitionTime) {
      currentVersion = (currentVersion + 1) % 3;
      transitionTimer = 0;
      pixelsCaptured = 0;
    }

    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Intake Evolution: "Crab Claw" Development', p.width / 2, 30);

    // Draw version indicator
    drawVersionIndicator(p, currentVersion);

    if (currentVersion === 0) {
      drawBrushIntake(p);
    } else if (currentVersion === 1) {
      drawClawV2(p);
    } else {
      drawClawV3(p);
    }

    // Progress bar
    drawProgressBar(p, transitionTimer, transitionTime);
  };

  const drawVersionIndicator = (p: p5, version: number) => {
    const y = 65;
    const spacing = 200;
    const startX = p.width / 2 - spacing;

    // V1 - Brush
    p.fill(
      version === 0 ? 255 : 100,
      version === 0 ? 180 : 100,
      0,
      version === 0 ? 255 : 100,
    );
    p.noStroke();
    p.circle(startX, y, 16);
    p.textSize(12);
    p.fill(
      version === 0 ? 255 : 150,
      version === 0 ? 180 : 150,
      version === 0 ? 0 : 100,
    );
    p.text("V1: Brush", startX, y + 25);

    // V2 - Precision Claw
    p.fill(
      version === 1 ? 255 : 100,
      version === 1 ? 200 : 100,
      0,
      version === 1 ? 255 : 100,
    );
    p.noStroke();
    p.circle(p.width / 2, y, 16);
    p.textSize(12);
    p.fill(
      version === 1 ? 255 : 150,
      version === 1 ? 200 : 150,
      version === 1 ? 0 : 100,
    );
    p.text("V2: Precision", p.width / 2, y + 25);

    // V3 - Angled Claw
    p.fill(
      0,
      version === 2 ? 255 : 100,
      version === 2 ? 100 : 50,
      version === 2 ? 255 : 100,
    );
    p.circle(startX + spacing * 2, y, 16);
    p.textSize(12);
    p.fill(0, version === 2 ? 255 : 150, version === 2 ? 150 : 100);
    p.text("V3: Angled (Final)", startX + spacing * 2, y + 25);
  };

  const drawBrushIntake = (p: p5) => {
    const centerX = p.width / 2 - 150;
    const centerY = p.height / 2 + 40;

    // Version label
    p.textSize(18);
    p.fill(255, 180, 0);
    p.noStroke();
    p.text("Version 1: Dynamic Brush Intake", centerX, 110);

    p.textSize(14);
    p.fill(180, 180, 200);
    p.text("Spinning shaft with toilet-brush head", centerX, 135);

    // Draw ramp structure
    p.stroke(140, 120, 80);
    p.strokeWeight(4);
    p.fill(40, 35, 30);
    p.quad(
      centerX - 100,
      centerY + 80,
      centerX - 60,
      centerY - 40,
      centerX + 60,
      centerY - 40,
      centerX + 100,
      centerY + 80,
    );

    // Storage box at top
    p.fill(50, 55, 75);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(centerX - 50, centerY - 80, 100, 40, 3);

    p.textSize(11);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("STORAGE", centerX, centerY - 60);

    // Draw rotating brush (animated)
    const brushX = centerX - 70;
    const brushY = centerY + 60;

    p.push();
    p.translate(brushX, brushY);
    p.rotate(brushRotation);

    // Brush shaft
    p.fill(120, 120, 140);
    p.stroke(80, 80, 100);
    p.strokeWeight(2);
    p.rect(-5, -40, 10, 80);

    // Brush bristles (radiating outward)
    p.stroke(220, 180, 40);
    p.strokeWeight(3);
    for (let i = 0; i < 16; i++) {
      const angle = (p.TWO_PI / 16) * i;
      const innerRadius = 12;
      const outerRadius = 28;
      const x1 = innerRadius * p.cos(angle);
      const y1 = innerRadius * p.sin(angle);
      const x2 = outerRadius * p.cos(angle);
      const y2 = outerRadius * p.sin(angle);
      p.line(x1, y1, x2, y2);

      // Add tips to bristles
      p.fill(255, 200, 50);
      p.noStroke();
      p.circle(x2, y2, 4);
    }

    // Brush center hub
    p.fill(100, 100, 120);
    p.stroke(60, 60, 80);
    p.strokeWeight(2);
    p.circle(0, 0, 20);

    // Rotation indicator
    p.fill(255, 180, 0);
    p.noStroke();
    p.triangle(-3, -8, 0, -12, 3, -8);

    p.pop();

    // Motor label
    p.textSize(9);
    p.fill(255, 200, 50);
    p.noStroke();
    p.text("CR Servo", brushX, brushY + 50);

    // Animated pixel being swept up
    pixelY = (transitionTimer % 90) / 90;
    if (pixelY < 0.7) {
      const px = centerX - 60 + pixelY * 60;
      const py = centerY + 80 - pixelY * 120;
      drawPixel(p, px, py, 14, "#FF00FF");

      // Motion trail
      p.stroke(255, 0, 255, 100);
      p.strokeWeight(2);
      p.noFill();
      p.arc(brushX, brushY, 40, 40, p.HALF_PI, p.PI + p.QUARTER_PI);
    }

    // Problems list on the right
    const problemsX = p.width / 2 + 200;
    p.textSize(14);
    p.fill(255, 150, 100);
    p.noStroke();
    p.text("⚠ Critical Issues:", problemsX, centerY - 50);

    p.textSize(13);
    p.fill(220, 200, 200);
    const problems = [
      "• No Expansion Hub available",
      "• Only 4 motor ports on Control Hub",
      "• Brush motor conflicts with drivetrain",
      "• Abandoned design",
    ];

    for (let i = 0; i < problems.length; i++) {
      p.text(problems[i], problemsX, centerY - 25 + i * 22);
    }

    // Team attribution
    p.textSize(10);
    p.fill(120, 120, 140);
    p.text("Initial Concept: Maia Sava, Șerban Untu", centerX, p.height - 25);
  };

  const drawClawV2 = (p: p5) => {
    const centerX = p.width / 2 - 150;
    const centerY = p.height / 2 + 40;

    // Version label
    p.textSize(18);
    p.fill(255, 200, 0);
    p.noStroke();
    p.text("Version 2: Precision Claw", centerX, 110);

    p.textSize(14);
    p.fill(180, 180, 200);
    p.text("Single-pixel capture with position servo", centerX, 135);

    // Animate claw opening/closing
    clawAngle = Math.sin(transitionTimer * 0.06);
    const openAmount = p.map(clawAngle, -1, 1, 0, 45);
    const isClosed = openAmount < 15;

    // Servo mount
    p.fill(60, 65, 85);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(centerX - 30, centerY - 80, 60, 30, 3);

    p.textSize(10);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Position Servo", centerX, centerY - 65);

    // Connecting rod
    p.stroke(120, 120, 140);
    p.strokeWeight(4);
    p.line(centerX, centerY - 50, centerX, centerY - 20);

    // Left claw arm
    p.push();
    p.translate(centerX, centerY);

    // Left arm body
    p.fill(80, 180, 100);
    p.stroke(50, 120, 60);
    p.strokeWeight(3);
    p.beginShape();
    p.vertex(-25 - openAmount, -25);
    p.vertex(-40 - openAmount, -10);
    p.vertex(-40 - openAmount, 10);
    p.vertex(-25 - openAmount, 25);
    p.vertex(-15 - openAmount, 15);
    p.vertex(-15 - openAmount, -15);
    p.endShape(p.CLOSE);

    // Left arm teeth
    p.stroke(30, 80, 40);
    p.strokeWeight(2);
    for (let i = 0; i < 4; i++) {
      const ty = -15 + i * 10;
      p.line(-40 - openAmount, ty, -45 - openAmount, ty + 3);
      p.line(-40 - openAmount, ty, -45 - openAmount, ty - 3);
    }

    // Right arm body
    p.fill(80, 180, 100);
    p.stroke(50, 120, 60);
    p.strokeWeight(3);
    p.beginShape();
    p.vertex(25 + openAmount, -25);
    p.vertex(40 + openAmount, -10);
    p.vertex(40 + openAmount, 10);
    p.vertex(25 + openAmount, 25);
    p.vertex(15 + openAmount, 15);
    p.vertex(15 + openAmount, -15);
    p.endShape(p.CLOSE);

    // Right arm teeth
    p.stroke(30, 80, 40);
    p.strokeWeight(2);
    for (let i = 0; i < 4; i++) {
      const ty = -15 + i * 10;
      p.line(40 + openAmount, ty, 45 + openAmount, ty + 3);
      p.line(40 + openAmount, ty, 45 + openAmount, ty - 3);
    }

    // Pivot points
    p.fill(150, 200, 150);
    p.noStroke();
    p.circle(-15 - openAmount, 0, 8);
    p.circle(15 + openAmount, 0, 8);

    // Mechanism linkage
    p.stroke(150, 150, 170);
    p.strokeWeight(2);
    p.line(0, -20, -15 - openAmount, 0);
    p.line(0, -20, 15 + openAmount, 0);

    p.pop();

    // Pixel in center (when closed)
    if (isClosed) {
      drawPixel(p, centerX, centerY, 14, "#FF00FF");
      pixelsCaptured++;
    } else if (pixelsCaptured > 0) {
      // Pixel falling (missed)
      const fallY = centerY + (transitionTimer % 60) * 2;
      if (fallY < p.height - 50) {
        drawPixel(p, centerX, fallY, 14, "#FF00FF");
      }
    }

    // Alignment guide
    p.stroke(255, 200, 0, 100);
    p.strokeWeight(1);
    p.noFill();
    p.circle(centerX, centerY, 30);
    p.textSize(9);
    p.fill(255, 200, 0, 150);
    p.noStroke();
    p.text("Requires precise\nalignment", centerX, centerY + 55);

    // Problems list on the right
    const problemsX = p.width / 2 + 200;
    p.textSize(14);
    p.fill(255, 150, 100);
    p.noStroke();
    p.text("⚠ Design Issues:", problemsX, centerY - 50);

    p.textSize(13);
    p.fill(220, 200, 200);
    const problems = [
      "• Too-precise alignment required",
      "• Single servo operation",
      "• Frequent pixel drops",
      "• Limited capture angle",
    ];

    for (let i = 0; i < problems.length; i++) {
      p.text(problems[i], problemsX, centerY - 25 + i * 22);
    }

    // Team attribution
    p.textSize(10);
    p.fill(120, 120, 140);
    p.text(
      "Iteration 2: Rareș Cozma, Cristian Ghidireac",
      centerX,
      p.height - 25,
    );
  };

  const drawClawV3 = (p: p5) => {
    const centerX = p.width / 2 - 150;
    const centerY = p.height / 2 + 40;

    // Version label
    p.textSize(18);
    p.fill(0, 255, 150);
    p.noStroke();
    p.text('Version 3: Angled "Crab Claw" (Final)', centerX, 110);

    p.textSize(14);
    p.fill(180, 200, 220);
    p.text("Counter-rotating gears with forgiving capture angle", centerX, 135);

    // Animate claw with scissor action
    clawAngle = Math.sin(transitionTimer * 0.05);
    const scissorAngle = p.map(clawAngle, -1, 1, 0.1, 0.6);
    const isClosed = scissorAngle < 0.25;

    // Servo mount
    p.fill(60, 65, 85);
    p.stroke(0, 255, 150);
    p.strokeWeight(3);
    p.rect(centerX - 35, centerY - 85, 70, 35, 3);

    p.textSize(10);
    p.fill(0, 255, 150);
    p.noStroke();
    p.text("Position Servo", centerX, centerY - 67);

    // Gear mechanism indicator
    p.stroke(150, 200, 255);
    p.strokeWeight(1);
    p.noFill();
    p.arc(centerX - 15, centerY - 55, 20, 20, 0, p.PI);
    p.arc(centerX + 15, centerY - 55, 20, 20, 0, -p.PI);

    p.textSize(8);
    p.fill(150, 200, 255);
    p.noStroke();
    p.text("Counter-rotating", centerX, centerY - 40);

    // Left toothed wheel
    p.push();
    p.translate(centerX - 35, centerY);
    p.rotate(-scissorAngle);
    drawToothedWheel(p, 0, 0, 30, 10, true);
    p.pop();

    // Right toothed wheel (rotates opposite)
    p.push();
    p.translate(centerX + 35, centerY);
    p.rotate(scissorAngle);
    drawToothedWheel(p, 0, 0, 30, 10, true);
    p.pop();

    // Angled approach indicator
    const approachAngle = p.PI / 6; // 30 degrees
    p.stroke(0, 255, 255, 150);
    p.strokeWeight(2);
    p.noFill();
    for (let offset = -20; offset <= 20; offset += 20) {
      p.push();
      p.translate(centerX + offset, centerY + 60);
      p.rotate(-approachAngle);
      p.line(0, 0, 0, -40);
      drawArrow(p, 0, -40, 5);
      p.pop();
    }

    p.textSize(10);
    p.fill(0, 255, 255);
    p.noStroke();
    p.text("±30° capture angle", centerX, centerY + 75);

    // Pixel in center (captured when closed)
    if (isClosed && transitionTimer % 120 < 60) {
      drawPixel(p, centerX, centerY, 14, "#FF00FF");
    }

    // Advantages list on the right
    const advantagesX = p.width / 2 + 200;
    p.textSize(14);
    p.fill(100, 255, 150);
    p.noStroke();
    p.text("✓ Improvements:", advantagesX, centerY - 50);

    p.textSize(13);
    p.fill(200, 220, 220);
    const advantages = [
      "• Forgiving capture angle (±30°)",
      "• Scissor mechanism stability",
      "• Counter-rotating grip",
      "• Reliable pixel capture",
      "• Successfully deployed!",
    ];

    for (let i = 0; i < advantages.length; i++) {
      p.text(advantages[i], advantagesX, centerY - 25 + i * 22);
    }

    // Team attribution
    p.textSize(10);
    p.fill(120, 140, 140);
    p.text(
      "Final Design: David Grigore, Cristian Ghidireac, Rareș Cozma",
      centerX,
      p.height - 25,
    );
  };

  const drawToothedWheel = (
    p: p5,
    x: number,
    y: number,
    radius: number,
    teeth: number,
    enhanced: boolean,
  ) => {
    p.push();
    p.translate(x, y);

    // Draw wheel body with gradient effect
    p.fill(80, 200, 120);
    p.stroke(50, 150, 80);
    p.strokeWeight(3);
    p.circle(0, 0, radius * 2);

    // Inner hub
    p.fill(60, 150, 90);
    p.noStroke();
    p.circle(0, 0, radius * 0.6);

    // Draw teeth with realistic shape
    for (let i = 0; i < teeth; i++) {
      const angle = (p.TWO_PI / teeth) * i;
      const baseRadius = radius - 2;
      const tipRadius = radius + 10;
      const toothWidth = p.PI / (teeth * 2);

      p.fill(100, 220, 140);
      p.stroke(50, 150, 80);
      p.strokeWeight(2);
      p.beginShape();
      p.vertex(
        baseRadius * p.cos(angle - toothWidth),
        baseRadius * p.sin(angle - toothWidth),
      );
      p.vertex(tipRadius * p.cos(angle), tipRadius * p.sin(angle));
      p.vertex(
        baseRadius * p.cos(angle + toothWidth),
        baseRadius * p.sin(angle + toothWidth),
      );
      p.endShape(p.CLOSE);
    }

    // Center pivot
    p.fill(150, 200, 150);
    p.noStroke();
    p.circle(0, 0, 8);

    p.pop();
  };

  const drawPixel = (
    p: p5,
    x: number,
    y: number,
    size: number,
    color: string,
  ) => {
    p.push();
    p.translate(x, y);

    // Hexagonal pixel (CenterStage game piece)
    p.fill(color);
    p.stroke(200, 200, 220);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.PI / 3) * i - p.PI / 6;
      const px = size * p.cos(angle);
      const py = size * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);

    // Inner detail
    p.noFill();
    p.stroke(150, 150, 170, 150);
    p.strokeWeight(1);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.PI / 3) * i - p.PI / 6;
      const px = size * 0.6 * p.cos(angle);
      const py = size * 0.6 * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);

    p.pop();
  };

  const drawArrow = (p: p5, x: number, y: number, size: number) => {
    p.fill(0, 255, 255);
    p.noStroke();
    p.triangle(x, y, x - 5, y + size, x + 5, y + size);
  };

  const drawProgressBar = (p: p5, current: number, total: number) => {
    const barWidth = 350;
    const barHeight = 8;
    const x = (p.width - barWidth) / 2;
    const y = p.height - 45;

    // Background
    p.fill(40, 40, 50);
    p.noStroke();
    p.rect(x, y, barWidth, barHeight, 4);

    // Progress
    const progress = current / total;
    p.fill(0, 255, 100);
    p.rect(x, y, barWidth * progress, barHeight, 4);

    // Label
    p.textSize(10);
    p.fill(150);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(
      "Transition in " + Math.ceil((total - current) / 60) + "s",
      p.width / 2,
      y - 15,
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
