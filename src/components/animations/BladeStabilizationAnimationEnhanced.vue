<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let phase = 0; // 0: Problem Demo, 1: Solution Demo, 2: Action Demo
  let transitionTimer = 0;
  const problemTime = 180; // 3 seconds
  const solutionTime = 180; // 3 seconds
  const actionTime = 240; // 4 seconds

  let bladeAngle = 0;
  let sampleY = 0;
  let sampleCaptured = false;
  let gripperOpen = 0;

  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(800, 600);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(18, 20, 28);

    transitionTimer++;

    // Phase management
    if (phase === 0 && transitionTimer > problemTime) {
      phase = 1;
      transitionTimer = 0;
      bladeAngle = 0;
    } else if (phase === 1 && transitionTimer > solutionTime) {
      phase = 2;
      transitionTimer = 0;
      sampleY = 0;
      sampleCaptured = false;
      gripperOpen = 1;
    } else if (phase === 2 && transitionTimer > actionTime) {
      phase = 0;
      transitionTimer = 0;
      bladeAngle = 0;
    }

    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text(
      "Blade Stabilization System: Hexagonal Disc Solution",
      p.width / 2,
      30,
    );

    // Draw phase indicator
    drawPhaseIndicator(p, phase);

    if (phase === 0) {
      drawProblemPhase(p, transitionTimer);
    } else if (phase === 1) {
      drawSolutionPhase(p, transitionTimer);
    } else {
      drawActionPhase(p, transitionTimer);
    }

    // Progress bar
    drawProgressBar(
      p,
      phase,
      transitionTimer,
      problemTime,
      solutionTime,
      actionTime,
    );
  };

  const drawPhaseIndicator = (p: p5, currentPhase: number) => {
    const y = 65;
    const spacing = 200;
    const startX = p.width / 2 - spacing;

    const phases = [
      { name: "Problem", color: [255, 100, 100] },
      { name: "Solution", color: [0, 255, 255] },
      { name: "In Action", color: [0, 255, 100] },
    ];

    for (let i = 0; i < phases.length; i++) {
      const isActive = i === currentPhase;
      const col = phases[i].color;

      p.fill(col[0], col[1], col[2], isActive ? 255 : 100);
      p.noStroke();
      p.circle(startX + i * spacing, y, 16);

      p.textSize(12);
      p.fill(col[0], col[1], col[2], isActive ? 255 : 150);
      p.text(phases[i].name, startX + i * spacing, y + 25);
    }
  };

  const drawProblemPhase = (p: p5, timer: number) => {
    const centerX = p.width / 2 - 200;
    const centerY = p.height / 2 + 40;

    // Animate blades rotating freely
    bladeAngle += 0.04;

    // Draw shaft
    p.fill(80, 80, 100);
    p.stroke(100, 100, 120);
    p.strokeWeight(4);
    p.rect(centerX - 8, centerY - 150, 16, 300, 2);

    // Draw rotating blades (problem: they can align parallel)
    p.push();
    p.translate(centerX, centerY);

    // Show two blade pairs
    for (let i = 0; i < 2; i++) {
      p.push();
      p.rotate(bladeAngle + i * p.PI);

      // Blade (butcher shop material - flexible plastic)
      p.fill(220, 180, 100);
      p.stroke(180, 140, 60);
      p.strokeWeight(3);
      p.rect(-60, -12, 120, 24, 3);

      // Blade texture lines
      p.stroke(200, 160, 80);
      p.strokeWeight(1);
      for (let x = -50; x < 50; x += 15) {
        p.line(x, -10, x, 10);
      }

      // Mounting hole
      p.fill(40, 40, 50);
      p.noStroke();
      p.circle(0, 0, 16);

      p.pop();
    }

    // Rotation indicator
    p.noFill();
    p.stroke(255, 100, 100, 200);
    p.strokeWeight(3);
    p.arc(0, 0, 140, 140, 0, bladeAngle % p.TWO_PI);

    // Arrow showing rotation direction
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.line(70, 0, 90, 0);
    p.fill(255, 100, 100);
    p.noStroke();
    p.triangle(90, 0, 82, -5, 82, 5);

    p.pop();

    // Sample falling through (showing problem)
    if (Math.abs(Math.sin(bladeAngle)) < 0.3) {
      // Blades are nearly parallel - sample falls through
      const sampleFallY = centerY - 100 + (timer % 60) * 3;
      if (sampleFallY < centerY + 100) {
        drawSample(p, centerX, sampleFallY, false);
      }

      // X mark showing failure
      if (timer % 60 > 40) {
        p.stroke(255, 50, 50);
        p.strokeWeight(4);
        p.line(centerX - 15, sampleFallY - 15, centerX + 15, sampleFallY + 15);
        p.line(centerX - 15, sampleFallY + 15, centerX + 15, sampleFallY - 15);
      }
    }

    // Problem description panel
    const panelX = p.width / 2 + 200;
    const panelY = p.height / 2;

    p.fill(40, 30, 30);
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.rect(panelX - 140, panelY - 120, 280, 240, 5);

    p.textSize(18);
    p.fill(255, 100, 100);
    p.noStroke();
    p.text("PROBLEM", panelX, panelY - 90);

    p.textSize(13);
    p.fill(220, 200, 200);
    p.textAlign(p.LEFT, p.TOP);
    const issues = [
      "• Blades rotate freely",
      "• Can align parallel",
      "• Samples fall through",
      "• Unreliable intake",
      "• Lost scoring opportunities",
    ];

    for (let i = 0; i < issues.length; i++) {
      p.text(issues[i], panelX - 120, panelY - 60 + i * 28);
    }

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.fill(150, 120, 120);
    p.text("Identified during early testing", panelX, panelY + 95);
  };

  const drawSolutionPhase = (p: p5, timer: number) => {
    const centerX = p.width / 2 - 200;
    const centerY = p.height / 2 + 40;

    // Draw shaft
    p.fill(80, 80, 100);
    p.stroke(100, 100, 120);
    p.strokeWeight(4);
    p.rect(centerX - 8, centerY - 150, 16, 300, 2);

    // Draw 3D-printed hexagonal discs
    for (let discY of [centerY - 80, centerY + 80]) {
      // Outer disc
      p.fill(0, 200, 255);
      p.stroke(0, 255, 255);
      p.strokeWeight(3);
      p.circle(centerX, discY, 90);

      // Inner ring detail
      p.noFill();
      p.circle(centerX, discY, 70);
      p.circle(centerX, discY, 50);

      // Hexagonal center (locks blade rotation)
      p.fill(30, 30, 40);
      p.stroke(0, 255, 255);
      p.strokeWeight(2);
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        const angle = (p.TWO_PI / 6) * i + p.PI / 6;
        const x = centerX + 22 * p.cos(angle);
        const y = discY + 22 * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);

      // Hexagon detail lines
      p.stroke(0, 180, 220);
      p.strokeWeight(1);
      for (let i = 0; i < 6; i++) {
        const angle = (p.TWO_PI / 6) * i + p.PI / 6;
        const x = centerX + 22 * p.cos(angle);
        const y = discY + 22 * p.sin(angle);
        p.line(centerX, discY, x, y);
      }

      // Label with arrow
      p.textSize(10);
      p.fill(0, 255, 255);
      p.noStroke();
      p.text("3D-Printed\nDisc", centerX + 65, discY);

      // Arrow pointing to disc
      p.stroke(0, 255, 255);
      p.strokeWeight(2);
      p.line(centerX + 50, discY, centerX + 45, discY);
      p.fill(0, 255, 255);
      p.noStroke();
      p.triangle(
        centerX + 45,
        discY,
        centerX + 50,
        discY - 4,
        centerX + 50,
        discY + 4,
      );
    }

    // Draw fixed blades locked at 90 degrees
    p.push();
    p.translate(centerX, centerY);

    for (let i = 0; i < 2; i++) {
      p.push();
      p.rotate(i * p.HALF_PI + p.PI / 4);

      // Blade
      p.fill(220, 180, 100);
      p.stroke(180, 140, 60);
      p.strokeWeight(3);
      p.rect(-60, -12, 120, 24, 3);

      // Blade texture
      p.stroke(200, 160, 80);
      p.strokeWeight(1);
      for (let x = -50; x < 50; x += 15) {
        p.line(x, -10, x, 10);
      }

      // Mounting screws
      p.fill(150, 150, 170);
      p.noStroke();
      for (let x of [-45, -25, -5, 15, 35]) {
        p.circle(x, 0, 6);
        // Screw detail
        p.stroke(120, 120, 140);
        p.strokeWeight(1);
        p.line(x - 2, 0, x + 2, 0);
        p.noStroke();
      }

      p.pop();
    }

    // Draw mechanical stoppers
    for (let angle of [0, p.HALF_PI, p.PI, -p.HALF_PI]) {
      const stopperDist = 75;
      const sx = stopperDist * p.cos(angle + p.PI / 4);
      const sy = stopperDist * p.sin(angle + p.PI / 4);

      p.fill(255, 200, 0);
      p.stroke(200, 150, 0);
      p.strokeWeight(2);
      p.rect(sx - 8, sy - 5, 16, 10, 2);

      // Stopper mount
      p.fill(180, 140, 0);
      p.circle(sx, sy, 6);
    }

    // 90 degree angle indicator
    p.noFill();
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.arc(0, 0, 40, 40, p.PI / 4, p.PI / 4 + p.HALF_PI);

    p.fill(0, 255, 100);
    p.noStroke();
    p.textSize(14);
    p.text("90°", 35, 35);

    p.pop();

    // Solution description panel
    const panelX = p.width / 2 + 200;
    const panelY = p.height / 2;

    p.fill(30, 40, 40);
    p.stroke(0, 255, 255);
    p.strokeWeight(2);
    p.rect(panelX - 140, panelY - 120, 280, 240, 5);

    p.textSize(18);
    p.fill(0, 255, 255);
    p.noStroke();
    p.text("SOLUTION", panelX, panelY - 90);

    p.textSize(13);
    p.fill(200, 220, 220);
    p.textAlign(p.LEFT, p.TOP);
    const features = [
      "• Hexagonal disc design",
      "• Locks blade orientation",
      "• Maintains 90° angle",
      "• Screws secure blades",
      "• Stoppers prevent parallel",
      "• Reliable sample capture",
    ];

    for (let i = 0; i < features.length; i++) {
      p.text(features[i], panelX - 120, panelY - 60 + i * 26);
    }

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.fill(120, 150, 150);
    p.text(
      "Designed & 3D-printed: Ianis Cotoc, Teodor Matricală",
      panelX,
      panelY + 95,
    );
  };

  const drawActionPhase = (p: p5, timer: number) => {
    const centerX = p.width / 2 - 200;
    const centerY = p.height / 2 + 40;

    // Animate sample capture
    if (!sampleCaptured && timer < 120) {
      sampleY = p.map(timer, 0, 120, -100, 0);
      gripperOpen = p.map(timer, 90, 120, 1, 0);
    } else if (!sampleCaptured && timer >= 120) {
      sampleCaptured = true;
      gripperOpen = 0;
    } else if (sampleCaptured && timer > 180) {
      sampleY = p.map(timer, 180, 240, 0, 100);
    }

    // Draw shaft
    p.fill(80, 80, 100);
    p.stroke(100, 100, 120);
    p.strokeWeight(4);
    p.rect(centerX - 8, centerY - 150, 16, 300, 2);

    // Draw discs (simplified for action view)
    for (let discY of [centerY - 80, centerY + 80]) {
      p.fill(0, 200, 255, 150);
      p.stroke(0, 255, 255, 150);
      p.strokeWeight(2);
      p.circle(centerX, discY, 70);
    }

    // Draw blades with opening/closing
    p.push();
    p.translate(centerX, centerY);

    for (let i = 0; i < 2; i++) {
      p.push();
      const baseAngle = i * p.HALF_PI + p.PI / 4;
      const openAngle = gripperOpen * 0.3;
      p.rotate(baseAngle + (i === 0 ? openAngle : -openAngle));

      // Blade
      p.fill(220, 180, 100);
      p.stroke(180, 140, 60);
      p.strokeWeight(3);
      p.rect(-60, -12, 120, 24, 3);

      // Blade texture
      p.stroke(200, 160, 80);
      p.strokeWeight(1);
      for (let x = -50; x < 50; x += 15) {
        p.line(x, -10, x, 10);
      }

      p.pop();
    }

    p.pop();

    // Draw sample
    drawSample(p, centerX, centerY + sampleY, sampleCaptured);

    // Status panel
    const panelX = p.width / 2 + 200;
    const panelY = p.height / 2;

    p.fill(30, 40, 35);
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.rect(panelX - 140, panelY - 120, 280, 240, 5);

    p.textSize(18);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("IN ACTION", panelX, panelY - 90);

    p.textSize(14);
    p.fill(200, 220, 200);
    p.textAlign(p.CENTER, p.CENTER);

    if (timer < 120) {
      p.text("Sample approaching...", panelX, panelY - 40);
      p.text("Blades opening", panelX, panelY - 10);
    } else if (timer < 180) {
      p.text("✓ Sample captured!", panelX, panelY - 40);
      p.text("Blades locked at 90°", panelX, panelY - 10);

      // Success checkmark
      p.stroke(0, 255, 100);
      p.strokeWeight(4);
      p.noFill();
      p.beginShape();
      p.vertex(panelX - 60, panelY + 30);
      p.vertex(panelX - 40, panelY + 50);
      p.vertex(panelX - 10, panelY + 10);
      p.endShape();
    } else {
      p.text("Transferring to basket", panelX, panelY - 40);
      p.text("Ready for scoring", panelX, panelY - 10);
    }

    p.textSize(11);
    p.fill(150, 180, 150);
    p.text(`Capture Success: 95%`, panelX, panelY + 80);

    p.textSize(10);
    p.fill(120, 150, 120);
    p.text("System proven reliable in competition", panelX, panelY + 105);
  };

  const drawSample = (p: p5, x: number, y: number, captured: boolean) => {
    // Yellow sample block
    p.fill(captured ? 255 : 255, captured ? 255 : 220, 0);
    p.stroke(captured ? 200 : 180, captured ? 200 : 160, 0);
    p.strokeWeight(2);
    p.rect(x - 18, y - 18, 36, 36, 3);

    // Sample details
    p.fill(220, 200, 0);
    p.noStroke();
    p.rect(x - 14, y - 14, 28, 28, 2);

    // Sample marker
    p.fill(180, 160, 0);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("S", x, y);
  };

  const drawProgressBar = (
    p: p5,
    phase: number,
    timer: number,
    prob: number,
    sol: number,
    act: number,
  ) => {
    const barWidth = 350;
    const barHeight = 8;
    const x = (p.width - barWidth) / 2;
    const y = p.height - 45;

    let totalTime = prob + sol + act;
    let currentTime = 0;

    if (phase === 0) currentTime = timer;
    else if (phase === 1) currentTime = prob + timer;
    else currentTime = prob + sol + timer;

    // Background
    p.fill(40, 40, 50);
    p.noStroke();
    p.rect(x, y, barWidth, barHeight, 4);

    // Progress
    const progress = currentTime / totalTime;
    p.fill(0, 255, 200);
    p.rect(x, y, barWidth * progress, barHeight, 4);

    // Label
    p.textSize(10);
    p.fill(150);
    p.textAlign(p.CENTER, p.CENTER);
    const timeLeft = Math.ceil((totalTime - currentTime) / 60);
    p.text("Cycle: " + timeLeft + "s remaining", p.width / 2, y - 15);
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
