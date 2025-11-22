<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let currentVersion = 0; // 0: brush, 1: claw v2, 2: claw v3 (angled)
  let animationTimer = 0;
  const transitionTime = 180; // frames between versions

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    
    animationTimer++;
    if (animationTimer > transitionTime) {
      currentVersion = (currentVersion + 1) % 3;
      animationTimer = 0;
    }
    
    // Draw labels at top
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Intake Evolution', p.width / 2, 30);
    
    if (currentVersion === 0) {
      drawBrushIntake(p);
    } else if (currentVersion === 1) {
      drawClawV2(p);
    } else if (currentVersion === 2) {
      drawClawV3(p);
    }
  };

  const drawBrushIntake = (p: p5) => {
    p.textSize(14);
    p.fill(0, 255, 0);
    p.text('Version 1: Dynamic Brush Intake', p.width / 2, 60);
    
    p.textSize(11);
    p.fill(200);
    p.text('Spinning brush sweeps pixels up a ramp into storage', p.width / 2, 85);
    
    // Draw ramp
    p.stroke(150);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    p.vertex(200, p.height - 100);
    p.vertex(250, p.height - 150);
    p.vertex(350, p.height - 150);
    p.vertex(400, p.height - 100);
    p.endShape();
    
    // Draw storage box
    p.fill(60, 60, 70);
    p.stroke(0, 255, 0);
    p.rect(320, p.height - 180, 80, 30);
    p.textSize(9);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Storage', 360, p.height - 160);
    
    // Draw rotating brush
    const brushX = 220;
    const brushY = p.height - 110;
    const rotation = (animationTimer * 0.1) % (p.TWO_PI);
    
    p.push();
    p.translate(brushX, brushY);
    p.rotate(rotation);
    
    // Brush bristles
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      const angle = (p.TWO_PI / 12) * i;
      const x1 = 10 * p.cos(angle);
      const y1 = 10 * p.sin(angle);
      const x2 = 20 * p.cos(angle);
      const y2 = 20 * p.sin(angle);
      p.line(x1, y1, x2, y2);
    }
    
    // Brush center
    p.fill(150);
    p.noStroke();
    p.circle(0, 0, 15);
    
    p.pop();
    
    // Draw pixel being swept up
    const pixelY = p.height - 100 - (animationTimer % 50);
    if (pixelY > p.height - 150) {
      drawHexagon(p, 250, pixelY, 12, '#ff00ff');
    }
    
    // Label
    p.textSize(9);
    p.fill(255, 200, 0);
    p.text('Spinning shaft', brushX, brushY + 35);
    
    p.fill(200, 100, 100);
    p.text('Issues: Required expansion hub (no motors available)', p.width / 2, p.height - 40);
  };

  const drawClawV2 = (p: p5) => {
    p.textSize(14);
    p.fill(0, 255, 0);
    p.text('Version 2: Precision Claw', p.width / 2, 60);
    
    p.textSize(11);
    p.fill(200);
    p.text('Two jagged arms move in opposite directions', p.width / 2, 85);
    
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    
    // Animate claw opening/closing
    const clawProgress = Math.sin(animationTimer * 0.05);
    const openAmount = p.map(clawProgress, -1, 1, 0, 40);
    
    // Left arm
    p.fill(0, 200, 0);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.beginShape();
    p.vertex(centerX - 20 - openAmount, centerY - 20);
    p.vertex(centerX - 30 - openAmount, centerY);
    p.vertex(centerX - 20 - openAmount, centerY + 20);
    p.vertex(centerX - 10 - openAmount, centerY + 10);
    p.vertex(centerX - 10 - openAmount, centerY - 10);
    p.endShape(p.CLOSE);
    
    // Add teeth to left arm
    for (let i = 0; i < 3; i++) {
      p.line(
        centerX - 30 - openAmount,
        centerY - 10 + i * 10,
        centerX - 35 - openAmount,
        centerY - 7 + i * 10
      );
    }
    
    // Right arm
    p.beginShape();
    p.vertex(centerX + 20 + openAmount, centerY - 20);
    p.vertex(centerX + 30 + openAmount, centerY);
    p.vertex(centerX + 20 + openAmount, centerY + 20);
    p.vertex(centerX + 10 + openAmount, centerY + 10);
    p.vertex(centerX + 10 + openAmount, centerY - 10);
    p.endShape(p.CLOSE);
    
    // Add teeth to right arm
    for (let i = 0; i < 3; i++) {
      p.line(
        centerX + 30 + openAmount,
        centerY - 10 + i * 10,
        centerX + 35 + openAmount,
        centerY - 7 + i * 10
      );
    }
    
    // Pixel in center (when closed)
    if (openAmount < 10) {
      drawHexagon(p, centerX, centerY, 12, '#ff00ff');
    }
    
    // Servo indicator
    p.fill(100);
    p.noStroke();
    p.circle(centerX, centerY - 40, 20);
    p.textSize(8);
    p.fill(200);
    p.text('Servo', centerX, centerY - 37);
    
    p.textSize(9);
    p.fill(200, 100, 100);
    p.text('Issues: Required precise alignment, single servo operation', p.width / 2, p.height - 40);
  };

  const drawClawV3 = (p: p5) => {
    p.textSize(14);
    p.fill(0, 255, 0);
    p.text('Version 3: Angled Claw (Final "Crab Claw")', p.width / 2, 60);
    
    p.textSize(11);
    p.fill(200);
    p.text('Counter-rotating toothed wheels create scissor action', p.width / 2, 85);
    
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    
    // Animate claw opening/closing at angle
    const clawProgress = Math.sin(animationTimer * 0.05);
    const angle = p.map(clawProgress, -1, 1, 0, p.PI / 4); // Opens at 45 degree angle
    
    // Left toothed wheel
    p.push();
    p.translate(centerX - 30, centerY);
    p.rotate(-angle);
    drawToothedWheel(p, 0, 0, 25, 8);
    p.pop();
    
    // Right toothed wheel
    p.push();
    p.translate(centerX + 30, centerY);
    p.rotate(angle); // Rotates opposite direction
    drawToothedWheel(p, 0, 0, 25, 8);
    p.pop();
    
    // Connection line showing they're meshed
    p.stroke(150);
    p.strokeWeight(1);
    p.line(centerX - 30, centerY, centerX + 30, centerY);
    
    // Pixel in center (when closed)
    if (angle < 0.2) {
      drawHexagon(p, centerX, centerY, 12, '#ff00ff');
    }
    
    // Servo indicator
    p.fill(100);
    p.noStroke();
    p.circle(centerX - 30, centerY - 35, 15);
    p.textSize(8);
    p.fill(200);
    p.text('Servo', centerX - 30, centerY - 32);
    
    // Arrows showing rotation
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    p.noFill();
    p.arc(centerX - 30, centerY - 35, 30, 30, p.PI, p.PI + p.HALF_PI);
    p.arc(centerX + 30, centerY - 35, 30, 30, -p.HALF_PI, 0);
    
    p.textSize(9);
    p.fill(0, 255, 0);
    p.text('Success: Easier alignment, forgiving capture angle', p.width / 2, p.height - 40);
  };

  const drawToothedWheel = (p: p5, x: number, y: number, radius: number, teeth: number) => {
    p.push();
    p.translate(x, y);
    
    // Draw wheel body
    p.fill(0, 200, 0);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.circle(0, 0, radius * 2);
    
    // Draw teeth
    for (let i = 0; i < teeth; i++) {
      const angle = (p.TWO_PI / teeth) * i;
      const x1 = radius * p.cos(angle);
      const y1 = radius * p.sin(angle);
      const x2 = (radius + 8) * p.cos(angle);
      const y2 = (radius + 8) * p.sin(angle);
      p.line(x1, y1, x2, y2);
    }
    
    p.pop();
  };

  const drawHexagon = (p: p5, x: number, y: number, size: number, color: string) => {
    p.push();
    p.translate(x, y);
    p.fill(color);
    p.stroke(200);
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
    <p class="animation-caption">CenterStage Intake Evolution: From dynamic brush to precision claw to angled "crab claw"</p>
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
